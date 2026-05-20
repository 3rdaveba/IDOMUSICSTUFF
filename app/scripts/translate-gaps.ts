#!/usr/bin/env tsx
/**
 * Translate gap files using Google Translate (no API key needed)
 */

import * as fs from 'fs'
import * as path from 'path'
import { translate } from 'google-translate-api-x'

const GAPS_DIR = path.join(process.cwd(), 'translations', 'gaps')
const OUT_DIR = path.join(process.cwd(), 'translations', 'gaps')

// Brand names, person names, place names that should NEVER be translated
const PROTECTED_PATTERNS = [
  /William\s+"B\.A\."\s+Washington/i,
  /WILLIAM\s+"B\.A\."\s+WASHINGTON/i,
  /Los Angeles, CA/i,
  /Spotify/i,
  /YouTube/i,
  /TikTok/i,
  /Chartmetric/i,
  /GRAMMY/i,
  /CM Score/i,
  /Pro Tools/i,
  /Docker/i,
  /Python/i,
  /Suno/i,
  /Sony Masterworks/i,
  /Netflix/i,
  /Warner Bros\./i,
  /DC6/i,
  /Epiphany Music Group/i,
  /PRVBLEMS/i,
  /© \d{4}/,
]

function isProtected(text: string): boolean {
  return PROTECTED_PATTERNS.some(p => p.test(text))
}

async function translateGaps(lang: string, to: string) {
  const gapsPath = path.join(GAPS_DIR, `${lang}-gaps.json`)
  const outPath = path.join(OUT_DIR, `${lang}-filled.json`)

  if (!fs.existsSync(gapsPath)) {
    console.log(`⚠️ No gaps file: ${gapsPath}`)
    return
  }

  const gaps = JSON.parse(fs.readFileSync(gapsPath, 'utf-8'))
  const result: Record<string, string> = {}

  const entries = Object.entries(gaps)
  console.log(`\n▶ Translating ${entries.length} ${lang} gaps to ${to}...`)

  let translated = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < entries.length; i++) {
    const [key, text] = entries[i] as [string, string]

    if (isProtected(text)) {
      result[key] = text
      skipped++
      continue
    }

    try {
      const res = await translate(text, { from: 'en', to, autoCorrect: false })
      result[key] = res.text
      translated++

      // Small delay to avoid rate limiting
      if (i < entries.length - 1) await new Promise(r => setTimeout(r, 150))
    } catch (err: any) {
      console.log(`  ❌ Error translating "${text.substring(0, 40)}": ${err.message}`)
      result[key] = text
      errors++
    }

    if ((i + 1) % 10 === 0) {
      process.stdout.write(`\r  ${i + 1}/${entries.length} done...`)
    }
  }

  process.stdout.write(`\r  ${entries.length}/${entries.length} done...\n`)

  fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n')
  console.log(`✅ Wrote ${outPath}`)
  console.log(`   Translated: ${translated}, Skipped (protected): ${skipped}, Errors: ${errors}`)
}

async function main() {
  await translateGaps('da', 'da')
  await translateGaps('es', 'es')
  console.log('\n🎉 All gaps translated!')
}

main().catch(console.error)
