import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "programming.object-lifetime",
  title: "对象与生命周期",
  summary: "对象有效性、存储期与资源所有权。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["memory", "object", "lifetime", "ownership", "undefined-behavior"],
  technologies: ["C", "C++"],
  relations: [{ target: "programming.translation-linking", type: "required" }],
  parts: [
    { title: "对象与生命周期", path: "index.md" },
    { title: "原理", path: "principles.md" },
    { title: "练习", path: "practice.md" }
  ]
} satisfies NodeDefinition
