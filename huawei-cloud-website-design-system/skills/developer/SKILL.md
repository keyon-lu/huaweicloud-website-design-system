---
name: huawei-cloud-website-developer-workflow
description: 已选择华为云官网根 Skill 后的开发者首页内部工作流，使用developer-portal运行路线；不独立覆盖其它场景。
---

# 开发者首页工作流

读[根入口](../../SKILL.md)、[场景真值](../../references/developer-pages.md)和[公共组件契约](../../references/component-contract.md)。使用已校准首页模板，明确固定文案/数据快照和可配置字段；不直接当成所有门户模板。

用根入口的资源解析/生成/校验命令，page_type=developer-portal，输出在包外。图片只用登记ID；组件/布局未知时保留缺口并补共享组件契约，不在页面尾部重造导航/页尾。JSON输入模式不混用variant或TSX，手写TSX仍复用公开组件。当前验收与源码/浏览器/正式发布范围见[验收台账](../../references/acceptance-ledger.md)和[验证报告](../../references/validation-report.md)。
