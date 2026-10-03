#!/usr/bin/env tsx
import { setLocaleValue } from './locale-utils'
/**
 * Apply Opus dispute resolutions into final translation files
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT = process.cwd()
const GAPS_DIR = path.join(ROOT, 'translations', 'gaps')
const FINAL_DIR = path.join(ROOT, 'translations', 'final')
const CANDIDATES_DIR = path.join(ROOT, 'translations', 'candidates')
fs.mkdirSync(CANDIDATES_DIR, { recursive: true })

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
      setLocaleValue(final, flatKey, value)
    }

    fs.writeFileSync(path.join(CANDIDATES_DIR, `${lang}.json`), JSON.stringify(final, null, 2) + '\n')
    console.log(`  ✅ Review candidate: ${finalPath}`)

  }

  console.log('\n🎉 Done! Review candidates before applying them to final and public locale files.')
}

run()
