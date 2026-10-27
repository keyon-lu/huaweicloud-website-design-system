import {spawnSync} from 'node:child_process';import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
const hash=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
const commands=[['typecheck',['node_modules/typescript/bin/tsc','--noEmit']],['react-build',['node_modules/vite/bin/vite.js','build']],['storybook-build',['node_modules/storybook/dist/bin/dispatcher.js','build','--disable-telemetry']],['search-tests',['--test','tests/*.test.mjs']]];
await mkdir('evidence',{recursive:true});const checks=[];
for(const [name,args] of commands){const result=spawnSync(process.execPath,args,{encoding:'utf8',env:{...process.env,STORYBOOK_DISABLE_TELEMETRY:'1'},maxBuffer:4*1024*1024});await writeFile(`evidence/${name}.log`,(result.stdout??'')+(result.stderr??''));checks.push({name,exitCode:result.status,error:result.error?.message});console.log(name,result.status);}
const files=['package.json','pnpm-lock.yaml','tsconfig.json','vite.config.ts','index.html','components.json'];
async function collect(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=dir+'/'+entry.name;if(entry.isDirectory())await collect(file);else if(entry.isFile())files.push(file)}}
for(const dir of ['src','scripts','server','tests','data','.storybook'])await collect(dir);
const hashes={};for(const file of files.sort())hashes[file]=await hash(file);
const sourceSnapshotSha256=createHash('sha256').update(JSON.stringify(hashes)).digest('hex');
await writeFile('evidence/verification.json',JSON.stringify({date:new Date().toISOString(),scope:'type/build/API tests of the hashed local source snapshot; Storybook play and visual checks recorded separately; not formal certification',node:process.version,checks,sourceSnapshotSha256,hashes},null,2)+'\n');
if(checks.some(c=>c.exitCode!==0))process.exitCode=1;
