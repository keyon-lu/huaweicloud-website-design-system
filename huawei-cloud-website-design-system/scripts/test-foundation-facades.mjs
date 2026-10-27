import fs from 'node:fs';import {join} from 'node:path';import assert from 'node:assert/strict';import {root,Babel} from './portal-source.mjs';
const source=fs.readFileSync(join(root,'src/components/portal-components.tsx'),'utf8'),parse=s=>Babel.packages.parser.parse(s,{sourceType:'module',plugins:['typescript','jsx']});
function declaration(text,name){return parse(text).program.body.find(n=>n.type==='ExportNamedDeclaration'&&n.declaration?.type==='FunctionDeclaration'&&n.declaration.id.name===name).declaration}
const functions=[];
for(const [publicName,localName,folder] of [['PortalLink','SourceLink','source-link'],['PortalBreadcrumb','SourceBreadcrumb','source-breadcrumb']]){
 const local=fs.readFileSync(join(root,`assets/search-workspace/src/components/${folder}/${folder}.tsx`),'utf8'),a=declaration(source,publicName),b=declaration(local,localName);
 const normalize=s=>s.replaceAll('PortalLink','SourceLink').replaceAll('PortalBreadcrumb','SourceBreadcrumb').replaceAll('\r','');
 assert.equal(normalize(source.slice(a.body.start,a.body.end)),normalize(local.slice(b.body.start,b.body.end)),'Offline facade must share the tested implementation logic');functions.push('export '+source.slice(a.start,a.end));
}
const module={exports:{}},React={Fragment:Symbol('Fragment'),createElement:(type,props,...children)=>({type,props:{...props,children}})};
const compiled=Babel.transform(functions.join('\n'),{filename:'facades.tsx',presets:[['typescript',{allExtensions:true,isTSX:true}],['react',{runtime:'classic'}]],plugins:['transform-modules-commonjs']}).code;
new Function('React','module','exports',compiled)(React,module,module.exports);
const {PortalLink,PortalBreadcrumb}=module.exports;
assert.equal(PortalLink({href:'#resources',children:'Resource'}).props.href,'#resources');
assert.equal(PortalLink({href:'/docs',target:'_blank'}).props.rel,'noopener noreferrer');
const disabled=PortalLink({href:'/docs',disabled:true,onClick:()=>{throw Error('Must not be bound')}});assert.equal(disabled.type,'span');assert.equal(disabled.props['aria-disabled'],'true');assert.equal(disabled.props.href,undefined);assert.equal(disabled.props.onClick,undefined);
for(const href of ['','javascript:alert(1)',' data:text/html,x','VBSCRIPT:x','/path\nnext'])assert.throws(()=>PortalLink({href}));
assert.throws(()=>PortalBreadcrumb({items:[],label:'Path'}));assert.throws(()=>PortalBreadcrumb({items:[{label:'Ancestor'},{label:'Current'}],label:'Path'}));
const breadcrumb=PortalBreadcrumb({items:[{label:'Home',href:'#home'},{label:'Current'}],label:'Path'});assert.equal(breadcrumb.type,'nav');assert.equal(breadcrumb.props['aria-label'],'Path');assert.equal(breadcrumb.props.children[0].type,'ol');
console.log(JSON.stringify({ok:true,normalizedFunctionBodiesEqual:2,disabledDropsActivation:true,safeTargetNegativeCases:5,breadcrumbNegativeCases:2,scope:'source/runtime structural checks; live interaction/style/accessibility evidence separate'}));
