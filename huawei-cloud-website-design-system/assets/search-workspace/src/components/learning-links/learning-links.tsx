import React from 'react';
import {SourceLink} from '@/components/source-link';
import './learning-links.css';
export type LearningLink={label:string;href:string};
export type LearningLinksProps={id:string;title:string;description?:string;items:readonly {title:string;href?:string;links:readonly LearningLink[]}[];mobileItems:readonly LearningLink[]};
export function SourceLearningLinks({id,title,description,items,mobileItems}:LearningLinksProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||items.length<2||items.length>4||!mobileItems.length||items.some(i=>!i.title.trim()||!i.links.length||i.links.some(l=>!l.label.trim()))||mobileItems.some(i=>!i.label.trim()))throw Error('Learning links requires an id/title, 2 to 4 desktop groups, links, and explicitly authored mobile entries');
 return <section id={id} className="hc-learning-floor" aria-labelledby={id+'-title'}><div className="por-container"><header className="hc-learning-heading"><h2 id={id+'-title'}>{title}</h2>{description&&<p>{description}</p>}</header>
 <div className={`hc-learning-desktop hc-learning-count-${items.length}`}>{items.map((item,index)=><article key={index} className="hc-learning-card"><h3>{item.href?<SourceLink href={item.href} icon="more">{item.title}</SourceLink>:item.title}</h3><ul>{item.links.map((link,i)=><li key={i}><SourceLink href={link.href}>{link.label}</SourceLink></li>)}</ul></article>)}</div>
 <ul className="hc-learning-mobile">{mobileItems.map((link,i)=><li key={i}><SourceLink href={link.href} icon="more">{link.label}</SourceLink></li>)}</ul>
 </div></section>;
}
