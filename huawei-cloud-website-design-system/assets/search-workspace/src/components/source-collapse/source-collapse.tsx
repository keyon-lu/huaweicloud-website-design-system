import React from 'react';
import './source-collapse.css';
export const sourceCollapseSkins=['dark-light','dark-transparent','light-transparent'] as const;
export type SourceCollapseHandle={show:()=>void;hide:()=>void;toggle:()=>void};
export type SourceCollapseProps={summary:React.ReactNode;children:React.ReactNode;open?:boolean;defaultOpen?:boolean;onOpenChange?:(open:boolean)=>void;onBeforeOpenChange?:(open:boolean)=>boolean|void;onAfterOpenChange?:(open:boolean)=>void;disabled?:boolean;skin?:typeof sourceCollapseSkins[number];triggerPosition?:'head'|'footer';openSummary?:React.ReactNode;persistentContent?:React.ReactNode;ref?:React.Ref<SourceCollapseHandle>};
export function SourceCollapse({summary,children,open,defaultOpen=false,onOpenChange,onBeforeOpenChange,onAfterOpenChange,disabled=false,skin='dark-light',triggerPosition='head',openSummary,persistentContent,ref}:SourceCollapseProps){
 const [local,setLocal]=React.useState(defaultOpen),expanded=open??local,generated=React.useId(),trigger=React.useRef<HTMLButtonElement>(null),panel=React.useRef<HTMLDivElement>(null),previous=React.useRef(expanded),focusedInside=React.useRef(false);
 React.useEffect(()=>{const track=(e:FocusEvent)=>{focusedInside.current=!!panel.current?.contains(e.target as Node)};document.addEventListener('focusin',track);return()=>document.removeEventListener('focusin',track)},[]);
 if(summary==null||typeof summary==='string'&&!summary.trim())throw Error('Collapse requires an accessible summary');
 const request=(next:boolean)=>{if(disabled||expanded===next||onBeforeOpenChange?.(next)===false)return;if(!next&&panel.current?.contains(document.activeElement))trigger.current?.focus();if(open===undefined)setLocal(next);onOpenChange?.(next)};
 React.useImperativeHandle(ref,()=>({show:()=>request(true),hide:()=>request(false),toggle:()=>request(!expanded)}));
 React.useLayoutEffect(()=>{if(!expanded&&previous.current&&focusedInside.current){trigger.current?.focus();focusedInside.current=false;}if(previous.current!==expanded){previous.current=expanded;onAfterOpenChange?.(expanded)}},[expanded,onAfterOpenChange]);
 const control=<button type="button" id={generated+'-trigger'} ref={trigger} disabled={disabled} aria-expanded={expanded} aria-controls={generated+'-panel'} onClick={()=>request(!expanded)} className={`${triggerPosition==='head'?'por-collapse-trigger source-collapse-trigger':'por-link-nounderline por-link-expend source-collapse-footer-trigger'} ${expanded?'expended':''}`}><span className={triggerPosition==='head'?'por-collapse-head-text':''}>{expanded&&openSummary!=null?openSummary:summary}</span><i className="por-icon por-icon-down" aria-hidden="true"/></button>;
 return <div className={`por-collapse-container source-collapse ${skin==='dark-light'?'':`por-collapse-${skin}`}`}>
 {persistentContent}{triggerPosition==='head'&&control}<div ref={panel} id={generated+'-panel'} role="region" aria-labelledby={generated+'-trigger'} hidden={!expanded} className={`por-collapse ${expanded?'show':''}`}>{children}</div>{triggerPosition==='footer'&&<div className="por-collapse-foot">{control}</div>}
 </div>;
}
export type SourceCollapseGroupProps={items:readonly {id:string;summary:React.ReactNode;content:React.ReactNode;disabled?:boolean}[];multiple?:boolean;value?:readonly string[];defaultValue?:readonly string[];onValueChange?:(value:string[])=>void;skin?:typeof sourceCollapseSkins[number];label:string};
export function SourceCollapseGroup({items,multiple=false,value,defaultValue=[],onValueChange,skin='dark-light',label}:SourceCollapseGroupProps){
 const [local,setLocal]=React.useState<string[]>([...defaultValue]),selected=value??local;
 if(!label.trim()||new Set(items.map(i=>i.id)).size!==items.length||items.some(i=>!i.id)||selected.some(v=>!items.some(i=>i.id===v))||!multiple&&selected.length>1)throw Error('Invalid collapse group label/items/selection');
 const change=(id:string,next:boolean)=>{const result=next?multiple?[...selected,id]:[id]:selected.filter(v=>v!==id);if(value===undefined)setLocal(result);onValueChange?.(result)};
 return <section aria-label={label} className="source-collapse-group">{items.map(item=><SourceCollapse key={item.id} skin={skin} summary={item.summary} disabled={item.disabled} open={selected.includes(item.id)} onOpenChange={next=>change(item.id,next)}>{item.content}</SourceCollapse>)}</section>;
}
