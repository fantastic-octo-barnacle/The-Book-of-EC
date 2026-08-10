import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "programming.translation-linking",
  title: "翻译与链接",
  summary: "源文件如何成为可执行程序。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["compilation", "linking"],
  technologies: ["C", "C++"],
  relations: [{ target: "engineering.shell-basics", type: "required" }],
  parts: [{ title: "翻译与链接", path: "index.md" }]
} satisfies NodeDefinition
