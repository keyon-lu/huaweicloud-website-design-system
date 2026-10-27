# SourceLabel / PortalLabel

用途是状态/分类标签；不是主行动按钮或楼层卡片。PortalUI3.0.17 label.md与por-label CSS提供small/default/large、17个既有色系、图标、禁用和删除；新green-tag变体仅采用用户选中的PIX-015 518:3901同名绿色标签背景。背景归档Alpha归一一次为rgba(2,153,49,.1)，不乘成.01；旧green语义不被覆盖。该新背景仍待Pixso同节点渲染对照。

API：children可见内容必需，color/size选项由公开常量列出，icon可选set；disabled=false；onRemove配合必填removeLabel。普通标签输出span；删除是原生type=button，禁用不绑定可激活控件。外观高度来源18/24/32；长文本自然增高。删除目标至少24px，小标签带删除时因此增至24px，是明确的可访问性适配；不压缩图标。删除按钮采用现有中性主文字与禁用色，不能因蓝色标签继承而恢复按钮#1476FF。

状态：静态标签没有pressed/selected/loading/error；它们是业务数据，不制造异步状态。删除有default/hover/focus-visible/disabled；focus2px与offset4px沿用已登记修复。标签不自动添加status/live属性；业务更新需要由宿主决定宣告。移除后的焦点由列表宿主管理，组件仅发起onRemove，不自行删除DOM。

Template入口@/components/source-label，离线公开PortalLabel；自然换行、颜色/尺寸矩阵、删除与禁用、颜色对比和键盘分别验证。来源色系并不保证每一组合符合文本对比度；实际低对比组合保留未验，不以源代码存在宣称全部通过。

2026-10-17在线实际组件补充：PIX-015组件集156:464存在24个实际变体（6色×4尺寸），不是只依据属性轴推演。Medium节点1013:13674为40×22，文字1013:13673为12/18，左右8/上下2，圆角4；新增medium尺寸，原有源码扩展色保留来源语境。Small/Default/Large已有原型，不将这次补Medium计为所有标签（角标/金色/标签组）已覆盖。可删除Medium最小交互高度仍24，为无障碍适配，需分别验收。

## 角标2026-10-21
corner=true，只支持red/orange/green/blue/purple及small/default；来自PIX-015156:567。Small高18px、12/18px文字、对角8px；Default高24px、14/22px文字、对角16px；圆角顺序0/r/0/r，左右12px，背景同色0.1。没有禁用、删除或图标角标设计，不支持这些组合。

2026-10-24输入边界修复：普通标签与角标都必须有可渲染内容；null/undefined、布尔值、空数组及纯空白文本拒绝，数字0和有效元素保留。该检查不改变任何有效标签的原DOM、颜色、尺寸或圆角。
