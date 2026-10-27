# 提示家族：内联告知

## 2026-10-24当前执行口径

本版新页面只生成已复验的gray/blue全局提示条，role=status；不是四种业务语义色，也不是tooltip。gray可选不再提示，blue不显示该项。tone参数仅兼容，不生成成功/警告/失败配色；duration计时行为仍在兼容API中，默认0，本版规范场景不自动消失。 下方保留早期来源与迁移说明；涉及样式的旧描述不覆盖本段及2026-10-21复验结论。

## 来源与兼容记录

来源[PortalUI3.0.17 Tips](../../../../references/portalui-docs/baseui/tips.md)、原始JS模块31 Info及来源CSS。公开`@/components/source-tips`的SourceNotice，对应Info内联告知，保留por-tip/content/wenzi/remove与四种tone和原始字体图标，不执行源脚本的字符串HTML拼装。

message、closeLabel必填纯文本。info/success/warning使用status，error使用alert；不会以颜色作为唯一含义。close为原生24px按钮，图标仍采用来源尺寸并居中，扩展点击区域为明确的无障碍适配。默认持续显示，duration=0；只有业务显式给出有效毫秒数才自动关闭，鼠标悬停或键盘焦点进入暂停，全部离开后重新计时。关键错误、需要阅读/操作的内容不得自动消失，应保持duration=0。受控open由父级更新，非受控关闭后如需重新展示应重新挂载或改用受控方式。

Tones、CloseKeyboard、AutoHide、ControlledState、LongText覆盖基础行为。没有借此声称完成带箭头tooltip、跟随鼠标矩形tips或InfoNotice动画；这三种仍需独立状态与定位实现。暗色和多语言暂缓，人工读屏、缩放、源稿视觉及完整家族验收仍待补齐。

## 灰底、蓝底2026-10-21
SourceNotice改为原设计的全局提示条：appearance gray/blue，依据268:10358/268:10359；背景#F5F5F5或#1476FF的0.1透明度，12/18px文字，原始16px信息及关闭SVG。灰底可传suppressLabel显示不再提示复选项，蓝底不显示。旧tone参数只兼容，不生成success/warning/error额外配色。duration只为旧API兼容，本轮规范用例不采用自动消失。窄屏须继续对照对应设计节点，未验证的断点不宣称通过。
