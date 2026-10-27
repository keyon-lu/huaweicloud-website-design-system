import React from 'react';
import './product-2026-floor-frame.css';
export type Product2026FloorFrameProps={id:string;title:string;description?:readonly {text:string;href?:string;strong?:boolean}[];align:'center'|'left';background:'white'|'grey'|'transparent';spacing:'normal'|'none';children:React.ReactNode};
export function SourceProduct2026FloorFrame({id,title,description,align,background,spacing,children}:Product2026FloorFrameProps){
 if(!/^[a-z][a-z0-9-]*$/.test(id)||!title.trim()||!['center','left'].includes(align)||!['white','grey','transparent'].includes(background)||!['normal','none'].includes(spacing))throw Error('Invalid2026 floor frame');
 const href=(h:string)=>{if(/[\u0000-\u001f\u007f]/.test(h)||/^(?:javascript|data|vbscript):/i.test(h.trim()))throw Error('Unsafe floor description link');return h};
 return <section id={id} className={'hc-p26-frame hc-p26-frame-align-'+align+' hc-p26-frame-bg-'+background+' hc-p26-frame-spacing-'+spacing} aria-labelledby={id+'-title'} data-source-pattern="pix-001-0-1"><div className="por-container"><header><h2 id={id+'-title'}>{title}</h2>{description&&description.length>0&&<p>{description.map((s,i)=>{const text=s.strong?<strong>{s.text}</strong>:s.text;return s.href?<a key={i} href={href(s.href)}>{text}</a>:<React.Fragment key={i}>{text}</React.Fragment>})}</p>}</header><div className="hc-p26-frame-content">{children}</div></div></section>;
}
