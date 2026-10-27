# 倒计时

来源：[PortalUI3.0.17](../../../../references/portalui-docs/baseui/countdown.md)和[原始脚本](../../../../references/portalui-source/provenance.json)countDown实际DOM。保留count-down/holder/pre-content/time-elements/time-element/number-class/date-element、红/黑数字、上下及居左布局；数字底纹、边框、阴影和字号来自原CSS，不能自造另一套计时卡片。

公开SourceCountdown要求label、endTime和单位labels；结束/开始时间是明确的epoch毫秒，不在不同浏览器中猜本地日期字符串。调用方从带时区的ISO或确定的业务时间转换；不提供2099年伪默认结束时间。now可控制验证时钟；未提供时按真实Date.now重新计算，页面隐藏时暂停计时调度，恢复后立即更新，卸载清理监听与计时器，不靠逐秒减一累积漂移。

支持D/H/M、D/H/M/S、H/M/S。按原脚本，D/H/M剩余时间不超过24小时自动改H/M/S；H/M/S显示总小时数。数字补至少两位，不截掉高位。autoShow在开始前/截止后隐藏，可关闭以保留零值显示；onComplete每个配置截止时间只通知一次。aria-live=off避免每秒打断读屏，内容仍可正常浏览。backgroundOpacity只影响背景，按原脚本的rgba背景语义处理，不把整个文字一起变淡。

长前缀和时间组允许换行，原48px高度改为相同最小高度以容纳文本；其它原始字号/间距不变。Fixed/DayToHours/CompletionOnce/VerticalBlack分别验证数值、格式切换、截止通知和皮肤；实际浏览器计时恢复、跨视口、来源视觉及完整人工无障碍还需验证。倒计时只是客户端展示，不作为服务端活动有效性或交易截止判定。
