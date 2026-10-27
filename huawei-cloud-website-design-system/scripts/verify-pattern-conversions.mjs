import {readReleaseScope} from './release-scope.mjs';
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
const ownerBaselineIdsSha256='688114982e39a723b65fe1152faa650dfbf173ecc108a32629974d236216afca';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=value=>createHash('sha256').update(value).digest('hex');
const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
export const patternChecks=['specification','variants_states','implementation','public_generation_entry','runtime_interaction','responsive_long_text','source_visual_comparison','accessibility'];
export function patternSourceFingerprint(pattern){return hash(JSON.stringify(stable({id:pattern.id,name:pattern.name,sourceId:pattern.sourceId,nodeId:pattern.nodeId,nodeSha256:pattern.nodeSha256,path:pattern.path,rules:pattern.rules})));}
export function verifyPatternConversions(base=root){
 base=fs.realpathSync(base);const read=rel=>JSON.parse(fs.readFileSync(path.join(base,rel),'utf8')),catalogue=read('references/pixso-pattern-catalog.json'),ledger=read('references/pattern-conversion-ledger.json');
 const expected=catalogue.patterns.map(row=>row.id).sort(),actual=ledger.patterns.map(row=>row.id).sort();
 if(expected.length<183||new Set(expected).size!==expected.length||JSON.stringify(actual)!==JSON.stringify(expected))throw Error('All183 owner-required source records must remain covered exactly once; added records also require conversion');
 if(hash(JSON.stringify([...(ledger.ownerScope?.requiredPatternIds??[])].sort()))!==ownerBaselineIdsSha256||ledger.ownerScope?.requiredRecordCount!==183||ledger.ownerScope?.requiredPatternIds?.length!==183||new Set(ledger.ownerScope.requiredPatternIds).size!==183||ledger.ownerScope.requiredPatternIds.some(id=>!expected.includes(id)))throw Error('Owner183-record baseline cannot be reduced');
 const release=readReleaseScope(base),adopted=new Set(release.requiredPatternIds);if(JSON.stringify([...release.requiredPatternIds,...release.deferredPatternIds].sort())!==JSON.stringify(expected))throw Error('Release partition must preserve the source archive');
 const blockers=[],snapshots=new Set();let complete=0,passedChecks=0;
 function file(item,label){if(!item?.path||path.isAbsolute(item.path)||item.path.includes('\\')||item.path.split('/').some(part=>part==='..'||part===''))throw Error('Unsafe pattern evidence path: '+label);const name=path.join(base,item.path);if(!fs.existsSync(name)||!fs.realpathSync(name).startsWith(base+path.sep)||hash(fs.readFileSync(name))!==item.sha256)throw Error('Missing/stale pattern evidence: '+label);return name;}
 for(const row of ledger.patterns){if(row.requiredForRelease!==adopted.has(row.id))throw Error('Source pattern cannot be excluded outside owner scope: '+row.id);const original=catalogue.patterns.find(p=>p.id===row.id);if(row.sourceFingerprint!==patternSourceFingerprint(original))throw Error('Stale pattern source: '+row.id);if(!adopted.has(row.id))continue;
  let ready=true;for(const key of patternChecks){const check=row.checks?.[key],label='pattern/'+row.id+'/'+key;
   if(check?.status!=='passed'){blockers.push(label);ready=false;continue;}
   if(!check.recordPath||!check.evidence?.length||!check.evidence.some(item=>item.path===check.recordPath))throw Error('Pattern pass requires a structured evidence record: '+label);
   check.evidence.forEach(item=>file(item,label));const record=read(check.recordPath);
   if(record.kind!=='source-release-check'||record.check!==label||record.status!=='passed'||!record.result||!record.snapshot)throw Error('Invalid pattern check record: '+label);
   const name=file(record.snapshot,label+'/snapshot');if(!snapshots.has(name)){const snapshot=JSON.parse(fs.readFileSync(name,'utf8'));if(snapshot.kind!=='source-input-snapshot'||!snapshot.inputs?.length)throw Error('Missing pattern verification inputs: '+label);snapshot.inputs.forEach(item=>file(item,label+'/input'));snapshots.add(name);}
   if(!['floor','page','foundation','variant','composition','navigation'].includes(row.artifactKind)||!row.executionTargets?.length||row.executionTargets.some(target=>!['component','page','foundation-consumer','variant'].includes(target.kind)||!target.entry||!target.contract))throw Error('Pattern pass lacks an explicit execution target: '+label);
   for(const target of row.executionTargets)for(const rel of [target.entry,target.contract]){const name=typeof rel==='string'?path.join(base,rel):'';if(typeof rel!=='string'||!rel.trim()||path.isAbsolute(rel)||rel.includes('\\')||rel.split('/').includes('..')||!fs.existsSync(name)||!fs.statSync(name).isFile()||!fs.realpathSync(name).startsWith(base+path.sep))throw Error('Missing pattern execution resource: '+rel);}
   if(row.duplicateReview?.canonicalPatternId){if(row.duplicateReview.canonicalPatternId===row.id||!expected.includes(row.duplicateReview.canonicalPatternId)||!row.duplicateReview.rationale?.trim()||row.duplicateReview.status!=='confirmed')throw Error('Duplicate mapping requires explicit confirmed source comparison: '+row.id);}
   passedChecks++;
  }if(ready)complete++;
 }
 return {ok:blockers.length===0,archivedSourceRecords:expected.length,deferredSourceRecords:release.deferredPatternIds.length,requiredSourceRecords:adopted.size,completedSourceRecords:complete,passedChecks,totalChecks:adopted.size*patternChecks.length,blockingChecks:blockers.length,blockers,scope:'Per-source conversion evidence; source count includes page/foundation/variant records and is not a count of unique floor implementations'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{const report=verifyPatternConversions();console.log(JSON.stringify(report,null,2));if(!report.ok&&!process.argv.includes('--report'))process.exitCode=1;}catch(error){console.error(error.message);process.exitCode=1;}}
