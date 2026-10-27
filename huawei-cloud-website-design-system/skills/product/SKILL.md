---
name: huawei-cloud-website-product-workflow
description: 已选择华为云官网根 Skill 后的产品页内部工作流，使用website-product-floor运行路线；不独立覆盖其它场景。
---

# 产品页工作流

读[根入口](../../SKILL.md)、[场景真值](../../references/product-pages.md)和[公共组件契约](../../references/component-contract.md)。真实产品资料JSON，复用已校准产品楼层；不使用其它产品内容填空。

用根入口的资源解析/生成/校验命令，page_type=website-product-floor，输出在包外。图片只用登记ID；组件/布局未知时保留缺口并补共享组件契约，不在页面尾部重造导航/页尾。JSON输入模式不混用variant或TSX，手写TSX仍复用公开组件。当前验收与源码/浏览器/正式发布范围见[验收台账](../../references/acceptance-ledger.md)和[验证报告](../../references/validation-report.md)。
