import {cloneElement,forwardRef,type ButtonHTMLAttributes,type ReactElement} from 'react';
import './source-button.css';
export const sourceButtonVariants=['primary','secondary','dark','danger','primary-light','light'] as const;
export const sourceButtonSizes=['small','default','middle','large'] as const;
export type SourceButtonProps=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:typeof sourceButtonVariants[number];size?:typeof sourceButtonSizes[number];block?:boolean;icon?:ReactElement<{className?:string;'aria-hidden'?:boolean}>;iconStyle?:'primary'|'light'};
export const SourceButton=forwardRef<HTMLButtonElement,SourceButtonProps>(function SourceButton({variant='primary',size='middle',block=false,icon,iconStyle='primary',children,className='',type='button',...props},ref){
 return <button {...props} ref={ref} type={type} className={`por-btn source-button ${icon?`por-icon-btn-${iconStyle}`:`por-btn-${variant}`} ${size==='default'?'':`por-btn-${size}`} ${block?'por-btn-block':''} ${className}`}>{icon&&cloneElement(icon,{className:`por-btn-icon ${icon.props.className??''}`,'aria-hidden':true})}{children}</button>;
});
