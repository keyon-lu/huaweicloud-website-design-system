---
name: huawei-cloud-website-design-system-routing
description: 华为云官网根 Skill 的内部场景路由导航，按产品、开发者首页或公共组件组合选择工作流，不另立视觉规范。
---

# 场景路由

根入口[SKILL.md](../SKILL.md)负责共同规则和生成命令。

四条工作流均是核心分支；重叠触发按[执行与覆盖边界](../references/execution-governance.md)选择。明确要求查询接口/结果检索时优先本地检索；仅展示资源列表时用组合页。

| 意图 | 内部工作流 | 实际路线 |
|---|---|---|
| 云服务产品展示 | [产品页](product/SKILL.md) | website-product-floor |
| 已校准开发者首页 | [开发者首页](developer/SKILL.md) | developer-portal |
| 解决方案/活动介绍/资源入口/内容详情原型 | [官网组合](composed/SKILL.md) | website-composed |

以具体任务结构选择，不根据页面标题中的产品名切换样式。控制台、CMS/支付/报名服务、Pixso转换未启用，保留缺口并说明当前可复用范围。场景不匹配时先明确结构和组件缺口，不用旧营销/文章路线冒充已支持。

要求搜索/内容检索及运行环境时选择[本地检索](search/SKILL.md)，独立于上述三条离线page_type，不把CMS/全站搜索标为已完成。
