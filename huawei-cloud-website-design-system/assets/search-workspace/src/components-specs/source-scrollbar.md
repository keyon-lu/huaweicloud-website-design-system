# 滚动区域

来源：[PortalUI3.0.17](../../../../references/portalui-docs/baseui/scrollbar.md)。来源本身为overflow:auto与por-scrollbar-s/m，不需要自造拖动算法。公开入口`@/components/source-scrollbar`，SourceScrollbar支持small/medium两种来源宽度，原生滚动；暗色主题按用户要求暂缓。

label标识region，tabIndex=0提供键盘入口；maxHeight是业务布局传入的正有限像素约束，不成为全站固定设计Token。文本自然换行，仍允许必要的横向滚动内容。ref为原生div，保留scroll事件与浏览器滚动API。调用方style不能关闭必要的overflow/maxHeight。无内容、短内容不伪造滚动条；滚动条是否持续可见遵循操作系统设置。

Keyboard用例验证焦点、可滚动几何、Tab可离开和普通文本不横向溢出。ArrowDown默认滚动另用浏览器真实按键验证，合成键盘事件不能代替浏览器默认行为。触摸、放大、跨系统滚动条外观需另行验证；不能用源码类名存在替代视觉通过。不得捕获Tab或拦截页面键盘导航。
