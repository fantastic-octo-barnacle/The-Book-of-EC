# 环境变量、PATH 与命令运行

进程运行时不只有程序代码和参数。它还拥有当前工作目录以及一组环境变量。环境变量中的 `PATH` 决定了许多外部程序能否只凭名字被找到。

## 环境变量属于进程

环境变量是字符串键值。程序用它们接收不适合反复写进命令的运行环境信息，例如工具搜索位置、语言区域或临时目录。

PowerShell 使用 `$env:名称` 读取环境变量：

```powershell
$env:PATH
$env:TEMP
```

可以在当前会话中设置一个无害的练习变量：

```powershell
$env:BOOK_OF_EC_LAB = 'visible'
$env:BOOK_OF_EC_LAB
```

这项修改只直接作用于当前 PowerShell 进程。之后从它启动的子进程通常会继承启动时的值；已经运行的其他终端不会被追溯修改。关闭当前 PowerShell 后，这个临时设置也不会自动成为用户或系统的永久配置。

在 Bash、Zsh 等 POSIX Shell 中，读取方式通常是 `$PATH`，将普通 Shell 变量导出给子进程需要 `export`。变量名在 Linux/macOS 上区分大小写；不要假定 `$env:Path` 和 `$env:PATH` 在所有平台都是同一个变量。

## PATH 是有顺序的目录列表

`PATH` 保存一组目录。输入外部程序名而没有提供路径时，系统按规则在这些位置中查找程序；顺序靠前的同名程序可能遮蔽后面的版本。

在 PowerShell 中将 `PATH` 拆成多行查看：

```powershell
$env:PATH -split [IO.Path]::PathSeparator
```

Windows 通常用分号分隔各项，Linux/macOS 通常用冒号。不要手动根据显示文本猜分隔符，上面的写法会使用当前平台的分隔符。

`PATH` 与当前工作目录是两个不同概念：

- 当前工作目录用于解释 `src\main.c` 这样的相对路径；
- `PATH` 用于查找没有写出路径的外部程序名；
- 某个程序文件位于当前目录，不表示输入文件名就一定会运行它。

PowerShell 出于安全考虑，通常要求用相对路径明确运行当前目录中的程序：

```powershell
.\tool.exe
```

Linux/macOS 上对应的形式通常是：

```sh
./tool
```

## 查明实际运行的版本

不要用“已经安装”代替“当前 Shell 能找到正确版本”。在 PowerShell 中检查：

```powershell
Get-Command git
Get-Command git -All
```

第一条显示当前会被选择的命令，第二条可用于发现同名候选项。如果某个名称先匹配到别名、函数或 cmdlet，也可能不会进入外部程序的 `PATH` 查找。

在 POSIX Shell 中使用：

```sh
command -v git
```

当工具版本不符合预期时，记录实际路径，再检查：

1. 当前 Shell 是否与教程假设相同；
2. 是否存在同名别名、函数或程序；
3. `PATH` 中各目录的顺序；
4. 安装程序是否只修改了新启动进程能够继承的环境。

## 从输入到退出的完整链路

执行下面的命令时：

```text
git status --short
```

可以按顺序提出五个问题：

1. **解析**：Shell 划分出了哪些参数？引号是否改变了参数边界？
2. **定位**：`git` 匹配到别名、函数、cmdlet 还是外部程序？
3. **启动**：程序获得了哪个当前工作目录和哪些环境变量？
4. **执行**：程序如何解释 `status` 和 `--short`？
5. **结束**：程序输出了什么，并返回了什么退出状态？

这组问题比反复重装工具更适合定位命令行故障。

## 常见现象与检查顺序

| 现象                                 | 先检查                                                          |
| ------------------------------------ | --------------------------------------------------------------- |
| “无法识别命令”或 `command not found` | 拼写、当前 Shell、`Get-Command`/`command -v`、安装目录和 `PATH` |
| 运行的版本不是预期版本               | 实际路径、同名候选项和 `PATH` 顺序                              |
| 文件存在但程序说找不到               | `pwd`、相对路径起点、引号和文件名大小写                         |
| 网上示例的参数不能用                 | 实际命令类型、工具版本和示例所属平台                            |
| 新终端看不到刚设置的变量             | 设置发生在哪个进程、是否永久保存、新进程从谁继承环境            |

## 练习：观察继承和定位

在 Windows PowerShell 中完成以下操作：

1. 用 `Get-Command` 找到一个已经安装的外部工具，记录其完整路径。
2. 用 `Get-Command <名称> -All` 检查是否存在同名候选项。
3. 输出 `$env:PATH -split [IO.Path]::PathSeparator`，判断该工具所在目录为何能被搜索到。
4. 设置 `$env:BOOK_OF_EC_LAB = 'visible'`。
5. 如果安装了 PowerShell 7，运行 `pwsh -NoProfile -Command '$env:BOOK_OF_EC_LAB'`；如果只有 Windows PowerShell，运行 `powershell -NoProfile -Command '$env:BOOK_OF_EC_LAB'`。
6. 新进程应输出 `visible`，证明子进程继承了环境变量。
7. 关闭这个子进程后，在当前会话执行 `Remove-Item Env:BOOK_OF_EC_LAB`；随后执行 `$null -eq $env:BOOK_OF_EC_LAB`，预期得到 `True`。

不要在本练习中永久编辑用户或系统的 `PATH`。不同安装器、Windows 版本和组织权限会改变配置方法；需要时应查阅操作系统和具体工具的官方安装文档，并在修改前保存原值。

## 推荐扩展

掌握本节点后，可按实际任务继续学习：

- **标准流、管道与重定向**：理解 `stdin`、`stdout`、`stderr` 以及如何组合工具；
- **通配符与正则表达式**：区分文件名匹配和文本模式匹配，尤其注意删除命令中的展开范围；
- **Shell 脚本**：变量、条件、循环、函数、引用和错误处理；
- **权限模型**：Windows UAC、PowerShell Execution Policy、Linux/macOS 权限与 `sudo`；
- **进程控制**：后台任务、信号、作业以及父子进程；
- **跨环境边界**：WSL、Git Bash、Windows 原生程序的路径和文件系统差异；
- **工程兼容问题**：文本编码、换行符、大小写和路径长度。

优先使用以下资料查证行为：

- [PowerShell 环境变量](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_environment_variables)：变量作用域、继承及 `PATH` 的平台差异；
- [PowerShell 别名](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_aliases)：确认别名的定义与会话范围；
- [GNU Coreutils 手册](https://www.gnu.org/software/coreutils/manual/)：查阅 GNU/Linux 上 `ls`、`cp`、`mv`、`rm` 等程序的具体语义；
- 当前工具自己的 `--help` 和官方命令参考：确认版本相关的参数与退出码。

## 检查题

1. 为什么在一个终端中修改环境变量，已经打开的另一个终端通常看不到？
2. 当前目录存在 `tool.exe` 时，为什么 PowerShell 仍可能要求输入 `.\tool.exe`？
3. 同一台机器上运行到错误版本的编译器，`PATH` 如何造成这一现象？
4. “找不到命令”和“未知选项”分别说明命令运行到了哪一层？
