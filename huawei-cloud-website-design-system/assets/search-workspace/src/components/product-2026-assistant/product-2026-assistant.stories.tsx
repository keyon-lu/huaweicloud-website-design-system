import React from 'react';import '@/styles/website-grid.css';import type {Meta,StoryObj} from '@storybook/react-vite';import {SourceProduct2026Assistant} from './index';const data={"kind": "assistant-search-2026", "id": "assistant-2026", "title": "本地内容检索", "description": "按关键词查找已收录的文档，不生成AI回答", "background": "white", "questions": ["云容器 CCE", "计费方式", "部署步骤"], "placeholder": "请输入检索关键词", "notice": "本地验证环境，仅检索已有内容", "agreements": [{"label": "使用说明", "href": "#assistant-2026"}], "records": [{"id": "cce", "title": "云容器 CCE 部署步骤", "description": "包含集群与应用的部署流程", "href": "#assistant-2026", "keywords": ["容器", "部署"]}, {"id": "pricing", "title": "计费方式说明", "description": "按量与套餐计费的使用说明", "href": "#assistant-2026"}], "labels": {"input": "检索内容", "submit": "提交检索", "results": "检索结果", "empty": "没有找到相关内容", "error": "检索失败，请重试", "busy": "正在检索", "count": "输入长度"}} as const;const meta={title:'Product2026/Assistant',component:SourceProduct2026Assistant,args:{data},parameters:{layout:'fullscreen'},decorators:[Story=><div className="hc-page hc-page-product"><Story/></div>],tags:['autodocs']} satisfies Meta<typeof SourceProduct2026Assistant>;export default meta;export const Default:StoryObj<typeof meta>={};export const Failure:StoryObj<typeof meta>={args:{onSearch:async()=>{throw Error('Local validation failure')}}};

import {within,userEvent,expect} from 'storybook/test';
import axe from 'axe-core';
export const CountSemantics:StoryObj<typeof meta>={play:async({canvasElement})=>{
 const c=within(canvasElement),field=c.getByRole('textbox',{name:data.labels.input});
 await userEvent.type(field,'ABC');
 await expect(c.getByRole('group',{name:data.labels.count})).toHaveTextContent('3/500');
 const result=await axe.run(canvasElement,{runOnly:{type:'rule',values:['aria-prohibited-attr']}});
 await expect(result.violations).toHaveLength(0);
 await expect(result.incomplete).toHaveLength(0);
}};
