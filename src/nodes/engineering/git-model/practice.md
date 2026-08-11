# 综合练习

本练习只在新建的 `git-lab` 目录中操作。不要复用现有项目目录，也不要删除不确定用途的文件。

## 1. 创建练习仓库

```sh
mkdir git-lab
cd git-lab
git init
git status
```

预期现象：Git 报告当前位于 `main`，并且还没有提交。如果初始分支不是 `main`，回到[首次设置](./index#首次设置)检查 `init.defaultBranch`，然后换一个新目录重新创建仓库。

使用任意文本编辑器创建 `README.md` 和 `notes.md`，分别写入一行内容。然后检查状态：

```sh
git status
```

两个文件都应列在未跟踪文件中。

## 2. 创建第一次提交

```sh
git add README.md notes.md
git diff --staged
git commit -m "初始化练习仓库"
git status
```

预期现象：暂存区差异包含两个新文件；提交后工作区没有待提交修改。

## 3. 只提交一部分修改

分别修改 `README.md` 和 `notes.md`，再执行：

```sh
git status
git diff
git add README.md
git diff --staged
git commit -m "补充项目说明"
git status
```

提交前，`git diff --staged` 应只包含 `README.md`。提交后，`notes.md` 的修改仍留在工作区。

## 4. 使用 stash

```sh
git stash push -m "暂存笔记修改"
git status
git stash list
git stash pop
git status
```

预期现象：保存 stash 后工作区恢复干净；`pop` 后 `notes.md` 的修改重新出现。

将恢复的修改提交，避免它影响下一步：

```sh
git add notes.md
git commit -m "更新练习笔记"
```

## 5. 创建分支

```sh
git switch -c test
git branch
```

预期现象：分支列表中同时存在 `main` 和 `test`，`test` 前有 `*`。编辑 `README.md` 并提交：

```sh
git add README.md
git commit -m "在测试分支修改说明"
git log --oneline -n 5
```

切回 `main` 后再次查看文件和历史：

```sh
git switch main
git log --oneline -n 5
```

预期现象：测试分支的最新提交不在 `main` 的历史中，`README.md` 也恢复为 `main` 上的版本。

## 6. 在练习远程仓库中验证同步

只有在维护者提供了允许练习的远程仓库时才执行这一部分，不要向陌生或正式项目推送测试提交。

```sh
git clone <练习仓库地址>
cd <练习仓库目录>
git pull
```

按前面的流程修改、暂存并提交一个文件，然后运行：

```sh
git push
```

预期现象：托管平台上能够看到同一提交 ID 和提交信息。如果 push 被拒绝，不要强制推送；保留终端输出并请维护者确认仓库状态。

## 【检查题】

1. 第三步的第二次提交为什么没有包含 `notes.md`？
2. `git stash pop` 后为什么需要立即执行 `git status`？
3. 切换回 `main` 后，测试分支的提交是否被删除了？如何验证？
