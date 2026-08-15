<script setup lang="ts">
type DiagramKind = "areas" | "snapshots" | "branches"

const props = defineProps<{
  /** 要展示的 Git 概念图。 */
  kind: DiagramKind
}>()
</script>

<template>
  <figure class="git-diagram">
    <div v-if="props.kind === 'areas'" class="areas" aria-hidden="true">
      <div class="diagram-box worktree">
        <span class="box-kicker">你正在编辑</span>
        <strong>工作区</strong>
        <code>main.c</code>
      </div>
      <div class="diagram-arrow">
        <code>git add</code>
        <span>→</span>
      </div>
      <div class="diagram-box index">
        <span class="box-kicker">下一次 commit 的内容</span>
        <strong>暂存区</strong>
        <code>main.c</code>
      </div>
      <div class="diagram-arrow">
        <code>git commit</code>
        <span>→</span>
      </div>
      <div class="diagram-box repository">
        <span class="box-kicker">已经保存的版本</span>
        <strong>本地仓库</strong>
        <code>C0 → C1</code>
      </div>
    </div>

    <div v-else-if="props.kind === 'snapshots'" class="versions" aria-hidden="true">
      <div class="version-column">
        <span>工作区</span>
        <div class="file-card muted-file">
          <strong>info.c</strong>
          <code>version = 3</code>
        </div>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>暂存区</span>
        <div class="file-card staged-file">
          <strong>info.c</strong>
          <code>version = 2</code>
        </div>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>本地仓库</span>
        <div class="file-card changed-file">
          <strong>info.c</strong>
          <code>version = 1</code>
        </div>
      </div>
    </div>

    <div v-else class="branch-graph" aria-hidden="true">
      <svg viewBox="0 0 680 230" role="presentation">
        <path class="graph-line experiment-line" d="M70 145 H270 L390 70 H510" />
        <path class="graph-line main-line" d="M270 145 H510" />
        <circle class="commit shared" cx="70" cy="145" r="15" />
        <circle class="commit shared" cx="170" cy="145" r="15" />
        <circle class="commit shared" cx="270" cy="145" r="15" />
        <circle class="commit experiment" cx="390" cy="70" r="15" />
        <circle class="commit experiment" cx="490" cy="70" r="15" />
        <circle class="commit main" cx="390" cy="145" r="15" />
        <circle class="commit main" cx="490" cy="145" r="15" />
        <text x="56" y="190">C0</text>
        <text x="156" y="190">C1</text>
        <text x="256" y="190">C2</text>
        <text x="376" y="45">C3</text>
        <text x="476" y="45">C4</text>
        <text x="376" y="190">C5</text>
        <text x="476" y="190">C6</text>
        <g class="branch-label experiment-label">
          <rect x="535" y="49" width="118" height="40" rx="9" />
          <text x="553" y="75">experiment</text>
        </g>
        <g class="branch-label main-label">
          <rect x="535" y="125" width="82" height="40" rx="9" />
          <text x="552" y="151">main</text>
        </g>
      </svg>
    </div>

    <figcaption v-if="props.kind === 'areas'">
      工作区中的修改先由 <code>git add</code> 选入暂存区，再由
      <code>git commit</code> 保存到本地仓库。
    </figcaption>
    <figcaption v-else-if="props.kind === 'snapshots'">
      同一个文件可以同时有三个不同版本；暂存后继续编辑，只会改变工作区版本。
    </figcaption>
    <figcaption v-else>
      两条工作线可以从同一个版本继续产生不同的 commit，之后再按需要合并。
    </figcaption>
  </figure>
</template>

<style scoped>
.git-diagram {
  margin: 1.75rem 0;
  padding: 1.25rem;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    radial-gradient(circle at top left, var(--vp-c-brand-soft), transparent 45%),
    var(--vp-c-bg-soft);
}

.git-diagram code {
  white-space: nowrap;
}

.git-diagram figcaption {
  margin-top: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: center;
}

.areas,
.versions {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 610px;
}

.diagram-box,
.file-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
}

.diagram-box {
  display: grid;
  min-width: 135px;
  min-height: 105px;
  padding: 1rem;
  text-align: center;
  place-content: center;
}

.diagram-box strong,
.diagram-box code,
.box-kicker {
  display: block;
}

.diagram-box strong {
  margin: 0.25rem 0 0.5rem;
}

.box-kicker,
.version-column > span {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}

.worktree {
  border-top: 4px solid var(--vp-c-yellow-1);
}

.index,
.staged-file {
  border-top: 4px solid var(--vp-c-brand-1);
}

.repository {
  border-top: 4px solid var(--vp-c-indigo-1);
}

.diagram-arrow {
  display: grid;
  min-width: 85px;
  gap: 0.3rem;
  justify-items: center;
  color: var(--vp-c-text-2);
}

.diagram-arrow span,
.version-arrow {
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
  font-weight: 700;
}

.version-column {
  display: grid;
  width: 165px;
  gap: 0.55rem;
  text-align: center;
}

.file-card {
  display: grid;
  min-height: 92px;
  padding: 0.85rem;
  place-content: center;
}

.file-card strong {
  margin-bottom: 0.45rem;
}

.muted-file {
  border-top: 4px solid var(--vp-c-text-3);
}

.changed-file {
  border-top: 4px solid var(--vp-c-yellow-1);
}

.version-arrow {
  padding: 1.2rem 0.55rem 0;
}

.branch-graph {
  min-width: 620px;
}

.branch-graph svg {
  display: block;
  width: 100%;
  max-height: 250px;
}

.graph-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 6;
}

.experiment-line {
  stroke: var(--vp-c-brand-1);
}

.main-line {
  stroke: var(--vp-c-indigo-1);
}

.commit {
  fill: var(--vp-c-bg);
  stroke-width: 6;
}

.commit.shared {
  stroke: var(--vp-c-text-2);
}

.commit.experiment {
  stroke: var(--vp-c-brand-1);
}

.commit.main {
  stroke: var(--vp-c-indigo-1);
}

.branch-graph text {
  fill: var(--vp-c-text-1);
  font: 600 16px var(--vp-font-family-base);
}

.branch-label rect {
  fill: var(--vp-c-bg);
  stroke-width: 2;
}

.experiment-label rect {
  stroke: var(--vp-c-brand-1);
}

.main-label rect {
  stroke: var(--vp-c-indigo-1);
}

@media (max-width: 640px) {
  .git-diagram {
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 1rem;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .areas,
  .versions {
    flex-direction: column;
    min-width: 0;
    gap: 0.8rem;
  }

  .diagram-box,
  .version-column {
    width: min(260px, 100%);
    box-sizing: border-box;
  }

  .diagram-arrow,
  .version-arrow {
    min-width: 0;
    padding: 0;
  }

  .diagram-arrow span,
  .version-arrow {
    display: inline-block;
    transform: rotate(90deg);
  }

  .branch-graph {
    min-width: 540px;
  }
}
</style>
