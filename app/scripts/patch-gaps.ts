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
const CANDIDATES_DIR = path.join(ROOT, 'translations', 'candidates')
fs.mkdirSync(CANDIDATES_DIR, { recursive: true })

function loadJson(file: string) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(source)) {
    return source.map((item, index) => deepMerge(Array.isArray(target) ? target[index] : undefined, item))
  }
  if (source !== null && typeof source === 'object') {
    const result: Record<string, unknown> = target !== null && typeof target === 'object' && !Array.isArray(target)
      ? { ...target } : {}
    for (const [key, value] of Object.entries(source)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Unsafe locale key')
      result[key] = deepMerge(result[key], value)
    }
    return result
  }
  return source
}

function run() {
  for (const lang of ['da', 'es']) {
    const finalPath = path.join(FINAL_DIR, `${lang}.json`)
    const filledPath = path.join(GAPS_DIR, `${lang}-filled.json`)

    if (!fs.existsSync(filledPath)) {
      console.log(`⚠️ No filled file for ${lang}: ${filledPath}`)
      continue
    }

    const final = loadJson(finalPath)
    const filled = loadJson(filledPath)

    const patched = deepMerge({ ...final }, filled)

    fs.writeFileSync(path.join(CANDIDATES_DIR, `${lang}.json`), JSON.stringify(patched, null, 2) + '\n')
    console.log(`✅ Candidate for ${lang} final file`)

  }

  console.log('\n🎉 Done!')
}

run()
