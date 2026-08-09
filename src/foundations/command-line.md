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

## 为什么需要它

嵌入式开发的构建器、下载器、串口工具和版本管理都以文件、进程和标准输入输出为基础。能输入命令不等于理解它会读写哪里、失败时留下什么。

## 最小原理模型

- 路径是定位文件的方式；相对路径由当前工作目录解释。
- 进程是正在运行的程序；退出码用来告诉调用者成功或失败。
- `stdin`、`stdout`、`stderr` 是三条独立的数据通道；管道只连接前一程序的标准输出与后一程序的标准输入。

## 学习方向

掌握目录/文件操作、权限、进程、重定向与管道即可。不要急于背复杂 shell 脚本；遇到自动化需求时再学习变量、条件和循环。

推荐检索：`Linux command line filesystem process exit code`、`shell stdin stdout stderr`。中文先找系统化命令行入门，深入时对照 GNU coreutils 与 Bash 手册。

## 理解检查

1. 为什么同一条相对路径命令在两个目录执行可能得到不同结果？
2. `command > out.txt 2>&1` 让哪两条数据流去往哪里？
3. 程序打印错误信息却返回 0，会给自动化脚本带来什么问题？

## 微型实验

在临时目录中执行一条会成功和一条会失败的命令，分别检查 `$?`。把标准输出与错误输出重定向到不同文件；能解释每个文件为何含有这些内容即完成。
