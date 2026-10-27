import React from 'react';
import './source-label.css';
export const sourceLabelColors=['default','red','orange','yellow','lemon','lime','kelly','green','mint','sky','blue','indigo','purple','pink','rose','gold','gold2','green-tag'] as const;
export const sourceLabelSizes=['small','medium','default','large'] as const;
export type SourceLabelProps=Omit<React.HTMLAttributes<HTMLSpanElement>,'color'|'onClick'> & {corner?:boolean;color?:typeof sourceLabelColors[number];size?:typeof sourceLabelSizes[number];icon?:'set';disabled?:boolean;onRemove?:()=>void;removeLabel?:string};
export function SourceLabel({corner=false,color='default',size='default',icon,disabled=false,onRemove,removeLabel,children,className='',...props}:SourceLabelProps){
 if(!sourceLabelColors.includes(color)||!sourceLabelSizes.includes(size))throw Error('Unknown label color or size');
 const visibleContent=React.Children.toArray(children);
 if(!visibleContent.some(item=>typeof item==='string'?!!item.trim():true))throw Error('Label requires visible content');
 if(corner){if(!['red','orange','green','blue','purple'].includes(color)||!['small','default'].includes(size)||icon||disabled||onRemove)throw Error('Corner badge supports only the five design colors and small/default sizes');return <span {...props} className={`source-corner-label source-corner-${color} ${size==='small'?'source-corner-small':''} ${className}`}>{children}</span>;}
 if(onRemove&&!removeLabel?.trim())throw Error('Removable label requires an accessible removeLabel');

 return <span {...props} aria-disabled={disabled||undefined} className={`por-label source-label ${size==='small'?'por-label-s':size==='medium'?'source-label-medium':size==='large'?'por-label-l':''} ${color==='green-tag'?'source-label-green-tag':color==='default'?'':`por-label-${color}`} ${disabled?'por-label-disabled':''} ${onRemove?'source-label-removable':''} ${className}`}>
 {icon&&<i className="por-icon por-icon-set" aria-hidden="true"/>}<span className="source-label-text">{children}</span>
 {onRemove&&<button type="button" className="source-label-remove" aria-label={removeLabel} disabled={disabled} onClick={onRemove}><i className="por-icon por-icon-close" aria-hidden="true"/></button>}
 </span>;
}
