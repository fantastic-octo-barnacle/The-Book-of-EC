import DefaultTheme from "vitepress/theme"
import { h } from "vue"
import "./custom.css"
import LearningGraph from "./components/LearningGraph.vue"
import SidebarToggle from "./components/SidebarToggle.vue"

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(SidebarToggle)
    }),
  enhanceApp({ app }: { app: { component: (name: string, component: unknown) => void } }) {
    app.component("LearningGraph", LearningGraph)
  }
}
