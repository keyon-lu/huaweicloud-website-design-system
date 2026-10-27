# SearchInput — source implementation pilot

Evidence: SOURCE_CONFIRMED, PortalUI 3.0.17 `references/portalui-docs/baseui/input.md`. This is not a Pixso conversion.

Public API: native input props plus size `middle|large`; middle maps to por-text-input (32px), large to por-text-input-l (40px). Controlled value/onChange are owned by the caller. Native disabled and aria-invalid remain native. Accessible label is required from caller. Forward ref supports focus restoration. No internal theme or component-owned appearance overrides. Styles enter through copied approved PortalUI offline stylesheet, with recorded hash.

Stories: controlled Playground, size/disabled/error matrix. Required runtime checks: type, keyboard focus, disabled activation, host vs standalone computed appearance. Pixso structure/image and manual accessibility review remain missing; source pilot cannot authorize bulk conversion.


2.4 family support: SourceInputField adds visible label/error, useId, aria-invalid and associated error description; defaults middle32px, SearchInput retains its existing large40px search default. SourceTextarea supports controlled/uncontrolled values, native maxLength(default200), source UTF-16 length counter, warning at max-10 and limit state. External controlled values are not silently truncated; native typing is limited. Counter is described without announcing every keystroke. SourceAutocomplete uses exact por-input-option-list markup discovered in supplied theme-token.js, controlled value/options, case-insensitive substring filtering, native focus, ArrowUp/Down/Enter/Escape, empty info and outside blur. While nested popup is expanded Escape stops propagation; the next Escape can close its host modal. IME composing Enter does not commit a suggestion. Caller supplies unique option keys and localized labels; options update from props rather than repeated DOM/plugin injection.

Intentional a11y adaptations: errors and character limit text use existing readable text tokens; enabled placeholders use secondary text. Error icon/border preserve source signaling; visible text/counts carry meaning independent of color. Component width caps follow current viewport. ReadOnly/disabled remain native. Generic async loading is owned by the composition. Source geometry comparison6 pairs is distinct from expected caption/placeholder color repairs and manual reading review. No JQuery plugin instance is executed.

2026-10-24窄容器修复：仅给SourceInputField容器和source-input增加max-width:100%来源可用宽度约束，保留原生min-width、字号、行高、颜色和边框。用于防止字体放大后原生size=20内在宽度越出父容器；不把样本通过扩成软键盘或读屏通过。
