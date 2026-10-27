import React from 'react';
import {SourceLink} from '@/components/source-link';
import {SourceCollapse} from '@/components/source-collapse';
import {PortalAsset} from '@/components/portal-asset';
import './faq-list.css';
export type FaqListSegment={text:string;strong?:boolean;href?:string};
export type FaqListBlock={tone:'primary'|'secondary';segments:readonly FaqListSegment[]};
export type FaqListItem={id:string;question:string;blocks:readonly FaqListBlock[]};
export type FaqListProps={id:string;title:string;mobileTitle:string;description?:string;mobileDescription?:string;items:readonly FaqListItem[];desktopExpanded?:boolean};
export function SourceFaqList({id,title,mobileTitle,description,mobileDescription,items,desktopExpanded=false}:FaqListProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||!mobileTitle.trim()||!items.length||new Set(items.map(i=>i.id)).size!==items.length||typeof desktopExpanded!=='boolean'||items.some(i=>!i.id.trim()||!i.question.trim()||!i.blocks.length||i.blocks.some(b=>!['primary','secondary'].includes(b.tone)||!b.segments.length||b.segments.some(s=>!s.text.trim()||s.href!==undefined&&(!s.href.trim()||/^(?:javascript|data|vbscript):/i.test(s.href.trim())||/[\u0000-\u001f\u007f]/.test(s.href))))))throw Error('Invalid FAQ list configuration');
 const answer=(i:FaqListItem)=><div className="hc-faq-answer">{i.blocks.map((b,n)=><p key={n} className={'hc-faq-'+b.tone}>{b.segments.map((s,j)=>{const text=s.strong?<strong>{s.text}</strong>:s.text;return s.href?<SourceLink key={j} href={s.href}>{text}</SourceLink>:<React.Fragment key={j}>{text}</React.Fragment>})}</p>)}</div>;
 const questions=(mobile:boolean)=><div className="hc-faq-list">{items.map(i=><SourceCollapse key={i.id} defaultOpen={!mobile&&desktopExpanded} summary={<span className="hc-faq-question"><PortalAsset assetId="pixso-faq-question" alt=""/><span>{i.question}</span></span>}>{answer(i)}</SourceCollapse>)}</div>;
 return <section id={id} data-source-pattern="pix-002-26-10298" className="hc-faq-floor" aria-labelledby={id+'-title'}><div className="por-container"><header className="hc-faq-heading"><h2 id={id+'-title'}><span className="hc-faq-pc">{title}</span><span className="hc-faq-mobile">{mobileTitle}</span></h2>{(description||mobileDescription)&&<p><span className="hc-faq-pc">{description}</span><span className="hc-faq-mobile">{mobileDescription??description}</span></p>}</header><div className="hc-faq-pc">{questions(false)}</div><div className="hc-faq-mobile">{questions(true)}</div></div></section>;
}
