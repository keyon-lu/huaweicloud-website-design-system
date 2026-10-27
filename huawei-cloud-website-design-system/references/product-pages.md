# 云服务产品页

页面类型 website-product-floor；默认模板 src/pages/portal-product/index.tsx 调用 PortalProductPage。默认入口使用结构化产品资料和已校准共享组件，见[默认生成契约](default-product-generation.md)、[共享楼层](shared-product-floors.md)和[折叠图文与方案卡片](waf-special-floors.md)。参考页变体用于对照，不是生成新产品页的必选入口。

根据内容结构选择楼层并指定顺序；没有统一强制楼层顺序。导航、首屏、案例、资源、FAQ、行动区和页尾复用已有共享组件，折叠图文与方案卡片按对应结构选用，不按产品名称切换视觉模板。GaussDB及WAF用户认可的样本只能支持已实现部分；新产品仍须视觉、响应与交互检查。

输入须来自用户资料或可追溯官网材料，不编造价格、指标、客户、FAQ。没有素材时省略可选媒体，必要素材缺失时停止该楼层生成；不借用其他产品图片。未经验证的独特楼层仍是缺口，不能强行套通用卡片。CodeArts、OfficeAce及复杂资产目录也不承诺套用当前组件就能完整复刻。开发者首页与产品页共用公共框架；各自验收范围见[台账](acceptance-ledger.md)。

--content-json 模式调用默认组件组合器，不同时选择 --variant/--tsx-file。人工编写 TSX 是已有高级接口，仍应调用共享组件，不重造同类楼层。完整字段和命令见默认生成契约。图片从本地资产注册表解析；支持SVG、PNG、JPEG、WebP，不添加远程运行依赖。真实按钮只跳转到资料中配置的链接，不执行购买或创建资源。

产品与开发者共用最新[一级导航适配契约](first-level-navigation.md)。搜索优先简化，再按内容宽度换行；不要继续生成旧版导航。

最新全局栅格以[2026-10-14用户裁定](website-grid.md)为准，覆盖此前示例中的容器宽度与页边距。

共享接口与固定内容边界见[组件契约](component-contract.md)，当前规则优先级见[当前规范](current-standards.md)。

2026-10-15楼层扩展：除现有五种floor kind外增加process-steps，按[步骤契约](process-steps.md)复用公共PortalProcessSteps；当前palette停用旧蓝色按钮色。

生成前按[楼层选型规则](floor-selection.md)逐楼层记录内容意图、组件、来源和缺口；步骤组件以合作伙伴页process-v2为参考，不继续使用2.4.0旧六边形编号样式。
