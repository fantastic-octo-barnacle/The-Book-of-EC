---
title: C 语言运行模型
level: 核心
prerequisites: [/foundations/command-line]
next: [/foundations/debugging, /embedded/mcu, /programming/cpp]
tags: [C, 内存, 编译链接]
estimated_time: 4h
---

# C 语言运行模型

<p class="node-meta">核心 · 先修：命令行 · 下一步：调试、MCU、C++</p>

## 用途

C 直接暴露内存与硬件，也要求程序员负责对象生命周期、地址有效性和构建过程。

## 要点

- 变量是有类型、大小、存储期和生命周期的对象；指针只是保存地址的值，不自动拥有对象。
- 栈、静态存储区和动态分配是不同的生命周期策略，不是“不同速度的内存”这么简单。
- 预处理、编译、汇编、链接依次把源文件变为程序；声明解决“名字和类型”，定义提供实体。
- 未定义行为不是“随机但可复现的功能”，而是编译器不再需要按你的直觉解释代码。

## 延伸

先学习对象生命周期、数组与指针、`const`、结构体布局、函数调用和链接错误；再扩展到 ABI、`volatile`、内联汇编与优化。

推荐检索：`C object lifetime`, `C pointer array difference`, `C translation phases`, `undefined behavior`；英文深入以 C 标准草案和编译器文档为准。

## 检查题

1. 返回局部变量地址为什么有风险？“当前看起来能用”能否证明正确？
2. `extern` 声明与定义分别解决什么问题？
3. 为什么 `volatile` 不能解决多任务之间的原子性或顺序问题？
4. 数组传给函数后，为什么无法在函数内用 `sizeof` 得到原数组长度？

## 实验

编写一个返回局部变量地址的小程序，在不同优化等级下构建并观察警告与行为。根据生命周期解释为什么任何运行结果都不可靠。
