import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
import {parse,generate} from './babel.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const path=resolve(root,'babel-render-tsx/design-system-vendor/react-vendor-19.2.6.js');
const ast=parse(readFileSync(path,'utf8'),{sourceType:'module'}),mapping={};
for(const node of ast.program.body){if(node.type==='ImportDeclaration')throw Error('React vendor must be standalone');if(node.type==='ExportNamedDeclaration')for(const s of node.specifiers)mapping[s.exported.name]=s.local.name;}
if(!mapping.default||!mapping.createRoot)throw Error('Required React exports missing');
ast.program.body=ast.program.body.filter(n=>n.type!=='ExportNamedDeclaration');
const runtime=generate(ast,{compact:true,comments:false}).code+`\nwindow.PortalReactRuntime={React:${mapping.default},createRoot:${mapping.createRoot}};\n`;
mkdirSync(resolve(root,'src/runtime'),{recursive:true});writeFileSync(resolve(root,'src/runtime/react-runtime.js'),runtime);console.log('Built standalone React runtime without H Design components');
