# SourceCollapse / PortalCollapse；SourceCollapseGroup / PortalCollapseGroup

来源：PortalUI3.0.17 collapse.md、por-collapse容器/触发器/皮肤CSS。用途是展开已有内容，不是FAQ整个楼层、步骤导航或楼层Tab的替代。默认dark-light；另支持dark-transparent/light-transparent，后者仅深色楼层上的来源皮肤，不声称暗色主题完成。

API：summary/children，open/defaultOpen，onOpenChange，onBeforeOpenChange可返回false取消，onAfterOpenChange在实际提交变化后调用；disabled；triggerPosition=head/footer；openSummary可选；persistentContent位于折叠区外始终可见；ref提供show/hide/toggle。同值幂等，不触发重复变化。受控必须由宿主更新open；回调发出请求不等于已经改变。React模式不用jQuery或data-toggle插件，保留其语义及皮肤。当前无高度过渡；不冒充beginShow/shown等六个动画阶段均已实现。

原生button支持Enter/Space、disabled，aria-expanded与controls关联命名region；hidden关闭内容，保留子树状态但不进入阅读/Tab。内容内焦点在收起时回到触发器；禁用触发器或复杂外部导航的焦点策略由宿主处理。Group用唯一id和value/defaultValue数组，默认互斥，可multiple；组有可访问label。空items允许；无异步，因此loading/error并非内部状态，宿主内容可表达业务状态。

原样沿用header14px内距、右箭头与边框；按钮reset不重设子文本来源排版，长文本换行。新增2px/4px焦点是已登记无障碍修复；减少动效时关闭装饰箭头过渡。验证三个皮肤、head/footer、受控/非受控、取消/幂等、互斥/多开、键盘、内容焦点回退、关闭不丢表单内容、长文案与实际hover。模板@/components/source-collapse，离线PortalCollapse/PortalCollapseGroup；视觉与人工读屏单独验收。
