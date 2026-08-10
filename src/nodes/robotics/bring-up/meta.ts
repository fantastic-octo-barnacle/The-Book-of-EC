import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "robotics.bring-up",
  title: "板级上电与启动",
  summary: "按供电、复位、时钟、下载和最小输出分层验证。",
  level: "core",
  estimatedTime: "2h",
  concepts: ["power", "reset", "startup", "debugging"],
  technologies: ["RoboMaster", "STM32", "MCU"],
  relations: [
    { target: "embedded.circuit-basics", type: "required" },
    { target: "embedded.clock-reset", type: "required" },
    { target: "engineering.debugging", type: "required" }
  ],
  parts: [{ title: "板级上电与启动", path: "index.md" }]
} satisfies NodeDefinition
