---
{
  "id": "control.sampling-model",
  "title": "采样与系统模型",
  "summary": "对象、单位、采样周期与离散时间。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["sampling", "feedback"],
  "technologies": ["IMU", "motor"],
  "relations": [{ "target": "embedded.circuit-basics", "type": "recommended" }],
  "parts": []
}
---

# 采样与系统模型

## 要点

- 控制问题先定义对象、输入、输出、状态、单位和坐标系。
- 数字控制器按采样周期工作；计算、通信和执行器均引入延迟。
- 原始传感器读数不必然等于控制所需状态。

## 检查题

速度环的输入、输出和反馈分别是什么？改变采样周期后，原控制参数为什么不能直接复用？
