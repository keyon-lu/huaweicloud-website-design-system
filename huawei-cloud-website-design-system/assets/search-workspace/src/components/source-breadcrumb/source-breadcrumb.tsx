import {SourceLink} from '@/components/source-link';
import './source-breadcrumb.css';
export type SourceBreadcrumbItem={label:string;href?:string};
export function SourceBreadcrumb({items,label,light=false}:{items:readonly SourceBreadcrumbItem[];label:string;light?:boolean}){
 if(!items.length||items.some((item,i)=>!item.label.trim()||i<items.length-1&&!item.href))throw new Error('Breadcrumb needs named items and ancestor navigation targets');
 return <nav className="source-breadcrumb" aria-label={label}><ol role="list" className={`por-breadcrumb ${light?'por-breadcrumb-light':''}`}>{items.map((item,i)=><li key={i} className="por-breadcrumb-item">{item.href?<SourceLink href={item.href} variant={light?'light':'primary'} aria-current={i===items.length-1?'page':undefined}>{item.label}</SourceLink>:<span aria-current={i===items.length-1?'page':undefined}>{item.label}</span>}</li>)}</ol></nav>;
}
