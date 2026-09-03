# Final Authority Resolution: Spanish Disputes

## Your Role
You are the final authority on Spanish translation quality. Three AI models (Claude, Codex, Gemini) translated 433 keys and disagreed on 233 of them. **Your job is to resolve every dispute.**

## Input
Read `app/translations/disputes/es-disputes.json`. It is an array of dispute objects, each containing:
- `key`: the translation key (e.g. "about.bio1")
- `english`: the original English source text
- `claude`: Claude's translation
- `codex`: Codex's translation
- `gemini`: Gemini's translation
- `chosen`: what the merge script currently selected

## Output
Write your resolutions to `app/translations/gaps/es-resolved.json`.

Use this exact flat JSON structure:
```json
{
  "key.name.here": "your final Spanish translation",
  "another.key": "another final translation"
}
```

## Resolution Rules
1. **You are the tiebreaker.** Pick the single best translation for each key.
2. Evaluate based on:
   - **Naturalness** — sounds like a native Spanish speaker wrote it (neutral Latin American Spanish preferred)
   - **Music industry accuracy** — uses correct Spanish terminology for production/performance terms
   - **Tone** — professional, creative, confident (Grammy-winning artist portfolio)
   - **Consistency** — matches the voice and style of the surrounding translated content
3. If NONE of the three model options are good enough, write your own corrected version.
4. Preserve proper nouns, brand names, artist names, and interpolation variables like {{streams}}, {{tracks}}, {{date}}, {{source}}.
5. Include **ALL 233 keys** in your output. Do not skip any.
6. Keep HTML entities (&middot;, &mdash;, &reg;, &hellip;) exactly as they appear in the source.
