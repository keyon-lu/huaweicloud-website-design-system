# SourceBreadcrumb / PortalBreadcrumb

来源：PortalUI3.0.17 breadcrumb.md及por-breadcrumb/item/light CSS。用途是层级导航，不能替代流程步骤、页签或一级导航。Props为非空items({label,href?})、必填可访问label、light=false；祖先项必须有href；末项可为文本或带aria-current=page的链接。文案通过React文本渲染，不接收HTML。颜色、14px字号、22px行高、分隔符宽16/左右4和24px上下间距均沿用来源角色与CSS。

使用nav+有序列表表达路径，分隔符沿用来源伪元素，当前页使用aria-current；普通路径项通过公开SourceLink入口复用原生链接、禁用语义和焦点，而不是私有文件或另一份链接皮肤。当前页是纯文本时不多造Tab停靠点。light仅代表深色楼层的来源皮肤，不宣称全局暗色主题。

长路径适配：来源float与overflow:hidden可能裁掉文字，改为同样顺序的flex换行和overflow:visible；项可断长串，分隔符不收缩。只改变容器排布，不覆盖依赖SourceLink的颜色、字体、边框或状态。无组件自身loading/error/empty/disabled状态；空items拒绝，导航目标有效性由链接检查。

Template入口@/components/source-breadcrumb，离线HTML公开PortalBreadcrumb；仅在主动调用时使用，不重写原已验收产品Hero的历史面包屑。验证单层/多层/浅色与深色楼层、长标题、键盘顺序、当前页语义及链接依赖默认/hover/focus属性。人工读屏和最终视觉验收仍单独记录。
