---
{
  "id": "control.estimation-actuation",
  "title": "估计与执行器约束",
  "summary": "滤波延迟、状态估计与电机的性能边界。",
  "level": "advanced",
  "estimatedTime": "3h",
  "concepts": ["state-estimation", "sampling", "feedback", "saturation"],
  "technologies": ["IMU", "motor"],
  "relations":
    [
      { "target": "control.pid", "type": "required" },
      { "target": "embedded.timers-dma", "type": "recommended" }
    ],
  "parts": []
}
---

# 估计与执行器约束

## 要点

- 滤波降低噪声，也引入相位延迟。
- 状态估计结合模型与测量，并应明确不确定性来源。
- 电流、转矩、转速、温升和机械负载共同限定执行器能力。

## 检查题

低通滤波为何可能降低稳定裕度？电流限制为何会影响位置环的瞬态性能？
