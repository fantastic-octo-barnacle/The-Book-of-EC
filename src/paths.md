---
title: 推荐路线
---

# 推荐路线

路线是建议的依赖顺序，不是毕业清单。遇到实际任务可以从任意节点进入，再补齐缺口。

## 开发起步

<div class="path-card">
<strong>命令行与 Linux → Git 协作 → C 语言运行模型 → 调试方法 → C++ 工程能力</strong><br>
目标：能安全地获取、构建、修改并定位一个已有嵌入式工程的问题。
</div>

- 从[命令行与 Linux](/foundations/command-line)开始，先建立“文件、进程、标准输入输出”的模型。
- 接着学习[Git 协作](/foundations/git)，能够解释工作区、暂存区和提交历史的差异。
- 进入[C 语言运行模型](/programming/c-runtime)，理解内存、指针与编译链接。
- 每改一次代码都用[调试方法](/foundations/debugging)验证假设，而不依赖猜测。

## 嵌入式主线

<div class="path-card">
<strong>必要电路基础 → C 运行模型 → MCU/中断 → 外设与驱动 → RTOS 与并发 → 板级调试</strong><br>
目标：能解释一次输入如何经过硬件、固件和任务调度，最终产生可观察输出。
</div>

- 先建立电压、电流、时钟、采样和逻辑电平的最小模型，再阅读[MCU、寄存器与中断](/embedded/mcu)。
- 将每个外设当作有状态的硬件模块，而非一组库函数；继续到[外设与驱动分层](/embedded/drivers)。
- 有多个任务或中断来源后，再学习[RTOS 与并发](/embedded/rtos)。

## 电控主线

<div class="path-card">
<strong>数学与物理最小基础 → 反馈控制 → 滤波/状态估计 → 电机与机构 → 整机联调</strong><br>
目标：能把“抖、慢、超调、漂移”翻译成可验证的模型与测量问题。
</div>

- 先问清对象、输入、输出、单位和采样周期，再学习[反馈控制](/control/feedback)。
- 传感器读数不等于状态；在调控制器前学习[滤波、估计与电机](/control/estimation)。
- 最后回到[子系统学习入口](/practice/subsystems)进行整机联调。
