---
title: 命令行与 Linux
level: 入门
prerequisites: []
next: [/foundations/git, /programming/c-runtime]
tags: [Linux, shell, 工具]
estimated_time: 2h
---

# 命令行与 Linux

<p class="node-meta">入门 · 先修：无 · 下一步：Git 协作、C 运行模型</p>

## 用途

构建、下载、串口与版本管理都依赖文件、进程和标准输入输出。重点是命令读写的对象及失败方式。

## 要点

- 路径是定位文件的方式；相对路径由当前工作目录解释。
- 进程是正在运行的程序；退出码用来告诉调用者成功或失败。
- `stdin`、`stdout`、`stderr` 是三条独立的数据通道；管道只连接前一程序的标准输出与后一程序的标准输入。

## 延伸

先掌握目录/文件操作、权限、进程、重定向与管道。需要自动化时再学习变量、条件和循环。

推荐检索：`Linux command line filesystem process exit code`、`shell stdin stdout stderr`。中文先找系统化命令行入门，深入时对照 GNU coreutils 与 Bash 手册。

## 检查题

1. 为什么同一条相对路径命令在两个目录执行可能得到不同结果？
2. `command > out.txt 2>&1` 让哪两条数据流去往哪里？
3. 程序打印错误信息却返回 0，会给自动化脚本带来什么问题？

## 实验

在临时目录中分别执行成功和失败的命令，检查 `$?`。将标准输出和错误输出重定向到不同文件，并解释文件内容。
