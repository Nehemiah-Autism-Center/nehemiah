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
- The Contact page's Google Maps iframe can appear blank in a full-page screenshot (third-party embed and capture timing); it renders in the form-errors capture and in the browser.
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
