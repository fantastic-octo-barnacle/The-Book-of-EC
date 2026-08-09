---
title: 子系统学习入口
level: 综合
prerequisites: [/embedded/drivers, /control/feedback, /communication/protocols]
next: []
tags: [RoboMaster, 底盘, 云台, 集成]
estimated_time: 持续
---

# 子系统学习入口

<p class="node-meta">综合 · 先修：驱动、反馈控制、协议 · 下一步：按项目任务迭代</p>

## 入口

| 子系统 | 应明确的链路 | 相关主题 |
| --- | --- | --- |
| 电机与底盘 | 指令 → 解算 → 速度/电流命令 → 反馈 | [反馈控制](/control/feedback)、[估计与电机](/control/estimation) |
| 云台/机构 | 目标 → 位置/姿态估计 → 级联控制 → 执行器 | [反馈控制](/control/feedback)、[MCU](/embedded/mcu) |
| 板间通信 | 产生消息 → 总线 → 缓冲/解析 → 消费者 | [总线](/communication/buses)、[协议](/communication/protocols) |
| 传感器 | 电气连接 → 采样/驱动 → 标定 → 状态估计 | [驱动](/embedded/drivers)、[估计](/control/estimation) |

## 联调顺序

1. 分层观测：供电/波形、原始数据、解析结果、控制量、执行器输出。
2. 固定输入或采用低风险工况，检查单位、坐标系、方向和范围。
3. 一次只接入一个闭环或通信源，确认后再逐层合并。
4. 记录复现条件、日志/波形和结论，并更新[问题索引](/problems/)。

## 检查题

1. 一台电机反向时，为什么不能只改 PID 的符号而不检查编码器、坐标系和功率级？
2. 整机联调中，如何区分控制器问题与反馈数据问题？
3. 为什么每个跨板消息都应能追踪到来源、时间和单位？
