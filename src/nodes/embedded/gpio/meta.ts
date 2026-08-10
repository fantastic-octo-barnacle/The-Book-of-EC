import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.gpio",
  title: "GPIO 与引脚复用",
  summary: "引脚模式、复用、电气属性与外部连接。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["GPIO", "pinmux", "logic-level"],
  technologies: ["STM32", "MCU"],
  relations: [{ target: "embedded.clock-reset", type: "required" }],
  parts: [{ title: "GPIO 与引脚复用", path: "index.md" }]
} satisfies NodeDefinition
