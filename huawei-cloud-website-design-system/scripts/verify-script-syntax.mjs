import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.mjs')?[path.join(dir,e.name)]:[])}
const files=['scripts','assets/search-workspace/scripts','assets/search-workspace/server','assets/search-workspace/tests'].flatMap(dir=>walk(path.join(root,dir)));
for(const file of files){const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(result.status!==0)throw Error('Invalid executable script: '+path.relative(root,file)+'\n'+result.stderr)}
console.log(JSON.stringify({ok:true,scripts:files.length,scope:'Node module syntax, including shebang placement; actual generation and browser runtime separately verified'}));
