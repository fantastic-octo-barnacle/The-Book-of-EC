import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "communication.serial-buses",
  title: "串行总线",
  summary: "UART、SPI、I²C 与 CAN 的电气和时序模型。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["bus-topology", "synchronization", "logic-level"],
  technologies: ["UART", "SPI", "I2C", "CAN", "MCU"],
  relations: [
    { target: "embedded.gpio", type: "required" },
    { target: "embedded.drivers", type: "recommended" }
  ],
  parts: [{ title: "串行总线", path: "index.md" }]
} satisfies NodeDefinition
