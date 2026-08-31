import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "project.referee-system",
  title: "裁判系统通信",
  summary: "从连续 UART 字节流恢复、校验和解析裁判系统数据。",
  level: "integration",
  estimatedTime: "按项目安排",
  concepts: [
    "driver",
    "protocol",
    "frame",
    "CRC",
    "synchronization",
    "memory",
    "asynchronous-programming"
  ],
  technologies: ["Rust", "Cargo", "Embassy", "probe-rs", "STM32", "MCU", "RoboMaster", "UART"],
  relations: [{ target: "project.batch-url-probe", type: "recommended" }],
  parts: [{ title: "裁判系统通信", path: "index.md" }]
} satisfies NodeDefinition
