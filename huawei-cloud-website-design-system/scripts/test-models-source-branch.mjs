import fs from'node:fs';import path from'node:path';import{root}from'./portal-source.mjs';
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const css=read('src/styles/product-2026-models.css'),template=read('assets/search-workspace/src/components/product-2026-models/product-2026-models.css');
if(css!==template)throw Error('Model style facades differ');
if(!css.includes('.hc-p26-model-layout-equal.hc-p26-model-count-2 .hc-p26-model-image-390 .hc-p26-model-image{aspect-ratio:var(--hc-t-p26-models-ratio390-two)}'))throw Error('Matched two-card390 source branch missing');
if(!read('src/styles/component-tokens.css').includes('--hc-t-p26-models-ratio390-two:790/390;'))throw Error('Visible204:3 source masks790x390 ratio missing');
for(const rel of['src/components/portal-components.tsx','assets/search-workspace/src/components/product-2026-models/product-2026-models.tsx']){const s=read(rel),start=s.indexOf('export function '+(rel.startsWith('src/')?'PortalProduct2026Models':'SourceProduct2026Models')+'('),next=s.indexOf('\nexport ',start+10),b=s.slice(start,next<0?undefined:next);if(!b.includes('if(start&&focused===controls?.[0]||end&&focused===controls?.[1])n.focus({preventScroll:true})')||!b.includes('q.matches&&n&&document.activeElement?.closest(".hc-p26-model-controls")'))throw Error('Model native keyboard focus retention path missing');}
console.log(JSON.stringify({ok:true,sourceFrame:'204:3',scope:'Matched two-card390 CSS and two existing keyboard focus paths only; no whole-visual/device pass inferred'}));
