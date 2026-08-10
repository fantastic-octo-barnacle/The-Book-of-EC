import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "programming.pointers-arrays",
  title: "指针与数组",
  summary: "地址运算、数组退化与边界。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["pointer", "array", "memory"],
  technologies: ["C"],
  relations: [{ target: "programming.object-lifetime", type: "required" }],
  parts: [{ title: "指针与数组", path: "index.md" }]
} satisfies NodeDefinition
