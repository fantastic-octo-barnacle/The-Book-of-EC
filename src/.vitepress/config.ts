import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { learningGraphPlugin } from './learning-graph.ts'

const source = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  lang: 'zh-CN',
  title: 'The Book of EC',
  description: '面向 RoboMaster 新成员的嵌入式电控学习导航',
  vite: {
    plugins: [learningGraphPlugin(source)]
  },
  themeConfig: {
    nav: [
      { text: '学习图', link: '/map/' },
      { text: '专题', link: '/collections/' },
      { text: '标签', link: '/tags/' },
      { text: '问题索引', link: '/problems/' },
      { text: '参考库', link: '/reference/' }
    ],
    sidebar: {
      '/nodes/': [{ text: '学习节点', items: [
        { text: '节点总览', link: '/map/' },
        { text: '专题目录', link: '/collections/' },
        { text: '标签索引', link: '/tags/' }
      ] }],
      '/collections/': [{ text: '专题', items: [
        { text: '总目录', link: '/collections/' },
        { text: '工程与协作', link: '/collections/engineering' },
        { text: 'C/C++ 与程序运行', link: '/collections/programming' },
        { text: '电子与嵌入式', link: '/collections/embedded' },
        { text: '通信', link: '/collections/communication' },
        { text: '控制与机器人', link: '/collections/control' },
        { text: 'RoboMaster 实践', link: '/collections/robotics' }
      ] }],
      '/problems/': [
        { text: '我遇到了什么问题？', items: [
          { text: '索引', link: '/problems/' },
          { text: '程序与构建', link: '/problems/software' },
          { text: '硬件、通信与控制', link: '/problems/system' }
        ] }
      ],
      '/reference/': [
        { text: '参考库', items: [
          { text: '概览', link: '/reference/' },
          { text: '如何读技术资料', link: '/reference/reading-docs' },
          { text: '术语与检索词', link: '/reference/glossary' },
          { text: '节点模板', link: '/reference/node-template' }
        ] }
      ]
    },
    socialLinks: []
  }
})
