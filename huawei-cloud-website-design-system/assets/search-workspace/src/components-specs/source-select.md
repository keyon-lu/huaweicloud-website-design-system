# 下拉选择框

来源：[PortalUI3.0.17](../../../../references/portalui-docs/baseui/select.md)，用户批准的源码验收基准。保留por-select包裹原生select、inline/text皮肤和来源尺寸Token；不使用新造浮层皮肤。Pixso优先来源可以检索下拉规范，尚未完成逐变体视觉对照。

公开入口`@/components/source-select`，导出SourceSelect与Props/Option类型。label必填，option.value唯一；允许空字符串作占位项；disabled项保留原生语义。支持受控value/onChange与defaultValue、name/required/form、错误aria-describedby及原生表单重置。重复值、无匹配选择、混用受控/默认值拒绝。ref暴露原生select，getVal/getText对应value/selectedOptions；options/disabled更新通过React属性，不伪装支持旧jQuery实例方法。

键盘、弹出列表、选中项和触摸交互由操作系统原生选择器处理。外框使用来源样式；浮层外观取决于平台，不能称为原jQuery自绘浮层的逐像素复刻。长label自然换行，控件容器不超过可用宽度。皮肤及禁用/错误用Variants，表单重置用Native，受控同步用ControlledState；浏览器结果与工程编译分别登记。原生弹层在不同设备的视觉验收尚待补齐。

## 2026-10-21来源纠正
先前47:210是导航下拉面板，与此原生选择控件不同。撤销对应关系；无正确设计节点前不得用于声称遵循Pixso规范的新页面生成。旧代码仅留作历史兼容，不纳入本轮设计验收。
