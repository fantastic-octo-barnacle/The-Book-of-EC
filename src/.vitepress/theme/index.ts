import DefaultTheme from "vitepress/theme"
import "./custom.css"
import LearningGraph from "./components/LearningGraph.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: { component: (name: string, component: unknown) => void } }) {
    app.component("LearningGraph", LearningGraph)
  }
}
