> 样本/历史契约：当前跨场景规则与接口以[current-standards.md](current-standards.md)和[component-contract.md](component-contract.md)为准；文中的当时待验收状态按[验收台账](acceptance-ledger.md)判断，不作为当前页面结论。

# Folded media and background solution card floors

Public entry: PortalFoldedMedia and PortalSolutionCards from portal-components. WAF example: src/pages/waf-reference/index.tsx. Both are optional floor families selected by content structure, not mandatory on every product page. Do not substitute generic PortalCards.

Evidence: SRC-048 cached WAF HTML, 2026-10-10. CSS read 2026-10-13 from the exact versioned styles linked by that HTML: folded-pictext 11.7.205 and product-solution 11.6.201. Downloaded CSS is supporting evidence, not injected global styles. Layout rules copied into scoped adapter selectors to preserve existing GaussDB floors. Values are source-example mappings, not newly approved global design tokens. Current live page was not verified.

FoldedMedia inputs: id, title, items (title, paragraphs, asset, optional mobileAsset/tag), optional backgroundAsset/defaultIndex. Five WAF items preserve all source paragraphs including quantified claims as historical source copy. Default first item expanded; click toggles one item and updates matching art. Buttons have aria-expanded/controls, region labels, arrow/home/end focus navigation. Source gap is 48/40/32px; left column 36%, or 45% at 600–839px. Below 600px art is in the expanded item. Source mobile imagery starts at <=1280px, falls back to provided asset. Source automatic 5000ms rotation/progress is intentionally not enabled in this manual prototype; recorded implementation difference. Source tablet picPad is blank: mobile asset is fallback candidate. Source mobile heading incorrectly says intelligent-office scenarios; retain correct WAF heading. Do not silently copy this incorrect title into another page.

SolutionCards inputs: id, title, items(title, description, optional href/asset/theme). Optional asset supports background and no-background cards; theme controls readable text. WAF uses four dark cards with official images, body copy and links. Desktop width/height:385/580px; <=1600:334/503; <=1280:273/411; <=1024:234/352; <=768:320/420. Gaps20/16/16/12/16; radii24/20/16/14/20. Horizontal scroll and desktop previous/next buttons; no wrap to generic grids. Source clips titles at two and body at three lines; full copy retained in DOM. Source unrelated car-AI modal payload is unused because WAF card action is a direct official link. No invented modal content. Background crop uses cover/center and existing source imagery; no extra overlay presumed.

Validation: compile/standalone generation, content/source matching, static state and event-handler checks. Browser geometry, mobile appearance and interaction remain pending owner review; no visual acceptance implied.

## Arrow calibration 2026-10-13

Card action uses the exact inline SVG from the cached WAF card, not a fixed-size CSS drawing. Icon boxes (width=height): >1600px 16px; 1280–1600px 13px; 1024–1280px 11px; 768–1024px 10px; <=768px 13px. The larger mobile size is from the source CSS, not an interpolation. Round action container remains 40/32/28/24/32px. White source SVG is used on dark WAF cards; dark fill is an implementation adaptation for reusable light cards.

Carousel control uses the SVG embedded in the versioned official solution stylesheet: 64x64 viewBox, circle opacity .8 and source rounded path stroke4. Mirror the source left SVG for next. Button box64/56/42/36px, hidden<=768px; the SVG and circle scale together. Controls have z-index5 and no separately drawn CSS arrow/circle. Browser visual review remains pending.
