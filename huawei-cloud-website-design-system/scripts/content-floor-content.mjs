const text=v=>typeof v==='string'&&!!v.trim();
export function validateContentFloor(f,checkLink,checkAsset){
 const fail=s=>{throw Error('Invalid '+f.kind+' floor: '+s)},link=a=>{if(!text(a?.label)||!text(a?.href)||/^(?:javascript|data|vbscript):/i.test(a.href.trim())||/[\u0000-\u001f\u007f]/.test(a.href))fail('unsafe or unnamed link');checkLink?.(a)};
 if(!text(f.title)||!Array.isArray(f.items))fail('title/items required');
 for(const k of ['description','mobileTitle','mobileDescription'])if(f[k]!==undefined&&typeof f[k]!=='string')fail(k+' must be text');
 if(f.bg!==undefined&&!['white','grey'].includes(f.bg))fail('light source profile only');
 if(f.kind==='recommended-docs'){
  if(![2,3,4,5].includes(f.columns)||typeof f.mobileEnabled!=='boolean'||f.items.length<2||f.items.length>5)fail('2–5 groups, explicit columns and mobile switch required');
  const ids=new Set();for(const i of f.items){if(!text(i?.id)||ids.has(i.id)||!text(i.title)||!Array.isArray(i.links)||!i.links.length)fail('invalid unique category');ids.add(i.id);i.links.forEach(link);if(i.more!==undefined)link(i.more)}
  if(['asset','backgroundAsset','video','cardTheme'].some(k=>f[k]!==undefined))fail('unsupported document variant');
 }else if(f.kind==='latest-updates'){
  if(f.items.length!==4||new Set(f.items.map(i=>i?.id)).size!==4||f.items.some(i=>!text(i?.id)||!text(i.title)||!text(i.description)))fail('four unique feature groups required');
  const n=f.notice;if(!n||typeof n!=='object'||![n.title,n.description,n.link?.label].some(text))fail('notice content required');
  for(const k of ['title','description','imageAlt'])if(n[k]!==undefined&&!text(n[k]))fail('invalid notice text');
  if(n.asset){if(!text(n.asset)||!text(n.imageAlt))fail('notice asset needs alt');checkAsset?.(n.asset)}if(n.link!==undefined)link(n.link);
  if(f.noticeTone!==undefined&&!['white','grey'].includes(f.noticeTone))fail('invalid notice tone');
  if(['backgroundAsset','video','autoplay','interval'].some(k=>f[k]!==undefined))fail('background image/rotation profile not implemented');
 }else if(f.kind==='faq-list'){
  if(!text(f.mobileTitle)||!f.items.length||new Set(f.items.map(i=>i?.id)).size!==f.items.length||f.desktopExpanded!==undefined&&typeof f.desktopExpanded!=='boolean')fail('mobile heading, unique items and boolean desktop default required');
  for(const i of f.items){if(!text(i?.id)||!text(i.question)||!Array.isArray(i.blocks)||!i.blocks.length)fail('invalid question/blocks');for(const b of i.blocks){if(!['primary','secondary'].includes(b?.tone)||!Array.isArray(b.segments)||!b.segments.length)fail('invalid answer block');for(const s of b.segments){if(!text(s?.text)||s.strong!==undefined&&typeof s.strong!=='boolean'||s.color!==undefined||s.html!==undefined)fail('invalid rich text');if(s.href!==undefined)link({label:s.text,href:s.href})}}}
  if(['asset','backgroundAsset','video','more','actions'].some(k=>f[k]!==undefined)||f.bg&&f.bg!=='grey')fail('current gray/white rich text profile only');
 }else if(f.kind==='icon-text-cards'){
  if(![2,3,4].includes(f.columns)||!['rule-62','example-56'].includes(f.iconProfile)||!f.items.length||new Set(f.items.map(i=>i?.id)).size!==f.items.length)fail('invalid columns, explicit icon profile or unique items');
  for(const i of f.items){if(!text(i?.id)||!text(i.title)||!text(i.asset)||typeof i.imageAlt!=='string'||i.description!==undefined&&typeof i.description!=='string'||i.tag!==undefined&&!text(i.tag))fail('invalid icon/card text');checkAsset?.(i.asset);if(i.href!==undefined)link({label:i.title,href:i.href})}
  if(['backgroundAsset','cardTheme','padding','tagColor','video'].some(k=>f[k]!==undefined))fail('unsupported icon text variant');
 }else if(f.kind==='general-banner'){
  if(![350,450].includes(f.height)||![50,80].includes(f.textWidth)||f.items.length>3)fail('source height/width and at most three actions required');
  for(const a of f.items){link(a);if(a.variant!==undefined&&!['primary','secondary','text'].includes(a.variant))fail('invalid action variant')}
  if(['asset','backgroundAsset','icon','tags','advertisement','video','breadcrumb'].some(k=>f[k]!==undefined)||f.bg&&f.bg!=='white')fail('current plain light banner profile only');
 }else fail('unknown content floor');
 return f;
}
