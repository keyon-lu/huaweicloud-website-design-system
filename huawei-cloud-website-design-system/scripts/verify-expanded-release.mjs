import {readAcceptedSourceLimitations} from './accepted-source-limitations.mjs';
import {readReleaseScope} from './release-scope.mjs';
import {verifyPatternConversions} from './verify-pattern-conversions.mjs';
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export function verifyExpandedRelease(base=root){
 base=fs.realpathSync(base);const read=rel=>JSON.parse(fs.readFileSync(path.join(base,rel),'utf8'));
 const release=readReleaseScope(base);const profile=read('references/expanded-release-profile.json'),catalogue=read('references/source-component-coverage.json');
 const expected=catalogue.rows.filter(row=>row.kind==='component-family').map(row=>row.id).sort();
 const actual=profile.families.map(row=>row.id).sort();const blockers=[];
 if(expected.length!==24||JSON.stringify(expected)!==JSON.stringify(actual))throw Error('Historical24-family archive cannot be reduced or duplicated');
 if(JSON.stringify([...release.requiredFamilyIds,...release.familyDispositions.map(x=>x.id)].sort())!==JSON.stringify(expected))throw Error('Family scope must preserve the historical taxonomy');
 const requiredFamilyIds=profile.families.filter(row=>row.requiredForRelease===true).map(row=>row.id).sort();if(JSON.stringify(requiredFamilyIds)!==JSON.stringify(release.requiredFamilyIds))throw Error('Required scoped family coverage cannot be reduced');
 const required=['specification','variants_states','public_imports','engineering','runtime_interaction','responsive_long_text','source_visual_comparison','accessibility'];
 const cross=['search-functional','static-review-133','creator-release-gates','website-palette','priority-design-adoption','adopted-source-pattern-conversion'];let completed=0;
 const checkedSnapshots=new Set();
 function safeFile(item,label){if(!item.path||path.isAbsolute(item.path)||item.path.includes('\\')||item.path.split('/').includes('..'))throw Error('Unsafe evidence path');const file=path.join(base,item.path);if(!fs.existsSync(file)||!fs.realpathSync(file).startsWith(base+path.sep)||sha(file)!==item.sha256)throw Error('Missing/stale evidence: '+label);return file}
 function verifyCheck(check,label){
  if(check?.status!=='passed'){blockers.push(label);return false}
  if(!check.evidence?.length)throw Error('Passed check lacks evidence: '+label);
  for(const item of check.evidence)safeFile(item,label);
  if(!check.recordPath||!check.evidence.some(item=>item.path===check.recordPath))throw Error('Passed check lacks a structured record: '+label);
  const record=read(check.recordPath);if(record.kind!=='source-release-check'||record.check!==label||record.status!=='passed'||!record.result||!record.snapshot)throw Error('Invalid structured check record: '+label);
  const snapshotFile=safeFile(record.snapshot,label+'/snapshot');
  if(!checkedSnapshots.has(snapshotFile)){const snapshot=JSON.parse(fs.readFileSync(snapshotFile,'utf8'));if(snapshot.kind!=='source-input-snapshot'||!snapshot.inputs?.length)throw Error('Missing verification inputs: '+label);for(const item of snapshot.inputs){try{safeFile(item,label+'/input')}catch(error){throw Error('Stale verification input: '+item.path+'; '+error.message)}}checkedSnapshots.add(snapshotFile)}
  return true;
 }
 for(const row of profile.families){const original=catalogue.rows.find(item=>item.id===row.id);if(row.source!==original.source||row.sourceSha256!==sha(path.join(base,row.source)))throw Error('Stale family source: '+row.id);if(!release.requiredFamilyIds.includes(row.id))continue;const checks=required.map(key=>verifyCheck(row.checks?.[key],row.id+'/'+key));if(checks.every(Boolean))completed++}
 const floors=read('references/floor-component-registry.json').rows.filter(row=>row.requiredForRelease),floorIds=floors.map(row=>row.id).sort();
 if(JSON.stringify(floorIds)!==JSON.stringify((profile.floorFamilies??[]).map(row=>row.id).sort()))throw Error('Required floor coverage cannot be omitted');
 for(const row of profile.floorFamilies){const original=floors.find(item=>item.id===row.id);if(row.source!==original.source||row.sourceSha256!==sha(path.join(base,row.source)))throw Error('Stale floor source: '+row.id);for(const key of required)verifyCheck(row.checks?.[key],'floor/'+row.id+'/'+key)}
 for(const key of cross)verifyCheck(profile.crossCutting?.[key],key);
 const patterns=verifyPatternConversions(base);blockers.push(...patterns.blockers);
 const accepted=readAcceptedSourceLimitations(base).map(({id,component,riskDisposition,conformance,wcagAaPass})=>({id,component,riskDisposition,conformance,wcagAaPass}));
 return {ownerAcceptedContrastLimitations:accepted,accessibilityConformanceClaim:'not-certified; accepted contrast nonconformance retained',patternConversion:{required:patterns.requiredSourceRecords,completed:patterns.completedSourceRecords,blockingChecks:patterns.blockingChecks},ok:blockers.length===0,version:profile.version,archivedFamilies:24,requiredFamilies:requiredFamilyIds.length,requiredFloors:floorIds,completedFamilies:completed,deferredByOwner:profile.decision.deferredByOwner,blockingChecks:blockers.length,blockers,scope:'Evidence completeness/integrity only; not a substitute for independent review or Creator gates'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const report=verifyExpandedRelease();console.log(JSON.stringify(report,null,2));if(!report.ok&&!process.argv.includes('--report'))process.exitCode=1}catch(error){console.error(error.message);process.exitCode=1}
}
