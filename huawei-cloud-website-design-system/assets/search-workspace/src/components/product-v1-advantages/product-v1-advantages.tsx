import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import {SourceLabel} from '@/components/source-label';
import type {SourceLabelProps} from '@/components/source-label';
import {SourceProduct2026Actions} from '@/components/product-2026-commands';
import type {Product2026Action} from '@/components/product-2026-commands';
import './product-v1-advantages.css';
export type ProductV1Advantage={id:string;title:string;description?:string;asset:string;mobileAsset:string;mobileTagAsset?:string;alt:string;tags?:readonly {text:string;color:NonNullable<SourceLabelProps['color']>}[];actions?:readonly Product2026Action[];mobileHref?:string};
export type ProductV1AdvantagesFloor={kind:'advantage-illustrations-v1';id:string;title?:string;subtitle?:string;background:'white'|'grey';cardBackground:'white'|'grey';columns:3|4|5;items:readonly ProductV1Advantage[];labels:{actions:string}};
export function SourceProductV1Advantages({data}:{data:ProductV1AdvantagesFloor}){
 const [phone,setPhone]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(max-width:768px)').matches);React.useEffect(()=>{const q=matchMedia('(max-width:768px)'),update=()=>setPhone(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 return <section id={data.id} className={'hc-pv1-advantages hc-pv1-advantages-'+data.background} data-source-pattern="pix-002-16-22704"><div className="por-container">{(data.title||data.subtitle)&&<header>{data.title&&<h2>{data.title}</h2>}{data.subtitle&&<p>{data.subtitle}</p>}</header>}<div className={'hc-pv1-advantages-grid hc-pv1-advantages-cols-'+data.columns+' hc-pv1-advantages-card-'+data.cardBackground}>{data.items.map(i=><article key={i.id} className={i.tags?.length?'has-tags':''}><div className="hc-pv1-advantages-copy"><h3>{phone&&i.mobileHref?<a href={i.mobileHref}>{i.title}</a>:i.title}</h3>{i.description&&<p>{i.description}</p>}{i.tags&&<div className="hc-pv1-advantages-tags">{i.tags.map((t,k)=><SourceLabel key={k} color={t.color}>{t.text}</SourceLabel>)}</div>}{!phone&&i.actions&&<SourceProduct2026Actions items={i.actions} placement="card" label={data.labels.actions}/>}</div><PortalAsset className="hc-pv1-advantages-image" assetId={phone?(i.tags?.length?i.mobileTagAsset??i.mobileAsset:i.mobileAsset):i.asset} alt={i.alt}/></article>)}</div></div></section>
}
