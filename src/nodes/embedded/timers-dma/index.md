---
{
  "id": "embedded.timers-dma",
  "title": "定时器、PWM 与 DMA",
  "summary": "周期、脉宽与无 CPU 搬运的数据通路。",
  "level": "core",
  "estimatedTime": "3h",
  "concepts": ["timer", "DMA", "sampling"],
  "technologies": ["STM32", "MCU", "motor"],
  "relations":
    [
      { "target": "embedded.clock-reset", "type": "required" },
      { "target": "embedded.interrupts", "type": "recommended" }
    ],
  "parts": []
}
---

# 定时器、PWM 与 DMA

## 要点

- PWM 周期由计数器时钟、预分频与自动重装值共同决定。
- 比较寄存器决定占空比，需受计数范围限制。
- DMA 传输完成不等于应用层数据立即可安全重用。

## 检查题

为何“配置为 1 kHz”仍可能测出错误频率？循环 DMA 缓冲区的生产者和消费者是谁？
