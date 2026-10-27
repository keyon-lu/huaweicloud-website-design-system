import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {root} from './portal-source.mjs';
export function resolveVisualFoundation(id,{approvedComponent=false}={}){
 const data=JSON.parse(fs.readFileSync(path.join(root,'references/visual-foundations-2026.json'),'utf8')),rule=data.rules.find(r=>r.id===id);if(!rule)throw Error('Unknown visual foundation: '+id+'; choose an explicit source category');
 if(approvedComponent)throw Error('Keep the approved component presentation; source foundation values apply to missing/new components only');
 return {id:rule.id,source:{file:rule.sourceId,node:rule.nodeId},values:rule.values,scope:rule.scope,next:'Use a semantically appropriate source asset; no asset or official component certification is implied by numeric rules'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{if(process.argv[2]==='--list'){console.log(JSON.stringify(JSON.parse(fs.readFileSync(path.join(root,'references/visual-foundations-2026.json'),'utf8')).rules.map(r=>({id:r.id,scope:r.scope})),null,2))}else console.log(JSON.stringify(resolveVisualFoundation(process.argv[2],{approvedComponent:process.argv.includes('--approved-component')}),null,2))}catch(e){console.error(e.message);process.exitCode=1}}
