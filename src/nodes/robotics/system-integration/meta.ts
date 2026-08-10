import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "robotics.system-integration",
  title: "系统联调",
  summary: "按层观测输入、数据、控制量与执行器输出。",
  level: "integration",
  estimatedTime: "持续",
  concepts: ["debugging", "protocol", "feedback"],
  technologies: ["RoboMaster", "CAN", "motor"],
  relations: [
    { target: "embedded.drivers", type: "required" },
    { target: "communication.protocol-framing", type: "required" },
    { target: "control.pid", type: "required" },
    { target: "robotics.bring-up", type: "recommended" }
  ],
  parts: [{ title: "系统联调", path: "index.md" }]
} satisfies NodeDefinition
