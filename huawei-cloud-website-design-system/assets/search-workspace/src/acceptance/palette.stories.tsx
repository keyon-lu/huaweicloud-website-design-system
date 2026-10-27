import type {Meta,StoryObj} from '@storybook/react-vite';
import {expect} from 'storybook/test';
import {SourceButton} from '@/components/source-button';
const meta={title:'SourceReference/WebsitePalette',component:SourceButton,tags:['autodocs']} satisfies Meta<typeof SourceButton>;export default meta;
export const Current:StoryObj<typeof meta>={
 render:()=> <><SourceButton>主按钮</SourceButton><SourceButton variant="secondary">次按钮</SourceButton><a className="por-link-blue" href="#palette-target">文字入口</a><label><input type="checkbox" defaultChecked style={{accentColor:'var(--por-base-color-blue-50)'}}/>允许使用来源蓝色的复选框</label><span id="palette-target">目标</span></>,
 play:async({canvasElement})=>{
  const view=canvasElement.ownerDocument.defaultView!;
  const rows=[...canvasElement.querySelectorAll<HTMLElement>('button,button *,[role="button"],[role="button"] *,.por-btn,.por-btn *,input[type="button"],input[type="submit"],input[type="reset"]')].map(el=>{const style=view.getComputedStyle(el);return {text:el.textContent,color:style.color,background:style.backgroundColor,border:style.borderColor,fill:style.fill,stroke:style.stroke}});
  for(const row of rows)for(const value of [row.color,row.background,row.border,row.fill,row.stroke])await expect(value).not.toMatch(/rgba?\(20,\s*118,\s*255(?:,|\))/);
  const checkbox=canvasElement.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
  await expect(checkbox.checked).toBe(true);
  const checkboxAccent=view.getComputedStyle(checkbox).accentColor;
  await expect(checkboxAccent).toBe('rgb(20, 118, 255)');
  const evidence=canvasElement.ownerDocument.createElement('script');evidence.type='application/json';evidence.dataset.paletteEvidence='current';evidence.textContent=JSON.stringify({decision:'2026-10-16 button avoidance; checkbox allowed; other components follow source',rows,checkboxAccent});canvasElement.append(evidence);
 }
};
