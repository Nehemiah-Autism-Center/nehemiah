# Generosity-inspired redesign — visual review

Reviewed by looking at real-browser screenshots (Chromium, production build served on port 3002). Screenshots are in `docs/frontend-review/evidence-generosity/`; the "before" images are the 29 captures in `docs/frontend-review/evidence/`.

## 1. How to read the fidelity claims

The template's files were not supplied, so this review checks the build against the **written specification** in the work order. It cannot, and does not, claim a pixel-perfect or percentage match to the real template. "Matches the spec" below means the described element exists, is laid out as described, and uses the specified colours, type and geometry, as far as I could verify by eye and by measurement.

## 2. Fidelity checklist (in the work order's priority order)

| # | Spec item | Result | Notes |
|---|---|---|---|
| 1 | Header and navigation | **Implemented** | Three levels: charcoal 40px bar with six 28px white square social icons left and Email · Contact · FAQ + language right; white row with logo and three info blocks (contact, address, hours) with green icons, small-caps labels and thin dividers; charcoal 60px nav with uppercase links, full-height solid green active tab and green "Support Nehemiah" button. Phones keep dark / white / dark: phone number and language, logo, "Menu" bar |
| 2 | Homepage hero | **Implemented** | Full-width photo, 70% black overlay, 640px tall on desktop, left-aligned 60px Open Sans 800 uppercase heading with the name in green, 24px supporting text, green and white rectangular buttons, static |
| 3 | Palette | **Implemented, with contrast adjustments** | All specified colours used. Documented exceptions: near-black text on green, darker green for green text on white, `#6B6B6B` for muted text (see design-gap report §4) |
| 4 | Typography | **Implemented** | Open Sans, Trirong, Noto Sans Ethiopic. Hero uppercase and spacing are not applied to Amharic |
| 5 | Section layout | **Implemented** | Intro two-column; three-card feature strip with green centre card overlapping the hero; services; dark impact band; events; testimonials; blog; gallery grid; location; dark closing CTA |
| 6 | Buttons | **Implemented** | 5px radius, uppercase, 44px high; green primary, white and outlined variants |
| 7 | Cards | **Implemented** | Square-ish (5px), hairline border, minimal shadow; green flags, icon discs and quote squares |
| 8 | Banners | **Implemented** | Dark photographic, centred title, green divider, breadcrumbs, 80px padding on desktop |
| 9 | Footer | **Implemented** | Near-black, four columns, green heading dividers, separate darker copyright bar |
| 10 | Decorative details | **Partly** | Offset green block behind photographs, green dividers, hover overlay with plus on gallery tiles. No patterns, shapes or animation were added |

## 3. Section-by-section impressions

- **Header / hero (1440, 1280, 1024)**: the strongest match to the described layout. The active tab and the language switcher's active language both read as green tabs in the charcoal bar. The hero heading wraps to two lines and the green name reads clearly against the darkened photograph.
- **Phones (390, 375, 320)**: the primary hero button is above the fold in English and Amharic at 320 × 700, 390 × 844 and the larger test sizes (checked by the browser tests at every size), and I confirmed by eye that both buttons are visible in the English 390 × 844 and Amharic 320 × 700 screenshots. The menu is a charcoal sheet with the same hierarchy; the language switcher stays in the top strip, outside the menu.
- **Services**: three even cards with a green top rule and icon disc; titles are vertically centred so descriptions line up.
- **Impact**: bright-green cards with near-black numerals over a dark photographic band; reads strongly and passes contrast (7.1 : 1).
- **Events / blog**: a lone card spans the container with the photo beside the text; several cards would share a three-column grid.
- **Gallery**: square tiles, rectangular filter chips, lightbox and focus return unchanged.
- **Footer**: balanced four columns; the email address no longer breaks mid-word.

## 4. Defects found by looking, and fixed

| # | Defect | Fix |
|---|---|---|
| 1 | Header hours: "Saturday" row on one line, "Monday – Friday" wrapped onto two | Rows kept on one line; address column narrowed |
| 2 | Introduction photograph centred against a tall text column, leaving a large blank above it | Top-aligned and given a taller crop on desktop |
| 3 | Service-card descriptions started at different heights when one title wrapped | Titles share a minimum height and are centred |
| 4 | Footer email broke as "…yahoo.co / m"; social icons wrapped to two rows | Footer column proportions rebalanced; icons 40px on desktop |
| 5 | Feature-strip white cards had no visible edge on a white page at tablet width | Soft shadow from tablet width up |
| 6 | Footer tagline had been dropped by the first rewrite | Restored (caught by an existing unit test, which was not changed) |

## 5. Known remaining observations (not fixed)

- Single-word section headings ("Testimonials", "Volunteer") have no green last word, because there is no second word to highlight.
- Between 768 and 1023px the white brand row shows only the logo and name, leaving empty space on the right; the info blocks appear from 1024px.
- Below 420px the green Support button is not in the nav bar (it is the first button in the hero and in the menu), to keep the bar from overflowing at 320px.
- The Google Maps iframe (Contact page and homepage location section) is lazy-loaded, so a quick screenshot shows an empty frame. Verified in the second pass: with an 8-second wait it renders fully, and `contact-form-errors-1440.jpg` shows it rendered.
- Alt text, Amharic wording and photographs are unchanged from PR #3: demonstration photographs, provisional Amharic labels, no native-speaker review.
- Looks were judged by me on screen, not by a designer or in a usability session.

## 6. Screenshot index

`docs/frontend-review/evidence-generosity/`

- Home folds, English and Amharic, at 1440, 1024, 768, 390, 375 and 320 px: `home-{en,am}-{width}-fold.jpg`
- Home full pages: `home-{en,am}-1440-full.jpg`, `home-{en,am}-390-full.jpg`
- English pages at 1440: `about`, `services`, `events`, `blog`, `gallery`, `volunteer`, `faq`, `contact`, `donate` (`{name}-en-1440-full.jpg`)
- Amharic: `about-am-1440-full.jpg`, `contact-am-1440-full.jpg`
- Phones: `contact-en-375-full.jpg`, `gallery-en-375-full.jpg`, `mobile-menu-en-375.jpg`, `mobile-menu-am-375.jpg`
- States: `gallery-lightbox-1440.jpg`, `contact-form-errors-1440.jpg`, `not-found-en-1440.jpg`
- Second pass (regenerated or new): `home-{en,am}-1440-full.jpg`, `home-{en,am}-390-full.jpg`, `faq-en-1440-full.jpg`, `home-gallery-{en,am}-1440.jpg`, `home-gallery-en-375.jpg`

## 7. Second review pass

A later session re-reviewed the build in a real browser against the written spec instead of relying on the first pass's notes. What it looked at, and what it did not:

**Looked at with my own eyes (production build, Chromium):**

- English homepage at 1440, all ten screens from header to copyright bar, plus the new gallery section afterwards.
- English homepage first screen at 320, 375, 390, 768 and 1024; Amharic first screen at 1440, 375 and 320.
- English pages at 1440: About, Services, Events, Gallery, Contact, Donate, FAQ (before and after the accent change) and Volunteer; the mobile menu; the homepage gallery at 1440 (English and Amharic), 768 and 375.

**Covered only by the automated checks in this pass** (every page in both languages at 320, 375, 390, 768, 1024 and 1440: no horizontal overflow, no broken images, no console errors, axe WCAG A/AA, plus the tap-target, keyboard and focus tests): Blog and the detail pages, Amharic secondary pages, and phone-width secondary pages. The first pass's screenshots exist for several of these but were not re-viewed.

**What the review found**

| # | Finding | Action |
|---|---|---|
| 1 | Homepage gallery was a three-column link grid of six photographs with no category controls; the spec (§15) asks for category controls and about four images per row | Fixed: the gallery browser in `preview` mode (centred filter limited to categories that have photographs, four columns, eight photographs, same lightbox) |
| 2 | FAQ accordion had no green accent (spec §20) | Fixed: green divider, top rule and chevrons, open question in dark green |
| 3 | Footer link grouping differs from the spec's suggestion | Left: it follows the approved content document and a test asserts it. Documented (design-gap §6) |
| 4 | Closing CTA wraps its three buttons 1 + 2 | Left: deliberate hierarchy (one green primary, two outlined). Documented |
| 5 | Map frame looked empty in screenshots | Not a defect: lazy-loaded, renders after a wait. Documented |

What matched the spec on sight: the three-level header with 40px charcoal bar, square social icons, white information row and 60px charcoal nav with a full-height green active tab and green Support button; the 640px photographic hero with 70% overlay, uppercase white headline with green words and two rectangular buttons; the feature strip overlapping the hero; Trirong headings with green word and divider; the dark photographic impact band with three symmetric green cards (no invented fourth); the event card showing "Date to be confirmed"; the dark four-column footer with separate copyright bar; the consistent banner on every page; Amharic with Ethiopic type, no forced capitals and sensible wrapping; phone layouts with no overflow.

Limits: still one reviewer, by eye, with no designer, no real visitors, no Firefox or Safari, and no pixel comparison against the real template (not available).
