import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { projects } from '../src/data/projects'

const read = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'))
export function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value }
  assert(value !== null && typeof value === 'object', `Invalid locale value: ${prefix}`)
  return Object.fromEntries(Object.entries(value).flatMap(([key, child]) => Object.entries(flatten(child, `${prefix}.${key}`))))
}
export function validateLocale(source: unknown, target: unknown) {
  const shape = (value: unknown): unknown => typeof value === 'string' ? 'text'
    : Array.isArray(value) ? value.map(shape)
    : Object.fromEntries(Object.entries(value as object).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, shape(child)]))
  assert.deepEqual(shape(target), shape(source), 'Locale object/array structure differs')
  const a = flatten(source), b = flatten(target)
  assert.deepEqual(Object.keys(b).sort(), Object.keys(a).sort(), 'Locale keys differ from English')
  for (const [key, value] of Object.entries(b)) {
    assert(value.trim(), `Empty translation: ${key}`)
    const placeholders = (text: string) => (text.match(/{{[^}]+}}/g) || []).sort()
    assert.deepEqual(placeholders(value), placeholders(a[key]), `Interpolation mismatch: ${key}`)
  }
}
export function checkContent() {
  const source = read('translations/source/en.json')
  for (const lang of ['en', 'da', 'es']) {
    const runtime = read(`public/locales/${lang}/translation.json`)
    const reviewed = read(lang === 'en' ? 'translations/source/en.json' : `translations/final/${lang}.json`)
    validateLocale(source, runtime)
    assert.deepEqual(runtime, reviewed, `${lang}: reviewed/runtime files differ`)
    for (const project of projects) {
      const copy = runtime.data.projects[project.id]
      assert(copy, `${lang}: missing project ${project.id}`)
      for (const field of ['role', 'description', 'dmaic', 'timeline', 'tools', 'outcomes']) assert(copy[field], `${project.id}: missing ${field}`)
      for (const field of ['timeline', 'tools', 'outcomes'] as const) assert.equal(copy[field].length, project[field].length, `${lang}/${project.id}/${field}`)
      for (const key of ['D', 'M', 'A', 'I', 'C']) assert(typeof copy.dmaic[key] === 'string' && copy.dmaic[key].trim(), `${project.id}/${key}`)
      if (['prima', 'knwn', 'ledger', 'portfolio'].includes(project.id)) {
        assert(copy.title?.trim(), `${project.id}: missing localized title`)
        assert.equal(copy.media?.length, project.media?.items.length, `${project.id}: media length`)
        project.media?.items.forEach((item, index) => {
          assert(copy.media[index]?.label?.trim(), `${project.id}: media label ${index}`)
          if (item.caption) assert(copy.media[index]?.caption?.trim(), `${project.id}: media caption ${index}`)
        })
      }
    }
  }
  const seen = new Set<string>()
  for (const project of projects) {
    assert(!seen.has(project.id), `Duplicate project ID: ${project.id}`); seen.add(project.id)
    for (const asset of [project.heroImage, ...(project.media?.items.flatMap(item => [item.src, item.url]) || [])]) {
      if (asset?.startsWith('/') && !asset.startsWith('//')) assert(fs.existsSync(path.join('public', asset)), `Missing asset: ${asset}`)
    }
  }
  console.log(`Content verified: ${projects.length} projects, 3 locale trees, matching reviewed/runtime files and local media.`)
}
if (process.argv[1]?.endsWith('check-content.ts')) checkContent()
