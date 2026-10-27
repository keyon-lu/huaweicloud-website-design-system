import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const digest=ids=>createHash('sha256').update(JSON.stringify([...ids].sort())).digest('hex');
export function readReleaseScope(base){
 const scope=JSON.parse(fs.readFileSync(path.join(base,'references/first-release-scope.json'),'utf8'));
 const unique=ids=>Array.isArray(ids)&&new Set(ids).size===ids.length;
 if(scope.id!=='first-release-66-2026-10-22'||scope.authority?.type!=='explicit-user-decision'||!scope.authority.statement)throw Error('Missing owner release decision');
 if(!unique(scope.requiredPatternIds)||scope.requiredPatternIds.length!==66||digest(scope.requiredPatternIds)!=='0e8389fcaae28fe246176a25184aa60c4d561aaeb2c6f7052362ea7fbfb6cc1a')throw Error('Owner adopted66 scope cannot be reduced or substituted');
 if(!unique(scope.deferredPatternIds)||scope.deferredPatternIds.length!==117||scope.deferredPatternIds.some(id=>scope.requiredPatternIds.includes(id)))throw Error('Deferred117 archive must be retained');
 if(!unique(scope.requiredFamilyIds)||scope.requiredFamilyIds.length!==17||digest(scope.requiredFamilyIds)!=='a164c766a5c8a6ce4619ab1d9d5680edf0e6b9a56d20a22436b97723b8a913db')throw Error('Owner scoped17 families cannot be reduced or substituted');
 if(!Array.isArray(scope.familyDispositions)||new Set(scope.familyDispositions.map(x=>x.id)).size!==7||scope.familyDispositions.some(x=>!x.reason||scope.requiredFamilyIds.includes(x.id)))throw Error('Excluded family disposition missing');
 const decision=Object.fromEntries(scope.familyDispositions.map(x=>[x.id,x]));
 if(decision['img-viewer']?.disposition!=='withdrawn'||decision['service-table']?.disposition!=='merged'||decision['service-table']?.canonicalFamily!=='fixed-table'||decision.select?.disposition!=='source-required'||decision.rate?.disposition!=='source-required')throw Error('Owner withdrawn/merged/paused family decision changed');
 return scope;
}
