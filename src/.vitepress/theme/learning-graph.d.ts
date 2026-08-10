declare module 'virtual:learning-graph' {
  const graph: {
    nodes: Array<{
      id: string
      title: string
      summary: string
      level: string
      estimatedTime: string
      concepts: string[]
      technologies: string[]
      relations: Array<{ target: string; type: 'required' | 'recommended' }>
      route: string
    }>
    collections: Array<{
      id: string
      title: string
      summary: string
      nodes: string[]
      route: string
    }>
    taxonomy: { levels: string[] }
  }
  export default graph
}
