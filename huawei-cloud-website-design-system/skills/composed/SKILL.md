---
name: huawei-cloud-website-composed-workflow
description: 已选择华为云官网根 Skill 后的官网组合场景内部工作流，使用website-composed运行路线；不独立覆盖其它场景。
---

# 官网组合场景工作流

读[根入口](../../SKILL.md)、[场景真值](../../references/composed-pages.md)和[公共组件契约](../../references/component-contract.md)。scene选择solution/campaign/resource/article；使用已有块组合，不假设CMS、报名或生产搜索已经实现。

用根入口的资源解析/生成/校验命令，page_type=website-composed，输出在包外。图片只用登记ID；组件/布局未知时保留缺口并补共享组件契约，不在页面尾部重造导航/页尾。JSON输入模式不混用variant或TSX，手写TSX仍复用公开组件。当前验收与源码/浏览器/正式发布范围见[验收台账](../../references/acceptance-ledger.md)和[验证报告](../../references/validation-report.md)。

生成前必读[楼层注册表](../../references/floor-component-registry.json)及[当前界面色](../../references/website-palette.md)。顺序步骤用process-steps，未覆盖模块先登记缺口与来源，不能以普通cards静默替代。按钮避免使用#1476FF及其等值/透明变体；复选框允许使用该颜色，其他组件按各自来源规范。
