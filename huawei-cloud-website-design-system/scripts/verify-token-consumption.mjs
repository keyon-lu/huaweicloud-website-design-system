import fs from 'node:fs';import {join} from 'node:path';import {createHash} from 'node:crypto';import {root} from './portal-source.mjs';
const map=JSON.parse(fs.readFileSync(join(root,'references/consumer-token-map.json'),'utf8'));
const definitions=fs.readFileSync(join(root,'src/styles/component-tokens.css'),'utf8');
const hash=s=>createHash('sha256').update(s).digest('hex');
let references=0;
for(const [key,row] of Object.entries(map.tokens)){if(!definitions.includes(`${key}:${row.value};`))throw Error('Token definition mismatch: '+key);if(!row.consumer||!row.selector||!row.property||!row.evidence)throw Error('Missing semantic token provenance '+key)}
for(const row of map.consumers){const text=fs.readFileSync(join(root,row.file),'utf8');if(hash(text)!==row.sha256)throw Error('Consumer changed; rerun token audit and equivalence review: '+row.file);for(const match of text.matchAll(/var\((--hc-t-[\w-]+)\)/g)){if(!map.tokens[match[1]])throw Error('Undefined consumer token');references++}
 const code=text.replace(/\/\*[\s\S]*?\*\//g,'').replace(/url\((?:[^()]|\([^()]*\))*\)/g,'url(asset)');
 for(const decl of code.matchAll(/(?:^|[;{])\s*([\w-]+)\s*:\s*([^;{}]+)/g)){const prop=decl[1],value=decl[2];if(prop.startsWith('--')){if(!map.definitions.some(d=>d.file===row.file&&d.property===prop&&d.value.trim()===value.trim()))throw Error('Unregistered token definition '+prop);continue}
 if(/#[a-f\d]{3,8}\b|rgba?\(|hsla?\(|(?<![\w-])(?:white|black)(?![\w-])|(?<![\w-])-?(?:\d*\.)?\d+(?:px|rem|em|vh|vw|vmin|vmax|%|ms|s)(?![\w-])/i.test(value))throw Error('Raw design value in '+row.file+' '+prop+': '+value);
 if(['font-size','line-height','font-weight','letter-spacing','border-radius'].includes(prop)&&/^-?[\d.]+$/.test(value.trim())&&value.trim()!=='0')throw Error('Raw typography/radius value '+prop);
 }}
const projectDefinitions=fs.readFileSync(join(root,'assets/search-workspace/src/styles/component-tokens.css'),'utf8');if(projectDefinitions!==definitions)throw Error('Search token definitions diverged');
console.log(JSON.stringify({ok:true,tokens:Object.keys(map.tokens).length,consumerFiles:map.consumers.length,references,scope:'source-traceable semantic mapping with recorded owner overrides and accessibility adaptations and immutable audited consumer checks; not browser visual acceptance; vendor token definitions/media breakpoints/registered zero geometry excluded'}));
