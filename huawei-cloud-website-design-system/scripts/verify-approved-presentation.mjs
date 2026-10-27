import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';import {Babel,root} from './portal-source.mjs';
import {verifyProtectedBehaviorRepair} from './verify-protected-behavior-repair.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
export function verifyApprovedPresentation(base=root,readText=rel=>fs.readFileSync(path.join(base,rel),'utf8')){
 const model=JSON.parse(readText('references/approved-presentation-baseline.json'));
 const resilience=readText('src/styles/content-resilience.css').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s/g,'');
 if(resilience!=='.hc-page{overflow-wrap:anywhere}')throw Error('Text containment repair must not change dimensions, colors, spacing or selectors');
 for(const row of model.files)if(hash(readText(row.path))!==row.sha256)throw Error('Owner-fixed presentation changed: '+row.path+'; keep approved styling and extend in a separately scoped component');
 const source=readText('src/components/portal-components.tsx'),ast=Babel.packages.parser.parse(source,{sourceType:'module',plugins:['typescript','jsx']}),functions=new Map(ast.program.body.flatMap(n=>n.type==='ExportNamedDeclaration'&&n.declaration?.type==='FunctionDeclaration'?[n.declaration]:[]).map(n=>[n.id.name,source.slice(n.start,n.end)]));
 let behaviorRepairs=0;
 for(const row of model.functions){if(!functions.has(row.name))throw Error('Owner-fixed component changed: '+row.name+'; new design evidence does not authorize restyling');if(hash(functions.get(row.name))!==row.sha256){if(!verifyProtectedBehaviorRepair(row,functions.get(row.name),readText))throw Error('Owner-fixed component changed: '+row.name+'; new design evidence does not authorize restyling');behaviorRepairs++;}}
 const definitions=new Map();for(const rel of model.tokenSources)for(const m of readText(rel).matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)){const list=definitions.get(m[1])??[];list.push(m[2].trim());definitions.set(m[1],list)}
 for(const [name,expected]of Object.entries(model.tokens))if(JSON.stringify(definitions.get(name))!==JSON.stringify(expected))throw Error('Owner-fixed consumed token changed: '+name);
 return {ok:true,protectedFiles:model.files.length,protectedFunctions:model.functions.length,protectedTokens:Object.keys(model.tokens).length,behaviorRepairs,scope:'Owner2026-10-19 fixed presentation anchors retained; a named repair permits only its recorded update helper with identical remaining AST/JSX. No new owner approval.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyApprovedPresentation()))}catch(e){console.error(e.message);process.exitCode=1}}
