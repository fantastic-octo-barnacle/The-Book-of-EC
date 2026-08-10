# 目录、路径与文件操作

文件系统把文件组织在目录中。命令中的相对路径必须从一个起点解释，这个起点就是进程的**当前工作目录**。

## 目录树与路径

目录可以包含文件和其他目录，因此形成一棵树。路径描述从某个起点到目标所经过的目录：

| 概念         | Windows PowerShell 示例  | Linux/macOS 示例      |
| ------------ | ------------------------ | --------------------- |
| 绝对路径     | `C:\Users\Alice\project` | `/home/alice/project` |
| 相对路径     | `.\src\main.c`           | `./src/main.c`        |
| 父目录       | `..\`                    | `../`                 |
| 用户主目录   | `~`                      | `~`                   |
| 文件系统起点 | 盘符根目录 `C:\`         | 根目录 `/`            |

绝对路径已经包含解释目标所需的起点。相对路径必须结合当前工作目录。例如当前工作目录是 `C:\Users\Alice\project` 时，`src\main.c` 指向 `C:\Users\Alice\project\src\main.c`。

`.` 表示当前目录，`..` 表示父目录。`~` 由 Shell 展开为当前用户的主目录。它们是路径的一部分，不是文件的特殊扩展名。

::: info 平台差异
Windows 路径通常以盘符开头，也可能使用 `\\server\share` 形式的网络路径。Linux 和 macOS 只有一个 `/` 根目录。PowerShell 经常也接受 `/` 作为 Windows 路径分隔符，但外部程序未必接受，因此不要把这种兼容性当成所有工具的保证。
:::

## 当前工作目录属于进程

在 PowerShell 中查看当前位置：

```powershell
pwd
```

`pwd` 在 Windows PowerShell 中通常是 `Get-Location` 的别名。`cd` 改变当前 PowerShell 进程的位置：

```powershell
cd ~
pwd
cd ..
pwd
```

每次执行后都应先预测路径，再用 `pwd` 验证。一个程序从 PowerShell 启动时通常继承它的工作目录，但程序之后可以自行改变自己的工作目录；子进程的改变不会反过来修改父 Shell 的位置。

## 最小命令集

下表中的短名称便于交互操作。在 Windows PowerShell 中，它们可能是别名或函数；实际结果以 `Get-Command` 为准。

| 名称    | 核心用途         | Windows PowerShell 中常见目标 |
| ------- | ---------------- | ----------------------------- |
| `pwd`   | 显示当前工作目录 | `Get-Location`                |
| `ls`    | 列出目录内容     | `Get-ChildItem`               |
| `cd`    | 改变当前工作目录 | `Set-Location`                |
| `mkdir` | 创建目录         | 调用 `New-Item` 的内置函数    |
| `cp`    | 复制文件或目录   | `Copy-Item`                   |
| `mv`    | 移动或重命名     | `Move-Item`                   |
| `rm`    | 删除项目         | `Remove-Item`                 |

先在自己的环境中验证：

```powershell
Get-Command pwd, ls, cd, mkdir, cp, mv, rm
```

在 Linux/macOS 上，这些名称通常对应 POSIX Shell 内置命令或不同的外部程序。核心用途相似不代表参数相同。例如查看隐藏项目，PowerShell 的 `Get-ChildItem` 使用 `-Force`，GNU `ls` 常使用 `-a`。如果照搬另一平台的选项，轻则报错，重则执行了意料之外的操作。

## 大小写与隐藏项目

Windows 上常见的文件系统通常不区分文件名大小写，Linux 上通常区分；实际行为还会受到文件系统和挂载配置影响。跨平台工程应始终按文件名的准确大小写书写路径。

“隐藏”也不是统一规则。Windows 文件可以带有隐藏属性，Linux/macOS 工具通常把名称以 `.` 开头的项目视为隐藏。`ls` 的默认输出没有显示某个文件，不等于文件不存在。

## 练习：只在新目录中操作

先回到主目录并创建专用练习目录：

```powershell
cd ~
mkdir command-line-lab
cd command-line-lab
pwd
ls
```

如果 `command-line-lab` 已经存在，不要复用或删除它。换一个尚不存在的名称，例如 `command-line-lab-2`。

创建一个带空格的目录和一个空文件：

```powershell
mkdir "space dir"
New-Item note.txt -ItemType File
ls
```

接着复制、移动并删除练习文件：

```powershell
cp note.txt note-copy.txt
mv note-copy.txt "space dir\moved note.txt"
ls "space dir"
rm "space dir\moved note.txt"
ls "space dir"
```

预期现象：

1. `cp` 后原文件和副本同时存在。
2. `mv` 后副本只出现在 `space dir` 中，且名称改变。
3. `rm` 后 `space dir` 仍然存在，但其中的练习文件消失。
4. `note.txt` 始终保留，证明删除目标没有超出指定文件。

在 Linux/macOS 上，创建空文件通常使用 `touch note.txt`，路径写作 `"space dir/moved note.txt"`；其他命令的具体参数应查阅当前系统手册。

## 删除前的固定检查

命令行删除通常不进入回收站。执行 `rm` 前依次确认：

1. 用 `pwd` 确认当前工作目录。
2. 用 `ls` 或完整路径确认目标确实存在。
3. 检查路径中的引号、变量和通配符会不会扩大范围。
4. 确认目标可以从版本库、备份或生成步骤恢复。

本节点不练习递归删除、强制删除或通配符删除。看到来自网上的删除命令时，先用 `Get-Command rm` 确认实际工具，再查它的帮助；不要根据另一平台同名工具的参数猜测行为。

PowerShell 中 `mkdir` 等内置函数的定义可查阅 [about_Built-in_Functions](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_built-in_functions)。

## 检查题

1. 当前目录是 `C:\work\robot\build` 时，`..\src` 指向哪里？
2. 为什么在两个不同目录中运行 `tool config.json`，程序可能读取不同文件？
3. `ls` 没显示目标文件时，还需要检查哪些平台差异？
4. 为什么“我只删除练习文件”必须由命令输出验证，而不能只凭命令看起来正确？
