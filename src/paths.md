---
title: 推荐路线
---

# 推荐路线

路线给出常用依赖顺序。实际任务可从任意节点开始，再补齐先修知识。

## 开发起步

<div class="path-card">
<strong>命令行与 Linux → Git 协作 → C 语言运行模型 → 调试方法 → C++ 工程能力</strong><br>
结果：能够获取、构建、修改并定位已有嵌入式工程中的问题。
</div>

- [命令行与 Linux](/foundations/command-line)：文件、进程、标准输入输出。
- [Git 协作](/foundations/git)：工作区、暂存区、提交历史。
- [C 语言运行模型](/programming/c-runtime)：内存、指针、编译链接。
- [调试方法](/foundations/debugging)：用证据验证假设。

## 嵌入式主线

<div class="path-card">
<strong>必要电路基础 → C 运行模型 → MCU/中断 → 外设与驱动 → RTOS 与并发 → 板级调试</strong><br>
结果：能够解释输入经硬件、固件和调度后如何形成输出。
</div>

- 补齐电压、电流、时钟、采样、逻辑电平后，学习[MCU、寄存器与中断](/embedded/mcu)。
- [外设与驱动分层](/embedded/drivers)：把外设视为有状态的硬件，而不是 API 集合。
- 存在多个任务或中断源后，学习[RTOS 与并发](/embedded/rtos)。

## 电控主线

<div class="path-card">
<strong>数学与物理最小基础 → 反馈控制 → 滤波/状态估计 → 电机与机构 → 整机联调</strong><br>
结果：能够将抖动、迟滞、超调和漂移转化为模型与测量问题。
</div>

- 明确对象、输入、输出、单位和采样周期后，学习[反馈控制](/control/feedback)。
- 在调整控制器前，学习[滤波、估计与电机](/control/estimation)。
- 在[子系统学习入口](/practice/subsystems)进行整机联调。
