---
title: 程序与构建问题
---

# 程序与构建问题

| 现象 | 先检查 | 回到原理 |
| --- | --- | --- |
| 改了代码却没有效果 | 实际构建目录、目标、烧录文件、提交/分支 | [命令行](/foundations/command-line)、[Git](/foundations/git) |
| 编译通过但链接失败 | 声明/定义、目标文件、库的链接顺序 | [C 运行模型](/programming/c-runtime) |
| 程序跑飞或偶发崩溃 | 栈、越界、生命周期、断言、调用栈 | [C 运行模型](/programming/c-runtime)、[调试](/foundations/debugging) |
| 加打印后故障消失 | 时序、栈占用、竞态、优化等级 | [调试](/foundations/debugging)、[RTOS](/embedded/rtos) |
| 多任务数据偶发错误 | 共享状态、原子性、队列/锁、ISR 上下文 | [RTOS](/embedded/rtos) |

::: warning
不要先清缓存、重装工具或复制别人的配置。先保存报错全文、实际执行命令和最小复现条件；这些是能缩小问题范围的证据。
:::
