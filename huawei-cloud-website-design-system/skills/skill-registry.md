# 内部工作流注册表

根入口→[路由导航](SKILL.md)→[产品工作流](product/SKILL.md)/[开发者工作流](developer/SKILL.md)/[组合工作流](composed/SKILL.md)→场景references与公共component registry→生成/验证脚本→验收台账。

各内部入口只有选择根Skill后的工作流用途，不另行安装为互相竞争的全局Skill。入口描述、能力映射与page-resource-manifest中的route必须一致。组合入口支持四种原型意图，不代表所有官网类型或生产功能。新增场景要补真值契约、组件/模板、路由和验证，保持同一基础规范。

新增[本地检索工作流](search/SKILL.md)：workflow_id=local-search-validation，由独立项目生成器提供；不增加离线page_type，不通过HTML原型编译器发起网络请求。
