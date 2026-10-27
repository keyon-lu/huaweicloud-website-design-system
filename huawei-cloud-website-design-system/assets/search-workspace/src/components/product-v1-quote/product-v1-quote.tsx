import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import './product-v1-quote.css';
export type ProductV1QuoteSegment={text:string;strong?:boolean;href?:string};
export type ProductV1QuoteGuest={name?:string;role?:string;signatureAsset?:string;signatureAlt?:string;align:'left'|'right'};
export type ProductV1QuoteFloor={kind:'expert-quote-v1';id:string;title:string;subtitle?:string;background:'white'|'grey';cardBackground:'white'|'grey'|'transparent';backgroundAsset?:string;copyAlign:'left'|'right';paragraphs:readonly (readonly ProductV1QuoteSegment[])[];guest?:ProductV1QuoteGuest;media:{kind:'none'}|{kind:'avatar';asset:string;alt:string}|{kind:'portrait';asset:string;mobileAsset:string;alt:string};citeUrl?:string};
export function SourceProductV1Quote({data}:{data:ProductV1QuoteFloor}){
 const [phone,setPhone]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(max-width:768px)').matches);React.useEffect(()=>{const q=matchMedia('(max-width:768px)'),update=()=>setPhone(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 const guest=data.guest,attribution=(data.media.kind==='avatar'||guest)&&<figcaption className={'hc-pv1-quote-guest hc-pv1-quote-guest-'+(guest?.align??'left')}>
  {data.media.kind==='avatar'&&<PortalAsset className="hc-pv1-quote-avatar" assetId={data.media.asset} alt={data.media.alt}/>}
  {guest&&<div className="hc-pv1-quote-attribution">{guest.signatureAsset&&<PortalAsset className="hc-pv1-quote-signature" assetId={guest.signatureAsset} alt={guest.signatureAlt??''}/>} {guest.name&&<p className="hc-pv1-quote-name">{guest.name}</p>}{guest.role&&<p className="hc-pv1-quote-role">{guest.role}</p>}</div>}
 </figcaption>;
 return <section id={data.id} className={'hc-pv1-quote hc-pv1-quote-'+data.background} data-source-pattern="pix-002-26-6499"><div className="por-container"><header><h2>{data.title}</h2>{data.subtitle&&<p>{data.subtitle}</p>}</header>
 <figure className={'hc-pv1-quote-card hc-pv1-quote-card-'+data.cardBackground+' hc-pv1-quote-media-'+data.media.kind+' hc-pv1-quote-copy-'+data.copyAlign}>
  {data.backgroundAsset&&<PortalAsset className="hc-pv1-quote-background" assetId={data.backgroundAsset} alt=""/>}
  {data.media.kind==='portrait'&&<PortalAsset className="hc-pv1-quote-portrait" assetId={phone?data.media.mobileAsset:data.media.asset} alt={data.media.alt}/>}
  <div className="hc-pv1-quote-copy"><blockquote cite={data.citeUrl}>{data.paragraphs.map((p,i)=><p key={i}>{p.map((s,j)=>{const text=s.strong?<strong>{s.text}</strong>:s.text;return s.href?<a href={s.href} key={j}>{text}</a>:<React.Fragment key={j}>{text}</React.Fragment>})}</p>)}</blockquote>{attribution}</div>
 </figure></div></section>
}
