import type { Concept, Level, Technology } from "./taxonomy.ts"

export type RelationType = "required" | "recommended"

type NodePart = {
  title: string
  path: string
}

type NodeShape<Id extends string> = {
  title: string
  summary: string
  level: Level
  estimatedTime: string
  concepts: readonly Concept[]
  technologies: readonly Technology[]
  relations: readonly { target: Id; type: RelationType }[]
  parts: readonly NodePart[]
}

function defineNodes<const Registry extends Record<string, NodeShape<keyof Registry & string>>>(
  registry: Registry
) {
  return registry
}

export const nodes = defineNodes({
  "engineering.shell-basics": {
    title: "命令行基础",
    summary: "命令结构、文件导航、工具解析与运行环境。",
    level: "intro",
    estimatedTime: "3h",
    concepts: ["shell", "process", "filesystem", "environment-variable"],
    technologies: ["Windows", "Linux", "PowerShell", "shell"],
    relations: [],
    parts: [
      { title: "命令、参数与工具探查", path: "commands" },
      { title: "目录、路径与文件操作", path: "filesystem" },
      { title: "环境变量、PATH 与命令运行", path: "environment" }
    ]
  },
  "engineering.git-model": {
    title: "Git 状态模型",
    summary: "工作区、暂存区、提交与引用。",
    level: "intro",
    estimatedTime: "2h",
    concepts: ["version-control"],
    technologies: ["Git"],
    relations: [{ target: "engineering.shell-basics", type: "recommended" }],
    parts: [{ title: "练习", path: "practice" }]
  },
  "engineering.debugging": {
    title: "调试与测量",
    summary: "以观测区分假设，并控制观测本身的影响。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["debugging", "latency"],
    technologies: ["MCU"],
    relations: [{ target: "programming.object-lifetime", type: "recommended" }],
    parts: []
  },
  "programming.translation-linking": {
    title: "翻译与链接",
    summary: "源文件如何成为可执行程序。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["compilation", "linking"],
    technologies: ["C", "C++"],
    relations: [{ target: "engineering.shell-basics", type: "required" }],
    parts: []
  },
  "programming.object-lifetime": {
    title: "对象与生命周期",
    summary: "对象有效性、存储期与资源所有权。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["memory", "object", "lifetime", "ownership", "undefined-behavior"],
    technologies: ["C", "C++"],
    relations: [{ target: "programming.translation-linking", type: "required" }],
    parts: [
      { title: "原理", path: "principles" },
      { title: "练习", path: "practice" }
    ]
  },
  "programming.pointers-arrays": {
    title: "指针与数组",
    summary: "地址运算、数组退化与边界。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["pointer", "array", "memory"],
    technologies: ["C"],
    relations: [{ target: "programming.object-lifetime", type: "required" }],
    parts: []
  },
  "programming.cpp-resource": {
    title: "C++ 资源管理",
    summary: "RAII、所有权与嵌入式约束。",
    level: "advanced",
    estimatedTime: "3h",
    concepts: ["ownership", "lifetime"],
    technologies: ["C++"],
    relations: [{ target: "programming.object-lifetime", type: "required" }],
    parts: []
  },
  "embedded.circuit-basics": {
    title: "电路与电平基础",
    summary: "供电、参考地、逻辑电平与信号完整性的基本约束。",
    level: "intro",
    estimatedTime: "2h",
    concepts: ["power", "logic-level"],
    technologies: ["MCU"],
    relations: [],
    parts: []
  },
  "embedded.clock-reset": {
    title: "时钟、复位与启动",
    summary: "MCU 从上电到执行应用程序的路径。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["clock", "reset", "startup"],
    technologies: ["STM32", "MCU"],
    relations: [
      { target: "embedded.circuit-basics", type: "required" },
      { target: "programming.translation-linking", type: "recommended" }
    ],
    parts: []
  },
  "embedded.gpio": {
    title: "GPIO 与引脚复用",
    summary: "引脚模式、复用、电气属性与外部连接。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["GPIO", "pinmux", "logic-level"],
    technologies: ["STM32", "MCU"],
    relations: [{ target: "embedded.clock-reset", type: "required" }],
    parts: []
  },
  "embedded.interrupts": {
    title: "中断与事件响应",
    summary: "中断优先级、延迟与中断上下文约束。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["interrupt", "latency", "priority", "shared-state"],
    technologies: ["Cortex-M", "MCU"],
    relations: [
      { target: "embedded.clock-reset", type: "required" },
      { target: "programming.object-lifetime", type: "recommended" }
    ],
    parts: []
  },
  "embedded.timers-dma": {
    title: "定时器、PWM 与 DMA",
    summary: "周期、脉宽与无 CPU 搬运的数据通路。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["timer", "DMA", "sampling"],
    technologies: ["STM32", "MCU", "motor"],
    relations: [
      { target: "embedded.clock-reset", type: "required" },
      { target: "embedded.interrupts", type: "recommended" }
    ],
    parts: []
  },
  "embedded.drivers": {
    title: "外设驱动边界",
    summary: "初始化、状态、错误与硬件抽象。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["driver", "synchronization"],
    technologies: ["MCU"],
    relations: [
      { target: "embedded.gpio", type: "required" },
      { target: "embedded.interrupts", type: "recommended" }
    ],
    parts: []
  },
  "embedded.rtos": {
    title: "RTOS 并发基础",
    summary: "任务调度、同步原语与实时性约束。",
    level: "advanced",
    estimatedTime: "3h",
    concepts: ["concurrency", "shared-state", "priority", "synchronization"],
    technologies: ["FreeRTOS", "MCU"],
    relations: [
      { target: "embedded.interrupts", type: "required" },
      { target: "programming.object-lifetime", type: "required" }
    ],
    parts: []
  },
  "communication.serial-buses": {
    title: "串行总线",
    summary: "UART、SPI、I²C 与 CAN 的电气和时序模型。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["bus-topology", "synchronization", "logic-level"],
    technologies: ["UART", "SPI", "I2C", "CAN", "MCU"],
    relations: [
      { target: "embedded.gpio", type: "required" },
      { target: "embedded.drivers", type: "recommended" }
    ],
    parts: []
  },
  "communication.protocol-framing": {
    title: "帧与协议解析",
    summary: "消息边界、校验、恢复同步与缓冲区。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["protocol", "frame", "CRC", "synchronization", "memory"],
    technologies: ["CAN", "UART"],
    relations: [
      { target: "communication.serial-buses", type: "required" },
      { target: "programming.pointers-arrays", type: "recommended" }
    ],
    parts: []
  },
  "control.sampling-model": {
    title: "采样与系统模型",
    summary: "对象、单位、采样周期与离散时间。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["sampling", "feedback"],
    technologies: ["IMU", "motor"],
    relations: [{ target: "embedded.circuit-basics", type: "recommended" }],
    parts: []
  },
  "control.feedback": {
    title: "反馈与稳定性",
    summary: "闭环结构、误差修正与性能约束。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["feedback", "sampling", "saturation"],
    technologies: ["motor"],
    relations: [{ target: "control.sampling-model", type: "required" }],
    parts: [{ title: "实验", path: "practice" }]
  },
  "control.pid": {
    title: "离散 PID 与饱和",
    summary: "比例、积分、微分项及积分饱和处理。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["PID", "feedback", "saturation", "sampling"],
    technologies: ["motor"],
    relations: [{ target: "control.feedback", type: "required" }],
    parts: []
  },
  "control.estimation-actuation": {
    title: "估计与执行器约束",
    summary: "滤波延迟、状态估计与电机的性能边界。",
    level: "advanced",
    estimatedTime: "3h",
    concepts: ["state-estimation", "sampling", "feedback", "saturation"],
    technologies: ["IMU", "motor"],
    relations: [
      { target: "control.pid", type: "required" },
      { target: "embedded.timers-dma", type: "recommended" }
    ],
    parts: []
  },
  "robotics.bring-up": {
    title: "板级上电与启动",
    summary: "按供电、复位、时钟、下载和最小输出分层验证。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["power", "reset", "startup", "debugging"],
    technologies: ["RoboMaster", "STM32", "MCU"],
    relations: [
      { target: "embedded.circuit-basics", type: "required" },
      { target: "embedded.clock-reset", type: "required" },
      { target: "engineering.debugging", type: "required" }
    ],
    parts: []
  },
  "robotics.system-integration": {
    title: "系统联调",
    summary: "按层观测输入、数据、控制量与执行器输出。",
    level: "integration",
    estimatedTime: "持续",
    concepts: ["debugging", "protocol", "feedback"],
    technologies: ["RoboMaster", "CAN", "motor"],
    relations: [
      { target: "embedded.drivers", type: "required" },
      { target: "communication.protocol-framing", type: "required" },
      { target: "control.pid", type: "required" },
      { target: "robotics.bring-up", type: "recommended" }
    ],
    parts: []
  }
})

export type NodeId = keyof typeof nodes

export type NodeDefinition = (typeof nodes)[NodeId]

export type GraphNode = NodeDefinition & {
  id: NodeId
  route: string
}

export function nodeRoute(id: NodeId) {
  return `/nodes/${id.replaceAll(".", "/")}/`
}

export function graphNodes(): GraphNode[] {
  return (Object.entries(nodes) as [NodeId, NodeDefinition][])
    .map(([id, node]) => ({ ...node, id, route: nodeRoute(id) }))
    .sort((a, b) => a.title.localeCompare(b.title, "zh-CN"))
}
