import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import './source-img-viewer.css';
export type SourceImageViewerProps={assetId:React.ComponentProps<typeof PortalAsset>['assetId'];alt:string;openLabel:string;closeLabel:string};
export function SourceImageViewer({assetId,alt,openLabel,closeLabel}:SourceImageViewerProps){
 const dialog=React.useRef<HTMLDialogElement>(null),trigger=React.useRef<HTMLButtonElement>(null),titleId=React.useId(),[open,setOpen]=React.useState(false);
 if(!alt.trim()||!openLabel.trim()||!closeLabel.trim())throw Error('Image viewer requires image description and named open/close controls');
 React.useEffect(()=>{const node=dialog.current;if(!node)return;if(open&&!node.open)node.showModal();if(!open&&node.open)node.close();return()=>{if(node.open)node.close()}},[open]);
 const close=()=>{dialog.current?.close();setOpen(false);trigger.current?.focus()};
 return <div className="source-img-viewer"><button type="button" ref={trigger} className="source-img-viewer-trigger por-img-viewer" aria-label={openLabel} aria-haspopup="dialog" onClick={()=>setOpen(true)}><PortalAsset assetId={assetId} alt={alt}/></button><dialog ref={dialog} className="source-img-viewer-dialog" aria-labelledby={titleId} onCancel={event=>{event.preventDefault();close()}} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close()}}} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget)close()}}><div className="por-modal-inner"><h2 className="por-modal-title" id={titleId}>{alt}</h2><div className="source-img-viewer-image"><PortalAsset assetId={assetId} alt={alt}/></div><div className="por-modal-footer"><button type="button" className="por-btn por-btn-secondary por-btn-default" onClick={close}>{closeLabel}</button></div></div></dialog></div>;
}
