---
{
  "id": "control.pid",
  "title": "离散 PID 与饱和",
  "summary": "比例、积分、微分项及积分饱和处理。",
  "level": "core",
  "estimatedTime": "2h",
  "concepts": ["PID", "feedback", "saturation", "sampling"],
  "technologies": ["motor"],
  "relations": [{ "target": "control.feedback", "type": "required" }],
  "parts": []
}
---

# 离散 PID 与饱和

## 要点

- P、I、D 分别响应当前误差、累计误差和误差变化。
- 离散实现必须明确采样周期、导数噪声和输出限幅。
- 限幅后积分项仍累积会产生积分饱和。

## 检查题

输出受限时积分项如何影响恢复过程？为何 D 项常对测量噪声敏感？
