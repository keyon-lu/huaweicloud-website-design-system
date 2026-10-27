import {validateProduct2026Floor,product2026Targets,validateProduct2026Hero} from './product-2026-content.mjs';
import {validateContentFloor} from './content-floor-content.mjs';
import {validateSceneMedia} from './scene-media-content.mjs';
import {validateProcessFlow} from './process-flow-content.mjs';
import {validateLearningFloor} from './learning-content.mjs';
export const composedScenes=['solution','campaign','resource','article'];
export function validateComposedContent(data,assets){
 const localTargets=[];const fail=message=>{throw Error('Invalid composed content: '+message)};
 const text=(v,label)=>{if(typeof v!=='string'||!v.trim())fail(label+' needs text')};
 const link=(v,label)=>{text(v?.label,label+' label');text(v?.href,label+' href');if(/^(?:javascript|data|vbscript):/i.test(v.href))fail(label+' unsupported href');if(v.href.startsWith('#'))localTargets.push(v.href.slice(1))};
 const links=(rows,label)=>{if(!Array.isArray(rows))fail(label+' needs array');rows.forEach(v=>link(v,label))};
 const asset=id=>{if(id&&(!assets.has(id)||typeof id!=='string'))fail('Unregistered asset: '+id)};
 if(!composedScenes.includes(data?.scene))fail('unsupported scene');text(data.hero?.title,'hero title');if(data.hero.description!=null&&typeof data.hero.description!=='string')fail('hero description');if(data.hero.actions)links(data.hero.actions,'hero actions');
 if(!Array.isArray(data.sections)||!data.sections.length)fail('sections needs nonempty array');
 const kinds=new Set(['report-filter-v1','logo-filter-v1','image-filter-v1','information-cards-v1','ai-architecture-columns-v1','illustrated-benefits-v1','campaign-mosaic-v1','live-preview-v1','session-entry-cards-v1','featured-solutions-v1','activity-countdown-cards-v1','customer-story-v1','advantage-illustrations-v1','live-video-v1','folded-media-v1','architecture-media-v1','publication-cards-v1','expert-quote-v1','news-list-v1','editorial-grid-v1','photo-wall-v1','logo-cards-v1','speaker-cards-v1','generic-cards-v1','product-recommendations-v1','anchored-product-catalog','product-banner-2026','package-cards-2026','model-catalog-2026','scene-carousel-2026','wide-carousel-2026','advantage-grid-2026','customer-cases-2026','demo-architecture-2026','hover-expand-2026','assistant-search-2026','pricing-table-2026','news-2026','folded-media-2026','split-media-2026','agent-cards-2026','video-cards-2026','scenario-solutions-2026','faq-2026','next-step-2026','command-cards-2026','faq-list','icon-text-cards','recommended-docs','latest-updates','general-banner','scene-media','process-flow','learning-links','text','cards','process-steps','folded-media','solution-cards','customer-cases','resources','faq']),ids=new Set(['main-content']);if(data.hero2026){validateProduct2026Hero(data.hero2026,l=>link(l,'hero2026 link'),asset);if(ids.has(data.hero2026.id))fail('duplicate2026 hero id');ids.add(data.hero2026.id)}
 for(const s of data.sections){if(s.kind==='product-banner-2026'&&s.headingLevel!==2)fail('Content banner requires headingLevel2');if(!kinds.has(s.kind))fail('unsupported section');if(!['next-step-2026','agent-cards-2026','split-media-2026'].includes(s.kind)||s.title!==undefined)text(s.title,'section title');if(!/^[a-z][a-z0-9-]*$/.test(s.id)||ids.has(s.id))fail('invalid or duplicate id');ids.add(s.id);if(s.bg&&!['white','grey','dark','light'].includes(s.bg))fail('unsupported background');asset(s.asset);asset(s.backgroundAsset);
  if(s.kind==='text'){if(!Array.isArray(s.paragraphs)||!s.paragraphs.length)fail('paragraphs needs nonempty array');s.paragraphs.forEach(p=>text(p,'paragraph'));if(s.links)links(s.links,'text links')}
  else if(s.kind==='command-cards-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='next-step-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='faq-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='scenario-solutions-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='video-cards-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='agent-cards-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='split-media-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset);for(const target of product2026Targets(s)){if(ids.has(target))fail('duplicate nested target');ids.add(target)}}
  else if(s.kind==='folded-media-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='news-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='pricing-table-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='assistant-search-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='hover-expand-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='demo-architecture-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='customer-cases-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='advantage-grid-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='wide-carousel-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='scene-carousel-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='model-catalog-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='package-cards-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='product-banner-2026'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='anchored-product-catalog'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset);for(const target of product2026Targets(s)){if(ids.has(target))fail('duplicate nested target');ids.add(target)}}
  else if(s.kind==='product-recommendations-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='generic-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='speaker-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='logo-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='photo-wall-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='editorial-grid-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='news-list-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='expert-quote-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='publication-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='architecture-media-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset);for(const target of product2026Targets(s)){if(ids.has(target))fail('duplicate nested target');ids.add(target)}}
  else if(s.kind==='folded-media-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='live-video-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='advantage-illustrations-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='customer-story-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='activity-countdown-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='featured-solutions-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='session-entry-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='live-preview-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='campaign-mosaic-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='illustrated-benefits-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='ai-architecture-columns-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='information-cards-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='image-filter-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='logo-filter-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(s.kind==='report-filter-v1'){validateProduct2026Floor(s,l=>link(l,'2026 floor link'),asset)}
  else if(['faq-list','icon-text-cards','recommended-docs','latest-updates','general-banner'].includes(s.kind)){validateContentFloor(s,l=>link(l,'content floor link'),asset)}
  else if(s.kind==='scene-media'){validateSceneMedia(s,l=>link(l,'scene media link'),asset)}
  else if(s.kind==='process-flow'){validateProcessFlow(s,l=>link(l,'process flow link'))}
  else if(s.kind==='learning-links'){validateLearningFloor(s,l=>link(l,'learning link'))}
  else{if(!Array.isArray(s.items)||!s.items.length)fail('items needs nonempty array');for(const i of s.items){asset(i.asset);asset(i.mobileAsset);if(s.kind==='faq'){text(i.question,'question');text(i.answer,'answer')}else{text(i.title,'item title');if(s.kind==='folded-media'){if(!i.asset||!Array.isArray(i.paragraphs)||!i.paragraphs.length)fail('folded item requires asset and paragraphs');i.paragraphs.forEach(p=>text(p,'folded paragraph'))}else if(typeof i.description!=='string')fail('item description');if(i.href)link({label:i.title,href:i.href},'item')}}}
  if(s.kind==='process-steps'){if(s.items.length<3||s.items.length>4)fail('process-steps requires 3 to 4 items');for(const item of s.items){if(item.icon!=null&&(!Number.isInteger(item.icon)||item.icon<1||item.icon>4))fail('invalid source step icon');if(item.action&&!item.href)fail('step action requires href')}}
  if(s.kind==='cards'&&s.items.some(item=>/^STEP\s*\d+/i.test(item.tag||'')))fail('ordered steps cannot use cards; use process-steps');
  if(s.kind==='resources'&&s.title!=='相关资源')fail('resources title is fixed');if(s.kind==='faq'&&s.title!=='常见问题')fail('FAQ title is fixed');
  if(s.logos){if(!Array.isArray(s.logos)||s.logos.length!==s.items.length)fail('case logos length');s.logos.forEach(asset)}if(s.names){if(!Array.isArray(s.names)||s.names.length!==s.items.length)fail('case names length');s.names.forEach(n=>text(n,'case name'))}
 }
 if(data.header?.searchEnabled!=null&&typeof data.header.searchEnabled!=='boolean')fail('searchEnabled needs boolean');
 if(data.header?.links)links(data.header.links,'header links');if(data.header?.actionEntries)links(data.header.actionEntries,'header entries');
 function menu(rows,depth=0){if(depth>8)fail('mobile menu too deep');if(!Array.isArray(rows)||!rows.length)fail('mobile menu items empty');rows.forEach(i=>{text(i.label,'mobile item');if(i.href)link(i,'mobile item');if(i.children)menu(i.children,depth+1);if(!i.href&&!i.children)fail('mobile item has no target')})}
 if(data.header?.mobileMenu){if(!Array.isArray(data.header.mobileMenu)||!data.header.mobileMenu.length)fail('mobile menu groups empty');data.header.mobileMenu.forEach(g=>{text(g.label,'mobile category');menu(g.items)})}
 if(data.sectionNavigation){links(data.sectionNavigation,'section navigation');for(const l of data.sectionNavigation)if(l.href.startsWith('#')&&!ids.has(l.href.slice(1)))fail('missing navigation target')}
 if(data.footer&&data.footer!==false){if(!Array.isArray(data.footer.groups))fail('footer groups');data.footer.groups.forEach(g=>{text(g.title,'footer group');links(g.links,'footer links')})}
 if(data.finalAction){text(data.finalAction.title,'CTA title');text(data.finalAction.label,'CTA label');link({label:data.finalAction.label,href:data.finalAction.href},'CTA');if(!data.finalAction.asset)fail('CTA asset missing');asset(data.finalAction.asset);if(data.finalAction.id){if(!/^[a-z][a-z0-9-]*$/.test(data.finalAction.id)||ids.has(data.finalAction.id))fail('CTA id invalid or duplicated');ids.add(data.finalAction.id)}}
 for(const target of localTargets)if(!ids.has(target))fail('missing local link target');
 return data;
}
