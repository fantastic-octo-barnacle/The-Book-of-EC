<script setup lang="ts">
type DiagramKind = "uses" | "areas" | "snapshots" | "branches"

const props = defineProps<{
  /** 要展示的 Git 概念图。 */
  kind: DiagramKind
}>()
</script>

<template>
  <figure class="git-diagram">
    <div v-if="props.kind === 'uses'" class="uses-grid">
      <article class="use-card">
        <strong>保存多个版本</strong>
        <div class="version-history" aria-hidden="true">
          <div class="history-point"><span>C0</span></div>
          <span class="history-line"></span>
          <div class="history-point"><span>C1</span></div>
          <span class="history-line"></span>
          <div class="history-point active"><span>C2</span></div>
        </div>
        <p>每个 commit 保存一个版本，旧版本仍留在历史中。</p>
      </article>

      <article class="use-card">
        <strong>commit 附加消息</strong>
        <div class="message-visual" aria-hidden="true">
          <code>8f3a21c</code>
          <span>修正电机转向</span>
        </div>
        <p>消息说明这个版本完成了什么修改。</p>
      </article>

      <article class="use-card">
        <strong>签出某个版本</strong>
        <div class="checkout-visual" aria-hidden="true">
          <div class="checkout-history">
            <span>C0</span>
            <span class="selected-version">C1</span>
            <span>C2</span>
          </div>
          <span class="checkout-arrow">↓</span>
          <div class="working-files">工作区：C1</div>
        </div>
        <p>工作区可以呈现任一已保存版本，其他版本不会被删除。</p>
      </article>

      <article class="use-card">
        <strong>分支并行开发</strong>
        <div class="team-visual" aria-hidden="true">
          <svg viewBox="0 0 300 120" role="presentation">
            <path class="team-line shared-line" d="M20 60 H95" />
            <path class="team-line chassis-line" d="M95 60 L145 25 H275" />
            <path class="team-line gimbal-line" d="M95 60 L145 95 H275" />
            <circle class="team-commit shared-team-commit" cx="55" cy="60" r="8" />
            <circle class="team-commit chassis-commit" cx="170" cy="25" r="8" />
            <circle class="team-commit chassis-commit" cx="220" cy="25" r="8" />
            <circle class="team-commit gimbal-commit" cx="170" cy="95" r="8" />
            <circle class="team-commit gimbal-commit" cx="220" cy="95" r="8" />
            <text x="150" y="15">Alice：底盘</text>
            <text x="150" y="116">Bob：云台</text>
          </svg>
        </div>
        <p>不同成员在各自分支工作，完成后再合并修改。</p>
      </article>
    </div>

    <div v-else-if="props.kind === 'areas'" class="areas" aria-hidden="true">
      <div class="diagram-box worktree">
        <span class="box-kicker">你正在编辑</span>
        <strong>工作区</strong>
        <span class="box-kicker">Working Directory</span>
      </div>
      <div class="diagram-arrow">
        <code>git add</code>
        <span>→</span>
      </div>
      <div class="diagram-box index">
        <span class="box-kicker">下一次 commit 的内容</span>
        <strong>暂存区</strong>
        <span class="box-kicker">Staging Area</span>
      </div>
      <div class="diagram-arrow">
        <code>git commit</code>
        <span>→</span>
      </div>
      <div class="diagram-box repository">
        <span class="box-kicker">已经保存的版本</span>
        <strong>本地仓库</strong>
        <span class="box-kicker">Local Repository</span>
      </div>
    </div>

    <div v-else-if="props.kind === 'snapshots'" class="versions" aria-hidden="true">
      <div class="version-column">
        <span>工作区</span>
        <div class="file-card changed-file">
          <strong>main.c</strong>
          <code>version = 3</code>
        </div>
        <span>Working Directory</span>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>暂存区</span>
        <div class="file-card staged-file">
          <strong>main.c</strong>
          <code>version = 2</code>
        </div>
        <span>Staging Area</span>
      </div>
      <div class="version-arrow">→</div>
      <div class="version-column">
        <span>仓库</span>
        <div class="file-card muted-file">
          <strong>main.c</strong>
          <code>version = 1</code>
        </div>
        <span>Repository</span>
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
      同一个文件 <code>main.c</code> 可以同时有三个不同版本；暂存后继续编辑，只会改变工作区版本。
    </figcaption>
    <figcaption v-else-if="props.kind === 'branches'">
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

.uses-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.use-card {
  display: grid;
  min-width: 0;
  min-height: 220px;
  padding: 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
}

.use-card > strong {
  font-size: 1.05rem;
}

.use-card > p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.version-history,
.checkout-visual,
.message-visual,
.team-visual {
  align-self: center;
}

.version-history {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.history-point {
  display: grid;
  width: 48px;
  height: 48px;
  border: 3px solid var(--vp-c-text-3);
  border-radius: 50%;
  background: var(--vp-c-bg);
  place-items: center;
}

.history-point.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.history-line {
  width: clamp(24px, 7vw, 64px);
  height: 3px;
  background: var(--vp-c-text-3);
}

.message-visual {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.message-visual code {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.checkout-visual {
  display: grid;
  justify-items: center;
}

.checkout-history {
  display: flex;
  gap: 0.55rem;
}

.checkout-history > span {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
}

.checkout-history .selected-version {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.checkout-arrow {
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
  font-weight: 700;
}

.working-files {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
}

.team-visual svg {
  display: block;
  width: 100%;
  height: 105px;
}

.team-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 4;
}

.shared-line {
  stroke: var(--vp-c-text-3);
}

.chassis-line {
  stroke: var(--vp-c-brand-1);
}

.gimbal-line {
  stroke: var(--vp-c-indigo-1);
}

.team-commit {
  fill: var(--vp-c-bg);
  stroke-width: 4;
}

.shared-team-commit {
  stroke: var(--vp-c-text-3);
}

.chassis-commit {
  stroke: var(--vp-c-brand-1);
}

.gimbal-commit {
  stroke: var(--vp-c-indigo-1);
}

.team-visual text {
  fill: var(--vp-c-text-1);
  font: 600 13px var(--vp-font-family-base);
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

  .uses-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .use-card {
    min-height: 205px;
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
