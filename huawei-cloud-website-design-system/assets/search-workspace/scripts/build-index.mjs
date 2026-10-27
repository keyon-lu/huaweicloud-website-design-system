import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
export const root=fileURLToPath(new URL('../',import.meta.url));
// Deliberate public source allowlist. Never crawl arbitrary filesystem locations.
export const sources=[
 ['grid','响应式栅格规范','standard','website-grid.md',['响应式','栅格','grid']],
 ['navigation','顶部一级导航规范','standard','first-level-navigation.md',['导航','搜索','移动端']],
 ['footer','官网页尾规范','standard','website-footer.md',['页尾','footer']],
 ['product','产品页生成与内容','product','product-pages.md',['产品','产品页']],
 ['developer','开发者首页组件','developer','developer-pages.md',['开发者','Skills','AI']],
 ['composed','解决方案与资源内容组合','resource','composed-pages.md',['解决方案','活动','内容']],
 ['accessibility','响应式与无障碍','standard','responsive-accessibility.md',['无障碍','键盘']],
 ['interaction','内容与交互契约','resource','content-interaction-contract.md',['交互','内容','链接']]
];
export async function buildIndex(skillDir){
 const documents=[];
 const snapshotDate=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 for(const [id,title,category,file,tags] of sources){
  const raw=await readFile(path.join(skillDir,'references',file),'utf8');
  const body=raw.replace(/```[\s\S]*?```/gu,' ').replace(/\[([^\]]+)\]\([^)]+\)/gu,'$1').replace(/[#*`|]/gu,'').replace(/\s+/gu,' ').trim();
  documents.push({id,title,category,tags,body,updatedAt:snapshotDate,source:{path:`references/${file}`,sha256:createHash('sha256').update(raw).digest('hex'),evidence:'local-public-skill-document',dateMeaning:'document snapshot date, not live publication date'}});
 }
 const version=createHash('sha256').update(JSON.stringify(documents)).digest('hex');
 return {schemaVersion:1,version,scope:'8 allowlisted local public Skill documents; not Huawei website-wide content',documents};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const skillDir=process.argv[2];
 if(!skillDir)throw new Error('Reindex requires an explicit Skill directory: node scripts/build-index.mjs <SKILL_DIR>. Bundled index is ready to use without reindexing.');
 const index=await buildIndex(skillDir);await mkdir(path.join(root,'data'),{recursive:true});
 await writeFile(path.join(root,'data/search-index.json'),JSON.stringify(index,null,2)+'\n');
 console.log(JSON.stringify({documents:index.documents.length,version:index.version}));
}
