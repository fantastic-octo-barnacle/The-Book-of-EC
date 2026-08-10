import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.interrupts",
  title: "中断与事件响应",
  summary: "中断优先级、延迟与中断上下文约束。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["interrupt", "latency", "priority", "shared-state"],
  technologies: ["Cortex-M", "MCU"],
  relations: [
    { target: "embedded.clock-reset", type: "required" },
    { target: "programming.object-lifetime", type: "recommended" }
  ],
  parts: [{ title: "中断与事件响应", path: "index.md" }]
} satisfies NodeDefinition
