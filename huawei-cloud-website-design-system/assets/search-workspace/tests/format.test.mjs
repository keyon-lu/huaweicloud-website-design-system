import {test} from 'node:test';import assert from 'node:assert/strict';import {formatCount,formatSnapshotDate} from '../src/lib/format.ts';
test('Chinese number policy preserves ungrouped snapshot counts and zero',()=>{assert.equal(formatCount(0),'0');assert.equal(formatCount(1194),'1194')});
test('snapshot calendar date keeps approved date form and explicit time zone',()=>{assert.equal(formatSnapshotDate('2026-10-14'),'2026-10-14');assert.equal(formatSnapshotDate('历史快照'),'历史快照')});
