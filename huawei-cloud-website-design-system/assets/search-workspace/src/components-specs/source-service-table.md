# service-table独立基础组件

来源：references/portalui-docs/baseui/service-table.md，以及src/styles/portalui-source-3.0.17.css。公开模板入口SourceServiceTable，离线同源入口PortalServiceTable。中文亮色范围，独立组件结构和交互已实现，不代表Pixso同名楼层或整家族完整验收。

用于服务等级对比，按来源PC表格结构和手机折叠列表，保持服务项与各等级单元格映射。PC悬浮/内部焦点高亮同列，手机按服务等级展开，复用SourceCollapse交互。须提供独立rowHeading、列/行命名，1～14个等级（加标题列<=15），行列数据必须一致。只覆盖中文亮色原型；超多列的窄屏策略和完整源稿视觉仍需验收，不按普通参数表替换。

## 2026-10-21合并
用户要求合并到表格。此API仅把rowHeading等旧参数转换为SourceFixedTable，不再推荐为独立组件。设计和验收统一见source-fixed-table.md。
