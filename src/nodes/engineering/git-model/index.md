# Git 基础

Git 保存项目在不同时间的文件快照。一次可靠的操作应先观察状态，再选择要保存的修改；Git 不会因为文件已经编辑就自动把它放进提交。

<GitDiagram kind="areas" />

## 四个位置

| 位置     | 保存什么                            | 常用操作                |
| -------- | ----------------------------------- | ----------------------- |
| 工作区   | 当前可以查看和编辑的项目文件        | 编辑文件、`git diff`    |
| 暂存区   | 已经选入下一次提交的文件内容        | `git add`               |
| 本地仓库 | 已经创建的提交、分支和其他 Git 数据 | `git commit`、`git log` |
| 远程仓库 | 另一份可供团队交换提交的仓库        | `git pull`、`git push`  |

暂存区不是“所有已修改文件”的列表。`git add` 会把文件执行命令时的内容复制到暂存区，后续编辑仍然只发生在工作区。

## 首次设置

先确认 Shell 能找到 Git：

```sh
git --version
```

Git 会把姓名和邮箱写入每次提交。将下面的示例值换成自己的信息：

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

让以后通过 `git init` 创建的仓库使用 `main` 作为初始分支名：

```sh
git config --global init.defaultBranch main
```

`--global` 表示这项设置对当前用户生效。`init.defaultBranch` 只影响以后创建的仓库，不会重命名已有分支。可以分别读取配置，确认输出与刚才输入的一致：

```sh
git config user.name
git config user.email
git config init.defaultBranch
```

## 创建或获取仓库

在一个尚未由 Git 管理的项目目录中创建仓库：

```sh
git init
```

Git 会创建 `.git` 目录保存仓库数据。不要手动编辑其中的文件。

已有远程仓库时，使用其实际地址创建完整副本：

```sh
git clone <仓库地址>
cd <仓库目录>
```

`clone` 已经完成仓库初始化，不要再在其中执行 `git init`。

## 学习路线

1. [观察、暂存与提交](./local-workflow)：读懂文件状态，只提交准备好的内容。
2. [分支、stash 与远程](./branches-remotes)：切换工作线，临时收起修改，并与远程仓库交换提交。
3. [综合练习](./practice)：在临时仓库中验证完整操作闭环。

## 本节点不展开的内容

Gitflow、Pull Request、Code Review 和 CI 属于团队协作流程，不在本节点讨论。合并策略、rebase、reset、tag、强制推送和完整冲突处理也不属于入门操作。
