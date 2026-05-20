# Translation Workflow

This directory contains everything needed to translate the IDOMUSICSTUFF website into Danish and Spanish using local AI tools.

## Directory Structure

```
translations/
├── source/
│   └── en.json              # All English text extracted from the site
├── instructions/
│   ├── claude.md            # Instructions for Claude CLI
│   ├── codex.md             # Instructions for Codex
│   └── gemini.md            # Instructions for Gemini
├── output/
│   ├── da-claude.json       # Danish translation from Claude
│   ├── da-codex.json        # Danish translation from Codex
│   ├── da-gemini.json       # Danish translation from Gemini
│   ├── es-claude.json       # Spanish translation from Claude
│   ├── es-codex.json        # Spanish translation from Codex
│   └── es-gemini.json       # Spanish translation from Gemini
├── disputes/
│   ├── da-disputes.json     # Keys where models disagreed
│   ├── es-disputes.json     # Keys where models disagreed
│   ├── da-review-log.md     # Human-readable review log
│   └── es-review-log.md     # Human-readable review log
└── final/
    ├── da.json              # Single merged Danish translation
    └── es.json              # Single merged Spanish translation
```

## Step-by-Step Workflow

### 1. Run the AI tools

Each tool reads `source/en.json` and writes to `output/`.

```bash
# Claude CLI
claude -p "$(cat app/translations/instructions/claude.md)"

# Codex
codex -p "$(cat app/translations/instructions/codex.md)"

# Gemini
gemini -p "$(cat app/translations/instructions/gemini.md)"
```

After running all three, you should have 6 files in `output/`.

### 2. Run the merge script

```bash
npx tsx app/scripts/merge-translations.ts
```

This script:
- Compares all three translations for each key
- Uses consensus voting (2 of 3 agreement wins)
- Flags disputed keys where all three models differ
- Produces a single final JSON per language in `final/`
- Copies final files to `public/locales/` for the app to use
- Generates review logs in `disputes/` for optional human spot-checking

### 3. Review disputes (optional)

Check `disputes/da-review-log.md` and `disputes/es-review-log.md` to see where the models disagreed and which translation was selected. You can manually edit `final/da.json` or `final/es.json` if you disagree with any selections, then re-run:

```bash
# After manual edits, copy to public locales
cp app/translations/final/da.json app/public/locales/da/translation.json
cp app/translations/final/es.json app/public/locales/es/translation.json
```

### 4. Build and deploy

```bash
cd app
npm run build
# Deploy dist/ to GitHub Pages as usual
```

## Adding or Changing English Content

1. Update `app/translations/source/en.json` with the new/changed text.
2. Re-run the AI tools (Step 1).
3. Re-run the merge script (Step 2).
4. Build and deploy.

## Notes

- The `public/locales/` directory is what the app actually loads at runtime.
- `i18next-http-backend` lazy-loads only the active language, so Danish visitors don't download Spanish text.
- `i18next-browser-languagedetector` auto-detects the browser language on first visit and saves the preference to `localStorage`.
- The `output/` files are kept in the repo for transparency and reproducibility.
