import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "engineering.debugging",
  title: "调试与测量",
  summary: "以观测区分假设，并控制观测本身的影响。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["debugging", "latency"],
  technologies: ["MCU"],
  relations: [{ target: "programming.object-lifetime", type: "recommended" }],
  parts: [{ title: "调试与测量", path: "index.md" }]
} satisfies NodeDefinition
