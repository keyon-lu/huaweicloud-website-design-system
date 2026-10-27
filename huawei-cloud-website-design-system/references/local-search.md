# 本地搜索与内容检索

本轮由用户确认搜索/内容检索优先，暂无接口，先构建本地验证环境。与三个离线页面生成路线独立，禁止为此解除原型编译器的 fetch/eval 等限制。

使用根 Skill scripts/generate-search-project.mjs 生成独立 React + TypeScript + Vite + Storybook 工程，输出目录须为空。模板完整性先校验再写入；保留现有文件，不提供覆盖开关。

```text
node "<SKILL_DIR>/scripts/generate-search-project.mjs" "<空输出目录>"
cd "<空输出目录>"
pnpm install --frozen-lockfile
pnpm run build
pnpm start
```

浏览 http://127.0.0.1:4317 ，Ctrl+C停止。Node >=22.12；依赖版本以模板 package.json 和锁文件为准。只绑定127.0.0.1；只服务该工程新构建的dist资产及API，不提供任意文件代理。已有构建可运行 Start-LocalSearch.ps1。

GET /api/search 接受q/category/page/pageSize/sort。category为all/standard/product/developer/resource，page从1开始，pageSize1–30，sort为relevance/updated。q最多120字符，NFKC归一化、忽略英文大小写、空格分词AND匹配，按标题/标签/正文加权，排序稳定。返回items/total/pageCount/facets/indexVersion。GET /api/content/:id 返回详情及来源，GET /api/health 返回索引状态。无写接口、无外部凭据；错误参数400、未知内容404、方法405。

默认仅收录8份公开Skill规范快照，绝非华为云全站内容。脚本build-index.mjs仅索引源码中列出的文件，不递归爬取。更新时明确传入Skill目录；未传入则保留现成快照。日期是资料快照日期，不伪装线上发布日期。

UI包含查询、分类、排序、分页、空结果、错误重试、详情、URL条件保存与返回。通过SearchAdapter替换线上API，保持AbortSignal、输入校验、稳定ID、错误/空结果区分。用户词和结果渲染为文本，不执行HTML。真实CMS、索引调度、搜索质量评估、线上容量/限流、认证和部署需单独接入验证。

执行pnpm test、pnpm run build、pnpm run build-storybook、pnpm run verify。Storybook play声明不等于执行通过；模板复制后的测试不能继承原项目的通过状态。输入框/按钮消费PortalUI基础样式，搜索组合外观为候选。组件和认证边界见[source-baseline-acceptance.md](source-baseline-acceptance.md)。
