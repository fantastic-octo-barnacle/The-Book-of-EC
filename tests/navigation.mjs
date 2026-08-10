import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { chromium } from "playwright"

const port = 4178
const baseURL = `http://127.0.0.1:${port}`
const preview = spawn("pnpm", ["exec", "vitepress", "preview", "src", "--port", String(port)], {
  detached: true,
  stdio: "ignore"
})

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(baseURL)
      if (response.ok) return
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error("VitePress preview did not start")
}

let browser
try {
  await waitForServer()
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(baseURL)
  for (const label of ["首页", "学习图", "问题排查", "参考资料", "维护本书"]) {
    assert.equal(
      await page.getByRole("link", { name: label, exact: true }).first().isVisible(),
      true
    )
  }
  assert.equal(await page.getByRole("button", { name: "搜索" }).first().isVisible(), true)
  assert.equal(await page.locator(".learning-graph .cy-canvas canvas").first().isVisible(), true)

  await page.goto(`${baseURL}/map/topics/embedded`)
  assert.equal(await page.getByRole("heading", { name: "电子与嵌入式" }).isVisible(), true)
  assert.equal(await page.getByRole("link", { name: "总览", exact: true }).isVisible(), true)
  assert.equal(await page.getByText("专题", { exact: true }).first().isVisible(), true)
  assert.equal(await page.locator(".learning-graph .cy-canvas canvas").first().isVisible(), true)

  await page.goto(`${baseURL}/nodes/programming/object-lifetime/`)
  const sidebar = page.locator(".VPSidebar")
  assert.equal(await sidebar.getByRole("link", { name: "对象与生命周期" }).isVisible(), true)
  assert.equal(await sidebar.getByRole("link", { name: "原理" }).isVisible(), true)
  assert.equal(await sidebar.getByRole("link", { name: "练习" }).isVisible(), true)

  await page.goto(`${baseURL}/nodes/embedded/gpio/`)
  assert.equal(await page.locator(".VPSidebar").count(), 0)

  await page.goto(`${baseURL}/problems/`)
  assert.equal(await page.getByRole("link", { name: "程序与构建" }).first().isVisible(), true)
  assert.equal(await page.getByRole("link", { name: "控制与联调" }).first().isVisible(), true)

  process.stdout.write("Navigation smoke tests passed.\n")
} finally {
  await browser?.close()
  if (preview.pid) {
    try {
      process.kill(-preview.pid, "SIGTERM")
    } catch (error) {
      if (error?.code !== "ESRCH") throw error
    }
  }
}
