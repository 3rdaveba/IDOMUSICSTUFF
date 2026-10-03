# IDOMUSICSTUFF portfolio

William B.A. Washington's portfolio combines creative work and software case studies in a shared presentation. React and TypeScript render project data, i18next supplies English, Spanish, and Danish copy, and Vite builds the static site. GSAP, Three.js, and Lenis provide motion and presentation effects.

## Develop and verify

Use Node.js 24 LTS. From this directory:

```sh
npm ci --legacy-peer-deps
npx playwright install chromium
npm run dev
```

`npm run dev` starts Vite on port 3000. Routes use a hash: `http://localhost:3000/#/project/ledger`. The Projects navigation item scrolls to the home page's `work` section. `/work` and unknown application routes recover to the home page; unknown project IDs have a return button.

Before requesting review:

```sh
npm run check
```

This runs lint, locale/media checks, content unit tests, a production build, and Chromium browser tests. The browser suite starts its own preview on `127.0.0.1:4174`; keep that port available. Contact requests are intercepted and mocked. Tests never send contact messages. On Linux CI, install the browser with `npx playwright install --with-deps chromium`.

Individual commands:

- `npm run lint`: static code checks.
- `npm run check:content`: locale structure/interpolation, reviewed/runtime parity, project array lengths, unique IDs, and local media existence.
- `npm run test:content`: negative cases for locale validation and candidate tools that must preserve reviewed files.
- `npm run build`: TypeScript and Vite production build into `dist`.
- `npm run test:browser`: navigation, selected three-language project copy, keyboard/media focus, mobile layout, and mocked contact states against the build.
- `npm run preview -- --host 127.0.0.1`: inspect the built site locally.

The checks cover selected workflows, not every browser, external service, accessibility criterion, or performance metric. A successful build alone is not sufficient validation. Vite may report a bundle-size advisory; that is not a measured load-time result.

## Repository map

- `src/data/projects.ts`: project records, DMAIC, timelines, tools, outcomes, and media references.
- `src/data/films.ts`, `discography.ts`, and `artist-*.ts`: other content domains.
- `src/pages` and `src/sections`: shared page and section implementations.
- `src/i18n.ts`: language loading, persistence, and document-language metadata.
- `public/locales/{en,es,da}/translation.json`: runtime translations.
- `translations/source/en.json` and `translations/final/{es,da}.json`: reviewed editing copies.
- `public/{prima,knwn,ledger,portfolio}`: case-study media and standalone guides.
- `tests`: executable content and browser checks.
- `../.github/workflows/check.yml`: validation on pull requests or manual dispatch, without deployment.
- `../.github/workflows/static.yml`: validation and deployment to GitHub Pages on approved pushes to `main` or manual dispatch.

## Publication

Prepare and verify a local draft, then obtain the owner's approval before pushing publication changes. Inspect the exact diff and stage only intended files. Preserve unrelated local work.

The existing Pages workflow installs dependencies, checks code and content, builds, runs browser tests, and only then uploads `app/dist` and deploys. After an approved release, verify the deployment result, live page, translations, and media, then synchronize the other local checkout. Do not change DNS or Pages configuration for routine content updates.

The proposed validation steps must themselves be exercised in GitHub Actions after review; local success does not prove a hosted CI run has passed.

## External services and data

The contact form posts to the configured Formspree endpoint. Fonts, map data, and outbound media links can involve external services; this portfolio is not an offline application. Ledger's standalone file has a separate offline design. Do not enter real contact details while testing a submission.

Streaming/airplay figures are editorial data stored in the repository, not a live analytics connection. Update their source and as-of date only with evidence. Do not treat third-party metrics as portfolio conversion measurements.

See [Site maintenance](SITE_MAINTENANCE.md), [Translation workflow](translations/README.md), and [Implementation notes](../tech-spec.md).
