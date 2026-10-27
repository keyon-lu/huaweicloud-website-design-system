import React from 'react';import '@/styles/website-grid.css';import type {Meta,StoryObj} from '@storybook/react-vite';import {SourceProduct2026SceneCarousel} from './index';const data={"kind": "scene-carousel-2026", "id": "scene-carousel-2026", "title": "多种业务场景", "background": "white", "groups": [{"id": "ai-scenes", "label": "应用场景", "columns": 3, "items": [{"id": "use-0", "type": "ai", "title": "协同开发", "description": "将能力用于实际业务场景", "asset": "product-2026-carousel-scene-0", "tone": "ink", "tags": ["场景介绍"], "overlay": {"title": "协同开发", "description": "查看使用方式与部署入口", "actions": [{"label": "了解详情", "href": "#scene-carousel-2026", "variant": "secondary"}]}}, {"id": "use-1", "type": "ai", "title": "智能分析", "description": "将能力用于实际业务场景", "asset": "product-2026-carousel-scene-1", "tone": "ink", "tags": ["场景介绍"], "overlay": {"title": "智能分析", "description": "查看使用方式与部署入口", "actions": [{"label": "了解详情", "href": "#scene-carousel-2026", "variant": "secondary"}]}}, {"id": "use-2", "type": "ai", "title": "业务自动化", "description": "将能力用于实际业务场景", "asset": "product-2026-carousel-scene-2", "tone": "ink", "tags": ["场景介绍"], "overlay": {"title": "业务自动化", "description": "查看使用方式与部署入口", "actions": [{"label": "了解详情", "href": "#scene-carousel-2026", "variant": "secondary"}]}}, {"id": "use-3", "type": "ai", "title": "内容创作", "description": "将能力用于实际业务场景", "asset": "product-2026-carousel-scene-0", "tone": "ink", "tags": ["场景介绍"], "overlay": {"title": "内容创作", "description": "查看使用方式与部署入口", "actions": [{"label": "了解详情", "href": "#scene-carousel-2026", "variant": "secondary"}]}}]}], "labels": {"actions": "场景入口", "pauseBackground": "暂停背景视频", "resumeBackground": "继续背景视频", "tabs": "场景分类", "previousTab": "前一分类", "nextTab": "后一分类", "track": "场景卡片", "previous": "上一场景", "next": "下一场景"}} as const;const meta={title:'Product2026/SceneCarousel',component:SourceProduct2026SceneCarousel,args:{data},parameters:{layout:'fullscreen'},decorators:[Story=><div className="hc-page hc-page-product"><Story/></div>],tags:['autodocs']} satisfies Meta<typeof SourceProduct2026SceneCarousel>;export default meta;export const Default:StoryObj<typeof meta>={};

import {within,userEvent,expect,waitFor} from 'storybook/test';
export const TrackBoundaries:StoryObj<typeof meta>={play:async({canvasElement})=>{
 const c=within(canvasElement);
 if(innerWidth<600){await expect(c.queryByRole('button',{name:data.labels.next})).toBeNull();return}
 const next=c.getByRole('button',{name:data.labels.next}),previous=c.getByRole('button',{name:data.labels.previous});
 const track=c.getByRole('region',{name:data.labels.track+' '+data.groups[0].label});
 await waitFor(()=>expect(next).toBeEnabled());await expect(previous).toBeDisabled();
 for(let i=0;i<data.groups[0].items.length&&!next.hasAttribute('disabled');i++){
  const before=track.scrollLeft;await userEvent.click(next);
  await waitFor(()=>expect(track.scrollLeft).toBeGreaterThan(before),{timeout:3000});
  await new Promise(r=>setTimeout(r,500));
 }
 await waitFor(()=>expect(next).toBeDisabled());await expect(previous).toBeEnabled();
 for(let i=0;i<data.groups[0].items.length&&!previous.hasAttribute('disabled');i++){
  const before=track.scrollLeft;await userEvent.click(previous);
  await waitFor(()=>expect(track.scrollLeft).toBeLessThan(before),{timeout:3000});
  await new Promise(r=>setTimeout(r,500));
 }
 await waitFor(()=>expect(previous).toBeDisabled());await expect(next).toBeEnabled();
}};
