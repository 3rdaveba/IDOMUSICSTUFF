#!/usr/bin/env tsx
/**
 * Translation Merge Pipeline
 *
 * Compares outputs from Claude, Codex, and Gemini.
 * Produces a single final translation file per language.
 * Disputed keys are flagged for review.
 */

import * as fs from 'fs'
import * as path from 'path'

// ---------------------------------------------------------------------------
// Levenshtein distance for string similarity
// ---------------------------------------------------------------------------
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
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }

  return dp[m][n]
}

function similarity(a: string, b: string): number {
  if (a === b) return 1
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  const dist = levenshtein(a, b)
  return 1 - dist / maxLen
}

// ---------------------------------------------------------------------------
// Flatten / unflatten JSON objects for key-by-key comparison
// ---------------------------------------------------------------------------
function flatten(obj: Record<string, unknown>, prefix = '', result: Record<string, string> = {}): Record<string, string> {
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (typeof val === 'string') {
      result[fullKey] = val
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (typeof item === 'string') {
          result[`${fullKey}[${idx}]`] = item
        } else if (typeof item === 'object' && item !== null) {
          flatten(item as Record<string, unknown>, `${fullKey}[${idx}]`, result)
        }
      })
    } else if (typeof val === 'object' && val !== null) {
      flatten(val as Record<string, unknown>, fullKey, result)
    }
  }
  return result
}

function unflatten(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const key of Object.keys(flat).sort()) {
    const parts = key.split(/\.|\[(\d+)\]/).filter(Boolean)
    let current: any = result

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isIndex = /^\d+$/.test(part)
      const isLast = i === parts.length - 1

      if (isLast) {
        current[part] = flat[key]
      } else {
        const nextPart = parts[i + 1]
        const nextIsIndex = /^\d+$/.test(nextPart)

        if (!(part in current)) {
          current[part] = nextIsIndex ? [] : {}
        }
        current = current[part]
      }
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Merge logic
// ---------------------------------------------------------------------------
interface Dispute {
  key: string
  english: string
  claude: string
  codex: string
  gemini: string
  reason: string
  chosen: string
}

function mergeLanguage(
  lang: string,
  source: Record<string, string>,
  claude: Record<string, string>,
  codex: Record<string, string>,
  gemini: Record<string, string>
): { final: Record<string, string>; disputes: Dispute[] } {
  const final: Record<string, string> = {}
  const disputes: Dispute[] = []

  const allKeys = new Set([...Object.keys(source), ...Object.keys(claude), ...Object.keys(codex), ...Object.keys(gemini)])

  for (const key of allKeys) {
    const en = source[key] ?? ''
    const c = claude[key] ?? ''
    const x = codex[key] ?? ''
    const g = gemini[key] ?? ''

    // If any model is missing this key, flag it
    if (!c || !x || !g) {
      const available = [c, x, g].filter(Boolean)
      const chosen = available[0] ?? en
      disputes.push({
        key,
        english: en,
        claude: c || '[MISSING]',
        codex: x || '[MISSING]',
        gemini: g || '[MISSING]',
        reason: 'One or more models missing this key',
        chosen,
      })
      final[key] = chosen
      continue
    }

    // Case A: unanimous agreement
    if (c === x && x === g) {
      final[key] = c
      continue
    }

    // Case B: majority agreement (2 of 3)
    const simCX = similarity(c, x)
    const simCG = similarity(c, g)
    const simXG = similarity(x, g)

    const threshold = en.length < 20 ? 1.0 : 0.85

    if (simCX >= threshold && simCG >= threshold) {
      final[key] = c
      continue
    }
    if (simCX >= threshold && simXG >= threshold) {
      final[key] = c
      continue
    }
    if (simCG >= threshold && simXG >= threshold) {
      final[key] = g
      continue
    }

    // Case C: all differ — flag as dispute
    // Heuristic: prefer Claude for creative/narrative text, Codex for technical labels
    const isCreative = en.length > 80 || key.includes('bio') || key.includes('description') || key.includes('statement')
    const chosen = isCreative ? c : x

    disputes.push({
      key,
      english: en,
      claude: c,
      codex: x,
      gemini: g,
      reason: `No consensus — similarities: C↔X=${simCX.toFixed(2)}, C↔G=${simCG.toFixed(2)}, X↔G=${simXG.toFixed(2)}`,
      chosen,
    })
    final[key] = chosen
  }

  return { final, disputes }
}

// ---------------------------------------------------------------------------
// Generate review log markdown
// ---------------------------------------------------------------------------
function generateReviewLog(lang: string, disputes: Dispute[]): string {
  let md = `# Translation Review Log: ${lang.toUpperCase()}\n\n`
  md += `Generated: ${new Date().toISOString()}\n\n`
  md += `Total disputed keys: ${disputes.length}\n\n`

  if (disputes.length === 0) {
    md += '✅ All keys reached consensus across the three models.\n'
    return md
  }

  for (const d of disputes) {
    md += `## ${d.key}\n\n`
    md += `**English:** ${d.english}\n\n`
    md += `**Claude:** ${d.claude}\n\n`
    md += `**Codex:** ${d.codex}\n\n`
    md += `**Gemini:** ${d.gemini}\n\n`
    md += `**Reason:** ${d.reason}\n\n`
    md += `**Selected:** ${d.chosen}\n\n`
    md += '---\n\n'
  }

  return md
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const ROOT = process.cwd()
const TRANSLATIONS_DIR = path.join(ROOT, 'translations')
const PUBLIC_LOCALES_DIR = path.join(ROOT, 'public', 'locales')

function run() {
  console.log('🌍 Translation Merge Pipeline\n')

  // Load source
  const sourcePath = path.join(TRANSLATIONS_DIR, 'source', 'en.json')
  const sourceRaw = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))
  const sourceFlat = flatten(sourceRaw)
  console.log(`Source keys: ${Object.keys(sourceFlat).length}`)

  for (const lang of ['da', 'es']) {
    console.log(`\n▶ Processing ${lang.toUpperCase()}...`)

    const claudePath = path.join(TRANSLATIONS_DIR, 'output', `${lang}-claude.json`)
    const codexPath = path.join(TRANSLATIONS_DIR, 'output', `${lang}-codex.json`)
    const geminiPath = path.join(TRANSLATIONS_DIR, 'output', `${lang}-gemini.json`)

    if (!fs.existsSync(claudePath) || !fs.existsSync(codexPath) || !fs.existsSync(geminiPath)) {
      console.log(`  ⚠️ Missing one or more output files for ${lang}. Skipping.`)
      console.log(`     Expected: ${claudePath}`)
      console.log(`     Expected: ${codexPath}`)
      console.log(`     Expected: ${geminiPath}`)
      continue
    }

    const claudeRaw = JSON.parse(fs.readFileSync(claudePath, 'utf-8'))
    const codexRaw = JSON.parse(fs.readFileSync(codexPath, 'utf-8'))
    const geminiRaw = JSON.parse(fs.readFileSync(geminiPath, 'utf-8'))

    const claudeFlat = flatten(claudeRaw)
    const codexFlat = flatten(codexRaw)
    const geminiFlat = flatten(geminiRaw)

    console.log(`  Claude keys: ${Object.keys(claudeFlat).length}`)
    console.log(`  Codex keys:  ${Object.keys(codexFlat).length}`)
    console.log(`  Gemini keys: ${Object.keys(geminiFlat).length}`)

    const { final: finalFlat, disputes } = mergeLanguage(lang, sourceFlat, claudeFlat, codexFlat, geminiFlat)

    console.log(`  Final keys:  ${Object.keys(finalFlat).length}`)
    console.log(`  Disputes:    ${disputes.length}`)

    // Write final JSON
    const finalUnflat = unflatten(finalFlat)
    const finalPath = path.join(TRANSLATIONS_DIR, 'final', `${lang}.json`)
    fs.mkdirSync(path.dirname(finalPath), { recursive: true })
    fs.writeFileSync(finalPath, JSON.stringify(finalUnflat, null, 2) + '\n')
    console.log(`  ✅ Final: ${finalPath}`)

    // Write disputes JSON
    const disputesPath = path.join(TRANSLATIONS_DIR, 'disputes', `${lang}-disputes.json`)
    fs.mkdirSync(path.dirname(disputesPath), { recursive: true })
    fs.writeFileSync(disputesPath, JSON.stringify(disputes, null, 2) + '\n')
    console.log(`  ✅ Disputes: ${disputesPath}`)

    // Write review log
    const logPath = path.join(TRANSLATIONS_DIR, 'disputes', `${lang}-review-log.md`)
    fs.writeFileSync(logPath, generateReviewLog(lang, disputes))
    console.log(`  ✅ Review log: ${logPath}`)

    // Copy to public/locales
    const publicPath = path.join(PUBLIC_LOCALES_DIR, lang, 'translation.json')
    fs.mkdirSync(path.dirname(publicPath), { recursive: true })
    fs.writeFileSync(publicPath, JSON.stringify(finalUnflat, null, 2) + '\n')
    console.log(`  ✅ Public locale: ${publicPath}`)
  }

  // Copy English source to public/locales/en
  const enPublicPath = path.join(PUBLIC_LOCALES_DIR, 'en', 'translation.json')
  fs.mkdirSync(path.dirname(enPublicPath), { recursive: true })
  fs.writeFileSync(enPublicPath, JSON.stringify(sourceRaw, null, 2) + '\n')
  console.log(`\n✅ English source copied to: ${enPublicPath}`)

  console.log('\n🎉 Done!')
}

run()
