# Generosity-inspired redesign — test results

Branch `experiment/generosity-visual-redesign`. Windows 11, Node 22, pnpm 10.32, Playwright 1.58 with Chromium. Browser tests ran against the **production build** (`NEXT_STANDALONE=0 pnpm build`, then `next start -p 3002`), not the dev server. The final numbers below are from the final code; the last source change (a shadow on the feature strip) was followed by a full re-run of every check.

## 1. Final results

| Check | Result |
|---|---|
| `tsc --noEmit` | **0 errors** |
| `eslint .` | **0 problems** |
| `prettier --check src tests` | **pass** |
| Unit and component tests (`vitest run`) | **144 passed, 0 failed** (9 files). No unit test file was edited |
| Production build (`NEXT_STANDALONE=0`) | **passed**, 33 static pages |
| Playwright (Chromium) on the production build | **274 passed, 0 failed**, 29 skipped |

The 29 skipped are the evidence-capture specs, which run only when `CAPTURE_EVIDENCE=1`. They were skipped on purpose: they write into `docs/frontend-review/evidence/` (PR #3's "before" images), which this experiment must not overwrite. The new screenshots were taken with a separate script into `evidence-generosity/`.

What the 274 browser tests cover (unchanged suite, run against the redesign): every page in English and Amharic at 320, 375, 390, 768, 1024 and 1440 px for horizontal overflow, broken images and console errors; axe-core (WCAG A and AA) on every page at two viewports plus the open mobile menu, lightbox, FAQ, error states and empty gallery; link crawl; keyboard and focus (skip link, visible focus, FAQ accordion, mobile-menu Escape and focus return); language routing and persistence; contact form validation and the honest `mailto` behaviour; "primary action visible without scrolling" at six screen sizes in both languages; reduced-motion and no auto-playing media.

## 2. Run history (nothing hidden)

| Run | Result | Why |
|---|---|---|
| 1 (first full run on the redesign) | 266 passed, **8 failed** | see below |
| 2 (after fixes) | 274 passed, 0 failed | |
| Final (after the last visual tweak) | 274 passed, 0 failed | |

The 8 failures in run 1:

| # | Test | Cause | Resolution |
|---|---|---|---|
| 1–6 | "tap targets in the header are at least 44px" (six viewports) | The work order specifies 28px social icons in a 40px bar, which cannot meet "every header control ≥ 44px" | Test rewritten (see §3). Also made the phone strip genuinely 44px tall |
| 7 | "contact links dial and email the document details" | `.first()` matched the phone-only link in the mobile strip, which is `display:none` from tablet width up | Test now looks for a *visible* tel link |
| 8 | "choosing English records the choice for the next visit" | Intermittent: see §4 | Test now polls for the cookie instead of reading it once |

## 3. Test changes (all three are in `tests/e2e/`)

No assertion was removed, and no unit or content-integrity test was touched. The three changes:

1. **`responsive.spec.ts` — header tap targets.** Before: every `a, button` in the header ≥ 44 × 44 px. Now: on phones (< 768px) every header control is still ≥ 44px; on larger screens the main navigation, the Support button and the menu button are still ≥ 44px; only the dense desktop utility bar (28px social squares, 24px inline contact links, 40px utility and language links) is held to **24px**, the WCAG 2.5.8 AA minimum, because that bar is specified at that size. **This is a deliberate relaxation, limited to those controls.**
2. **`links-and-interactions.spec.ts` — contact links.** `a[href="tel:…"]` became `a[href="tel:…"]:visible`. The intent (a visitor can see a dial link) is unchanged; a redesigned header legitimately contains a hidden duplicate first.
3. **`site.spec.ts` — language persistence.** The immediate cookie read became `expect.poll(…)`. Same condition, same expected value; see §4.

## 4. The intermittent cookie failure, investigated rather than assumed

After choosing English on `/am/about`, the test sometimes read `NEXT_LOCALE = am` from Playwright's cookie store right after the URL changed. Investigation:

- A real-browser script (20 runs) could not reproduce it; the test runner reproduced it intermittently (1 failure in 6 serial runs in one batch, 8 lagging reads in 30 in another).
- Instrumented runs showed that in failing runs the page's own `document.cookie` was already `NEXT_LOCALE=en` while Playwright's `context.cookies()` still returned `am`: a cookie written from the page (the language link's click handler) reaches the browser's cookie store a few milliseconds later.
- In a further 30 serial runs the store lagged 8 times but **converged to `en` every time, and the next visit to `/` redirected to `/en` in all 30**.

Conclusion: the user-visible behaviour is correct (the choice is remembered). The failure was reading the store too early. One of the 8 lagging samples also showed `am` from the page's own `document.cookie` at that instant, which I could not fully explain; the final state was correct in all 30 runs, so I treat it as an open curiosity, not a known defect. The language-switcher code and the middleware were not changed.

## 5. Not executed

- Docker image / `standalone` output (Windows without symlink rights); builds used `NEXT_STANDALONE=0`.
- Firefox, Safari / WebKit, real phones and tablets.
- Screen-reader sessions, and a manual pass with a keyboard-only user beyond the automated keyboard tests.
- Lighthouse, performance and load tests.
- Native-speaker review of Amharic.
- The deliberate-breakage "mutation" checks that PR #3 ran were not repeated for the new header rules.
- No CI run: the CI workflow is not part of this experiment, and nothing was pushed.

## 6. How to repeat

```powershell
cd C:\Users\naods\Documents\nac-generosity-wt\frontend
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm exec prettier --check src tests
pnpm exec vitest run
$env:NEXT_STANDALONE = "0"; pnpm build
pnpm exec next start -p 3002          # leave running, open a second terminal:
$env:PLAYWRIGHT_BASE_URL = "http://localhost:3002"; pnpm exec playwright test
```
