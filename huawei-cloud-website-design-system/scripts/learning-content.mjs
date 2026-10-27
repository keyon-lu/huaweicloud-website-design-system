export function validateLearningFloor(floor,checkLink){
 const fail=message=>{throw Error('Invalid learning-links floor: '+message)};
 const named=v=>typeof v==='string'&&v.trim();
 const link=checkLink??(l=>{if(!named(l?.label)||!named(l?.href)||/^(?:javascript|data|vbscript):/i.test(l.href.trim())||/[\u0000-\u001f\u007f]/.test(l.href))fail('unsafe or unnamed link')});
 if(!Array.isArray(floor.items)||floor.items.length<2||floor.items.length>4)fail('requires 2 to 4 desktop groups');
 if(!Array.isArray(floor.mobileItems)||!floor.mobileItems.length)fail('requires explicitly authored mobileItems');
 if(floor.bg&&floor.bg!=='grey')fail('background is defined by the source floor, not a generic theme');
 for(const item of floor.items){if(!named(item.title)||!Array.isArray(item.links)||!item.links.length)fail('group requires title and links');if(item.href)link({label:item.title,href:item.href});item.links.forEach(link)}
 floor.mobileItems.forEach(link);return floor;
}
