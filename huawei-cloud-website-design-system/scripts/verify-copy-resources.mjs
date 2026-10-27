import fs from 'node:fs';import {join} from 'node:path';import {root,Babel} from './portal-source.mjs';
const source=fs.readFileSync(join(root,'src/components/portal-components.tsx'),'utf8'),ast=Babel.packages.parser.parse(source,{sourceType:'module',plugins:['typescript','jsx']});
const declarations=ast.program.body.filter(n=>n.type==='VariableDeclaration').flatMap(n=>n.declarations);const resource=declarations.find(n=>n.id.name==='portalCopy')?.init;
if(!resource||resource.type!=='ObjectExpression')throw Error('Missing unified portalCopy resources');
const messages=Object.fromEntries(resource.properties.map(p=>[p.key.value,p.value.value]));let uses=0;
function walk(node,parent){if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach(n=>walk(n,parent));return}if(node===resource)return;
 if(node.type==='JSXText'&&node.value.trim())throw Error('Unkeyed JSX UI text');
 if(node.type==='StringLiteral'&&/\p{Script=Han}/u.test(node.value)&&!parent?.type?.startsWith('TS'))throw Error('Unkeyed Chinese literal outside portalCopy');
 if(node.type==='CallExpression'&&node.callee.name==='portalText'){if(!messages[node.arguments[0]?.value])throw Error('Unknown UI resource key');uses++}
 if(node.type==='JSXAttribute'&&['fill','stroke','color'].includes(node.name.name)&&node.value?.type==='StringLiteral'&&/^#[\da-f]{3,8}$/i.test(node.value.value))throw Error('Raw SVG color; reference a semantic token');
 for(const [key,value] of Object.entries(node))if(!['start','end','loc','extra','comments'].includes(key)&&value&&typeof value==='object')walk(value,node)
}walk(ast,null);
console.log(JSON.stringify({ok:true,portalResources:Object.keys(messages).length,portalReferences:uses,scope:'static unified zh-CN UI key references and source SVG color tokens; not translation completion or business-content localization'}));
