import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.mcu-structure",
  title: "单片机结构",
  summary: "理解 MCU 的指令集、内核、编译目标与外设分工。",
  level: "intro",
  estimatedTime: "2h",
  concepts: ["compilation", "memory", "startup"],
  technologies: ["C", "C++", "Cortex-M", "MCU", "STM32"],
  relations: [],
  parts: [{ title: "单片机结构", path: "index.md" }]
} satisfies NodeDefinition
