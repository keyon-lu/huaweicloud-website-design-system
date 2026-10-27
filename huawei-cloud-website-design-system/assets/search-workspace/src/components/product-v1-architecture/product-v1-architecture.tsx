import React from 'react';
import {SourceProduct2026SplitCard} from '@/components/product-2026-split';
import type {Product2026SplitFloor,Product2026SplitItem} from '@/components/product-2026-split';
import {SourceProductV1TabStrip} from '@/components/product-v1-tabs';
import './product-v1-architecture.css';
export type ProductV1ArchitectureFloor=Omit<Product2026SplitFloor,'kind'|'title'>&{kind:'architecture-media-v1';title:string;showTitle:boolean};
export function SourceProductV1Architecture({data}:{data:ProductV1ArchitectureFloor}){
 const [mobile,setMobile]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(max-width:768px)').matches);React.useEffect(()=>{const q=matchMedia('(max-width:768px)'),update=()=>setMobile(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 const items=(mobile?data.mobileItems??data.items:data.items).map((i):Product2026SplitItem=>mobile&&i.media.kind==='video'?{...i,media:{kind:'image',mode:'photo',asset:i.media.mobilePoster??i.media.poster,alt:i.title??i.label}}:i),tabs=items.map(i=>({id:i.id,label:i.label,content:<SourceProduct2026SplitCard item={i} mobile={mobile} labels={data.labels}/>}));
 if(!tabs.length)throw Error('V1 architecture floor requires a panel');
 return <section id={data.id} className={'hc-p26-split hc-pv1-architecture hc-p26-split-bg-'+data.background+' hc-p26-split-spacing-'+(data.spacing??'normal')} data-source-pattern="pix-002-26-1"><div className="por-container">{data.showTitle&&<header className="hc-p26-split-heading"><h2>{mobile?data.mobileTitle??data.title:data.title}</h2>{(mobile?data.mobileDescription??data.description:data.description)&&<p>{mobile?data.mobileDescription??data.description:data.description}</p>}</header>}{tabs.length===1?tabs[0].content:<SourceProductV1TabStrip id={data.id+'-tabs'} label={data.labels.tabs} previousLabel={data.labels.previousTab} nextLabel={data.labels.nextTab} items={tabs}/>}</div></section>
}
