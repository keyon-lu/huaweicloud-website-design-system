import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const require=createRequire(import.meta.url);
function loadLabel(){
 const directory=mkdtempSync(path.join(tmpdir(),'source-label-test-'));
 let compiled;
 try{
  const source=fileURLToPath(new URL('../src/components/source-label/source-label.tsx',import.meta.url));
  const tsc=fileURLToPath(new URL('../node_modules/typescript/bin/tsc',import.meta.url));
  const result=spawnSync(process.execPath,[tsc,source,'--ignoreConfig','--jsx','react','--module','commonjs','--target','es2022','--esModuleInterop','--skipLibCheck','--noUncheckedSideEffectImports','false','--outDir',directory],{encoding:'utf8'});
  assert.equal(result.status,0,result.stdout+result.stderr);
  compiled=readFileSync(path.join(directory,'source-label.js'),'utf8');
 }finally{assert.ok(path.resolve(directory).startsWith(path.resolve(tmpdir())+path.sep));rmSync(directory,{recursive:true,force:true});}
 const module={exports:{}};
 new Function('require','module','exports',compiled)(id=>id.endsWith('.css')?{}:require(id),module,module.exports);
 return module.exports.SourceLabel;
}
const Label=loadLabel();
test('ordinary labels and corner badges reject content that React does not render',()=>{
 for(const corner of [false,true])for(const children of [undefined,null,true,false,[],[' ',null,false],'   '])
  assert.throws(()=>Label({corner,color:'red',children}),/visible content/);
});
test('a zero value and a nonempty source badge retain their supplied content',()=>{
 assert.equal(Label({corner:true,color:'red',size:'small',children:'原标签'}).props.children,'原标签');
 const ordinary=Label({color:'default',children:0});
 assert.equal(ordinary.props.children[1].props.children,0);
});
