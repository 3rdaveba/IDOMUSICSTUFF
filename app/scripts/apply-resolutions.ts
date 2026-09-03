#!/usr/bin/env tsx
/**
 * Apply Opus dispute resolutions into final translation files
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT = process.cwd()
const GAPS_DIR = path.join(ROOT, 'translations', 'gaps')
const FINAL_DIR = path.join(ROOT, 'translations', 'final')
const PUBLIC_LOCALES_DIR = path.join(ROOT, 'public', 'locales')

function run() {
  console.log('🔨 Applying Opus Resolutions\n')

  for (const lang of ['da', 'es']) {
    const resolvedPath = path.join(GAPS_DIR, `${lang}-resolved.json`)

    if (!fs.existsSync(resolvedPath)) {
      console.log(`⚠️ No resolution file for ${lang}: ${resolvedPath}`)
      console.log(`   Run Claude Opus with the opus-resolve-${lang}.md instructions first.`)
      continue
    }

    const resolved: Record<string, string> = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'))
    console.log(`▶ ${lang.toUpperCase()}: ${Object.keys(resolved).length} resolutions found`)

    const finalPath = path.join(FINAL_DIR, `${lang}.json`)
    const final = JSON.parse(fs.readFileSync(finalPath, 'utf-8'))

    for (const [flatKey, value] of Object.entries(resolved)) {
      const parts = flatKey.split(/\.|\[(\d+)\]/).filter(Boolean)
      let cur: any = final
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i]
        const nextIsIndex = /^\d+$/.test(parts[i + 1])
        if (!(p in cur)) cur[p] = nextIsIndex ? [] : {}
        cur = cur[p]
      }
      const last = parts[parts.length - 1]
      if (/^\d+$/.test(last)) {
        cur[parseInt(last)] = value
      } else {
        cur[last] = value
      }
    }

    fs.writeFileSync(finalPath, JSON.stringify(final, null, 2) + '\n')
    console.log(`  ✅ Final patched: ${finalPath}`)

    const publicPath = path.join(PUBLIC_LOCALES_DIR, lang, 'translation.json')
    fs.writeFileSync(publicPath, JSON.stringify(final, null, 2) + '\n')
    console.log(`  ✅ Public locale: ${publicPath}`)
  }

  console.log('\n🎉 Done! Rebuild with: npm run build')
}

run()
