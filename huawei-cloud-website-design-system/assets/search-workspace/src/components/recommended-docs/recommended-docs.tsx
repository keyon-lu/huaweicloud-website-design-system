import React from 'react';
import {SourceLink} from '@/components/source-link';
import {SourceCollapse} from '@/components/source-collapse';
import './recommended-docs.css';
export type RecommendedDocLink={label:string;href:string};
export type RecommendedDocGroup={id:string;title:string;links:readonly RecommendedDocLink[];more?:RecommendedDocLink};
export type RecommendedDocsProps={id:string;title:string;description?:string;items:readonly RecommendedDocGroup[];columns:2|3|4|5;mobileEnabled:boolean;bg?:'white'|'grey'};
export function SourceRecommendedDocs({id,title,description,items,columns,mobileEnabled,bg='white'}:RecommendedDocsProps){
 const [open,setOpen]=React.useState<string|null>(items[0]?.id??null);
 const safe=(a:RecommendedDocLink)=>a&&typeof a.label==='string'&&a.label.trim()&&typeof a.href==='string'&&a.href.trim()&&!/^(?:javascript|data|vbscript):/i.test(a.href.trim())&&!/[\u0000-\u001f\u007f]/.test(a.href);
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||![2,3,4,5].includes(columns)||items.length<2||items.length>5||new Set(items.map(i=>i.id)).size!==items.length||typeof mobileEnabled!=='boolean'||!['white','grey'].includes(bg)||items.some(i=>!i.id.trim()||!i.title.trim()||!i.links.length||i.links.some(a=>!safe(a))||i.more&&!safe(i.more)))throw Error('Invalid recommended documents configuration');
 const links=(i:RecommendedDocGroup)=><><ul className="hc-doc-links">{i.links.map((a,n)=><li key={n}><SourceLink href={a.href}>{a.label}</SourceLink></li>)}</ul>{i.more&&<SourceLink className="hc-doc-more" href={i.more.href}>{i.more.label}<span aria-hidden="true">{'\u203a'}</span></SourceLink>}</>;
 return <section id={id} data-source-pattern="pix-002-26-8108" className={'hc-doc-floor hc-doc-'+bg+(mobileEnabled?' hc-doc-mobile-enabled':'')} aria-labelledby={id+'-title'}><div className="por-container"><header className="hc-doc-heading"><h2 id={id+'-title'}>{title}</h2>{description&&<p>{description}</p>}</header><div className={'hc-doc-grid hc-doc-columns-'+columns}>{items.map(i=><article className="hc-doc-card" key={i.id}><h3>{i.title}</h3>{links(i)}</article>)}</div><div className="hc-doc-mobile">{items.map(i=><SourceCollapse key={i.id} summary={i.title} open={open===i.id} onOpenChange={v=>setOpen(v?i.id:null)}>{links(i)}</SourceCollapse>)}</div></div></section>;
}
