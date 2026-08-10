---
title: 问题排查
prev: false
next: false
---

# 问题排查

从现象进入，但不要止于“解决了”。这里记录排查入口，原理和验证方法仍属于学习节点。

<div class="capability-map">
  <a href="/problems/software-build"><strong>程序与构建</strong><span>构建失败、改动不生效、崩溃与竞态。</span></a>
  <a href="/problems/hardware-bring-up"><strong>硬件与上电</strong><span>无法启动、无法下载与外设无响应。</span></a>
  <a href="/problems/communication"><strong>通信</strong><span>乱码、丢帧、失步与数据异常。</span></a>
  <a href="/problems/control-integration"><strong>控制与联调</strong><span>不转、反向、振荡、漂移与整机异常。</span></a>
</div>

## 先做四件事

1. 写下可重复的现象、版本、输入与环境，而不是解释或猜测。
2. 明确最后一个已知正常的边界：供电、引脚、驱动、数据、控制量或执行器。
3. 选择能区分两种假设的最小观测。
4. 修复后用反例或回归测试确认，不以“暂时好了”为结论。
