// Static coverage only; dynamic/host/state styling needs computed-style checks.
export const forbiddenButtonBlue=/#1476ff(?:[\da-f]{2})?\b|rgba?\(\s*20\s*[, ]\s*118\s*[, ]\s*255\b/i;
export function verifyButtonCSS(styles,{tokenSources=[]}={}){
 const clean=styles.map(s=>s.replace(/\/\*[\s\S]*?\*\//g,''));const vars=new Map();
 for(const css of [...tokenSources.map(s=>s.replace(/\/\*[\s\S]*?\*\//g,'')),...clean])for(const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)[;}]?/g))vars.set(m[1],m[2]);
 const resolve=(value,seen=new Set())=>value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g,(_,key,fallback)=>{if(seen.has(key))return '';return resolve(vars.get(key)??fallback??'',new Set([...seen,key]));});
 const buttonSelector=/(?:^|[\s>+~,])button(?:\b)|\[role\s*=\s*["']?button["']?\]|\[type\s*=\s*["']?(?:button|submit|reset)["']?\]|\.(?:por-btn(?:-[\w-]+)?|source-button|hc-(?:dev-)?button)(?![\w-])/i;
 let checkedRules=0;
 for(const css of clean)for(const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g))if(buttonSelector.test(m[1])){checkedRules++;if(forbiddenButtonBlue.test(resolve(m[2])))throw Error('Current owner palette avoids #1476FF in button CSS: '+m[1].trim());}
 return {checkedRules,scope:'static button selectors and custom-property resolution; checkbox and other source colors allowed'};
}
