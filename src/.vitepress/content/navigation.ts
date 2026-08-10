import type { DefaultTheme } from "vitepress"
import { nodeRoute, nodes, type NodeId } from "./nodes.ts"
import { graphTopics } from "./topics.ts"

export function createSidebar(): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.SidebarMulti = {
    "/map/": [
      {
        text: "学习图",
        items: [
          { text: "总图", link: "/map/" },
          {
            text: "专题",
            collapsed: false,
            items: graphTopics().map((topic) => ({ text: topic.title, link: topic.route }))
          }
        ]
      }
    ],
    "/problems/": [
      {
        text: "问题排查",
        items: [
          { text: "排查入口", link: "/problems/" },
          { text: "程序与构建", link: "/problems/software-build" },
          { text: "硬件与上电", link: "/problems/hardware-bring-up" },
          { text: "通信", link: "/problems/communication" },
          { text: "控制与联调", link: "/problems/control-integration" }
        ]
      }
    ],
    "/reference/": [
      {
        text: "参考资料",
        items: [
          { text: "概览", link: "/reference/" },
          { text: "如何读技术资料", link: "/reference/reading-docs" },
          { text: "术语与检索词", link: "/reference/glossary" }
        ]
      }
    ],
    "/contributing/": [
      {
        text: "维护本书",
        items: [
          { text: "概览", link: "/contributing/" },
          { text: "内容模型", link: "/contributing/content-model" },
          { text: "编写学习节点", link: "/contributing/writing-nodes" },
          { text: "元数据", link: "/contributing/metadata" },
          { text: "本地开发", link: "/contributing/local-development" }
        ]
      }
    ]
  }

  for (const [id, node] of Object.entries(nodes) as [NodeId, (typeof nodes)[NodeId]][]) {
    if (node.parts.length === 0) continue
    const route = nodeRoute(id)
    sidebar[route] = [
      {
        text: node.title,
        items: [
          { text: node.title, link: route },
          ...node.parts.map((part) => ({ text: part.title, link: `${route}${part.path}` }))
        ]
      }
    ]
  }

  return sidebar
}
