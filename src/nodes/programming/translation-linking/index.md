---
{
  "id": "programming.translation-linking",
  "title": "翻译与链接",
  "summary": "源文件如何成为可执行程序。",
  "level": "core",
  "estimatedTime": "2h",
  "concepts": ["compilation", "linking"],
  "technologies": ["C", "C++"],
  "relations": [{ "target": "engineering.shell-basics", "type": "required" }],
  "parts": []
}
---

# 翻译与链接

## 要点

- 预处理、编译、汇编、链接依次处理程序。
- 声明给出名称和类型；定义提供实体。
- 链接错误通常是符号、目标文件或库顺序问题。

## 检查题

编译通过而链接失败，说明错误发生在哪一阶段？`extern` 为什么不能替代定义？
