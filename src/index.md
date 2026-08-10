---
layout: home

hero:
  name: "The Book of EC"
  text: "嵌入式电控的学习导航"
  tagline: 以学习节点、专题和依赖图组织的嵌入式电控知识库。
  actions:
    - theme: brand
      text: 打开学习图
      link: /map/
    - theme: alt
      text: 我遇到问题了
      link: /problems/

features:
  - title: 学习节点
    details: 依赖图中的最小单位；可由入口页和附属页组成。
  - title: 专题
    details: 多个节点的人工阅读集合，不承担先修语义。
  - title: 标签
    details: 按概念、技术和学习层级筛选节点。
---

## 浏览方式

<div class="capability-map">
  <a href="/map/"><strong>按依赖关系</strong><span>查看全部节点及必需/建议先修。</span></a>
  <a href="/collections/"><strong>按专题阅读</strong><span>从工程、C/C++、嵌入式、控制等主题进入。</span></a>
  <a href="/tags/"><strong>按标签筛选</strong><span>按概念、技术和学习层级检索。</span></a>
  <a href="/problems/"><strong>按故障现象</strong><span>从构建、跑飞、丢包、抖动等现象反查节点。</span></a>
</div>

## 约定

1. 学习节点是依赖图的唯一顶点；专题和标签都不构成先修条件。
2. 每个节点只写必要元数据和内容入口；长内容拆入节点附属页。
3. 实线依赖必须补齐；虚线依赖可并行学习。

::: info 范围
本站不替代教材、芯片手册或项目文档；内容限于学习顺序、概念边界、检索词和验证方法。
:::
