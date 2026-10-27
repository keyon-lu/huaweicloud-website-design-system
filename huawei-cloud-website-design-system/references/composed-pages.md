# 配置驱动的官网组合页

页面类型website-composed；当前支持scene=solution/campaign/resource/article，分别用于解决方案概述、活动介绍、资源入口和内容详情原型。复用现有公共导航、页尾、楼层、按钮、卡片、折叠、案例与FAQ。不是源站四类页面已逐一校准，也不支持活动报名后端、CMS、评论/账号管理、全文搜索或任意富文本执行。

```text
node scripts/generate-page.mjs website-composed <输出目录> <页面名> --title <标题> --content-json <资料.json>
```

JSON输入不能混用variant/tsx。无JSON使用明确的示例模板。examples/solution.json、campaign.json、resource.json、article.json是布局示例，不是官方业务数据。

## 数据接口

PortalComposedPageData：scene必填；hero={title,description?,eyebrow?,actions?}；sections非空；header?、sectionNavigation?、footer?、finalAction?。

- header支持links/actionEntries/searchEnabled/mobileMenu，直接传给PortalHeader；默认站点导航。onSearch仍未通过Header透传，不称为全站搜索。
- sections有唯一id/title/kind；text用paragraphs[]，可asset/alt/links，支持description/bg；cards用items(title,description,href?,action?,tag?)及description/bg。
- folded-media/solution-cards/customer-cases/resources/faq复用原共享接口及状态。text/cards可改楼层标题；resources必须“相关资源”、faq必须“常见问题”。原共享楼层不额外支持本接口中的bg/description，不能声称已渲染。
- customer-cases的names/logos与items等长；图片缺省则省略。folded-media和finalAction有必需资产，使用本地Asset ID。
- sectionNavigation只配置本页存在的锚点；footer缺省共享官网页尾、false省略；对象{groups}更换导航组，不改固定联系人/法律信息。finalAction是共享CTA，不执行报名/购买。

组合根类包含hc-page-product，作为现有容器/卡片响应规则的兼容载体，另有hc-page-composed和场景类；不因此把活动或文章语义称为产品页。composed-page.css仅影响新根类的长文本、配图和卡片断行；既有两类样本CSS不变。正文最大960px为可读性候选实现，仍位于全局内容容器内，未经原站文章视觉校准。

正文按纯文本段落渲染，无dangerouslySetInnerHTML/HTML执行。需要视频/富文本/目录过滤、报名状态等新能力时，先增加共享组件和契约，再加入schema，不以任意页面末尾CSS补丁扩展。

## 验证与适用性

新JSON校验器验证scene、kind、唯一id、非空内容、Asset ID、部分链接协议、锚点及平行数组；手写TSX仍由调用者负责相同约束。示例渲染、非法配置、长文案和特殊字符应分别检查。已有页面人工验收不自动覆盖新场景；新组件只完成源码/行为检查时标为原型，视觉/触屏/键盘验收分别记录。

组合cards按可用空间自动分列，260px为候选最小卡宽并受窄屏容器限制；不改变已校准产品/开发者卡片列数。JSON组合模式按已配置模块登记的资产和必要框架图标内嵌素材，手写TSX和旧两条路线仍保留原资源嵌入行为。

## 楼层覆盖扩展

先查[floor-component-registry.json](floor-component-registry.json)，基础组件24家族不等于楼层全部覆盖。已接入process-steps：3–4步的顺序说明，items(title/description/href?/action?/icon?)，支持楼层description/bg。详见[步骤契约](process-steps.md)。明确STEP编号的顺序流程不得用普通cards替代；未接入楼层须声明缺口并扩展组件/路由/校验，不静默拼装无来源样式。来源还有活动流程、流程页签、流程指引，当前是候选而非已完成组件。

生成前按[楼层选型规则](floor-selection.md)逐楼层记录内容意图、组件、来源和缺口；步骤组件以合作伙伴页process-v2为参考，不继续使用2.4.0旧六边形编号样式。

新增kind=learning-links：按[学习与使用规范](learning-links.md)生成桌面分类卡片和手机独立入口。items不是description卡片结构；mobileItems必填，不自动丢弃PC内容。具体来源见[设计稿生成流程](pixso-generation.md)。

```json
{"kind":"learning-links","id":"learn","title":"学习与使用","items":[{"title":"新手入门","links":[{"label":"入门文档","href":"https://support.huaweicloud.com/"}]},{"title":"开发工具","links":[{"label":"工具文档","href":"https://developer.huaweicloud.com/"}]}],"mobileItems":[{"label":"入门文档","href":"https://support.huaweicloud.com/"},{"label":"工具文档","href":"https://developer.huaweicloud.com/"}]}
```

