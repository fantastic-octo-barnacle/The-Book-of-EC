---
{
  'id': 'embedded.drivers',
  'title': '外设驱动边界',
  'summary': '初始化、状态、错误与硬件抽象。',
  'level': 'core',
  'estimatedTime': '2h',
  'concepts': ['driver', 'synchronization'],
  'technologies': ['MCU'],
  'relations':
    [
      { 'target': 'embedded.gpio', 'type': 'required' },
      { 'target': 'embedded.interrupts', 'type': 'recommended' }
    ],
  'parts': []
}
---

# 外设驱动边界

## 要点

- 驱动封装硬件协议、时序与错误状态；业务层不应引用寄存器。
- 初始化是状态转移，失败路径也要定义。
- “无新数据”与“硬件错误”必须由接口区分。

## 检查题

传感器驱动为何需要超时与错误状态？上层依赖寄存器名会带来什么问题？
