import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "control.sampling-model",
  title: "采样与系统模型",
  summary: "对象、单位、采样周期与离散时间。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["sampling", "feedback"],
  technologies: ["IMU", "motor"],
  relations: [{ target: "embedded.circuit-basics", type: "recommended" }],
  parts: [{ title: "采样与系统模型", path: "index.md" }]
} satisfies NodeDefinition
