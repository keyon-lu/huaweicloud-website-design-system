> 样本/历史契约：当前跨场景规则与接口以[current-standards.md](current-standards.md)和[component-contract.md](component-contract.md)为准；文中的当时待验收状态按[验收台账](acceptance-ledger.md)判断，不作为当前页面结论。

# GaussDB 整页组合候选

2026-10-12，官网实例来源 https://www.huaweicloud.com/product/gaussdb.html 。使用 `--variant gaussdb-full`。`gaussdb` 仍是已确认的首段样本，保留原模板。

覆盖顺序：导航→首屏→新动态→实例规格→优势→客户案例→专业认可→生态伙伴→视频资源→相关资源→常见问题与咨询→购买行动→官网页脚。

## 证据与使用范围

用户认可的是首屏还原度，仅在 GaussDB 样本范围内记为 USER_CONFIRMED；不扩展为整页、移动端或全站规范批准。官网源码和桌面测量确认内容与实例结构（SOURCE_CONFIRMED）。从单个实例抽出的布局组合、手机重排及具体样式是 INFERRED_CANDIDATE，需要继续渲染对照。

桌面测量：容器遵循 PortalUI；优势为 2 个大卡 + 4 个小卡，1440 视口下大卡 634.4×352、小卡 307.2×260、间距20。案例为图片60%+文本40%，高度480；资源为3列2行；楼层通常上下60、标题32/48、标题与内容28。测量环境受原站活动条、滚动时导航变化和轮播影响，不用整页总高度当唯一依据。

官网伙伴组件明确配置 PC/pad/mobile 三份素材；本包保留三种图片，根据当前宽度选择。其它模块的手机重排尚未获得完整现场测量，不宣称已精校。

## 组件复用

`PortalGaussFullContent` 组合 `PortalGaussPricing/Benefits/Cases/Recognition/Partners/Videos/Resources/Questions/FinalAction`。楼层复用 PortalSection，FAQ复用 PortalFAQ，按钮复用 PortalButton，全部素材通过 PortalAsset 访问包内登记。页脚为 PortalWebsiteFooter，当前仅限GaussDB样本候选，不替换开发者默认页脚。

案例使用四个手动切换按钮（aria-pressed），无自动轮播；伙伴使用键盘可操作的tabs（左右/Home/End）。FAQ源文案作为纯文本呈现，不注入官网HTML。视频为官方资源页直达，未实现官网播放弹层。禁止复制本样本报价或技术指标到其它产品。

## 内容时效与缺口

价格是2026-10-12展示快照，不能用于报价或结算；实际金额以官网购买页为准。法律与备案文字是华为云样本身份，生成其他品牌站点必须替换，不能继承。活动条、完整Mega Menu、搜索客服、案例指标布局、视频播放及完整备案区仍有差异。

浏览器控制在本轮多次超时；已取得桌面整页截图与计算样式，但新增草稿的浏览器运行、交互和跨宽度截图验收尚未通过。编译和包校验仅证明离线产物结构有效。Creator仍在P2，正式门禁未通过，不允许批量推广。

证据登记：首屏用户确认 SRC-095；桌面实例测量 SRC-096；源码内容提取 SRC-097。图片来源ID见 assets.json 和 provenance.json。
浏览器验收还受到本地 file URL 安全策略限制，本轮没有绕过限制；新增整页暂按待用户预览/待浏览器验证候选交付。

本轮离线验证通过：114个资源完整性校验；默认两类场景及GaussDB两个variant编译；整页和开发者离线HTML生成；所有内容Asset ID存在；首段TSX模板与已认可版本相同。上述均不是新增整页运行或视觉验收。历史domain-standards相对引用路径已修复。

九条用户标注修订与分辨率证据见[标注修订契约](gaussdb-annotation-corrections.md)；运行与截图验收仍待完成。

响应式组合更新以[组件响应式修订](gaussdb-responsive-corrections.md)为准，旧的768全改单列规则不再适用。
