#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';import {join} from 'node:path';import {root} from './portal-source.mjs';
try{
 const data=JSON.parse(readFileSync(join(root,'references/p2-coverage.json'),'utf8')),rows=data.items;
 if(rows.length!==56||new Set(rows.map(r=>r.id)).size!==56)throw Error('P2 requires56 unique v1.3.3 item classifications');
 let p2=0;for(const row of rows){if(['待判定',''].includes(row.applicability)||['待判定',''].includes(row.status))throw Error('Unclassified '+row.id);for(const file of row.evidence)if(!existsSync(join(root,file)))throw Error('Missing evidence '+file);if(row.status==='不适用'&&!row.reason)throw Error('N/A missing rationale '+row.id);if(row.status==='部分符合'&&(!row.gap||!row.next_action))throw Error('Gap/next action missing '+row.id);if(row.phase.includes('P2')){p2++;if(!row.evidence.length)throw Error('P2 evidence missing '+row.id)}}
 if(rows.filter(r=>r.status==='暂停考核').length!==2)throw Error('Paused v1.3.3 items changed');
 for(const file of ['references/capability-map.json','skills/SKILL.md','skills/skill-registry.md','src/styles/tokens.css','src/components-specs/components.json'])if(!existsSync(join(root,file)))throw Error('P2 carrier absent '+file);
 if(!existsSync(join(root,'src/styles/portalui-offline.css')))throw Error('Token source missing');
 console.log(JSON.stringify({ok:true,classified:56,p2Items:p2,paused:2,partial:rows.filter(r=>r.status==='部分符合').length,scope:'P2 modeling coverage gate: evidence/gap/N-A completeness, not v1.3.3 scores or formal release'},null,2));
}catch(e){console.error(e.message);process.exitCode=1}
