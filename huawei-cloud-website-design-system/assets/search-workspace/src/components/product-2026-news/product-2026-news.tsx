import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import {SourceProduct2026AgentCard} from '@/components/product-2026-agents';
import type {Product2026AgentItem,Product2026AgentLabels} from '@/components/product-2026-agents';
import {SourceProduct2026Actions} from '@/components/product-2026-commands';
import './product-2026-news.css';
export type Product2026NewsItem={id:string;title:string;description?:string;href:string;image?:string;imageAlt?:string;date?:{iso:string;label:string;icon?:string}};
export type Product2026NewsLead={id:string;title:string;description?:string;href:string;asset:string;mobileAsset:string;tone:'ink'|'white';backgroundVideo?:Product2026AgentItem['backgroundVideo'];date?:Product2026NewsItem['date']};
export type Product2026NewsFloor={kind:'news-2026';id:string;title:string;description?:string;lead:Product2026NewsLead;items:readonly Product2026NewsItem[];mobileLead?:Product2026NewsLead;mobileItems?:readonly Product2026NewsItem[];background:'white'|'grey'|'transparent';more?:{label:string;href:string};labels:Product2026AgentLabels};
export function SourceProduct2026News({data}:{data:Product2026NewsFloor}){
 const [mobile,setMobile]=React.useState(()=>typeof window!=='undefined'&&matchMedia('(max-width:599px)').matches);
 React.useEffect(()=>{const q=matchMedia('(max-width:599px)'),change=()=>setMobile(q.matches);change();q.addEventListener('change',change);return()=>q.removeEventListener('change',change)},[]);
 const lead=mobile?data.mobileLead??data.lead:data.lead,items=mobile?data.mobileItems??data.items:data.items,agent:Product2026AgentItem={id:lead.id,title:lead.title,description:lead.description,asset:mobile?lead.mobileAsset:lead.asset,copyWidth:80,cardBackground:'transparent',tone:lead.tone,href:lead.href,linkLabel:lead.title,backgroundVideo:mobile?undefined:lead.backgroundVideo};
 const date=(d:Product2026NewsItem['date'])=>d?<time dateTime={d.iso}>{d.icon&&<PortalAsset assetId={d.icon} alt=""/>}{d.label}</time>:null;
 return <section id={data.id} className={'hc-p26-news hc-p26-news-bg-'+data.background} data-source-pattern="pix-001-2-160593"><div className="por-container"><header><h2>{data.title}</h2>{data.description&&<p>{data.description}</p>}</header><div className="hc-p26-news-layout"><div className="hc-p26-news-lead"><SourceProduct2026AgentCard key={(mobile?'m:':'pc:')+lead.id} item={agent} mobile={false} labels={data.labels}/>{date(lead.date)}</div><div className="hc-p26-news-list">{items.map(i=><a key={i.id} className={'hc-p26-news-small'+(i.image?' has-image':'')} href={i.href}>{i.image&&<PortalAsset assetId={i.image} alt={i.imageAlt??''}/>}<div><h3>{i.title}</h3>{i.description&&<p>{i.description}</p>}{date(i.date)}</div></a>)}</div></div>{data.more&&<SourceProduct2026Actions items={[{...data.more,variant:'text'}]} label={data.labels.actions} placement="floor"/>}</div></section>;
}
