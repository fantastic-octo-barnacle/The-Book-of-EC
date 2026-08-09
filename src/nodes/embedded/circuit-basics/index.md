---
{
  "id": "embedded.circuit-basics",
  "title": "电路与电平基础",
  "summary": "供电、参考地、逻辑电平与信号完整性的基本约束。",
  "level": "intro",
  "estimatedTime": "2h",
  "concepts": ["power", "logic-level"],
  "technologies": ["MCU"],
  "relations": [],
  "parts": []
}
---

# 电路与电平基础

## 要点

- 电压是两点间的量；测量与通信需要明确参考地。
- 逻辑高低电平必须满足双方输入输出阈值。
- 电源额定电压之外，还需关注电流、纹波、极性和上电过程。

## 检查题

两个模块未共地时，UART 电平为何不可靠？限流电源在首次上电时解决什么问题？
