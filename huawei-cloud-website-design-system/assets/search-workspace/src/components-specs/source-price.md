# 价格

来源：[PortalUI3.0.17价格规范](../../../../references/portalui-docs/baseui/price.md)，保留por-price/por-current-price/symbol/unit及small/default/large三种原生样式。该基础价格显示与套餐、折扣、促销及版本比较楼层分别建模，不用一个价格组件冒充完整购买业务。

公开入口`@/components/source-price`，SourcePrice与Props。amount为业务提供的非负十进制字符串，最多4位小数；symbol/unit必填。保留字符串中的小数与前导零，不使用二进制浮点或隐式补位，不自动分组、不换算汇率、不推断计费单位。NaN、无穷、负数、科学计数、空值及带脚本的字符串拒绝；React按文本渲染币种与单位。示例金额仅作验证。

普通文本自然进入阅读顺序，不加可能掩盖币种的aria-hidden，不伪造交互角色。长金额/单位允许换行，必要时应由内容方缩短计费说明，不能省略金额或小数。三个尺寸与零金额/长单位分别使用Sizes/LongUnit样本；仍需源稿视觉与跨视口验证。没有折扣态、购买按钮、生产报价或货币计算能力的声明。
