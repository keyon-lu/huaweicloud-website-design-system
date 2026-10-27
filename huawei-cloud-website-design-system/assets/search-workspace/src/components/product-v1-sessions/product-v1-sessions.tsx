import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import './product-v1-sessions.css';
export type ProductV1Session={id:string;title:string;href:string;icon:string;description:readonly {text:string;important?:boolean}[]};
export type ProductV1SessionsFloor={kind:'session-entry-cards-v1';id:string;title:string;subtitle?:string;mobileTitle?:string;columns:2|3|4;background:'white'|'grey';cardBackground:'white'|'grey';items:readonly ProductV1Session[]};
export function SourceProductV1Sessions({data}:{data:ProductV1SessionsFloor}){
 return <section id={data.id} className={'hc-pv1-sessions hc-pv1-sessions-'+data.background+' hc-pv1-sessions-card-'+data.cardBackground} data-source-pattern="pix-002-16-37699"><div className="por-container"><header><h2><span className="hc-pv1-sessions-pc-title">{data.title}</span><span className="hc-pv1-sessions-phone-title">{data.mobileTitle??data.title}</span></h2>{data.subtitle&&<p>{data.subtitle}</p>}</header><div className={'hc-pv1-sessions-grid hc-pv1-sessions-cols-'+data.columns}>{data.items.map(i=><article key={i.id}><a href={i.href}><PortalAsset assetId={i.icon} alt=""/><div><h3>{i.title}</h3><p>{i.description.map((s,k)=><span className={s.important?'is-important':undefined} key={k}>{s.text}</span>)}</p></div></a></article>)}</div></div></section>
}
