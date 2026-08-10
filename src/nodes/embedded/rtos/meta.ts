import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.rtos",
  title: "RTOS 并发基础",
  summary: "任务调度、同步原语与实时性约束。",
  level: "advanced",
  estimatedTime: "3h",
  concepts: ["concurrency", "shared-state", "priority", "synchronization"],
  technologies: ["FreeRTOS", "MCU"],
  relations: [
    { target: "embedded.interrupts", type: "required" },
    { target: "programming.object-lifetime", type: "required" }
  ],
  parts: [{ title: "RTOS 并发基础", path: "index.md" }]
} satisfies NodeDefinition
