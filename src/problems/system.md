---
title: 硬件、通信与控制问题
---

# 硬件、通信与控制问题

| 现象 | 第一条有区分度的观测 | 回到原理 |
| --- | --- | --- |
| 板子无法下载/启动 | 电源轨、复位、调试接口、时钟 | [上电与板级调试](/practice/bring-up)、[MCU](/embedded/mcu) |
| 外设无响应 | 引脚复用/电平、时钟、片选/地址、原始波形 | [MCU](/embedded/mcu)、[驱动](/embedded/drivers) |
| UART 数据乱码 | 双方帧格式、实际位宽和波特率波形 | [串行与现场总线](/communication/buses) |
| CAN 间歇丢帧 | 终端、错误计数、总线负载、位时序、接地 | [串行与现场总线](/communication/buses)、[协议](/communication/protocols) |
| 电机不转或方向异常 | 供电/使能、功率输出、反馈方向、指令单位 | [上电](/practice/bring-up)、[反馈控制](/control/feedback) |
| 机构抖动、超调或发散 | 原始反馈、采样周期、饱和、负载与控制量 | [反馈控制](/control/feedback)、[估计与电机](/control/estimation) |
| 传感器读数跳变/漂移 | 原始数据、供电、标定、时间戳、滤波延迟 | [驱动](/embedded/drivers)、[估计与电机](/control/estimation) |

## 不能省略的安全边界

遇到异常电流、发热、机械碰撞风险或不可预期运动时，先断开高功率执行器并按项目安全流程处理。任何“为了看一眼现象”而绕过限位、限流或急停的行为都不应成为调试步骤。
