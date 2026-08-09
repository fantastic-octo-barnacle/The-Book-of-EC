---
title: 外设与驱动分层
level: 核心
prerequisites: [/embedded/mcu, /programming/c-runtime]
next: [/communication/buses, /practice/subsystems]
tags: [驱动, HAL, 分层]
estimated_time: 3h
---

# 外设与驱动分层

<p class="node-meta">核心 · 先修：MCU、C 运行模型 · 下一步：通信、子系统</p>

## 用途

驱动应在故障、重启和板型差异下保持可维护性；关键在接口边界、状态管理和错误处理。

## 要点

- 驱动层负责把硬件协议和时序封装为可测试的操作；业务层不应依赖寄存器细节。
- 初始化不是一次函数调用，而是从掉电到可用的状态转移，失败路径也必须定义。
- 数据就绪、超时、错误和重试是接口的一部分；只返回数据而不报告可信度会把问题推给上层。

## 延伸

阅读项目中一条完整数据路径：外设初始化 → 中断/DMA → 缓冲区 → 应用。比较寄存器层、HAL/LL 和业务驱动的职责。

推荐检索：`embedded driver layering`, `hardware abstraction layer design`, `DMA circular buffer`。

## 检查题

1. 为什么把所有外设代码写在 `main` 中会使故障更难定位？
2. 驱动接口为何要区分“没有新数据”和“硬件通信失败”？
3. DMA 完成中断到来时，应用如何知道缓冲区何时可安全读取？

## 实验

为 LED、按键或传感器定义最小接口：初始化、读取/设置、错误状态。上层只包含接口头文件，不依赖芯片寄存器名。
