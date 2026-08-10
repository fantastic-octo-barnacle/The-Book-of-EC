import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitepress"
import { learningGraphPlugin } from "./content/graph.ts"
import { createSidebar } from "./content/navigation.ts"

// 内容插件以 src 目录为根解析节点文件。
const source = fileURLToPath(new URL("..", import.meta.url))

export default defineConfig({
  lang: "zh-CN",
  title: "The Book of EC",
  description: "面向 RoboMaster 新成员的嵌入式电控学习导航",
  head: [
    // 首次渲染前恢复侧边栏状态，避免页面加载后闪动。
    [
      "script",
      {},
      `try{if(sessionStorage.getItem("the-book-of-ec:sidebar-collapsed")==="true")document.documentElement.classList.add("vp-sidebar-collapsed")}catch{}`
    ]
  ],
  vite: {
    plugins: [learningGraphPlugin(source)]
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "学习图", link: "/map/" },
      { text: "问题排查", link: "/problems/" },
      { text: "参考资料", link: "/reference/" },
      { text: "维护本书", link: "/contributing/" }
    ],
    sidebar: createSidebar(),
    outline: {
      level: [2, 3],
      label: "本页目录"
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
          modal: {
            noResultsText: "没有找到相关内容",
            resetButtonTitle: "清除查询",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭"
            }
          }
        }
      }
    },
    docFooter: { prev: "上一节", next: "下一节" },
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    darkModeSwitchLabel: "外观",
    socialLinks: []
  }
})
