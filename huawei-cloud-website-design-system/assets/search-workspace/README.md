# 官网搜索与内容检索验证环境

这是独立的本地业务工程，不覆盖已验收的产品/开发者页面。已包含8份公开 Skill 资料快照；无需外部服务、账号或密钥。它不是华为云全站搜索、线上服务或正式设计认证。

要求 Node >=22.12、pnpm 11.25.0。版本以 package.json 与 pnpm-lock.yaml 为准。

```powershell
pnpm install --frozen-lockfile
pnpm run build
pnpm start
```

打开 http://127.0.0.1:4317 。服务只绑定本机，仅提供新工程 dist 资产和明确的检索/详情 API。Ctrl+C 停止。Windows 可直接运行 `./Start-LocalSearch.ps1`（已有构建时），或通过 `-NodePath` 指定 Node。

```powershell
pnpm test
pnpm run build-storybook
pnpm run storybook
pnpm run verify
# 更新明确列出的8份文档；不会递归扫描目录
node scripts/build-index.mjs "<SKILL_DIR>"
```

能力：中英文及全角归一化、空格分词 AND 匹配、标题/标签/正文加权、分类、排序、分页、空结果、错误重试、结果详情、URL保存条件与返回。仅8条验证内容；不是生产容量或搜索质量基准。可替换 `src/lib/search-api.ts` 的 SearchAdapter，保留查询/结果模型和 AbortSignal；真实CMS接入、索引更新调度、线上限流与容量验证需要另行实现。

输入框和按钮通过 PortalUI 类名消费唯一基础CSS；它们是源码基准实现，不是 Pixso 转换件。搜索页布局为候选，不改变已确认导航规范。Storybook状态样本用于开发，构建通过不代表其 play 函数已在浏览器执行，也不代表无障碍审计通过。components.json 提供目录别名与兼容元数据，不代表使用 shadcn 官方组件或已完成 CLI 初始化。

目录：server为本地API，src为React组件与页面，data为带SHA256的资料快照，tests为HTTP与搜索测试，evidence为具体运行结果。当前模板不附原工程运行证据；复制或修改后运行 pnpm run verify 获取本工程证据。全目录覆盖和正式验收状态见 Skill references/source-baseline-acceptance.md。

Local performance candidate: `node scripts/benchmark-search.mjs` warms10, runs100 read-only requests with10 concurrent clients, checks result correctness, and writes evidence/search-benchmark.json. Its200ms P95 budget is limited to8 bundled documents and loopback; it is not a production SLA. Storybook SourceModal is an additional complex source pilot, not full-family certification.
