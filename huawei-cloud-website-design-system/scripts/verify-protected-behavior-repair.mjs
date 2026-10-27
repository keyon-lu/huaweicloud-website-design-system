import {createHash} from 'node:crypto';
import {Babel} from './portal-source.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
const clean=n=>Array.isArray(n)?n.map(clean):n&&typeof n==='object'?Object.fromEntries(Object.entries(n).filter(([k])=>!['start','end','loc','leadingComments','trailingComments','innerComments','extra'].includes(k)).map(([k,v])=>[k,clean(v)])):n;
function normalized(source){
 const ast=Babel.packages.parser.parse(source,{sourceType:'module',plugins:['typescript','jsx']});
 const fn=ast.program.body[0];
 if(fn?.type!=='FunctionDeclaration'||fn.id?.name!=='PortalSolutionCards')throw Error('Unexpected protected repair target');
 const update=fn.body.body.filter(n=>n.type==='FunctionDeclaration'&&n.id?.name==='update');
 if(update.length!==1)throw Error('Protected repair requires exactly one update helper');
 update[0].body={type:'BlockStatement',body:[],directives:[]};
 return JSON.stringify(clean(ast.program));
}
// Preserve the owner snapshot. A specific, recorded bug repair may alter only
// its state-update helper; JSX, other helpers, CSS and consumed tokens stay guarded.
export function verifyProtectedBehaviorRepair(row,current,readText){
 if(row.name!=='PortalSolutionCards')return false;
 let document;try{document=JSON.parse(readText('references/protected-behavior-repairs.json'))}catch{return false}
 const matches=document.repairs?.filter(x=>x.name===row.name)??[];
 if(matches.length!==1)return false;
 const repair=matches[0];
 if(repair.newOwnerApproval!==false||repair.scope!=='focus-continuity-only'||hash(repair.beforeSource)!==row.sha256||hash(current)!==repair.afterSha256)return false;
 return normalized(repair.beforeSource)===normalized(current);
}
