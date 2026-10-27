import {formatCount,formatSnapshotDate} from '@/lib/format';
import {text} from '@/lib/messages';
import {useEffect,useState,useId} from 'react';
import {SearchInput} from '@/components/search-input';
import {SourceButton} from '@/components/source-button';
import {categoryLabels,httpSearch,queryString,readQuery,type SearchAdapter,type SearchQuery,type SearchResponse,type Category} from '@/lib/search-api';
export function ContentSearch({adapter=httpSearch,syncUrl=true}: {adapter?:SearchAdapter;syncUrl?:boolean}){
 const fieldId=useId();
 const [query,setQuery]=useState<SearchQuery>(()=>syncUrl?readQuery():{q:'',category:'all',page:1,pageSize:6,sort:'relevance'});
 const [draft,setDraft]=useState(query.q),[data,setData]=useState<SearchResponse|null>(null),[state,setState]=useState<'loading'|'results'|'error'>('loading'),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);
 useEffect(()=>{if(!syncUrl)return;const pop=()=>{const next=readQuery();setQuery(next);setDraft(next.q)};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[syncUrl]);
 useEffect(()=>{const controller=new AbortController();let current=true;setState('loading');setData(null);
  adapter(query,controller.signal).then(result=>{if(current){setData(result);setState('results')}}).catch(reason=>{if(current&&!controller.signal.aborted){setError(reason instanceof Error?reason.message:text("search.label.2b19c4374a5e"));setState('error')}});
  return()=>{current=false;controller.abort()};
 },[adapter,query,attempt]);
 const change=(patch:Partial<SearchQuery>)=>{const next={...query,...patch};setQuery(next);if(syncUrl)history.pushState(null,'',`/?${queryString(next)}`)};
 return <section className="search-content" aria-label={text("search.label.1c248e5692b2")} aria-busy={state==='loading'}>
  <form role="search" className="search-form" onSubmit={event=>{event.preventDefault();if(state==='loading'&&draft.trim()===query.q)return;change({q:draft.trim(),page:1})}}>
   <label htmlFor={fieldId}>{text("search.text.58eec2a91464")}</label><div className="search-fields"><SearchInput id={fieldId} name="q" type="search" maxLength={120} value={draft} onChange={e=>setDraft(e.target.value)} placeholder={text("search.label.dc1ff6b5cb93")}/><SourceButton type="submit" disabled={state==='loading'&&draft.trim()===query.q}>{text("search.text.44ce7ae909bb")}</SourceButton></div>
  </form>
  <div className="search-controls"><label>{text("search.text.6007c2c41799")}<select aria-label={text("search.label.515559957fd3")} value={query.category} onChange={e=>change({category:e.target.value as Category,page:1})}>{Object.entries(categoryLabels).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
   <label>{text("search.text.f4c62c008928")}<select aria-label={text("search.label.a96c9a854190")} value={query.sort} onChange={e=>change({sort:e.target.value as SearchQuery['sort'],page:1})}><option value="relevance">{text("search.text.6bcdba0dd97b")}</option><option value="updated">{text("search.text.e2e6fe5e5b82")}</option></select></label>
   <label>{text("search.text.c582f2e41915")}<select aria-label={text("search.label.940a168911ad")} value={query.pageSize} onChange={e=>change({pageSize:Number(e.target.value),page:1})}><option value="2">{text("search.text.b353dd30cb13")}</option><option value="6">{text("search.text.30c6f0c867a7")}</option><option value="12">{text("search.text.50f0312345a9")}</option></select></label>
   {(query.q||query.category!=='all')&&<SourceButton variant="secondary" onClick={()=>{setDraft('');change({q:'',category:'all',page:1})}}>{text("search.text.cb5d682bac3d")}</SourceButton>}
  </div>
  <div role="status" aria-live="polite">{state==='loading'?text("search.label.1dad8492f8c1"):state==='results'?`${text("search.template.b0f5b7971853")}${formatCount(data?.total??0)}${text("search.template.b8a0b0ee74c2")}`:''}</div>
  {state==='error'&&<div role="alert" className="search-message"><p>{error}</p><SourceButton onClick={()=>setAttempt(value=>value+1)}>{text("search.text.b8784c8dd563")}</SourceButton></div>}
  {state==='results'&&data&&<>
   {data.total===0?<div className="search-message"><h2>{text("search.text.017799558da2")}</h2><p>{text("search.text.3800ad512b35")}</p></div>:data.items.length===0?<div className="search-message"><p>{text("search.text.5e72281ef0b6")}</p><SourceButton onClick={()=>change({page:1})}>{text("search.text.1d964bbcfdb2")}</SourceButton></div>:<div className="search-results" aria-label={text("search.label.88d72ece7cf7")}>{data.items.map(item=><article key={item.id} className="search-result"><div className="search-meta">{categoryLabels[item.category]}{text("search.text.588da4105320")}{formatSnapshotDate(item.updatedAt)}{text("search.text.2ff1c89842c7")}</div><h2><a href={`${item.href}?return=${encodeURIComponent(queryString(query))}`}>{item.title}</a></h2><p>{item.excerpt}</p><ul aria-label={text("search.label.230da343f271")}>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></article>)}</div>}
   {data.pageCount>1&&<nav className="search-pagination" aria-label={text("search.label.53bbcda10dfa")}><SourceButton variant="secondary" disabled={query.page<=1} onClick={()=>change({page:query.page-1})}>{text("search.text.c9b9ae7a6144")}</SourceButton><span>{text("search.text.9552fe3bd366")}{formatCount(query.page)}{text("search.text.005e1574a2b5")}{formatCount(data.pageCount)}{text("search.text.85ca81cf6abd")}</span><SourceButton variant="secondary" disabled={query.page>=data.pageCount} onClick={()=>change({page:query.page+1})}>{text("search.text.8a8542f69648")}</SourceButton></nav>}
  </>}
 </section>;
}
