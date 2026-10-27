import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
const skillRoot=fileURLToPath(new URL('../',import.meta.url));
export async function generateSearchProject(templateDir,output){
 const manifest=JSON.parse(await readFile(path.join(templateDir,'template-manifest.json'),'utf8'));
 const resolved=path.resolve(output);
 if(resolved===path.resolve(templateDir)||resolved.startsWith(path.resolve(templateDir)+path.sep))throw new Error('Output must be outside the template');
 try{const entries=await readdir(resolved);if(entries.length)throw new Error('Output directory must be empty; existing files are preserved')}catch(error){if(error.code!=='ENOENT')throw error}
 const verified=[];
 for(const row of manifest.files){if(!/^[\w./-]+$/u.test(row.path)||row.path.split('/').includes('..')||path.isAbsolute(row.path))throw new Error('Invalid template path');const bytes=await readFile(path.join(templateDir,row.path));if(createHash('sha256').update(bytes).digest('hex')!==row.sha256)throw new Error(`Template hash mismatch: ${row.path}`);verified.push({path:row.path,bytes})}
 await mkdir(resolved,{recursive:true});for(const file of verified){const destination=path.join(resolved,file.path);await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,file.bytes,{flag:'wx'})}
 return {output:resolved,files:verified.length,workflow:'local-search-validation',next:['pnpm install --frozen-lockfile','pnpm run build','pnpm start']};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(!process.argv[2])throw new Error('Usage: node generate-search-project.mjs <EMPTY_OUTPUT_DIR>');
 console.log(JSON.stringify(await generateSearchProject(path.join(skillRoot,'assets/search-workspace'),process.argv[2]),null,2));
}
