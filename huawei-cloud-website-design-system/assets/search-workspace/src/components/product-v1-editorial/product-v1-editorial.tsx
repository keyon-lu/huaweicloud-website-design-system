import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import {SourceProduct2026Actions} from '@/components/product-2026-commands';
import type {Product2026Action} from '@/components/product-2026-commands';
import './product-v1-editorial.css';
export type ProductV1EditorialCard={id:string;category:string;title:string;description?:string;background:'white'|'grey'|'image';asset?:string;tone:'ink'|'white';href?:string;actions?:readonly Product2026Action[]};
export type ProductV1EditorialColumn={id:string;layout:'large'|'small-medium'|'medium-small'|'three-small';items:readonly ProductV1EditorialCard[]};
export type ProductV1EditorialFloor={kind:'editorial-grid-v1';id:string;title:string;subtitle?:string;background:'white'|'grey';columns:readonly [ProductV1EditorialColumn,ProductV1EditorialColumn,ProductV1EditorialColumn];mobileCards:readonly ProductV1EditorialCard[];labels:{actions:string;slides:string;slide:string}};
export function SourceProductV1Editorial({data}:{data:ProductV1EditorialFloor}){
 const [phone,setPhone]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(max-width:768px)').matches),[selected,setSelected]=React.useState(0),track=React.useRef<HTMLDivElement>(null);
 React.useEffect(()=>{const q=matchMedia('(max-width:768px)'),update=()=>{setPhone(q.matches);setSelected(0)};q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 React.useEffect(()=>{const el=track.current;if(!el)return;const read=()=>{let near=0,best=Infinity;Array.from(el.children).forEach((n,i)=>{const delta=Math.abs((n as HTMLElement).offsetLeft-el.offsetLeft-el.scrollLeft);if(delta<best){best=delta;near=i}});setSelected(near)};el.addEventListener('scroll',read,{passive:true});return()=>el.removeEventListener('scroll',read)},[phone]);
 const card=(c:ProductV1EditorialCard,size:string)=><article key={c.id} className={'hc-pv1-editorial-card hc-pv1-editorial-size-'+size+' hc-pv1-editorial-bg-'+c.background+' hc-pv1-editorial-tone-'+c.tone}>
  {c.asset&&c.background==='image'&&<PortalAsset className="hc-pv1-editorial-image" assetId={c.asset} alt=""/>}
  {c.href&&<a className="hc-pv1-editorial-hit" href={c.href} aria-label={c.title}/>}
  <div className="hc-pv1-editorial-copy"><p className="hc-pv1-editorial-category">{c.category}</p><h3>{c.title}</h3>{c.description&&size!=='small'&&<p className="hc-pv1-editorial-description">{c.description}</p>}{c.actions&&<SourceProduct2026Actions items={c.actions} placement="card" label={data.labels.actions}/>}</div>
 </article>;
 return <section id={data.id} className={'hc-pv1-editorial hc-pv1-editorial-'+data.background} data-source-pattern="pix-002-16-30114"><div className="por-container"><header><h2>{data.title}</h2>{data.subtitle&&<p>{data.subtitle}</p>}</header>
 {phone?<div ref={track} className="hc-pv1-editorial-mobile">{data.mobileCards.map(c=>card(c,'mobile'))}</div>:<div className="hc-pv1-editorial-columns">{data.columns.map(col=><div key={col.id} className="hc-pv1-editorial-column">{col.items.map((c,i)=>card(c,col.layout==='large'?'large':col.layout==='three-small'?'small':col.layout==='small-medium'?i===0?'small':'medium':i===0?'medium':'small'))}</div>)}</div>}
 {phone&&data.mobileCards.length>1&&<div className="hc-pv1-editorial-dots" role="group" aria-label={data.labels.slides}>{data.mobileCards.map((c,i)=><button key={c.id} type="button" aria-label={data.labels.slide+' '+(i+1)} aria-pressed={selected===i} onClick={()=>{const el=track.current,n=el?.children[i] as HTMLElement|undefined;if(el&&n)el.scrollTo({left:n.offsetLeft-el.offsetLeft,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}}><span/></button>)}</div>}
 </div></section>
}
