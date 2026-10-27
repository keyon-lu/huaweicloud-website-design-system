import assert from 'node:assert/strict';import {compile} from './portal-source.mjs';import {verifyButtonCSS} from './button-color-policy.mjs';
for(const source of [
 'export default function Page(){return <button style={{color:"#1476FF"}}>Button</button>}',
 'export default function Page(){return <button style={{background:"rgba(20,118,255,.1)"}}>Button</button>}',
 'const tone="#1476ff";export default function Page(){return <button style={{color:tone}}>Button</button>}',
 'const styles={color:"#1476ff"};export default function Page(){return <button style={styles}>Button</button>}',
 'export default function Page(){return <button><svg><path fill="#1476ff"/></svg></button>}',
 'export default function Page(){return <a role="button" style={{color:"#1476ff"}}>Action</a>}',
 'export default function Page(){return <a className="por-btn" style={{color:"#1476ff"}}>Action</a>}',
 'export default function Page(){return <input type="submit" style={{color:"#1476ff"}}/>}',
 'import {PortalButton as Action} from "portal-components";export default function Page(){return <Action style={{color:"#1476ff"}}>Action</Action>}',
 'const styles={color:"#1476ff"};export default function Page(){return <><div style={styles}/><button style={styles}>Action</button></>}'
])assert.throws(()=>compile(source),/Current owner palette/);
compile('export default function Page(){return <label><input type="checkbox" defaultChecked style={{accentColor:"#1476ff"}}/>复选框</label>}');
compile('export default function Page(){return <div className="text-[#1476ff]"/>}');
compile('export default function Page(){return <svg><path fill="#1476ff"/></svg>}');
compile('export default function Page(){return <p>{"#1476FF is historical source text"}</p>}');
compile('export default function Page(){return <button style={{color:"var(--por-color-text-primary)"}}>Button</button>}');
for(const css of ['button{color:#1476ff}','button:hover svg{fill:rgba(20,118,255,.1)}',':root{--choice:#1476ff;--action:var(--choice)}.por-btn{background:var(--action)}','a[role="button"]{color:#1476ff}','input[type=submit]{background:#1476FF80}'])assert.throws(()=>verifyButtonCSS([css]),/Current owner palette/);
verifyButtonCSS([':root{--choice:#1476ff}input[type=checkbox]:checked{accent-color:var(--choice)}button{color:#191919}.por-link-blue{color:#1476ff}']);
assert.throws(()=>verifyButtonCSS(['button{color:var(--por-base-color-blue-50)}'],{tokenSources:[':root{--por-base-color-blue-50:#1476ff}']}),/Current owner palette/);
console.log(JSON.stringify({ok:true,buttonNegativeCases:10,allowedSourceCases:5,buttonCSSNegativeCases:6,checkboxCSSPositiveCases:1,scope:'button semantics and descendants; checkbox blue explicitly permitted; static checks do not replace rendering'}));
