import React from 'react';
import {SourceLink} from '@/components/source-link';
import './document-pager.css';
export type SourceDocumentPagerItem={title:string;href:string;accessibleLabel:string};
export type SourceDocumentPagerProps={label:string;previous?:SourceDocumentPagerItem;next?:SourceDocumentPagerItem};
export function SourceDocumentPager({label,previous,next}:SourceDocumentPagerProps){
 if(!label.trim()||!previous&&!next||[previous,next].some(item=>item&&(!item.title.trim()||!item.accessibleLabel.trim()||!item.href.trim()||/^(?:javascript|data|vbscript):/i.test(item.href.trim())||/[\u0000-\u001f\u007f]/.test(item.href))))throw Error('Document pager requires a navigation label and safe named destinations');
 return <nav className="source-document-pager" aria-label={label}>{previous&&<SourceLink className="source-document-pager-previous" href={previous.href} aria-label={previous.accessibleLabel} rel="prev"><i className="u-icon u-icon-left" aria-hidden="true"/><span>{previous.title}</span></SourceLink>}{next&&<SourceLink className="source-document-pager-next" href={next.href} aria-label={next.accessibleLabel} rel="next"><span>{next.title}</span><i className="u-icon u-icon-right" aria-hidden="true"/></SourceLink>}</nav>;
}
