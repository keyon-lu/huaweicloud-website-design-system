#!/usr/bin/env node
import {readFileSync} from 'node:fs';import {join} from 'node:path';import {root} from './portal-source.mjs';
const type=process.argv[2],config=JSON.parse(readFileSync(join(root,'references/page-resource-manifest.json'),'utf8')).pageTypes[type];
if(!config){console.error('Supported: website-product-floor, developer-portal, website-composed');process.exitCode=1}else console.log(JSON.stringify({pageType:type,...config},null,2));
