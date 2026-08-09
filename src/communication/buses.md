---
title: 串行与现场总线
level: 核心
prerequisites: [/embedded/mcu, /embedded/drivers]
next: [/communication/protocols, /practice/subsystems]
tags: [UART, CAN, SPI, I2C]
estimated_time: 3h
---

# 串行与现场总线

<p class="node-meta">核心 · 先修：MCU、驱动分层 · 下一步：协议、子系统</p>

## 为什么需要它

UART、CAN、SPI、I²C 的选择不仅是“速度快慢”，还取决于拓扑、同步方式、电平、电气抗扰和错误处理。理解层次才能用测量工具定位丢包。

## 最小原理模型

- UART 是异步点对点字节流，双方必须约定波特率、帧格式与字节边界恢复策略。
- SPI 以时钟同步数据，片选定义事务边界；其模式由时钟极性与相位共同决定。
- I²C 是带寻址和仲裁的共享总线，需要上拉与时序约束。
- CAN 使用差分总线、仲裁和错误处理；终端电阻、线缆与位时序同协议层一样重要。

## 学习方向

用示波器或逻辑分析仪观察实际波形，再阅读 MCU 外设章节。对 CAN 应额外学习位填充、仲裁、错误帧与终端匹配。

推荐检索：`UART framing error baud rate`, `SPI CPOL CPHA`, `I2C pull-up resistor`, `CAN bus termination arbitration`。

## 理解检查

1. 两端 UART 波特率略有偏差时，为什么可能先在某些字节出错？
2. SPI 的片选若过早释放，接收端会如何理解事务？
3. CAN 总线两端通常为何各有一个终端电阻？
4. 逻辑分析仪显示“有波形”能否证明电平和时序满足所有器件限制？

## 微型实验

对一段已知 UART 或 SPI 传输抓取波形，标出起始/停止位或时钟边沿与数据采样点。能用配置解释解码结果即完成。
