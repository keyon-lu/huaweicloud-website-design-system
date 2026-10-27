# Website grid: owner decision 2026-10-14

Applies to public product and developer pages, navigation inner container, hero text, section containers, CTA and footer. This latest USER_CONFIRMED decision supersedes older container measurements/margins in previous page-example notes. Grid gutters16px across all tiers. Exact1776px was omitted by owner (>1776 /1775–1025); implementation assigns1776px to the wide tier as a recorded assumption, not a new source confirmation.

| Width | Columns | Content width | Side margin |
|---|---|---|---|
| >=1776px |24|1600px|auto centered|
|1025–1775px|24|90%|5%|
|769–1024px|24|94%|3%|
|376–768px|8|available width minus48px|24px|
|<=375px|4|available width minus28px|14px|

website-grid.css is the last stylesheet in every generated page, scoped to both public page roots so historical page-specific paddings do not win the cascade. por-container and hc-dev-container consume identical width variables with zero inner horizontal padding. Nested containers avoid a second percentage inset. Full-bleed media backgrounds remain viewport-wide, with hero copy aligned to the content grid. hc-grid/hc-span-* provide explicit24/8/4 tracks; legacy xs span values clamp to current mobile column count. por-row keeps16px gutters using8px halves. Main card grids use16px horizontal gaps and practice widths account for them; card count/scroll behavior still follows component contracts. This does not mean every component-internal space becomes16px: owner-confirmed footer30px column spacing/84px offset, navigation24px, pill padding and fold-media spacing retain their semantic values. Footer/nav special structures still stay inside the common content region. Fixed-width scroll cards deliberately scroll locally; not root-page overflow.

Copy success: icon changes to check; no visible separate success line. An offscreen live status remains for assistive technology. Failure/manual-copy feedback is still visible when needed.

Validation must include boundaries375/376,768/769,1024/1025,1775/1776/1777 and representative1920/1905/1440/1026/565/390/320. Computed formula/cascade and compilation are distinct from browser geometry; no browser responsive acceptance inferred. New global container changes invalidate geometry-specific acceptance for affected preview revisions, without changing prior user-content approvals.
