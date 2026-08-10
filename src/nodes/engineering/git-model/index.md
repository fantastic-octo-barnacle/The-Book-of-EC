---
{
  "id": "engineering.git-model",
  "title": "Git 状态模型",
  "summary": "工作区、暂存区、提交与引用。",
  "level": "intro",
  "estimatedTime": "2h",
  "concepts": ["version-control"],
  "technologies": ["Git"],
  "relations": [{ "target": "engineering.shell-basics", "type": "recommended" }],
  "parts": [{ "title": "练习", "path": "practice", "type": "practice" }]
}
---

# Git 状态模型

## 要点

- 工作区、暂存区和提交是三个不同状态。
- 分支是提交图上的可移动引用。
- 远程仓库保存引用，不会自动同步工作区。

## 检查题

文件修改后未进入提交，可能停在哪个状态？冲突为何需要人工判断？

## 延伸

资料：[Pro Git](https://git-scm.com/book/zh/v2)。
