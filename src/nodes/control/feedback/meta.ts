import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "control.feedback",
  title: "反馈与稳定性",
  summary: "闭环结构、误差修正与性能约束。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["feedback", "sampling", "saturation"],
  technologies: ["motor"],
  relations: [{ target: "control.sampling-model", type: "required" }],
  parts: [
    { title: "反馈与稳定性", path: "index.md" },
    { title: "实验", path: "practice.md" }
  ]
} satisfies NodeDefinition
