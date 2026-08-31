import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "project.desktop-text-statistics",
  title: "批量文本统计 CLI",
  summary: "用 Rust 实现可测试、可解释错误的多文件文本统计工具。",
  level: "intro",
  estimatedTime: "按项目安排",
  concepts: [
    "filesystem",
    "process",
    "error-handling",
    "ownership",
    "concurrency",
    "asynchronous-programming"
  ],
  technologies: ["Rust", "Cargo"],
  relations: [],
  parts: [{ title: "批量文本统计 CLI", path: "index.md" }]
} satisfies NodeDefinition
