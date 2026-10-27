# 首版66来源状态与媒体执行映射

这是代码与测试引用清单，不是验收通过记录。每条来源可按JSON中的入口、依赖、事件和ARIA状态定位执行路径。未出现事件不自动判为纯展示，配置型数据仍需检查。

| 来源 | 组件 | 事件处理器 | 状态语义 | 测试引用 |
| --- | --- | --- | --- | --- |
| pix-001-2-206776 套餐组件 | PortalProduct2026Packages | onChange, onClick | aria-describedby, aria-disabled, aria-hidden, aria-label | 0 |
| pix-001-2-201532 大模型聚合卡片 | PortalProduct2026Models | onClick, onKeyDown, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-001-2-200413 横向卡片组轮播组件（第一批） | PortalProduct2026Wide | onBlurCapture, onCancel, onClick, onClose, onError, onFocusCapture, onKeyDown, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-pressed | 0 |
| pix-001-2-200178 楼层底部按钮和链接 | PortalProduct2026Actions |  | aria-describedby, aria-disabled, aria-hidden, aria-label | 1 |
| pix-001-2-199574 Tab容器 | PortalProduct2026TabContainer | onClick, onKeyDown, onValueChange | aria-controls, aria-disabled, aria-label, aria-labelledby, aria-selected | 0 |
| pix-001-2-197076 多种场景轮播组件 | PortalProduct2026SceneCarousel | onBlurCapture, onClick, onError, onFocusCapture, onKeyDown, onMouseEnter, onMouseLeave, onPause, onPlaying, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-labelledby, aria-pressed, aria-selected | 0 |
| pix-001-2-195803 复制命令行组件 | PortalProduct2026Commands | onClick, onKeyDown, onValueChange | aria-busy, aria-controls, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-selected | 1 |
| pix-001-2-193367 视频卡片组件（第二批） | PortalProduct2026Videos | onCancel, onClick, onClose, onError, onPlaying | aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby | 0 |
| pix-001-2-160593 最新资讯（第一批） | PortalProduct2026News | onBlurCapture, onClick, onError, onFocusCapture, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-pressed | 0 |
| pix-001-2-161950 智能体卡片 | PortalProduct2026Agents | onBlurCapture, onClick, onError, onFocusCapture, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-pressed | 0 |
| pix-001-2-156437 云宝助手组件（第一批） | PortalProduct2026Assistant | onBlur, onChange, onClick, onFocus, onKeyDown, onSubmit | aria-label, aria-live | 0 |
| pix-001-2-155205 折叠左右图文 | PortalProduct2026Folded | onBlurCapture, onCancel, onClick, onClose, onError, onFocusCapture, onKeyDown, onMouseEnter, onMouseLeave, onPlaying | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-pressed | 0 |
| pix-001-2-157839 定价表格组件（第二批） | PortalProduct2026Pricing | onClick, onKeyDown, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-001-2-65031 下一步 | PortalProduct2026Next |  | aria-hidden | 0 |
| pix-001-2-59964 场景与解决方案 | PortalProduct2026Scenarios | onCancel, onClick, onClose | aria-haspopup, aria-hidden, aria-label, aria-labelledby | 0 |
| pix-001-2-62685 常见问题 | PortalProduct2026Faq | onClick, onKeyDown, onOpenChange | aria-controls, aria-expanded, aria-hidden, aria-label, aria-labelledby, aria-orientation, aria-selected | 0 |
| pix-001-2-54672 左右图文-应用场景架构图 | PortalProduct2026Split | onCanPlay, onCancel, onClick, onClose, onError, onKeyDown, onPlaying, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-001-2-52886 页内导航 | PortalProduct2026InPageNavigation | onBlur, onClick, onKeyDown, onMouseEnter, onMouseLeave | aria-controls, aria-current, aria-expanded, aria-hidden, aria-label | 0 |
| pix-001-2-73017 hover展开卡片（第二批） | PortalProduct2026Hover | onBlurCapture, onClick, onError, onFocusCapture, onKeyDown, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-pressed | 0 |
| pix-001-2-70228 新版产品页Banner-下 | PortalProduct2026Banner | onBlurCapture, onClick, onError, onFocusCapture, onKeyDown, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-controls, aria-current, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-pressed, aria-selected | 0 |
| pix-001-2-68093 新版产品页Banner-上 | PortalProduct2026BannerSlide | onBlurCapture, onClick, onError, onFocusCapture, onMouseEnter, onMouseLeave, onPause, onPlaying | aria-current, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-pressed | 0 |
| pix-001-0-1 基础样式-楼层间距适配 | PortalProduct2026FloorFrame |  | aria-labelledby | 0 |
| pix-001-2-75962 demo架构组件 | PortalProduct2026Demo | onCanPlay, onClick, onError, onKeyDown, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-pressed, aria-selected | 0 |
| pix-001-2-1131 优势图文结合 | PortalProduct2026Advantages | onClick | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label | 0 |
| pix-001-2-61303 客户案例 | PortalProduct2026Cases | onCanPlay, onCancel, onClick, onClose, onError, onKeyDown, onPlaying | aria-controls, aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-pressed, aria-selected | 0 |
| pix-002-1279-40555 AI梦工厂--架构图组件2 | PortalProductV1AIArchitecture |  | aria-label | 0 |
| pix-002-26-11370 流程组件 | PortalProcessFlow | onKeyDown | aria-describedby, aria-disabled, aria-hidden, aria-keyshortcuts, aria-label, aria-labelledby, aria-live | 2 |
| pix-002-26-11030 学习与使用 | PortalLearningLinks |  | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby | 1 |
| pix-002-26-10298 常见问题 | PortalFaqList | onClick | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-labelledby | 1 |
| pix-002-26-1 应用场景架构图 | PortalProductV1Architecture | onCanPlay, onCancel, onClick, onClose, onError, onKeyDown, onPlaying, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-3-1414 通用banner | PortalGeneralBanner |  | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby | 1 |
| pix-002-16-36851 图标文本卡片 | PortalIconTextCards | onClick | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby | 1 |
| pix-002-16-35646 嘉宾介绍 | PortalProductV1Speakers | onBlur, onClick, onFocus, onKeyDown, onMouseEnter, onMouseLeave | aria-expanded, aria-label | 0 |
| pix-002-16-35427 照片墙 | PortalProductV1PhotoWall | onBlurCapture, onClick, onFocusCapture, onMouseEnter, onMouseLeave | aria-hidden, aria-label, aria-pressed | 0 |
| pix-002-30-33254 左文右图卡片筛选 | PortalProductV1ReportFilter | onCancel, onChange, onClick, onClose, onPageChange, onSubmit | aria-checked, aria-controls, aria-current, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-invalid, aria-label, aria-labelledby, aria-live | 1 |
| pix-002-16-33610 产品活动卡片 | PortalProductV1Activities | onClick | aria-controls, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-live | 1 |
| pix-002-16-27983 解决方案推荐 | PortalProductV1Solutions | onClick, onKeyDown, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-16-27208 客户案例logo卡片 | PortalProductV1LogoCards |  |  | 0 |
| pix-002-30-25360 图文卡片筛选 | PortalProductV1ImageFilter | onCancel, onChange, onClick, onClose, onPageChange, onSubmit | aria-checked, aria-controls, aria-current, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-invalid, aria-label, aria-labelledby, aria-live | 0 |
| pix-002-16-23970 场景直播卡片 | PortalProductV1Information | onCancel, onClick, onClose, onError, onPlaying | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-pressed | 1 |
| pix-002-16-22704 优势特性卡片 | PortalProductV1Advantages | onClick | aria-describedby, aria-disabled, aria-hidden, aria-label | 0 |
| pix-002-16-20251 通用卡片 | PortalProductV1GenericCards | onClick, onKeyDown, onValueChange | aria-controls, aria-disabled, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-16-20250 产品推荐卡片 | PortalProductV1Recommendations | onClick, onKeyDown, onValueChange | aria-controls, aria-disabled, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-16-30923 新闻列表 | PortalProductV1NewsList | onChange, onClick, onPageChange, onSubmit | aria-checked, aria-current, aria-describedby, aria-disabled, aria-hidden, aria-invalid, aria-label, aria-labelledby | 0 |
| pix-002-16-30114 新闻&博客推荐 | PortalProductV1Editorial | onClick | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-pressed | 0 |
| pix-002-30-28565 图标卡片筛选 | PortalProductV1LogoFilter | onCancel, onChange, onClick, onClose, onPageChange, onSubmit | aria-checked, aria-controls, aria-current, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-invalid, aria-label, aria-labelledby, aria-live | 0 |
| pix-002-26-5684 新闻，奖项，图书展示 | PortalProductV1Publications | onClick | aria-describedby, aria-disabled, aria-hidden, aria-label, aria-pressed | 0 |
| pix-002-16-37699 分会场卡片 | PortalProductV1Sessions |  |  | 0 |
| pix-002-26-8109 最新动态 | PortalLatestUpdates |  | aria-describedby, aria-disabled, aria-hidden, aria-label | 1 |
| pix-002-26-8108 推荐文档 | PortalRecommendedDocs | onClick, onOpenChange | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-labelledby | 1 |
| pix-002-26-7351 直播预告 | PortalProductV1LivePreview | onClick, onKeyDown, onValueChange | aria-controls, aria-disabled, aria-label, aria-labelledby, aria-live, aria-pressed, aria-selected | 1 |
| pix-002-26-6925 折叠左文右图 | PortalProductV1Folded | onCancel, onClick, onClose, onError, onKeyDown, onPlaying | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-haspopup, aria-hidden, aria-label, aria-labelledby | 0 |
| pix-002-26-6499 大咖金句 | PortalProductV1Quote |  |  | 0 |
| pix-002-26-5013 客户案例 | PortalProductV1Cases | onCancel, onClick, onClose, onError, onKeyDown, onPlaying, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-haspopup, aria-hidden, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-26-3807 视频&直播 | PortalProductV1Live | onClick, onDoubleClick, onError, onKeyDown, onLoadedData | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label | 1 |
| pix-002-26-3228 场景&案例展示 | PortalSceneMedia | onClick, onKeyDown, onOpenChange, onValueChange | aria-controls, aria-describedby, aria-disabled, aria-expanded, aria-hidden, aria-label, aria-labelledby, aria-selected | 1 |
| pix-002-12-53999 Tab容器 | PortalProductV1TabContainer | onClick, onKeyDown, onValueChange | aria-controls, aria-disabled, aria-label, aria-labelledby, aria-selected | 0 |
| pix-002-16-38905 产品&解决方案优势 | PortalProductV1Benefits | onToggle | aria-describedby, aria-disabled, aria-hidden, aria-label | 1 |
| pix-002-12-53827 电梯导航 | PortalProductV1Elevator | onBlur, onClick, onFocus, onKeyDown, onMouseEnter, onMouseLeave | aria-controls, aria-current, aria-expanded, aria-label | 0 |
| pix-002-12-1135 产品页内导航 | PortalProductV1InPageNavigation | onBlur, onClick, onKeyDown, onMouseEnter, onMouseLeave | aria-controls, aria-current, aria-expanded, aria-hidden, aria-label | 0 |
| pix-002-12-2246 左侧锚点卡片导航 | PortalProductV1AnchoredCatalog | onBlur, onClick, onKeyDown | aria-controls, aria-current, aria-disabled, aria-expanded, aria-hidden, aria-label | 0 |
| pix-002-12-2245 楼层锚点导航 | PortalProductV1AnchorNavigation | onClick | aria-current, aria-label | 0 |
| pix-002-16-38437 解决方案卡片 | PortalProductV1Mosaic | onClick | aria-label, aria-pressed | 0 |
| pix-002-12-54491 联系我们 | PortalProductV1ContactDropdown | onBlur, onClick, onKeyDown, onMouseEnter, onMouseLeave | aria-controls, aria-expanded | 0 |
| pix-004-7-45657 文档-页面切换 | PortalDocumentPager |  | aria-describedby, aria-disabled, aria-hidden, aria-label | 1 |
| pix-004-7-41717 文档-图片 | PortalImageViewer | onCancel, onClick, onClose, onKeyDown | aria-haspopup, aria-label, aria-labelledby | 1 |

已注册动态媒体：3。这里只统计包内资产，不把外部视频漏报为不适用。无原稿静态替代图的GIF继续阻断对应组合；不得自制占位图冒充来源。

执行顺序：先查契约支持状态和拒绝项，再打开相应Story，按事件/ARIA映射检查默认到激活、关闭、边界和恢复路径。逐项记录真实操作与源码/构建哈希；读屏、真实触屏和软键盘保持人工待验，不能由AST映射代替。

## 已执行的媒体回退

2026-10-23用户明确允许从三个原GIF提取首帧。三个PNG与GIF首帧的解码像素哈希完全一致；原GIF文件保持原哈希。PortalAsset仅对这三个ID在减少动态效果时使用对应PNG，正常偏好使用原GIF；偏好实时变更的双向切换、尺寸和alt保持已在真实浏览器验证。证据见release-evidence/motion-fallback-2026-10-23.json和motion-fallback-browser-2026-10-23.json。其它媒体及动效不据此判为通过。

## 2026-10-23 V12执行绑定

逐来源JSON现附当前189个命名Story执行的对应关系：59个有声明play，130个仅渲染。常见问题的53个原稿尺寸与原生键盘状态隔离、下一步的6档副标题字号另见[本轮证据](release-evidence/browser-execution-2026-10-23/source-alignment-summary.json)。不得把任一局部通过扩大成整来源、整家族或完整人工无障碍通过。
