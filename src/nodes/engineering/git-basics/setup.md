# 首次 Git 配置

本节完成使用 Git 前必要的环境配置。

## 安装

详见 [Git 官方安装说明](https://git-scm.com/install/)。

## 确认 Git 可用

在终端中运行：

```sh
git --version
```

如果命令成功，终端会输出 Git 及其版本号，例如 `git version 2.x.x`。具体版本号可能不同。

如果终端报告找不到 `git`，请检查环境变量 `PATH` 配置是否正确。

## 配置提交身份

Git 会在每个 commit 中记录作者姓名和邮箱。将示例值替换为你希望出现在项目历史中的身份：

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

这里的姓名和邮箱用于标识 commit 作者，不是登录凭据。向他人共享仓库时，这些信息也可能随 commit 一起公开。

`--global` 表示将这些设置用于当前系统用户，如果不加 `--global`，则只在当前仓库生效。你可以在不同仓库使用不同的身份。

## 设置默认分支名

Git 创建仓库时，默认使用 `master` 作为初始分支名。由于某些历史原因，GitHub 等平台将默认分支名改为了 `main`，为了保持统一，我们希望以后 Git 创建的仓库也默认使用 `main`：

```sh
git config --global init.defaultBranch main
```

## 验证配置

分别读取刚才写入的值：

```sh
git config --global user.name
git config --global user.email
git config --global init.defaultBranch
```

三条命令的输出应当与之前的设置一致。如果输出为空或内容错误，重新执行对应的配置命令即可。
