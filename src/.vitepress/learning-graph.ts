import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { Plugin } from 'vite'
import { concepts, levels, technologies } from './knowledge-taxonomy.ts'

const knownLevels = new Set<string>(levels)
const knownConcepts = new Set<string>(concepts)
const knownTechnologies = new Set<string>(technologies)

type Relation = { target: string, type: 'required' | 'recommended' }
type Node = {
  id: string
  title: string
  summary: string
  level: string
  estimatedTime: string
  concepts: string[]
  technologies: string[]
  relations: Relation[]
  route: string
}

type Collection = {
  id: string
  title: string
  summary: string
  nodes: string[]
  route: string
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name)
    return entry.isDirectory() ? walk(file) : entry.name === 'index.md' ? [file] : []
  })
}

function parseFrontmatter<T>(file: string): T {
  const frontmatter = readFileSync(file, 'utf8').match(/^---\s*\n([\s\S]*?)\n---/)
  if (!frontmatter) throw new Error(`学习节点缺少 frontmatter：${file}`)

  try {
    return JSON.parse(frontmatter[1]) as T
  } catch {
    throw new Error(`frontmatter 必须为 JSON：${file}`)
  }
}

function validate(nodes: Node[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const ids = new Set<string>()

  for (const node of nodes) {
    if (!node.id || !node.title || !node.summary || !node.route) {
      throw new Error(`学习节点缺少必要字段：${node.route || node.id}`)
    }
    if (ids.has(node.id)) throw new Error(`学习节点 ID 重复：${node.id}`)
    ids.add(node.id)
    if (!knownLevels.has(node.level)) {
      throw new Error(`学习节点包含未知 level：${node.id}`)
    }
    if (!node.concepts?.length || node.concepts.some((concept) => !knownConcepts.has(concept))) {
      throw new Error(`学习节点包含未知 concepts 标签：${node.id}`)
    }
    if (!node.technologies?.length || node.technologies.some((technology) => !knownTechnologies.has(technology))) {
      throw new Error(`学习节点包含未知 technologies 标签：${node.id}`)
    }
    for (const relation of node.relations ?? []) {
      if (relation.target === node.id) throw new Error(`学习节点不能依赖自身：${node.id}`)
      if (!byId.has(relation.target)) {
        throw new Error(`学习节点 ${node.id} 引用了不存在的节点：${relation.target}`)
      }
      if (!['required', 'recommended'].includes(relation.type)) {
        throw new Error(`学习节点关系类型无效：${node.id}`)
      }
    }
  }

  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (id: string) => {
    if (visiting.has(id)) throw new Error(`必需依赖存在环：${[...visiting, id].join(' → ')}`)
    if (visited.has(id)) return
    visiting.add(id)
    for (const relation of byId.get(id)!.relations ?? []) {
      if (relation.type === 'required') visit(relation.target)
    }
    visiting.delete(id)
    visited.add(id)
  }
  for (const node of nodes) visit(node.id)
}

function validateCollections(collections: Collection[], nodes: Node[]) {
  const nodeIds = new Set(nodes.map((node) => node.id))
  const collectionIds = new Set<string>()
  for (const collection of collections) {
    if (!collection.id || !collection.title || !collection.summary || !collection.route) {
      throw new Error(`专题缺少必要字段：${collection.route || collection.id}`)
    }
    if (collectionIds.has(collection.id)) throw new Error(`专题 ID 重复：${collection.id}`)
    collectionIds.add(collection.id)
    if (!collection.nodes?.length) throw new Error(`专题没有成员节点：${collection.id}`)
    const members = new Set<string>()
    for (const nodeId of collection.nodes) {
      if (!nodeIds.has(nodeId)) throw new Error(`专题 ${collection.id} 引用了不存在的节点：${nodeId}`)
      if (members.has(nodeId)) throw new Error(`专题 ${collection.id} 重复引用节点：${nodeId}`)
      members.add(nodeId)
    }
  }
}

function collectNodes(source: string): Node[] {
  const root = join(source, 'nodes')
  const nodes = walk(root).filter((file) => file !== join(root, 'index.md')).map((file) => {
    const route = `/${relative(source, file).replace(/\\/g, '/').replace(/\/index\.md$/, '/')}`
    return { ...parseFrontmatter<Omit<Node, 'route'>>(file), route }
  })
  validate(nodes)
  return nodes.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
}

function collectCollections(source: string): Collection[] {
  const root = join(source, 'collections')
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== 'index.md' && entry.name.endsWith('.md'))
    .map((entry) => {
      const file = join(root, entry.name)
      const route = `/${relative(source, file).replace(/\\/g, '/').replace(/\.md$/, '')}`
      return { ...parseFrontmatter<Omit<Collection, 'route'>>(file), route }
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
}

export function learningGraphPlugin(source: string): Plugin {
  const virtualId = 'virtual:learning-graph'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'learning-graph',
    resolveId(id) {
      return id === virtualId ? resolvedId : undefined
    },
    load(id) {
      if (id !== resolvedId) return undefined
      const nodes = collectNodes(source)
      const collections = collectCollections(source)
      validateCollections(collections, nodes)
      return `export default ${JSON.stringify({ nodes, collections, taxonomy: { levels } })}`
    }
  }
}
