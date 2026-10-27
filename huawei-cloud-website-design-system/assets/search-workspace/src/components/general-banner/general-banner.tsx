import React from 'react';
import {SourceLink} from '@/components/source-link';
import './general-banner.css';
export type GeneralBannerAction={label:string;href:string;variant?:'primary'|'secondary'|'text'};
export type GeneralBannerProps={id:string;title:string;description?:string;mobileTitle?:string;mobileDescription?:string;items:readonly GeneralBannerAction[];height:350|450;textWidth:50|80};
export function SourceGeneralBanner({id,title,description,mobileTitle,mobileDescription,items,height,textWidth}:GeneralBannerProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||![350,450].includes(height)||![50,80].includes(textWidth)||items.length>3||items.some(a=>!a.label.trim()||!a.href.trim()||/^(?:javascript|data|vbscript):/i.test(a.href.trim())||/[\u0000-\u001f\u007f]/.test(a.href)||a.variant&&!['primary','secondary','text'].includes(a.variant)))throw Error('Invalid plain general banner configuration');
 return <section id={id} data-source-pattern="pix-002-3-1414" aria-labelledby={id+'-title'} className={'hc-general-banner hc-banner-height-'+height+' hc-banner-width-'+textWidth}><div className="por-container"><div className="hc-banner-copy"><h2 id={id+'-title'}><span className="hc-banner-desktop-copy">{title}</span><span className="hc-banner-mobile-copy">{mobileTitle??title}</span></h2>{(description||mobileDescription)&&<p><span className="hc-banner-desktop-copy">{description}</span><span className="hc-banner-mobile-copy">{mobileDescription??description}</span></p>}{!!items.length&&<div className="hc-banner-actions">{items.map((a,n)=><SourceLink key={n} className={'hc-banner-action hc-banner-action-'+(a.variant??'secondary')} href={a.href}>{a.label}</SourceLink>)}</div>}</div></div></section>;
}
