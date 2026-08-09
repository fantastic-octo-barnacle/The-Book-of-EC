---
layout: home

hero:
  name: "The Book of EC"
  text: "嵌入式电控的学习导航"
  tagline: 不替你读完资料；帮你知道为什么学、学什么，以及如何确认自己真的理解了。
  actions:
    - theme: brand
      text: 从推荐路线开始
      link: /paths
    - theme: alt
      text: 我遇到问题了
      link: /problems/

features:
  - title: 原理先于套路
    details: 用最小模型理解代码、硬件和控制行为，而不是只记 API 或参数。
  - title: 按依赖关系学习
    details: 每个节点都标出先修、下一步和可选分支；可以随时从当前问题切入。
  - title: 学了就验证
    details: 用原理问题与小实验检查理解，避免“看懂了但不会用”。
---

## 从你的目标进入

<div class="capability-map">
  <a href="/paths#开发起步"><strong>我想读懂并改动工程</strong><span>命令行 → Git → C 运行模型 → 调试</span></a>
  <a href="/paths#嵌入式主线"><strong>我想让一块板子可靠地工作</strong><span>电子基础 → MCU → 外设驱动 → RTOS</span></a>
  <a href="/paths#电控主线"><strong>我想让机构稳定地动起来</strong><span>数学模型 → 反馈控制 → 估计 → 电机</span></a>
  <a href="/communication/"><strong>我想让设备互相说话</strong><span>UART/CAN → 协议 → 抓包与诊断</span></a>
  <a href="/practice/"><strong>我正在做 RoboMaster 工程</strong><span>安全上电 → 板级调试 → 子系统集成</span></a>
  <a href="/problems/"><strong>我已经卡住了</strong><span>从构建、跑飞、丢包、抖动等现象反查知识节点</span></a>
</div>

## 如何使用这本书

1. 先选一条[推荐路线](/paths)，但不必强迫自己线性读完。
2. 到某个节点时，先回答“理解检查”，再按提示查阅外部资料。
3. 用小实验观察现象；无法解释时，沿页面的“先修”链接回退。
4. 项目中卡住时，直接查[问题索引](/problems/)，再回到相应原理节点。

::: tip 这里不是什么
这里不会逐行教授 HAL、C++ 或 PID，也不收录唯一正确的代码模板。它提供的是学习决策、概念边界、关键词和验证方式。
:::
