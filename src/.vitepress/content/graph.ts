import { existsSync } from "node:fs"
import { join } from "node:path"
import type { Plugin } from "vite"
import { graphNodes, nodes, type NodeId } from "./nodes.ts"
import { levels } from "./taxonomy.ts"
import { graphTopics } from "./topics.ts"

function nodeDirectory(source: string, id: NodeId) {
  return join(source, "nodes", ...id.split("."))
}

export function validateContent(source: string) {
  for (const [id, node] of Object.entries(nodes) as [NodeId, (typeof nodes)[NodeId]][]) {
    const directory = nodeDirectory(source, id)
    if (!existsSync(join(directory, "index.md"))) {
      throw new Error(`学习节点缺少入口页：${id}`)
    }

    const paths = new Set<string>()
    for (const part of node.parts) {
      if (paths.has(part.path)) throw new Error(`学习节点包含重复附属页：${id}/${part.path}`)
      paths.add(part.path)
      if (!existsSync(join(directory, `${part.path}.md`))) {
        throw new Error(`学习节点附属页不存在：${id}/${part.path}`)
      }
    }
  }

  const visiting = new Set<NodeId>()
  const visited = new Set<NodeId>()
  const visit = (id: NodeId) => {
    if (visiting.has(id)) throw new Error(`必需依赖存在环：${[...visiting, id].join(" → ")}`)
    if (visited.has(id)) return
    visiting.add(id)
    for (const relation of nodes[id].relations) {
      if (relation.type === "required") visit(relation.target)
    }
    visiting.delete(id)
    visited.add(id)
  }
  for (const id of Object.keys(nodes) as NodeId[]) visit(id)

  for (const topic of graphTopics()) {
    if (new Set(topic.members).size !== topic.members.length) {
      throw new Error(`专题包含重复成员：${topic.id}`)
    }
  }
}

export function learningGraphPlugin(source: string): Plugin {
  const virtualId = "virtual:learning-graph"
  const resolvedId = `\0${virtualId}`

  return {
    name: "learning-graph",
    buildStart() {
      validateContent(source)
    },
    resolveId(id) {
      return id === virtualId ? resolvedId : undefined
    },
    load(id) {
      if (id !== resolvedId) return undefined
      validateContent(source)
      return `export default ${JSON.stringify({
        nodes: graphNodes(),
        topics: graphTopics(),
        taxonomy: { levels }
      })}`
    }
  }
}
