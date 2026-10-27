#!/usr/bin/env node
import {inspectHTML} from './portal-source.mjs';
try{if(!process.argv[2])throw Error('Usage: node validate-source-fast.mjs <html>');console.log(JSON.stringify(inspectHTML(process.argv[2]),null,2))}catch(e){console.error(e.message);process.exitCode=1}
