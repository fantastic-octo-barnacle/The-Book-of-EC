import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "control.estimation-actuation",
  title: "估计与执行器约束",
  summary: "滤波延迟、状态估计与电机的性能边界。",
  level: "advanced",
  estimatedTime: "3h",
  concepts: ["state-estimation", "sampling", "feedback", "saturation"],
  technologies: ["IMU", "motor"],
  relations: [
    { target: "control.pid", type: "required" },
    { target: "embedded.timers-dma", type: "recommended" }
  ],
  parts: [{ title: "估计与执行器约束", path: "index.md" }]
} satisfies NodeDefinition
