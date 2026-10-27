import React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {PortalAsset} from './portal-asset';
const ids=['developer-space','developer-ability','developer-ability-mobile'] as const;
function Probe(){return <main><h1>原GIF首帧回退验证</h1><p>仅用于检查媒体偏好切换，不是新增楼层设计。</p>{ids.map(id=><figure key={id}><figcaption>{id}</figcaption><PortalAsset assetId={id} alt={id}/></figure>)}</main>}
const meta={title:'Engineering/MotionFallback',component:Probe,parameters:{layout:'fullscreen'}} satisfies Meta<typeof Probe>;
export default meta;
export const Default:StoryObj<typeof meta>={};
