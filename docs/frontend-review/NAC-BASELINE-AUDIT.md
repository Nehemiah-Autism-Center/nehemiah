# NAC Baseline Audit

State of `origin/frontend-update` at **`6983de3`** ("Update volunteer page input") before any change in this PR.

**Method.** Source review of every frontend file, plus running `tsc`, ESLint, Vitest, Prettier and `next build`. The old UI was **not** exercised in a browser (it could not build until tooling was repaired), so statements about its accessibility and layout come from code inspection and are marked *(code)*. Everything about the new UI is measured; see `NAC-TEST-RESULTS.md`.

## 1. Stack and structure

Next 15.5 · React 19 · Tailwind v4 · shadcn/Radix · Zustand · TanStack Query · Vitest · Playwright. Every dependency is `latest` (the lockfile pins them). No i18n library. No unit tests existed (`tests/unit/` empty); one Playwright spec (`auth.spec.ts`).

`CLAUDE.md` describes `src/components/…`, but the code uses `src/shared/components/…`; the rest of the layout (`features/<name>`, `store/`, `providers/`) matches. Left as is.

## 2. Tooling baseline

| Check | Baseline result | Cause | Fixed |
|---|---|---|---|
| `tsc --noEmit` | **3 errors** | counter `value: "300+"` typed `number`; `SITE_CONFIG.social.tiktok` read but never defined (×2) | yes (code rewritten) |
| `next lint` | **cannot run** | `latest` resolved ESLint 10; `next lint` still passes removed options; `.eslintrc.json` no longer read | flat config, `pnpm lint` = `eslint .` |
| `vitest run` | **crashes** | `jsdom` configured but not installed; Vitest also collected the Playwright spec | dependency + include/exclude |
| `prettier --check .` | **129 files** reported | formatting never applied. Measured on the committed (LF) content, **71 of 127** TS/TSX/CSS/JSON source files differ from Prettier's output; the remainder of the 129 are Windows CRLF checkouts (`core.autocrlf=true`) and non-source files such as the lockfile | all source formatted; `.prettierignore` added for the lockfile and build output (NAC-014) |
| `next build` | **fails** | the `tsc` error above, then the ESLint error | passes |
| Playwright config | port mismatch | `baseURL`/`webServer` expect 3000, `pnpm dev` serves 3001 | aligned to 3001 |

Environment-only problems (not repo defects, recorded so reviewers are not surprised): a checkout path containing an apostrophe breaks Next's metadata-route loader; Windows without Developer Mode cannot create the symlinks `output: 'standalone'` needs.

## 3. Page inventory

| Route (old) | Finding |
|---|---|
| `/` | Autoplay slider, count-up counters, parallax, video CTA to an unvetted YouTube clip, fake fundraiser "$6,000 of $10,000 (60%)", named staff, sponsor row (two logo files missing) |
| `/about` | 12-entry history with donors, bank, ministries and a 5 M birr gift; named founder; FAQ pointing donors to a "CBE account"; none of it in the content document |
| `/volunteer` | 14-field form whose `onSubmit` is `// TODO` + 800 ms delay + green "Application Submitted!"; unapproved "Volunteer Agreement" text; two `<h1>` |
| `/contact` | Form `onSubmit` is `reset()` — message silently discarded, no feedback; map embed correct |
| `/donate` | Amount/name/email form that resets and does nothing |
| `/events`, `/events/[slug]` | Three events with invented dates and venues (Meskel Square, AAU Main Hall) |
| `/blog`, `/blog/[slug]` | Four posts with unsourced statistics (600,000 children, 1,000 waiting) |
| `/gallery`, `/gallery/masonry` | Made-up categories; every `alt=" "`; clickable `div` tiles; custom lightbox without dialog semantics; scroll parallax |
| `/team`, `/team/[slug]`, `/success-stories` | Named staff; **three named children with clinical histories, no consent record** |
| `/coming-soon` | Countdown to 2026-06-01 (already past), "Notify Me" form that only calls `preventDefault()` |
| `/login`, `/register`, `/dashboard` | Placeholder text ("Login form goes here"); not linked from the site |

Header/footer *(code)*: Google Translate widget as the language switcher (machine translation, third-party script and cookies for every visitor); dropdowns and the language menu open on mouse hover only; top-bar links "Email / Community / Support" and four footer groups point to `#`; TikTok link `undefined`; YouTube `#`; phone `+251 118 963640` and hours `08:00–17:00` not in the document; footer "© 2024"; "founded in 2011" not in the document.

## 4. Defects by theme

**Content correctness.** Occupational Therapy listed as a principal service in the About text, FAQ and homepage services list while the Food Therapy card also existed; two services (Parent Training, Daily Meal Support "38 children") not in the document; counters 300+/500+ children/families versus the document's 90 current / 65+ graduated.

**Honest functionality.** Three forms (contact, volunteer, donation) discarded input and two displayed fake success. No backend endpoint exists for contact, volunteer or donations on `frontend-update`, `dev`, `feature/backend` or `feature/backend2` (only `users` and `system` controllers).

**Accessibility** *(code; contrast measured by script)*. No skip link; two `<h1>` per page on several routes; hero autoplay with no pause (WCAG 2.2.2); count-up and scroll-triggered fades with no reduced-motion handling and content hidden at `opacity: 0` until scrolled into view; page-title used as `alt` on decorative banners; placeholder-space `alt`; gallery lightbox not a dialog (no focus trap, unlabeled buttons); hover-only menus. Contrast: secondary text 4.11:1 and 3.84:1 (needs 4.5); input border 1.33:1 (needs 3:1).

**Cascade bug.** Global unlayered `h1…h6 { color }` beats Tailwind's layered `text-white`, which would render the old footer and banner headings dark-on-dark.

**Media.** `public/images` was **174 MB**: raw camera originals (3–14 MB, up to 6720 px, with camera/GPS metadata), generic template stock photos (an Eiffel Tower on the About section, waves, train yards), staff portraits. `gallery_19.jpg` and `gallery_3.jpg` are referenced in lowercase but stored as `.JPG` — works on Windows, **404s on the Linux Docker image**.

**Privacy.** Third-party Google Translate script and cookies on every page; named children's developmental histories published.

**Technical debt left alone (out of scope).** Unused `Navbar`/`Footer`/`Sidebar` scaffold components, Zustand `ui.store`, dark-theme provider with no dark styles, dependencies that are now unused (`framer-motion`, `embla-carousel-*`, `react-countup`, `react-countdown`, `react-intersection-observer`), `latest` version specifiers, `next lint` mentioned in `CLAUDE.md`.
