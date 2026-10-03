# Translation workflow

The app serves English, Danish, and Spanish from `public/locales/<language>/translation.json`. i18next loads the active language, uses English as a runtime fallback, and saves the chosen language in `localStorage` under `i18n-language`. The document's `lang` attribute follows the selected language.

## Reviewed files

Edit and keep these pairs identical:

- English: `translations/source/en.json` and `public/locales/en/translation.json`.
- Danish: `translations/final/da.json` and `public/locales/da/translation.json`.
- Spanish: `translations/final/es.json` and `public/locales/es/translation.json`.

Preserve keys, array order, and interpolation placeholders such as `{{name}}`. Translate new project prose, outcomes, captions, and resource labels. Identify English-only app interfaces and recordings explicitly. Names and code identifiers can remain unchanged.

## Optional candidate tools

From `app/`, scripts can be run with `node --import tsx scripts/<name>.ts`:

- `merge-translations.ts` compares existing Claude, Codex, and Gemini files under `translations/output/`. Agreement and similarity heuristics select candidates; unresolved cases are logged under `translations/disputes/`.
- `patch-gaps.ts` proposes gap-fill patches.
- `merge-qc.ts` proposes quality-check merges.
- `apply-resolutions.ts` proposes reviewed dispute resolutions.

All four write **candidate files under `translations/candidates/`**, leaving `translations/final/` and `public/locales/` untouched. Candidate output can contain English fallback, stale suggestions, or questionable wording. It is not approved text. Do not copy a whole candidate over reviewed content without comparing the diff. The historical model outputs do not include every recent project.

The translation and instruction files are tools and records, not evidence of native-speaker approval. `translate-gaps.ts` can contact an external translation service if deliberately run; the normal validation and release commands do not run it or invoke any model CLI.

## Apply a reviewed update

1. Review candidate differences against current English source and current final files.
2. Apply only the accepted edits to the reviewed file and its runtime mirror.
3. Run `npm run check:content` and `npm run test:content`.
4. Run `npm run check`, then inspect the affected pages and guides in all three languages.
5. Include the translated copy and results in the publication review.

The validator checks complete key/array structure, nonempty strings, interpolation placeholders, reviewed/runtime parity, project arrays, and local media. Tests exercise missing array entries, malformed placeholders, unsafe keys, conflicting paths, and candidate tools overwriting approved files. Automated checks cannot determine linguistic quality or replace human review.
