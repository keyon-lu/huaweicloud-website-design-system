export const categories = ['standard', 'product', 'developer', 'resource'];
export class QueryError extends Error {}
export const normalize = value => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/\s+/gu, ' ').trim();
export function parseQuery(params) {
  for (const key of params.keys()) if (!['q','category','page','pageSize','sort'].includes(key)) throw new QueryError(`未知参数：${key}`);
  for (const key of new Set(params.keys())) if (params.getAll(key).length !== 1) throw new QueryError(`参数不可重复：${key}`);
  const q = normalize(params.get('q') ?? '');
  if (q.length > 120 || /[\u0000-\u001f\u007f]/u.test(q)) throw new QueryError('关键词应为120字以内的文本');
  const category=params.get('category')??'all', sort=params.get('sort')??'relevance';
  if (category!=='all'&&!categories.includes(category)) throw new QueryError('不支持的分类');
  if (!['relevance','updated'].includes(sort)) throw new QueryError('不支持的排序');
  const number=(name,fallback,max)=>{const raw=params.get(name)??String(fallback);if(!/^[1-9]\d*$/u.test(raw)||Number(raw)>max)throw new QueryError(`无效的${name}`);return Number(raw)};
  return {q,category,sort,page:number('page',1,10000),pageSize:number('pageSize',6,30)};
}
export function search(index, query) {
  const terms=query.q.split(' ').filter(Boolean);
  const scored=index.documents.map(doc=>{
    const title=normalize(doc.title), body=normalize(doc.body), tags=normalize(doc.tags.join(' '));
    if(!terms.every(term=>title.includes(term)||body.includes(term)||tags.includes(term)))return null;
    const score=terms.reduce((sum,term)=>sum+(title.includes(term)?10:0)+(tags.includes(term)?4:0)+(body.includes(term)?1:0),0);
    return {doc,score};
  }).filter(Boolean);
  const facets=Object.fromEntries(categories.map(category=>[category,scored.filter(item=>item.doc.category===category).length]));
  const filtered=scored.filter(item=>query.category==='all'||item.doc.category===query.category);
  filtered.sort((a,b)=>(query.sort==='relevance'?b.score-a.score:0)||b.doc.updatedAt.localeCompare(a.doc.updatedAt)||a.doc.id.localeCompare(b.doc.id));
  const total=filtered.length;
  const items=filtered.slice((query.page-1)*query.pageSize,query.page*query.pageSize).map(({doc})=>{
    const first=terms.length?normalize(doc.body).indexOf(terms[0]):-1;
    const offset=Math.max(0,first-50);
    return {id:doc.id,title:doc.title,category:doc.category,tags:doc.tags,updatedAt:doc.updatedAt,excerpt:(offset?'…':'')+doc.body.slice(offset,offset+180)+(doc.body.length>offset+180?'…':''),href:`/content/${doc.id}`};
  });
  return {query:query.q,category:query.category,sort:query.sort,page:query.page,pageSize:query.pageSize,total,pageCount:Math.ceil(total/query.pageSize),facets,items,indexVersion:index.version};
}
