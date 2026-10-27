import {formatSnapshotDate} from '@/lib/format';
import {text} from '@/lib/messages';
import {useEffect,useState} from 'react';
import {fetchJson} from './lib/request';
import {ContentSearch} from '@/components/content-search';
import {categoryLabels,type SearchItem} from '@/lib/search-api';
type Detail=SearchItem&{body:string;source:{path:string;sha256:string}};
function ContentDetail({id}:{id:string}){
 const [doc,setDoc]=useState<Detail|null>(null),[error,setError]=useState(false),[attempt,setAttempt]=useState(0);
 useEffect(()=>{const controller=new AbortController();setError(false);fetchJson<Detail>(`/api/content/${id}`,controller.signal).then(setDoc).catch(()=>{if(!controller.signal.aborted)setError(true)});return()=>controller.abort()},[id,attempt]);
 const back=new URLSearchParams(location.search).get('return')??'';
 return <article className="search-detail"><a href={`/?${new URLSearchParams(back)}`}>{text("search.text.22cc9cbd8dc0")}</a>{error?<div role="alert"><p>{text("search.text.f0a79401c62b")}</p><button onClick={()=>setAttempt(x=>x+1)}>{text("search.text.b8784c8dd563")}</button></div>:doc?<><p className="search-meta">{categoryLabels[doc.category]}{text("search.text.588da4105320")}{formatSnapshotDate(doc.updatedAt)}{text("search.text.2ff1c89842c7")}</p><h1>{doc.title}</h1><p className="search-body">{doc.body}</p><details><summary>{text("search.text.fc671f111595")}</summary><p>{doc.source.path}</p><code>{doc.source.sha256}</code></details></>:<p role="status">{text("search.text.4c66c1a9e606")}</p>}</article>;
}
export function App(){const match=/^\/content\/([a-z-]+)$/.exec(location.pathname);return <div className="search-app"><header className="search-header"><div className="search-container"><a href="/" className="search-brand">{text("search.text.e6b25b2d10e9")}</a><span>{text("search.text.1c248e5692b2")}</span></div></header><main className="search-container"><div className="search-intro"><p>{text("search.text.65bc7d7497f9")}</p><h1>{text("search.text.9b3feb5fbcc1")}</h1><p>{text("search.text.f0a87502f755")}</p></div>{match?<ContentDetail id={match[1]}/>:<ContentSearch/>}</main><footer className="search-container search-footer">{text("search.text.0ed282646cbc")}</footer></div>}
