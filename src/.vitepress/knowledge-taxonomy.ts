export const levels = ["intro", "core", "advanced", "integration"] as const

export const levelLabels: Record<(typeof levels)[number], string> = {
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
