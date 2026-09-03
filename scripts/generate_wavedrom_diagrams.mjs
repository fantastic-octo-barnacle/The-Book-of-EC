import { globSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)
const wavedromRequire = createRequire(require.resolve("wavedrom/package.json"))
const json5 = wavedromRequire("json5")
const wavedrom = require("wavedrom")

const sourceSuffix = ".wavedrom.json5"
const sourceFiles = globSync(`src/nodes/**/assets/*${sourceSuffix}`, { cwd: root }).sort()

for (const sourceFile of sourceFiles) {
  const sourcePath = resolve(root, sourceFile)
  const outputPath = resolve(root, `${sourceFile.slice(0, -sourceSuffix.length)}.svg`)
  const source = json5.parse(readFileSync(sourcePath, "utf8"))
  const svg = wavedrom.onml.stringify(wavedrom.renderAny(0, source, wavedrom.waveSkin))
  writeFileSync(outputPath, svg, "utf8")
}
