import React from 'react';
import {SourceLink} from '@/components/source-link';
import {SourceLabel} from '@/components/source-label';
import {PortalAsset} from '@/components/portal-asset';
import './icon-text-cards.css';
export type IconTextCardItem={id:string;title:string;description?:string;asset:React.ComponentProps<typeof PortalAsset>['assetId'];imageAlt:string;href?:string;tag?:string};
export type IconTextCardsProps={id:string;title:string;description?:string;items:readonly IconTextCardItem[];columns:2|3|4;iconProfile:'rule-62'|'example-56';bg?:'white'|'grey'};
export function SourceIconTextCards({id,title,description,items,columns,iconProfile,bg='grey'}:IconTextCardsProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||!items.length||new Set(items.map(i=>i.id)).size!==items.length||![2,3,4].includes(columns)||!['rule-62','example-56'].includes(iconProfile)||!['white','grey'].includes(bg)||items.some(i=>!i.id.trim()||!i.title.trim()||!i.asset||typeof i.imageAlt!=='string'||i.href!==undefined&&(!i.href.trim()||/^(?:javascript|data|vbscript):/i.test(i.href.trim())||/[\u0000-\u001f\u007f]/.test(i.href))||i.tag!==undefined&&!i.tag.trim()))throw Error('Invalid icon text cards configuration');
 const content=(i:IconTextCardItem)=><><div className="hc-icon-text-image"><PortalAsset assetId={i.asset} alt={i.imageAlt}/></div><div className="hc-icon-text-copy"><div className="hc-icon-text-heading"><h3>{i.title}</h3>{i.tag&&<SourceLabel color="red" size="small">{i.tag}</SourceLabel>}</div>{i.description&&<p>{i.description}</p>}</div></>;
 return <section id={id} data-source-pattern="pix-002-16-36851" className={'hc-icon-text-floor hc-icon-text-'+bg+' hc-icon-profile-'+iconProfile} aria-labelledby={id+'-title'}><div className="por-container"><header className="hc-icon-text-floor-heading"><h2 id={id+'-title'}>{title}</h2>{description&&<p>{description}</p>}</header><div className={'hc-icon-text-grid hc-icon-text-columns-'+columns}>{items.map(i=>i.href?<SourceLink key={i.id} className="por-card hc-icon-text-card" href={i.href}>{content(i)}</SourceLink>:<article key={i.id} className="por-card hc-icon-text-card">{content(i)}</article>)}</div></div></section>;
}
