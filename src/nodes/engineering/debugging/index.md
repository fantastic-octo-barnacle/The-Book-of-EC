---
{
  "id": "engineering.debugging",
  "title": "调试与测量",
  "summary": "以观测区分假设，并控制观测本身的影响。",
  "level": "core",
  "estimatedTime": "2h",
  "concepts": ["debugging", "latency"],
  "technologies": ["MCU"],
  "relations": [{ "target": "programming.object-lifetime", "type": "recommended" }],
  "parts": []
}
---

# 调试与测量

## 要点

- 记录现象、假设、观测和结论；一次只改变一个变量。
- 断点、日志、示波器与逻辑分析仪的时间分辨率和侵入性不同。
- 从输入、状态、输出的边界开始测量。

## 检查题

日志使故障消失，说明了什么？PWM 已输出而电机不转，下一步应测量什么？
