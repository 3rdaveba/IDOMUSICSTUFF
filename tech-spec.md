# Portfolio implementation notes

These notes describe the current repository. Package versions come from `app/package.json` and `app/package-lock.json`; older design proposals are not implementation evidence.

## Runtime

React and TypeScript render a static Vite application. `src/main.tsx` installs a HashRouter and HelmetProvider. `src/App.tsx` maps the home, project, film, and artist-work pages. Legacy `/work` and unmatched application routes recover to home. A missing project ID displays a localized message and a return action.

Project records live in `src/data/projects.ts`. Shared cards and `ProjectDetail.tsx` render the overview, DMAIC, timeline, tools, outcomes, and media. Cards are links; image/video launchers support keyboard activation. Media dialogs trap focus, close with Escape, and restore the opener. The case-study list in ProjectDetail still explicitly controls full DMAIC labels and media-caption behavior.

`src/i18n.ts` loads locale JSON through i18next and persists language choice. Language changes update document language. New case-study resources can provide their own localized guide while labeling English-only recordings/app interfaces.

## Presentation

The existing visual identity uses editorial typography, warm neutral surfaces, amber accents, GSAP animations, Three.js particles, and Lenis scrolling. `vite.config.ts` separates Three.js and GSAP into vendor chunks. Lenis registers and removes its GSAP ticker callback during lifecycle cleanup. Custom styling and shared UI library components coexist; the site is not entirely custom-built from scratch.

The UI component library intentionally exports a small, named set of variant helpers/context hooks alongside components. ESLint's Fast Refresh rule allows those named exports in that directory only. Core correctness rules remain enabled. These exceptions affect development refresh behavior, not a claim of production quality.

## Content and external services

Film, discography, artist, and certification data have separate modules. Streaming metrics are stored editorial snapshots, not live API connections. The contact form posts via fetch to Formspree, displays success/error states, preserves a failed draft for retry in component memory, and disables sending while a request is pending. The site can request third-party fonts/map assets and link to external media. No message is sent by the test suite.

## Validation and release

`npm run check` runs lint, content validation, content unit tests, the TypeScript/Vite build, and Chromium browser checks. Browser tests use an owned local preview server and mock contact responses. Content tests include negative cases and checks that candidate-generating scripts do not replace reviewed/runtime translations.

`.github/workflows/check.yml` proposes the same validation for pull requests without publication. `.github/workflows/static.yml` runs the checks before the existing GitHub Pages upload/deploy. These workflow changes require review and a subsequent hosted run before CI success can be claimed.

Current coverage is a selected regression suite. It is not an exhaustive accessibility, security, visual, cross-browser, or performance audit. The build's chunk-size advisory remains a follow-up measurement opportunity, not proof of a slow site. Publication still requires owner approval.
