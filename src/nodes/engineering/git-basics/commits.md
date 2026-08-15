# 创建 commit

一个 commit 是一次有明确目的的版本记录。创建 commit 时，Git 只保存你已经选入暂存区的内容，不会自动保存工作区中的全部修改。

## 三个区

<GitDiagram kind="areas" />

| 位置                         | 含义                                   |
| ---------------------------- | -------------------------------------- |
| 工作区（Working Directory）  | 当前可以查看和编辑的项目文件           |
| 暂存区（Staging Area）       | 已经选定、准备放入下一次 commit 的内容 |
| 本地仓库（Local Repository） | 已经创建的 commit 和版本历史           |

修改文件只会改变工作区。`git add` 把指定内容选入暂存区，`git commit` 再把暂存区中的内容保存为 commit。这个过程允许你从多项修改中挑选属于同一目的的部分，而不是被迫一次保存所有变化。

使用以下方式可以分别查看其用法：

```sh
git add -h       # `-h` 是 `--help` 的短选项形式
git commit -h
```

## 1. 观察当前状态

在仓库中运行：

```sh
git status
```

`git status` 会区分未跟踪、已修改和已暂存的文件，但不展示每一行具体改了什么。

- 未跟踪文件是 Git 尚未纳入版本记录的新文件；
- 已修改文件已经存在于之前的 commit 中，但工作区内容发生了变化；
- 已暂存文件的内容已经进入暂存区，准备加入下一次 commit。

查看已跟踪文件在工作区中的具体变化：

```sh
git diff
```

新建且尚未跟踪的文件会出现在 `git status` 中，但 `git diff` 默认不会展示其完整内容。

## 2. 选择下一次 commit 的内容

假设你修改了 `src/main.c` 和 `src/main.h` 的内容，并准备提交它们：

```sh
git add src/main.c src/main.h
```

`git add` 会目标文件的内容放入暂存区。它不会锁定工作区文件，也不会自动包含之后的新修改。

查看当前仓库状态：

```sh
git status   # 与 add 前相比，src/main.c 和 src/main.h 已经从“已修改”变为“已暂存”
```

检查下一次 commit 实际会包含什么：

```sh
git diff --staged
```

两个 diff 命令作用不同：

| 命令                | 显示的内容                         |
| ------------------- | ---------------------------------- |
| `git diff`          | 工作区还有哪些内容没有暂存？       |
| `git diff --staged` | 下一次 commit 将包含哪些具体变化？ |

<GitDiagram kind="snapshots" />

如果暂存后又编辑同一个文件，这个文件会同时存在已暂存和未暂存的变化。再次 add，才会用当前工作区内容更新暂存区。

::: tip 添加所有变化的文件到暂存区
有时候，`git add`手动键入所有文件名比较麻烦。可以使用 `git add .` 或 `git add -A` 一次性把当前目录下的所有变化都放入暂存区。
:::

## 3. 提交 commit

确认 `git add` 之后，创建 commit 将更改保存到本地仓库中：

```sh
git commit -m "修正编码器方向判断"
```

`-m` 后的内容是提交消息（message），应当简短说明这次修改完成了什么，是必填项。提交消息应当简短说明这次修改完成了什么。不要使用“update”、“改一下”等无法帮助读者区分不同 commit 目的的说明。

commit 会记录暂存内容、作者、创建时间和提交说明，并获得一个用于识别它的 ID。没有进入暂存区的修改仍然留在工作区，不会丢失，也不会进入这次 commit。

## 4. 验证结果

查看最近的 commit：

```sh
git log --oneline -n 5
git status
```

`git log` 的每一行包含 commit ID 的缩写和提交说明，最新记录通常位于最上方。`git status` 用于确认提交后是否仍有未提交或未暂存的内容。

## 动手验证三个区

在临时仓库中创建 `README.md` 和 `notes.md`，先提交一次。然后同时修改两个文件，只暂存并提交 `README.md`。

完成后应当观察到：

1. 提交前，`git diff --staged` 只显示 `README.md` 的变化；
2. 提交后，`git log --oneline -n 1` 显示新的 commit；
3. 提交后，`notes.md` 的修改仍然出现在 `git status` 中。
