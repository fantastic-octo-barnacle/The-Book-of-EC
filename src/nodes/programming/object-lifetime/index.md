---
{
  "id": "programming.object-lifetime",
  "title": "对象与生命周期",
  "summary": "对象有效性、存储期与资源所有权。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["memory", "object", "lifetime", "ownership", "undefined-behavior"],
  "technologies": ["C", "C++"],
  "relations": [{ "target": "programming.translation-linking", "type": "required" }],
  "parts": [{ "title": "原理", "path": "principles", "type": "theory" }, { "title": "练习", "path": "practice", "type": "practice" }]
}
---

# 对象与生命周期

## 要点

- 对象具有类型、大小、存储期和生命周期。
- 指针保存地址，不表示所有权，也不保证地址有效。
- 栈、静态存储区和动态分配的主要差异是生命周期。

## 检查题

返回局部变量地址为何无效？动态分配的对象由谁负责释放？
