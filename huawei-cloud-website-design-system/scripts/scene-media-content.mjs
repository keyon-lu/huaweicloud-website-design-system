export function validateSceneMedia(floor,checkLink,checkAsset){
 const fail=message=>{throw Error('Invalid scene-media floor: '+message)},text=v=>typeof v==='string'&&v.trim();
 const link=a=>{if(!text(a?.label)||!text(a?.href)||/^(?:javascript|data|vbscript):/i.test(a.href.trim())||/[\u0000-\u001f\u007f]/.test(a.href))fail('unsafe or unnamed link');checkLink?.(a)};
 const rich=rows=>{if(!Array.isArray(rows))fail('paragraphs need array');for(const p of rows){if(!Array.isArray(p?.segments)||!p.segments.length)fail('paragraph requires segments');for(const s of p.segments){if(!text(s?.text)||s.strong!==undefined&&typeof s.strong!=='boolean')fail('invalid rich text');if(s.href!==undefined)link({label:s.text,href:s.href})}}};
 if(!Array.isArray(floor.items)||!floor.items.length)fail('requires items');
 if(!text(floor.navigationLabel)||!text(floor.scrollLabel))fail('requires accessible navigation and scroll labels');
 if(!['table-32','example-36'].includes(floor.mediumHeadingProfile)||!['natural','example-160'].includes(floor.mobileImageProfile))fail('explicit unresolved source profiles required');
 for(const key of ['mobileTitle','mobileDescription','description'])if(floor[key]!==undefined&&typeof floor[key]!=='string')fail('invalid optional text');
 if(['tone','cardTheme','hideHeading','removeTopPadding','removeBottomPadding','headingAlign'].some(key=>floor[key]!==undefined))fail('requested source variant not implemented');
 if(floor.bg&&floor.bg!=='grey'||floor.backgroundAsset||floor.video)fail('current source profile covers gray floor/white card text and images only');
 const ids=new Set();for(const item of floor.items){if(!text(item?.id)||ids.has(item.id)||!text(item.tabLabel)||!text(item.title)||!text(item.asset)||!text(item.imageAlt)||item.imageSide&&!['left','right'].includes(item.imageSide))fail('invalid unique item/media');ids.add(item.id);checkAsset?.(item.asset);
 if(item.logo){if(!text(item.logo)||!text(item.logoAlt))fail('logo needs asset and alt');checkAsset?.(item.logo)}
 if(item.mobileTitle!==undefined&&!text(item.mobileTitle))fail('mobile title needs text');rich(item.paragraphs);if(!item.paragraphs.length)fail('scoped text profile requires paragraphs');if(item.mobileParagraphs!==undefined)rich(item.mobileParagraphs);if(item.bullets!==undefined)rich(item.bullets);
 if(item.actions!==undefined){if(!Array.isArray(item.actions)||item.actions.length>2)fail('at most two actions');for(const action of item.actions){link(action);if(action.variant&&!['primary','secondary','text'].includes(action.variant))fail('invalid action variant')}}
 }
 return floor;
}
