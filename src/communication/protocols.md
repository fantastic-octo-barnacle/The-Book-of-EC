---
title: 协议与诊断
level: 核心
prerequisites: [/communication/buses, /embedded/rtos]
next: [/practice/subsystems]
tags: [协议, CRC, 缓冲区, 诊断]
estimated_time: 3h
---

# 协议与诊断

<p class="node-meta">核心 · 先修：总线、RTOS · 下一步：子系统集成</p>

## 为什么需要它

物理总线传递的是比特或字节，协议才赋予它消息边界、含义、版本和错误恢复方式。协议设计应假定字节会丢失、重复、延迟或损坏。

## 最小原理模型

- 帧需要可恢复的边界、长度或编码规则，不能默认一次读取恰好得到一条消息。
- 校验只能提高“检测到损坏”的概率，不能自动纠正错误；序号、超时和确认服务于不同故障模型。
- 接收缓冲区是有限资源；生产速度超过消费速度时，必须有明确的背压、丢弃或故障策略。

## 学习方向

先阅读项目现有消息定义，画出发送、传输、接收、解析和消费者的全路径。之后学习 CRC、状态机解析、版本兼容和故障注入。

推荐检索：`framing byte stream protocol`, `CRC error detection`, `ring buffer producer consumer`, `protocol timeout sequence number`。

## 理解检查

1. 为什么 `read()` 返回的一段字节不能天然等于一帧协议？
2. CRC 校验通过，能否证明消息来自预期的发送者？
3. 接收端遇到长度字段异常时，怎样避免从此永久失去帧同步？

## 微型实验

为一个固定帧格式写状态机解析器，向输入中插入随机垃圾字节或截断帧。完成标准：它能丢弃坏帧，并在下一条合法帧恢复同步。
