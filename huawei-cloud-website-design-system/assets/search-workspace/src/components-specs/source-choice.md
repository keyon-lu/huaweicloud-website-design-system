# SourceChoice / PortalChoice；SourceChoiceGroup / PortalChoiceGroup

## 2026-10-24当前执行口径

本版以2026-10-21已复验的PIX-0151056:13982/13998为准：选中黑色#191919、hover#595959、禁用#DBDBDB。早期PIX-011蓝色资料保留为来源历史，不作为新生成复选框皮肤；用户并未全局禁止蓝色。 下方保留早期来源与迁移说明；涉及样式的旧描述不覆盖本段及2026-10-21复验结论。

## 来源与兼容记录

来源：PortalUI3.0.17 checkbox.md与checkbox/radio/card-group CSS；PIX-011 60:2919原子组件/复选框的九种选中×状态，配合用户明确许可的复选框#1476FF。16×16、radius4与3.0.17一致；蓝色只覆盖本组件enabled checkbox选中/半选，默认/hover均取60:2923/2925/2929/2927。禁用保持来源灰色；未选默认c2c2c2、hover191919，禁用填充f0f0f0/边dbdbdb来自相应节点。原子库节点是具体来源，不自动成为所有其它组件的全局颜色。

Choice：kind=checkbox/radio；appearance=basic/card；label可见且必需；mixed仅basic checkbox，设置原生indeterminate及aria-checked=mixed；其余原生input属性与ref直达input。选中/禁用、表单name/value、键盘Space及单选方向键保留原生行为。只增加focus-visible与error边框，不写平行点击模拟。错误说明由宿主aria-describedby关联；loading/empty不是单项内部状态。label长文本允许换行，卡片高度自然增高。

Group：必需label、options(value,label,disabled?)，value/defaultValue是值数组；radio最多一个；重复/空值及非法受控选中拒绝。受控由onValueChange提交数组，非受控保留本地状态并在表单reset恢复默认；动态删除选项时裁掉已不存在的非受控值，受控无效值报错。空options允许，保留命名fieldset/legend，不伪造业务空状态。disabled使用原生fieldset。name缺省用useId隔离；getVal/getText/updateCollapse通过ref提供。

basic组间距20px沿用来源。card组仅实际超过4行显示更多，默认折至第一行，展开最大7行局部滚动；这两个数字来自来源，不是“超过4个选项”。first-row高度按真实DOM测量，长文本/文字放大不被固定32px截断。折叠不可见项inert，不进入Tab；选中项初次处在隐藏行时自动展开。resize、字体加载、options变化与updateCollapse重算。expandLabel/collapseLabel必需且由调用方提供，按钮aria-expanded/controls关联内容。

模板公开@/components/source-choice；离线公开PortalChoice/PortalChoiceGroup。验证mixed/checked/disabled、checkbox多选、radio互斥/方向键、表单reset、动态选项、更多开合与隐藏焦点、缩放/长文本和外观。原生触摸/人工读屏与Pixso逐像素对照未执行时保留待验；不用Storybook构建替代它们。

## 人工纠正2026-10-21
PIX-0151056:13982选中默认#191919，1056:13998悬停#595959，禁用#DBDBDB，16px/4px圆角。替换此前误用的蓝色选中token；不是全局禁蓝。
