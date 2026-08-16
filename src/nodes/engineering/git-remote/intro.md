# Git 远程仓库与 GitHub 协作

Git remote 是本地仓库中保存的一组远程仓库名称和 URL。它让 Git 知道从哪里获取 commit、向哪里发送 commit，但不会自动同步任何内容。

<GitDiagram kind="remotes" />

本地仓库和 GitHub 上的仓库是两个独立仓库，各自保存 commit 和分支。`fetch`、`pull` 和 `push` 才会在两者之间传递或整合 commit。网页上的文件不是本地工作区的实时副本，本地修改也不会因为配置了 remote 而自动上传。

开始前，应当已经完成 [Git 基础](/nodes/engineering/git-basics/intro)，能够创建 commit 和使用分支。

## 学习路线

1. [连接远程仓库](./remotes)：理解 remote、URL、`origin` 和 `upstream`，并选择 GitHub 认证方式。
2. [同步仓库](./sync)：用 `fetch`、`pull` 和 `push` 在本地与 GitHub 之间同步 commit。
3. [Fork 与 Pull Request](./collaboration)：区分共享仓库与 Fork 工作流，理解 Pull Request 的完整生命周期。

本节点不讲 merge conflict。如果同步命令报告分支已经分叉或存在冲突，应当停止操作并先确认两边的历史，不要为了让命令成功而直接 force push。
