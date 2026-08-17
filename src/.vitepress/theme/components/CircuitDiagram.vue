<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useData } from "vitepress"
import type {
  CanvasPoint,
  CircuitJson,
  ElementInfo,
  RenderOptions,
  SchemdrawController
} from "@skillpet/circuit"

const props = withDefaults(
  defineProps<{
    /** @skillpet/circuit JSON 电路描述。 */
    circuit: CircuitJson
    /** 传给 @skillpet/circuit 渲染器的选项。 */
    options?: RenderOptions
    /** 是否启用交互事件。 */
    interactive?: boolean
  }>(),
  {
    interactive: false,
    options: () => ({})
  }
)

const emit = defineEmits<{
  ready: [controller: SchemdrawController]
  "element-click": [info: ElementInfo]
  "element-hover": [info: ElementInfo]
  "element-leave": [info: ElementInfo]
  "element-select": [info: ElementInfo | null]
  "canvas-click": [point: CanvasPoint]
}>()

const { isDark } = useData()
const containerRef = ref<HTMLElement>()
const renderError = ref("")
let controller: SchemdrawController | null = null
let renderVersion = 0

const effectiveOptions = computed<RenderOptions>(() => {
  if (props.options.theme || props.circuit.theme) return props.options
  return {
    ...props.options,
    theme: isDark.value ? "dark" : "light"
  }
})

function destroyController() {
  if (!controller) return
  controller.destroy()
  controller = null
}

async function renderCircuit() {
  const container = containerRef.value
  if (!container) return

  const currentVersion = ++renderVersion
  renderError.value = ""
  destroyController()
  container.innerHTML = ""

  try {
    const circuit = await import("@skillpet/circuit")
    if (currentVersion !== renderVersion) return

    if (props.interactive) {
      controller = circuit.mountFromJson(container, props.circuit, {
        ...effectiveOptions.value,
        interactive: true
      })
      controller.on("element:click", (info) => emit("element-click", info))
      controller.on("element:hover", (info) => emit("element-hover", info))
      controller.on("element:leave", (info) => emit("element-leave", info))
      controller.on("element:select", (info) => emit("element-select", info))
      controller.on("canvas:click", (point) => emit("canvas-click", point))
      emit("ready", controller)
      return
    }

    container.innerHTML = circuit.renderFromJson(props.circuit, effectiveOptions.value)
  } catch (error) {
    if (currentVersion !== renderVersion) return
    renderError.value = error instanceof Error ? error.message : String(error)
  }
}

onMounted(() => {
  void renderCircuit()
})

watch(
  () => [props.circuit, props.options, props.interactive, isDark.value],
  () => {
    void renderCircuit()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  renderVersion++
  destroyController()
})
</script>

<template>
  <figure class="circuit-diagram">
    <div ref="containerRef" class="circuit-diagram-canvas"></div>
    <pre v-if="renderError" class="circuit-diagram-error"><code>{{ renderError }}</code></pre>
  </figure>
</template>
