import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const base = 'http://127.0.0.1:4174'
let server, browser
const locale = language => JSON.parse(readFileSync(`public/locales/${language}/translation.json`, 'utf8'))
before(async () => {
  server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4174', '--strictPort'], { stdio: 'ignore' })
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error('Test preview failed to start')
    try { ready = (await fetch(base)).ok } catch { /* Wait for owned test server. */ }
    if (ready) break
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  assert(ready, 'Test preview did not become ready')
  browser = await chromium.launch()
})
after(async () => { await browser?.close(); server?.kill() })
async function page() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  await context.addInitScript(() => { if (!localStorage.getItem('i18n-language')) localStorage.setItem('i18n-language', 'en') })
  // Every contact request must be explicitly mocked by the test, never sent.
  await context.route('https://formspree.io/**', route => route.abort())
  const page = await context.newPage()
  return { context, page }
}

test('project cards support keyboard navigation and unknown routes recover', async () => {
  const { context, page: p } = await page()
  try {
    await p.goto(base + '/#/')
    const card = p.locator('a[href="#/project/ledger"]')
    await card.waitFor(); await card.focus(); await p.keyboard.press('Enter')
    await p.getByRole('heading', { name: locale('en').data.projects.ledger.title, exact: true }).waitFor()
    await p.goto(base + '/#/project/not-a-real-project')
    await p.getByRole('button', { name: locale('en').projectDetail.backToWork }).click()
    await p.locator('#work').waitFor()
    assert.equal(new URL(p.url()).hash, '#/')
    assert.equal(await p.getByRole('link', { name: locale('en').navigation.artistWork, exact: true }).getAttribute('href'), '#/artist-work')
    for (const route of ['/work', '/not-a-real-route']) {
      await p.goto(base + '/#' + route); await p.locator('#work').waitFor()
      assert.equal(new URL(p.url()).hash, '#/')
    }
  } finally { await context.close() }
})

test('reviewed project copy renders in all languages with language metadata', async () => {
  const { context, page: p } = await page()
  try {
    for (const id of ['prima', 'knwn', 'ledger']) {
      await p.goto(base + '/#/project/' + id)
      for (const [lang, label] of [['en', 'English'], ['da', 'Dansk'], ['es', 'Español']]) {
        await p.getByRole('button', { name: 'Change language', exact: true }).click()
        await p.locator('#language-options').getByRole('button', { name: label, exact: false }).click()
        const expected = locale(lang).data.projects[id]
        await p.getByRole('heading', { name: expected.title, exact: true }).waitFor()
        const text = await p.locator('body').innerText()
        for (const value of [expected.description, expected.role, ...Object.values(expected.dmaic), ...expected.outcomes, ...expected.timeline, ...expected.tools, ...expected.media.map(item => item.caption || item.label)]) assert(text.includes(value), `${lang}/${id}: ${value.slice(0, 40)}`)
        assert.equal(await p.locator('html').getAttribute('lang'), lang)
      }
      await p.reload()
      await p.getByRole('heading', { name: locale('es').data.projects[id].title, exact: true }).waitFor()
    }
  } finally { await context.close() }
})

test('media dialog opens by keyboard, traps focus and restores its opener', async () => {
  const { context, page: p } = await page()
  try {
    await p.goto(base + '/#/project/ledger')
    const opener = p.getByRole('button', { name: locale('en').data.projects.ledger.media[1].label, exact: true })
    await opener.focus(); await p.keyboard.press('Enter')
    const dialog = p.getByRole('dialog'); await dialog.waitFor()
    assert(await dialog.evaluate(el => el.contains(document.activeElement)))
    for (let i = 0; i < 6; i++) { await p.keyboard.press('Tab'); assert(await dialog.evaluate(el => el.contains(document.activeElement))) }
    await p.keyboard.press('Escape'); await dialog.waitFor({ state: 'detached' })
    assert(await opener.evaluate(el => document.activeElement === el))
    const video = p.getByRole('button', { name: locale('en').data.projects.ledger.media[0].label, exact: true })
    await video.click(); const player = p.locator('video[controls]'); await player.waitFor()
    await player.evaluate(async el => { el.muted = true; await el.play() })
    await p.waitForFunction(() => document.querySelector('video[controls]')?.currentTime > 0)
    assert.equal(await player.evaluate(el => el.error), null)
  } finally { await context.close() }
})

test('language picker closes with Escape and mobile pages do not overflow', async () => {
  const { context, page: p } = await page()
  try {
    await p.setViewportSize({ width: 390, height: 844 })
    for (const id of ['prima', 'knwn', 'ledger']) {
      await p.goto(base + '/#/project/' + id)
      await p.getByRole('heading', { name: locale('en').data.projects[id].title, exact: true }).waitFor()
      assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id)
    }
    const picker = p.getByRole('button', { name: 'Change language', exact: true })
    await picker.click(); assert.equal(await picker.getAttribute('aria-expanded'), 'true')
    await p.keyboard.press('Escape'); assert.equal(await picker.getAttribute('aria-expanded'), 'false')
    assert(await picker.evaluate(el => document.activeElement === el))
  } finally { await context.close() }
})

test('contact validation, failure, retry and success use mocked responses only', async () => {
  const { context, page: p } = await page()
  try {
    let requests = 0
    await p.route('https://formspree.io/**', route => {
      requests++
      return route.fulfill({ status: requests === 1 ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ ok: requests > 1 }) })
    })
    await p.goto(base + '/#/')
    const form = p.locator('#contact form'); await form.scrollIntoViewIfNeeded()
    await form.locator('button[type="submit"]').click(); assert.equal(requests, 0)
    await p.locator('#name').fill('Demo Visitor')
    await p.locator('#email').fill('demo@example.invalid')
    await p.locator('#subject').fill('Local interface test')
    await p.locator('#message').fill('Fictional browser test. No message leaves this browser.')
    await form.locator('button[type="submit"]').click()
    const copy = locale('en').contact
    await p.getByText(copy.errorMessage, { exact: true }).waitFor()
    await p.getByRole('button', { name: copy.tryAgainButton }).click()
    assert.equal(await p.locator('#name').inputValue(), 'Demo Visitor')
    assert.equal(await p.locator('#message').inputValue(), 'Fictional browser test. No message leaves this browser.')
    await p.locator('#contact form button[type="submit"]').click()
    await p.getByText(copy.successMessage, { exact: true }).waitFor()
    assert.equal(requests, 2)
  } finally { await context.close() }
})
