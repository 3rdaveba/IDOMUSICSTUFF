#!/usr/bin/env tsx
/**
 * Merge quality-checked gap translations into final files
 *
 * Compares outputs from Claude, Codex, and Gemini quality checks.
 * Produces a single patched translation file per language.
 */

import * as fs from 'fs'
import * as path from 'path'

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }

  return dp[m][n]
}

function similarity(a: string, b: string): number {
  if (a === b) return 1
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  return 1 - levenshtein(a, b) / maxLen
}

function loadJson(file: string): Record<string, string> {
  if (!fs.existsSync(file)) return {}
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function mergeQC(
  lang: string,
  filled: Record<string, string>,
  claude: Record<string, string>,
  codex: Record<string, string>,
  gemini: Record<string, string>
): { merged: Record<string, string>; disputes: any[] } {
  const merged: Record<string, string> = {}
  const disputes: any[] = []

  const allKeys = new Set([
    ...Object.keys(filled),
    ...Object.keys(claude),
    ...Object.keys(codex),
    ...Object.keys(gemini),
  ])

  for (const key of allKeys) {
    const f = filled[key] ?? ''
    const c = claude[key] ?? ''
    const x = codex[key] ?? ''
    const g = gemini[key] ?? ''

    // If any QC is missing, use the filled version
    if (!c && !x && !g) {
      merged[key] = f
      continue
    }

    // Use majority consensus among QC outputs + filled as tiebreaker
    const votes = [c, x, g].filter(Boolean)

    // Count occurrences
    const counts: Record<string, number> = {}
    let best = ''
    let bestCount = 0
    for (const v of votes) {
      counts[v] = (counts[v] || 0) + 1
      if (counts[v] > bestCount) {
        bestCount = counts[v]
        best = v
      }
    }

    if (bestCount >= 2) {
      merged[key] = best
    } else {
      // All different — flag dispute, default to filled version
      merged[key] = f
      disputes.push({
        key,
        filled: f,
        claude: c,
        codex: x,
        gemini: g,
        selected: f,
      })
    }
  }

  return { merged, disputes }
}

const ROOT = process.cwd()
const GAPS_DIR = path.join(ROOT, 'translations', 'gaps')
const FINAL_DIR = path.join(ROOT, 'translations', 'final')
const PUBLIC_LOCALES_DIR = path.join(ROOT, 'public', 'locales')

function run() {
  console.log('🔍 Quality Check Merge\n')

  for (const lang of ['da', 'es']) {
    console.log(`▶ Processing ${lang.toUpperCase()}...`)

    const filledPath = path.join(GAPS_DIR, `${lang}-filled.json`)
    const claudePath = path.join(GAPS_DIR, `${lang}-qc-claude.json`)
    const codexPath = path.join(GAPS_DIR, `${lang}-qc-codex.json`)
    const geminiPath = path.join(GAPS_DIR, `${lang}-qc-gemini.json`)

    if (!fs.existsSync(claudePath) && !fs.existsSync(codexPath) && !fs.existsSync(geminiPath)) {
      console.log(`  ⚠️ No QC files found for ${lang}. Skipping.`)
      continue
    }

    const filled = loadJson(filledPath)
    const claude = loadJson(claudePath)
    const codex = loadJson(codexPath)
    const gemini = loadJson(geminiPath)

    console.log(`  Filled keys: ${Object.keys(filled).length}`)
    console.log(`  Claude QC:   ${Object.keys(claude).length}`)
    console.log(`  Codex QC:    ${Object.keys(codex).length}`)
    console.log(`  Gemini QC:   ${Object.keys(gemini).length}`)

    const { merged, disputes } = mergeQC(lang, filled, claude, codex, gemini)

    console.log(`  Merged:      ${Object.keys(merged).length}`)
    console.log(`  Disputes:    ${disputes.length}`)

    // Load existing final and patch
    const finalPath = path.join(FINAL_DIR, `${lang}.json`)
    const final = JSON.parse(fs.readFileSync(finalPath, 'utf-8'))

    // Deep merge: update final with merged gap values
    for (const [flatKey, value] of Object.entries(merged)) {
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

    if (disputes.length > 0) {
      const disputesPath = path.join(GAPS_DIR, `${lang}-qc-disputes.json`)
      fs.writeFileSync(disputesPath, JSON.stringify(disputes, null, 2) + '\n')
      console.log(`  ⚠️ Disputes: ${disputesPath}`)
    }
  }

  console.log('\n🎉 Done!')
}

run()
