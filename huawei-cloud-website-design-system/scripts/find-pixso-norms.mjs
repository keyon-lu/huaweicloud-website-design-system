import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function findPixsoNorms(query,{source,page,limit=12,details=false,base=root}={}){
 if(typeof query!=='string'||!query.trim())throw Error('A nonempty source, component, or rule query is required');
 if(!Number.isInteger(limit)||limit<1||limit>50)throw Error('limit must be 1..50');
 const catalogue=JSON.parse(fs.readFileSync(path.join(base,'references/pixso-priority-import.json'),'utf8'));
 if(source&&!catalogue.sources.some(s=>s.onlineId===source||s.sourceId===source))throw Error('Unknown prioritized source');
 const needle=query.trim().toLocaleLowerCase();let total=0;const matches=[];
 for(const row of catalogue.sources){
  if(source&&source!==row.onlineId&&source!==row.sourceId)continue;
  const file=path.resolve(base,row.bundle);
  if(!file.startsWith(path.resolve(base)+path.sep))throw Error('Unsafe source bundle');
  const bytes=fs.readFileSync(file);
  if(createHash('sha256').update(bytes).digest('hex')!==row.sha256)throw Error('Source bundle integrity mismatch: '+row.onlineId);
  const data=JSON.parse(bytes);
  for(const item of data.pages){
   if(page&&page!==item.pageId&&page!==item.name)continue;
   const named=(item.name+' '+item.pageId+' '+row.fileName+' '+row.sourceId+' '+row.onlineId).toLocaleLowerCase().includes(needle);
   const notes=item.designNotes.filter(n=>named||n.text.toLocaleLowerCase().includes(needle)||n.sourceNodeIds.includes(query.trim()));
   if(!named&&!notes.length)continue;
   total++;
   if(matches.length<limit)matches.push({source:row.onlineId,localSource:row.sourceId,fileName:row.fileName,onlineRead:row.onlineRead,pageId:item.pageId,name:item.name,url:item.url,ruleCount:notes.length,...details?{rules:notes}:{}});
  }
 }
 return {query,total,truncated:total>limit,scope:'Source records, not implementation or visual acceptance. Named matches include every note on the page; text matches include matching notes only.',matches};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2);const option=name=>{const i=args.indexOf(name);return i<0?undefined:args[i+1]};
 const result=findPixsoNorms(args[0],{source:option('--source'),page:option('--page'),limit:option('--limit')===undefined?12:Number(option('--limit')),details:args.includes('--details')});
 console.log(JSON.stringify(result,null,2));if(!result.total)process.exitCode=2;
 }catch(error){console.error(error.message);process.exitCode=1;}
}
