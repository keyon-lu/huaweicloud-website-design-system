import fs from 'node:fs/promises';import path from 'node:path';import {tmpdir} from 'node:os';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
import {verifyExpandedRelease} from './verify-expanded-release.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),base=await fs.mkdtemp(path.join(tmpdir(),'website-release-test-'));
try{
 const original=JSON.parse(await fs.readFile(path.join(root,'references/expanded-release-profile.json'),'utf8'));
 for(const row of [...original.families,...original.floorFamilies,{checks:original.crossCutting}])for(const key of Object.keys(row.checks??{}))row.checks[key]={status:'pending',evidence:[]};
 const catalogue=JSON.parse(await fs.readFile(path.join(root,'references/source-component-coverage.json'),'utf8'));
 const floors=JSON.parse(await fs.readFile(path.join(root,'references/floor-component-registry.json'),'utf8'));
 const files=['references/owner-decisions-2026-10-26.json','references/first-release-scope.json','references/pixso-pattern-catalog.json','references/pattern-conversion-ledger.json','references/source-component-coverage.json','references/floor-component-registry.json',...floors.rows.map(row=>row.source),...catalogue.rows.filter(row=>row.kind==='component-family').map(row=>row.source)];
 const needed=new Set(files);
 for(const group of [...original.families,...original.floorFamilies,{checks:original.crossCutting}])for(const check of Object.values(group.checks??{}))if(check?.status==='passed'){
  for(const item of check.evidence??[])needed.add(item.path);
  const record=JSON.parse(await fs.readFile(path.join(root,check.recordPath),'utf8'));needed.add(record.snapshot.path);
  const snapshot=JSON.parse(await fs.readFile(path.join(root,record.snapshot.path),'utf8'));for(const item of snapshot.inputs)needed.add(item.path);
 }
 for(const rel of needed){await fs.mkdir(path.dirname(path.join(base,rel)),{recursive:true});await fs.copyFile(path.join(root,rel),path.join(base,rel))}
 const fixtureLedger=JSON.parse(await fs.readFile(path.join(base,'references/pattern-conversion-ledger.json'),'utf8'));for(const row of fixtureLedger.patterns)for(const key of Object.keys(row.checks))row.checks[key]={status:'pending',evidence:[]};await fs.writeFile(path.join(base,'references/pattern-conversion-ledger.json'),JSON.stringify(fixtureLedger));
 const save=profile=>fs.writeFile(path.join(base,'references/expanded-release-profile.json'),JSON.stringify(profile));
 await save(original);assert.equal(verifyExpandedRelease(base).ok,false);assert.equal(verifyExpandedRelease(base).patternConversion.required,66);assert.ok(verifyExpandedRelease(base).blockers.includes('adopted-source-pattern-conversion'));assert.ok(verifyExpandedRelease(base).blockers.includes('priority-design-adoption'));
 const missingPriority=structuredClone(original);delete missingPriority.crossCutting['priority-design-adoption'];await save(missingPriority);assert.ok(verifyExpandedRelease(base).blockers.includes('priority-design-adoption'));
 let modified=structuredClone(original);modified.families.pop();await save(modified);assert.throws(()=>verifyExpandedRelease(base),/cannot be reduced/);
 modified=structuredClone(original);modified.families[0].checks.specification={status:'passed',evidence:[]};await save(modified);assert.throws(()=>verifyExpandedRelease(base),/lacks evidence/);
 modified=structuredClone(original);modified.families[0].sourceSha256='0'.repeat(64);await save(modified);assert.throws(()=>verifyExpandedRelease(base),/Stale family source/);
 modified=structuredClone(original);modified.families[0].checks.specification={status:'passed',evidence:[{path:'../outside.md',sha256:'0'.repeat(64)}]};await save(modified);assert.throws(()=>verifyExpandedRelease(base),/Unsafe evidence/);
 modified=structuredClone(original);modified.families[0].checks.specification={status:'passed',evidence:[{path:modified.families[0].source,sha256:'0'.repeat(64)}]};await save(modified);assert.throws(()=>verifyExpandedRelease(base),/stale evidence/);
 modified=structuredClone(original);modified.floorFamilies=[];await save(modified);assert.throws(()=>verifyExpandedRelease(base),/Required floor coverage/);
 const hash=text=>createHash('sha256').update(text).digest('hex');
 const probe='source-input.txt',snapshotPath='snapshot.json',recordPath='check-record.json',label=original.families[0].id+'/specification';
 await fs.writeFile(path.join(base,probe),'original');const snapshot=JSON.stringify({kind:'source-input-snapshot',inputs:[{path:probe,sha256:hash('original')}]});await fs.writeFile(path.join(base,snapshotPath),snapshot);
 let record=JSON.stringify({kind:'source-release-check',check:label,status:'passed',snapshot:{path:snapshotPath,sha256:hash(snapshot)},result:{fixtureOnly:true}});await fs.writeFile(path.join(base,recordPath),record);
 modified=structuredClone(original);modified.families[0].checks.specification={status:'passed',recordPath,evidence:[{path:recordPath,sha256:hash(record)}]};await save(modified);assert.equal(verifyExpandedRelease(base).ok,false);
 await fs.writeFile(path.join(base,probe),'changed');assert.throws(()=>verifyExpandedRelease(base),/Stale verification input/);await fs.writeFile(path.join(base,probe),'original');
 record=JSON.stringify({...JSON.parse(record),check:'another-family/specification'});await fs.writeFile(path.join(base,recordPath),record);modified.families[0].checks.specification.evidence[0].sha256=hash(record);await save(modified);assert.throws(()=>verifyExpandedRelease(base),/Invalid structured check record/);
 console.log(JSON.stringify({ok:true,pendingRemainsBlocked:true,negativeCases:9,changedSourceInvalidatesPass:true,recordCannotBeReassigned:true}));
}finally{if(path.dirname(base)!==path.resolve(tmpdir())||!path.basename(base).startsWith('website-release-test-'))throw Error('Unsafe cleanup');await fs.rm(base,{recursive:true,force:true})}
