---
title: C++ 工程能力
level: 进阶
prerequisites: [/programming/c-runtime]
next: [/embedded/drivers, /embedded/rtos]
tags: [C++, RAII, 抽象]
estimated_time: 3h
---

# C++ 工程能力

<p class="node-meta">进阶 · 先修：C 运行模型 · 下一步：驱动、RTOS</p>

## 为什么需要它

C++ 能把资源约束和接口约束写进类型系统，但在 MCU 上仍要关注代码尺寸、异常、动态分配和初始化顺序。抽象是否合适取决于成本是否透明。

## 最小原理模型

- RAII 用对象生命周期绑定资源获取与释放；它依赖明确的所有权与析构时机。
- 值语义、引用语义和所有权不是同一个概念；先回答“谁负责释放/关闭”，再选择类型。
- 模板和内联通常在编译期展开，带来零运行时分发的可能，也可能带来代码膨胀。

## 学习方向

学习构造/析构、`const`、引用、移动语义、智能指针和模板基础。针对项目配置确认是否启用异常、RTTI 与堆分配，再决定可用子集。

推荐检索：`C++ RAII embedded`, `C++ object lifetime`, `C++ Core Guidelines resource management`。

## 理解检查

1. RAII 为什么不能替代中断上下文中的时序判断？
2. `std::unique_ptr` 表达了什么所有权约束？
3. 为什么在嵌入式项目中使用动态分配前要先检查碎片与失败策略？
