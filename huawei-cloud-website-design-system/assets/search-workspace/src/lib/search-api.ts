import {text} from './messages.ts';
import {fetchJson} from './request';
export const categoryLabels={all:text("search.label.5c55a67935af"),standard:text("search.label.5037d797e4a9"),product:text("search.label.aea82737cc01"),developer:text("search.label.38084d301e3f"),resource:text("search.label.4b35d585aaf6")} as const;
export type Category=keyof typeof categoryLabels;
export type SearchQuery={q:string;category:Category;page:number;pageSize:number;sort:'relevance'|'updated'};
export type SearchItem={id:string;title:string;category:Exclude<Category,'all'>;tags:string[];updatedAt:string;excerpt:string;href:string};
export type SearchResponse={query:string;category:Category;sort:string;page:number;pageSize:number;pageCount:number;total:number;facets:Record<string,number>;items:SearchItem[];indexVersion:string};
export type SearchAdapter=(query:SearchQuery,signal:AbortSignal)=>Promise<SearchResponse>;
export function queryString(query:SearchQuery){return new URLSearchParams({q:query.q,category:query.category,page:String(query.page),pageSize:String(query.pageSize),sort:query.sort}).toString()}
export function readQuery():SearchQuery{
 const p=new URLSearchParams(window.location.search),category=p.get('category')??'all';
 const positive=(key:string,fallback:number,max:number)=>{const raw=p.get(key)??'';return /^[1-9]\d*$/.test(raw)&&Number(raw)<=max?Number(raw):fallback};
 return {q:(p.get('q')??'').slice(0,120),category:Object.hasOwn(categoryLabels,category)?category as Category:'all',sort:p.get('sort')==='updated'?'updated':'relevance',page:positive('page',1,10000),pageSize:positive('pageSize',6,30)};
}
export const httpSearch:SearchAdapter=(query,signal)=>fetchJson<SearchResponse>(`/api/search?${queryString(query)}`,signal);
