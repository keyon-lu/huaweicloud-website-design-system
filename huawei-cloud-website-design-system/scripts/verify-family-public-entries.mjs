import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {root,Babel} from './portal-source.mjs';
const registry=JSON.parse(fs.readFileSync(path.join(root,'references/source-family-registry.json'),'utf8')),parser=Babel.packages.parser;
const parse=text=>parser.parse(text,{sourceType:'module',plugins:['typescript','jsx']});
const read=rel=>{assert.ok(!path.isAbsolute(rel)&&!rel.split('/').includes('..'));return fs.readFileSync(path.join(root,rel),'utf8')};
const rows=[];
for(const component of registry.components){
 assert.ok(component.entry.endsWith(`/components/${component.id}/index.ts`),'Public entry must belong to its component ID');read(component.spec);
 const index=parse(read(component.entry)),exported=new Set(index.program.body.flatMap(node=>node.type==='ExportNamedDeclaration'?node.specifiers.map(specifier=>specifier.exported.name):[]));
 const implemented=new Set(),dependencies=new Set();
 for(const file of component.implementationFiles){assert.ok(file.includes(`/components/${component.id}/`));for(const node of parse(read(file)).program.body){if(node.type==='ExportNamedDeclaration'){if(node.declaration?.type==='FunctionDeclaration')implemented.add(node.declaration.id.name);if(node.declaration?.type==='VariableDeclaration')for(const decl of node.declaration.declarations)implemented.add(decl.id.name)}if(node.type==='ImportDeclaration'&&node.source.value.startsWith('@/components/')){const suffix=node.source.value.slice('@/components/'.length);assert.ok(!suffix.includes('/'),'Dependency must use its public entry');dependencies.add(suffix)}}}
 for(const name of component.publicExports){assert.ok(exported.has(name),`${component.id} missing public export ${name}`);assert.ok(implemented.has(name),`${component.id} missing own implementation ${name}`)}
 assert.deepEqual([...dependencies].sort(),[...component.dependencies].sort(),`${component.id} dependency registry drift`);
 for(const id of dependencies)assert.ok(registry.components.some(row=>row.id===id),'Unregistered dependency '+id);
 rows.push({id:component.id,entry:component.entry,exports:component.publicExports,dependencies:[...dependencies],status:'passed'});
}
console.log(JSON.stringify({ok:true,components:rows.length,dedicatedFamilies:registry.families.filter(row=>row.publicComponentIds.length).length,rows,scope:'Public entry/owned implementation/dependency structure only; no visual or manual accessibility approval'},null,2));
