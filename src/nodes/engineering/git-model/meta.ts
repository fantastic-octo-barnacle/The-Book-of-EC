import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "engineering.git-model",
  title: "Git 基础",
  summary: "观察、暂存、提交、分支与远程同步。",
  level: "intro",
  estimatedTime: "3h",
  concepts: ["version-control"],
  technologies: ["Git"],
  relations: [{ target: "engineering.shell-basics", type: "recommended" }],
  parts: [
    { title: "Git 基础", path: "index.md" },
    { title: "观察、暂存与提交", path: "local-workflow.md" },
    { title: "分支、stash 与远程", path: "branches-remotes.md" },
    { title: "综合练习", path: "practice.md" }
  ]
} satisfies NodeDefinition
