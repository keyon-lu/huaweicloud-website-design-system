import http from 'node:http';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {parseQuery,search,QueryError} from './search.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
export async function createSearchServer({indexPath=path.join(root,'data/search-index.json'),distDir=path.join(root,'dist')}={}){
 const index=JSON.parse(await readFile(indexPath,'utf8'));
 if(index.schemaVersion!==1||!Array.isArray(index.documents)||createHash('sha256').update(JSON.stringify(index.documents)).digest('hex')!==index.version)throw new Error('Invalid or modified search index; rebuild it');
 const files=new Map();
 // Only this NEW application's built entry and Vite-generated assets, never workspace files.
 try{files.set('/',{body:await readFile(path.join(distDir,'index.html')),type:'text/html; charset=utf-8'});
 for(const name of await readdir(path.join(distDir,'assets'))){if(!/^[a-zA-Z0-9_.-]+\.(js|css)$/u.test(name))continue;files.set(`/assets/${name}`,{body:await readFile(path.join(distDir,'assets',name)),type:name.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8'})}}catch(error){if(error.code!=='ENOENT')throw error}
 return http.createServer((req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
  const send=(status,payload)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(req.method==='HEAD'?'':JSON.stringify(payload))};
  const expected=`http://${req.headers.host}`;
  if(!/^127\.0\.0\.1:\d+$/u.test(req.headers.host??''))return send(403,{error:'HOST_REJECTED'});
  if(req.headers.origin&&req.headers.origin!==expected)return send(403,{error:'ORIGIN_REJECTED'});
  if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');return send(405,{error:'METHOD_NOT_ALLOWED'})}
  if((req.url??'').length>2048)return send(414,{error:'URI_TOO_LONG'});
  try{
   const url=new URL(req.url,expected);
   if(url.pathname==='/api/health')return send(200,{status:'ok',mode:'local-validation',documents:index.documents.length,indexVersion:index.version});
   if(url.pathname==='/api/search')return send(200,search(index,parseQuery(url.searchParams)));
   const content=/^\/api\/content\/([a-z-]+)$/u.exec(url.pathname);
   if(content){const doc=index.documents.find(item=>item.id===content[1]);return doc?send(200,doc):send(404,{error:'NOT_FOUND'})}
   const file=files.get(url.pathname)||(/^\/content\/[a-z-]+$/u.test(url.pathname)?files.get('/'):null);
   if(file){res.writeHead(200,{'Content-Type':file.type});return res.end(req.method==='HEAD'?'':file.body)}
   return send(404,{error:'NOT_FOUND'});
  }catch(error){return send(error instanceof QueryError?400:500,{error:error instanceof QueryError?'INVALID_QUERY':'INTERNAL_ERROR',message:error instanceof QueryError?error.message:'检索暂时不可用'})}
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const port=Number(process.env.SEARCH_PORT??4317);if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Invalid SEARCH_PORT');
 const server=await createSearchServer();server.listen(port,'127.0.0.1',()=>console.log(`Local search: http://127.0.0.1:${port}`));
 for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
