---
title: 调试方法
level: 核心
prerequisites: [/foundations/command-line, /programming/c-runtime]
next: [/embedded/mcu, /practice/bring-up]
tags: [调试, 测量, GDB]
estimated_time: 2h
---

# 调试方法

<p class="node-meta">核心 · 先修：命令行、C 运行模型 · 下一步：MCU、板级调试</p>

## 为什么需要它

调试不是尝试随机修改，而是用可观察证据逐步排除假设。嵌入式中，日志、断点、示波器和逻辑分析仪都只是不同带宽和侵入性的观测手段。

## 最小原理模型

- 现象、假设、观测、结论必须分开记录；一次实验最好只改变一个变量。
- 观测会改变系统：断点暂停时间，日志占用时序，探头带来负载。
- 先验证边界：输入是否到达、状态是否改变、输出是否产生，再进入内部细节。

## 学习方向

学习断点、调用栈、watchpoint、日志等级，以及万用表/示波器/逻辑分析仪各能证明什么。不要把“加打印后好了”当作根因。

推荐检索：`scientific debugging hypothesis observation`、`GDB breakpoint watchpoint`、`示波器 触发 调试`。

## 理解检查

1. 程序加日志后故障消失，能否说明日志修复了问题？为什么？
2. 若 PWM 已正确输出而电机不转，下一条最有区分度的测量是什么？
3. 为什么“复现步骤”是缺陷报告的一部分？

## 微型实验

选一个会被周期调用的函数，分别用断点和计数日志确认调用频率。比较两种方法对时序的影响，并写下你会信任哪一个结论。
