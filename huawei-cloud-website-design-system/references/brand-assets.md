# 品牌素材资料

用户在2026-10-12提供以下两个来源，作为公开官网设计Skill的品牌资料。

## 顶部导航Logo

- 来源：https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/navi/PClogonew.svg
- 包内文件：[navigation-logo.svg](../src/assets/navigation-logo.svg)
- 原始SVG尺寸111×39，viewBox为0 0 111 39；保持原始文件和比例。该尺寸是素材画布，不是全站导航的强制显示尺寸。
- 用户明确指定为官网顶部导航左上角Logo。组件实际大小、上下留白与移动端适配仍需现场核对。
- 导航Logo已由PortalAsset接入PortalHeader，生成器将登记图片嵌为data URL，可离线使用。字体和主视觉仍保留缺口。

## 产品Logo目录

- 用户提供入口：https://open.huaweicloud.com/openplatform/icons
- 官方页面实际脚本声明的清单：https://open.huaweicloud.com/openplatform/icons/manifest.v1.json
- 本次清单有196条，保留id、产品名、分类、product_url、logo.source_url、logo.local_path、别名和标签。
- CodeArts代码智能体对应codeartsdoer；开发工具CodeArts另有codearts条目，不能根据相同别名任意替换。
- ModelArts、ModelArts Studio、AgentArts、OfficeAce、GaussDB、WAF均有对应条目；OfficeAce清单产品链接与先前提供的页面路径不同，保留差异。
- 架构图标字段可能标为planned，即待提供，不能视为已有素材；也不能将产品Logo改称架构图标。
- 已额外下载并接入GaussDB Logo作为本次精校样本；其他产品只保存清单，尚未批量下载、逐个核验或接入。产品页图标应先匹配产品名和product_url，再核验格式、尺寸和版本。

两项资料的来源登记位于source-registry.json；原始下载与校验记录保存在.skill-creator/material-intake/2026-10-12-brand。字体、主视觉、移动端配图和完整品牌使用规范仍有缺口。
