---
title: RTOS 与并发
level: 进阶
prerequisites: [/embedded/mcu, /programming/c-runtime]
next: [/practice/subsystems]
tags: [RTOS, 并发, 实时性]
estimated_time: 4h
---

# RTOS 与并发

<p class="node-meta">进阶 · 先修：MCU、C 运行模型 · 下一步：子系统集成</p>

## 用途

RTOS 提供调度、同步和通信机制；实时性与正确性仍取决于共享状态、最坏执行时间和优先级设计。

## 要点

- 任务在调度器的规则下轮流运行；周期、优先级和阻塞原因决定何时获得 CPU。
- 互斥锁保护临界区，信号量表达可用数量或事件，队列表达数据交接；它们不可互换地滥用。
- 竞争条件来自不受控的交错执行；原子性、可见性和顺序需要分别思考。

## 延伸

从项目使用的 RTOS 文档学习 task、queue、mutex、notification 和 ISR-safe API；再学习优先级反转、栈溢出检测和时序分析。

推荐检索：`FreeRTOS task notification mutex queue`、`priority inversion`、`race condition embedded`。

## 检查题

1. 为什么用 `volatile` 不能让 `count++` 成为线程安全操作？
2. 高优先级任务等待低优先级任务持有的锁时，可能发生什么？
3. 哪些 API 可在中断中调用，为什么要看其 ISR 版本？

## 实验

建立两个任务，通过队列传递递增计数；改为共享变量后观察错误，再使用合适的同步原语修复并说明选择依据。
