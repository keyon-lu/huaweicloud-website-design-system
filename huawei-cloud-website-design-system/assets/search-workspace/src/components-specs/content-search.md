# ContentSearch — local business composition pilot

Evidence: USER_CONFIRMED scope is search/content retrieval with a runnable local environment. Search result layout is INFERRED_CANDIDATE; it does not redefine accepted website navigation.

Composes SearchInput through its public index and SourceButton public index. Host CSS changes layout only for these dependencies. Adapter contract: `(SearchQuery, AbortSignal) => Promise<SearchResponse>`. HTTP adapter uses GET `/api/search`; result detail uses GET `/api/content/:id`. Query submission is explicit, IME composition is preserved by native form behavior. Browser URL persists q/category/sort/page/pageSize, back/forward replays query. A new query/filter resets page. Abort previous request and ignore its stale completion. States: loading, results, empty, error with retry, detail, detail error. Error is never disguised as empty.

Page uses the owner-confirmed 24/8/4 grid, 16px gutter and viewport margins. Search layouts and card presentation are candidates. Real CMS/auth/global search relevance, typo correction, semantic vector search, indexing automation, production capacity and deployment are outside the local proof. User-supplied terms and content render as text, never HTML.

Hardening: query and detail use fetchJson with10s timeout and cleanup, no automatic retry; loading disables same-query submit, modified query may cancel old request. UI copy is keyed in messages.ts. useId labels isolate multiple mounted instances. Intl helpers retain snapshot calendar date form.
