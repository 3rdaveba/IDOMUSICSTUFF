import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

test('all candidate tools leave reviewed and runtime translations unchanged', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-locale-'))
  const write = (file: string, value: unknown) => { const dest = path.join(temp, file); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, JSON.stringify(value)) }
  try {
    write('translations/source/en.json', { title: 'Source' })
    write('public/locales/en/translation.json', { title: 'Source' })
    for (const lang of ['da', 'es']) {
      write(`translations/final/${lang}.json`, { title: 'Approved' })
      write(`public/locales/${lang}/translation.json`, { title: 'Approved' })
      write(`translations/gaps/${lang}-filled.json`, { title: 'Filled' })
      write(`translations/gaps/${lang}-resolved.json`, { title: 'Resolved' })
      for (const model of ['claude', 'codex', 'gemini']) {
        write(`translations/output/${lang}-${model}.json`, { title: 'Candidate' })
        write(`translations/gaps/${lang}-qc-${model}.json`, { title: 'Quality checked' })
      }
    }
    for (const script of ['merge-translations', 'apply-resolutions', 'merge-qc', 'patch-gaps']) {
      execFileSync(process.execPath, ['--import', require.resolve('tsx'), path.resolve(`scripts/${script}.ts`)], { cwd: temp, stdio: 'pipe' })
      for (const lang of ['da', 'es']) {
        assert.equal(JSON.parse(fs.readFileSync(path.join(temp, `translations/final/${lang}.json`), 'utf8')).title, 'Approved', script)
        assert.equal(JSON.parse(fs.readFileSync(path.join(temp, `public/locales/${lang}/translation.json`), 'utf8')).title, 'Approved', script)
        assert(fs.existsSync(path.join(temp, `translations/candidates/${lang}.json`)), script)
      }
    }
    assert.equal(JSON.parse(fs.readFileSync(path.join(temp, 'public/locales/en/translation.json'), 'utf8')).title, 'Source')
  } finally { fs.rmSync(temp, { recursive: true, force: true }) }
})
