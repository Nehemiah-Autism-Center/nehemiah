# NAC Test Results

Every figure below was produced by running the command shown, on the final code, on Windows 11 (Node 22.19, pnpm 10.32) in `C:\Users\naods\Documents\nac-frontend-wt\frontend`. Browser tests ran in **Chromium 145 (Playwright 1.58) against the production build** (`next build` + `next start`, port 3001). Nothing here was run on Linux, Firefox or Safari.

## Summary

| Check | Command | Baseline `6983de3` | Final |
|---|---|---|---|
| Type check | `pnpm typecheck` | **3 errors** | **0** |
| Lint | `pnpm lint` | **could not run** | **0 errors, 0 warnings** |
| Unit + component tests | `pnpm test` | **crashed** (no `jsdom`) | **144 passed, 0 failed** (9 files) |
| Production build | `NEXT_STANDALONE=0 pnpm build` | **failed** | **passed**, 33 static pages |
| Browser tests (e2e) | `pnpm test:e2e` | 2 specs, port mismatch | **274 passed, 0 failed** (29 evidence captures skipped unless `CAPTURE_EVIDENCE=1`) |
| Prettier | `pnpm format:check` | 129 reported (71 of 127 source files genuinely unformatted on committed content; see NAC-014) | **0 failing** (lockfile and build output now ignored); the 22 untouched legacy files that differed are in a separate formatting-only commit |

## Unit and component tests (Vitest + Testing Library, jsdom)

| File | Tests | What it proves |
|---|---|---|
| `i18n/routing.test.ts` | 15 | locale prefixing, query/hash handling, idempotence, switching, redirect decisions, scaffold exclusions |
| `i18n/localized.test.ts` | 10 | fallback to English, provisional switch, the six approved button labels verbatim, every proposed label flagged |
| `i18n/middleware.test.ts` | 7 | redirects; cookie only on real page requests; **prefetch/client navigation never change the language** (NAC-031) |
| `i18n/seo.test.ts` | 7 | sitemap (12 pages × 2 languages, alternates, no invented dates), robots, localized metadata |
| `content/content-integrity.test.ts` | 33 | Food Therapy third; no "Occupational" in either language; no fabricated facts/names/figures; real contact details; social links https with no tracking; nav targets exist; every media file exists, ≤ 500 KB, no EXIF, declared size correct; 13 gallery categories; 5 FAQ; 5 roles; event has no date; 6 testimonials withholdable |
| `layout/site-chrome.test.tsx` | 20 | header/footer/switcher in both languages, `aria-current`, mobile menu dialog, cookie on click |
| `pages/pages.test.tsx` | 30 | every page's content, heading outlines, honest donate/volunteer pages, no month names on the event, fallback `lang="en"` tagging |
| `contact/contact.test.tsx` | 15 | schema, mailto encoding (incl. Amharic), validation errors announced, "not sent" status, long-message guard, topic pre-fill |
| `gallery/gallery.test.tsx` | 7 | 13 categories + counts, filter, honest empty state, lightbox keyboard, **focus returns to opener** |

**Mutation checks** (rule deliberately broken, tests must fail, then restored): reintroducing Occupational Therapy failed exactly the 2 relevant tests; reintroducing the prefetch cookie bug failed exactly the 2 regression tests.

## Browser tests (Playwright, 274)

| Spec | Tests | Covers |
|---|---|---|
| `site.spec.ts` | 47 | all 12 pages × 2 languages (200, one `<h1>`, `lang`, title, landmarks); root and unprefixed redirects; language persistence and the prefetch regression; retired routes; localized 404; `/coming-soon` gone, `/login` intact and `noindex`; metadata/hreflang/Open Graph; **primary action visible without scrolling at 6 screen sizes × 2 languages** |
| `links-and-interactions.spec.ts` | 15 | link crawl of all pages (no empty/`#` link; every internal link resolves; external links https + `noopener`); skip link; visible focus; FAQ keyboard; gallery filter and lightbox (focus trap, Escape); contact form; mobile menu; no auto-play/carousels; reduced motion |
| `responsive.spec.ts` | 156 | **320, 375, 390, 768, 1024, 1440 px** × 12 pages × 2 languages: no horizontal overflow, every image loaded, no console errors; navigation reachable; every header control ≥ 44 px |
| `accessibility.spec.ts` | 54 | **axe-core (WCAG 2.0/2.1/2.2 A and AA + best-practice): 0 violations** on 12 pages × 2 languages at 1440 and 375 px, plus open mobile menu (EN/AM), open lightbox, expanded FAQ, form with errors, empty gallery category |
| `auth.spec.ts` | 2 | pre-existing (title; `/login` heading) — unchanged and passing |

An earlier ad-hoc sweep (144 page loads, same matrix) also reported 0 issues; the committed `responsive.spec.ts` supersedes it.

## Issues the tests found (all fixed; see `NAC-ISSUES-AND-BUGS.md`)

axe: impact-tile contrast 4.3:1 and a count badge at 80 % opacity (NAC-017), blog heading order (NAC-021). Interaction: lightbox focus not restored (NAC-020), 20 px contact-link targets (NAC-022). Visual review: footer email/social wrapping (NAC-023). Measurement: primary action below the fold (NAC-032). Browser regression: **prefetch flipped the saved language** (NAC-031).

## Build

`next build`: compiled, type-checked, 33/33 static pages. First-load JS: 102 kB shared; pages 111 kB; FAQ 127 kB; gallery 138 kB; contact 165 kB (form libraries); middleware 34.5 kB. `frontend/public`: 3.6 MB (was 174 MB).

## Visual evidence

29 JPEGs in [`evidence/`](evidence) (6.2 MB, outside `frontend/`, not shipped): all pages at 1440 px (English; Amharic for home, About, Contact, Donate and 404), home at 1024/768/375/320, Contact/Gallery at 375, the mobile menu in both languages, the lightbox, an empty gallery category, form validation. Regenerate: `CAPTURE_EVIDENCE=1 PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm exec playwright test evidence`.

## Not executed — and why

| Not run | Reason |
|---|---|
| Docker image build / `output: 'standalone'` | Windows without symlink rights (`EPERM`); a Linux CI run is needed (NAC-030) |
| Firefox, Safari / WebKit, real phones | only Chromium was run; viewports are emulated |
| Screen-reader sessions (NVDA, VoiceOver, TalkBack) | automated axe and keyboard tests only; a human pass is still recommended |
| Native Amharic review of text and layout | no Amharic reader available (NAC-026) |
| Lighthouse / Core Web Vitals, load testing | not requested; bundle sizes above are the only performance data |
| Production deployment, backend integration | prohibited by the work order |
| LinkedIn / X visual confirmation | bot protection (register CT-02) |

## Reproduce

```bash
cd frontend && pnpm install --frozen-lockfile
pnpm typecheck && pnpm lint && pnpm test
NEXT_STANDALONE=0 pnpm build && NEXT_STANDALONE=0 pnpm start -p 3001   # drop NEXT_STANDALONE on Linux
npx playwright install chromium
PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm test:e2e
```
