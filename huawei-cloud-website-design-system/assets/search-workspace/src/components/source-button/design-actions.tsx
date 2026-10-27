import React from 'react';
import {SourceLink} from '@/components/source-link';
import './source-design-actions.css';
export type SourceDesignActionProps={kind:'text'|'image-text'|'link'|'dropdown';label:string;href?:string;icon?:React.ReactNode;iconPosition?:'before'|'after';options?:readonly {id:string;label:string;href:string}[]};
export function SourceDesignAction({kind,label,href,icon,iconPosition='before',options}:SourceDesignActionProps){
 const [open,setOpen]=React.useState(false),root=React.useRef<HTMLDivElement>(null),trigger=React.useRef<HTMLButtonElement>(null),panelId=React.useId();
 React.useEffect(()=>{if(!open)return;const dismiss=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('pointerdown',dismiss);return()=>document.removeEventListener('pointerdown',dismiss)},[open]);
 if(!label.trim()||!['text','image-text','link','dropdown'].includes(kind))throw Error('Design action requires a known source kind and label');
 if(kind==='image-text'&&!icon)throw Error('Image-text action requires an original source icon');
 if(kind==='dropdown'){
  if(!options?.length||options.some(o=>!o.label.trim()||!o.href.trim())||new Set(options.map(o=>o.id)).size!==options.length)throw Error('Dropdown requires unique labelled link options');
  return <div ref={root} className="source-design-dropdown" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}}}><button ref={trigger} type="button" className="source-design-dropdown-trigger" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(v=>!v)}>{label}{icon}</button>{open&&<ul id={panelId} className="source-design-dropdown-panel" aria-label={label}>{options.map(o=><li key={o.id}><SourceLink href={o.href} onClick={()=>setOpen(false)}>{o.label}</SourceLink></li>)}</ul>}</div>;
 }
 if(!href?.trim())throw Error('Text/link/image action requires its real navigation target');
 return <SourceLink href={href} className={'source-design-action source-design-action-'+kind}>{iconPosition==='before'&&icon}{label}{iconPosition==='after'&&icon}</SourceLink>;
}
