import React from 'react';import type {Meta,StoryObj} from '@storybook/react-vite';import '@/styles/website-grid.css';
import {SourceProductV1ContactDropdown} from '@/components/product-v1-contact';
function V1ContactExample(){return <div className="hc-page hc-page-product"><div className="por-container"><h2>联系我们浮层验证</h2><SourceProductV1ContactDropdown id="v1-contact" label="联系我们" align="left" items={[{id:'sales',title:{text:'联系销售'},description:{text:'950808 转 1\n4000-955-988 转 1'},dividerAfter:true},{id:'consult',title:{text:'售前咨询',href:'https://www.huaweicloud.com/service/contact.html'}},{id:'support',title:{text:'工单',href:'https://console.huaweicloud.com/ticket/'}}]}/></div></div>}

const meta={title:'ReleaseScope/pix-002-12-54491',component:V1ContactExample,parameters:{layout:'fullscreen'}} satisfies Meta<typeof V1ContactExample>;export default meta;export const Default:StoryObj<typeof meta>={};
