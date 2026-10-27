# 使用与复核

2.0.25-draft可生成公开产品页和开发者首页原型；开发者2.0.24样本已人工验收。输出到Skill包之外，保留可编辑TSX并报告实际检查。运行命令见[入口](../SKILL.md)。

新产品使用真实资料JSON与PortalProductPage；开发者修改默认模板的公开props。高级组合直接导入共享组件，避免用旧PortalHero/PortalCards/PortalFooter替代已校准组件。既有验收不自动覆盖新页面或新数据形状。

反馈应注明页面、视口与组件。先检查内容结构、断行/裁切、局部滚动、菜单关闭/恢复、复制及FAQ。缺图、长文案、空列表、价格来源需按[组件契约](component-contract.md)处理。当前功能和未完成项见[验证报告](validation-report.md)。
