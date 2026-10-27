import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import './product-v1-contact.css';
export type ProductV1ContactText={text:string;href?:string};
export type ProductV1ContactItem={id:string;title:ProductV1ContactText;description?:ProductV1ContactText;icon?:string;dividerAfter?:boolean};
export type ProductV1ContactProps={id:string;label:string;items:readonly ProductV1ContactItem[];panelWidth?:number;align:'left'|'right'};
export function SourceProductV1ContactDropdown({id,label,items,panelWidth=240,align}:ProductV1ContactProps){
 const [open,setOpen]=React.useState(false),root=React.useRef<HTMLDivElement>(null),trigger=React.useRef<HTMLButtonElement>(null);
 const valid=(v:ProductV1ContactText)=>v&&typeof v.text==='string'&&!!v.text.trim()&&(v.href===undefined||typeof v.href==='string'&&!!v.href.trim()&&!/^(?:javascript|data|vbscript):/i.test(v.href.trim())&&!/[\u0000-\u001f\u007f]/.test(v.href));
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!label.trim()||!items.length||new Set(items.map(i=>i.id)).size!==items.length||!Number.isFinite(panelWidth)||panelWidth<240||!['left','right'].includes(align)||items.some(i=>!i.id||!valid(i.title)||i.description&&!valid(i.description)))throw Error('Invalid source contact dropdown');
 React.useEffect(()=>{const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)},[]);
 const text=(v:ProductV1ContactText)=>v.href?<a href={v.href} onClick={()=>setOpen(false)}>{v.text}</a>:v.text;
 return <div ref={root} className={'hc-pv1-contact hc-pv1-contact-'+align} style={{'--pv1-contact-width':panelWidth+'px'} as React.CSSProperties} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>{if(!root.current?.contains(document.activeElement))setOpen(false)}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setOpen(false)}} onKeyDown={e=>{if(e.key==='Escape'&&open){e.preventDefault();setOpen(false);trigger.current?.focus()}}} data-source-pattern="pix-002-12-54491"><button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(o=>!o)}>{label}</button><div className="hc-pv1-contact-panel" id={id} hidden={!open}><ul>{items.map(i=><li key={i.id} className={(i.icon?'has-icon ':'')+(i.dividerAfter?'has-divider':'')}><div className="hc-pv1-contact-heading">{i.icon&&<PortalAsset assetId={i.icon} alt=""/>}<span>{text(i.title)}</span></div>{i.description&&<p>{text(i.description)}</p>}</li>)}</ul></div></div>
}
