import React from 'react';
export type SourceScrollbarProps=Omit<React.HTMLAttributes<HTMLDivElement>,'role'|'tabIndex'> & {label:string;maxHeight:number;size?:'small'|'medium';ref?:React.Ref<HTMLDivElement>};
export function SourceScrollbar({label,maxHeight,size='medium',ref,className='',style,children,...props}:SourceScrollbarProps){
 if(!['small','medium'].includes(size)||!label.trim()||!Number.isFinite(maxHeight)||maxHeight<=0)throw Error('Scroll region requires a label and positive finite maxHeight');
 return <div {...props} ref={ref} role="region" aria-label={label} tabIndex={0} className={`${size==='small'?'por-scrollbar-s':'por-scrollbar-m'} ${className}`} style={{...style,maxHeight,overflow:'auto',overflowWrap:'anywhere'}}>{children}</div>;
}
