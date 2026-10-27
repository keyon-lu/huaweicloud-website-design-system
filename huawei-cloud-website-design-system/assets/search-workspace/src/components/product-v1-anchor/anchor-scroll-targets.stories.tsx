import React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {SourceProductV1AnchorNavigation} from './index';
import '@/styles/website-grid.css';

// Host-page fixture only: target heights make real scrolling observable.
// These section styles are not part of the source component's design contract.
const items = [
  {id: 'one', label: '测试目标一', href: '#scroll-fixture-one'},
  {id: 'two', label: '测试目标二', href: '#scroll-fixture-two'},
  {id: 'three', label: '测试目标三', href: '#scroll-fixture-three'},
] as const;
const meta = {
  title: 'Acceptance/AnchorScrollTargets',
  component: SourceProductV1AnchorNavigation,
  parameters: {layout: 'fullscreen'},
  args: {id: 'scroll-fixture-nav', label: '测试目标导航', items, align: 'equal', background: 'grey', stickyOffset: 64},
  render: args => <>
    <div style={{height: 64}} aria-hidden="true" />
    <SourceProductV1AnchorNavigation {...args} />
    {items.map(item => <section key={item.id} id={item.href.slice(1)} aria-label={item.label} style={{minHeight: '110vh', padding: 24}}>
      <h2>{item.label}</h2><p>仅用于验证宿主页面真实锚点、滚动偏移及当前位置，不属于设计样式样本。</p>
    </section>)}
  </>,
} satisfies Meta<typeof SourceProductV1AnchorNavigation>;
export default meta;
export const RealTargets: StoryObj<typeof meta> = {};
