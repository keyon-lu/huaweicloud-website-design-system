import React from 'react';
import './source-choice.css';
export const sourceChoiceKinds=['checkbox','radio'] as const;
export const sourceChoiceAppearances=['basic','card'] as const;
export type SourceChoiceProps=Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'|'children'|'size'|'readOnly'> & {kind?:typeof sourceChoiceKinds[number];appearance?:typeof sourceChoiceAppearances[number];label:React.ReactNode;mixed?:boolean;ref?:React.Ref<HTMLInputElement>};
export function SourceChoice({kind='checkbox',appearance='basic',label,mixed=false,ref,className='',...props}:SourceChoiceProps){
 const input=React.useRef<HTMLInputElement>(null),labelId=React.useId();
 React.useImperativeHandle(ref,()=>input.current!,[]);
 React.useLayoutEffect(()=>{if(input.current)input.current.indeterminate=mixed});
 if(mixed&&(kind!=='checkbox'||appearance!=='basic'))throw Error('Mixed state is defined only for a basic checkbox');
 if(label==null||typeof label==='string'&&!label.trim())throw Error('Choice requires a visible accessible label');
 const native=<input {...props} ref={input} type={kind} className="por-native" aria-labelledby={props['aria-labelledby']??(props['aria-label']?undefined:labelId)} aria-checked={mixed?'mixed':undefined}/>;
 if(appearance==='card')return <label className={`${kind==='radio'?'por-radio-card':'por-checkbox-card'} source-choice-card ${className}`}>{native}<span><span id={labelId}>{label}</span></span></label>;
 return <div className={`por-checkbox-inline source-choice ${className}`}><label><span className={kind==='radio'?'por-radio':'por-checkbox'}>{native}<span aria-hidden="true">{kind==='checkbox'&&(mixed?<span className="source-choice-mixed"/>:<i className="u-icon u-icon-confirm"/>)}</span></span><span id={labelId} className="source-choice-text">{label}</span></label></div>;
}
export type SourceChoiceOption={value:string;label:React.ReactNode;disabled?:boolean};
export type SourceChoiceGroupHandle={getVal:()=>string|string[];getText:()=>React.ReactNode|React.ReactNode[];updateCollapse:()=>void};
export type SourceChoiceGroupProps={label:React.ReactNode;options:readonly SourceChoiceOption[];name?:string;kind?:typeof sourceChoiceKinds[number];appearance?:typeof sourceChoiceAppearances[number];value?:readonly string[];defaultValue?:readonly string[];onValueChange?:(values:string[])=>void;disabled?:boolean;expandLabel?:string;collapseLabel?:string;ref?:React.Ref<SourceChoiceGroupHandle>};
export function SourceChoiceGroup({label,options,name,kind='checkbox',appearance='basic',value,defaultValue=[],onValueChange,disabled=false,expandLabel,collapseLabel,ref}:SourceChoiceGroupProps){
 const generated=React.useId(),groupName=name??generated,root=React.useRef<HTMLFieldSetElement>(null),content=React.useRef<HTMLDivElement>(null);
 const [local,setLocal]=React.useState<string[]>([...defaultValue]),[open,setOpen]=React.useState(false),[layout,setLayout]=React.useState({needsCollapse:false,firstRowCount:options.length,firstRowHeight:0}),[revision,setRevision]=React.useState(0);
 const values=new Set(options.map(o=>o.value)),selected=value??local.filter(v=>values.has(v));
 if(!label||options.some(o=>!o.value)||new Set(options.map(o=>o.value)).size!==options.length||new Set(selected).size!==selected.length||selected.some(v=>!values.has(v))||kind==='radio'&&selected.length>1)throw Error('Invalid choice group label/options/selection');
 if(appearance==='card'&&(!expandLabel?.trim()||!collapseLabel?.trim()))throw Error('Card group requires expand and collapse labels');
 React.useLayoutEffect(()=>{
  if(appearance!=='card'||!content.current)return;
  const el=content.current;let cancelled=false,frame=0;
  const measure=()=>{const cards=[...el.querySelectorAll<HTMLElement>('[data-choice-cell]')];const tops=cards.map(c=>c.getBoundingClientRect().top);const rows=[...new Set(tops.map(t=>Math.round(t)))];const next={needsCollapse:rows.length>4,firstRowCount:tops.filter(t=>Math.abs(t-(tops[0]??0))<1).length,firstRowHeight:Math.max(0,...cards.filter((_,i)=>Math.abs(tops[i]-(tops[0]??0))<1).map(c=>c.getBoundingClientRect().bottom-(tops[0]??0)))};setLayout(old=>old.needsCollapse===next.needsCollapse&&old.firstRowCount===next.firstRowCount&&old.firstRowHeight===next.firstRowHeight?old:next)};
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!cancelled)measure()})};
  measure();const observer=new ResizeObserver(schedule);observer.observe(el);document.fonts.ready.then(schedule);
  return()=>{cancelled=true;cancelAnimationFrame(frame);observer.disconnect()};
 },[appearance,options,revision]);
 React.useEffect(()=>{const form=root.current?.closest('form');if(!form)return;const reset=()=>queueMicrotask(()=>{if(value===undefined)setLocal([...defaultValue]);setRevision(n=>n+1)});form.addEventListener('reset',reset);return()=>form.removeEventListener('reset',reset)},[value,defaultValue]);
 React.useImperativeHandle(ref,()=>({getVal:()=>kind==='radio'?(selected[0]??''):[...selected],getText:()=>kind==='radio'?options.find(o=>o.value===selected[0])?.label:options.filter(o=>selected.includes(o.value)).map(o=>o.label),updateCollapse:()=>setRevision(n=>n+1)}),[kind,selected,options]);
 const change=(option:SourceChoiceOption,checked:boolean)=>{const next=kind==='radio'?[option.value]:checked?[...selected,option.value]:selected.filter(v=>v!==option.value);if(value===undefined)setLocal(next);onValueChange?.(next)};
 const selectedKey=selected.join('\u0000');
 React.useEffect(()=>{if(layout.needsCollapse&&options.some((o,i)=>i>=layout.firstRowCount&&selected.includes(o.value)))setOpen(true)},[layout.needsCollapse,layout.firstRowCount,selectedKey]);
 const collapsed=appearance==='card'&&layout.needsCollapse&&!open;
 const controls=options.map((option,i)=><span key={option.value} data-choice-cell="" className="source-choice-cell" inert={collapsed&&i>=layout.firstRowCount}><SourceChoice kind={kind} appearance={appearance} name={groupName} value={option.value} label={option.label} disabled={disabled||option.disabled} checked={selected.includes(option.value)} onChange={e=>change(option,e.currentTarget.checked)}/></span>);
 return <fieldset ref={root} disabled={disabled} className="source-choice-fieldset"><legend>{label}</legend>{appearance==='basic'?<div className="por-checkbox-group">{controls}</div>:<div style={{'--source-choice-fold-height':layout.firstRowHeight?`${layout.firstRowHeight}px`:undefined} as React.CSSProperties} className={`por-checkbox-card-group source-choice-group ${layout.needsCollapse?'por-checkbox-card-group-collapse':''} ${open?'open':''}`}>
 {layout.needsCollapse&&<button type="button" className="por-checkbox-card-group-more" aria-expanded={open} aria-controls={generated+'-choices'} aria-label={open?collapseLabel:expandLabel} onClick={()=>{if(open&&content.current?.parentElement)content.current.parentElement.scrollTop=0;setOpen(v=>!v)}}><i className="por-icon por-icon-down" aria-hidden="true"/></button>}
 <div className="por-checkbox-card-group-inner" id={generated+'-choices'}><div ref={content} className="por-checkbox-card-group-content">{controls}</div></div></div>}</fieldset>;
}
