---
title: 编写学习节点
prev: false
next: false
---

# 编写学习节点

## 新增节点

1. 在 `src/.vitepress/content/nodes.ts` 的 `nodeIds` 中声明节点 ID。
2. 在 `src/nodes/<domain>/<slug>/` 编写 Markdown 页面，并创建包含该 ID 的 `meta.ts`。
3. 在 `nodes.ts` 中静态导入元数据并加入中央注册表。
4. 按阅读顺序将全部页面加入 `parts`，入口页放在首项，`path` 包含 `.md` 扩展名。
5. 如需进入专题，在 `topics.ts` 的 `members` 中加入节点 ID。
6. 运行 `pnpm check` 和 `pnpm build`。

## 入口页建议

`parts` 首项指定入口页，不要求使用固定文件名。入口页应明确该节点解决什么问题、核心边界是什么，以及读者如何验证理解。内容较长时拆入附属页，不要为了统一模板创建空页面。

## 拆分边界

当一部分内容需要独立阅读、具有明确标题，或需要单独练习和验证时，可以拆成附属页。附属页仍属于同一个学习节点，不会成为学习图顶点。

## 站内链接

正文中的普通站内链接使用 Markdown 链接语法。自定义 HTML 布局需要包裹复杂内容时，使用全局注册的 `<VPLink href="/path">`，不要直接写根路径 `<a href="/path">`；`VPLink` 会根据部署配置补充 `base` 和页面扩展名。
