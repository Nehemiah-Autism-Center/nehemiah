# Senior Developer Review Guide

Branch `feature/nac-complete-frontend` → draft PR into `frontend-update`. **Frontend only**: nothing under `backend/`, `shared/`, Docker, CI or deployment config changed (`git diff --stat origin/frontend-update... -- . ':!frontend' ':!docs'` is empty). Do not merge until the decisions in §3 are made.

## 1. Run it

```bash
cd frontend && pnpm install --frozen-lockfile
pnpm typecheck && pnpm lint && pnpm test          # tsc · eslint · vitest (unit + component)
pnpm build                                          # add NEXT_STANDALONE=0 on Windows without symlink rights
pnpm start -p 3001 &                                # production server
npx playwright install chromium                     # once
PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm test:e2e   # browser, responsive, axe
```

Dev server: `pnpm dev` (port 3001). Open `/` → redirects to `/en`; the language links switch to `/am`. Environment switches are listed in `frontend/.env.example`.

## 2. Review in this order (nine commits)

| # | Commit | Look for |
|---|---|---|
| 1 | `chore: repair lint, test and build tooling` | `eslint.config.mjs` (rules preserved; React-version pin with removal note), `vitest.config.ts`, `playwright.config.ts`, `next.config.ts` (redirects, `NEXT_STANDALONE`), new dev dependencies |
| 2 | `feat: replace raw template images…` | `public/` 174 MB → 3.6 MB; `scripts/optimize-media.mjs`; nothing referenced is missing (unit test) |
| 3 | `feat: add English/Amharic localization foundation and site shell` | `src/shared/i18n/*`, `src/middleware.ts`, `[locale]/layout.tsx`, `(app)/layout.tsx`, header/footer/shared components, `globals.css` |
| 4 | `feat: implement all pages…` | `features/*/data` (content), `features/*/components`, `app/[locale]/(public)/**` |
| 5 | `feat: add localized sitemap, robots.txt and release switches` | small; `.env.example` |
| 6 | `fix: resolve defects found by accessibility, browser and visual testing` | the middleware/cookie fix (NAC-031) deserves the closest read; also NAC-017, 020–023, 032 |
| 7 | `test: add unit, component, browser, accessibility and responsive tests` | `tests/unit`, `tests/e2e` |
| 8 | `style: apply Prettier to untouched legacy files` | formatting only — **safe to skip** while reviewing |
| 9 | `docs: add review reports and screenshot evidence` | `docs/frontend-review/` |

The scaffold pages were only **moved** (`git mv`, 100 % rename) into an `(app)` route group; their URLs and content are unchanged.

## 3. Architectural decisions that need your approval

1. **Custom i18n instead of `next-intl`** — rationale and migration path in `NAC-LOCALIZATION-REPORT.md` §1. The distinctive requirement is per-string provenance and `lang`-tagged English fallbacks.
2. **Two root layouts (`[locale]` and `(app)`)** and no top-level `app/layout.tsx`, so `<html lang>` is right on first paint. Consequence: a URL outside both (e.g. `/dashboard/x`) gets Next's default 404; everything under `/en` and `/am` gets the localized one.
3. **ESLint 10 stays, with `settings.react.version` pinned** rather than downgrading ESLint. Alternative: pin `eslint@^9`.
4. **`next build` skips its built-in lint** (`eslint.ignoreDuringBuilds`) because Next 15's step cannot run ESLint 10. `pnpm lint` is the gate; add it to CI (CI was removed on this branch point).
5. **Removal of existing features and 69 image files** — all listed with reasons in `NAC-IMPLEMENTATION-REPORT.md` §5 and recoverable from `6983de3`. Two are safeguarding-driven (named children; a bank account instruction).
6. **Contact form delivers via `mailto:`** until a backend exists.
7. **Dev dependencies added**: `jsdom`, `@axe-core/playwright`, `sharp@0.34.5` (already locked by Next).
8. **Unused runtime dependencies left in place** (NAC-025) — removal belongs in its own change.

## 4. Where the risk is

- **Middleware** (`src/middleware.ts`): matcher excludes `_next`, `api` and any path containing a dot. Locale cookie is refreshed only for non-router requests — see NAC-031; there are regression tests, do not simplify that condition.
- **Static generation**: `[locale]` has `dynamicParams = false`; unknown slugs under `events/[slug]` and `blog/[slug]` render the 404 via `notFound()`.
- **Fallback tagging**: every visible string should go through `LocalizedText`/`UiText` (or `text()` for attributes). A raw string in JSX bypasses `lang="en"`.
- **Content integrity tests** (`tests/unit/content`) encode the work-order rules (Food Therapy, no unsupported facts, media exist and have no EXIF, nav targets exist). If one fails, fix the content, not the test.
- **Not exercised**: Docker image and `output: 'standalone'` (Windows machine); production deployment; any real device or screen reader; a native Amharic reader (NAC-026, NAC-030).

## 5. What is deliberately absent

No payment or donation processing, no transaction storage, no fake success, no new backend endpoint, no deployment, no change to `dev` or any remote branch, no automatic copying from `dev`/`NAC-trial`.

## 6. Content questions are not code questions

The founder decisions (event date, address spelling, testimonials, photo permissions, Amharic review) are in `NAC-CONTENT-APPROVAL-REGISTER.md` and summarised for non-developers in `NAC-FOUNDER-HANDOFF.md`. Most resolve by editing one data file; the file for each is named in the register.
