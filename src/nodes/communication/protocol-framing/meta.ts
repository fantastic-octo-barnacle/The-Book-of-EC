import type { NodeDefinition } from "#content/nodes.ts"

export default {
  id: "communication.protocol-framing",
  title: "帧与协议解析",
  summary: "消息边界、校验、恢复同步与缓冲区。",
  level: "core",
  estimatedTime: "3h",
  concepts: ["protocol", "frame", "CRC", "synchronization", "memory"],
  technologies: ["CAN", "UART"],
  relations: [
    { target: "communication.serial-buses", type: "required" },
    { target: "programming.pointers-arrays", type: "recommended" }
  ],
  parts: [{ title: "帧与协议解析", path: "index.md" }]
} satisfies NodeDefinition
