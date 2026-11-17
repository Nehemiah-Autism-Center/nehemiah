# NAC Implementation Report

What was built, the decisions behind it, and what was removed. Test evidence is in `NAC-TEST-RESULTS.md`; open questions are in the approval register and issues log.

## 1. Result

A complete bilingual (English/Amharic) frontend on `feature/nac-complete-frontend`, based on `origin/frontend-update` (`6983de3`): 12 pages × 2 languages, 33 statically generated routes, no backend or infrastructure change. Everything shown comes from `website content.docx`; where the document is silent the site says so instead of inventing.

| | Before | After |
|---|---|---|
| `tsc` / lint / unit tests / build | 3 errors / cannot run / crashes / fails | 0 / 0 / 144 pass / passes |
| `frontend/public` | 174 MB, metadata-bearing originals, stock photos | 3.6 MB, metadata stripped |
| Languages | Google Translate widget | real `/en` and `/am` pages |
| axe WCAG A/AA violations | not measurable (build failed) | 0 |
| Page-load JS (shared) | — | 102 kB; pages 111–165 kB (contact carries the form libraries) |

## 2. Pages

Home (hero · introduction · services · impact · upcoming event · testimonials · blog preview · gallery preview · location · closing call to action) · About · Services · Events + event detail · Blog + Buhe 2026 post · Gallery (13 categories, filter, lightbox) · Volunteer · FAQ · Contact (details, social, map, form) · Donate · localized 404/error · `sitemap.xml`, `robots.txt`.

The homepage has one primary action ("Support Nehemiah"), one secondary ("Learn More"), and the document's other four buttons placed where they belong (What We Do → services, Our Impact → `#impact`, Volunteer With Us and Partner With Us → closing call to action).

Hero text: the approved heading is shown in two sizes (split at its em dash, words unchanged). The two approved paragraphs are presented **invitation first, beside the buttons, with the descriptive paragraph below** — order only — so the primary action stays on screen: verified visible without scrolling on 1440×900, 1280×720, 1024×768, 768×1024, 390×844 and 320×700 in both languages.

## 3. Architecture decisions

| Decision | Why | Alternative rejected |
|---|---|---|
| Custom locale-prefixed i18n, no library | per-string provenance + `lang` fallbacks; ~450 lines; static | `next-intl` (adds a dependency, no provenance model) — report §1 |
| Two root layouts: `[locale]` (site) and `(app)` (scaffold) | `<html lang>` must be per-route and server-rendered; scaffold URLs unchanged | one root layout with a client-side `lang` fix (wrong on first paint) |
| Single content modules (`shared/content`) | one place per fact; the three services cannot drift | per-page copies |
| Server components by default; client only for header, form, gallery | smaller JS, static pages | — |
| Radix primitives for menu, lightbox, accordion | focus trap, Escape, `aria-*` for free | custom widgets (the old lightbox) |
| Static numbers, no motion | calm for autistic visitors; WCAG 2.2.2 | count-up, slider, parallax |
| Contact form → visitor's email app | only honest option without a backend | pretend success |
| Media registry + `media:optimize` script | final photos drop in later; no metadata leaks | ad-hoc `/images/…` strings |

## 4. Design and accessibility

Identity kept: teal `#1A7A6D`, navy footer, warm gold accent, Trirong headings with Open Sans. Changed only where needed for usability or consistency.

**Contrast, measured** (WCAG 2.x; script in review notes):

| Pair | Before | After |
|---|---|---|
| Secondary text on page / on light panel | 4.11 / 3.84 ✗ | 5.91 / 5.52 ✓ |
| Form input border on white | 1.33 ✗ (needs 3) | 3.51 ✓ |
| Error text on white | 4.74 | 6.12 |
| White on impact tile | 4.31 ✗ (found by axe) | 7.12 ✓ |
| White on primary / primary-hover | 5.20 / 6.92 | unchanged ✓ |
| Footer text on navy | 12.92 | unchanged ✓ |
| Footer links/icons (new light teal) on navy | 3.29 (old teal) | 8.88 ✓ |

Accessibility improvements: skip link; landmarks (`header`, labelled `nav`s, `main`, `footer`); one `<h1>` per page and unbroken heading outlines; visible 3 px focus ring (white on dark); 44 px tap targets; no hover-only menus; localized and labelled controls; descriptive `alt` or `alt=""` for decorative images; `aria-current`; `lang` on every fallback; labelled form fields with `aria-invalid`/`aria-describedby` and announced errors; dialogs with focus trap and focus return; reduced-motion support; no auto-play, carousels, flashing, parallax or scroll-triggered motion; text 16 px+, line-height 1.75 (Amharic 1.85), readable measure (`max-w-prose`).

## 5. Removed, and why

| Removed | Reason |
|---|---|
| Hero slider, count-up counters, parallax, scroll fades, video CTA | unexpected motion; WCAG 2.2.2; unvetted YouTube embed |
| Google Translate integration | machine translation + third-party script and cookies |
| Team, success-story, history timeline, sponsor, fundraiser, extra-service sections | not in the document; child privacy; invented figures (RM-01…RM-10) |
| Volunteer form, donation form, `/coming-soon` | never reached a server; two showed fake success |
| 69 files from `public/` | stock photos, raw originals, staff portraits (media manifest) |

All recoverable from `6983de3`. Routes that existed redirect (`/team`, `/success-stories`, `/gallery/masonry`) or 404 (`/coming-soon`).

## 6. Backend dependencies (none implemented, by instruction)

1. **Contact delivery** — an endpoint (or mail service) to replace the `mailto:` fallback in `features/contact` (`submit` would become one call; the form, schema and status text are ready).
2. **Volunteer sign-up** — optional, as above.
3. **Online donations** — payment provider and legal/finance decisions; the Donate page is ready to be replaced.
4. **CMS for blog/events/testimonials** — content is typed data today (`features/*/data`); a CMS would feed the same shapes.
5. **Authentication** — `/login`, `/register`, `/dashboard` remain placeholders.

## 7. Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, hreflang, sitemap, Open Graph |
| `NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS=true` | withhold unapproved testimonials |
| `NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC=true` | show English instead of unreviewed Amharic labels |
| `NEXT_STANDALONE=0` | local production build on Windows without symlink rights |
| `PLAYWRIGHT_BASE_URL` | run e2e against an existing server |

## 8. Dependencies

Added (dev only): `jsdom` (tests need it), `@axe-core/playwright` (WCAG checks), `sharp@0.34.5` (the version Next already locks; media script). No runtime dependency added or upgraded. Five runtime dependencies are now unused (NAC-025).
