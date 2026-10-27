# 华为云官网设计规范 Skill

当前正式版：**2.6.0**（2026-10-26）。用于按已采用规范生成、修改华为云风格的公开官网页面和本地检索验证原型。

## 下载与安装

- [下载 2.6.0 安装包](https://github.com/keyon-lu/huaweicloud-website-design-system/releases/tag/v2.6.0)
- [仓库内 ZIP 备份](dist/huawei-cloud-website-design-system-2.6.0.zip)
- [Skill 使用入口](huawei-cloud-website-design-system/SKILL.md)

解压 ZIP，将其中的 `huawei-cloud-website-design-system` 目录放入 Codex 的用户 Skill 目录（通常为 `~/.codex/skills/`），保留内部目录结构。在新会话中使用该 Skill。

也可以克隆本仓库，再复制同名目录进行安装。不要把整个仓库目录作为 Skill 目录。

## 本版范围

- 产品官网页、开发者官网页面，以及已有公共组件支持的组合页原型。
- 66 条采用来源、62 个楼层绑定、17 个基础家族的 19 项复验样本。
- 独立的本地内容检索验证工程；不代表已接入生产接口。

117 条来源延期。暗色、多语言、登录后的控制台及生产后端不在本版范围。智果园 2.7.0 开发扩展未包含在此正式包中。

## 已知限制

这是按负责人决定发布、保留已知限制的正式版本，**完整验收门禁尚未通过**。逐来源视觉、特殊状态、适配和真实设备测试仍有未验证项；“下一步”和“直播预告”保留原稿对比度，记录为未达标。不声明官方设计认证或 WCAG 认证。

发布时保留的 422 个待完成位置是复合检查位置，不能当作 422 个独立缺陷。具体边界见 [发布记录](release.json) 和包内 [发布状态](huawei-cloud-website-design-system/references/publication-2.6.0.json)。

## 校验

ZIP SHA-256：

```text
fc66145a9165d1371d6525a982eeb8def9b6d93dac4e06bad15d20615ec6dd8e
```

正式包保留原始字节，未混入开发版。历史验证记录见 [validation.json](validation.json)。
