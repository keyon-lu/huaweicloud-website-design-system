import {useEffect,useId,useRef,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {SourceButton} from '@/components/source-button';
import './source-modal.css';
let activeHost:HTMLElement|null=null;
export type SourceModalProps={open:boolean;onOpenChange:(open:boolean)=>void;title:string;children:ReactNode;size?:'small'|'middle'|'large'|'xlarge';closeLabel:string;closeIconLabel?:string;icon?:'prompt'|'success'|'warn'|'error';backdropClose?:boolean;footer?:ReactNode};
export function SourceModal({open,onOpenChange,title,children,size='small',closeLabel,closeIconLabel,icon,backdropClose=true,footer}:SourceModalProps){
 const id=useId(),dialog=useRef<HTMLDivElement>(null),callback=useRef(onOpenChange);callback.current=onOpenChange;
 const [host,setHost]=useState<HTMLDivElement|null>(null);
 useEffect(()=>{const node=document.createElement('div');node.dataset.sourceModalHost='true';document.body.append(node);setHost(node);return()=>node.remove()},[]);
 useEffect(()=>{
  if(!open||!host)return;if(activeHost&&activeHost!==host){callback.current(false);return}activeHost=host;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const siblings=[...document.body.children].filter((node):node is HTMLElement=>node instanceof HTMLElement&&node!==host);const inert=siblings.map(node=>[node,node.inert] as const);inert.forEach(([node])=>{node.inert=true});
  const locked=document.body.classList.contains('por-modal-open');document.body.classList.add('por-modal-open');
  const focusable=()=>[...(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')??[])].filter(node=>node.getClientRects().length>0);
  (focusable()[0]??dialog.current)?.focus();
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();callback.current(false)}else if(event.key==='Tab'){const items=focusable(),first=items[0],last=items.at(-1);if(!first){event.preventDefault();dialog.current?.focus()}else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}};
  document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);inert.forEach(([node,value])=>{node.inert=value});if(!locked)document.body.classList.remove('por-modal-open');if(activeHost===host)activeHost=null;if(previous?.isConnected)previous.focus()};
 },[open,host]);
 if(!open||!host)return null;
 return createPortal(<div className="source-modal-shell"><div className="por-modal-backdrop show"/><div ref={dialog} className="por-modal show" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-body`} tabIndex={-1} onClick={event=>{if(backdropClose&&event.target===event.currentTarget)callback.current(false)}}><div className={`por-modal-dialog por-modal-dialog-${size}`}><div className="por-modal-inner"><div className="por-modal-head">{icon&&<span className={`por-modal-icon por-icon por-icon-${icon}`} aria-hidden="true"/>}<h2 className="por-modal-title" id={`${id}-title`}>{title}</h2></div><div className="por-modal-body" id={`${id}-body`}>{children}</div><div className="por-modal-footer">{footer??<SourceButton size="default" onClick={()=>callback.current(false)}>{closeLabel}</SourceButton>}</div></div><button type="button" className="por-modal-close" aria-label={closeIconLabel??closeLabel} onClick={()=>callback.current(false)}><i className="u-icon u-icon-cancel" aria-hidden="true"/></button></div></div></div>,host);
}
