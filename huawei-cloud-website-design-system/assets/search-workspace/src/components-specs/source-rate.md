# 评分

依据PortalUI3.0.17 [评分文档](../../../../references/portalui-docs/baseui/rate.md)、原始JS模块542及不可变来源CSS。保留por-rate-container、por-rate、por-star-icon、por-active-star和提示气泡结构，使用原始SVG星形，不另画图标。公开入口`@/components/source-rate`。

五个选项：数字固定1～5，或五个不同业务文本；label和每项label必填。value/defaultValue二选一，null代表未评分；受控更新通过onValueChange。readOnly支持0～5的有限小数；小数按分值填充，不四舍五入成整星，不误作可编辑状态。display由业务valueText提供，单位单独传入。text/tips两种展示，提示支持鼠标和键盘焦点。生产提交通过name生成原生隐藏字段，禁用时不提交；原生form reset恢复defaultValue。

交互层对源JQuery作显式语义适配：radiogroup、五个radio按钮、方向键循环、Home/End和原生Space/Enter、单一Tab入口、焦点可见；只读使用整体img语义并提供分值名称，不暴露伪操作。ref.getValue返回实际选中值。保留16px来源星形；只读保留6px间距，交互态将目标扩展为24px正方形并居中原始星形，这是明确的无障碍适配，不称为源稿逐像素还原。触控实机、长提示贴近视口边缘、屏幕阅读器人工测试及源稿视觉仍待验收，不能由故事通过声明完整家族合格。

范围不包含任意数量星级、半星交互、远程评分接口、防重复提交或生产持久化。Keyboard、FractionalReadOnly、Tips、Disabled、FormReset验证上述边界。

## 2026-10-21人工问题
用户指出不应使用红色；在已检查的数据展示规范中未找到评分节点，因此不主观换成另一种颜色冒充设计还原。暂停新页面生成，保留旧调用历史；等待真实来源。
