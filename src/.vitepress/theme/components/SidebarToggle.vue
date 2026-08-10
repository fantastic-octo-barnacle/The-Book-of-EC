<script setup lang="ts">
import { useRoute } from "vitepress"
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"

const storageKey = "the-book-of-ec:sidebar-collapsed"
const collapsedClass = "vp-sidebar-collapsed"
const route = useRoute()
const collapsed = ref(false)
const hasSidebar = ref(false)
const isDesktop = ref(false)
let desktopQuery: MediaQueryList | undefined

function applyCollapsedState() {
  document.documentElement.classList.toggle(collapsedClass, collapsed.value)
}

async function refreshSidebarAvailability() {
  await nextTick()
  hasSidebar.value = document.querySelector(".VPContent.has-sidebar") !== null
}

function handleDesktopChange(event: MediaQueryListEvent) {
  isDesktop.value = event.matches
}

function toggleSidebar() {
  collapsed.value = !collapsed.value
  sessionStorage.setItem(storageKey, String(collapsed.value))
  applyCollapsedState()
}

onMounted(() => {
  desktopQuery = window.matchMedia("(min-width: 960px)")
  isDesktop.value = desktopQuery.matches
  desktopQuery.addEventListener("change", handleDesktopChange)

  collapsed.value =
    document.documentElement.classList.contains(collapsedClass) ||
    sessionStorage.getItem(storageKey) === "true"
  applyCollapsedState()
  void refreshSidebarAvailability()
})

watch(
  () => route.path,
  () => void refreshSidebarAvailability()
)

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener("change", handleDesktopChange)
})
</script>

<template>
  <button
    v-show="hasSidebar && isDesktop"
    class="sidebar-collapse-toggle"
    type="button"
    :aria-label="collapsed ? '展开侧边栏' : '收起侧边栏'"
    :aria-expanded="!collapsed"
    :title="collapsed ? '展开侧边栏' : '收起侧边栏'"
    @click="toggleSidebar"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path v-if="collapsed" d="m9 5 7 7-7 7" />
      <path v-else d="m15 5-7 7 7 7" />
    </svg>
  </button>
</template>
