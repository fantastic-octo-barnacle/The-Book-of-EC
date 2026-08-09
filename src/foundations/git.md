---
title: Git 协作
level: 入门
prerequisites: [/foundations/command-line]
next: [/foundations/debugging]
tags: [Git, 协作]
estimated_time: 2h
---

# Git 协作

<p class="node-meta">入门 · 先修：命令行与 Linux · 下一步：调试方法</p>

## 为什么需要它

Git 的价值不是“上传代码”，而是把可复现的项目状态、改动意图和协作历史表示出来。能区分状态，才能在风险可控时修改工程。

## 最小原理模型

- 工作区是你正在编辑的文件；暂存区是下一次提交的候选快照；提交是不可变的项目快照，并非文件夹。
- 分支只是指向某个提交的可移动引用；合并是在提交图上整合两段历史。
- 远程仓库是另一组引用，不是工作区的自动镜像。

## 学习方向

先掌握 `status`、`diff`、`log`、`add`、`commit`、`fetch`、`pull` 和分支切换。理解提交图后再学习 rebase、cherry-pick 和复杂冲突处理。

推荐检索：`Pro Git 中文`, `Git working tree index commit graph`, `three-way merge`；深入时阅读 [Pro Git](https://git-scm.com/book/zh/v2)。

## 理解检查

1. 修改文件后执行 `git commit` 却没有包含它，最可能漏了哪一步？
2. 为什么 `git pull` 可能改变当前分支的历史？
3. 冲突的本质是“文本不一致”还是 Git 无法推断你的语义选择？

## 微型实验

新建临时仓库，完成两次提交；在第二次提交前只暂存一个文件。用 `git status` 和 `git diff --staged` 解释三种状态的差异。
