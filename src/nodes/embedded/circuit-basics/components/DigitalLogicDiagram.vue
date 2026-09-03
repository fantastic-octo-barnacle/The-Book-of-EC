<script setup lang="ts">
import { computed } from "vue"
import combinationalSvg from "../assets/combinational-logic.svg?raw"
import competitionSvg from "../assets/competition.svg?raw"
import sequentialSvg from "../assets/sequential-logic.svg?raw"

type DiagramKind = "combinational" | "sequential" | "competition"

interface DiagramDefinition {
  title: string
  summary: string
  alt: string
  svg: string
}

const props = defineProps<{
  /** 数字逻辑教学图类型。 */
  kind: DiagramKind
}>()

const diagrams: Record<DiagramKind, DiagramDefinition> = {
  combinational: {
    title: "组合逻辑",
    summary: "输出只由当前输入决定",
    alt: "输入经过组合逻辑后直接决定输出。",
    svg: combinationalSvg
  },
  sequential: {
    title: "时序逻辑",
    summary: "输出可能由先前计算得出的状态决定",
    alt: "组合逻辑与寄存器构成时序逻辑，寄存器输出反馈为状态。",
    svg: sequentialSvg
  },
  competition: {
    title: "交叉读写竞争",
    summary: "D1 和 D2 形成闭环；没有时钟或优先级边界时，最终状态取决于哪条读写路径先完成。",
    alt: "R1 经 D1 写入 R2，R2 经 D2 写入 R1，两条读写路径形成闭环竞争。",
    svg: competitionSvg
  }
}

const diagram = computed(() => diagrams[props.kind])
</script>

<template>
  <figure class="digital-logic-diagram generated-diagram">
    <figcaption>
      <strong>{{ diagram.title }}</strong>
      <span>{{ diagram.summary }}</span>
    </figcaption>

    <div
      class="generated-diagram-canvas"
      role="img"
      :aria-label="diagram.alt"
      v-html="diagram.svg"
    ></div>
  </figure>
</template>

<style scoped>
.digital-logic-diagram {
  margin: 1.5rem 0;
}

.digital-logic-diagram figcaption {
  display: grid;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}

.digital-logic-diagram strong {
  font-size: 1rem;
}

.digital-logic-diagram span {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.6;
}

.generated-diagram-canvas {
  min-width: max-content;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.generated-diagram-canvas :deep(svg) {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  min-width: 420px;
}
</style>
