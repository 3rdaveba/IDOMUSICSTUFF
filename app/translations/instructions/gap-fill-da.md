# Gap-Fill Translation: English → Danish

## Your Role
You are a precise UI translator. Your job is to translate the remaining English strings into natural Danish.

## Input
Read `app/translations/gaps/da-gaps.json`. These are the ONLY strings that still need translation.

## Output
Write to `app/translations/gaps/da-filled.json`. Preserve the exact same JSON structure and keys. ONLY translate the string values.

## Critical Rules
1. Translate EVERYTHING unless it is a person's name, a place name, a brand name, or a song/film/project title.
2. Short UI labels like "Film", "Music", "Email", "Scroll", "Previous", "Next" MUST be translated.
3. "Los Angeles, CA" stays as-is (place name).
4. "William \"B.A.\" Washington" stays as-is (person's name).
5. "Spotify", "YouTube", "TikTok", "Chartmetric", "GRAMMY" stay as-is (brand names).
6. "CM Score" stays as-is (product name).
7. Preserve interpolation variables like `{{streams}}`, `{{tracks}}`, `{{source}}`, `{{date}}`, `{{views}}` exactly.
8. Preserve HTML entities: &middot;, &mdash;, &reg;.
9. Keep emoji in the same positions.
10. Match the exact JSON structure.
