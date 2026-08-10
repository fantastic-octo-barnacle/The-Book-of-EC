---
{
  'id': 'embedded.gpio',
  'title': 'GPIO 与引脚复用',
  'summary': '引脚模式、复用、电气属性与外部连接。',
  'level': 'core',
  'estimatedTime': '2h',
  'concepts': ['GPIO', 'pinmux', 'logic-level'],
  'technologies': ['STM32', 'MCU'],
  'relations': [{ 'target': 'embedded.clock-reset', 'type': 'required' }],
  'parts': []
}
---

# GPIO 与引脚复用

## 要点

- GPIO 模式、上下拉、输出类型和速度决定电气行为。
- 复用功能须同时满足芯片配置、板级连线和外设时钟。
- 读取引脚状态与读取输出寄存器不是同一件事。

## 检查题

配置正确却无波形，除寄存器外还应检查什么？内部上拉能否替代所有外部上拉？
