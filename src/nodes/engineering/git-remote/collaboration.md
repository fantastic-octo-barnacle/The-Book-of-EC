# Fork 与 Pull Request

Pull Request（PR）是 GitHub 上用于提出、讨论和审查分支差异的协作记录。它不是 Git commit，也不会随 `git fetch` 下载到本地。

## 两种协作方式

| 情况                           | 修改分支位于哪里             | 常见 remote 配置                          |
| ------------------------------ | ---------------------------- | ----------------------------------------- |
| 对仓库有写权限                 | 同一 GitHub 仓库中的功能分支 | `origin` 指向共享仓库                     |
| 对仓库没有写权限或要求隔离权限 | 自己的 Fork 中               | `origin` 指向 Fork，`upstream` 指向原仓库 |

Fork 是 GitHub 为当前账户创建的关联仓库。它与原仓库拥有共同的历史，但创建后不会持续自动同步。

<GitDiagram kind="fork-flow" />

## 配置 Fork

在 GitHub 页面 Fork 原仓库，再克隆自己的 Fork：

```sh
git clone git@github.com:YOUR-NAME/REPOSITORY.git
cd REPOSITORY
git remote add upstream git@github.com:ORIGINAL-OWNER/REPOSITORY.git
git remote -v
```

检查结果时，应当确认：

- `origin` 指向自己拥有写权限的 Fork；
- `upstream` 指向原仓库；
- 两者没有因为复制 URL 而写反。

在开始新工作前，可以用原仓库更新本地默认分支，再把结果推送到 Fork：

```sh
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

如果 merge 报告冲突，先检查两边的 commit，不要强制覆盖任一仓库。

## 从独立分支提出修改

不要直接在默认分支上堆叠待审查修改。基于已更新的 `main` 创建能说明目的的分支：

```sh
git switch -c fix-encoder-docs
# 编辑、检查并创建 commit
git push -u origin fix-encoder-docs
```

推送完成后，GitHub 可以比较来源分支与目标分支，并据此创建 PR。

## Pull Request 生命周期

### 1. 创建

在 GitHub 的 Pull requests 页面创建 PR，并重点检查：

- **base repository / base branch**：修改准备进入哪个仓库和分支；
- **head repository / compare branch**：修改来自哪个 Fork 或共享仓库分支；
- 标题和说明是否准确描述目的、主要变化以及验证方法；
- Files changed 是否只包含本次修改。

修改尚未准备好接受合并时，创建 Draft PR；准备完成后再标记为 Ready for review。

### 2. 检查与评审

自动化检查验证构建、测试或格式要求，review 由协作者判断实现是否正确、清晰且符合项目约束。两者通过的条件由仓库规则决定，不能互相替代。

评审者可以 comment、approve 或 request changes。作者应逐条判断反馈，并用新的 commit 更新同一个来源分支：

```sh
# 修改并验证后
git add PATHS
git commit -m "根据评审修正文档说明"
git push
```

后续 push 会自动更新已有 PR，不需要重新创建 PR。`PATHS` 表示本次确实需要暂存的文件，不应原样复制。

### 3. 合并或关闭

满足仓库要求后，有权限的维护者可以按照仓库约定合并 PR。提交者不应绕过评审和自动化检查直接修改目标分支。

不再需要的 PR 应关闭而不是合并。PR 被关闭不会自动删除来源分支，也不会删除其中的 commit。

### 4. 清理

PR 合并或关闭后，确认分支不再需要，再删除 GitHub 上的来源分支。本地可以更新默认分支并清理已经失效的远程跟踪引用：

```sh
git fetch upstream
git switch main
git merge upstream/main
git push origin main
git fetch --prune origin
git branch -d fix-encoder-docs
```

以上命令适用于 Fork；直接使用共享仓库时，从 `origin/main` 更新即可。`git branch -d` 只在 Git 判断分支修改已经合并时删除本地分支。如果命令拒绝删除，应当先确认 commit 是否已经保留，不要直接改用 `-D`。
