import {text} from './messages.ts';
export async function fetchJson<T>(url:string,signal:AbortSignal,timeoutMs=10000):Promise<T>{
 const controller=new AbortController();let timedOut=false;
 const cancel=()=>controller.abort(signal.reason);
 if(signal.aborted)cancel();else signal.addEventListener('abort',cancel,{once:true});
 const timer=setTimeout(()=>{timedOut=true;controller.abort()},timeoutMs);
 try{
  const response=await fetch(url,{signal:controller.signal,cache:'no-store'});
  if(!response.ok)throw new Error(response.status===400?text("search.label.071bdeab413f"):text("search.label.05980e477a4c"));
  if(!response.headers.get('content-type')?.includes('application/json'))throw new Error(text("search.label.d94a8cb9b5d0"));
  return await response.json() as T;
 }catch(error){
  if(signal.aborted)throw error;
  if(timedOut)throw new Error(text("search.label.910c1972db75"));
  if(error instanceof TypeError)throw new Error(text("search.label.159146df5504"));
  throw error;
 }finally{clearTimeout(timer);signal.removeEventListener('abort',cancel)}
}
