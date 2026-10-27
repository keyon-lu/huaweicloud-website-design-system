import '@/styles/website-grid.css';
import React from 'react';import type {Meta,StoryObj} from '@storybook/react-vite';import {expect,within,userEvent} from 'storybook/test';import {SourceGeneralBanner} from './index';
const sample={"kind": "general-banner", "id": "overview", "title": "面向业务场景构建页面", "description": "由已有设计规范楼层组成页面，保留各组件的结构、尺寸和响应式规则。", "mobileTitle": "业务场景与实践", "height": 350, "textWidth": 80, "items": [{"label": "查看资料", "href": "#documents", "variant": "primary"}, {"label": "了解动态", "href": "#updates", "variant": "secondary"}]} as const;
const meta={title:'SourceFloors/GeneralBanner',component:SourceGeneralBanner,args:sample,tags:['autodocs'],parameters:{layout:'fullscreen'},decorators:[Story=><div className="hc-page hc-page-product"><Story/></div>]} satisfies Meta<typeof SourceGeneralBanner>;export default meta;
export const Default:StoryObj<typeof meta>={};
export const NoActions:StoryObj<typeof meta>={args:{items:[]}};
export const TallHalfWidth:StoryObj<typeof meta>={args:{height:450,textWidth:50}};
export const LongContent:StoryObj<typeof meta>={args:{title:'超长横幅标题'.repeat(20),description:'完整保留长文案内容，验证横幅不会裁切或限制固定高度。'.repeat(30)}};
