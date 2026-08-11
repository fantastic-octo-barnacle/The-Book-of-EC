# 目录、路径与文件操作

文件系统把文件组织在目录中。命令中的相对路径必须从一个起点解释，这个起点就是进程的**当前工作目录**。

## 目录树与路径

目录可以包含文件和其他目录，因此形成一棵树。路径描述从某个起点到目标所经过的目录：

| 概念         | Windows PowerShell 示例               | Linux/macOS 示例                   |
| ------------ | ------------------------------------- | ---------------------------------- |
| 绝对路径     | `C:\Users\Alice\project`、`~\project` | `/home/alice/project`、`~/project` |
| 相对路径     | `.\src\main.c`、`src\main.c`          | `./src/main.c`、`src/main.c`       |
| 父目录       | `..\`                                 | `../`                              |
| 用户主目录   | `~`                                   | `~`                                |
| 文件系统起点 | 盘符根目录 `C:\`、`D:\`               | 根目录 `/`                         |

绝对路径已经包含解释目标所需的起点。相对路径必须结合当前工作目录。例如当前工作目录是 `C:\Users\Alice\project` 时，`src\main.c` 指向 `C:\Users\Alice\project\src\main.c`。

`.` 表示当前目录，`..` 表示父目录。`~` 由 Shell 展开为当前用户的主目录。

::: info 平台差异
Windows 路径通常以盘符开头，也可能使用 `\\server\share` 形式的网络路径。Linux 和 macOS 只有一个 `/` 根目录。PowerShell 经常也接受 `/` 作为 Windows 路径分隔符，但外部程序未必接受，因此不要把这种兼容性当成所有工具的保证。
:::

## 当前工作目录属于进程

查看当前 Shell 的工作目录（print working directory）：

```sh
pwd
```

改变当前 Shell 的工作目录（change directory）：

```sh
cd ~           # 绝对路径导航：到当前用户的主目录
pwd
cd ..          # 相对路径导航：到父目录
pwd
cd ~/../..     # 绝对路径导航：到用户主目录的祖父目录
pwd
```

每次执行后都应先预测路径，再用 `pwd` 验证。一个程序从 Shell 启动时通常继承它的工作目录，但程序之后可以自行改变自己的工作目录；子进程的改变不会反过来修改父 Shell 的位置。

## 大小写与隐藏项目

Windows 和 macOS 上常见的文件系统通常不区分文件名大小写，Linux 上通常区分；实际行为还会受到文件系统和挂载配置影响。跨平台工程应始终按文件名的准确大小写书写路径。

“隐藏”也不是统一规则。Windows 文件可以带有隐藏属性，Linux/macOS 工具通常把名称以 `.` 开头的项目视为隐藏。`ls` 的默认输出没有显示某个文件，不等于文件不存在。

## 练习：只在新目录中操作

先回到主目录并创建专用练习目录：

```sh
cd ~
mkdir command-line-lab     # 相对路径创建一个新目录（make directory）
cd command-line-lab        # 相对路径导航：进入新目录（change directory）
pwd
ls                         # 列出当前目录内容（list）（此时为空）
```

如果 `command-line-lab` 已经存在，不要复用或删除它。换一个尚不存在的名称，例如 `command-line-lab-2`。

创建一个带空格的目录和一个空文件：

- Windows PowerShell：
  ```powershell
  mkdir "space dir"
  New-Item note.txt -ItemType File
  ```
- Linux/macOS：
  ```sh
  mkdir "space dir"
  touch note.txt
  ```

此时列出当前目录内容应该包含 `note.txt` 和 `space dir`：

```sh
ls
```

接着复制、移动并删除练习文件：

```sh
cp note.txt note-copy.txt   # 复制文件（copy）
ls                          # 此时列出的文件应多了一个 note-copy.txt

mv note-copy.txt "space dir\moved note.txt"  # 移动（move）
ls                         # 此时列出的文件应只剩 note.txt
ls "space dir"             # 列出 `space dir` 目录中的内容

rm "space dir\moved note.txt"   # 删除（remove）
ls "space dir"             # 此时列出的文件应为空
```

删除练习用目录及其中所有内容：

```sh
cd ..
pwd       # 现在应当回到了用户主目录
```

- Windows PowerShell：
  ```powershell
  rm -Recurse command-line-lab
  ```
- Linux/macOS：
  ```bash
  rm -r command-line-lab    # 递归地（recursively）删除目录及其中所有内容
  ```

:::tip
PowerShell 中 `mkdir`、`cp`、`mv`、`rm` 等都只是别名（Alias），实际调用的是 `New-Item`、`Copy-Item`、`Move-Item`、`Remove-Item` 等内置函数。它们的行为与 POSIX Shell 中的同名工具不完全相同。
:::

## 删除前的固定检查

命令行删除通常不进入回收站。执行 `rm` 前依次确认：

1. 用 `pwd` 确认当前工作目录。
2. 用 `ls` 或完整路径确认目标确实存在。
3. 检查路径中的引号、变量和通配符会不会扩大范围。
4. 确认目标可以从版本库、备份或生成步骤恢复。

本节点不练习递归删除、强制删除或通配符删除。看到来自网上的删除命令时，先用 `Get-Command rm` 确认实际工具，再查它的帮助；不要根据另一平台同名工具的参数猜测行为。

## 【检查题】

1. 当前目录是 `C:\work\robot\build` 时，`..\src` 指向哪里？
2. 为什么在两个不同目录中运行 `tool config.json`，程序可能读取不同文件？
3. `ls` 没显示目标文件时，还需要检查哪些平台差异？
