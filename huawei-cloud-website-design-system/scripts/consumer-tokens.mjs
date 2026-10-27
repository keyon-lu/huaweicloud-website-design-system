import fs from 'node:fs';import {join} from 'node:path';import {root} from './portal-source.mjs';
const registry=JSON.parse(fs.readFileSync(join(root,'references/consumer-token-map.json'),'utf8'));
export function expandConsumerTokens(css){return css.replace(/var\((--hc-t-[\w-]+)\)/g,(_m,key)=>{if(!registry.tokens[key])throw Error('Undefined component token '+key);return registry.tokens[key].value})}
