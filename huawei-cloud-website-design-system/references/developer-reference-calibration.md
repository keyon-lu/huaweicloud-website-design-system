# 已验收开发者首页契约

2026-10-14，用户已验收2.0.24-draft developer-home产物；[台账](acceptance-ledger.md)记录原话和哈希。旧逐轮“待用户校准”描述是当时状态，不能作为当前页面结论。文档整理不改变原有页面实现。官方首页26.7.278源码和历史六视口测量为来源，不能当作当前自动浏览器验收。

## 结构与内容

- 首屏两个source海报，手动圆点切换，固定对应两套文案；视频/自动播放/打字动画为明确回退。促销内容是历史资料。
- 实践卡片使用真实背景与文案，原生局部横滚；不是静态通用网格或完整Swiper。
- AI空间为主界面GIF与右侧两张source媒体，媒体下有独立白色说明区；组件固定AI Shell/Agents/环境管理文案与入口。
- Skills顺序：楼层标题、介绍、查看全部、复制条、卡片。copies/views/updatedAt可配置，样本六项为源码历史快照；标签30px，日期跟随查看量。复制图标与复制统计使用PortalCopyGlyph；成功只勾号，失败保留选择输入及手动提示。
- 命令胶囊大圆角、壳左右24px、文字到图标24px；input padding0、size按命令长度、无横向flex增长，窄屏可缩小/裁切；不把壳padding误删。
- Skills<=1280自然高度，无固定min-height撑底部，padding上下相同。3/2/1列及局部字号按组件CSS，槽宽以全局16px为准。
- 开放能力桌面整卡背景+左文右图；<=600居中上文下独立GIF；不保留自制OpenAPI/SDK/KooCLI/Terraform悬浮卡片。

## 复用边界

Header与Footer是共享组件，读[导航](first-level-navigation.md)和[页尾](website-footer.md)。全局容器按[栅格](website-grid.md)，主副标题12px是用户全楼层裁定；独立模块断点不由全局列数决定。

Banner/Announcement/Space/Skills/OpenAbility仍有固定首页文案、链接或资产，完整可配置范围见[组件契约](component-contract.md)。不要把其props没有暴露的字段当成已有接口。Skills固定输入id一页只放一个；Banner使用两张对应海报；Space.title尚未渲染。

未覆盖：全站实时内容/搜索/账号功能、社交二维码、完整源站动效、任意新门户、国际化与正式无障碍审计。用户整页验收作为人工结果，不等于自动触屏/键盘测试每项通过。
