import fs from 'node:fs';
import {join} from 'node:path';
import {inflateSync} from 'node:zlib';
import {root} from './portal-source.mjs';
// Detect Pixso exports of hidden ancestors: a valid PNG can still be entirely transparent.
function inspect(buffer){
 if(buffer.length<33||!buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('Invalid source PNG');
 const width=buffer.readUInt32BE(16),height=buffer.readUInt32BE(20),depth=buffer[24],color=buffer[25],interlace=buffer[28];
 if(!width||!height)throw Error('Empty source PNG dimensions');
 if(depth!==8||color!==6||interlace!==0)return {width,height,alphaAudited:false};
 const parts=[];for(let p=8;p+12<=buffer.length;){const n=buffer.readUInt32BE(p),type=buffer.toString('ascii',p+4,p+8);if(p+n+12>buffer.length)throw Error('Truncated source PNG');if(type==='IDAT')parts.push(buffer.subarray(p+8,p+8+n));p+=n+12;}
 const raw=inflateSync(Buffer.concat(parts)),stride=width*4;if(raw.length!==(stride+1)*height)throw Error('Invalid PNG pixel length');let previous=Buffer.alloc(stride),visible=false;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c};
 for(let y=0;y<height;y++){const row=Buffer.alloc(stride),start=y*(stride+1),filter=raw[start];if(filter>4)throw Error('Invalid PNG filter');for(let x=0;x<stride;x++){const a=x>=4?row[x-4]:0,b=previous[x],c=x>=4?previous[x-4]:0;row[x]=(raw[start+x+1]+(filter===0?0:filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):paeth(a,b,c)))&255;if(x%4===3&&row[x]>0)visible=true}previous=row;}
 if(!visible)throw Error('All-transparent source PNG; inspect ancestor visibility');return {width,height,alphaAudited:true};
}
const assets=JSON.parse(fs.readFileSync(join(root,'src/assets/assets.json'),'utf8')).assets.filter(a=>(a.id.startsWith('product-2026-')||a.id.startsWith('product-v1-'))&&a.mime==='image/png'),rows=[];
for(const asset of assets){try{rows.push({id:asset.id,...inspect(fs.readFileSync(join(root,asset.path)))})}catch(e){throw Error(asset.id+': '+e.message)}}
console.log(JSON.stringify({ok:true,assets:rows.length,alphaAudited:rows.filter(r=>r.alphaAudited).length,otherPngFormats:rows.filter(r=>!r.alphaAudited).length,scope:'PNG dimensions and RGBA8 transparency only; source visual acceptance separate'}));
