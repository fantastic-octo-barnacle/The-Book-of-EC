import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "control.pid",
  title: "离散 PID 与饱和",
  summary: "比例、积分、微分项及积分饱和处理。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["PID", "feedback", "saturation", "sampling"],
  technologies: ["motor"],
  relations: [{ target: "control.feedback", type: "required" }],
  parts: [{ title: "离散 PID 与饱和", path: "index.md" }]
} satisfies NodeDefinition
