# Site maintenance

Use this guide from `app/`. Preserve the established presentation and keep content claims supported by source evidence. A new project or material change requires owner review before publication.

## Updating a project

1. Edit `src/data/projects.ts`. Use a unique stable ID, an accurate role, `active` or `complete` status, and DMAIC copy. Distinguish decisions, implementation, verified results, and planned work.
2. Place approved assets under `public/<project-id>/`. Use fictional data for demonstrations and exclude private source material. An interactive app download exposes its code, so include that explicitly in the review scope.
3. Keep images, videos, and resource links in the shared Media & Resources section. Project artwork should fit the actual product's visual style. Identify artwork separately from actual screenshots.
4. Update English in both `translations/source/en.json` and `public/locales/en/translation.json`. Update Spanish and Danish in both `translations/final/<language>.json` and `public/locales/<language>/translation.json`.
5. Under `data.projects.<id>`, supply title, role, description, DMAIC strings, timeline, tools, outcomes, and media labels/captions. Arrays must follow the source record's order and length. Proper names can remain unchanged; do not rely on English fallback for newly added prose.
6. Check whether `ProjectDetail.tsx`'s current explicit case-study list needs the new ID for full DMAIC labels and literal media captions. This is a current implementation detail, not a completely data-only publishing system.
7. Run `npm run check`. Inspect the local page in all three languages and a mobile viewport. Check media playback and the guide as well as the page text. No em dashes in new portfolio copy.
8. Prepare the copy, evidence, screenshots/recording, exact diff, limitations, and hosting implications for review. Do not claim visitor impact, accessibility compliance, or performance without the relevant measurement.

Existing older project records may use their proper title from the source and generic media labels. Current checks require full localized titles/media for Prima, KNWN, and Ledger, and structural parity for all projects. Expand that coverage when adding or revising an older project.

## Other content

| Content | Source |
| --- | --- |
| Film/TV records | `src/data/films.ts` |
| Discography and editorial streaming/airplay figures | `src/data/discography.ts` |
| Artist work/profile | `src/data/artist-work.ts`, `artist-profile.ts` |
| Certifications | `src/data/certifications.ts` |
| Displayed statistics | Their data source or section, including `src/sections/StatsSection.tsx` |
| Translated UI/content | `public/locales`, with reviewed mirrors under `translations` |

Validate dates and units when updating metrics. Do not extrapolate totals or copy a number from an old presentation as if newly measured. The README and technical notes describe implementation; `package.json` and the lockfile define dependency versions.

## Local preview and navigation

Run `npm run dev` or build and run `npm run preview`. Route examples are `/#/`, `/#/project/ledger`, `/#/film/<id>`, and `/#/artist-work`. The home page Projects section is not a separate content page. If an old tab does not show a newly built project, reload the document, not just its hash; a review query such as `?preview=current#/project/ledger` can force a fresh document load.

The browser regression suite serves its own build on port 4174. It checks keyboard project navigation, unknown-route recovery, selected translations and `html.lang`, media dialog focus and playback, mobile overflow, the language picker, and contact validation/failure/retry/success. Formspree responses are mocked. It does not certify actual email delivery or external provider uptime.

## Translation tooling

See [Translation workflow](translations/README.md). Candidate tools write into `translations/candidates/`; they must not overwrite reviewed or runtime copy. Inspect proposed output before applying changes. Content validation detects missing keys, structural differences, empty strings, interpolation changes, mirror drift, project-array mismatches, and missing local media. It cannot judge whether a fluent translation is semantically correct.

## Release and recovery

- Inspect `git status` and the complete diff. Preserve unrelated local edits.
- Run `npm run check` and review the local result.
- Obtain publication approval. Push only the approved scope.
- Follow `.github/workflows/static.yml` to completion. An upload or queued job is not a successful deployment.
- Verify the live route, three languages, and media. Compare published files against the approved build when appropriate.
- Synchronize other local checkouts using a fast-forward when possible. Do not discard user changes.
- If a published change requires rollback, prepare a scoped revert and verification plan; do not rewrite shared history or silently remove unrelated work.

Dependency updates should stay within compatible ranges where possible and be followed by the full check command. Review `npm audit` findings; a clean result is a point-in-time advisory check, not a security certification.
