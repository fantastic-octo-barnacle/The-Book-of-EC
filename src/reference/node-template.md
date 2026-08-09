---
title: 知识节点模板
---

# 学习节点模板

学习节点是依赖图的最小单位。节点目录中的 `index.md` 定义元数据；正文可拆为附属页面。

```md
---
{
  "id": "programming.example",
  "title": "节点名称",
  "summary": "一句话说明该节点解决的问题。",
  "level": "intro | core | advanced | integration",
  "estimatedTime": "2h",
  "concepts": ["object", "lifetime"],
  "technologies": ["C"],
  "relations": [
    { "target": "other.node", "type": "required" },
    { "target": "other.optional-node", "type": "recommended" }
  ],
  "parts": [{ "title": "实验", "path": "practice", "type": "practice" }]
}
---

# 节点名称

<p class="node-meta">层级 · 时间 · 概念 · 技术</p>

## 用途
说明工程中的具体作用和范围。

## 要点
列出 3–5 个必须解释清楚的关系。

## 附属页
- [实验](./practice)

## 延伸
列出本站不展开的内容、资料类型与中英文检索词。

## 检查题
给出 3–5 个因果问题。

## 实验
给出低风险、可观察且有完成标准的实验。
```

附属页示例：

```md
---
node: programming.example
role: practice
---

# 实验
```

## 编写检查

- `id` 是否全局唯一，`concepts` 和 `technologies` 是否来自受控词表？
- `relations` 的目标是否存在；必需依赖是否无环？
- 依赖是否指向学习节点，而非专题、标签或页面小节？
- 自测题是否检验理解，而非术语背诵？
- 实验是否包含安全边界和可观察的完成标准？
