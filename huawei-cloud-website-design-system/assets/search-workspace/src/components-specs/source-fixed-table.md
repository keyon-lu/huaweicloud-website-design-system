# fixed-table独立基础组件

来源：references/portalui-docs/baseui/fixed-table.md，以及src/styles/portalui-source-3.0.17.css。公开模板入口SourceFixedTable，离线同源入口PortalFixedTable。中文亮色范围，独立组件结构和交互已实现，不代表Pixso同名楼层或整家族完整验收。

用于参数展示与对比：真实table/caption/thead/tbody，列标题和行标题语义，组分隔行可跨列；striped控制来源条纹，maxHeight可选且必须正数。粘性表头和有名称/可聚焦的滚动区域替代克隆表头JQuery，窄屏横向滚动，不改变单元格对应关系。数据必须列数一致且ID唯一。当前不支持排序、编辑、合并单元格或暗色，不能按本组件宣称这些状态完成。

## 合并表格2026-10-21
以1272:23644/1272:22091作为唯一表格设计依据。SourceFixedTable是新页面入口；SourceServiceTable转为其兼容适配，不再创建红色活动列或独立移动折叠皮肤。当前基础表头/单元格样本待用户复验，图标、价格/操作行、复杂合并与完整列数的视觉对应未完成，不以基础数据表样本冒充整套套餐对比表。
