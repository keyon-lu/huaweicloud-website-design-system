---
name: huawei-cloud-website-design-system
description: 依据华为云 PortalUI 基础资料、用户确认的规范和官网样本，生成或修改公开云服务产品页与开发者官网页面，输出适配桌面、平板和手机的独立 React TSX HTML。并支持解决方案、活动、资源与内容详情的公共组件组合原型，以及独立本地搜索验证工程；不适用于登录后的控制台。
---

# 华为云官网设计规范

2026-10-26：2.6.0 已按用户“发布正式版”指令发布。见[发布状态与限制](references/publication-2.6.0.json)。本次发布保留现有 RC18 功能；完整验收门禁尚未通过，不代表官方设计认证或无障碍认证。下文及历史证据中的 draft、待发布和门禁状态按各自记录日期理解；后续变更仍须验证，不得把未验项目改为通过。

负责人陆正阳。当前版本与边界见[包信息](references/package-manifest.yaml)。开发者首页2.0.24-draft已由用户验收；产品样本有各自的历史验收范围。当前包是可运行的官网原型 Skill，页面验收与全站官方规范认证、正式发布分别记录，见[验收台账](references/acceptance-ledger.md)。


2026-10-19最新用户裁定：已调试并验证的产品页/开发者组件样式固定复用，不根据新Pixso稿重做；新稿补缺失组件/变体。优先完成基础样式、2026图标与插画验证。先读[已验证样式保护](references/approved-presentation-policy.md)及[基础视觉规则](references/visual-foundations-2026.md)。

## 选择流程

先按[执行与覆盖边界](references/execution-governance.md)处理来源优先级、核心分支和触发冲突；本包为L2子规范扩展，不授予外部操作权限。

- 新产品页：`website-product-floor`，先读[产品页](references/product-pages.md)及[结构化资料接口](references/default-product-generation.md)，优先使用 `--content-json` 和 `PortalProductPage`。
- 开发者首页：`developer-portal`，先读[开发者页](references/developer-pages.md)。模板采用已验收首页结构，部分组件保留该首页固定文案，不直接作为其它门户模板。
- 编辑公共组件或适配：读[当前规范](references/current-standards.md)、[组件契约](references/component-contract.md)及相关专项文档。新页面组合复用这些组件，不重造同类楼层。
- 解决方案/活动介绍/资源入口/内容详情原型→`website-composed`，读[组合页契约](references/composed-pages.md)。控制台、CMS、生产报名/支付、任意Pixso一键转换和其它未实现结构不在范围；已转化的Pixso楼层规范可以复用。

- 搜索与内容检索业务：走[本地检索工作流](skills/search/SKILL.md)，生成独立React/TypeScript/API工程；不走离线HTML编译器，也不代表已接入生产接口。

## 新设计稿与非标准页面选型

2026-10-22生成前按[采用契约索引](references/first-release-contract-index.json)核对来源、结构、支持参数和拒绝边界。首版按[当前发布范围](references/first-release-scope.md)执行：采用66条已有来源的已实现契约分支、19项基础样本及本地检索；117条来源延期。原183条台账保留，不用索引数量冒充可生成能力。正式发布仍须通过逐来源与证据门禁，不按同名或通用cards冒充缺失结构。

本批进度与真实剩余量见[导入状态](references/priority-import-status.md)。九份优先文件按[来源检索与冲突处理](references/pixso-priority-workflow.md)使用；先查询具体页，再转化对应实现。先读[Pixso规范生成规则](references/pixso-generation.md)，按内容关系查[来源模式目录](references/pixso-pattern-catalog.json)。设计文件内已有适配说明的楼层应继续转化为执行规范，不因为尚未建模就套普通cards。已接通的具体楼层以模式目录generationKind及契约为准，可通过产品/组合资料生成；其余索引项不等于已实现。独立组件入口以[source-family-registry.json](references/source-family-registry.json)为准，包含复选、标签、折叠、滚动、页签、价格、分页、倒计时及基础卡片等；选择/评分暂停新页生成，图片查看器退出，服务表格合并。历史导出不等于首版支持；按当前范围及对应规格使用。

## 当前颜色约束

2026-10-26用户裁定：[下一步与直播预告对比度限制](references/accepted-source-limitations.md)按原稿保留并记录未达标，设计处理已决定，不再重复询问；不得因此声明WCAG AA通过或豁免其他验收。

2026-10-16用户澄清：按钮场景避免使用#1476FF（含RGB等值及透明变体）；复选框按2026-10-21验收修正为黑灰选中态（PIX-015 1056:13993）；不继续使用蓝色选中态。其他组件按各自来源规范，不作全局禁蓝。按钮使用website-palette.css中的已确认语义Token；该约束不禁止设计明确规定的蓝色链接、提示背景和图标。历史来源文件和已验收原产物保持可追溯。

## 生成与修改

发布范围以2026-10-22用户确认的[首版范围](references/first-release-scope.md)为准，逐项证据见[扩展发布档案](references/expanded-release-profile.json)。本轮采用66条来源的已实现契约分支、17个基础家族的19项已复验样本与本地检索；117条延期，暗色与多语言暂缓。24家族历史清单保留，不能宣称全部验收。正式发布前运行 `scripts/verify-expanded-release.mjs`；不得擅自缩减冻结范围、把索引数替代实现或把pending改成通过。文案资源检查使用 `scripts/verify-copy-resources.mjs`。

新增/修改前读[发布整改契约](references/release-hardening.md)及[首版逐家族执行表](references/first-release-execution-protocol.md)，区分支持状态、不适用状态与未验项目。Token消费须通过 `scripts/verify-token-consumption.mjs`，四分支资源与全部包内Markdown本地引用须通过 `scripts/verify-required-resources.mjs`；不以文档声明替代组件状态或视觉验收。

1. 先读[楼层选型规则](references/floor-selection.md)，再查[楼层组件注册表](references/floor-component-registry.json)。按目的、结构、交互、视口和真实样本匹配；3–4步合作伙伴静态操作走process-steps，Pixso3–5阶段文本流程走process-flow，不套普通cards；步骤页签/议程/未覆盖变体继续取证。未覆盖楼层先补规范/组件/路由与验证，不静默降级。明确受众、楼层顺序、真实文案、素材和行动入口。缺少价格、能力、案例或指标时省略或明确标为业务示例，不从其它产品借用内容。
2. 本文件目录为 `<SKILL_DIR>`。先检查包完整性、契约文档和资源路由，再生成；输出目录位于 Skill 包之外。

```text
node "<SKILL_DIR>/scripts/verify-standalone-package.mjs"
node "<SKILL_DIR>/scripts/verify-contract-docs.mjs"
node "<SKILL_DIR>/scripts/verify-component-behavior.mjs"
node "<SKILL_DIR>/scripts/verify-responsive-source.mjs"
node "<SKILL_DIR>/scripts/verify-composed-scenes.mjs"
node "<SKILL_DIR>/scripts/verify-p2-model.mjs"
node "<SKILL_DIR>/scripts/resolve-page-resources.mjs" <page_type>
node "<SKILL_DIR>/scripts/generate-page.mjs" website-product-floor "<输出目录>" <page-name> --title "<标题>" --content-json "<产品资料.json>"
node "<SKILL_DIR>/scripts/generate-page.mjs" developer-portal "<输出目录>" <page-name> --title "<标题>"
node "<SKILL_DIR>/scripts/generate-page.mjs" website-composed "<输出目录>" <page-name> --title "<标题>" --content-json "<场景资料.json>"
node "<SKILL_DIR>/scripts/validate-source-fast.mjs" "<输出目录>/<page-name>.shadcn.html"
```

3. 高级修改可复制场景 TSX 模板，保留 `hc-page-product` / `hc-page-developer` 根类，从 `portal-components` 导入组件；生成时使用 `--tsx-file`。JSON输入不能与variant/TSX混用；variant选择参考模板，提供TSX时以工作文件源码为准。覆盖产物须 `--overwrite`，失败保留原文件。
4. 全局容器和24/8/4列规则以[website-grid.md](references/website-grid.md)为准；一级导航和页尾遵循各自组件契约。16px栅格槽宽不替代组件内部间距。
5. 图片通过本地 Asset ID 注册，单文件内嵌 React/Babel/CSS/素材，不依赖 npm 安装。`.shadcn.html` 后缀是兼容命名，不代表使用了 shadcn 官方组件。
6. 检查目标视口、根级溢出、长文案和主要交互。编译、样式计算、浏览器观察和用户验收分别报告，不能互相替代。

组件选型前查[独立家族入口](references/source-family-registry.json)与[当前发布缺口](references/release-gap-audit.md)。相关页面包装只说明局部组合存在，不代表基础家族变体完整；不得为凑页面而补造未建模皮肤。

## 复用和证据边界

`Portal*` 是本地 React 包装与组合，不是官方完整 React 库。推荐共享组件、开发者首页组件、参考页包装和旧兼容入口见[组件契约](references/component-contract.md)，完整签名可查[组件注册表](references/component-registry.json)。GaussDB/WAF变体用于参考；新产品不按产品名称选择样式模板。

最新用户裁定优先于历史页面测量，冲突记录见[当前规范](references/current-standards.md)。原始 PortalUI 文档保留版本语境，不能用旧容器值覆盖当前规则。导航 Logo 和样本媒体已接入；字体仍用系统回退。首屏视频采用海报和手动切换，实践卡片使用原生滚动，GIF保留；不声称恢复了所有源站动效。

购买、账号和资源操作仅为配置的外链；复制不执行命令。国际化/RTL、社交二维码交互、正式无障碍审计及全站内容覆盖尚未完成。输出报告须列明场景、组件、来源、实际验证范围、回退和产物路径。最新完成情况见[验证报告](references/validation-report.md)。

P2维度和缺口见[建模契约](references/p2-model-contract.md)及[56项台账](references/p2-coverage.json)。建模门禁通过不等于正式发布；新页面迁移和回归检查范围见[验证报告](references/validation-report.md)。

独立候选包的使用与版本边界见[分发说明](references/distribution-guide.md)。

后续场景扩展遵循[扩展契约](references/scenario-expansion.md)，新场景保留原型/验收范围，不继承旧页面视觉验收。

可用能力与未完成的正式流程见[准备状态](references/readiness.md)及[2026-10-22发布前实测](references/prerelease-validation-2026-10-22.md)；内部场景工作流从[路由入口](skills/SKILL.md)选择。

本轮采用用户确认的PortalUI3.0.17源码基准，具体工程验收与全量缺口见[源码基准验收](references/source-baseline-acceptance.md)。

处理未转化来源时使用[逐来源执行队列](references/pattern-execution-queue.json)定位结构、适配和交互节点；候选分类须核对原稿，不能直接计为已实现。基础参数表、服务表、锚点导航、图片查看和文档相邻页切换的公开接口见组件注册表，各自来源范围与待补状态见独立spec。

## 2026-10-21人工验收修复优先级

逐项遵循[基础组件修复规则](references/foundation-remediation-2026-10-21.md)。本轮基础组件以对应设计节点为准，禁止把导航下拉面板当作选择器、把Logo当作图片查看器或按主观喜好增加语义色。图片查看器退出基础组件推荐；评分和原生select未找到对应设计节点前不宣称Pixso规范组件。已通过的10项局部样本与原按钮样本保留，其他修复须独立复验。

基础Token与图标分类证据见[原始基础样式](references/foundation-design-tokens.md)。文字API缺失字段不得靠经验补齐，原始302项读数在`foundation-design-token-catalog.json`。

图标必须先按[原始类别与可见说明](references/foundation-icon-category-catalog.json)匹配用途；[修复结果](references/foundation-remediation-results-2026-10-21.md)区分当前实现和缺口。规范原图与说明不是可调用图标资产。颜色和字体API摘要有差异时先查实际绑定节点，证据在`foundation-design-node-evidence-2026-10-21.json`，不得主观取平均或任选一份。

2026-10-21基础组件复验19项局部样本已通过，生成对应样本时保留[已确认范围与快照](references/foundation-owner-re-review-approved-2026-10-21.json)的样式；未展示变体仍按原设计取证和单独验收。
