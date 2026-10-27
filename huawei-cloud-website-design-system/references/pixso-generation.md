# 将设计稿用于页面生成

这批15份设计文件的基础样式、楼层说明与页面模式均属于生成前可查询的来源。不要因运行包此前只有少数floor kind，就认定其它页面没有规范，也不要把“已解析”写成“全部可生成”。来源字段与文字不完整时，应继续读取原节点的textData、glyphs、样式覆盖及实例引用，不能只看简化节点索引后宣称设计稿没有说明。

## 生成时如何选

按用户页面的内容目的和信息关系检索[设计模式目录](pixso-pattern-catalog.json)，而非先锁定产品/开发者两种页面模板。目录按文件及具体节点保留原有名称、原始设计说明和采用状态，含Banner、图文、卡片、流程、筛选、套餐、导航与内容页面模式；内部导入画布未当成业务楼层。相同名称跨源保留，不能按年份、勾号或出现次数自动合并。

使用 `node scripts/find-design-pattern.mjs "学习与使用" --details` 获取具体说明。`implemented-prototype`有公开接口、样式，以及适用的生成kind或页面片段入口，可以在给定边界生成；`source-indexed`已有设计依据，但运行实现尚未转换，继续按该设计补接口/样式/适配，不得静默改成通用cards。目录里的数量是来源模式记录，包含重复变体，不能称为新增规范楼层的去重总数。

新楼层需把原稿中：必选/可选结构、文字规则、按钮/链接种类、实际尺寸/间距、每个分辨率适配、状态和素材引用写入组件契约；接入public entry、离线组件、content schema、生成路由及样本。外层用最新用户全局栅格，组件内部尺寸保持自身设计。不把原型构建当作Pixso像素认证；也不把未完成像素认证当成停止规范转化的理由。

## 当前接通的新增内容

- 学习与使用：PIX-002 26:11030/26:11053，`kind=learning-links`，产品与组合页面均可生成，见[执行规范](learning-links.md)。桌面分类链接与手机独立入口分开配置。2026-10-17用户已裁定仅保留2–4组，忽略五组场景。
- 复选框/单选组：`PortalChoice/PortalChoiceGroup`，公开React模板`SourceChoice/SourceChoiceGroup`；复选框选中/半选允许用户确认的蓝色。具体规格在[source-choice](../assets/search-workspace/src/components-specs/source-choice.md)。
- 标签：`PortalLabel/SourceLabel`；既有尺寸/色系/删除状态与用户选中的浅绿色标签背景见[source-label](../assets/search-workspace/src/components-specs/source-label.md)。
- 折叠：`PortalCollapse/PortalCollapseGroup`及模板Source入口，保留来源皮肤、互斥与底部触发，不取代已有FAQ楼层。见[source-collapse](../assets/search-workspace/src/components-specs/source-collapse.md)。

上述是可运行原型范围，完整状态、人工无障碍及Pixso视觉验收仍单列。其余目录项已有可查依据，不因此宣称实现完成。

## 基础样式采用

[来源样式表](pixso-foundation-styles.json)保留各文件的命名角色、字体、行高与颜色字段，不将2818条来源定义说成2818个新全局Token。实际消费仍通过语义映射登记来源与作用域：18/24与18/28按组件原设计保留；按钮避免#1476FF、复选框允许；同名绿色标签背景按用户选定的浅色处理。见[用户裁定与来源采用](pixso-design-adoption.md)。

专项来源覆盖：Banner（PIX-005）、官网登录页（PIX-006）、图标（PIX-007）、按钮（PIX-008）、插画（PIX-009）、架构图（PIX-010）、基础组件（PIX-011）、历史基础样式（PIX-012）、开发者IP Banner素材（PIX-013）、Cloud UI样式/组件（PIX-014/015）。登录页、素材库和架构图不因被索引就自动成为所有页的楼层。按钮沿用当前已确认中性/品牌角色；新来源中的下拉/组合变体逐项转化，不能只复制示例截图。

冲突须说明来源节点、对应场景和具体差异后提交用户，不用“最新稿优先”替用户决定。用户已经明确裁定的规则直接执行，不重复询问。来源原文件只读保留；分发包包含执行所需的精简规范和索引，不要求另一台机器拥有原始桌面路径。

2026-10-17九份在线入口对应的规范正文、精确节点检索和本批集中问题处理见[优先导入工作流](pixso-priority-workflow.md)。已核验线上目录与本地来源对应，但不声称所有线上节点与本地版本一致。

新增源码基础入口：下拉选择框`SourceSelect/PortalSelect`与滚动区域`SourceScrollbar/PortalScrollbar`，有原生语义与公开接口。分别见[source-select](../assets/search-workspace/src/components-specs/source-select.md)、[source-scrollbar](../assets/search-workspace/src/components-specs/source-scrollbar.md)。接口和工程通过不代表逐状态Pixso视觉及全家族无障碍验收完成。

已进一步提炼[Pixso流程组件](pixso-process-flow.md)与[场景案例左右图文](pixso-scene-media.md)执行条文；前者明确3～5步和1024区间轮播，后者保留来源中的局部尺寸差异。两者已接入各自限定分支，完整变体仍待补齐，不冒用旧kind。最新目录为183条来源模式记录，含重复变体，不是183种已验收楼层。

独立页签入口`SourceTabs/PortalTabs`采用原生键盘与ARIA语义，保留来源页签样式、长标签滚动和面板状态；见[source-tabs](../assets/search-workspace/src/components-specs/source-tabs.md)。内容目的检索示例：`node scripts/find-design-pattern.mjs "我希望按步骤说明申请流程" --details`。提示只推荐候选规范，不能代替结构、适配及实现状态核对。

流程类亮色文本使用`process-flow`，见[逐来源契约](pixso-process-flow.md)和`src/pages/portal-composed/process-flow.content.json`；不要用合作伙伴`process-steps`或通用cards替代。模板导出`SourceProcessFlow`，离线页面导出`PortalProcessFlow`，未实现变体会由内容校验器明确拒绝。

逐来源处理队列见[执行队列](pattern-execution-queue.json)。分类为待核对建议，不等于转化完成。文档图片使用PortalImageViewer，文档前后切换使用PortalDocumentPager；它们是页面片段，不增加楼层kind。基础表格使用PortalFixedTable/PortalServiceTable，不能冒充Pixso文档表格的筛选、排序和放大等未实现状态。

场景/案例左右图文采用`scene-media`，见[来源执行规范](pixso-scene-media.md)与`src/pages/portal-composed/scene-media.content.json`。多项桌面页签、手机折叠，图片/富文本/行动配置均可替换；不使用固定业务文案。

整页组合示例`src/pages/portal-composed/floor-composition.content.json`包含场景图文、流程、学习入口三个独立来源楼层，用`portal-generate-page.mjs website-composed <输出目录> <名称> --title <标题> --content-json <该JSON>`生成；示例文案是验证内容，可以按业务替换，不作为固定页面模板。

连续转化批次：`recommended-docs`、`latest-updates`、`general-banner`的配置与边界分别见同名pixso规范；组合示例`src/pages/portal-composed/content-floors.content.json`同时包含八个来源楼层。含图标文本在内新增五个原型使生成kind为16；183条来源模式中10条为限定原型，完整来源验收仍为0。

图标文本卡片`icon-text-cards`见[执行规范](pixso-icon-text-cards.md)；图片必须登记，不能自行绘制后冒充来源图标。

常见问题`faq-list`见[执行规范](pixso-faq-list.md)，PC默认展开开关与手机始终默认收起分别执行。

本批五类楼层的实际工程、响应式、交互及自动无障碍验证摘要与源码哈希见[验证快照](content-floor-validation.json)。这些记录只证明对应范围，不替代完整来源、人工验收和正式发布。
