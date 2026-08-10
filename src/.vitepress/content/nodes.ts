import communicationProtocolFraming from "#nodes/communication/protocol-framing/meta.ts"
import communicationSerialBuses from "#nodes/communication/serial-buses/meta.ts"
import controlEstimationActuation from "#nodes/control/estimation-actuation/meta.ts"
import controlFeedback from "#nodes/control/feedback/meta.ts"
import controlPid from "#nodes/control/pid/meta.ts"
import controlSamplingModel from "#nodes/control/sampling-model/meta.ts"
import embeddedCircuitBasics from "#nodes/embedded/circuit-basics/meta.ts"
import embeddedClockReset from "#nodes/embedded/clock-reset/meta.ts"
import embeddedDrivers from "#nodes/embedded/drivers/meta.ts"
import embeddedGpio from "#nodes/embedded/gpio/meta.ts"
import embeddedInterrupts from "#nodes/embedded/interrupts/meta.ts"
import embeddedRtos from "#nodes/embedded/rtos/meta.ts"
import embeddedTimersDma from "#nodes/embedded/timers-dma/meta.ts"
import engineeringDebugging from "#nodes/engineering/debugging/meta.ts"
import engineeringGitModel from "#nodes/engineering/git-model/meta.ts"
import engineeringShellBasics from "#nodes/engineering/shell-basics/meta.ts"
import programmingCppResource from "#nodes/programming/cpp-resource/meta.ts"
import programmingObjectLifetime from "#nodes/programming/object-lifetime/meta.ts"
import programmingPointersArrays from "#nodes/programming/pointers-arrays/meta.ts"
import programmingTranslationLinking from "#nodes/programming/translation-linking/meta.ts"
import roboticsBringUp from "#nodes/robotics/bring-up/meta.ts"
import roboticsSystemIntegration from "#nodes/robotics/system-integration/meta.ts"
import type { Concept, Level, Technology } from "./taxonomy.ts"

/** 全部合法节点 ID。 */
export const nodeIds = [
  "engineering.shell-basics",
  "engineering.git-model",
  "engineering.debugging",
  "programming.translation-linking",
  "programming.object-lifetime",
  "programming.pointers-arrays",
  "programming.cpp-resource",
  "embedded.circuit-basics",
  "embedded.clock-reset",
  "embedded.gpio",
  "embedded.interrupts",
  "embedded.timers-dma",
  "embedded.drivers",
  "embedded.rtos",
  "communication.serial-buses",
  "communication.protocol-framing",
  "control.sampling-model",
  "control.feedback",
  "control.pid",
  "control.estimation-actuation",
  "robotics.bring-up",
  "robotics.system-integration"
] as const

/** 合法节点 ID。 */
export type NodeId = (typeof nodeIds)[number]

/** 先修关系的强制程度。 */
export type RelationType = "required" | "recommended"

/** 节点 Markdown 文件的相对路径。 */
export type MarkdownPath = `${string}.md`

/** 节点页面的导航信息。 */
export type NodePart = {
  /** 页面在侧边栏中的标题。 */
  title: string
  /** 相对节点目录的 Markdown 文件路径。 */
  path: MarkdownPath
}

/** 单个节点的完整元数据。 */
export type NodeDefinition = {
  /** 节点的固定 ID。 */
  id: NodeId
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
    target: NodeId
    /** 关系的强制程度。 */
    type: RelationType
  }[]
  /** 全部页面；首项为节点入口。 */
  parts: readonly [NodePart, ...NodePart[]]
}

/** 由各节点目录中的元数据组成的中央注册表。 */
export const nodes = {
  [engineeringShellBasics.id]: engineeringShellBasics,
  [engineeringGitModel.id]: engineeringGitModel,
  [engineeringDebugging.id]: engineeringDebugging,
  [programmingTranslationLinking.id]: programmingTranslationLinking,
  [programmingObjectLifetime.id]: programmingObjectLifetime,
  [programmingPointersArrays.id]: programmingPointersArrays,
  [programmingCppResource.id]: programmingCppResource,
  [embeddedCircuitBasics.id]: embeddedCircuitBasics,
  [embeddedClockReset.id]: embeddedClockReset,
  [embeddedGpio.id]: embeddedGpio,
  [embeddedInterrupts.id]: embeddedInterrupts,
  [embeddedTimersDma.id]: embeddedTimersDma,
  [embeddedDrivers.id]: embeddedDrivers,
  [embeddedRtos.id]: embeddedRtos,
  [communicationSerialBuses.id]: communicationSerialBuses,
  [communicationProtocolFraming.id]: communicationProtocolFraming,
  [controlSamplingModel.id]: controlSamplingModel,
  [controlFeedback.id]: controlFeedback,
  [controlPid.id]: controlPid,
  [controlEstimationActuation.id]: controlEstimationActuation,
  [roboticsBringUp.id]: roboticsBringUp,
  [roboticsSystemIntegration.id]: roboticsSystemIntegration
} satisfies Record<NodeId, NodeDefinition>

/** 前端使用的节点数据。 */
export type GraphNode = NodeDefinition & {
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
  return nodeIds
    .map((id) => ({ ...nodes[id], route: nodePartRoute(id, nodes[id].parts[0].path) }))
    .sort((a, b) => a.title.localeCompare(b.title, "zh-CN"))
}
