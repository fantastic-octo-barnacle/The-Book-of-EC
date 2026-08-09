import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'The Book of EC',
  description: '面向 RoboMaster 新成员的嵌入式电控学习导航',
  themeConfig: {
    nav: [
      { text: '学习地图', link: '/' },
      { text: '推荐路线', link: '/paths' },
      { text: '问题索引', link: '/problems/' },
      { text: '参考库', link: '/reference/' }
    ],
    sidebar: {
      '/foundations/': [
        { text: '工程基础', items: [
          { text: '概览', link: '/foundations/' },
          { text: '命令行与 Linux', link: '/foundations/command-line' },
          { text: 'Git 协作', link: '/foundations/git' },
          { text: '调试方法', link: '/foundations/debugging' }
        ] }
      ],
      '/programming/': [
        { text: '编程与计算机基础', items: [
          { text: '概览', link: '/programming/' },
          { text: 'C 语言运行模型', link: '/programming/c-runtime' },
          { text: 'C++ 工程能力', link: '/programming/cpp' }
        ] }
      ],
      '/embedded/': [
        { text: '电子与嵌入式', items: [
          { text: '概览', link: '/embedded/' },
          { text: 'MCU、寄存器与中断', link: '/embedded/mcu' },
          { text: '外设与驱动分层', link: '/embedded/drivers' },
          { text: 'RTOS 与并发', link: '/embedded/rtos' }
        ] }
      ],
      '/control/': [
        { text: '控制与机器人', items: [
          { text: '概览', link: '/control/' },
          { text: '反馈控制', link: '/control/feedback' },
          { text: '滤波、估计与电机', link: '/control/estimation' }
        ] }
      ],
      '/communication/': [
        { text: '通信与系统集成', items: [
          { text: '概览', link: '/communication/' },
          { text: '串行与现场总线', link: '/communication/buses' },
          { text: '协议与诊断', link: '/communication/protocols' }
        ] }
      ],
      '/practice/': [
        { text: 'RoboMaster 工程实践', items: [
          { text: '概览', link: '/practice/' },
          { text: '上电与板级调试', link: '/practice/bring-up' },
          { text: '子系统学习入口', link: '/practice/subsystems' }
        ] }
      ],
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
