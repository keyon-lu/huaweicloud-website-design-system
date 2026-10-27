import {performance} from 'node:perf_hooks';import {once} from 'node:events';import {mkdir,writeFile,readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
import {createSearchServer} from '../server/server.mjs';
const server=await createSearchServer();server.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}`,samples=[],errors=[];let next=0;
const query=async()=>{const start=performance.now();const response=await fetch(base+'/api/search?q='+encodeURIComponent('栅格'),{signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('HTTP '+response.status);const result=await response.json();if(result.total<1||!result.items.some(item=>item.id==='grid'))throw Error('Incorrect retrieval result');return performance.now()-start};
try{
 for(let i=0;i<10;i++)await query();
 const start=performance.now();await Promise.all(Array.from({length:10},async()=>{while(next++<100){try{samples.push(await query())}catch(error){errors.push(error.message)}}}));const elapsed=performance.now()-start;
 samples.sort((a,b)=>a-b);const percentile=p=>samples[Math.max(0,Math.ceil(samples.length*p)-1)]??null;
 const hashes={};for(const file of ['server/server.mjs','server/search.mjs','data/search-index.json'])hashes[file]=createHash('sha256').update(await readFile(file)).digest('hex');
 const report={observedAt:new Date().toISOString(),scope:'local loopback, 8 allowlisted documents, one Node process; not a production SLA',node:process.version,warmup:10,requests:100,concurrency:10,successful:samples.length,errors,p50Ms:percentile(.5),p95Ms:percentile(.95),elapsedMs:elapsed,candidateP95BudgetMs:200,hashes};
 report.ok=report.successful===100&&errors.length===0&&report.p95Ms<=200;
 await mkdir('evidence',{recursive:true});await writeFile('evidence/search-benchmark.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
}finally{await new Promise(resolve=>server.close(resolve))}
