# 公共页尾契约

PortalWebsiteFooter(groups,variant=product)。两场景共用样式与结构，导航组数据区分产品/开发者，禁止把开发者链接混入产品页。联系人、App、社交和法律内容为来源快照的固定字段；当前只有groups/variant可配。法律数字不是自动获取的实时配置，生产发布需业务核对。

背景统一#f0f0f0，内部main/legal透明。桌面左App40px和20px下间距在热线前；右列标题与热线同一水平行，分割线从该行起至底部。在1920px，分割线到第一列84px，五列间30px；较小桌面/平板按现行组件CSS缩小间距并换列，不能将这些实现值声称为新的全站裁定。容器始终服从[全局栅格](website-grid.md)。

product显示五项服务条；developer不显示。<=768px时developer隐藏桌面热线/服务与导航组，展示App、下载、社交和48px售前咨询胶囊；圆框用户图标只用于导航，咨询为20px电话。移动咨询在桌面必须隐藏，基础隐藏规则优先级高于contact>a。分割线在手机隐藏。法律/隐私在手机版权前，较长记录按内容换行。

当前developer组使用官方五类资源，社交图标已接入，二维码显示和hover未实现。product手机组保留details折叠方式；不要从developer整体验收推断产品页当前页尾也已重新验收。最新验收范围见[台账](acceptance-ledger.md)。
