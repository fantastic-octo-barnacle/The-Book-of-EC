<script setup lang="ts">
import { withBase } from "vitepress"
import { VPLink } from "vitepress/theme"
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import type { Core, ElementDefinition } from "cytoscape"
import type { DagreLayoutOptions } from "cytoscape-dagre"
import graph from "virtual:learning-graph"

/** 虚拟模块提供的单个节点。 */
type GraphNode = (typeof graph.nodes)[number]

const props = defineProps<{
  /** 仅展示指定专题；省略时展示全部节点。 */
  topic?: string
}>()
const canvas = ref<HTMLDivElement | null>(null)
const query = ref("")
const selectedLevels = ref<string[]>([])
const selectedConcepts = ref<string[]>([])
const selectedTechnologies = ref<string[]>([])
const conceptInput = ref("")
const technologyInput = ref("")
const selectedId = ref<string | null>(null)
const isExpanded = ref(false)
const normalMinZoom = 0.58
const expandedMinZoom = 0.25
const trackpadDeltaThreshold = 50
const wheelGestureResetDelay = 120
let cy: Core | undefined
let wheelCanvas: HTMLDivElement | undefined
let wheelSource: "mouse" | "trackpad" | undefined
let wheelGestureResetTimer: ReturnType<typeof setTimeout> | undefined

const levelLabels: Record<string, string> = {
  intro: "入门",
  core: "核心",
  advanced: "进阶",
  integration: "综合"
}

const allNodes = graph.nodes
const byId = new Map(allNodes.map((node) => [node.id, node]))
const topic = computed(() =>
  props.topic ? graph.topics.find((item) => item.id === props.topic) : undefined
)
const memberNodes = computed(() => {
  if (!topic.value) return allNodes
  const ids = new Set(topic.value.members)
  return allNodes.filter((node) => ids.has(node.id))
})
const allConcepts = computed(() =>
  [...new Set(memberNodes.value.flatMap((node) => node.concepts))].sort()
)
const allTechnologies = computed(() =>
  [...new Set(memberNodes.value.flatMap((node) => node.technologies))].sort()
)

/** 未选择筛选值时视为匹配全部，否则匹配任意一个值。 */
function includesAny(values: string[], selected: string[]) {
  return selected.length === 0 || selected.some((value) => values.includes(value))
}

const visibleMembers = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return memberNodes.value.filter((node) => {
    const searchable = [node.id, node.title, node.summary, ...node.concepts, ...node.technologies]
      .join(" ")
      .toLowerCase()
    return (
      (!needle || searchable.includes(needle)) &&
      (selectedLevels.value.length === 0 || selectedLevels.value.includes(node.level)) &&
      includesAny(node.concepts, selectedConcepts.value) &&
      includesAny(node.technologies, selectedTechnologies.value)
    )
  })
})

const contextIds = computed(() => {
  if (!topic.value) return new Set<string>()
  const members = new Set(topic.value.members)
  // 专题图保留可见成员的外部先修节点，避免割裂依赖上下文。
  return new Set(
    visibleMembers.value.flatMap((node) =>
      node.relations.map((relation) => relation.target).filter((target) => !members.has(target))
    )
  )
})

const visibleNodes = computed(() => [
  ...visibleMembers.value,
  ...allNodes.filter((node) => contextIds.value.has(node.id))
])

const visibleIds = computed(() => new Set(visibleNodes.value.map((node) => node.id)))
const selected = computed(() => (selectedId.value ? byId.get(selectedId.value) : undefined))
const selectedPrerequisites = computed(
  () =>
    selected.value?.relations
      .map((relation) => ({ ...relation, node: byId.get(relation.target)! }))
      .filter((relation) => relation.node) ?? []
)
const selectedFollowers = computed(() =>
  selected.value
    ? allNodes.filter((node) =>
        node.relations.some((relation) => relation.target === selected.value!.id)
      )
    : []
)

function toggleLevel(level: string) {
  selectedLevels.value = selectedLevels.value.includes(level)
    ? selectedLevels.value.filter((item) => item !== level)
    : [...selectedLevels.value, level]
}

function addFilter(kind: "concept" | "technology") {
  const input = kind === "concept" ? conceptInput : technologyInput
  const selectedValues = kind === "concept" ? selectedConcepts : selectedTechnologies
  if (input.value && !selectedValues.value.includes(input.value)) {
    selectedValues.value = [...selectedValues.value, input.value]
  }
  input.value = ""
}

function removeFilter(kind: "concept" | "technology", value: string) {
  if (kind === "concept")
    selectedConcepts.value = selectedConcepts.value.filter((item) => item !== value)
  else selectedTechnologies.value = selectedTechnologies.value.filter((item) => item !== value)
}

function resetFilters() {
  query.value = ""
  selectedLevels.value = []
  selectedConcepts.value = []
  selectedTechnologies.value = []
}

/** 打开节点入口页。 */
function openNode(id: string) {
  const node = byId.get(id)
  if (node) window.location.assign(withBase(node.route))
}

/**
 * 浏览器不直接暴露滚轮来源；像素级、小幅或横向滚动通常来自触控板。
 * 同一手势期间锁定判断，避免惯性滚动在平移与缩放之间切换。
 */
function isTrackpadWheel(event: WheelEvent) {
  if (wheelGestureResetTimer) clearTimeout(wheelGestureResetTimer)
  wheelGestureResetTimer = setTimeout(() => {
    wheelSource = undefined
  }, wheelGestureResetDelay)

  if (!wheelSource) {
    const magnitude = Math.max(Math.abs(event.deltaX), Math.abs(event.deltaY))
    const hasFractionalDelta = !Number.isInteger(event.deltaX) || !Number.isInteger(event.deltaY)
    wheelSource =
      event.deltaMode === WheelEvent.DOM_DELTA_PIXEL &&
      (event.deltaX !== 0 || hasFractionalDelta || magnitude < trackpadDeltaThreshold)
        ? "trackpad"
        : "mouse"
  }
  return wheelSource === "trackpad"
}

/** 双指滑动平移画布；捏合与鼠标滚轮继续交给 Cytoscape 缩放。 */
function handleCanvasWheel(event: WheelEvent) {
  if (event.ctrlKey || !isTrackpadWheel(event)) return
  event.preventDefault()
  event.stopImmediatePropagation()
  cy?.panBy({ x: -event.deltaX, y: -event.deltaY })
}

/** 聚焦节点；专题外节点直接跳转到其详情页。 */
function focusNode(id: string) {
  if (topic.value && !visibleIds.value.has(id)) {
    const node = byId.get(id)
    if (node) window.location.assign(withBase(node.route))
    return
  }
  if (!visibleIds.value.has(id)) resetFilters()
  selectedId.value = id
}

/** 将当前全部图元素缩放到画布内。 */
function fitGraph() {
  cy?.fit(cy.elements(), 36)
}

/** 切换画布尺寸，并尽量保持用户切换前的视觉缩放比例。 */
async function toggleExpanded() {
  if (!cy || !canvas.value) {
    isExpanded.value = !isExpanded.value
    return
  }

  const previousRect = canvas.value.getBoundingClientRect()
  const previousZoom = cy.zoom()
  isExpanded.value = !isExpanded.value
  await nextTick()
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

  const nextRect = canvas.value.getBoundingClientRect()
  const widthRatio = nextRect.width / previousRect.width
  cy.resize()
  cy.minZoom(isExpanded.value ? expandedMinZoom : normalMinZoom)
  cy.fit(cy.elements(), 36)
  const safeZoom = cy.zoom()
  const proportionalZoom = previousZoom * widthRatio
  // 既不突破最小缩放，也不放大到超出完整图的安全缩放值。
  const nextZoom = Math.max(cy.minZoom(), Math.min(proportionalZoom, safeZoom))
  cy.zoom(nextZoom)
  cy.center(cy.elements())
}

/** 将当前可见节点和关系转换为 Cytoscape 元素。 */
function graphElements(): ElementDefinition[] {
  const nodes = visibleNodes.value.map((node) => ({
    group: "nodes" as const,
    data: {
      id: node.id,
      label: node.title,
      level: node.level,
      context: contextIds.value.has(node.id) ? "external" : "member"
    }
  }))
  const edges = visibleNodes.value.flatMap((node) =>
    node.relations
      .filter((relation) => visibleIds.value.has(relation.target))
      .map((relation) => ({
        group: "edges" as const,
        data: {
          id: `${relation.target}->${node.id}:${relation.type}`,
          source: relation.target,
          target: node.id,
          relation: relation.type
        }
      }))
  )
  return [...nodes, ...edges]
}

/** 仅突出选中节点及其直接相邻关系。 */
function applyHighlight() {
  if (!cy) return
  cy.elements().removeClass("muted selected related")
  if (!selectedId.value || !visibleIds.value.has(selectedId.value)) return
  const node = cy.$id(selectedId.value)
  const neighborhood = node.closedNeighborhood()
  cy.elements().addClass("muted")
  neighborhood.removeClass("muted")
  node.addClass("selected")
  neighborhood.nodes().not(node).addClass("related")
  neighborhood.edges().addClass("related")
}

/** 重建图元素、执行布局并恢复交互高亮。 */
function renderGraph() {
  if (!cy) return
  if (selectedId.value && !visibleIds.value.has(selectedId.value)) selectedId.value = null
  cy.elements().remove()
  cy.add(graphElements())
  // 推荐关系不约束层级，避免弱关系改变必需依赖的主布局。
  const layoutElements = cy.nodes().union(cy.edges('[relation = "required"]'))
  const layoutOptions = {
    name: "dagre",
    rankDir: "LR",
    rankSep: 95,
    nodeSep: 38,
    edgeSep: 18,
    padding: 34,
    animate: false,
    nodeDimensionsIncludeLabels: true,
    sort: (a, b) => a.id().localeCompare(b.id())
  } satisfies DagreLayoutOptions
  layoutElements.layout(layoutOptions).run()
  fitGraph()
  applyHighlight()
}

onMounted(async () => {
  // 图形库只在浏览器挂载后加载，避免在 SSR 期间初始化。
  const [{ default: cytoscape }, { default: dagre }] = await Promise.all([
    import("cytoscape"),
    import("cytoscape-dagre")
  ])
  if (!canvas.value) return
  wheelCanvas = canvas.value
  // 在 Cytoscape 注册监听器前捕获触控板滚动，避免同一手势同时平移和缩放。
  wheelCanvas.addEventListener("wheel", handleCanvasWheel, { capture: true, passive: false })
  cytoscape.use(dagre)
  cy = cytoscape({
    container: canvas.value,
    elements: [],
    minZoom: normalMinZoom,
    maxZoom: 2.5,
    wheelSensitivity: 0.35,
    userZoomingEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    autounselectify: true,
    style: [
      {
        selector: "node",
        style: {
          shape: "round-rectangle",
          width: 190,
          height: 68,
          label: "data(label)",
          "text-wrap": "wrap",
          "text-max-width": "164px",
          "font-size": 14,
          "font-weight": 600,
          color: "#243147",
          "text-valign": "center",
          "text-halign": "center",
          "background-color": "#f6f7f9",
          "border-width": 1,
          "border-color": "#d9dde5"
        }
      },
      {
        selector: 'node[level = "intro"]',
        style: { "background-color": "#eaf5f1", "border-color": "#a9d3c7" }
      },
      {
        selector: 'node[level = "core"]',
        style: { "background-color": "#eef3fb", "border-color": "#aec4e6" }
      },
      {
        selector: 'node[level = "advanced"]',
        style: { "background-color": "#f4effb", "border-color": "#c7b7e4" }
      },
      {
        selector: 'node[level = "integration"]',
        style: { "background-color": "#fff5e5", "border-color": "#e9c989" }
      },
      {
        selector: 'node[context = "external"]',
        style: {
          "background-color": "#f4f5f7",
          "border-color": "#aeb5c0",
          "border-style": "dashed",
          opacity: 0.64
        }
      },
      {
        selector: "edge",
        style: {
          width: 1.6,
          "curve-style": "taxi",
          "taxi-direction": "rightward",
          "line-color": "#77aa9f",
          "target-arrow-color": "#77aa9f",
          "target-arrow-shape": "triangle"
        }
      },
      {
        selector: 'edge[relation = "recommended"]',
        style: { "line-color": "#9aa4b2", "target-arrow-color": "#9aa4b2", "line-style": "dashed" }
      },
      { selector: ".muted", style: { opacity: 0.17 } },
      { selector: "node.related", style: { "border-width": 2, "border-color": "#63a696" } },
      { selector: "node.selected", style: { "border-width": 3, "border-color": "#15836f" } },
      {
        selector: "edge.related",
        style: { width: 2.6, "line-color": "#18836f", "target-arrow-color": "#18836f" }
      }
    ]
  })
  cy.on("tap", "node", (event) => {
    selectedId.value = event.target.id()
  })
  cy.on("dbltap", "node", (event) => {
    openNode(event.target.id())
  })
  cy.on("tap", (event) => {
    if (event.target === cy) selectedId.value = null
  })
  renderGraph()
})

watch(visibleNodes, renderGraph)
watch(selectedId, applyHighlight)
onBeforeUnmount(() => {
  if (wheelGestureResetTimer) clearTimeout(wheelGestureResetTimer)
  wheelCanvas?.removeEventListener("wheel", handleCanvasWheel, true)
  cy?.destroy()
})
</script>

<template>
  <section
    class="learning-graph"
    :class="{ 'is-expanded': isExpanded }"
    aria-label="学习节点依赖图"
  >
    <div class="graph-controls">
      <input
        v-model="query"
        type="search"
        placeholder="搜索节点、概念或技术"
        aria-label="搜索学习节点"
      />
      <div class="graph-filter-row graph-selects">
        <span>层级</span>
        <button
          v-for="level in graph.taxonomy.levels"
          :key="level"
          :class="{ active: selectedLevels.includes(level) }"
          type="button"
          @click="toggleLevel(level)"
        >
          {{ levelLabels[level] }}
        </button>
        <label>
          <span>概念</span>
          <select v-model="conceptInput" @change="addFilter('concept')">
            <option value="">添加概念筛选</option>
            <option v-for="concept in allConcepts" :key="concept" :value="concept">
              {{ concept }}
            </option>
          </select>
        </label>
        <label>
          <span>技术</span>
          <select v-model="technologyInput" @change="addFilter('technology')">
            <option value="">添加技术筛选</option>
            <option v-for="technology in allTechnologies" :key="technology" :value="technology">
              {{ technology }}
            </option>
          </select>
        </label>
      </div>
      <div v-if="selectedConcepts.length || selectedTechnologies.length" class="selected-filters">
        <button
          v-for="concept in selectedConcepts"
          :key="concept"
          type="button"
          @click="removeFilter('concept', concept)"
        >
          概念：{{ concept }} ×
        </button>
        <button
          v-for="technology in selectedTechnologies"
          :key="technology"
          type="button"
          @click="removeFilter('technology', technology)"
        >
          技术：{{ technology }} ×
        </button>
      </div>
    </div>

    <div class="graph-canvas-wrap">
      <div ref="canvas" class="cy-canvas" role="application" aria-label="可交互学习节点依赖图" />
      <div class="graph-canvas-actions" aria-label="图操作">
        <button type="button" aria-label="重置筛选" title="重置筛选" @click="resetFilters">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 8a8 8 0 1 0 1.5 7M19 4v4h-4" />
          </svg>
        </button>
        <button type="button" aria-label="适配视图" title="适配视图" @click="fitGraph">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 4H4v4M16 4h4v4M4 16v4h4M20 16v4h-4" />
          </svg>
        </button>
        <button
          type="button"
          :aria-label="isExpanded ? '收起图窗口' : '展开图窗口'"
          :title="isExpanded ? '收起图窗口' : '展开图窗口'"
          :aria-pressed="isExpanded"
          @click="toggleExpanded"
        >
          <svg v-if="!isExpanded" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 4H4v4M16 4h4v4M4 16v4h4M20 16v4h-4" />
            <path d="M9 9h6v6H9z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
          </svg>
        </button>
      </div>
    </div>
    <p v-if="visibleNodes.length === 0" class="graph-empty">没有匹配的学习节点。</p>

    <aside
      v-if="selected"
      class="node-drawer"
      role="complementary"
      :aria-label="`${selected.title} 详情`"
      @keydown.esc.window="selectedId = null"
    >
      <div class="node-drawer-content">
        <button class="drawer-close" type="button" aria-label="关闭详情" @click="selectedId = null">
          ×
        </button>
        <div class="node-drawer-summary">
          <p class="modal-level">{{ levelLabels[selected.level] }}</p>
          <h2>{{ selected.title }}</h2>
          <p>{{ selected.summary }}</p>
        </div>
        <dl class="node-drawer-meta">
          <div>
            <dt>概念</dt>
            <dd>{{ selected.concepts.join(" · ") }}</dd>
          </div>
          <div>
            <dt>技术</dt>
            <dd>{{ selected.technologies.join(" · ") }}</dd>
          </div>
        </dl>
        <div class="node-drawer-relations">
          <section v-if="selectedPrerequisites.length">
            <h3>直接先修</h3>
            <ul>
              <li v-for="relation in selectedPrerequisites" :key="relation.target">
                <button type="button" @click="focusNode(relation.target)">
                  {{ relation.node.title }}
                </button>
                <small>{{ relation.type === "required" ? "必需" : "建议" }}</small>
              </li>
            </ul>
          </section>
          <section v-if="selectedFollowers.length">
            <h3>直接后续</h3>
            <ul>
              <li v-for="node in selectedFollowers" :key="node.id">
                <button type="button" @click="focusNode(node.id)">{{ node.title }}</button>
              </li>
            </ul>
          </section>
        </div>
        <VPLink class="node-entry" :href="selected.route">进入节点</VPLink>
      </div>
    </aside>
  </section>
</template>
