import {type Ref,type AnchorHTMLAttributes} from 'react';
import './source-link.css';
export const sourceLinkVariants=['primary','secondary','light','blue'] as const;
export const sourceLinkIcons=['none','more','change'] as const;
export type SourceLinkProps=Omit<AnchorHTMLAttributes<HTMLAnchorElement>,'href'>&{href:string;variant?:typeof sourceLinkVariants[number];icon?:typeof sourceLinkIcons[number];disabled?:boolean;ref?:Ref<HTMLAnchorElement>};
export function SourceLink({href,variant='primary',icon='none',disabled=false,children,className='',ref,...props}:SourceLinkProps){
 if(!href.trim()||/^(?:javascript|data|vbscript):/i.test(href.trim())||/[\u0000-\u001f\u007f]/.test(href))throw new Error('SourceLink requires a safe navigation target');
 const classes=`source-link ${variant==='primary'?'por-link':`por-link-${variant}`} ${disabled?'por-link-disabled':''} ${icon==='more'?'por-link-more':icon==='change'?'por-link-change':''} ${className}`;
 const content=<>{children}{icon!=='none'&&<span className={`por-link-icon-right por-icon por-icon-${icon==='more'?'right':'change'}`} aria-hidden="true"/>}</>;
 if(disabled)return <span className={classes} role="link" aria-disabled="true" id={props.id} title={props.title} aria-label={props['aria-label']} aria-describedby={props['aria-describedby']}>{content}</span>;
 return <a {...props} ref={ref} className={classes} href={href} rel={props.rel??(props.target==='_blank'?'noopener noreferrer':undefined)}>{content}</a>;
}
