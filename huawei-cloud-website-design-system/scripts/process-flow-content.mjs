export function validateProcessFlow(floor,checkLink){
 const fail=message=>{throw Error('Invalid process-flow floor: '+message)},named=value=>typeof value==='string'&&value.trim();
 const link=action=>{if(!named(action?.label)||!named(action?.href)||/^(?:javascript|data|vbscript):/i.test(action.href.trim())||/[\u0000-\u001f\u007f]/.test(action.href))fail('unsafe or unnamed link');checkLink?.(action);};
 if(floor.description!==undefined&&typeof floor.description!=='string')fail('description requires text');
 if(!Array.isArray(floor.items)||floor.items.length<3||floor.items.length>5)fail('requires3..5 steps');
 if(!['rule-48','example-40'].includes(floor.ctaProfile))fail('requires explicit CTA source profile while source conflict remains open');
 if(floor.bg&&floor.bg!=='white'||floor.backgroundAsset||floor.video)fail('only modeled light text profile currently available; video/background branches require their own source implementation');
 if(floor.showNumbers!==undefined&&typeof floor.showNumbers!=='boolean')fail('showNumbers needs boolean');
 if(!named(floor.flowLabels?.navigation)||!named(floor.flowLabels?.previous)||!named(floor.flowLabels?.next)||!named(floor.flowLabels?.rangeTemplate)||['{start}','{end}','{total}'].some(key=>!floor.flowLabels.rangeTemplate.includes(key)))fail('requires navigation labels and a range template with start/end/total');
 const action=value=>{link(value);if(value.variant&&!['primary','secondary','text'].includes(value.variant))fail('unsupported action variant');};action(floor.cta);
 const ids=new Set();for(const item of floor.items){if(!named(item?.id)||ids.has(item.id)||!Array.isArray(item.paragraphs)||!named(item.title)&&!item.paragraphs.length)fail('requires unique meaningful steps');ids.add(item.id);if(item.title!==undefined&&typeof item.title!=='string')fail('step title requires text');if(item.video||item.asset||item.mobileAsset)fail('unmodeled step video/custom media branch');
  for(const paragraph of item.paragraphs){if(!Array.isArray(paragraph.segments)||!paragraph.segments.length)fail('paragraph requires segments');for(const segment of paragraph.segments){if(!named(segment.text))fail('segment text missing');if(segment.href!==undefined)link({label:segment.text,href:segment.href});}}
  if(item.actions!==undefined){if(!Array.isArray(item.actions)||item.actions.length>2)fail('at most two actions per step');item.actions.forEach(action);}
 }
 return floor;
}
