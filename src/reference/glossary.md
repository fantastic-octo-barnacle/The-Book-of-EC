---
title: 术语与检索词
prev: false
next: false
---

# 术语与检索词

| 中文概念        | 常用英文                           | 检索时应加的上下文       |
| --------------- | ---------------------------------- | ------------------------ |
| 存储期/生命周期 | storage duration / object lifetime | C, C++                   |
| 未定义行为      | undefined behavior                 | C compiler               |
| 内存映射 I/O    | memory-mapped I/O                  | MCU register             |
| 中断延迟        | interrupt latency                  | Cortex-M / RTOS          |
| 优先级反转      | priority inversion                 | mutex RTOS               |
| 积分饱和        | integrator windup                  | PID anti-windup          |
| 相位延迟        | phase delay                        | low-pass filter control  |
| 仲裁            | arbitration                        | CAN bus                  |
| 帧同步          | frame synchronization              | byte stream protocol     |
| 背压            | backpressure                       | producer consumer buffer |

检索公式：`英文术语 + 具体平台/现象 + official/manual/example`。例如：`STM32 timer clock tree reference manual`，而不是只搜索“STM32 PWM”。
