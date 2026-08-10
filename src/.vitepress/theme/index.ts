import DefaultTheme from "vitepress/theme"
import { h } from "vue"
import "./custom.css"
import LearningGraph from "./components/LearningGraph.vue"
import SidebarToggle from "./components/SidebarToggle.vue"

export default {
  extends: DefaultTheme,
  // 在默认布局底部注入全局侧边栏开关。
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(SidebarToggle)
    }),
  /** 注册可在 Markdown 中直接使用的学习图组件。 */
  enhanceApp({ app }: { app: { component: (name: string, component: unknown) => void } }) {
    app.component("LearningGraph", LearningGraph)
  }
}
