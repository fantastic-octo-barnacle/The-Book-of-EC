# 同步仓库

远程同步传递的是 commit 和分支引用，不是直接复制当前工作区。同步前先提交或妥善保存本地修改，并用 `git status` 确认状态。

## 拉取远程分支

执行 `git fetch origin` 后，本地可能同时看到 `main` 和 `origin/main` 两个分支：

- `main` 是可以签出和提交的本地分支；
- `origin/main` 是本地保存的“上次与 `origin` 通信时，对方 `main` 所在位置”；
- GitHub 上的 `main` 仍然属于远程仓库，可能在下一次 fetch 前再次变化。

`origin/main` 不是实时状态，也不应直接在其上创建 commit。

下面的动画展示远程 `main` 领先时，fetch 和 merge 分别改变什么。每次只执行一条命令，并观察引用的位置：

<GitRemoteAnimation kind="fetch-merge" />

## 推送本地分支

`push` 的完整 refspec 可以同时写出本地来源分支和远程目标分支：

```sh
git push origin main:main
```

`origin` 是 remote 名称。冒号左侧的第一个 `main` 是本地来源分支，右侧的第二个 `main` 是远程目标分支。这条命令把本地 `main` 中远程尚未拥有的 commit 发送给 `origin`，然后请求远程 `main` 指向新的 commit。

来源分支和目标分支同名时，可以省略：

```sh
git push origin main
```

<GitRemoteAnimation kind="push" />

### 设置 upstream branch

以上两种写法都没有为当前分支设置默认同步目标。使用 `-u` 可以在推送的同时，把本地 `main` 的上游分支（upstream branch）设置为 `origin/main`：

```sh
git push -u origin main
```

配置成功后，之后的推送和拉取操作可以简写为：

```sh
git push
git pull
```

确认跟踪关系和同步状态：

```sh
git branch -vv
git status -sb
```

前者应当在 `main` 后显示 `[origin/main]`。同步完成且工作区干净时，后者不应显示 ahead、behind 或文件变化。

## push 被拒绝时

远程分支包含本地没有的 commit 时，Git 通常会拒绝普通 push，以免覆盖他人的历史。安全的排查顺序是：

```sh
git fetch origin
git log --oneline --decorate --graph --all
```

先辨认本地分支和 `origin/main` 从哪里分开，再决定后续操作。不要把 `--force` 当作普通 push 失败后的重试选项；force push 可以让远程分支丢失其他人的 commit。
