import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.drivers",
  title: "外设驱动边界",
  summary: "初始化、状态、错误与硬件抽象。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["driver", "synchronization"],
  technologies: ["MCU"],
  relations: [
    { target: "embedded.gpio", type: "required" },
    { target: "embedded.interrupts", type: "recommended" }
  ],
  parts: [{ title: "外设驱动边界", path: "index.md" }]
} satisfies NodeDefinition
