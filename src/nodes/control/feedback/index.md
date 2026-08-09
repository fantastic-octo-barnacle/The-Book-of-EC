---
{
  "id": "control.feedback",
  "title": "反馈与稳定性",
  "summary": "闭环结构、误差修正与性能约束。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["feedback", "sampling", "saturation"],
  "technologies": ["motor"],
  "relations": [{ "target": "control.sampling-model", "type": "required" }],
  "parts": [{ "title": "实验", "path": "practice", "type": "practice" }]
}
---

# 反馈与稳定性

## 要点

- 闭环将参考值、测量、控制器、对象和执行器连接起来。
- 提高增益可能减小误差，也可能降低稳定裕度。
- 噪声、延迟、饱和和负载是闭环设计的一部分。

## 检查题

为什么更强的反馈不一定更好？执行器饱和为何会改变瞬态响应？
