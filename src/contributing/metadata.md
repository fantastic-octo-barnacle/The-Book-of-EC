---
title: 元数据
prev: false
next: false
---

# 元数据

节点和专题元数据位于 `src/.vitepress/content/`，由 TypeScript 在编辑和检查阶段约束。

## 节点 ID

节点注册表的键就是固定 ID，例如 `embedded.gpio`。`NodeId` 从全部键名推导；关系目标和专题成员只能使用已注册的 ID。

## 节点字段

- `title`、`summary`：图中展示的名称和摘要。
- `level`：`intro`、`core`、`advanced` 或 `integration`。
- `estimatedTime`：完成节点的大致时间。
- `concepts`、`technologies`：图内筛选使用的固定标签。
- `relations`：指向必需或建议先修节点。
- `parts`：节点内部页面的标题、路径与线性顺序。

## 专题成员

专题使用 `members` 声明节点集合。数组仅用于保存集合，不表达阅读顺序；不得包含重复节点。

## 构建验证

TypeScript 负责检查 ID、标签和字段取值；构建阶段继续检查 Markdown 文件存在性、重复页面、重复专题成员和必需依赖环。
