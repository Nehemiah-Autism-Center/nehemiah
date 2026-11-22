# Generosity-inspired redesign — implementation

Branch `experiment/generosity-visual-redesign` (from `feature/nac-complete-frontend` @ `f92cb80`). Only `frontend/` and `docs/frontend-review/` changed. No backend, database, shared-types, Docker or CI file was touched. Nothing was pushed, merged or deployed.

## 1. Approach

The restyle goes through the design tokens first, then rebuilds the shell and homepage, then migrates the remaining pages. Behaviour, routing, i18n, content modules and test hooks were left alone; only presentation changed (plus the small structural changes listed in §6).

1. **Tokens** (`src/app/globals.css`): the palette is defined once as exact hex values in `@theme`. Existing token names were kept and re-pointed (`primary`, `secondary`, `foreground`, `border` …) so unmigrated markup follows automatically; new tokens were added: `green-ink`, `green-display`, `charcoal`, `charcoal-dark`, `nav-bg`, `footer-bg`, `footer-text`.
2. **Foundations**: `Container` (1140px), `Section` (tones default / muted / dark / green, 48 / 64 / 80px padding), `ButtonLink` (5px radius, uppercase, four variants), `SectionHeading` (serif, last word highlighted, short divider), new `PhotoSection`.
3. **Shell**: `SiteHeader`, `SiteFooter`, `PageBanner`, `LanguageSwitcher`, `SocialLinks`, `ContactDetails` (compact size option).
4. **Homepage**: `HeroSection`, new `FeatureStrip`, `ImpactStats`, `ClosingCtaSection`, `HomePage`.
5. **Cards and secondary pages**: `ServiceCards`, `EventCard`, `BlogCard`, `TestimonialsSection`, `GalleryBrowser`, and class migration on About, Services, Volunteer, FAQ, Contact, Donate, Events, Blog, error and 404 pages.

## 2. Palette and tokens

| Token | Value | Use |
|---|---|---|
| `primary` | `#80B53F` | Buttons, active tab, flags, card fills, divider, icons on dark |
| `primary-foreground` | `#1A1A1A` | Text on green (7.1 : 1) |
| `primary-hover` | `#74A936` | Hover on green (near-black text still ≥ 4.5 : 1) |
| `green-ink` | `#4A771D` | Green text on light backgrounds (5.3 : 1) |
| `green-display` | `#6E9B36` | Large headings and icons on light backgrounds (≥ 3.1 : 1) |
| `charcoal` / `nav-bg` / `topbar-bg` | `#333333` | Utility bar, navigation, outline buttons |
| `charcoal-dark` | `#2C2C2C` | Dark content sections (fallback under photographs) |
| `footer-bg` | `#1A1A1A` | Footer |
| `footer-text` | `#C2C2C2` | Footer and dark-section body text (9.8 : 1) |
| `secondary-bg` / `muted` | `#F8F9FA` / `#FAFAFA` | Alternating sections, cards |
| `foreground` / `heading` | `#555555` / `#333333` | Body / headings |
| `text-medium` | `#6B6B6B` | Supporting text (5.3 : 1; the spec's `#777` is 4.48 : 1) |
| `border` | `#EEEEEE` | Hairlines |
| `input` | `#8A8A8A` | Form-control edge (3.45 : 1, WCAG 1.4.11) |
| `ring` | `#4A771D` | Keyboard focus ring (white on dark surfaces, near-black on green via `.on-green`) |

Geometry: `--radius: 5px`; cards `rounded-[5px]`; photographs and gallery tiles square; shadows limited to `shadow-sm` and one soft shadow on the overlapping feature strip.

## 3. Typography

- Open Sans (weights 400–800 now loaded), Trirong (headings), Noto Sans Ethiopic (Amharic) are unchanged families.
- Hero heading: Open Sans 800, uppercase, `clamp(2.125rem, 1.4rem + 3.2vw, 3.75rem)` (34px on phones, 60px at ≥ 1100px), the organisation name in green. Supporting text 18 / 20 / 24px.
- Section headings: Trirong 600, 28px → 36px → 42px, last word in `green-display` (`primary` on dark), 56 × 3px green divider.
- Navigation: 14px, uppercase, `tracking-wider`.
- **Amharic**: `text-transform: uppercase` has no effect on Ethiopic, and the existing global rule keeps letter-spacing at `normal` for `:lang(am)`. Amharic headings get taller line-height (`[:lang(am)_&]:leading-[1.4]` on the hero).

## 4. Components

**Header (three levels, one structure at all widths).**

| Level | Desktop (≥ 1024px) | Phone / tablet |
|---|---|---|
| 1. Charcoal bar, 40px (44px on phones) | Six 28px white square social icons left; Email · Contact · FAQ and the language switcher right | Tap-to-call phone number left, language switcher right |
| 2. White row | 72px logo and name left; three info blocks right (contact, address, hours; hours from 1280px) with green icons, small-caps labels and thin dividers | Logo and name |
| 3. Charcoal bar, 60px | Uppercase links, full-height solid green active tab, green "Support Nehemiah" button | Visible "Menu" button (opens the existing Radix sheet, now charcoal) and, from 420px, the Support button |

The mobile sheet keeps the Radix focus trap, Escape and focus return. Its navigation, Support button, contact details and social links are unchanged apart from styling.

**Hero.** Full-width photograph (`MEDIA.heroPrimary`, decorative `alt=""`), 70% black overlay, 520 / 600 / 640px minimum height, top-aligned content so the primary button stays above the fold, approved headline unchanged (green highlight found by locating the organisation name inside it, so it works in both languages), `HERO.invitation` as supporting text, two rectangular buttons (green primary, white secondary). Static.

**Feature strip.** Three cards, centre green, overlapping the hero by 64px from 1024px: Volunteer With Us · Support Our Mission · Partner With Us. They reuse approved button labels and existing routes; no new copy.

**Homepage order.** Hero → feature strip → introduction (name, the hero continuation, intro, description, tagline; offset-green photo) → services (the three approved therapies) → impact (dark photographic band, bright-green cards for the three existing figures) → events → testimonials → blog → gallery (centred category filter and a four-column grid of eight photographs: the gallery browser in `preview` mode) → location → closing CTA (dark photographic).

**Footer.** Four columns (brand, mission sentence, tagline and social; Discover; Support + Connect; contact details), green dividers under headings, separate darker copyright bar.

**Page banners.** `PageBanner` is a dark photographic banner (75% black overlay) with a centred serif title, green divider and breadcrumbs. Every page uses a banner photograph from `PAGE_BANNERS`, which only reuses existing demonstration photographs.

**Cards.** Service cards (green top rule, green icon disc), event and blog cards (square image with green status flag, uppercase "Read more" with arrow; a lone card spans the container), testimonial cards (green quote square), impact cards.

## 5. Accessibility decisions

- Bright green is a surface colour carrying near-black text; green text on white uses `green-ink` / `green-display` (§ 2, and the table in the design-gap report).
- Overlay: white text over a pure-white photograph pixel, the worst case, still measures 8.45 : 1 under the 70% black hero overlay and 10.37 : 1 under the 75% overlay used on banners and dark bands (AA needs 4.5 : 1).
- Focus: a global 3px outline; white on `.on-dark`, near-black on `.on-green`.
- No motion was added. The existing reduced-motion block is untouched.
- Header target sizes: 44px on phones; on larger screens the nav links, Support button and menu button keep 44px, and only the dense desktop utility bar (28px social squares, 24px inline contact links, 40px utility and language links) drops to the WCAG 2.5.8 AA minimum of 24px. The test was updated to say exactly that (see test results).

## 6. Structural and content changes (beyond restyling)

| Change | Why |
|---|---|
| Hero text split: only the headline and invitation are in the hero; the continuation and intro moved to the introduction section | The spec asks for concise hero text and says the rest must be kept. Nothing was deleted; a unit test still finds all three passages |
| Utility link "FAQ" instead of "Support" | Support is already the green button |
| `Section` tone `brand` removed; `dark` and `green` added | The teal band no longer exists. Two callers (About, Closing CTA) were moved to `PhotoSection` |
| `SectionHeading` gained `highlight` (default on); `eyebrow` kept | Last-word highlight |
| `EventCard` / `BlogCard` gained a `horizontal` prop | A single card in a 1140px section |
| `GalleryBrowser` thumbnails get a green hover overlay with a plus icon | Template detail; the lightbox, filter and focus return are untouched |
| `GalleryBrowser` gained a `preview` prop; the homepage uses it instead of a hand-built link grid (second pass) | Spec §15 asks for category controls and about four images per row on the homepage. Preview mode shows only categories that really have photographs (3 of 13; the empty ones stay on `/gallery`), no counts, a centred filter, at most 8 tiles in 4 columns, and keeps the lightbox. The full-page behaviour is unchanged (the existing gallery tests still pass untouched) |
| `GALLERY_PREVIEW_IDS` 6 → 8 photographs (`mascot-cones`, `walk-crowd` added) | Two full rows of four. Existing demonstration photographs only |
| FAQ: green divider under each category heading, green top rule on the panel, green chevrons, open question in dark green (second pass) | Spec §20 asks for green accents. Done with `className` on the existing accordion, so the shadcn primitive is untouched. Contrast: chevron 3.3 : 1 (graphics need 3), open text 5.3 : 1 |
| New: `PhotoSection`, `FeatureStrip`, `PAGE_BANNERS` | Shared dark photographic band; feature strip; banner photographs |
| Footer tagline retained | A unit test caught that the first rewrite dropped it; restored, not the test |

## 7. Files

New: `PhotoSection.tsx`, `FeatureStrip.tsx`.
Rewritten: `globals.css`, `Container`, `Section`, `ButtonLink`, `SectionHeading`, `SocialLinks`, `LanguageSwitcher`, `SiteHeader`, `SiteFooter`, `PageBanner`, `HeroSection`, `ImpactStats`, `ClosingCtaSection`, `HomePage`, `ServiceCards`, `EventCard`, `BlogCard`, `TestimonialsSection`.
Edited: `fonts.ts`, `media.ts`, `ContactDetails`, About / Services / Volunteer / FAQ / Contact / Donate / Events / Event detail / Blog / Blog post / Gallery pages, `GalleryBrowser`, `ContactForm`, `LocationSection`, `BackToTop`, `error.tsx`, `not-found.tsx`, public `layout.tsx`.
Second pass edited: `HomePage.tsx`, `GalleryBrowser.tsx`, `gallery/data/index.ts`, `FaqPage.tsx`.
Tests edited: `tests/e2e/responsive.spec.ts`, `tests/e2e/site.spec.ts`, `tests/e2e/links-and-interactions.spec.ts` (each change explained in `NAC-GENEROSITY-TEST-RESULTS.md`).
Tests added (second pass): five unit tests for the gallery preview in `tests/unit/gallery/gallery.test.tsx`. No existing test was edited in the second pass.

## 8. Not done / limits

- The template's source was unavailable, so exact spacing, icon shapes and hover behaviour are interpretations of the written spec.
- The hero and banner photographs are the existing demonstration images (register MD-01 still applies; they include identifiable children).
- Amharic outside the document's own text is still English fallback or provisional, as in PR #3.
- The homepage now ships the interactive gallery (filter and lightbox), so its first-load JavaScript grew from 111 kB to 139 kB (+28 kB, mostly the dialog library). It could be lazy-loaded below the fold if page weight matters more than simplicity.
- The footer keeps the link groups from the approved content document (Discover / Support / Connect); it does not follow the spec's suggested grouping (see the design-gap report, §6).

## 9. Second pass: re-verification and gap closure

A first pass produced everything above. A second session did not trust that record: it re-ran type-check, lint, format, unit tests, a fresh production build and the full browser suite on the inherited code (all green, same numbers as reported), then reviewed the pages in a real browser against the written spec. That review found three spec gaps, closed in this pass: the homepage gallery (no category controls, three columns, six photographs), the FAQ (no green accent), and documentation of the remaining deliberate differences. Things looked at and left alone on purpose are listed in the design-gap report, §6.
