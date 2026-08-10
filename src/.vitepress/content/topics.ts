import type { NodeId } from "./nodes.ts"

type TopicShape = {
  title: string
  summary: string
  members: readonly NodeId[]
}

function defineTopics<const Registry extends Record<string, TopicShape>>(registry: Registry) {
  return registry
}

export const topics = defineTopics({
  engineering: {
    title: "工程与协作",
    summary: "命令行、版本管理和调试的工程基础。",
    members: ["engineering.shell-basics", "engineering.git-model", "engineering.debugging"]
  },
  programming: {
    title: "C/C++ 与程序运行",
    summary: "从构建过程到内存对象与资源管理。",
    members: [
      "programming.translation-linking",
      "programming.object-lifetime",
      "programming.pointers-arrays",
      "programming.cpp-resource"
    ]
  },
  embedded: {
    title: "电子与嵌入式",
    summary: "从板级约束到 MCU、外设与并发。",
    members: [
      "embedded.circuit-basics",
      "embedded.clock-reset",
      "embedded.gpio",
      "embedded.interrupts",
      "embedded.timers-dma",
      "embedded.drivers",
      "embedded.rtos"
    ]
  },
  communication: {
    title: "通信",
    summary: "总线约束、帧语义与协议诊断。",
    members: ["communication.serial-buses", "communication.protocol-framing"]
  },
  control: {
    title: "控制与机器人",
    summary: "采样、反馈、PID 与估计。",
    members: [
      "control.sampling-model",
      "control.feedback",
      "control.pid",
      "control.estimation-actuation"
    ]
  },
  robotics: {
    title: "RoboMaster 实践",
    summary: "板级启动和跨模块系统联调。",
    members: ["robotics.bring-up", "robotics.system-integration"]
  }
})

export type TopicId = keyof typeof topics

export type GraphTopic = (typeof topics)[TopicId] & {
  id: TopicId
  route: string
}

export function graphTopics(): GraphTopic[] {
  return (Object.entries(topics) as [TopicId, (typeof topics)[TopicId]][]).map(([id, topic]) => ({
    ...topic,
    id,
    route: `/map/topics/${id}`
  }))
}
