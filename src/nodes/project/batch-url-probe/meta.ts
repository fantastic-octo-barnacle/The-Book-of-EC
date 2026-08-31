import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "project.batch-url-probe",
  title: "批量 URL 探测器",
  summary: "用 Rust 对比同步与有界异步并发的批量 HTTP 探测。",
  level: "intro",
  estimatedTime: "按项目安排",
  concepts: [
    "protocol",
    "latency",
    "error-handling",
    "ownership",
    "concurrency",
    "asynchronous-programming"
  ],
  technologies: ["Rust", "Cargo"],
  relations: [],
  parts: [
    { title: "批量 URL 探测器", path: "index.md" },
    { title: "第一阶段：同步探测", path: "stage-1.md" },
    { title: "第一阶段流程提示", path: "stage-1-guide.md" },
    { title: "第二阶段：异步探测", path: "stage-2.md" },
    { title: "第二阶段流程提示", path: "stage-2-guide.md" }
  ]
} satisfies NodeDefinition
