---
name: huawei-cloud-website-local-search
description: 根Skill内部本地检索工作流；仅当任务要求搜索/内容检索业务及独立运行环境时选择，不替代离线原型生成。
---

# 本地搜索与内容检索

输入：空输出目录、用户确认的内容范围；默认8份公开规范快照。先读[本地搜索契约](../../references/local-search.md)和[源码基准边界](../../references/source-baseline-acceptance.md)。

1. 用根Skill scripts/generate-search-project.mjs生成工程；已有目录非空时换新目录，保留原内容。
2. 安装锁定依赖，类型/应用构建、搜索HTTP测试、Storybook构建必须通过。
3. 启动127.0.0.1:4317，验证查询/筛选分页/空/错误重试/详情/返回与响应式。报告实际执行的交互，勿把stories声明当运行证据。
4. 如接真实服务，替换SearchAdapter并明确内容、鉴权、容量、索引更新和部署边界；无接口时只交付本地验证范围。

输出：独立工程、运行命令、验证日志和剩余边界。不适用：全站爬取、CMS管理、支付、账号系统、控制台或Pixso认证。失败时保留错误和源码，禁止伪造结果；不能通过解除离线编译器限制实现联网。完成标准：本地流程实际运行且测试通过；上线能力另行验收。
