---
{
  "id": "embedded.clock-reset",
  "title": "时钟、复位与启动",
  "summary": "MCU 从上电到执行应用程序的路径。",
  "level": "core",
  "estimatedTime": "2h",
  "concepts": ["clock", "reset", "startup"],
  "technologies": ["STM32", "MCU"],
  "relations": [{ "target": "embedded.circuit-basics", "type": "required" }, { "target": "programming.translation-linking", "type": "recommended" }],
  "parts": []
}
---

# 时钟、复位与启动

## 要点

- 时钟树决定 CPU 与外设的实际频率。
- 复位状态、启动向量和时钟初始化是独立故障点。
- 调试器连接成功不等于应用程序已经运行。

## 检查题

目标频率的计算需要哪些时钟和分频参数？下载正常但无串口输出，应先区分哪些层次？
