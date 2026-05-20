# Quality Check: Danish Translations

## Context
A portfolio website for Grammy-winning vocal producer William "B.A." Washington was translated from English to Danish. The initial translations were done by AI models but ~30% of keys were left in English. Those gaps were filled using Google Translate. **Your job is to review and improve the Google-translated Danish text.**

## Input Files
1. `app/translations/source/en.json` — Original English text
2. `app/translations/gaps/da-gaps.json` — The specific keys that were missing
3. `app/translations/gaps/da-filled.json` — The Google-translated versions (what you are reviewing)

## Output File
Write your reviewed/improved translations to: `app/translations/gaps/da-qc-{model}.json`

Use the same flat key-value structure as `da-gaps.json` and `da-filled.json`.

## Review Criteria
For each key, compare the English source with the Google-translated Danish:

1. **Naturalness** — Does it sound like a native Danish speaker wrote it? Fix awkward phrasing.
2. **Music industry terminology** — Are terms like "vocal producer," "background vocals," "soundtrack," "DAW," "mixing" translated using standard Danish music industry terms?
3. **Tone consistency** — The site is professional, creative, and Grammy-winning. The tone should feel confident and polished, not robotic.
4. **Proper noun preservation** — Artist names, song titles, film titles, project names, and brand names MUST stay in English.
5. **Interpolation variables** — Preserve `{{streams}}`, `{{tracks}}`, etc. exactly.

## What to Change
- Fix any Google-Translate-awkward phrasing
- Improve music-specific terminology
- Ensure cultural naturalness for a Danish audience
- Keep the same JSON keys, only modify the string values

## What NOT to Change
- Do not add or remove keys
- Do not translate proper nouns/brand names
- Do not modify interpolation variables
