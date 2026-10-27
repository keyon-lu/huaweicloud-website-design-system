import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
const hash=rel=>createHash('sha256').update(fs.readFileSync(path.join(root,rel))).digest('hex');
const scope=read('references/first-release-scope.json');
const foundation=read('references/first-release-foundation-contracts.json');
const floors=read('references/first-release-floor-state-contracts.json');
const index=read('references/first-release-contract-index.json');
const floorFamilies=read('references/first-release-floor-family-contracts.json');
const floorRegistry=read('references/floor-component-registry.json').rows.filter(x=>x.requiredForRelease);
const sameSet=(a,b)=>assert.deepEqual([...a].sort(),[...b].sort());
sameSet(foundation.rows.map(x=>x.family),scope.requiredFamilyIds);
sameSet(floors.rows.map(x=>x.sourceId),scope.requiredPatternIds);
for(const row of foundation.rows){
 const entry=index.foundationComponents.find(x=>x.family===row.family);
 assert.equal(row.spec,entry.spec);assert.equal(row.specSha256,hash(row.spec));
 assert.equal(row.publicEntry,entry.entry);sameSet(row.exports,entry.publicExports);
 for(const f of row.implementationFiles)assert.equal(f.sha256,hash(f.path),f.path);
 assert.ok(row.rules.length&&row.unsupportedOrHostOwned.length&&row.ownerVisualScope);
}
for(const row of floors.rows){
 const entry=index.patterns.find(x=>x.id===row.sourceId);
 assert.equal(entry.targets.length,1,'Review extra execution target before adopting it');
 const target=entry.targets[0];
 assert.equal(row.publicExport,target.export);assert.equal(row.contract,target.contract);
 assert.equal(row.contractSha256,hash(row.contract));assert.equal(row.implementation,target.entry);
 assert.equal(row.implementationSha256,hash(row.implementation));
 assert.ok(row.transitionRules&&row.unsupportedOrHostOwned&&row.sourceScope);
}
sameSet(floorFamilies.rows.map(x=>x.floorId),floorRegistry.map(x=>x.id));
for(const row of floorFamilies.rows){
 const entry=floorRegistry.find(x=>x.id===row.floorId);
 assert.equal(row.implementation+'#'+row.publicExport,entry.implementation);
 assert.equal(row.contract,entry.spec);assert.equal(row.contractSha256,hash(row.contract));
 assert.equal(row.implementationSha256,hash(row.implementation));
 assert.equal(row.source,entry.source);assert.equal(row.sourceSha256,hash(row.source));
 if(row.binding.sourceId){const source=floors.rows.find(x=>x.sourceId===row.binding.sourceId);assert.ok(source);assert.equal(row.contract,source.contract);assert.equal(row.publicExport,source.publicExport);sameSet(row.namedStates,source.namedStates)}
}
for(const row of [...foundation.rows,...floors.rows,...floorFamilies.rows]){
 assert.ok(row.namedStates.length>0);sameSet(row.namedStates,new Set(row.namedStates));
 assert.ok(row.acceptanceBoundary.includes('separate'));
}
assert.equal(floors.newRuntimePasses,0);assert.equal(floors.newOwnerApprovals,0);
console.log(JSON.stringify({ok:true,foundationFamilies:foundation.rows.length,sourceRecords:floors.rows.length,requiredFloorFamilies:floorFamilies.rows.length,namedStates:[...foundation.rows,...floors.rows].reduce((n,r)=>n+r.namedStates.length,0),scope:'Contract/source integrity, not execution of all modeled states or source visual/AT certification'}));
