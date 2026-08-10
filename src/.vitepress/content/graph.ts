import { existsSync } from "node:fs"
import { join } from "node:path"
import type { Plugin } from "vite"
import { graphNodes, nodes, type NodeId } from "./nodes.ts"
import { levels } from "./taxonomy.ts"
import { graphTopics } from "./topics.ts"

/** 返回节点 ID 对应的源文件目录。 */
function nodeDirectory(source: string, id: NodeId) {
  return join(source, "nodes", ...id.split("."))
}

/** 校验节点文件、附属页、必需依赖和专题成员。 */
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
  // visiting 表示当前递归路径；再次进入其中的节点即形成环。
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

/** 提供构建期校验和学习图虚拟模块。 */
export function learningGraphPlugin(source: string): Plugin {
  // \0 前缀标记该 ID 已由 Vite 插件解析，避免再次参与普通解析。
  const virtualId = "virtual:learning-graph"
  const resolvedId = `\0${virtualId}`

  return {
    name: "learning-graph",
    buildStart() {
      // 即使页面未引用虚拟模块，也要执行内容校验。
      validateContent(source)
    },
    resolveId(id) {
      return id === virtualId ? resolvedId : undefined
    },
    load(id) {
      if (id !== resolvedId) return undefined
      // 开发模式下每次加载都验证，及时发现内容变更导致的问题。
      validateContent(source)
      return `export default ${JSON.stringify({
        nodes: graphNodes(),
        topics: graphTopics(),
        taxonomy: { levels }
      })}`
    }
  }
}
