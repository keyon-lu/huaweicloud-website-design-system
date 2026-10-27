import React from 'react';
import {SourceLink} from '@/components/source-link';
import {PortalAsset} from '@/components/portal-asset';
import './latest-updates.css';
export type LatestUpdateItem={id:string;title:string;description:string};
export type LatestUpdateNotice={title?:string;description?:string;asset?:React.ComponentProps<typeof PortalAsset>['assetId'];imageAlt?:string;link?:{label:string;href:string}};
export type LatestUpdatesProps={id:string;title:string;items:readonly LatestUpdateItem[];notice:LatestUpdateNotice;bg?:'white'|'grey';noticeTone?:'white'|'grey'};
export function SourceLatestUpdates({id,title,items,notice,bg='white',noticeTone='grey'}:LatestUpdatesProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||items.length!==4||new Set(items.map(i=>i.id)).size!==4||items.some(i=>!i.id.trim()||!i.title.trim()||!i.description.trim())||!notice||!(notice.title||notice.description||notice.link)||notice.asset&&!notice.imageAlt?.trim()||!['white','grey'].includes(bg)||!['white','grey'].includes(noticeTone))throw Error('Invalid latest updates configuration');
 if(notice.link&&(!notice.link.label.trim()||!notice.link.href.trim()||/^(?:javascript|data|vbscript):/i.test(notice.link.href.trim())||/[\u0000-\u001f\u007f]/.test(notice.link.href)))throw Error('Invalid latest update link');
 return <section id={id} data-source-pattern="pix-002-26-8109" aria-label={title} className={'hc-update-floor hc-update-'+bg}><div className="por-container"><div className={'hc-update-notice hc-update-notice-'+noticeTone}>{notice.asset&&<div className="hc-update-icon"><PortalAsset assetId={notice.asset} alt={notice.imageAlt!}/></div>}<div className="hc-update-notice-copy">{notice.title&&<h2>{notice.title}</h2>}{notice.description&&<p>{notice.description}</p>}{notice.link&&<SourceLink href={notice.link.href} className="hc-update-link">{notice.link.label}<span aria-hidden="true">{'\u203a'}</span></SourceLink>}</div></div><div className="hc-update-grid">{items.map(i=><article key={i.id}><h3>{i.title}</h3><p>{i.description}</p></article>)}</div></div></section>;
}
