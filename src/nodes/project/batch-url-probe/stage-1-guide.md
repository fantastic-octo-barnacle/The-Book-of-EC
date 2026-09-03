# 第一阶段流程提示

## 1. 准备工具链

从 [Rust 官方安装页](https://rust-lang.org/tools/install/)了解 rustup，并按对应操作系统的说明安装稳定版工具链。至少确认自己知道 `rustc`、Cargo、rustfmt 和 Clippy 分别负责什么，以及如何判断它们已经可用。

若 Git 或 GitHub 尚不熟悉，先阅读 [Pro Git](https://git-scm.com/book/zh/v2) 的入门与 Git 基础部分，以及 [GitHub 仓库文档](https://docs.github.com/zh/repositories/creating-and-managing-repositories)。本项目要求使用 GitHub 仓库，但不要求 Issue 或 PR 工作流。

## 2. 补齐 Rust 与 Cargo 基础

开始写网络代码前，至少理解：

- 变量、函数、结构体、枚举和 `match`；
- 所有权、借用与按值移动；
- `Option`、`Result` 和可恢复错误；
- `Duration`、`Instant` 与单元测试；
- Cargo 包、依赖、feature、bin target、`Cargo.toml` 和 `Cargo.lock` 的作用。

[The Rust Programming Language](https://doc.rust-lang.org/book/) 可用于学习语言基础、[错误处理](https://doc.rust-lang.org/book/ch09-00-error-handling.html)和[自动化测试](https://doc.rust-lang.org/book/ch11-00-testing.html)；[Cargo Guide](https://doc.rust-lang.org/cargo/guide/)说明如何创建和组织包，[Cargo Targets](https://doc.rust-lang.org/cargo/reference/cargo-targets.html)说明 bin target。先理解当前步骤需要的内容，不必一次读完整本书。

## 3. 创建仓库和项目

查阅 Cargo 的[创建新包](https://doc.rust-lang.org/cargo/guide/creating-a-new-project.html)说明，自行创建二进制项目。创建后检查：

- 本地 Git 仓库和 GitHub 仓库已经关联；
- `Cargo.toml` 明确登记同步 bin；
- README、`.gitignore` 和源码已纳入版本管理；
- `Cargo.lock` 会提交，`target/` 不会提交；
- reqwest 已启用阻塞接口所需的 feature，并能说明依赖和 feature 的用途。

这里只检查结果，不要求采用某一种创建顺序。

## 4. 先固定行为，再写批处理

先写下成功判定、超时、计时起止点和输出字段，再使用[项目总览](./index)给出的正式验收集。不要自行更换目标或依赖偶然缓慢的网站制造测试结果。

实现时按以下顺序缩小问题：

1. 完成一个正常 URL 的同步请求并取得状态。
2. 加入单项计时和统一结果表示。
3. 依次处理固定列表，确保失败后仍继续。
4. 汇总成功数、失败数和总耗时。
5. 抽出不依赖网络的判定或汇总逻辑并测试。

每完成一个可运行的小结果就检查代码并创建内容明确的 commit。不要等全部完成后只提交一次。

## 5. 使用资料和 AI

从 [reqwest 文档](https://docs.rs/reqwest/latest/reqwest/)确认阻塞接口、client 复用、feature 和超时的语义。可以让 AI 解释编译错误、比较设计或提出测试边界，但采用代码前必须：

- 能逐段说明它在做什么；
- 对照官方文档核对 API 与 feature；
- 用编译器、Clippy 和测试验证结论；
- 删除与本项目无关的抽象和依赖。

“能够运行一次”不能证明错误路径正确，也不能替代对代码的理解。

## 6. 验收并冻结阶段成果

使用固定目标检查：

- 每个目标都有结果和耗时；
- 正常、非 `2xx`、无效或连接失败、延迟和超时均可观察；
- 一个目标失败后，后续目标仍会执行；
- 汇总计数与逐项结果一致；
- 总耗时覆盖整批过程，并与顺序执行的现象一致；
- README 记录的条件足以让他人复现。

全部检查通过后再创建 `stage-1-sync` tag。参考 [Pro Git 的标签说明](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)理解 tag 指向的提交及远程 tag；不要把 tag 打在未完成的提交上。
