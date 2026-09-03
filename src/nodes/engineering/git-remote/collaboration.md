# Fork 与 Pull Request

Pull Request（PR）是 GitHub 上用于提出、讨论和审查分支差异的协作记录。修改分支可以位于目标仓库中，也可以位于 Fork 中。

## 同一仓库内的 Pull Request

拥有仓库写权限时，可以把修改分支直接推送到共享仓库。此时 `origin` 指向共享仓库。

### 创建并推送分支

不要直接修改默认分支。创建一个能说明修改目的的分支，完成 commit 后推送：

```sh
git switch -c fix-encoder-docs
# 编辑、检查并创建 commit
git push -u origin fix-encoder-docs
```

### 创建和更新 Pull Request

推送分支后，在 GitHub 的 Pull requests 页面创建 PR。提交前检查：

- **base branch** 指向准备接收修改的目标分支；
- **compare branch** 指向刚推送的修改分支；
- Files changed 是否只包含本次修改。

收到反馈后，继续在同一个修改分支创建 commit 并 push：

```sh
# 修改并验证后
git add .
git commit -m "根据评审修正文档说明"
git push
```

后续 push 会自动更新已有 PR，不需要重新创建 PR。

### 合并或关闭

满足仓库要求后，由有权限的维护者合并 PR；不再需要的 PR 可以关闭。

## 使用 Fork 创建 Pull Request

没有仓库写权限或需要隔离权限时，可以先 Fork 原仓库。Fork 是 GitHub 为当前账户创建的关联仓库，创建后不会持续自动同步原仓库的变化。

<GitDiagram kind="fork-flow" />

### 配置 Fork

在 GitHub 页面 Fork 原仓库，再克隆自己的 Fork，并添加指向原仓库的 `upstream`：

```sh
git clone git@github.com:YOUR-NAME/REPOSITORY.git
cd REPOSITORY
git remote add upstream git@github.com:ORIGINAL-OWNER/REPOSITORY.git
git remote -v
```

检查结果时，应当确认：

- `origin` 指向自己的 Fork；
- `upstream` 指向原仓库。

### 推送修改分支

创建独立分支并推送到 `origin`，修改就会进入自己的 Fork：

```sh
git switch -c fix-encoder-docs
# 编辑、检查并创建 commit
git push -u origin fix-encoder-docs
```

### 创建 Pull Request

创建 PR 时，**base repository / base branch** 应指向原仓库的目标分支，**head repository / compare branch** 应指向自己的 Fork 和修改分支。

PR 创建后的更新、合并和关闭过程与同一仓库内的 PR 相同。
