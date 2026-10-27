import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {findPixsoNorms} from './find-pixso-norms.mjs';
import {findPixsoVariants} from './find-pixso-variants.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const overview=JSON.parse(fs.readFileSync(path.join(root,'references/pixso-priority-import.json'),'utf8'));
assert.equal(overview.sources.length,9);
for(const row of overview.sources){const result=findPixsoNorms(row.sourceId,{source:row.onlineId,limit:50});assert.equal(result.total,row.pages);assert.ok(result.matches.every(m=>m.source===row.onlineId));}
const learning=findPixsoNorms('学习与使用',{source:'ONLINE-01',details:true});assert.equal(learning.total,1);assert.ok(learning.matches[0].rules.some(n=>n.text.includes('2～4')));
assert.equal(findPixsoNorms('26:3660',{source:'ONLINE-01',details:true}).matches[0].rules[0].text,'支持配置按钮，最多2个');
assert.ok(findPixsoNorms('1476FF',{source:'ONLINE-08',details:true}).total>0);
assert.equal(findPixsoNorms('impossible-query-794112').total,0);
const label=findPixsoVariants('基础标签',{limit:50});assert.equal(label.totalSets,1);assert.equal(label.matches[0].totalVariants,24);
const medium=findPixsoVariants('156:464',{properties:{'尺寸':'Medium','颜色':'灰'}});assert.equal(medium.matches[0].totalVariants,1);assert.equal(medium.matches[0].variants[0].id,'1013:13674');assert.equal(medium.matches[0].variants[0].height,22);
assert.equal(findPixsoVariants('基础标签',{properties:{'尺寸':'NoSuchSize'}}).matches[0].totalVariants,0);
assert.throws(()=>findPixsoVariants('x',{properties:{size:5}}),/string map/);
assert.throws(()=>findPixsoNorms(''),/nonempty/);assert.throws(()=>findPixsoNorms('x',{limit:51}),/1..50/);assert.throws(()=>findPixsoNorms('x',{source:'../x'}),/Unknown/);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'pixso-import-test-'));
try{fs.mkdirSync(path.join(temp,'references/pixso-priority'),{recursive:true});fs.copyFileSync(path.join(root,'references/pixso-priority-import.json'),path.join(temp,'references/pixso-priority-import.json'));fs.writeFileSync(path.join(temp,overview.sources[0].bundle),'{}');assert.throws(()=>findPixsoNorms('x',{source:'ONLINE-01',base:temp}),/integrity mismatch/);}finally{fs.rmSync(temp,{recursive:true,force:true});}
console.log(JSON.stringify({ok:true,sources:9,checks:'all source directories, source isolation, exact-node rule lookup, preserved historical colors, absent query, invalid input, stale bundle rejection',scope:'Source import and retrieval integrity; not component runtime acceptance'}));
