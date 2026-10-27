# 公共一级导航契约

接口见[组件契约](component-contract.md)。源码PortalHeader(scene,links,variant,actionEntries,searchEnabled,mobileMenu)共用于公开产品和开发者页面。业务菜单数据独立配置，样式不按产品名称分支。

## 桌面与换行

右侧结构为搜索、可配置入口、登录注册；搜索/入口/账号组间及同组入口间24px。1920搜索高40px，左放大镜与文案间4px；较小屏搜索宽/高遵循现行CSS。先依据容器、logo、导航和入口的固有宽度收缩搜索为图标，仍放不下才把导航移至第二行；不是固定1024或1280换行。开发者栏目标题20px粗体，属于导航而非logo，跟随第二行。ResizeObserver与字体/resize更新实际高度，供产品二级导航偏移使用。

## 手机与状态

<=768px：48px头部；左品牌Logo，不显示开发者栏目标题；右搜索、22px圆框用户和三线菜单。三线为18px×2px线条，开菜单时变关闭符号。菜单面板固定在48px以下到屏幕底部，120px左分类栏和独立滚动的右内容区，分类按钮切换内容，同层details互斥展开，链接点击关闭，底部收起及Escape也可关闭。Header负责锁定页面滚动、隔离背景、焦点包含、关闭后回到触发按钮；切换搜索或回到桌面也关闭菜单。

groups={label,items[]}，items递归支持label/href/children。开发者默认菜单取自已保存的官方header内容，属于历史快照；产品默认由其现有links和服务入口构成，未声称取得当前官网完整产品分类。可用mobileMenu显式替换；不要在公共CSS中写业务分类。空入口entries=[]有效；非空菜单分类才有可用选择内容。

搜索默认仅查本页main标题，无后端；外部搜索回调仅PortalHeaderActions.onSearch支持，PortalHeader与PortalProductPage尚未透传。账号只外链，不包含登录状态管理。手机搜索为当前原型面板，不冒充真实全站搜索服务。

## 证据

官方1.0.92移动CSS/JS及保存的developer header提供图标、面板/分类/折叠结构；键盘焦点与inert为本包实现要求。2026-10-14用户接受当前开发者页面；未提交精确视口或键盘测试清单。源码测试与实际浏览器测试分开，产品导航及新配置仍需复核。全局容器按[website-grid.md](website-grid.md)，不沿用源站旧页边距。
