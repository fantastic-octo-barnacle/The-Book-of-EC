---
{
  'id': 'programming.pointers-arrays',
  'title': '指针与数组',
  'summary': '地址运算、数组退化与边界。',
  'level': 'core',
  'estimatedTime': '2h',
  'concepts': ['pointer', 'array', 'memory'],
  'technologies': ['C'],
  'relations': [{ 'target': 'programming.object-lifetime', 'type': 'required' }],
  'parts': []
}
---

# 指针与数组

## 要点

- 数组对象与指向首元素的指针不同。
- 数组传入函数后通常转换为指针，长度信息不再保留。
- 指针运算只在同一数组对象的有效范围内有定义。

## 检查题

为什么函数内不能用 `sizeof` 得到传入数组长度？数组越界为何可能不立即崩溃？
