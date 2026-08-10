import type { Concept, Level, Technology } from "./taxonomy.ts"

/** 先修关系的强制程度。 */
export type RelationType = "required" | "recommended"

/** 节点 Markdown 文件的相对路径。 */
type MarkdownPath = `${string}.md`

/** 节点页面的导航信息。 */
type NodePart = {
  /** 页面在侧边栏中的标题。 */
  title: string
  /** 相对节点目录的 Markdown 文件路径。 */
  path: MarkdownPath
}

/** 节点注册项的公共结构。 */
type NodeShape<Id extends string> = {
  /** 节点显示名称。 */
  title: string
  /** 节点学习目标的简述。 */
  summary: string
  /** 建议学习阶段。 */
  level: Level
  /** 完成节点的大致用时。 */
  estimatedTime: string
  /** 节点覆盖的概念。 */
  concepts: readonly Concept[]
  /** 节点涉及的技术。 */
  technologies: readonly Technology[]
  /** 指向直接先修节点的关系。 */
  relations: readonly {
    /** 先修节点 ID。 */
    target: Id
    /** 关系的强制程度。 */
    type: RelationType
  }[]
  /** 全部页面；首项为节点入口。 */
  parts: readonly [NodePart, ...NodePart[]]
}

/** 保留节点键的字面量类型，并限制关系只能指向注册节点。 */
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
      { title: "命令行基础", path: "index.md" },
      { title: "命令、参数与工具探查", path: "commands.md" },
      { title: "目录、路径与文件操作", path: "filesystem.md" },
      { title: "环境变量、PATH 与命令运行", path: "environment.md" }
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
    parts: [
      { title: "Git 状态模型", path: "index.md" },
      { title: "练习", path: "practice.md" }
    ]
  },
  "engineering.debugging": {
    title: "调试与测量",
    summary: "以观测区分假设，并控制观测本身的影响。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["debugging", "latency"],
    technologies: ["MCU"],
    relations: [{ target: "programming.object-lifetime", type: "recommended" }],
    parts: [{ title: "调试与测量", path: "index.md" }]
  },
  "programming.translation-linking": {
    title: "翻译与链接",
    summary: "源文件如何成为可执行程序。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["compilation", "linking"],
    technologies: ["C", "C++"],
    relations: [{ target: "engineering.shell-basics", type: "required" }],
    parts: [{ title: "翻译与链接", path: "index.md" }]
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
      { title: "对象与生命周期", path: "index.md" },
      { title: "原理", path: "principles.md" },
      { title: "练习", path: "practice.md" }
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
    parts: [{ title: "指针与数组", path: "index.md" }]
  },
  "programming.cpp-resource": {
    title: "C++ 资源管理",
    summary: "RAII、所有权与嵌入式约束。",
    level: "advanced",
    estimatedTime: "3h",
    concepts: ["ownership", "lifetime"],
    technologies: ["C++"],
    relations: [{ target: "programming.object-lifetime", type: "required" }],
    parts: [{ title: "C++ 资源管理", path: "index.md" }]
  },
  "embedded.circuit-basics": {
    title: "电路与电平基础",
    summary: "供电、参考地、逻辑电平与信号完整性的基本约束。",
    level: "intro",
    estimatedTime: "2h",
    concepts: ["power", "logic-level"],
    technologies: ["MCU"],
    relations: [],
    parts: [{ title: "电路与电平基础", path: "index.md" }]
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
    parts: [{ title: "时钟、复位与启动", path: "index.md" }]
  },
  "embedded.gpio": {
    title: "GPIO 与引脚复用",
    summary: "引脚模式、复用、电气属性与外部连接。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["GPIO", "pinmux", "logic-level"],
    technologies: ["STM32", "MCU"],
    relations: [{ target: "embedded.clock-reset", type: "required" }],
    parts: [{ title: "GPIO 与引脚复用", path: "index.md" }]
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
    parts: [{ title: "中断与事件响应", path: "index.md" }]
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
    parts: [{ title: "定时器、PWM 与 DMA", path: "index.md" }]
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
    parts: [{ title: "外设驱动边界", path: "index.md" }]
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
    parts: [{ title: "RTOS 并发基础", path: "index.md" }]
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
    parts: [{ title: "串行总线", path: "index.md" }]
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
    parts: [{ title: "帧与协议解析", path: "index.md" }]
  },
  "control.sampling-model": {
    title: "采样与系统模型",
    summary: "对象、单位、采样周期与离散时间。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["sampling", "feedback"],
    technologies: ["IMU", "motor"],
    relations: [{ target: "embedded.circuit-basics", type: "recommended" }],
    parts: [{ title: "采样与系统模型", path: "index.md" }]
  },
  "control.feedback": {
    title: "反馈与稳定性",
    summary: "闭环结构、误差修正与性能约束。",
    level: "core",
    estimatedTime: "3h",
    concepts: ["feedback", "sampling", "saturation"],
    technologies: ["motor"],
    relations: [{ target: "control.sampling-model", type: "required" }],
    parts: [
      { title: "反馈与稳定性", path: "index.md" },
      { title: "实验", path: "practice.md" }
    ]
  },
  "control.pid": {
    title: "离散 PID 与饱和",
    summary: "比例、积分、微分项及积分饱和处理。",
    level: "core",
    estimatedTime: "2h",
    concepts: ["PID", "feedback", "saturation", "sampling"],
    technologies: ["motor"],
    relations: [{ target: "control.feedback", type: "required" }],
    parts: [{ title: "离散 PID 与饱和", path: "index.md" }]
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
    parts: [{ title: "估计与执行器约束", path: "index.md" }]
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
    parts: [{ title: "板级上电与启动", path: "index.md" }]
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
    parts: [{ title: "系统联调", path: "index.md" }]
  }
})

/** 节点注册表中的合法键。 */
export type NodeId = keyof typeof nodes

/** 任一已注册节点的定义。 */
export type NodeDefinition = (typeof nodes)[NodeId]

/** 前端使用的节点数据。 */
export type GraphNode = NodeDefinition & {
  /** 节点注册表键。 */
  id: NodeId
  /** 节点入口页路由。 */
  route: string
}

/** 将点分隔的节点 ID 转换为节点目录路由。 */
export function nodeRoute(id: NodeId) {
  return `/nodes/${id.replaceAll(".", "/")}/`
}

/** 将节点内的 Markdown 路径转换为页面路由。 */
export function nodePartRoute(id: NodeId, path: MarkdownPath) {
  const page = path.slice(0, -".md".length)
  const routePath = page === "index" ? "" : page.replace(/\/index$/, "/")
  return `${nodeRoute(id)}${routePath}`
}

/** 生成按中文标题排序的前端节点列表。 */
export function graphNodes(): GraphNode[] {
  return (Object.entries(nodes) as [NodeId, NodeDefinition][])
    .map(([id, node]) => ({ ...node, id, route: nodePartRoute(id, node.parts[0].path) }))
    .sort((a, b) => a.title.localeCompare(b.title, "zh-CN"))
}
