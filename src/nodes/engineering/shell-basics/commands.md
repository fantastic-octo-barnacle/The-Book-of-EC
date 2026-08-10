# 命令、参数与工具探查

面对一个没用过的命令时，不需要先背下全部用法。先辨认命令结构，再确认实际工具，最后从工具自己的帮助中查证参数。

## 命令名和参数

观察下面这条命令：

```sh
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

“位置参数（Positional Parameters）”“选项（Options）”“子命令（Subcommands）”是程序赋予参数的语义，不是 Shell 从拼写中强制规定的。短选项、长选项也只是常见约定，不是所有工具共同遵守的语法标准。

有些工具允许把短选项合并，有些工具使用 `/help`，还有些工具只接受固定位置的参数。不要仅凭外形推断一个陌生选项一定有效。

::: tip 先判断失败发生在哪一层

- Shell 报“无法识别”或“command not found”：通常还没有找到并启动程序。
- 程序报“unknown option”：程序已经启动，但不接受该参数。
- 程序报“missing argument”：选项可能存在，但缺少选项值或位置参数。

:::

### 长选项、短选项

长选项通常以两个连字符开头，例如 `--help`；短选项以一个连字符开头，例如 `-h`。长选项通常更易读，而短选项则更节省空间。

很多时候，长选项会有一个对应的短选项别名。例如：

```sh
# 查看 Git 版本：
git --version
git -v

# 查看 CMake 帮助：
cmake --help
cmake -h

# 列出所有文件（包括隐藏文件）：
ls --all
ls -a
```

### 带值选项

有些选项接收一个或多个值，但不同程序传值的方式并不统一。常见的写法有：

- 选项和值用空格分开：

  ```sh
  git log -n 5
  ```

  Shell 会产生两个参数：`-n` 和 `5`，Git 将 `5` 解释为 `-n` 的值。

- 等号连接选项和值：

  ```sh
  git log --max-count=5
  ```

  `--max-count=5` 是一个参数，Git 在其内部拆出选项名和值。

- 短选项和值直接连写：

  ```sh
  clang -Iinclude -DNDEBUG main.c
  ```

  Clang 将 `include` 解释为一个头文件搜索目录，`NDEBUG` 解释为一个宏定义。`-I`、`-D` 都是短选项，后面紧跟的文本就是它们的值。

- 重复选项以提供多个值：

  ```sh
  clang -Iinclude -Ithird_party/include main.c
  ```

  两次 `-I` 各提供一个目录：先后将 `include`、`third_party/include` 添加到头文件搜索路径中。

- 一个选项后跟多个值：

  ```sh
  cmake --build build --target app tests
  ```

  CMake 将 `build` 作为 `--build` 的值，`app`、`tests` 都作为 `--target` 的值。

这些形式不能随意互换。某个程序支持 `--option=value`，不代表它也支持 `--option value`；逗号可能是分隔符，也可能只是值中的普通字符。对原生程序而言，空白和引号先决定传入几个参数，程序再解释每个参数；对 PowerShell cmdlet 而言，PowerShell 还会按参数声明进行类型转换和绑定。准确写法应以当前工具的帮助和官方文档为准。

## 空白和引号决定参数边界

Shell 通常用空白分隔参数。先只观察参数边界：

```sh
tool one two
tool "one two"
```

第一行中的 `one` 和 `two` 是两个参数，第二行中的 `one two` 是一个参数。文件名或目录名含有空格时也需要引号：

```sh
git add hello.txt world.txt "hello world.txt"
```

Shell 会把它们拆成四个参数：`add`、`hello.txt`、`world.txt` 和 `hello world.txt`。

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
Get-Command where
```

在 Bash、Zsh 等 POSIX Shell 中，则可以使用：

```bash
which ls
which git
which where
```

不同 Shell 的解析顺序并不完全相同。可靠的结论应来自当前会话的查询结果，而不是“我记得这个名字一般是什么”。

## 帮助和版本

### 帮助信息

各种程序通常都会提供帮助信息，告知我们如何使用。一些常见程序及查看它们的帮助信息的方法如下：

```sh
# Git 的帮助入口：
git --help         # 长选项形式
git -h             # 短选项形式
git help           # 子命令形式

# 列出所有 Git 子命令：
git help -a

# 查询 Git 某一子命令的帮助（以 `log` 为例）：
git help log

# Python 的帮助入口：
python --help
python -h

# GCC、Clang、CMake 的帮助入口：
gcc --help
clang --help
cmake --help
```

可以看出帮助入口的写法并不统一，但有一些常见约定。遇到陌生的应用程序时，可以先尝试这些常见写法打开其帮助文档。

对于 PowerShell cmdlet 应优先使用 `Get-Help`：

```powershell
Get-Help Get-ChildItem
Get-Help ls              # PowerShell 中的 `ls` 是 `Get-ChildItem` 的别名
Get-Help Set-Location
Get-Help cd              # PowerShell 中的 `cd` 是 `Set-Location` 的别名
```

### 版本信息

还有一个常见的需求是查询应用程序的版本。不同程序的写法也不统一，常见的形式有：

```sh
# Git 的版本信息：
git --version
git -v
git version        # 子命令形式也支持

# Python 的版本号：
python --version
python -V          # 注意是大写

# GCC、Clang、CMake 的版本信息：
gcc --version
clang --version
cmake --version
```

有时候，小写的 `-v` 是 `--verbose` 的缩写，表示“详细输出”，而不是版本信息。

## 练习：调查真实工具

依次调查以下命令：`git`、`g++`、`ninja`、`pip`、`code`、`calc`、`winget`、`wsl`.

1. 在你的环境中，它是否是合法命令？如果是，接着完成下列步骤。
2. 确认它的类型，是别名、cmdlet 还是外部程序。如果是外部程序，确认它的路径和文件名。
3. 确认它的版本信息。
4. 尝试打开它的帮助文档，确认至少一个选项的用法和含义。

## 拓展资料

- [PowerShell 引号规则](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_quoting_rules)：处理变量、空格和复杂参数时查阅。
