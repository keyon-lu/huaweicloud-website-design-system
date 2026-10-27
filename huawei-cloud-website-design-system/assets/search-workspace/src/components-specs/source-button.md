# SourceButton

Baseline: PortalUI 3.0.17 button.md with the explicit accessibility adaptations below. Native button props; type defaults button. Variants primary/secondary/dark/danger/primary-light/light; sizes small/default/middle/large; block uses source class. Native disabled blocks activation. Custom className supports explicitly documented source responsive classes; no invented size scheme.

Accessibility repair: the source .por-btn removes outline. Local source-button.css adds focus-visible using the existing control focus width/offset and source border-input-active token; light variants use source white text token on their required dark host. This is an intentional accessibility difference, not an unchanged-source claim. Hover/disabled colors and dependency-owned appearance remain source-owned. Matrix shows all six variants/four sizes/enabled-disabled; light variants require source dark host background.

Storybook play proves keyboard focus and visible outline. Synthetic userEvent.hover is not CSS :hover proof; real browser pointer results are recorded separately. The icon-font assets and icon-button axis were added in2.4; actual complete-family/manual review remains pending. Loading/error/empty are not intrinsic to this synchronous primitive; async compositions must specify their own loading/duplicate/error behavior.


2.4 scope: six variants × four sizes × native enabled/disabled; block and icon styles primary/light; source responsive classes available through className. Public enums and forwardRef exported. Icon accepts one ReactElement and merges por-btn-icon on the SAME source element (no extra wrapper changing small-icon size); source u-icon/por-icon fonts restored exactly from the supplied CSS.

Intentional accessibility differences: focus ring restored; this component's color transitions disabled after a real enable-transition contrast failure. Enabled danger text uses the existing primary text semantic token instead of source red/light-pink text that fails4.5:1 against white; source danger border retained. These are recorded source deviations, not a claim of literal color identity. Matrix checks48 pairs/11 computed properties and four expected danger-label color differences. Loading/error/empty belong to async host flows, not this synchronous primitive. Native Tab skipping/disabled activation tested separately. Actual screen-reader review remains pending.

## 2026-10-21增补
已通过的SourceButton样本保持不变。SourceDesignAction是另一个导出，kind为text/image-text/link/dropdown，图标必须由原始资产传入。依据PIX-00861:32（图文）、60:25754（纯文本）、78:6260（链接）、60:25779（基础下拉）。基础面板最小164px、最大400px、圆角24px、24/32px内距、14/22px文字和16px项间距均从节点读取；不把原生select或导航面板当作此按钮。下载/菜单的完整状态仍待逐节点补齐，不宣称全家族完成。蓝色仅用于来源明确的文字导航链接，真正button仍遵守用户禁#1476FF约束。
