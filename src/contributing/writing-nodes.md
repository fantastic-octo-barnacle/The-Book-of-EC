---
title: 编写学习节点
prev: false
next: false
---

# 编写学习节点

## 新增节点

1. 在 `src/nodes/<domain>/<slug>/index.md` 编写入口正文。
2. 在 `src/.vitepress/content/nodes.ts` 的注册表中增加节点定义。
3. 如有附属页，在节点目录创建 Markdown，并按阅读顺序加入 `parts`。
4. 如需进入专题，在 `topics.ts` 的 `members` 中加入节点 ID。
5. 运行 `pnpm check` 和 `pnpm build`。

## 入口页建议

入口页应明确该节点解决什么问题、核心边界是什么，以及读者如何验证理解。内容较长时拆入附属页，不要为了统一模板创建空页面。

## 拆分边界

当一部分内容需要独立阅读、具有明确标题，或需要单独练习和验证时，可以拆成附属页。附属页仍属于同一个学习节点，不会成为学习图顶点。
