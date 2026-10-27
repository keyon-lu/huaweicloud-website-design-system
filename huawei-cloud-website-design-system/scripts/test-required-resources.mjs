import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import path from 'node:path';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
import {verifyRequiredResources} from './verify-required-resources.mjs';
const base=await mkdtemp(path.join(tmpdir(),'website-resource-test-'));
const branches=['website-product-floor','developer-portal','website-composed','local-search-validation'];
const sha=s=>createHash('sha256').update(s).digest('hex');
async function fixture({link='[nested](nested.md)',nested=true,listed=true,corrupt=false,escape=false,branch=true}={}){
 const policy=JSON.stringify({branches:Object.fromEntries(branches.filter((_,i)=>branch||i!==0).map(key=>[key,{core:true,roots:['SKILL.md']}])),optionalResources:[]});
 const rows=[{path:'SKILL.md',sha256:sha(link)},{path:'references/required-resource-policy.json',sha256:sha(policy)}];
 if(listed)rows.push({path:'nested.md',sha256:sha('child')});if(escape)rows.push({path:'../outside.md',sha256:sha('')});
 await mkdir(path.join(base,'references'),{recursive:true});await writeFile(path.join(base,'SKILL.md'),link);await writeFile(path.join(base,'references/required-resource-policy.json'),policy);
 if(nested)await writeFile(path.join(base,'nested.md'),'child');else await rm(path.join(base,'nested.md'),{force:true});
 if(corrupt)rows[0].sha256='0'.repeat(64);await writeFile(path.join(base,'references/runtime-manifest.json'),JSON.stringify({files:rows}));
}
try{
 await fixture();assert.equal(verifyRequiredResources(base).ok,true);
 await fixture({nested:false});assert.throws(()=>verifyRequiredResources(base),/Missing required/);
 await fixture({listed:false});assert.throws(()=>verifyRequiredResources(base),/omitted from manifest/);
 await fixture({corrupt:true});assert.throws(()=>verifyRequiredResources(base),/hash mismatch/);
 await fixture({escape:true});assert.throws(()=>verifyRequiredResources(base),/Unsafe resource/);
 await fixture({link:'[escape](../outside.md)'});assert.throws(()=>verifyRequiredResources(base),/escapes package/);
 await fixture({link:'[nested](nested.md#section)'});assert.equal(verifyRequiredResources(base).ok,true);
 await fixture({branch:false});assert.throws(()=>verifyRequiredResources(base),/Missing core resource branch/);
 console.log(JSON.stringify({ok:true,positiveCases:2,negativeCases:6}));
}finally{if(path.dirname(base)!==path.resolve(tmpdir())||!path.basename(base).startsWith('website-resource-test-'))throw Error('Unsafe cleanup');await rm(base,{recursive:true,force:true})}
