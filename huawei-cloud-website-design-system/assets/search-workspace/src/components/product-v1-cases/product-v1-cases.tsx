import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import {SourceTabs} from '@/components/source-tabs';
import {SourceProduct2026Actions} from '@/components/product-2026-commands';
import type {Product2026Action} from '@/components/product-2026-commands';
import {SourceProduct2026VideoDialog} from '@/components/product-2026-video';
import type {Product2026Video,Product2026VideoLabels} from '@/components/product-2026-video';
import './product-v1-cases.css';
export type ProductV1Case={id:string;label:string;title:string;mobileTitle?:string;description?:string;mobileDescription?:string;backgroundAsset:string;mobileBackgroundAsset:string;logoLayout:boolean;logo?:string;action?:Product2026Action;video?:{poster:string;video:Product2026Video}};
export type ProductV1CasesFloor={kind:'customer-story-v1';id:string;title:string;tone:'white'|'ink';items:readonly ProductV1Case[];labels:{tabs:string;previous:string;next:string;actions:string;video:Product2026VideoLabels}};
export function SourceProductV1Cases({data}:{data:ProductV1CasesFloor}){
 const [phone,setPhone]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(max-width:768px)').matches),[value,setValue]=React.useState(data.items[0]?.id);
 React.useEffect(()=>{const q=matchMedia('(max-width:768px)'),update=()=>setPhone(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 const active=data.items.find(i=>i.id===value)??data.items[0],reserveLogo=data.items.some(i=>i.logoLayout);if(!active)throw Error('Case panels required');
 const panels=data.items.map(i=>({id:i.id,label:i.label,content:<article className="hc-pv1-case-copy">{reserveLogo&&!phone&&<div className="hc-pv1-case-logo-slot">{i.logoLayout&&i.logo&&<PortalAsset assetId={i.logo} alt={i.label}/>}</div>}<h3>{phone?i.mobileTitle??i.title:i.title}</h3>{(phone?i.mobileDescription??i.description:i.description)&&<p>{phone?i.mobileDescription??i.description:i.description}</p>}{i.video&&i.id===active.id&&<SourceProduct2026VideoDialog title={i.title} poster={i.video.poster} video={i.video.video} labels={data.labels.video}><PortalAsset assetId="product-2026-video-play" alt=""/></SourceProduct2026VideoDialog>}{!phone&&i.action&&<SourceProduct2026Actions items={[i.action]} placement="card" label={data.labels.actions}/>}</article>}));
 return <section id={data.id} className={'hc-pv1-cases hc-pv1-cases-'+data.tone+(reserveLogo?' has-logos':' no-logos')} data-source-pattern="pix-002-26-5013"><PortalAsset className="hc-pv1-cases-bg" assetId={phone?active.mobileBackgroundAsset:active.backgroundAsset} alt=""/><div className="por-container"><h2>{data.title}</h2><SourceTabs label={data.labels.tabs} items={panels} value={active.id} onValueChange={setValue} align="center" scroll previousLabel={data.labels.previous} nextLabel={data.labels.next}/></div></section>
}
