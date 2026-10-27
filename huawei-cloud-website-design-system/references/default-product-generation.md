# Default product page generation

Use the default website-product-floor route with --content-json <product.json>; no product-specific variant or page CSS is required. PortalProductPage composes the calibrated site header, product navigation, hero and public website footer. Ordered floors choose folded-media, solution-cards, customer-cases, resources or faq. Optional finalAction uses the shared CTA. This selection expresses content structure, not product identity. A WAF page and a CloudRobo transfer sample can use the identical renderer. Product assets must first be registered locally; missing IDs and unknown floor kinds fail rather than silently fall back to old generic cards. JSON mode does not combine with --variant or --tsx-file. Without content JSON, the default produces a minimal placeholder shell without invented business claims.

Required input: hero(title,description,actions,optional asset/breadcrumb), floors(kind,id,title,items), optional navigation, footer, finalAction(title,asset,href,label,optional id). Read shared-product-floors.md and waf-special-floors.md for item schemas and source limits. Cases accept logos/names arrays. Existing resource and FAQ families have fixed titles; use the corresponding labels. Missing FAQ or CTA data means omit them, not copy another product's content. Background cards without images use optional asset and readable theme.

Example: node scripts/generate-page.mjs website-product-floor <output> <name> --title <title> --content-json <content.json>. The output remains editable TSX. GaussDB and WAF variants remain reference examples rather than required product routes. Developer route is unchanged. Unsupported floor families (pricing, complex asset/model catalogues, video) still need an explicit workflow; no promise of full-page coverage or automatic website scraping. Public WebP assets are now supported as packaged native image/webp, preserving original files.

Manual user acceptance applies to the prior GaussDB/WAF implemented samples; a new product and the new renderer still require review. Static/regression checks cannot create new manual acceptance.

当前完整字段签名、调用者约束和固定内容边界见[组件契约](component-contract.md)，历史验收与当前框架范围见[台账](acceptance-ledger.md)。生成器已检查hero/floors基础字段、非空楼层列表、kind/id重复与格式、Asset ID和分类型部分字段；并未完整验证所有href、案例平行数组长度、任意TSX props或业务真实性，调用者仍负责这些约束。

新增kind=learning-links：按[学习与使用规范](learning-links.md)生成桌面分类卡片和手机独立入口。items不是description卡片结构；mobileItems必填，不自动丢弃PC内容。具体来源见[设计稿生成流程](pixso-generation.md)。

```json
{"kind":"learning-links","id":"learn","title":"学习与使用","items":[{"title":"新手入门","links":[{"label":"入门文档","href":"https://support.huaweicloud.com/"}]},{"title":"开发工具","links":[{"label":"工具文档","href":"https://developer.huaweicloud.com/"}]}],"mobileItems":[{"label":"入门文档","href":"https://support.huaweicloud.com/"},{"label":"工具文档","href":"https://developer.huaweicloud.com/"}]}
```

