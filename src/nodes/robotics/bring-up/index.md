---
{
  "id": "robotics.bring-up",
  "title": "板级上电与启动",
  "summary": "按供电、复位、时钟、下载和最小输出分层验证。",
  "level": "core",
  "estimatedTime": "2h",
  "concepts": ["power", "reset", "startup", "debugging"],
  "technologies": ["RoboMaster", "STM32", "MCU"],
  "relations":
    [
      { "target": "embedded.circuit-basics", "type": "required" },
      { "target": "embedded.clock-reset", "type": "required" },
      { "target": "engineering.debugging", "type": "required" }
    ],
  "parts": []
}
---

# 板级上电与启动

## 要点

- 首次上电必须设置限流并隔离高功率执行器。
- 依次确认电源轨、复位、时钟、调试连接和最小输出。
- 每层验证失败后，只增加一项区分度高的测量。

## 检查题

下载可用而串口无输出，应按什么顺序排查？为什么不应跳过限流直接带电机上电？
