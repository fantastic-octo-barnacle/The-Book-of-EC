import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.timers-dma",
  title: "定时器、PWM 与 DMA",
  summary: "周期、脉宽与无 CPU 搬运的数据通路。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["timer", "DMA", "sampling"],
  technologies: ["STM32", "MCU", "motor"],
  relations: [
    { target: "embedded.clock-reset", type: "required" },
    { target: "embedded.interrupts", type: "recommended" }
  ],
  parts: [{ title: "定时器、PWM 与 DMA", path: "index.md" }]
} satisfies NodeDefinition
