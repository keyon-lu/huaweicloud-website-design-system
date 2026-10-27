# 页签

来源：[PortalUI3.0.17](../../../../references/portalui-docs/baseui/tab.md)，保留por-tab-container、导航ul/li/a、por-tab-wrapper/content及原始字体、间距、激活下划线和滚动箭头皮肤；亮色默认与居左布局可选。深底por-tab-light按用户要求暂缓。新Pixso库的Tab组件集可通过find-pixso-variants检索，尚未逐状态视觉认证。

公开入口`@/components/source-tabs`，SourceTabs接受label、唯一id/label/content的items，至少一项启用。受控value或defaultValue二选一；禁用项不可激活，删除当前非受控项后转到第一项启用项；无效受控值拒绝。onBeforeChange可取消、onValueChange为请求、onAfterChange只在实际选中值提交后调用，不声称还原jQuery的8个动画事件阶段。ref暴露activate/getValue。

采用ARIA tablist/tab/tabpanel，只有选中Tab进入普通Tab序列。左右方向键跳过禁用项并循环，Home/End首末，Space激活；原生Enter触发链接并阻止锚点跳页。内容hidden保留内部状态；外部切换隐藏焦点所在面板时归还新Tab。原生浏览器滚动与前后按钮支持长标签；按钮必须有文案，边界原生disabled；箭头/按钮尺寸继承来源阶梯。没有自动播放。

普通标签可以换行，不截断重要文字；scroll模式一行原生横向滚动；缩小视口后通过ResizeObserver重算边界。KeyboardAndRetention检查键盘、禁用、面板和输入值保留，ScrollOverflow检查滚动边界与最后页签可达。工程/浏览器结果分别记录；实际跨视口视觉、焦点遮挡、触摸与手动读屏尚需验收，不能用类名存在替代通过。
