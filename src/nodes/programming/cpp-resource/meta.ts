import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "programming.cpp-resource",
  title: "C++ 资源管理",
  summary: "RAII、所有权与嵌入式约束。",
  level: "advanced",
  estimatedTime: "3h",
  concepts: ["ownership", "lifetime"],
  technologies: ["C++"],
  relations: [{ target: "programming.object-lifetime", type: "required" }],
  parts: [{ title: "C++ 资源管理", path: "index.md" }]
} satisfies NodeDefinition
