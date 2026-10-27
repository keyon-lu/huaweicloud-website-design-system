import React from 'react';
import './source-select.css';
export type SourceSelectOption={value:string;label:string;disabled?:boolean};
export type SourceSelectProps=Omit<React.SelectHTMLAttributes<HTMLSelectElement>,'children'|'multiple'|'size'|'value'|'defaultValue'> & {label:string;options:readonly SourceSelectOption[];value?:string;defaultValue?:string;appearance?:'default'|'inline'|'text';ref?:React.Ref<HTMLSelectElement>};
export function SourceSelect({label,options,value,defaultValue,appearance='default',ref,className='',...props}:SourceSelectProps){
 const generated=React.useId(),id=props.id??generated;
 if(!['default','inline','text'].includes(appearance)||!label.trim()||!options.length||options.some(o=>!o.label.trim())||new Set(options.map(o=>o.value)).size!==options.length)throw Error('Select requires a label and unique, nonempty options');
 if(value!==undefined&&!options.some(o=>o.value===value)||defaultValue!==undefined&&!options.some(o=>o.value===defaultValue))throw Error('Selected value must exist in options');
 if(value!==undefined&&defaultValue!==undefined)throw Error('Use controlled value or defaultValue');
 return <label className={`source-select-field ${className}`} htmlFor={id}><span>{label}</span><span className={`por-select source-select ${props.disabled?'disabled':''} ${appearance==='default'?'':appearance==='inline'?'por-select-inline':'por-select-inline por-select-text'}`}><select {...props} id={id} ref={ref} value={value} defaultValue={defaultValue} className="por-native">{options.map(option=><option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</select></span></label>;
}
