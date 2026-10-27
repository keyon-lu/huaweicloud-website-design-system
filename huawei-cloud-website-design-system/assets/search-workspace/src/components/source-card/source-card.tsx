import React from 'react';
import {SourceLink} from '@/components/source-link';
import './source-card.css';
export type SourceCardProps={logo?:React.ReactNode;title:string;description:string;size?:'medium'|'large'|'extra-large'|'panel';align?:'center'|'left';headingLevel?:2|3|4|5|6;href?:string;newWindow?:boolean};
export function SourceCard({logo,title,description,size='large',align='center',headingLevel=3,href,newWindow=false}:SourceCardProps){
 if(!title.trim()||!description.trim()||!['medium','large','extra-large','panel'].includes(size)||!['center','left'].includes(align)||![2,3,4,5,6].includes(headingLevel)||newWindow&&!href)throw Error('Card requires title, description, a supported light size/alignment and valid heading level');
 const Heading=('h'+headingLevel) as 'h2'|'h3'|'h4'|'h5'|'h6',className=`por-card source-card ${size==='medium'?'por-card-m':size==='large'?'por-card-l':size==='extra-large'?'por-card-xl':'por-card-panel'} ${align==='left'?'por-card-align-left':''}`,content=<div className="por-card-content">{logo&&<div className="source-card-logo">{logo}</div>}<div className="source-card-copy"><Heading className="por-text-title-t3">{title}</Heading><div className="por-text-body-t1">{description}</div></div></div>;
 return href?<SourceLink href={href} target={newWindow?'_blank':undefined} className={className} aria-label={title}>{content}</SourceLink>:<article className={className}>{content}</article>;
}
