---
{
  "id": "programming.cpp-resource",
  "title": "C++ 资源管理",
  "summary": "RAII、所有权与嵌入式约束。",
  "level": "advanced",
  "estimatedTime": "3h",
  "concepts": ["ownership", "lifetime"],
  "technologies": ["C++"],
  "relations": [{ "target": "programming.object-lifetime", "type": "required" }],
  "parts": []
}
---

# C++ 资源管理

## 要点

- RAII 将资源获取和释放绑定到对象生命周期。
- 值、引用和所有权是不同概念。
- MCU 项目需明确异常、RTTI、堆分配和代码尺寸约束。

## 检查题

`unique_ptr` 表达了什么约束？动态分配前需要确定哪些失败策略？
