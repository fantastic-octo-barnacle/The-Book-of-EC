import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "embedded.clock-reset",
  title: "时钟、复位与启动",
  summary: "MCU 从上电到执行应用程序的路径。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["clock", "reset", "startup"],
  technologies: ["STM32", "MCU"],
  relations: [
    { target: "embedded.circuit-basics", type: "required" },
    { target: "programming.translation-linking", type: "recommended" }
  ],
  parts: [{ title: "时钟、复位与启动", path: "index.md" }]
} satisfies NodeDefinition
