---
{
  'id': 'robotics.system-integration',
  'title': '系统联调',
  'summary': '按层观测输入、数据、控制量与执行器输出。',
  'level': 'integration',
  'estimatedTime': '持续',
  'concepts': ['debugging', 'protocol', 'feedback'],
  'technologies': ['RoboMaster', 'CAN', 'motor'],
  'relations':
    [
      { 'target': 'embedded.drivers', 'type': 'required' },
      { 'target': 'communication.protocol-framing', 'type': 'required' },
      { 'target': 'control.pid', 'type': 'required' },
      { 'target': 'robotics.bring-up', 'type': 'recommended' }
    ],
  'parts': []
}
---

# 系统联调

## 要点

- 分层观测供电/波形、原始数据、解析结果、控制量和执行器输出。
- 固定输入或使用低风险工况，逐项检查单位、方向、坐标系和范围。
- 一次只接入一个闭环或通信源，保存复现条件与波形记录。

## 检查题

电机反向时，为什么不能只反转 PID 符号？如何区分控制器错误与反馈错误？
