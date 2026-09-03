import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const outputDir = resolve(root, "src/nodes/embedded/circuit-basics/assets")
const require = createRequire(import.meta.url)
const wavedromRequire = createRequire(require.resolve("wavedrom/package.json"))
const json5 = wavedromRequire("json5")
const wavedrom = require("wavedrom")

const diagrams = [
  {
    source: "src/nodes/embedded/circuit-basics/assets/clock-timing.wavedrom.json5",
    output: "clock-timing.svg"
  }
]

mkdirSync(outputDir, { recursive: true })

for (const diagram of diagrams) {
  const sourcePath = resolve(root, diagram.source)
  const outputPath = resolve(outputDir, diagram.output)
  const source = json5.parse(readFileSync(sourcePath, "utf8"))
  const svg = wavedrom.onml.stringify(wavedrom.renderAny(0, source, wavedrom.waveSkin))
  writeFileSync(outputPath, svg, "utf8")
}
