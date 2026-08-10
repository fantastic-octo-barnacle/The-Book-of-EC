---
title: 程序与构建
prev: false
next: false
---

# 程序与构建

| 现象               | 首要观测                               | 排查边界                             | 相关节点                                                                                                 |
| ------------------ | -------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| 改了代码却没有效果 | 实际构建目录、目标、产物时间和烧录文件 | 编辑内容是否进入当前构建与下载链路   | [命令行基础](/nodes/engineering/shell-basics/)、[Git 状态模型](/nodes/engineering/git-model/)            |
| 编译通过但链接失败 | 缺失或重复符号、参与链接的目标文件与库 | 声明、定义、编译单元和链接输入       | [翻译与链接](/nodes/programming/translation-linking/)                                                    |
| 程序跑飞或偶发崩溃 | 断言、调用栈、越界位置和对象有效期     | 指针指向的对象是否仍然存在且在边界内 | [对象与生命周期](/nodes/programming/object-lifetime/)、[指针与数组](/nodes/programming/pointers-arrays/) |
| 加日志后故障消失   | 日志前后的时序、栈占用和优化等级       | 观测是否改变了调度、延迟或内存布局   | [调试与测量](/nodes/engineering/debugging/)、[RTOS 并发基础](/nodes/embedded/rtos/)                      |
| 多任务数据偶发错误 | 读写者、执行上下文和最小竞争窗口       | 共享状态是否具有明确的同步与所有权   | [RTOS 并发基础](/nodes/embedded/rtos/)、[对象与生命周期](/nodes/programming/object-lifetime/)            |
