# Pixso流程楼层 / SourceProcessFlow

来源PIX-00226:11370，逐条依据、断点几何及剩余差异见[流程执行规范](../../../../references/pixso-process-flow.md)。独立公开入口`@/components/process-flow`；离线PortalProcessFlow；JSON kind=process-flow。与合作伙伴process-steps并存，不替换既有样本。

当前实现中文亮色文本流程：3～5步、可选原始编号、可选阶段标题、分段及行内链接、每步最多2动作、必需底部CTA。编号/步骤箭头从Pixso原节点直接导出，浅色轮播按钮源26:12153，向右时镜像同一对称箭头；不复用旧合作伙伴编号。所有action有真实安全href和业务标签，按钮避免用户禁止的蓝色。showNumbers=false移除编号位置，不保留空格。

桌面均分；1024～769五步最多四步同时可见，用原生滚动及前后按钮切换，边界禁用，显示当前范围；区域本身支持左右/Home/End。完全在视口外的步骤inert且aria-hidden，切换范围后重新开放；缩窄视口导致焦点步骤隐藏时，焦点回到有名称的浏览区域。768及以下纵向显示全部步骤，24px编号与正文间20px，步骤间32px，不沿用平板横向轮播。长文案自然增长，行动区与同排最高内容底部对齐，不裁切正文。

源稿CTA默认48px与实际40px冲突尚未裁定，ctaProfile必须显式为rule-48或example-40；不提供隐式默认，也不宣称某种已获用户认可。description、CTA variant和行内段落内容来自业务；flowLabels需业务提供navigation/previous/next/rangeTemplate。范围模板使用{start}/{end}/{total}，禁止固定假范围。

视频入口、上传自定义字母/编号、背景图与深色、桌面其它轮播结构仍是该来源的未实现分支，不能通过此文本原型计为全来源转化完成。完整同节点视觉和人工读屏仍待验收；系统字体回退差异保持公开。FiveSteps在桌面/平板/手机分别验证行为，Three/Four/WithoutNumbers/LongContent/ExplicitRule48用于其它明确边界。

2026-10-17用户针对流程楼层覆盖原型交互：不显示底部滚动条或前后切换按钮。769～1024px仍保留四步可见的横向内容区，通过触摸/触控板横向滚动，或聚焦后使用方向键、Home/End访问全部步骤；范围说明仅供读屏，不增加可见行。此项是用户覆盖，不改写原设计的轮播来源记录。
