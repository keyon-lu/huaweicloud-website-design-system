import {forwardRef,type InputHTMLAttributes} from 'react';
export type SearchInputProps=Omit<InputHTMLAttributes<HTMLInputElement>,'size'> & {size?:'middle'|'large'};
export const SearchInput=forwardRef<HTMLInputElement,SearchInputProps>(function SearchInput({size='large',className='',...props},ref){
 return <input {...props} ref={ref} className={`por-text-input source-input ${size==='large'?'por-text-input-l':''} ${className}`} />;
});
