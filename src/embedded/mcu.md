---
title: MCU、寄存器与中断
level: 核心
prerequisites: [/programming/c-runtime, /foundations/debugging]
next: [/embedded/drivers, /embedded/rtos, /practice/bring-up]
tags: [MCU, 寄存器, 中断]
estimated_time: 4h
---

# MCU、寄存器与中断

<p class="node-meta">核心 · 先修：C 运行模型、调试方法 · 下一步：驱动、RTOS、板级调试</p>

## 为什么需要它

库函数可以提高效率，但硬件现象最终由时钟、寄存器配置、引脚复用和中断时序决定。读懂这些层，才能跨芯片和库迁移。

## 最小原理模型

- 外设寄存器是映射到地址空间的硬件状态；一次读写可能触发硬件语义，不等于普通内存变量。
- 时钟树决定外设实际工作频率；“配置了 1 kHz”必须通过时钟源和分频计算验证。
- 中断是硬件请求 CPU 临时处理事件的机制；优先级、屏蔽、嵌套和处理时长共同决定响应延迟。
- GPIO 的复用、输入输出模式、上下拉和电气连接必须同时成立，信号才可能正确。

## 学习方向

用一颗实际 MCU 的参考手册配合数据手册学习 RCC、GPIO、定时器、DMA、NVIC 和启动流程。优先读“功能描述、寄存器说明、时序限制”，而非从寄存器位表开始。

推荐检索：`STM32 reference manual GPIO timer NVIC`、`memory mapped IO`、`interrupt latency embedded`。

## 理解检查

1. 为什么“中断优先级数值更小”是否更高必须查具体内核/库的规则？
2. 中断服务函数为什么通常不应执行长时间阻塞操作？
3. PWM 频率由哪些时钟与计数参数共同决定？
4. 读写一个状态寄存器为什么可能有副作用？

## 微型实验

用定时器翻转 LED 或输出 PWM，手算目标频率并用逻辑分析仪/示波器测量。误差能解释到时钟源、分频和测量精度即完成。
