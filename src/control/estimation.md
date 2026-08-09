---
title: 滤波、估计与电机
level: 进阶
prerequisites: [/control/feedback, /embedded/mcu]
next: [/practice/subsystems]
tags: [滤波, 状态估计, 电机]
estimated_time: 4h
---

# 滤波、估计与电机

<p class="node-meta">进阶 · 先修：反馈控制、MCU · 下一步：子系统集成</p>

## 用途

控制器使用状态而不是原始 ADC 或编码器读数。噪声、量化、漂移和延迟直接限制控制性能。

## 要点

- 滤波在抑制某些频率成分时也会引入相位延迟；“更平滑”不必然“更好控制”。
- 状态估计结合模型和测量，关键在于各自的不确定性；融合不是简单平均。
- 电机电压/电流、转矩、转速和机构负载相互耦合，电流限制和温升也是控制约束。

## 延伸

比较滑动平均、一阶低通和互补滤波的适用条件后，再进入卡尔曼滤波、FOC 及电流/速度/位置环。

推荐检索：`low pass filter phase delay control`, `complementary filter IMU`, `DC motor torque current model`, `FOC overview`。

## 检查题

1. 为什么对速度反馈做更强低通可能反而降低稳定裕度？
2. 编码器分辨率有限时，低速速度估计会出现什么问题？
3. 为什么电流限制会改变位置环可达到的瞬态性能？

## 实验

采集一段静止传感器数据，比较原始数据与一阶低通输出。测量噪声幅度和阶跃响应延迟，说明对控制回路的影响。
