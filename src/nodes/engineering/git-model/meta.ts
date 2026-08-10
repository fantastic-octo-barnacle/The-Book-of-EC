import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "engineering.git-model",
  title: "Git 状态模型",
  summary: "工作区、暂存区、提交与引用。",
  level: "intro",
  estimatedTime: "2h",
  concepts: ["version-control"],
  technologies: ["Git"],
  relations: [{ target: "engineering.shell-basics", type: "recommended" }],
  parts: [
    { title: "Git 状态模型", path: "index.md" },
    { title: "练习", path: "practice.md" }
  ]
} satisfies NodeDefinition
