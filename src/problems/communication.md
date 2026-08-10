---
title: 通信
prev: false
next: false
---

# 通信

| 现象                 | 首要观测                               | 排查边界                   | 相关节点                                                                                                  |
| -------------------- | -------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| UART 数据乱码        | 两端实际波形、波特率和帧格式           | 电气与时序是否一致         | [串行总线](/nodes/communication/serial-buses/)                                                            |
| CAN 间歇丢帧         | 终端、错误计数、总线负载、位时序和接地 | 总线错误还是应用层丢弃     | [串行总线](/nodes/communication/serial-buses/)、[帧与协议解析](/nodes/communication/protocol-framing/)    |
| 接收数据偶发错位     | 原始字节流、长度、校验和恢复位置       | 一次读取是否被误认为一帧   | [帧与协议解析](/nodes/communication/protocol-framing/)                                                    |
| 接收速度高于处理速度 | 缓冲区占用、溢出计数和消费周期         | 数据搬运、帧解析与业务消费 | [帧与协议解析](/nodes/communication/protocol-framing/)、[定时器、PWM 与 DMA](/nodes/embedded/timers-dma/) |
