#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {root,compile} from './portal-source.mjs';
try{
 const manifest=JSON.parse(readFileSync(join(root,'references/runtime-manifest.json'),'utf8'));
 for(const row of manifest.files){const path=join(root,row.path);if(!existsSync(path))throw Error(`Missing resource: ${row.path}`);if(createHash('sha256').update(readFileSync(path)).digest('hex')!==row.sha256)throw Error(`Integrity mismatch: ${row.path}`)}
 const routes=JSON.parse(readFileSync(join(root,'references/page-resource-manifest.json'),'utf8')).pageTypes;
 for(const c of Object.values(routes)){for(const path of [c.templatePath,c.layout,...c.references])if(!existsSync(join(root,path)))throw Error(`Missing routed reference: ${path}`);compile(readFileSync(join(root,c.templatePath),'utf8'));for(const v of Object.values(c.variants||{})){for(const path of [v.templatePath,v.requiredReference].filter(Boolean))if(!existsSync(join(root,path)))throw Error(`Missing variant resource: ${path}`);compile(readFileSync(join(root,v.templatePath),'utf8'));}}
 compile(readFileSync(join(root,'src/components/portal-components.tsx'),'utf8'),'portal-components.tsx');
 console.log(JSON.stringify({ok:true,files:manifest.files.length,pageTypes:Object.keys(routes),baseline:'PortalUI 3.0.17',referenceQuality:'not-certified'},null,2));
}catch(e){console.error(e.message);process.exitCode=1}
