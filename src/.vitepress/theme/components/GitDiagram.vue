<script setup lang="ts">
type DiagramKind = "areas" | "snapshots" | "branches" | "stash" | "remote"

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
        <span class="box-kicker">下一次提交的内容</span>
        <strong>暂存区</strong>
        <code>main.c</code>
      </div>
      <div class="diagram-arrow">
        <code>git commit</code>
        <span>→</span>
      </div>
      <div class="diagram-box repository">
        <span class="box-kicker">已经保存的快照</span>
        <strong>本地仓库</strong>
        <code>C0 → C1</code>
      </div>
    </div>

    <div v-else-if="props.kind === 'snapshots'" class="versions" aria-hidden="true">
      <div class="version-column">
        <span>HEAD 中的快照</span>
        <div class="file-card muted-file">
          <strong>control.c</strong>
          <code>gain = 1.0</code>
        </div>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>暂存区</span>
        <div class="file-card staged-file">
          <strong>control.c</strong>
          <code>gain = 1.2</code>
        </div>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>工作区</span>
        <div class="file-card changed-file">
          <strong>control.c</strong>
          <code>gain = 1.5</code>
        </div>
      </div>
    </div>

    <div v-else-if="props.kind === 'branches'" class="branch-graph" aria-hidden="true">
      <svg viewBox="0 0 680 230" role="presentation">
        <path class="graph-line" d="M70 145 H270 L390 70 H590" />
        <path class="graph-line secondary" d="M270 145 H590" />
        <circle class="commit" cx="70" cy="145" r="15" />
        <circle class="commit" cx="170" cy="145" r="15" />
        <circle class="commit" cx="270" cy="145" r="15" />
        <circle class="commit feature" cx="390" cy="70" r="15" />
        <circle class="commit feature" cx="490" cy="70" r="15" />
        <circle class="commit main" cx="390" cy="145" r="15" />
        <circle class="commit main" cx="490" cy="145" r="15" />
        <text x="56" y="190">C0</text>
        <text x="156" y="190">C1</text>
        <text x="256" y="190">C2</text>
        <text x="376" y="45">C3</text>
        <text x="476" y="45">C4</text>
        <text x="376" y="190">C5</text>
        <text x="476" y="190">C6</text>
        <g class="ref feature-ref">
          <rect x="530" y="49" width="118" height="40" rx="9" />
          <text x="545" y="75">HEAD → test</text>
        </g>
        <g class="ref main-ref">
          <rect x="530" y="125" width="82" height="40" rx="9" />
          <text x="547" y="151">main</text>
        </g>
      </svg>
    </div>

    <div v-else-if="props.kind === 'stash'" class="stash-flow" aria-hidden="true">
      <div class="diagram-box worktree">
        <span class="box-kicker">尚未提交</span>
        <strong>工作区修改</strong>
      </div>
      <div class="stash-arrows">
        <div><code>git stash push</code><span>→</span></div>
        <div><span>←</span><code>git stash pop</code></div>
      </div>
      <div class="diagram-box stash-box">
        <span class="box-kicker">仅保存在本机</span>
        <strong>stash</strong>
        <code>stash@{0}</code>
      </div>
    </div>

    <div v-else class="remote-flow" aria-hidden="true">
      <div class="local-side">
        <span class="side-title">你的电脑</span>
        <div class="diagram-box worktree compact">
          <strong>工作区</strong>
        </div>
        <div class="diagram-arrow vertical"><code>commit</code><span>↓</span></div>
        <div class="diagram-box repository compact">
          <strong>本地分支</strong>
          <code>main</code>
        </div>
      </div>
      <div class="network-arrows">
        <div><code>git push</code><span>→</span></div>
        <div><span>←</span><code>git pull</code></div>
      </div>
      <div class="remote-side">
        <span class="side-title">远程仓库</span>
        <div class="diagram-box remote-box">
          <strong>服务器上的分支</strong>
          <code>main</code>
        </div>
      </div>
    </div>

    <figcaption v-if="props.kind === 'areas'">
      Git 不会直接把工作区提交到仓库；先用 <code>git add</code> 选择内容，再用
      <code>git commit</code> 保存快照。
    </figcaption>
    <figcaption v-else-if="props.kind === 'snapshots'">
      同一个文件可以同时存在三个版本；<code>git add</code> 后继续编辑，只会改变工作区版本。
    </figcaption>
    <figcaption v-else-if="props.kind === 'branches'">
      分支只是指向提交的引用；<code>HEAD</code> 标出当前分支，新的提交会让它向前移动。
    </figcaption>
    <figcaption v-else-if="props.kind === 'stash'">
      stash 临时收起本地修改；它不是提交，也不会被推送到远程仓库。
    </figcaption>
    <figcaption v-else>
      <code>pull</code> 取回远程提交，<code>push</code> 发送本地提交；两个仓库不会自动同步。
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
.versions,
.stash-flow,
.remote-flow {
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
.side-title,
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

.repository,
.remote-box {
  border-top: 4px solid var(--vp-c-indigo-1);
}

.stash-box {
  border-top: 4px solid var(--vp-c-purple-1);
}

.diagram-arrow,
.stash-arrows,
.network-arrows {
  display: grid;
  justify-items: center;
  color: var(--vp-c-text-2);
}

.diagram-arrow {
  min-width: 85px;
  gap: 0.3rem;
}

.diagram-arrow span,
.version-arrow,
.stash-arrows span,
.network-arrows span {
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
  stroke: var(--vp-c-brand-1);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 6;
}

.graph-line.secondary {
  stroke: var(--vp-c-indigo-1);
}

.commit {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-text-2);
  stroke-width: 6;
}

.commit.feature {
  stroke: var(--vp-c-brand-1);
}

.commit.main {
  stroke: var(--vp-c-indigo-1);
}

.branch-graph text {
  fill: var(--vp-c-text-1);
  font: 600 16px var(--vp-font-family-base);
}

.ref rect {
  fill: var(--vp-c-bg);
  stroke-width: 2;
}

.feature-ref rect {
  stroke: var(--vp-c-brand-1);
}

.main-ref rect {
  stroke: var(--vp-c-indigo-1);
}

.stash-flow {
  gap: 1.4rem;
}

.stash-arrows,
.network-arrows {
  gap: 0.65rem;
}

.stash-arrows > div,
.network-arrows > div {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.remote-flow {
  gap: 1.4rem;
}

.local-side,
.remote-side {
  display: grid;
  gap: 0.65rem;
  padding: 0.9rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 14px;
}

.side-title {
  text-align: center;
}

.compact {
  min-height: 64px;
  padding: 0.7rem 1rem;
}

.compact strong {
  margin: 0 0 0.25rem;
}

.vertical {
  min-width: 0;
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
  .versions,
  .stash-flow,
  .remote-flow {
    flex-direction: column;
    min-width: 0;
    gap: 0.8rem;
  }

  .diagram-box,
  .version-column,
  .local-side,
  .remote-side {
    width: min(260px, 100%);
    box-sizing: border-box;
  }

  .diagram-arrow,
  .version-arrow {
    min-width: 0;
    padding: 0;
  }

  .diagram-arrow span,
  .version-arrow,
  .stash-arrows span,
  .network-arrows span {
    display: inline-block;
    transform: rotate(90deg);
  }

  .branch-graph {
    min-width: 540px;
  }
}
</style>
