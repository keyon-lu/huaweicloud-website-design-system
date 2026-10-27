# 首版支持分支的状态与无障碍执行表

本表约束生成与改动，不是测试通过记录。范围来自[first-release-scope.json](first-release-scope.json)，公开入口及来源从[source-family-registry.json](source-family-registry.json)读取。已复验19项仅证明其展示样本；不能将这里的步骤或Storybook构建视为全家族通过。规格内历史说明与2026-10-21人工修正冲突时，以人工修正及冻结样本为准。

| 家族／具体规格 | 当前分支与状态 | 必须执行的操作、负例及结果 |
| --- | --- | --- |
| [button](../assets/search-workspace/src/components-specs/source-button.md) | 原生按钮；来源变体、尺寸、禁用与焦点；无内部loading/error/empty | Tab可达、Enter/Space仅触发一次、disabled跳过且不回调；真实指针核对hover；危险色与焦点按已登记修复，不恢复按钮蓝色。异步重复提交由宿主控制。 |
| [input](../assets/search-workspace/src/components-specs/search-input.md) | 输入、文本域、建议列表；default/disabled/readOnly/error；异步由宿主承担 | 标签与错误关联；输入保留、maxLength边界、受控超长不静默截断；建议上下键/Enter/Escape及中文组合输入，嵌套弹层先关建议再关对话框；无结果使用现有明确文案。 |
| [modal](../assets/search-workspace/src/components-specs/source-modal.md) | 受控open/closed，四种来源宽度；一次一个；不支持堆叠 | 打开焦点进入、Tab首末循环、Escape/遮罩关闭、内部点击不关、关闭/卸载恢复背景与触发器；长内容可滚，窄屏输入框不可被遮挡；自定义footer须有命名关闭动作。 |
| [link](../assets/search-workspace/src/components-specs/source-link.md) | 原生导航、禁用与浅色局部皮肤；非异步 | 启用Enter跳转，禁用无href/Tab/回调；拒绝危险协议、空目标与控制字符；长URL换行；焦点与真实hover分别检查。新窗口保留安全rel。 |
| [breadcrumb](../assets/search-workspace/src/components-specs/source-breadcrumb.md) | 有序路径、当前页；空路径不支持 | nav命名、末项aria-current；祖先必须有有效href；纯文本末项不添加停靠点；375px长路径换行、分隔符不丢失，不用其模拟步骤组件。 |
| [label](../assets/search-workspace/src/components-specs/source-label.md) | 原标签、medium、角标；当前角标只支持设计规定色系和两尺寸 | 普通标签非按钮；删除通过原生按钮回调且由宿主管焦点，disabled无回调；角标拒绝删除/图标/禁用组合；绿色浅背景Alpha只应用一次；色系存在不等于所有对比度通过。 |
| [checkbox](../assets/search-workspace/src/components-specs/source-choice.md) | checkbox/radio、mixed、分组/card；选中黑灰人工修正优先 | Space、单选原生方向键、mixed语义、禁用不改值；reset恢复默认、重复option值拒绝、无效受控值拒绝；折叠隐藏行不进入Tab，选中隐藏项可见；真实hover仍用#595959，不恢复旧蓝色测试期望。 |
| [collapse](../assets/search-workspace/src/components-specs/source-collapse.md) | open/closed、互斥/多开、受控/非受控与取消回调 | Enter/Space与aria-expanded/controls一致；同值不重复回调，取消不提交；内容关闭后不可聚焦，内容焦点回到触发器且保留输入；不声称支持旧jQuery六阶段动画。 |
| [scrollbar](../assets/search-workspace/src/components-specs/source-scrollbar.md) | 原生overflow、small/medium；内容短时无伪滚动条 | 命名region可Tab进入/离开；真实ArrowDown产生滚动；拒绝非法maxHeight，不捕获Tab；375px长内容、触屏及不同系统滚动条外观另验。 |
| [tab](../assets/search-workspace/src/components-specs/source-tabs.md) | 单选、禁用、受控、局部滚动与边界 | 左右/Home/End跳过禁用；只有当前tab为普通Tab入口；切换aria-selected/tabpanel同步且保留输入；取消不提交，删除当前项回退；长标签末项可达。没有自动播放。 |
| [price](../assets/search-workspace/src/components-specs/source-price.md) | 纯价格文本，零值与长单位；非购买业务 | 保留小数字符串、币种/单位可读；拒绝负数/NaN/无穷/科学计数/空值；不截金额，不自行换汇或补精度；无内部hover/selected/loading/error。 |
| [pagination](../assets/search-workspace/src/components-specs/source-pagination.md) | 动态、静态、select兼容入口，首末边界与非法输入 | 0页不渲染；页数变化收敛有效值；Enter/按钮跳转、输入错误可读且不跳转；disabled无回调；select超过1000项拒绝；结果请求的loading/error由宿主负责。 |
| [countdown](../assets/search-workspace/src/components-specs/source-countdown.md) | 显式截止epoch、格式、autoShow、零值和完成一次 | 注入时钟测截止前/后、D/H/M切H/M/S；同截止仅通知一次，配置更新重算；页面隐藏暂停调度、恢复按真实时间重算；卸载清理；不每秒live宣告，不作为服务端活动判定。 |
| [card](../assets/search-workspace/src/components-specs/source-card.md) | 以2026-10-21原通用卡片样本为准；旧size仅兼容 | 原资产、原间距与排版保持；整卡链接不能嵌套其它操作，纯展示无伪hover/disabled/异步态；长标题自然换行；不以基础文字卡片替代未建模图文楼层。 |
| [tips](../assets/search-workspace/src/components-specs/source-tips.md) | 当前灰/蓝全局提示；旧tone/duration仅兼容 | 关闭按钮有名称；灰底不再提示选项可键盘操作，蓝底不显示该选项；当前规范不自动消失，不扩展成功/警告/失败颜色；内容更新由宿主决定宣告，不能声称tooltip定位已覆盖。 |
| [anchor](../assets/search-workspace/src/components-specs/source-anchor.md) | 原页内导航，显式尺寸档位；手机按来源隐藏 | 目标实际存在且命名、原生hash跳转、当前项跟随；方向/Home/End与边界按钮；长名称可访问，视觉省略不丢名称；不凭三个尺寸样本猜连续断点。 |
| [fixed-table](../assets/search-workspace/src/components-specs/source-fixed-table.md) | 当前基础数据表；服务表格兼容适配；无排序/编辑/复杂合并 | table/caption/th与行列关系可读；列数一致、ID唯一；命名滚动区域可聚焦、窄屏局部横滚及表头不遮焦点；不得新增红色活动列或移动折叠皮肤。 |

## 每条楼层如何执行

先在[first-release-contract-index.json](first-release-contract-index.json)定位来源ID，只运行该条targets所列入口和契约支持分支。参数无效应拒绝，不能把未实现分支降级成通用卡片。66条来源、62个楼层家族不是同一统计口径。

每个改动记录：来源节点、支持分支、默认/当前/展开/禁用等实际状态、契约拒绝项、故事ID、源码与构建哈希、检查方式、预期、实测和未执行项。纯展示无需编造loading/error/selected；预约仅本地Set状态，不新增不存在的生产失败皮肤；复制成功只勾号，失败选中命令供手动复制且不执行。

全局宽度按[栅格规则](website-grid.md)执行，不能替换组件自己的内部间距。目标宽度至少覆盖375/376、768/769、1024/1025、1775/1776及代表宽度1920/1440/954/565/390/320。默认例的无根溢出不证明长文案；另测中文长标题、不可分词URL、命令、空列表及契约最大项数。局部横滚可以存在，但所有操作须可见可达。再做150%文字、200%浏览器缩放与窄横屏；软键盘场景需实设备验证，桌面缩窗不能代替。

减少动效分别检查：modal/choice/collapse/tabs/pagination的CSS过渡禁用；process-flow关闭平滑滚动；hover/cases关闭图片缩放；photo-wall同时检查CSS和JS的matchMedia分支。非自动运动组件不加虚构停止按钮。GIF/视频若无来源静态替代素材，不自制替代图并宣称完成；保留待验。

Tab/Shift+Tab、Enter/Space、Escape、方向键必须通过真实浏览器输入；Storybook的合成事件不能证明原生滚动、真实hover或屏幕阅读器。图片背景的axe incomplete保留待核对，不能改规则过滤掉。读屏分别记录名称、角色、状态、错误关联、隐藏内容和焦点回退；未实际执行时标pending。

本地检索的loading/empty/error/取消/过期响应、10秒超时与手动重试按[发布整改契约](release-hardening.md)执行；本表不授予生产接口、暗色或多语言支持。

## 2026-10-22 owner decisions
Read `owner-decisions-2026-10-22.json` and the relevant floor contract before generating the affected floors. Three geometry/text decisions are confirmed; the information spacing/tag and next/live style corrections do not imply whole-component visual or contrast approval. The two contrast decisions are superseded by [the2026-10-26 owner decision](owner-decisions-2026-10-26.json): retain source colors and disclose known nonconformance. See [accepted source limitations](accepted-source-limitations.md). These decisions are resolved; contrast failures remain and other acceptance is not waived.

## 逐来源执行定位

先读取[first-release-state-media-matrix.md](first-release-state-media-matrix.md)，或按来源ID查询[first-release-state-media-matrix.json](first-release-state-media-matrix.json)。这里列出66个实际入口的递归事件、ARIA状态、依赖及已有单元测试引用；映射结果不等于状态验收。三个已注册GIF及外部配置视频的静态回退必须逐项核对，不得因资产清单未列视频就判不适用。

## 三个开发者GIF的静态回退（已授权并执行）

`developer-space`、`developer-ability`、`developer-ability-mobile`在`prefers-reduced-motion: reduce`下分别使用同名`-static-first-frame`资产。PNG为用户授权从原GIF解码提取的第0帧，未重绘；原图、正常模式DOM结构/alt/class及来源样式保持。偏好改变时自动切换，卸载清理监听。该修复不授予其它GIF随意生成静态图的权限，也不代替读屏和触屏验收。此前对这三个GIF的待定回退说明以本节和对应证据为准。

## 2026-10-24受托来源裁定

先读[source-adjudications-2026-10-24.json](source-adjudications-2026-10-24.json)。信息卡已实现手机图组确定使用原画板343/182，其它文字尺寸不扩为新支持。下一步与直播预告继续保留已记录来源色值；设计保留决定不等于AA通过，已发现的对比度失败仍纳入发布限制和验收，不通过改名、隐藏文字或过滤axe关闭。原用户裁定文件保留原样，不伪造新的owner approval。

## 当前基础组件状态模型

17家族当前分支、命名状态、宿主责任、兼容入口和已验收样本边界见[first-release-foundation-contracts.json](first-release-foundation-contracts.json)。它是经本轮核对的规格/状态模型，不是浏览器、视觉或人工无障碍通过。不要把同步价格/标签/文档导航补成虚构loading/error，也不要把公开保留的兼容计时或弹层行为误写成不存在。

## 当前66条来源的楼层状态模型

生成或修改已采用楼层时，按来源ID读取[first-release-floor-state-contracts.json](first-release-floor-state-contracts.json)，核对公开入口、命名状态、状态转换及不支持/宿主责任。静态楼层不补造loading/error/selected；本地检索、预约示例不能冒充生产服务。多来源共用Story模块时逐来源绑定，Commands复制测试不替代Actions的状态证据。此模型是采用分支的规格复核，运行、全源视觉、真实键盘/读屏和物理设备验收仍单独记录。

62个必需楼层家族的执行绑定见[first-release-floor-family-contracts.json](first-release-floor-family-contracts.json)：54项按实现文件、公开导出和契约三者精确映射已有来源模型，另8项按已保护的原产品/组合页接口单独核对。不得把同一来源及其楼层别名重复计为新增组件，也不得将原FoldedMedia允许全收起/Case按钮组等行为覆盖成2026不同接口的交互。
