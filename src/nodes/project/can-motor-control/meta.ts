import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "project.can-motor-control",
  title: "CAN 电机速度闭环",
  summary: "通过 CAN 驱动实际电机，实现带安全约束的离散速度闭环。",
  level: "integration",
  estimatedTime: "按项目安排",
  concepts: [
    "driver",
    "bus-topology",
    "protocol",
    "feedback",
    "PID",
    "sampling",
    "saturation",
    "asynchronous-programming"
  ],
  technologies: [
    "Rust",
    "Cargo",
    "Embassy",
    "probe-rs",
    "STM32",
    "MCU",
    "RoboMaster",
    "CAN",
    "motor"
  ],
  relations: [{ target: "project.desktop-text-statistics", type: "recommended" }],
  parts: [{ title: "CAN 电机速度闭环", path: "index.md" }]
} satisfies NodeDefinition
