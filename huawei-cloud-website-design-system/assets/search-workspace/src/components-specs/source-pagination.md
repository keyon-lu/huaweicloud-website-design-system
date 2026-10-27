# 分页

来源：[PortalUI3.0.17](../../../../references/portalui-docs/baseui/pagination.md)，并核对[原始脚本来源](../../../../references/portalui-source/provenance.json)中porPagination的实际模板与省略算法。保留por-pagination、total、page-list/item/link、桌面跳转、手机first/prev/页码输入/next/last及select模式结构，继续使用原CSS阶梯；中文亮色实现不扩展其它语言或主题。

公开入口`@/components/source-pagination`。dynamic=true需要pagesNumber，以current/onPageChange或defaultCurrent管理页码；静态模式通过`dynamic=false`表达，hrefs为安全导航目标，渲染真实SourceLink。total只作显式资料显示，不从总页数猜总条数。labels全部由业务提供。0页不渲染；页数变化将当前显示页限制在有效范围，非法输入不跳转；拒绝科学计数、小数、负数、超界和危险协议。数字模式只渲染来源窗口，不为超大页数创建巨型列表；select模式上限1000项为实现性能边界，超出应选数字模式。

ref支持goto/prev/next/first/last/getCurrentPage。动态模式触发请求，受控值以父级提交为准；静态模式执行配置的页面导航，不假装已获取生产数据。当前页aria-current=page，原生button禁用边界，静态链接使用公共SourceLink的禁用语义。桌面输入可Enter或跳转按钮提交，手机输入可Enter；invalid提供aria-invalid。select模式为原生select，不声称复刻旧自绘弹层。

小屏保留源CSS的紧凑控件，长总条数允许整组换行，行间8px为基于来源8px移动端项目间距的适配，不改变按钮/数字皮肤。当前仅测试动态、静态链接与select样本；仍须跨视口长数值、回调/ref/受控及完整无障碍/来源视觉验收。不要把本地分页当生产检索接口接入。

无效输入由业务labels.invalidPage(max)提供明确范围说明，使用来源por-help-block错误文本样式；输入aria-describedby关联当前错误，清空或修正后移除，跳转不执行。桌面/手机错误分别随各自原生输入在767px来源断点切换，不展示隐藏表单的残留错误。
