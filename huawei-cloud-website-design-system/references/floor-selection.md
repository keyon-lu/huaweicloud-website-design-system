# 楼层选择与新增组件规则

2026-10-19最新用户裁定：已调试并验证的产品页/开发者组件样式固定复用，不根据新Pixso稿重做；新稿补缺失组件/变体。优先完成基础样式、2026图标与插画验证。先读[已验证样式保护](approved-presentation-policy.md)及[基础视觉规则](visual-foundations-2026.md)。

先读本文件，再按[楼层目录](floor-component-registry.json)与[公开组件API](component-registry.json)选组件。基础组件数量不能替代楼层覆盖：按钮/输入等24个基础家族，和流程、方案展示、案例、图文、资源等组合楼层是两条独立维度。页面类型不是组件风格的唯一判据，非产品/开发者首页也可由有依据的楼层组成。

## 选型顺序

每个楼层先写清内容目的、信息关系、操作和目标视口，再选结构。推荐生成前记录一行“内容目的→信息结构→公开组件/变体→来源→未验证项”。不能只凭标题含“步骤”或类名存在就认定样式适用。

|内容关系|优先选择|关键边界|
|---|---|---|
|按Pixso规范说明3–5个顺序阶段|PortalProcessFlow / process-flow|亮色文本；平板最多四步轮播、手机纵排；底部CTA高度显式选来源分支，视频/字母/背景仍待实现|
|按合作伙伴样本完成3–4步操作|PortalProcessSteps / process-steps|合作伙伴页process-v2；不能套优势卡片或旧六边形图标|
|步骤切换并展示对应详细内容|步骤页签候选process-tabs|有来源样式但未完整建模；先取真实样本，不能套静态步骤|
|时间、议程或活动阶段|activity-process候选|先确认时间/状态和真实楼层，不把顺序操作冒充日程|
|相互独立的卖点/能力摘要|PortalCards或PortalSolutionCards|按图文/操作结构选契约；编号不等于卡片规范|
|场景/案例叙述、分类页签与左右图文|PortalSceneMedia / scene-media|Pixso26:3228；手机分类折叠、富文本及独立操作区；Logo墙/架构图属于其它来源|
|点击标题切换大图与说明|PortalFoldedMedia|有媒体与折叠交互需求才用，不用普通卡片仿制|
|客户名称、案例概述、真实Logo与链接|PortalCustomerCases|资料缺失采用名称回退；不编造客户背书|
|资料/工具/文档入口集合|PortalProductResources或已注册资源组合|按链接和分类结构选择，不挪用固定开发者首页文案|
|问题与回答|PortalProductQuestions / faq|保持已有展开与键盘规范|
|长段落与小量关联链接|组合页text|只用于文章说明，不替代已有复杂楼层|

现有组件的API支持不等于已覆盖所有页面和视觉状态；参考样本、工程适配、用户验收在目录中分别标注。未建立视觉来源的结构只作为候选，不计入已覆盖楼层。

## 何时复用、扩展或新增

目的、结构、交互和目标视口均匹配时直接复用。仅内容或顺序变化时调整配置。结构相同但有明确官网样本差异时建立有来源的变体，写明哪些尺寸/交互不同。出现新的信息关系或交互时补新楼层；先检索包内契约和用户指定官网样本，再补来源、结构、Token、公开接口、路由、素材、响应式、状态和验证。缺关键样本只暂停该楼层取证，继续其它已覆盖内容。

## 新组件与既有规范的契合检查

1. 外层容器沿用全局栅格；组件内间距按其来源，不将16px槽宽机械覆盖全部间距。
2. 按钮、链接、字号、颜色、圆角和焦点复用已有语义角色；新增数值要有来源、版本和选择器，不从一张旧样本随意外推。
3. 图片/编号/箭头复用已登记真实素材；不能自行绘制后称为规范素材。
4. 明确默认、hover、focus、disabled、展开/选中等哪些状态适用；纯展示项不强造状态。
5. 分别验证桌面/平板/手机、长文案和真实交互；给出与参考的差异，不把构建通过写成视觉验收。
6. 更新目录、契约、生成schema和正反例；同一个修复必须进入Skill，不只改某个输出页面。

原型设计允许提出新组件候选，但不能无来源地把候选写成华为云既有规范。用户确认新设计后仍需保留“新设计/工程适配”和“源站已有”的区别。

新增来源先检索[Pixso模式目录](pixso-pattern-catalog.json)与[生成规则](pixso-generation.md)，按原设计适配，不止查旧八类。分类学习/课程/文档链接集合优先learning-links（2–4组PC卡片＋单独手机入口），见[规范](learning-links.md)，不是resources固定标题模板或cards卖点卡片。来源索引中的其它模式需要继续接实现，不能无声降级。

新增来源楼层：分类文档超链接（PC2–5列、手机默认隐藏/可选折叠）选[recommended-docs](pixso-recommended-docs.md)；公告条加四组信息选[latest-updates](pixso-latest-updates.md)，不代替按日期新闻列表；浅色纯文字横幅选[general-banner](pixso-general-banner.md)，图标、广告、视频与背景图分支尚不可用。三个kind均支持产品/组合生成，示例为`src/pages/portal-composed/content-floors.content.json`。

并列图标、短标题和说明采用[icon-text-cards](pixso-icon-text-cards.md)，2–4列、平板最多3列、手机单列；不将其作为编号步骤。图标62/56px来源冲突必须显式指定。

带富文本答案、PC可配置默认展开、手机始终默认收起的问题列表采用[faq-list](pixso-faq-list.md)，并非旧产品页简版faq的自动别名。


2026产品页独立来源：带真实复制命令、多工具Tab的背景卡片选[command-cards-2026](product-2026-commands.md)；不要用旧developer-copy-command输入框替代整个楼层。[楼层底部操作](product-2026-commands.md)可独立调用；[Tab内容容器](product-2026-tabs.md)走TSX组合入口。1～3张下一步背景CTA选[next-step-2026](product-2026-next.md)，单卡48px按钮、多卡40px。带问题分类与咨询卡的FAQ选[faq-2026](product-2026-faq.md)。带背景图、底角箭头/架构图弹窗的行业场景选[scenario-solutions-2026](product-2026-scenarios.md)，不能静默换成白底基础cards。所有条目为明确边界的原型，未实现的源分支继续按台账补齐。


2026视频教程卡片采用[video-cards-2026](product-2026-video.md)，真实播放弹窗、错误/重试及字幕元数据；智能体/平台背景卡采用[agent-cards-2026](product-2026-agents.md)，可视区或hover静音背景视频、暂停、独立手机内容与图标。带二级和更多入口的[页内导航](product-2026-navigation.md)用独立TSX入口，手机CTA显式指定show/hide，不能擅自采用冲突来源之一。

2026始终单项展开的左右图文选择 [folded-media-2026](product-2026-folded.md)，支持2～6项、分割线进度与手机展开项内独立图片；不能以允许全部关闭的FAQ替代。

最新资讯采用[news-2026](product-2026-news.md)：大图资讯加小卡列表，支持无图/无时间和手机独立内容，手机不加载背景视频。

计费比较选择[pricing-table-2026](product-2026-pricing.md)：PC真实富文本表格，H5明确选择按模型行或按价格列折叠，不能把桌面表格直接缩成小字。

云宝助手式输入区使用[assistant-search-2026](product-2026-assistant.md)，本地records提供真实内容检索，TSX onSearch可接业务接口；未接AI接口不得显示AI生成的虚构答案。

有默认窄卡/展开宽卡及独立展开内容时选[hover-expand-2026](product-2026-hover.md)，必须提供键盘和手机入口，不能仅依赖鼠标hover。

需要居中demo、左右讲解以及多图/多视频展示组时选[demo-architecture-2026](product-2026-demo.md)。它与流程楼层不同，配置多个媒体时有前后/重置；单媒体无多余切换控件。

大图、指标、相关产品并按客户Logo切换选[customer-cases-2026](product-2026-cases.md)，保持可键盘操作和手机独立内容，不能生成没有客户切换支撑的普通案例卡片冒充此规范。

优势图文按行2～4卡、按行展开收起与独立pad配置选[advantage-grid-2026](product-2026-advantages.md)，不要把标题字号冲突压成单一全局值。

1200×600横向大卡、80%标题、50/60%简介并含背景视频或弹窗视频选[wide-carousel-2026](product-2026-wide.md)，不要用流程组件的无控件规则覆盖此轮播。

仅组合新楼层标题/副标题与内容间距时用[PortalProduct2026FloorFrame](product-2026-floor-frame.md)，避免套用业务组件卡片。它不计独立业务floor kind，内部业务媒体仍用自身断点。

2/3/4列AI/案例多场景轮播选[scene-carousel-2026](product-2026-scene-carousel.md)，AI浮层不可混入案例指标；不是宽卡轮播或hover变宽卡的替代别名。

模型目录采用[model-catalog-2026](product-2026-models.md)，显式选择equal更新分支或stacked原始分支，不能将至少5卡限制错误套到2/3卡更新样式。

套餐配置/价格/通栏购买按钮选[package-cards-2026](product-2026-packages.md)，价格来自显式业务数据，不能自行推算；测试页禁用购买。手机inline或stacked按来源版本显式选。

新版产品Banner采用[结构上篇](product-2026-banner.md)与[适配下篇](product-2026-banner-responsive.md)互补实现，JSON product-banner-2026。替换页面顶部可设置hero2026（headingLevel=1）；data.hero仍为导航/标题元数据，渲染器不重复显示旧Hero。

老版产品页8/7/6菜单与768手机断点采用[PortalProductV1InPageNavigation](product-v1-navigation.md)，不与2026固定8项、599手机CTA规则混用。

仅楼层锚点且768以下隐藏时选[PortalProductV1AnchorNavigation](product-v1-anchor.md)，与保留手机导航的产品页内导航不同。


分级产品目录选择[anchored-product-catalog](product-v1-catalog.md)：桌面左侧分类侧栏，手机顶部锚点及下拉，右侧一级分组/二级分组/产品卡片。普通楼层锚点与产品页内导航分别使用product-v1-anchor、product-v1-navigation，不混用手机隐藏规则。


[v1图标文本卡片](product-v1-cards.md)：相关产品推荐选product-recommendations-v1，手机明确compact/hidden且不显示说明；咨询、认证、案例用generic-cards-v1，允许操作与重点文字，手机横排/竖排显式选择。二者不互相代替。v1 Tab组合及活动侧边电梯见product-v1-tabs、product-v1-elevator，属于组合/导航入口。


嘉宾人物名单使用[speaker-cards-v1](product-v1-speakers.md)，PC肖像与手机裁切独立；grid支持展开/收起，carousel手动切换。来源不规则大小拼贴未实现，不能用该普通网格宣称覆盖。


客户/伙伴Logo展示用[logo-cards-v1](product-v1-logos.md)，2～6列，纯Logo与描述卡片分型，手机白色分组2列；不替代人物肖像或带业务操作的通用卡片。


照片墙选[photo-wall-v1](product-v1-photo-wall.md)，按1大2小或1大5小组装，手机独立三图组合；该可滚动照片墙与禁止流程楼层滚动条/切换按钮的规则不是同一来源场景。


新闻/博客不规则推荐使用[editorial-grid-v1](product-v1-editorial.md)，固定3列，每列必须选原稿四种大中小卡组合。中小屏比例候选尚未视觉验收；对高保真需求应先核对对应节点，不能作为完成认证的默认替代。新闻检索列表另有来源16:30923，不用此楼层冒充筛选功能。


新闻检索/聚合列表选[news-list-v1](product-v1-news-list.md)，真实本地多维筛选+关键词+分页，图片全局可选。当前H5视觉与视图切换未验收，异步远端接口另行提供适配；与editorial-grid-v1推荐展示分开选择。


大咖金句/人物观点选[expert-quote-v1](product-v1-quote.md)，内容、可选头像落款、肖像图文三种结构；引言使用结构化富文本，手机肖像独立图片；多条引言轮播尚待源分支转化，不冒用照片墙切换。


新闻、奖项、图书左图片右正文用[publication-cards-v1](product-v1-publications.md)，2列180宽或3列120宽纵图、富文本和最多两操作；H5居中图片152宽，正文与按钮可独立居中。不要用通用图标卡替代纵向封面。


v1应用场景架构图选[architecture-media-v1](product-v1-architecture.md)，50/60图片区、完整查看器、正文锚点与6项搭配产品；手机阈值768且同一架构图自然高度。2026 split-media-2026保留599及独立来源样式，不自动合并。

Flexus型折叠左文右图使用[folded-media-v1](product-v1-folded.md)：768手机阈值、50%自然高度完整图、650/520/440文字滚动上限；2026版保留自己的599/839适配，不以别名代替。

原地播放并可展开为剧场、右侧滚动内容用[live-video-v1](product-v1-live.md)。视频缩略卡片弹窗选video-cards-2026，两者不能互相替代。

底部大插画、标签与操作、H5改为白色分组横向列表使用[advantage-illustrations-v1](product-v1-advantages.md)；不要用通用卡片简单降列代替。

全幅背景、页签切换客户故事使用[customer-story-v1](product-v1-cases.md)，PC48%文字区、Logo占位和最大内容稳定高度。Logo选择器与指标卡片仍选customer-cases-2026，不能混用。

按1:1:1:1/2:1:1/2:2/1:1:2排布、可带图标和按天倒计时的活动选[activity-countdown-cards-v1](product-v1-activities.md)，手机明确选择独立计时卡片或紧凑图文列表；倒计时出现时间必须显式配置。

一个重点图文加四个小推荐、手机独立五项的解决方案使用[featured-solutions-v1](product-v1-solutions.md)；适用于明确突出一个方案，保留全部配置按钮和白灰互斥规则。

大促活动分会场入口选[session-entry-cards-v1](product-v1-sessions.md)：PC左图标右标题/红字说明，H5双列图标入口并隐藏说明，行数不限制。

直播主视觉加场次目录、状态与预约/取消演示使用[live-preview-v1](product-v1-live-preview.md)，真正视频播放用live-video-v1，两者不是同一楼层。当前预约只在页面本地验证。

背景插画承载4/5/6个活动解决方案的拼图选[campaign-mosaic-v1](product-v1-mosaic.md)，H5使用独立上图下文横滑卡片；中屏单卡比例冲突仍未裁定，不推广为已认证适配规则。

文字/项目符号加自然高度数据图表、14:10错位或12:12平分、手机折叠说明选[illustrated-benefits-v1](product-v1-benefits.md)，手机默认第一项展开且允许全部收起。

2～3列、列内1～3卡与二级入口的能力专区使用[ai-architecture-columns-v1](product-v1-ai-architecture.md)，统一左上/左下内容位置；它不提供架构连线编辑能力。

场景/直播/案例的上图下文综合卡片用[information-cards-v1](product-v1-information.md)，2～5宽间距列、优势点/标签、可配展开收起。只有市场中心用途可启用按分钟自动判定活动状态。

图文内容聚合检索用[image-filter-v1](product-v1-filters.md)，客户Logo/说明检索用[logo-filter-v1](product-v1-filters.md)。二者是侧栏多维筛选，不能替代横向维度筛选或新闻列表。手机底部条件面板、追加4与默认5/追加6分别保留。

分析师报告等横向维度筛选与竖图卡片用[report-filter-v1](product-v1-report-filter.md)，媒体位置以实际稿为准。不要用侧栏图文筛选替代；手机隐藏简介、批量追加和收起全部。
