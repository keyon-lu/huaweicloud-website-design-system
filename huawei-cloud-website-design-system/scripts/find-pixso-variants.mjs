import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function findPixsoVariants(query,{properties={},limit=12}={}){
 if(typeof query!=='string'||!query.trim())throw Error('Provide a component name or exact set id');
 if(!properties||Array.isArray(properties)||typeof properties!=='object'||Object.values(properties).some(v=>typeof v!=='string'))throw Error('Properties must be a string map');
 if(!Number.isInteger(limit)||limit<1||limit>50)throw Error('limit must be1..50');
 const index=JSON.parse(fs.readFileSync(path.join(root,'references/pixso-priority/components.json'),'utf8')),sets=[];
 for(const rel of index.bundles){const file=path.resolve(root,rel);if(!file.startsWith(root+path.sep))throw Error('Unsafe variant bundle');const bytes=fs.readFileSync(file);if(createHash('sha256').update(bytes).digest('hex')!==index.bundleHashes[rel])throw Error('Stale variant bundle');sets.push(...JSON.parse(bytes).sets);}
 const needle=query.trim().toLocaleLowerCase(),exact=sets.filter(s=>s.id===query.trim()||s.name.toLocaleLowerCase()===needle),matches=exact.length?exact:sets.filter(s=>s.name.toLocaleLowerCase().includes(needle));
 return {query,totalSets:matches.length,ambiguous:matches.length>1,scope:'Actual source variant nodes, not inferred Cartesian combinations or runtime acceptance; dark/international evidence remains outside current implementation scope.',matches:matches.slice(0,limit).map(s=>{const variants=s.variants.filter(v=>Object.entries(properties).every(([key,value])=>v.properties?.[key]===value));return {...s,totalVariants:variants.length,variants:variants.slice(0,limit),variantsTruncated:variants.length>limit};})};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2),properties={};let limit=12;for(let i=1;i<args.length;i++){if(args[i]==='--property'){const raw=args[++i]??'',at=raw.indexOf('=');if(at<1)throw Error('Use --property name=value');const key=raw.slice(0,at);if(Object.hasOwn(properties,key))throw Error('Duplicate property');properties[key]=raw.slice(at+1);}else if(args[i]==='--limit')limit=Number(args[++i]);else throw Error('Unknown option');}const result=findPixsoVariants(args[0],{properties,limit});console.log(JSON.stringify(result,null,2));if(!result.totalSets)process.exitCode=2;}catch(error){console.error(error.message);process.exitCode=1;}
}
