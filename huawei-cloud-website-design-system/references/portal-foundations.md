# 华为云门户基础规则

基础来源为用户提供的 Tiny PortalUI 文档和 3.0.17 CSS。2026-10-15用户已明确停用旧蓝色文字按钮裁定；负责人陆正阳已确认sm 栅格 `max-width:1024px`；3.0.17 先作为基础资料，再对照官网实例记录差异。来源与稳定编号见 [source-registry.json](source-registry.json)，裁定见 [owner-decisions.md](owner-decisions.md)。

## 色彩、字体与层级

- 消费 `--por-*` 语义变量；基础 `--por-base-*` 用于构建语义映射，不在页面中任意改造色板。文本重要色 `#191919`、次要色 `#595959`、弱化色 `#808080`、禁用色 `#c2c2c2`。见 [颜色](portalui-docs/baseui/color.md) 与 [Token](portalui-docs/baseui/design-tokens.md)。按钮场景避免使用#1476FF；复选框允许使用该颜色，其他提示/激活色按对应来源规范处理。现有中性映射继续保留兼容，不表示全局禁蓝；历史文字按钮许可不恢复。
- `.por-btn-primary` 的背景通过语义映射使用深色，不能仅因品牌色为红色而把所有主按钮改红。按钮类型、尺寸、禁用和状态以 [按钮文档](portalui-docs/baseui/button.md) 和包内样式为准。
- 字体栈使用 PortalUI 的 HuaweiSans、PingFang SC 等栈。字体家族和资源就绪分别报告；本包没有单独打包华为字体，离线会回退到系统字体，不能宣称完全一致。字体尺寸和行高见 [文字](portalui-docs/baseui/text.md)。标题按具体页面/组件映射，不固定以同一字号覆盖全站。
- 圆角、阴影与层级保持原始语义别名；不把 H Design 的半径/阴影表映射成官方规则。见 [变量](portalui-docs/baseui/variable.md) 与 [层级](portalui-docs/baseui/level.md)。

## 容器、栅格与楼层

- 全局列数、槽宽、内容宽度和页边距统一以[当前栅格](website-grid.md)为准。24/8/4列按视口切换，最小屏边距14px；旧PortalUI容器值仅作历史资料。组件断点独立，不全局替换媒体查询。
- 楼层复用 `.por-section/.por-container/.por-section-head/.por-section-body`，背景通过 `data-bg` 选择 white、grey、dark、light 等支持皮肤。取消“全部白底”的旧规则。标题可居中或按模块居左。见 [楼层](portalui-docs/baseui/floor.md)。
- 楼层上下间距与头部间距来自 3.0.17 Token。3.0.18 调整了部分标题间距；本包没有静默升级，记录在 [场景与版本差异](scene-differences.md)。

## 实现契约与未确认维度

本包实现键盘焦点、跳过导航、原生禁用按钮、菜单 Escape 关闭、原生 details/summary 和复制失败回退。这些是原型实现要求，不宣称为华为云内部无障碍规范。自动检查、实际键盘检查与正式无障碍审计必须分别报告。

文案不能编造价格、SLA、性能数值、客户背书或产品能力。英文、国际化、RTL与完整品牌资产覆盖尚未全面确认；未知内容保持缺口，不用参考包中的账号、设备或营销图片填充。见 [内容与交互](content-interaction-contract.md)。

技术边界：本包使用 React 包装 PortalUI CSS 类；不是执行 PortalUI jQuery 插件，也不是其完整官方 React 组件库。单文件运行所需 React/Babel 随包提供。官网轮播、视频、动效与菜单的逐像素复现不在当前已验证能力内。

最新全局栅格以[2026-10-14用户裁定](website-grid.md)为准，覆盖此前示例中的容器宽度与页边距。
