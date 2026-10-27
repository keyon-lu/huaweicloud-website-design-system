import React from 'react';
import {PortalAsset} from '@/components/portal-asset';
import './foundation-graphic.css';
export type FoundationGraphicProps={asset:'foundation-2026-elb'|'foundation-2026-user'|'foundation-2026-query';alt?:string;decorative?:boolean};
export function SourceFoundationGraphic({asset,alt,decorative=false}:FoundationGraphicProps){
 if(!['foundation-2026-elb','foundation-2026-user','foundation-2026-query'].includes(asset)||!decorative&&!alt?.trim())throw Error('Choose a verified source graphic and provide an alternative, or explicitly mark decoration');
 const kind=asset==='foundation-2026-query'?'advantage':'architecture';
 return <span className={'hc-foundation-graphic hc-foundation-graphic-'+kind}><PortalAsset assetId={asset} alt={decorative?'':alt!}/></span>;
}
