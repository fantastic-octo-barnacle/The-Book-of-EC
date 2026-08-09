---
{
  "id": "communication.protocol-framing",
  "title": "帧与协议解析",
  "summary": "消息边界、校验、恢复同步与缓冲区。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["protocol", "frame", "CRC", "synchronization", "memory"],
  "technologies": ["CAN", "UART"],
  "relations": [{ "target": "communication.serial-buses", "type": "required" }, { "target": "programming.pointers-arrays", "type": "recommended" }],
  "parts": []
}
---

# 帧与协议解析

## 要点

- 一次读取的字节数与协议帧边界无必然关系。
- CRC 检测损坏，不负责认证来源或恢复丢失消息。
- 解析器必须在截断、垃圾数据和长度异常后恢复同步。

## 检查题

长度字段异常时如何避免永久失步？接收速率高于消费速率时应采用什么策略？
