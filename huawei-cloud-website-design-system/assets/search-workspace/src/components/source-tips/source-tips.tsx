import React from 'react';
import {SourceChoice} from '@/components/source-choice';
import './source-tips.css';
export type SourceNoticeProps={message:string;closeLabel:string;appearance?:'gray'|'blue';suppressLabel?:string;onSuppressChange?:(checked:boolean)=>void;tone?:'info'|'success'|'warning'|'error';open?:boolean;defaultOpen?:boolean;onOpenChange?:(open:boolean)=>void;duration?:number};
export function SourceNotice({appearance='gray',suppressLabel,onSuppressChange,message,closeLabel,tone='info',open,defaultOpen=true,onOpenChange,duration=0}:SourceNoticeProps){
 const [local,setLocal]=React.useState(defaultOpen),[paused,setPaused]=React.useState(false),visible=open??local,root=React.useRef<HTMLDivElement>(null),callback=React.useRef(onOpenChange);callback.current=onOpenChange;
 if(!['gray','blue'].includes(appearance)||!message.trim()||!closeLabel.trim()||!['info','success','warning','error'].includes(tone)||!Number.isSafeInteger(duration)||duration<0||duration>2147483647||open!==undefined&&defaultOpen!==true)throw Error('Notice requires message, close label, supported appearance and safe duration');
 const close=()=>{if(open===undefined)setLocal(false);callback.current?.(false)};
 React.useEffect(()=>{if(!visible||paused||!duration)return;const timer=window.setTimeout(close,duration);return()=>window.clearTimeout(timer)},[visible,paused,duration,message,open]);
 if(!visible)return null;
 return <div ref={root} className={'source-global-notice source-global-notice-'+appearance} role="status" aria-atomic="true" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false)}}><div className="source-global-notice-content"><span className="source-global-notice-icon" aria-hidden="true"/><span className="source-global-notice-message">{message}</span>{appearance==='gray'&&suppressLabel&&<SourceChoice label={suppressLabel} onChange={e=>onSuppressChange?.(e.currentTarget.checked)}/>}<button type="button" className="source-global-notice-close" aria-label={closeLabel} onClick={close}/></div></div>;
}
