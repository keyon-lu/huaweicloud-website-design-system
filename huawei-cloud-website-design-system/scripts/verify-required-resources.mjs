import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function verifyRequiredResources(base=root){
 base=fs.realpathSync(base);
 const manifest=JSON.parse(fs.readFileSync(path.join(base,'references/runtime-manifest.json'),'utf8'));
 const branches=['website-product-floor','developer-portal','website-composed','local-search-validation'];const files=new Set(manifest.files.map(row=>row.path));let links=0,documents=0;
 if(files.size!==manifest.files.length)throw Error('Duplicate manifest resource');
 for(const row of manifest.files){if(path.isAbsolute(row.path)||row.path.includes('\\')||row.path.split('/').includes('..'))throw Error('Unsafe resource path');const file=path.join(base,row.path);if(!fs.existsSync(file))throw Error('Missing required distribution resource: '+row.path);const real=fs.realpathSync(file);if(!real.startsWith(base+path.sep))throw Error('Resource escapes package');if(createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==row.sha256)throw Error('Required resource hash mismatch: '+row.path);
 if(!row.path.endsWith('.md'))continue;documents++;const text=fs.readFileSync(file,'utf8').replace(/```[\s\S]*?```/g,'');
 for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){const href=match[1].trim().replace(/^<|>$/g,'');if(/^(?:[a-z][\w+.-]*:|#)/i.test(href))continue;const clean=decodeURIComponent(href.split('#')[0]);if(!clean)continue;const full=path.resolve(path.dirname(file),clean);if(full!==base&&!full.startsWith(base+path.sep))throw Error('Reference escapes package: '+row.path);if(!fs.existsSync(full))throw Error('Missing required local reference: '+row.path+' -> '+href);const relative=path.relative(base,full).split(path.sep).join('/');if(relative!=='references/runtime-manifest.json'&&!files.has(relative))throw Error('Referenced file omitted from manifest: '+relative);links++;
 }}
 const graph=JSON.parse(fs.readFileSync(path.join(base,'references/required-resource-policy.json'),'utf8'));
 for(const branch of branches){const record=graph.branches[branch];if(!record||!record.core||!record.roots.length)throw Error('Missing core resource branch: '+branch);for(const resource of record.roots)if(!files.has(resource))throw Error('Missing branch root: '+resource)}
 return {ok:true,requiredDistributionFiles:files.size,markdownDocuments:documents,localLinks:links,coreBranches:branches,optional:graph.optionalResources,scope:'all packaged Markdown local references and distribution resources, plus explicit workflow roots; external URLs not fetched'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(verifyRequiredResources(),null,2));
