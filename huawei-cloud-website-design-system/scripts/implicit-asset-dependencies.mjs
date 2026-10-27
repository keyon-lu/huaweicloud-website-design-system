// Assets used by a component itself, rather than supplied in its content JSON.
const kindAssets = {'live-preview-v1': ['product-v1-live-status']};
const motionFallbacks = {'developer-space':'developer-space-static-first-frame','developer-ability':'developer-ability-static-first-frame','developer-ability-mobile':'developer-ability-mobile-static-first-frame'};
export function includeImplicitAssets(selected,content){
 for(const section of content?.sections??[])for(const id of kindAssets[section.kind]??[])selected.add(id);
 for(const [animated,still] of Object.entries(motionFallbacks))if(selected.has(animated))selected.add(still);
 return selected;
}
