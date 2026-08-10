---
{
  "id": "communication.serial-buses",
  "title": "串行总线",
  "summary": "UART、SPI、I²C 与 CAN 的电气和时序模型。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["bus-topology", "synchronization", "logic-level"],
  "technologies": ["UART", "SPI", "I2C", "CAN", "MCU"],
  "relations":
    [
      { "target": "embedded.gpio", "type": "required" },
      { "target": "embedded.drivers", "type": "recommended" }
    ],
  "parts": []
}
---

# 串行总线

## 要点

- UART 是异步字节流，双方需约定波特率与帧格式。
- SPI 由时钟与片选界定传输；CPOL/CPHA 定义采样关系。
- I²C 的上拉和时序、CAN 的终端与位时序都属于系统约束。

## 检查题

UART 两端波特率偏差为何可能间歇出错？CAN 总线为什么通常在两端终端匹配？
