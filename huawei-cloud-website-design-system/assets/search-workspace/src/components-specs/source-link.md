# SourceLink / PortalLink

来源：PortalUI3.0.17的link.md及包内原始样式。用途是原生导航链接，href须非空且不能是javascript/data/vbscript或含控制字符；复制源文档的javascript占位链接不在支持范围。换一换图标可以装饰导航，执行刷新动作须使用按钮，不能把无目标a当按钮。

API：href必填；variant=primary(default)/secondary/light/blue；icon=none(default)/more/change；disabled=false；其余原生anchor属性与ref。React19的ref属性传给真实a；禁用时输出role=link、aria-disabled的span，没有href、Tab入口或onClick，不触发调用方处理器。新窗口默认补noopener noreferrer，明确传入rel时尊重调用方。文字和图标由既有por-link类控制；icon为aria-hidden，不能替代可访问名称。

blue是来源类名兼容值，继续消费当前中性文字Token；2026-10-16用户已澄清限制针对按钮，复选框允许#1476FF。此处保留现有链接映射，不因许可变化自动重绘。light是深色楼层上的浅色文字皮肤，不意味着完整暗色模式已覆盖。宿主负责字号/行高上下文；本组件不复制或强制覆盖宿主字体。

default/hover/disabled沿用来源链接CSS；focus-visible使用已登记2px/4px与激活边框Token，属于无障碍修复。无需loading/error/empty/selected内部状态；异步、当前导航或错误由组合组件通过原生aria/业务状态表达。hover从默认链接接收真实指针检查，不能用强制class或模拟hover事件替代。纯触屏可直接访问href，不依赖hover显示关键内容。

Template独立公开入口@/components/source-link；离线HTML公开PortalLink，两条入口使用相同函数逻辑和CSS，经规范化源码对照检查。Matrix覆盖4皮肤×3图标×启用/禁用，Playground/DisabledActivation验证焦点、禁用无回调和跳过Tab。原始来源外观比较与最新中性blue映射、人工读屏、真实触摸分别记录，不把Storybook通过冒充全部认证。

长内容适配：overflow-wrap:anywhere允许不可分词长URL或拉丁串换行；这是窄屏防溢出修复，不改链接的交互及来源皮肤。375px长内容与375/769/1920px面包屑分别检查。
