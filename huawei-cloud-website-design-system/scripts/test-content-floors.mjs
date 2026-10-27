import assert from 'node:assert/strict';
import fs from 'node:fs';
import {join} from 'node:path';
import {root} from './portal-source.mjs';
import {validateContentFloor} from './content-floor-content.mjs';
import {validateComposedContent} from './composed-content.mjs';
const sample=JSON.parse(fs.readFileSync(join(root,'src/pages/portal-composed/content-floors-fixtures.json'),'utf8'));
const assets=new Set(JSON.parse(fs.readFileSync(join(root,'src/assets/assets.json'),'utf8')).assets.map(a=>a.id));
const validate=f=>validateContentFloor(f,undefined,id=>assert.ok(assets.has(id),'unregistered asset'));
let configurations=0,rejected=0;
for(const desktopExpanded of [true,false]){validate({...sample['faq-list'],desktopExpanded});configurations++;}
for(const columns of [2,3,4])for(const iconProfile of ['rule-62','example-56'])for(const bg of ['white','grey']){validate({...sample['icon-text-cards'],columns,iconProfile,bg});configurations++;}
for(const count of [2,3,4,5])for(const columns of [2,3,4,5])for(const mobileEnabled of [true,false]){
 const f={...structuredClone(sample['recommended-docs']),columns,mobileEnabled};f.items=Array.from({length:count},(_,i)=>({...f.items[i%3],id:'group-'+i}));validate(f);configurations++;
}
for(const height of [350,450])for(const textWidth of [50,80])for(const count of [0,1,2,3]){const f={...structuredClone(sample['general-banner']),height,textWidth};f.items=Array.from({length:count},(_,i)=>({...f.items[i%2]}));validate(f);configurations++;}
for(const notice of [{description:'纯正文公告'},{title:'纯标题公告'},{link:{label:'独立入口',href:'#updates'}},sample['latest-updates'].notice])for(const bg of ['white','grey'])for(const noticeTone of ['white','grey']){validate({...sample['latest-updates'],notice,bg,noticeTone});configurations++;}
const mutations={
 'faq-list':[f=>delete f.mobileTitle,f=>f.desktopExpanded='true',f=>f.items=[],f=>f.items[1].id=f.items[0].id,f=>f.items[0].blocks=[],f=>f.items[0].blocks[0].tone='invented',f=>f.items[0].blocks[0].segments[0].href='javascript:x',f=>f.items[0].blocks[0].segments[0].color='red',f=>f.more={label:'x',href:'#questions'},f=>f.bg='white'],
 'icon-text-cards':[f=>delete f.iconProfile,f=>f.iconProfile='guess',f=>f.columns=5,f=>f.items=[],f=>f.items[1].id=f.items[0].id,f=>f.items[0].asset='missing',f=>delete f.items[0].imageAlt,f=>f.items[0].href=' javascript:x',f=>f.tagColor='#1476ff',f=>f.cardTheme='transparent',f=>f.backgroundAsset='x'],
 'recommended-docs':[f=>delete f.mobileEnabled,f=>f.columns=6,f=>f.items=[],f=>f.items.push(...f.items),f=>f.items[1].id=f.items[0].id,f=>f.items[0].links=[],f=>f.items[0].links[0].href=' javascript:alert(1)',f=>f.items[0].more={label:'无链接'},f=>f.bg='dark',f=>f.backgroundAsset='x',f=>f.cardTheme='invented'],
 'latest-updates':[f=>f.items.pop(),f=>f.items[1].id=f.items[0].id,f=>f.items[0].description='',f=>delete f.notice,f=>f.notice={},f=>f.notice.title={},f=>f.notice.link.href='data:text/html,x',f=>f.notice.asset='missing',f=>{f.notice.asset='navigation-logo';f.notice.imageAlt=''},f=>f.noticeTone='dark',f=>f.autoplay=true],
 'general-banner':[f=>f.height=500,f=>f.textWidth=100,f=>f.items.push(...f.items),f=>f.items[0].href='vbscript:x',f=>f.items[0].variant='blue',f=>f.mobileDescription={},f=>f.tags=[],f=>f.icon='x',f=>f.backgroundAsset='x',f=>f.advertisement={},f=>f.breadcrumb=[],f=>f.video={}]
};
for(const [kind,rows] of Object.entries(mutations))for(const mutate of rows){const f=structuredClone(sample[kind]);mutate(f);assert.throws(()=>validate(f));rejected++;}
for(const scene of ['solution','campaign','resource','article']){
 const composition=JSON.parse(fs.readFileSync(join(root,'src/pages/portal-composed/content-floors.content.json'),'utf8'));composition.scene=scene;validateComposedContent(composition,assets);
 for(const kind of Object.keys(sample)){const f=structuredClone(sample[kind]);if(kind==='general-banner')f.items.forEach(a=>a.href='#overview');validateComposedContent({scene,hero:{title:'验证'},sections:[f]},assets);}
}
for(const kind of Object.keys(sample)){const f=structuredClone(sample[kind]);if(['general-banner','icon-text-cards'].includes(kind))f.items[0].href='#missing';else if(kind==='faq-list')f.items[0].blocks[0].segments[0].href='#missing';else if(kind==='latest-updates')f.notice.link.href='#missing';else f.items[0].links[0].href='#missing';assert.throws(()=>validateComposedContent({scene:'resource',hero:{title:'验证'},sections:[f]},assets),/missing local link target/);rejected++;}
console.log(JSON.stringify({ok:true,kinds:Object.keys(sample),validConfigurations:configurations,negativeCases:rejected,composedScenes:4,scope:'Data contracts, configured variants and missing anchor checks; browser/source visual acceptance separate'}));
