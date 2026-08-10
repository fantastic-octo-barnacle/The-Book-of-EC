# 命令、参数与工具探查

面对一个没用过的命令时，不需要先背下全部用法。先辨认命令结构，再确认实际工具，最后从工具自己的帮助中查证参数。

## 命令名和参数

观察下面这条命令：

```text
git log --oneline -n 5
```

Shell 会把它交给程序时保留参数的顺序：

| 位置       | 文本        | 常见作用             |
| ---------- | ----------- | -------------------- |
| 命令名     | `git`       | 指定要运行什么       |
| 第一个参数 | `log`       | Git 将它解释为子命令 |
| 第二个参数 | `--oneline` | 长选项               |
| 第三个参数 | `-n`        | 短选项               |
| 第四个参数 | `5`         | `-n` 的值            |

“位置参数”“选项”“子命令”是程序赋予参数的语义，不是 Shell 从拼写中强制规定的。`-h`、`--help`、短选项和长选项只是常见约定，不是所有工具共同遵守的语法标准。

有些工具允许把短选项合并，有些工具使用 `/help`，还有些工具只接受固定位置的参数。不要仅凭外形推断一个陌生选项一定有效。

## 空白和引号决定参数边界

Shell 通常用空白分隔参数。先只观察参数边界：

```text
tool one two
tool "one two"
```

第一行中的 `one` 和 `two` 是两个参数，第二行中的 `one two` 是一个参数。文件名或目录名含有空格时也需要引号：

```powershell
cd "C:\Program Files"
```

PowerShell 的单引号表示字面文本，双引号允许替换变量：

```powershell
$name = 'EC'
'hello $name'
"hello $name"
```

预期输出分别是 `hello $name` 和 `hello EC`。本节点不展开嵌套引号、转义和命令替换；遇到复杂命令时应查阅当前 Shell 的引用规则，不能把 Bash、PowerShell 和 `cmd.exe` 的写法混用。

## 命令不一定是可执行文件

PowerShell 可以运行多种“命令”：

- **Alias**：另一个命令的别名，例如 Windows 上的 `ls` 通常指向 `Get-ChildItem`；
- **Function**：当前会话中定义的函数；
- **Cmdlet**：PowerShell 提供的命令，例如 `Get-Command`；
- **Application**：`git.exe`、`code.exe` 等外部可执行文件；
- **ExternalScript**：可以由 PowerShell 执行的脚本。

用 `Get-Command` 查看当前会话会运行什么：

```powershell
Get-Command ls
Get-Command git
Get-Command where -All
```

关注输出中的 `CommandType`、`Name`、`Version` 和 `Source`。`-All` 会显示被同名命令遮蔽的其他候选项。例如 PowerShell 中的 `where` 可能是 `Where-Object` 的别名；要明确调用 Windows 外部程序可以写 `where.exe`。

在 Bash、Zsh 等 POSIX Shell 中，可以使用：

```sh
command -v ls
command -v git
```

不同 Shell 的解析顺序并不完全相同。可靠的结论应来自当前会话的查询结果，而不是“我记得这个名字一般是什么”。

## 猜测帮助入口，然后查证

对陌生工具，可以依次尝试常见入口：

```text
tool -h
tool --help
tool help
tool help subcommand
```

PowerShell cmdlet 应优先使用 `Get-Help`：

```powershell
Get-Help Get-ChildItem
Get-Help Get-ChildItem -Examples
```

查询版本时常见的形式有：

```text
tool --version
tool -V
tool -v
```

这些写法都只是探查顺序，不是保证。`-v` 也经常表示“输出更多过程信息”，`help` 可能是子命令，也可能被当作普通文件名。程序报告“未知选项”后，应停止猜测并查阅它的官方文档。

::: tip 先判断失败发生在哪一层

- Shell 报“无法识别”或“command not found”：通常还没有找到并启动程序。
- 程序报“unknown option”：程序已经启动，但不接受该参数。
- 程序报“missing argument”：选项可能存在，但缺少选项值或位置参数。
  :::

## 退出状态

程序结束时会返回一个整数退出码。约定上 `0` 表示成功，非零表示失败；非零值的具体含义由程序定义，不能只凭数字猜测原因。

PowerShell 的两个状态变量含义不同：

- `$?` 表示上一条命令是否成功，是布尔值；
- `$LASTEXITCODE` 保存最近一个原生程序或显式退出的 PowerShell 脚本返回的退出码。

在 Windows PowerShell 中可用下面的命令观察原生程序返回的退出码：

```powershell
cmd.exe /c exit 0
$?
$LASTEXITCODE

cmd.exe /c exit 7
$?
$LASTEXITCODE
```

预期两次 `$LASTEXITCODE` 分别为 `0` 和 `7`，第二次 `$?` 为 `False`。`cmd.exe` 在这里仅用于稳定地产生指定退出码，不要求学习它的命令语法。

在 Bash、Zsh 等 POSIX Shell 中，`$?` 保存上一条命令的退出码：

```sh
command -v git
echo $?
```

必须紧接着读取状态；运行下一条命令后，保存的就会是下一条命令的结果。

## 练习：调查一个真实工具

选择本机已经安装的 `git`、`python`、`clang`、`cmake` 或其他工具，不要为了练习临时安装软件。

1. 用 `Get-Command <名称> -All` 确认它是别名、cmdlet 还是外部程序。
2. 记录它的实际位置；如果存在多个候选项，说明默认选择哪一个。
3. 尝试帮助和版本入口，记录哪些有效、哪些无效。
4. 执行一条正常命令和一条带无效选项的命令，立即检查退出状态。
5. 从官方文档确认一个选项的准确含义、适用版本和默认行为。

完成的判据不是“命令运行过”，而是你能区分哪些结论来自实际输出，哪些只是尚待文档确认的猜测。

## 资料与检索词

- [PowerShell 命令优先级](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_command_precedence)：确认同名命令的选择规则。
- [PowerShell 引号规则](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_quoting_rules)：处理变量、空格和复杂参数时查阅。
- [PowerShell 自动变量](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_automatic_variables)：查阅 `$?` 和 `$LASTEXITCODE` 的准确语义。
- 检索：`<工具名> command line reference official`、`<工具名> exit codes official`。
