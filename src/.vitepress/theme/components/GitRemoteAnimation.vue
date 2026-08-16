<script setup lang="ts">
import { motion, useReducedMotion } from "motion-v"
import { computed, onBeforeUnmount, ref, watch } from "vue"

type AnimationKind = "push" | "fetch-merge"
type Repository = "local" | "remote"

type WorkflowFrame = {
  localCommitCount: number
  remoteCommitCount: number
  headAt: number
  trackingAt: number
  remoteMainAt: number
  status: string
}

const props = defineProps<{
  /** 要演示的远程仓库工作流。 */
  kind: AnimationKind
}>()

const commitXs = [100, 280, 460, 640] as const
const remoteY = 78
const localY = 228
const transferDistance = localY - remoteY

const pushFrames: readonly WorkflowFrame[] = [
  {
    localCommitCount: 4,
    remoteCommitCount: 2,
    headAt: 3,
    trackingAt: 1,
    remoteMainAt: 1,
    status: "本地 main 位于 C3，origin/main 和远程 main 位于 C1；C2、C3 尚未发送到远程仓库。"
  },
  {
    localCommitCount: 4,
    remoteCommitCount: 4,
    headAt: 3,
    trackingAt: 3,
    remoteMainAt: 3,
    status: "C2、C3 已发送到远程仓库；本地与远程的 main 以及 origin/main 都位于 C3。"
  }
]

const fetchMergeFrames: readonly WorkflowFrame[] = [
  {
    localCommitCount: 2,
    remoteCommitCount: 4,
    headAt: 1,
    trackingAt: 1,
    remoteMainAt: 3,
    status: "远程 main 位于 C3；本地 main 和 origin/main 仍位于 C1。"
  },
  {
    localCommitCount: 4,
    remoteCommitCount: 4,
    headAt: 1,
    trackingAt: 3,
    remoteMainAt: 3,
    status: "本地已获得 C2、C3，origin/main 移到 C3；HEAD 和本地 main 仍位于 C1。"
  },
  {
    localCommitCount: 4,
    remoteCommitCount: 4,
    headAt: 3,
    trackingAt: 3,
    remoteMainAt: 3,
    status: "远程变化已整合进本地 main；HEAD、main 和 origin/main 都位于 C3。"
  }
]

const commands = {
  push: ["git push origin main"],
  "fetch-merge": ["git fetch origin", "git merge origin/main"]
} as const satisfies Record<AnimationKind, readonly string[]>

const step = ref(0)
const isAnimating = ref(false)
const reducedMotion = useReducedMotion()
let unlockTimer: ReturnType<typeof setTimeout> | undefined

const frames = computed(() => (props.kind === "push" ? pushFrames : fetchMergeFrames))
const currentFrame = computed(() => frames.value[step.value])
const workflowCommands = computed(() => commands[props.kind])
const nextCommand = computed(() => workflowCommands.value[step.value])
const maxStep = computed(() => frames.value.length - 1)
const title = computed(() => (props.kind === "push" ? "Push" : "Fetch + merge"))
const intro = computed(() =>
  props.kind === "push"
    ? "把本地 main 推送到 origin 中的同名 main。"
    : "先获取远程变化，再把 origin/main 指向的变化整合进本地 main。"
)

const localRefs = computed(() => {
  const frame = currentFrame.value
  const overlap = frame.headAt === frame.trackingAt
  return [
    {
      id: "head",
      label: "HEAD → main",
      at: frame.headAt,
      y: localY + 25,
      width: 116,
      tone: "head-ref"
    },
    {
      id: "tracking",
      label: "origin/main",
      at: frame.trackingAt,
      y: localY + (overlap ? 56 : 25),
      width: 108,
      tone: "tracking-ref"
    }
  ] as const
})

const remoteRef = computed(() => ({
  at: currentFrame.value.remoteMainAt,
  y: remoteY + 25
}))

function isVisible(repository: Repository, commitIndex: number) {
  const count =
    repository === "local"
      ? currentFrame.value.localCommitCount
      : currentFrame.value.remoteCommitCount
  return commitIndex < count
}

function commitMotion(repository: Repository, commitIndex: number) {
  const visible = isVisible(repository, commitIndex)
  let y = 0
  if (!visible && props.kind === "push" && repository === "remote") y = transferDistance
  if (!visible && props.kind === "fetch-merge" && repository === "local") y = -transferDistance
  return { opacity: visible ? 1 : 0, y }
}

function lineMotion(repository: Repository, commitIndex: number) {
  const visible = isVisible(repository, commitIndex)
  return { opacity: visible ? 1 : 0, pathLength: visible ? 1 : 0 }
}

function transitionFor(commitIndex = 0) {
  return {
    duration: reducedMotion.value ? 0 : 0.45,
    delay: reducedMotion.value ? 0 : Math.max(0, commitIndex - 2) * 0.08,
    ease: [0.22, 1, 0.36, 1]
  }
}

function unlockControls() {
  if (unlockTimer) clearTimeout(unlockTimer)
  if (reducedMotion.value) {
    isAnimating.value = false
    return
  }
  unlockTimer = setTimeout(() => {
    isAnimating.value = false
    unlockTimer = undefined
  }, 620)
}

function moveStep(direction: -1 | 1) {
  if (isAnimating.value) return
  const nextStep = Math.min(maxStep.value, Math.max(0, step.value + direction))
  if (nextStep === step.value) return
  step.value = nextStep
  isAnimating.value = true
  unlockControls()
}

watch(
  () => props.kind,
  () => {
    step.value = 0
    isAnimating.value = false
    if (unlockTimer) clearTimeout(unlockTimer)
  }
)

onBeforeUnmount(() => {
  if (unlockTimer) clearTimeout(unlockTimer)
})
</script>

<template>
  <figure class="git-remote-animation">
    <header class="animation-header">
      <div>
        <strong>{{ title }}</strong>
        <p>{{ intro }}</p>
      </div>
      <span>步骤 {{ step }} / {{ maxStep }}</span>
    </header>

    <div class="graph-scroller">
      <svg viewBox="0 0 740 330" role="presentation" aria-hidden="true">
        <rect class="repository-area remote-area" x="20" y="15" width="700" height="125" rx="14" />
        <text class="area-title" x="42" y="43">Remote repository</text>
        <rect class="repository-area local-area" x="20" y="165" width="700" height="150" rx="14" />
        <text class="area-title" x="42" y="193">Local repository</text>

        <template v-for="repository in ['remote', 'local'] as const" :key="repository">
          <motion.line
            v-for="commitIndex in [1, 2, 3]"
            :key="`${repository}-line-${commitIndex}`"
            class="commit-line"
            :x1="commitXs[commitIndex - 1] + 15"
            :x2="commitXs[commitIndex] - 15"
            :y1="repository === 'remote' ? remoteY : localY"
            :y2="repository === 'remote' ? remoteY : localY"
            :initial="lineMotion(repository, commitIndex)"
            :animate="lineMotion(repository, commitIndex)"
            :transition="transitionFor(commitIndex)"
          />

          <motion.g
            v-for="(x, commitIndex) in commitXs"
            :key="`${repository}-commit-${commitIndex}`"
            :initial="commitMotion(repository, commitIndex)"
            :animate="commitMotion(repository, commitIndex)"
            :transition="transitionFor(commitIndex)"
          >
            <circle
              class="workflow-commit"
              :class="`${repository}-commit`"
              :cx="x"
              :cy="repository === 'remote' ? remoteY : localY"
              r="15"
            />
            <text
              class="commit-id"
              :x="x"
              :y="(repository === 'remote' ? remoteY : localY) + 5"
              text-anchor="middle"
            >
              C{{ commitIndex }}
            </text>
          </motion.g>
        </template>

        <motion.g
          :initial="{ x: commitXs[remoteRef.at], y: remoteRef.y }"
          :animate="{ x: commitXs[remoteRef.at], y: remoteRef.y }"
          :transition="transitionFor()"
        >
          <rect class="ref-pill remote-ref" x="-34" width="68" height="25" rx="7" />
          <text class="ref-text" y="17" text-anchor="middle">main</text>
        </motion.g>

        <motion.g
          v-for="reference in localRefs"
          :key="reference.id"
          :initial="{ x: commitXs[reference.at], y: reference.y }"
          :animate="{ x: commitXs[reference.at], y: reference.y }"
          :transition="transitionFor()"
        >
          <rect
            class="ref-pill"
            :class="reference.tone"
            :x="-reference.width / 2"
            :width="reference.width"
            height="25"
            rx="7"
          />
          <text class="ref-text" y="17" text-anchor="middle">{{ reference.label }}</text>
        </motion.g>
      </svg>
    </div>

    <figcaption aria-live="polite"><strong>当前状态：</strong>{{ currentFrame.status }}</figcaption>

    <div class="animation-controls">
      <button
        class="secondary-action"
        type="button"
        :disabled="step === 0 || isAnimating"
        @click="moveStep(-1)"
      >
        回退一步
      </button>

      <div class="next-command">
        <span>{{ nextCommand ? "下一条命令" : "工作流状态" }}</span>
        <code>{{ nextCommand ?? "全部命令已执行" }}</code>
      </div>

      <button
        class="primary-action"
        type="button"
        :disabled="!nextCommand || isAnimating"
        @click="moveStep(1)"
      >
        {{ nextCommand ? "执行下一步" : "已完成" }}
      </button>
    </div>
  </figure>
</template>

<style scoped>
.git-remote-animation {
  margin: 1.75rem 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    radial-gradient(circle at top left, var(--vp-c-brand-soft), transparent 45%),
    var(--vp-c-bg-soft);
}

.animation-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 82%, transparent);
}

.animation-header strong {
  font-size: 1.05rem;
}

.animation-header p {
  margin: 0.25rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.animation-header > span {
  flex: none;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.graph-scroller {
  overflow-x: auto;
  padding: 0.75rem 1rem 0;
}

.graph-scroller svg {
  display: block;
  width: 100%;
  min-width: 650px;
}

.repository-area {
  fill: var(--vp-c-bg);
  stroke-width: 2;
}

.remote-area {
  stroke: var(--vp-c-indigo-1);
}

.local-area {
  stroke: var(--vp-c-brand-1);
}

.area-title {
  fill: var(--vp-c-text-1);
  font: 700 15px var(--vp-font-family-base);
}

.commit-line {
  stroke: var(--vp-c-text-3);
  stroke-linecap: round;
  stroke-width: 4;
}

.workflow-commit {
  fill: var(--vp-c-bg);
  stroke-width: 4;
}

.remote-commit {
  stroke: var(--vp-c-indigo-1);
}

.local-commit {
  stroke: var(--vp-c-brand-1);
}

.commit-id,
.ref-text {
  fill: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
}

.commit-id {
  font-size: 12px;
}

.ref-pill {
  stroke-width: 1.5;
}

.remote-ref {
  fill: var(--vp-c-bg-soft);
  stroke: var(--vp-c-indigo-1);
}

.head-ref {
  fill: var(--vp-c-brand-soft);
  stroke: var(--vp-c-brand-1);
}

.tracking-ref {
  fill: var(--vp-c-bg-soft);
  stroke: var(--vp-c-yellow-1);
}

.ref-text {
  font-size: 11px;
}

.git-remote-animation figcaption {
  min-height: 3.2rem;
  margin: 0;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.git-remote-animation figcaption strong {
  color: var(--vp-c-text-1);
}

.animation-controls {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 82%, transparent);
}

.animation-controls button {
  min-height: 38px;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.animation-controls button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.animation-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.secondary-action {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.primary-action {
  border-color: var(--vp-c-brand-1) !important;
  color: var(--vp-c-white);
  background: var(--vp-c-brand-1);
}

.next-command {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
}

.next-command span {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.next-command code {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .git-remote-animation {
    margin-right: -1rem;
    margin-left: -1rem;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .animation-header,
  .git-remote-animation figcaption,
  .animation-controls {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .animation-controls {
    grid-template-columns: 1fr 1fr;
  }

  .next-command {
    grid-column: 1 / -1;
    grid-row: 1;
    justify-content: flex-start;
  }

  .secondary-action,
  .primary-action {
    width: 100%;
  }
}
</style>
