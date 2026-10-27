import type {Meta,StoryObj} from '@storybook/react-vite';import {ContentSearch} from './index';import type {SearchResponse} from '@/lib/search-api';
const result:SearchResponse={query:'',category:'all',sort:'relevance',page:1,pageSize:6,pageCount:1,total:1,facets:{standard:1},indexVersion:'storybook-fixture',items:[{id:'grid',title:'响应式栅格规范',category:'standard',tags:['栅格'],updatedAt:'2026-10-14',excerpt:'Storybook 状态样本，不能充当真实 API 检索证据。',href:'/content/grid'}]};
export default {title:'SourcePilots/ContentSearch',component:ContentSearch,tags:['autodocs'],args:{syncUrl:false,adapter:async()=>result}} satisfies Meta<typeof ContentSearch>;
type Story=StoryObj<typeof ContentSearch>;
export const Playground:Story={};
export const Empty:Story={args:{adapter:async()=>({...result,total:0,items:[],pageCount:0})}};
export const Error:Story={args:{adapter:async()=>{throw new globalThis.Error('检索服务暂时不可用，请重试。')}}};
export const Loading:Story={args:{adapter:(_q,signal)=>new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}))}};
