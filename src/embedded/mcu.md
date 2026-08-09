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

## 用途

硬件行为由时钟、寄存器、引脚复用和中断时序决定。库函数只封装这些配置；理解底层后才能跨平台迁移。

## 要点

- 外设寄存器是映射到地址空间的硬件状态；一次读写可能触发硬件语义，不等于普通内存变量。
- 时钟树决定外设实际工作频率；“配置了 1 kHz”必须通过时钟源和分频计算验证。
- 中断是硬件请求 CPU 临时处理事件的机制；优先级、屏蔽、嵌套和处理时长共同决定响应延迟。
- GPIO 的复用、输入输出模式、上下拉和电气连接必须同时成立，信号才可能正确。

## 延伸

结合一颗实际 MCU 的数据手册和参考手册，学习 RCC、GPIO、定时器、DMA、NVIC 与启动流程。阅读顺序：功能描述、时序限制、寄存器字段。

推荐检索：`STM32 reference manual GPIO timer NVIC`、`memory mapped IO`、`interrupt latency embedded`。

## 检查题

1. 为什么“中断优先级数值更小”是否更高必须查具体内核/库的规则？
2. 中断服务函数为什么通常不应执行长时间阻塞操作？
3. PWM 频率由哪些时钟与计数参数共同决定？
4. 读写一个状态寄存器为什么可能有副作用？

## 实验

用定时器翻转 LED 或输出 PWM。手算频率，再用逻辑分析仪或示波器测量；解释时钟源、分频和测量精度造成的误差。
