export const levels = ["intro", "core", "advanced", "integration"] as const

export type Level = (typeof levels)[number]

export const levelLabels: Record<Level, string> = {
  intro: "入门",
  core: "核心",
  advanced: "进阶",
  integration: "综合"
}

export const concepts = [
  "array",
  "bus-topology",
  "clock",
  "compilation",
  "concurrency",
  "CRC",
  "debugging",
  "DMA",
  "driver",
  "feedback",
  "frame",
  "GPIO",
  "interrupt",
  "latency",
  "lifetime",
  "linking",
  "logic-level",
  "memory",
  "object",
  "ownership",
  "PID",
  "pinmux",
  "pointer",
  "power",
  "priority",
  "process",
  "protocol",
  "reset",
  "saturation",
  "sampling",
  "shared-state",
  "shell",
  "standard-stream",
  "startup",
  "state-estimation",
  "synchronization",
  "timer",
  "undefined-behavior",
  "version-control"
] as const

export type Concept = (typeof concepts)[number]

export const technologies = [
  "C",
  "C++",
  "CAN",
  "Cortex-M",
  "FreeRTOS",
  "Git",
  "I2C",
  "IMU",
  "Linux",
  "MCU",
  "motor",
  "RoboMaster",
  "shell",
  "SPI",
  "STM32",
  "UART"
] as const

export type Technology = (typeof technologies)[number]
