import React from 'react';
import './source-price.css';
export type SourcePriceProps={amount:string;symbol:string;unit:string;size?:'small'|'default'|'large';className?:string};
export function SourcePrice({amount,symbol,unit,size='default',className=''}:SourcePriceProps){
 if(!['small','default','large'].includes(size)||typeof amount!=='string'||!/^\d+(?:\.\d{1,4})?$/.test(amount)||!symbol.trim()||!unit.trim())throw Error('Price requires an explicit decimal amount, currency symbol and billing unit');
 return <div className={`por-price source-price ${size==='small'?'por-price-s':size==='large'?'por-price-l':''} ${className}`}><div className="por-current-price"><i className="por-price-symbol">{symbol}</i><span>{amount}</span><i className="por-price-unit">{unit}</i></div></div>;
}
