---
{
  'id': 'embedded.rtos',
  'title': 'RTOS 并发基础',
  'summary': '任务调度、同步原语与实时性约束。',
  'level': 'advanced',
  'estimatedTime': '3h',
  'concepts': ['concurrency', 'shared-state', 'priority', 'synchronization'],
  'technologies': ['FreeRTOS', 'MCU'],
  'relations':
    [
      { 'target': 'embedded.interrupts', 'type': 'required' },
      { 'target': 'programming.object-lifetime', 'type': 'required' }
    ],
  'parts': []
}
---

# RTOS 并发基础

## 要点

- 调度、同步和通信是不同机制；RTOS 不自动保证实时性。
- 互斥锁保护临界区，队列传递数据，信号量表示事件或资源数量。
- `volatile` 不提供复合操作的原子性。

## 检查题

`count++` 为什么仍可能竞争？优先级反转在什么条件下发生？
