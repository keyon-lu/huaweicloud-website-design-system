> 历史迁移说明（2026-10-13）：其中“待验收”描述为当时状态。当前接口以[组件契约](component-contract.md)为准，当前验收按[台账](acceptance-ledger.md)判断；后续公共框架变化不自动继承原产品验收。

# Shared product-page floors — WAF transfer

Owner request 2026-10-13: reuse the accepted GaussDB visual treatment for WAF header, hero, customer cases, resources, FAQ and final action. Scope is these two product-page examples, not every Huawei Cloud page.

Use `hc-page-product-reference` with `PortalHeader variant="site"` and `PortalProductNavigation`. Use `PortalProductHero`, `PortalCustomerCases`, `PortalProductResources`, `PortalProductQuestions` and `PortalProductFinalAction` from the public `portal-components` entry. The shared implementations retain legacy `hc-gauss-*` visual class names so the accepted geometry, typography and responsive rules stay identical. Do not rebuild these floors with generic PortalCards/PortalHero or page-owned CSS. Parameters carry product copy, links, icons, cases, customer names, logos and CTA background. Never substitute GaussDB content assets into another product page.

WAF business copy remains from the SRC-048 cached official page (2026-10-10). New WAF icon, customer pictures/logos and CTA background are extracted from that same page. Case tabs use actual item count (three for WAF, four for GaussDB). WAF FAQ shares the existing chevron and row style, without adding GaussDB contact copy. Advantages and industry solutions now use the source-backed PortalFoldedMedia and PortalSolutionCards families; see waf-special-floors.md for their separate specifications and pending visual review. Footer was added to shared scope by the owner on 2026-10-13; use PortalWebsiteFooter with the same public-site link groups as the accepted GaussDB example.

The GaussDB wrappers for customer cases, resources and final action now delegate to the shared implementation. The GaussDB hero retains its existing breadcrumb wrapper. Desktop cases retain image-left/text-right layout; below 840px cases use horizontal image-above-text cards. Other shared styles and media rules are reused unchanged. New runtime/browser/visual acceptance remains pending; static compile is not visual evidence.

The WAF footer now directly imports PortalWebsiteFooter, including the service strip, logo/contact area, five navigation groups, legal links and the existing responsive collapse behavior. It shares the exact implementation and CSS with GaussDB; no page-owned footer styles are added. Footer link groups are reused from the accepted public-site example, rather than inferred WAF-specific content.

For folded advantages and background-image solution cards, read [waf-special-floors.md](waf-special-floors.md). The WAF route now uses these public components.
