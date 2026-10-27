import React from 'react';import type {Meta,StoryObj} from '@storybook/react-vite';import {expect,within} from 'storybook/test';import {SourceDocumentPager} from './index';
const meta={title:'SourcePatterns/DocumentPager',component:SourceDocumentPager,args:{label:'文档切换',previous:{title:'快速入门',href:'#previous',accessibleLabel:'上一篇：快速入门'},next:{title:'配置与管理',href:'#next',accessibleLabel:'下一篇：配置与管理'}},tags:['autodocs']} satisfies Meta<typeof SourceDocumentPager>;export default meta;
export const Default:StoryObj<typeof meta>={play:async({canvasElement})=>{const c=within(canvasElement);await expect(c.getByRole('navigation')).toHaveAccessibleName('文档切换');await expect(c.getByRole('link',{name:'上一篇：快速入门'})).toHaveAttribute('rel','prev');await expect(c.getByRole('link',{name:'下一篇：配置与管理'})).toHaveAttribute('href','#next')}};
export const FirstDocument:StoryObj<typeof meta>={args:{previous:undefined}};
export const LastDocument:StoryObj<typeof meta>={args:{next:undefined}};
