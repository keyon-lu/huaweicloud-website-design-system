import React from 'react';
import {SourceProduct2026InPageNavigation} from '@/components/product-2026-navigation';
import type {Product2026NavigationProps} from '@/components/product-2026-navigation';
import './product-v1-navigation.css';
export type ProductV1NavigationProps=Omit<Product2026NavigationProps,'mobileActions'|'visibleLimit'|'allowStaticEntries'|'mobileBreakpoint'|'className'>&{mobileHeightProfile:60|70};
export function SourceProductV1InPageNavigation({mobileHeightProfile,...props}:ProductV1NavigationProps){
 const limitNow=():6|7|8=>typeof window==='undefined'?8:innerWidth>1600?8:innerWidth>1280?7:6,[limit,setLimit]=React.useState(limitNow);
 React.useEffect(()=>{const update=()=>setLimit(limitNow());window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[]);
 if(![60,70].includes(mobileHeightProfile)||props.entries.some(e=>(e.children?.length??0)>16))throw Error('V1 navigation requires explicit60/70vh menu-height profile and up to16 secondary entries');
 return <SourceProduct2026InPageNavigation {...props} mobileActions="hide" allowStaticEntries mobileBreakpoint={768} visibleLimit={limit} className={'hc-pv1-nav hc-pv1-nav-height-'+mobileHeightProfile}/>;
}
