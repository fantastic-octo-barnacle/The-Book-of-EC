import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "project.platform-bring-up",
  title: "STM32 平台与工程",
  summary: "从空目录建立可构建、烧录、调试和运行的嵌入式 Rust 工程。",
  level: "integration",
  estimatedTime: "按项目安排",
  concepts: [
    "compilation",
    "linking",
    "startup",
    "clock",
    "GPIO",
    "interrupt",
    "concurrency",
    "asynchronous-programming",
    "debugging"
  ],
  technologies: ["Rust", "Cargo", "Embassy", "probe-rs", "STM32", "Cortex-M", "MCU", "RoboMaster"],
  relations: [{ target: "project.desktop-text-statistics", type: "recommended" }],
  parts: [{ title: "STM32 平台与工程", path: "index.md" }]
} satisfies NodeDefinition
