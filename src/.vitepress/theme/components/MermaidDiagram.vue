<script lang="ts">
let diagramSequence = 0
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useData } from "vitepress"
import type { MermaidConfig } from "mermaid"

const props = defineProps<{
  /** encodeURIComponent 编码后的 Mermaid 源码。 */
  code: string
}>()

const { isDark } = useData()
const diagramId = `mermaid-diagram-${++diagramSequence}`
const renderedSvg = ref("")
const renderError = ref("")
let renderVersion = 0

const source = computed(() => decodeURIComponent(props.code))

async function renderDiagram() {
  const currentVersion = ++renderVersion
  renderedSvg.value = ""
  renderError.value = ""

  try {
    const mermaid = (await import("mermaid")).default
    const config: MermaidConfig = {
      startOnLoad: false,
      securityLevel: "strict",
      theme: isDark.value ? "dark" : "default"
    }

    mermaid.initialize(config)
    const result = await mermaid.render(`${diagramId}-${currentVersion}`, source.value)
    if (currentVersion === renderVersion) renderedSvg.value = result.svg
  } catch (error) {
    if (currentVersion !== renderVersion) return
    renderError.value = error instanceof Error ? error.message : String(error)
  }
}

onMounted(() => {
  void renderDiagram()
})

watch([source, isDark], () => {
  void renderDiagram()
})
</script>

<template>
  <figure class="mermaid-diagram">
    <div v-if="renderedSvg" class="mermaid-diagram-svg" v-html="renderedSvg"></div>
    <pre v-else-if="renderError" class="mermaid-diagram-error"><code>{{ renderError }}</code></pre>
    <pre v-else class="mermaid-diagram-loading"><code>{{ source }}</code></pre>
  </figure>
</template>
