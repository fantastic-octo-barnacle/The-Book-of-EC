# 创建仓库

Git 只会管理仓库中的项目。你可以把当前目录初始化为一个新仓库，也可以从已有地址克隆一份仓库；应当根据项目是否已经存在来选择。

## 用 `git init` 创建新仓库

为避免影响其他项目，先创建一个专门用于练习的新目录：

```sh
mkdir git-lab
cd git-lab
git init
```

`git init` 会让当前目录成为 Git 仓库。运行下面的命令检查结果：

```sh
git status
```

Git 应当报告当前位于 `main` 分支，仓库中还没有 commit。如果初始分支不是 `main`，请回到[首次 Git 配置](./setup#设置默认分支名)检查 `init.defaultBranch`。

### `.git` 目录

Git 还会在当前目录创建一个隐藏目录 `.git`，用于保存版本记录和仓库设置。不要手动修改其中的文件。

`.git` 目录相当于当前 Git 仓库的本体。如果你删除了 `.git`，就相当于删除了仓库。由于它是隐藏的，在移动或更改目录时容易被遗漏，导致仓库损坏。建议在文件管理器中显示隐藏文件，或者在终端中使用 `ls -a` 查看。

### 创建一个最小 commit

使用任意文本编辑器在 `git-lab` 中创建 `README.md`，写入一行项目说明，然后运行：

```sh
git add README.md
git commit -m "初始化练习仓库"
git log --oneline -n 1
```

最后一条命令应当显示刚创建的 commit 及其说明。这里的操作只用于确认仓库能够正常工作；`add`、`commit` 和历史记录会在[创建 commit](./commits)中详细解释。

## 用 `git clone` 获取已有仓库

如果项目已经存在于 Git 托管平台或其他位置，应当使用项目提供的仓库地址：

```sh
git clone <仓库地址>
cd <仓库目录>
```

“仓库地址”不是项目网址。以克隆 [Windows 计算器源码](https://github.com/microsoft/calculator) 为例：

```sh
git clone https://github.com/microsoft/calculator.git
# Git 会在当前目录中新建一个名为 `calculator` 的目录，并在其中创建仓库拉取内容

# 进入该仓库工作目录
cd ./calculator

# 查看仓库状态
git status

# 查看仓库历史记录
git log --graph --all --oneline
```

`git clone` 会创建项目目录，复制已有版本记录，并完成仓库初始化。

不要在克隆得到的目录中再次执行 `git init`。也不要先在一个目录中执行 `git init`，再把另一个仓库克隆到同一目录。

## 如何选择

| 当前情况                         | 使用方式    |
| -------------------------------- | ----------- |
| 从零开始一个尚无仓库的新项目     | `git init`  |
| 加入已有项目或获取现有仓库的副本 | `git clone` |

创建仓库只完成了版本管理的起点。之后仍然需要明确选择修改并创建 commit，Git 才能保留新的项目状态。
