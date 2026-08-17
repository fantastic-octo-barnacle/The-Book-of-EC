<script setup lang="ts">
import clockTimingSvg from "../assets/diagrams/clock-timing.svg?raw"
</script>

<template>
  <figure class="clock-timing-diagram generated-diagram">
    <figcaption>
      <strong>时钟采样边界</strong>
      <span>寄存器在时钟沿采样 D，传播延迟后 Q 更新；两个时钟沿之间留给组合逻辑稳定。</span>
    </figcaption>

    <div
      class="generated-diagram-canvas clock-timing-diagram-canvas"
      role="img"
      aria-label="寄存器在时钟沿采样 D 并在传播延迟后更新 Q 的时序图"
      v-html="clockTimingSvg"
    ></div>
  </figure>
</template>

<style scoped>
.clock-timing-diagram {
  margin: 1.5rem 0;
}

.clock-timing-diagram figcaption {
  display: grid;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}

.clock-timing-diagram strong {
  font-size: 1rem;
}

.clock-timing-diagram span {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.6;
}

.clock-timing-diagram-canvas :deep(svg) {
  min-width: 620px;
}
</style>
