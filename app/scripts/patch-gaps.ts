#!/usr/bin/env tsx
/**
 * Patch gaps into final translation files
 *
 * Reads gap-fill outputs and merges them into the existing final translations.
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT = process.cwd()
const GAPS_DIR = path.join(ROOT, 'translations', 'gaps')
const FINAL_DIR = path.join(ROOT, 'translations', 'final')
const PUBLIC_LOCALES_DIR = path.join(ROOT, 'public', 'locales')

function loadJson(file: string) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key])) {
      target[key] = source[key].map((item: any, i: number) => {
        if (typeof item === 'string') return item
        if (typeof item === 'object' && target[key]?.[i]) {
          return deepMerge({ ...target[key][i] }, item)
        }
        return item
      })
    } else if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {}
      deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

function run() {
  for (const lang of ['da', 'es']) {
    const finalPath = path.join(FINAL_DIR, `${lang}.json`)
    const gapsPath = path.join(GAPS_DIR, `${lang}-gaps.json`)
    const filledPath = path.join(GAPS_DIR, `${lang}-filled.json`)

    if (!fs.existsSync(filledPath)) {
      console.log(`⚠️ No filled file for ${lang}: ${filledPath}`)
      continue
    }

    const final = loadJson(finalPath)
    const filled = loadJson(filledPath)

    const patched = deepMerge({ ...final }, filled)

    fs.writeFileSync(finalPath, JSON.stringify(patched, null, 2) + '\n')
    console.log(`✅ Patched ${lang} final file`)

    const publicPath = path.join(PUBLIC_LOCALES_DIR, lang, 'translation.json')
    fs.writeFileSync(publicPath, JSON.stringify(patched, null, 2) + '\n')
    console.log(`✅ Copied ${lang} to public/locales`)
  }

  console.log('\n🎉 Done!')
}

run()
