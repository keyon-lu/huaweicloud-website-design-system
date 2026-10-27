import React from 'react';import type {Meta,StoryObj} from '@storybook/react-vite';import {expect,within,userEvent} from 'storybook/test';import {SourceServiceTable} from './index';
const columns=[{id:'basic',label:'基础级'},{id:'pro',label:'专业级'}],rows=[{id:'phone',label:'热线电话支持',cells:['工作日','7x24小时']},{id:'response',label:'响应时间',cells:['24小时','1小时']}];
const meta={title:'SourceFamilies/ServiceTable',component:SourceServiceTable,args:{label:'支持计划验证',rowHeading:'服务项目',columns,rows},tags:['autodocs']} satisfies Meta<typeof SourceServiceTable>;export default meta;
export const Default:StoryObj<typeof meta>={play:async({canvasElement})=>{const c=within(canvasElement);await expect(c.getByRole('table')).toHaveAccessibleName('支持计划验证');await expect(c.getAllByRole('columnheader')).toHaveLength(3)}};
export const LongContent:StoryObj<typeof meta>={args:{rows:[{id:'long',label:'服务说明'.repeat(12),cells:['LongServiceValue'.repeat(12),'完整响应说明']} ]}};
