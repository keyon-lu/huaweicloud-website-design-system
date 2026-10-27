import fs from 'node:fs';
import path from 'node:path';
import {Babel,root} from './portal-source.mjs';

export function readAcceptedSourceLimitations(base=root){
 const decision=JSON.parse(fs.readFileSync(path.join(base,'references/owner-decisions-2026-10-26.json'),'utf8'));
 if(decision.authority?.type!=='direct-user-reply'||decision.authority.answer!=='按原稿保留并记录未达标限制'||decision.otherAcceptanceWaived!==false||decision.newWholeComponentApprovals!==0)throw Error('Invalid scope of source-limitation decision');
 const expected=new Map([['next-contrast',['next-step-2026','PortalProduct2026Next']],['live-contrast',['live-preview-v1','PortalProductV1LivePreview']]]);
 if(decision.items?.length!==expected.size)throw Error('Unexpected accepted source-limitation scope');
 const ids=new Set();
 for(const item of decision.items){const pair=expected.get(item.id);if(!pair||ids.has(item.id)||item.floorKind!==pair[0]||item.component!==pair[1]||item.decisionStatus!=='resolved'||item.riskDisposition!=='owner-accepted-known-limitation'||item.conformance!=='not-met'||item.wcagAaPass!==false)throw Error('A known contrast failure cannot become an accessibility pass');ids.add(item.id);}
 return decision.items;
}

export function selectedSourceLimitations(source,base=root){
 const items=readAcceptedSourceLimitations(base),kinds=new Set(),components=new Set(),aliases=new Map();
 const ast=Babel.packages.parser.parse(source,{sourceType:'module',plugins:['typescript','jsx']});
 for(const node of ast.program.body)if(node.type==='ImportDeclaration'&&node.source.value==='portal-components')for(const s of node.specifiers??[])if(s.type==='ImportSpecifier')aliases.set(s.local.name,s.imported.name??s.imported.value);
 function walk(n){
  if(!n||typeof n!=='object')return;
  if(Array.isArray(n)){for(const x of n)walk(x);return;}
  if(n.type==='ObjectProperty'&&!n.computed&&(n.key.name??n.key.value)==='kind'&&n.value.type==='StringLiteral')kinds.add(n.value.value);
  if(n.type==='JSXOpeningElement'){const name=n.name.type==='JSXIdentifier'?n.name.name:n.name.type==='JSXMemberExpression'?n.name.property.name:null;if(name)components.add(aliases.get(name)??name);}
  if(n.type==='CallExpression'&&n.callee.type==='MemberExpression'&&n.callee.property.name==='createElement'&&n.arguments[0]?.type==='Identifier')components.add(aliases.get(n.arguments[0].name)??n.arguments[0].name);
  for(const [key,value]of Object.entries(n))if(!['loc','start','end','extra','comments','tokens'].includes(key))walk(value);
 }
 walk(ast);
 return items.filter(x=>kinds.has(x.floorKind)||components.has(x.component)).map(x=>({id:x.id,component:x.component,floorKind:x.floorKind,decisionStatus:x.decisionStatus,conformance:x.conformance,wcagAaPass:false,notice:x.notice,selection:'configured-floor-or-declared-component',decision:'references/owner-decisions-2026-10-26.json'}));
}
