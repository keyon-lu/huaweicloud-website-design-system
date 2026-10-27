# 公共组件契约

入口：[portal-components.tsx](../src/components/portal-components.tsx)。2.1.0新增PortalComposedPage和PortalTextContent；后续发布整改保持公开签名，修订复制防重复/超时与焦点样式，不再声称所有实现字节未变。样式加载顺序为基础PortalUI、适配层、[全局栅格](website-grid.md)；保持场景根类。组件完整签名、分类及源文件校验值见[注册表](component-registry.json)。签名是实际接口，下面的内容约束是调用责任；未声明生成器校验的规则不能说已自动强制。

## 选择与复用

- 公共基础：PortalButton / PortalAsset / PortalSection / PortalFAQ。
- 公共站点框架：PortalHeader / PortalHeaderActions / PortalMobileMenu / PortalProductNavigation / PortalWebsiteFooter。
- 新产品页：PortalProductPage组合器，或PortalProductHero、PortalFoldedMedia、PortalSolutionCards、PortalCustomerCases、PortalProductResources、PortalProductQuestions、PortalProductFinalAction。
- 开发者首页：PortalDeveloperBanner / Announcement / Space / Skills / OpenAbility及PortalPracticeCarousel。其固定文案、链接和资产详见[开发者契约](developer-reference-calibration.md)，不是任意业务门户的通用组件。
- PortalGauss* 是GaussDB参考包装；PortalHero / PortalCards / PortalAnchor / PortalCopyCommand / PortalAbility / PortalFooter为旧兼容入口，不替代已校准同类组件。装饰图标与resolve*是辅助接口。

## 通用内容约束

链接用 `{label,href}`；传真实且有意义的文字与有效目标。锚点必须命中本页唯一id。业务列表的key通常来自标题/标签，调用者保证同级唯一。可选资产省略即无图，必需资产缺失时不能用其它产品图填补。PortalAsset仅使用登记的ID，alt是必填参数；纯装饰可用空字符串，有意义图片应有说明。当前AssetId是string类型，并不等于编译期枚举校验。

空列表可在组合层省略整个楼层；需要状态选择的案例、折叠媒体、菜单不要直接传空列表。文案不设臆造的字符上限：用长中文、无空格英文和长命令检查裁切/换行；保留原文，勿为排版改写产品事实。输入数字/日期属于资料，复制量和查看量允许0、不得伪造实时结果。

| 组件 | 参数与默认值 | 状态、响应及内容边界 |
|---|---|---|
| PortalButton | children；href/onClick可选；variant=primary，primary/secondary/dark/primary-light/light；size=middle，middle/default/small；disabled=false | 有href且未禁用时为a，否则button；禁用按钮无点击。传href时onClick不挂到链接；只导航不办理业务 |
| PortalAsset | assetId、alt、className="" | 本地登记SVG/PNG/JPEG/WebP/GIF；资源解析与嵌入由生成器完成，组件不联网找图 |
| PortalSection | id、title、children；description?；bg=white，可grey/dark/light | 主副标题12px；布局使用统一容器。id不得重复；已有固定标题楼层不要靠重复外层Section改标题 |
| PortalFAQ | items(question,answer)，indicator=native或chevron | 原生details，键盘操作；多个问题可分别展开，非强制互斥 |
| PortalHeader | links；scene=product/developer；variant=compact/site；actionEntries?、searchEnabled?、mobileMenu? | 内容测量→先收缩搜索→再将导航换行；developer栏目标题跟随导航行；<=768px转手机。详见[导航契约](first-level-navigation.md) |
| PortalHeaderActions | full=false、entries?、searchEnabled=false、compactSearch=false、onSearch? | entries=[]可无入口；full决定登录注册及默认入口。无onSearch时查当前main标题；onSearch只在此组件支持，Header未透传该参数 |
| PortalMobileMenu | id、非空groups、onNavigate、onClose | groups={label,items}；item={label,href?,children?}递归。分类切换、同层互斥details、链接回调、底部收起；Header负责滚动锁定/焦点/关闭。不要脱离Header声称具备这些外层行为 |
| PortalProductNavigation | title、links | 产品二级导航与局部横滚；首项固定is-current，不是滚动自动追踪；偏移读取实际一级导航高度；id目标须存在 |
| PortalWebsiteFooter | groups(title,links)，variant=product/developer | 分场景服务条和手机行为；联系人、法律行、App/social内容当前固定，groups不配置这些字段。详见[页尾契约](website-footer.md) |
| PortalProductHero | title、description、actions、breadcrumb，iconAsset? | breadcrumb代码默认[]，但TS签名仍为必填：手写TSX传[]。actions第一项primary，余项secondary；图标可省略 |
| PortalFoldedMedia | id、title、非空items(title,paragraphs,asset,mobileAsset?,tag?)；backgroundAsset?；defaultIndex=0 | 索引初始夹紧；点击可全部收起；ArrowUp/Down/Home/End移动焦点，不自动选择；桌面旁图/小屏内联图。mobileAsset缺省用asset；变更items时不保证重置active |
| PortalSolutionCards | id、title、items(title,description,href?,asset?,theme?) | theme仅dark触发深色，其它为浅色；局部横滚，前后按钮按边界禁用；减少动效时箭头滚动auto。无href只展示，不能作为有效业务跳转 |
| PortalCustomerCases | id、title、非空items(title,description,asset?等)、logos、names | 三数组按索引对齐，logos允许null，names提供文本回退；桌面按钮选择，<840px局部横滚上图下文；无自动播放 |
| PortalProductResources | items(title,description,href等)，id=resources | 标题固定“相关资源”；title在通用GaussItem类型中必需，href类型可选但资源导航需给有效链接 |
| PortalProductQuestions | items(question,answer)，id=faq | 标题固定“常见问题”，复用chevron FAQ；不会加入GaussDB专属咨询文案 |
| PortalProductFinalAction | asset、title、href、label；id? | asset必需；共享CTA皮肤和容器，只导航，不创建或购买资源 |
| PortalProductPage | data.hero、data.floors；navigation?、footer?、finalAction? | floor五种kind按输入排序；FAQ与资源标题仍固定。页头站点links固定；当前data无header/search配置入口，需手写共享组件组合。详见[资料接口](default-product-generation.md) |

## 开发者首页组件

| 组件 | 可配置参数 | 当前固定内容与响应行为 |
|---|---|---|
| PortalDeveloperBanner | assets:string[] | 两种固定文案布局；已验收模板传两张source海报，不能传任意多张并声称任意轮播。按钮手动切换，无自动播放/视频 |
| PortalDeveloperAnnouncement | 无 | 固定公告和图标；关闭仅当前挂载生效，无跨会话保存 |
| PortalPracticeCarousel | items(title,description,asset,href) | 背景与文字可配置；桌面4张、600–839px三张计算宽度、<=599px固定228px卡片局部滚动；不是Swiper自动轮播 |
| PortalDeveloperSpace | title、description、asset | title参数目前未渲染；楼层标题由页面负责。AI Shell/Agents/环境管理文案、侧图和链接固定；description与主界面可配置 |
| PortalDeveloperSkills | items(title,description,href,copies?,views?,updatedAt?)、command | 标签huawei-cloud、介绍、查看全部和复制标签固定；标题单行裁切、描述两行；>1024px三列，601–1024px两列，<=600px一列，<=1280自然高度；标签30px，日期跟查看量；成功勾号、失败选择输入供手动复制。input id固定，一页只能放一个实例 |
| PortalDeveloperOpenAbility | backgroundAsset?、asset?旧别名、mobileAsset=developer-ability-mobile | backgroundAsset优先asset；标题、描述、按钮链接固定。<=600居中上文下图；不追加四个自制工具悬浮入口 |

开发者标题通常由页面容器提供；不要为每个组件重复加h2。其固定内容是已验收样本实现边界，新业务需要新的受控参数设计和验证，不能把这批组件列为全量任意配置库。

## 变更与检查

规则、状态或响应变化修改公共组件与契约，不在页面尾部不断追加覆盖样式。仅内容变化使用props/结构化数据；静态文案和资产不硬编码到新共享样式。调用约束违反时优先在组合层校验/省略；当前缺少统一运行时props校验，不宣称注册表自动执法。更改源码后校验注册表签名、包哈希、生成/编译并检查受影响样本；验收记录绑定产物而不是组件名称。


## 官网组合扩展

PortalComposedPage(data:PortalComposedPageData)以纯配置复用现有组件；字段、可渲染范围和候选布局见[组合页契约](composed-pages.md)。PortalTextContent(paragraphs,asset?,alt="",links=[])渲染纯文本段落、可选登记图片和链接；空alt仅用于装饰图，调用者给有意义配图说明。新版注册表包含48个导出函数。

PortalHero/PortalCards/PortalAnchor仍不能替代已校准产品同类楼层；新组合场景可复用这些基础结构，不声称它们已取得新场景的官方视觉验收。

发布整改：复制请求有同步防重复保护、busy禁用及10秒超时回退；不自动重试、不执行命令。剪贴板平台操作本身不能取消；晚到结果不重设UI，失败提供手动复制。搜索输入焦点环在父容器focus-within显示，复制输入有focus-visible。新检索业务的请求/状态规则见[发布整改契约](release-hardening.md)。

界面固定文案已移入portalCopy键值资源，函数通过portalText引用；来源文案保持原值，不是翻译支持。检索UI使用单独messages.ts。业务输入仍由JSON/props提供，不把数据内容改成固定界面Key。

PortalProcessSteps(items,label?)：合作伙伴页process-v2样式与3–4步顺序说明，独立契约见[process-steps.md](process-steps.md)。这是楼层扩展，不把基础24家族数改为25。当前界面色遵循[website-palette.md](website-palette.md)，停用旧蓝色文字按钮许可。

PortalLink与PortalBreadcrumb为3.0.17来源的公开基础组件，可在自定义TSX中导入；不会自动替换历史页面。新实现与React模板SourceLink/SourceBreadcrumb的逻辑及皮肤对照，详见[家族实现注册表](source-family-registry.json)。

新增公共组件：PortalLabel、PortalChoice/PortalChoiceGroup、PortalCollapse/PortalCollapseGroup、PortalLearningLinks，分别对应React模板Source入口。公共签名以component-registry.json为准，细节读[Pixso生成规范](pixso-generation.md)中各组件契约。基础样式新值仅组件作用域生效；learning-links是新的楼层，不改变基础24家族分母。
