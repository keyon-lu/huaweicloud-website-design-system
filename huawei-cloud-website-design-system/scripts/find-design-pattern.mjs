import fs from 'node:fs';import {join} from 'node:path';import {fileURLToPath} from 'node:url';import {root} from './portal-source.mjs';
export function findDesignPatterns(query,{limit=10}={}){
 if(typeof query!=='string'||!query.trim())throw Error('Provide a component/floor name or exact pattern id');
 if(!Number.isInteger(limit)||limit<1||limit>50)throw Error('limit must be1..50');
 const catalogue=JSON.parse(fs.readFileSync(join(root,'references/pixso-pattern-catalog.json'),'utf8')),needle=query.trim().toLowerCase();
 const exact=catalogue.patterns.filter(p=>p.id===needle||p.name.toLowerCase()===needle);
 let matches=exact.length?exact:catalogue.patterns.filter(p=>(p.name+' '+p.path).toLowerCase().includes(needle)),matchMethod=exact.length?'exact':matches.length?'substring':'none';
 if(!matches.length){const signals=JSON.parse(fs.readFileSync(join(root,'references/pixso-selection-signals.json'),'utf8')).rules.filter(r=>r.terms.some(term=>needle.includes(term.toLowerCase())));matches=catalogue.patterns.filter(p=>signals.some(r=>r.names.includes(p.name))).map(p=>({...p,selectionReasons:signals.filter(r=>r.names.includes(p.name)).map(r=>r.reason)}));if(matches.length)matchMethod='content-purpose-hints';}
 return {query,total:matches.length,ambiguous:matches.length>1,matchMethod,scope:'Source lookup; a match is not automatic approval or an implemented generation kind',matches:matches.slice(0,limit)};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 try{const result=findDesignPatterns(process.argv[2]);if(!process.argv.includes('--details'))result.matches=result.matches.map(({rules,...r})=>({...r,designNoteCount:rules.length}));console.log(JSON.stringify(result,null,2));if(!result.total)process.exitCode=2;}catch(e){console.error(e.message);process.exitCode=1;}
}
