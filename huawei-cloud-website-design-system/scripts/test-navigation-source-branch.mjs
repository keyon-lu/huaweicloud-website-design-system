import fs from'node:fs';import path from'node:path';import{root}from'./portal-source.mjs';
const read=p=>fs.readFileSync(path.join(root,p),'utf8'),css=read('src/styles/product-2026-navigation.css');
if(css!==read('assets/search-workspace/src/components/product-2026-navigation/product-2026-navigation.css'))throw Error('Navigation facades differ');
for(const selector of['.hc-p26-nav:not(.hc-pv1-nav) .hc-p26-nav-main>.hc-p26-nav-entry>:is(a,button)','.hc-p26-nav:not(.hc-pv1-nav) .hc-p26-nav-main>.hc-p26-nav-overflow>button'])if(!css.includes(selector))throw Error('2026 direct main-menu source scope missing');
if(!css.includes('line-height:var(--hc-t-p26-nav-main-source-line)')||!read('src/styles/component-tokens.css').includes('--hc-t-p26-nav-main-source-line:18px;'))throw Error('Visible white navigation text line-height missing');
if(read('src/styles/product-v1-navigation.css').includes('--hc-t-p26-nav-main-source-line'))throw Error('V1 typography must not be changed by2026 source correction');
console.log(JSON.stringify({ok:true,sourceFrame:'2:53324',lineHeight:18,excluded:'V1, secondary menus, title, actions',scope:'Scoped source and facade checks only; not whole navigation/device acceptance'}));
