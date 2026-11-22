# Generosity-inspired redesign — design gap analysis

Branch: `experiment/generosity-visual-redesign` (from `feature/nac-complete-frontend` at `f92cb80`).
Status: **experiment — not for merge, not pushed.**

## 1. What this is based on, and what it is not

The Generosity Charity HTML5 template files were **not supplied**. The work order's written specification (palette, geometry, header levels, hero, section list, footer, banners) is the only reference used, so this document compares the existing site with that **written description**, not with the template's source files.

Consequences, stated plainly:

- No template HTML, CSS, JavaScript, images or fonts were used or copied. Nothing from any other template was used.
- No claim of a pixel-perfect or percentage match is made anywhere in this experiment. Fidelity is assessed by checklist against the written spec (see `NAC-GENEROSITY-VISUAL-REVIEW.md`).
- Where the spec was silent (exact copy, icon choice, hover treatments, the hero photograph) the choice was made to fit the site's approved content, and is listed in `NAC-GENEROSITY-IMPLEMENTATION.md`.

## 2. Gap table: before (PR #3) → target (spec)

"Before" screenshots are the 29 captures already in `docs/frontend-review/evidence/`.

| Area | Before (PR #3) | Target (work order) | Gap |
|---|---|---|---|
| Palette | Teal / navy / gold identity | Bright green `#80B53F`, charcoal `#333`, dark `#2C2C2C`, footer `#1A1A1A`, light grey `#F8F9FA` | Complete re-theme through design tokens |
| Green and contrast | n/a | Bright green is the brand colour | White text on `#80B53F` is 2.4:1 (fails); handled as a surface colour with near-black text, see §4 |
| Typography | Open Sans + Trirong, Noto Sans Ethiopic | Same families; Open Sans 800 uppercase hero (~60px); Trirong ~42px section headings | Hero style, heading size/weight, nav caps; weight 800 added to the font load |
| Header | Utility bar + one white brand/nav bar | Three levels: charcoal bar (social squares / utility links), white row (logo + 3 info blocks), charcoal nav bar (full-height green active tab, green CTA) | Rebuilt; mobile keeps dark / white / dark |
| Hero | Light gradient, text left, two overlapping rounded photos | Full-width photo, ~70% black overlay, 620–680px, left-aligned oversized heading with green words, two rectangular buttons | Rebuilt; static (no slider, autoplay, parallax) |
| Hero text | Heading + continuation + invitation + intro all in the hero | Concise supporting text only | Continuation and intro moved to the introduction section; **no approved word removed** |
| Feature strip | none | Three cards, centre green, overlapping the hero | New; built from existing approved CTA labels and pages (no new copy) |
| Introduction | Text + rounded photo | Two columns | Offset green block behind a square-cornered photo |
| Services | Rounded cards, tinted icon | Cards with green icon discs | Restyled; still exactly ABA, Speech and Language, Food Therapy |
| Impact | Teal band, translucent tiles | Dark photographic band, bright-green cards | Rebuilt; still the three existing figures, static |
| Events / blog | Rounded cards | Rectangular cards, green status flag | Restyled; a lone card spans the container |
| Testimonials | Rounded cards | Static cards | Restyled; no slider added |
| Gallery | Rounded tiles, pill filters | Rectangular grid | Restyled; filter, 13 categories and lightbox unchanged |
| Closing CTA | Solid teal band | Dark photographic CTA | Rebuilt |
| Footer | Five-column grid, one bar | Near-black four columns + separate copyright bar | Rebuilt; green dividers under headings |
| Page banners | Solid teal, left-aligned | Dark photographic, centred title and breadcrumbs | Rebuilt; every page has a banner photo |
| Geometry | `rounded-xl/2xl/full`, soft shadows | 1140px container, radii 0–6px (buttons 5px), minimal shadow, 80px section padding | Container, radius and padding tokens changed site-wide |

## 3. Out of scope or deliberately not reproduced

- Slider, auto-play, parallax, count-up, jQuery, fake donation meters, sponsors, children's stories, invented statistics: not built (they were removed in PR #3 for accessibility and honesty reasons; the work order also forbids them).
- A fourth impact figure, a CEO, a company history, an invented mission statement: not invented. Only approved content appears.
- Occupational Therapy: still excluded; Food Therapy is the third service.

## 4. The one real design conflict: the green

`#80B53F` is the heart of the template's identity, but it cannot carry white text:

| Pair | Ratio | WCAG AA |
|---|---|---|
| White on `#80B53F` | 2.4 : 1 | fails |
| `#80B53F` text on white | 2.4 : 1 | fails for text |
| `#1A1A1A` on `#80B53F` | 7.1 : 1 | passes |
| `#80B53F` on `#333333` (nav) | 5.2 : 1 | passes |
| `#80B53F` on `#1A1A1A` (footer) | 7.1 : 1 | passes |
| `#777777` (spec's muted grey) on white | 4.48 : 1 | fails by 0.02 |

Minimal fixes, keeping the green recognisable:

1. Bright green is a **surface** colour (buttons, active tab, cards, flags) with **near-black** text, as the template's own green buttons use dark text on charcoal.
2. Green **text on white** uses a darker related green: `#4A771D` for body-size text (5.32 : 1 on white, 5.05 : 1 on `#F8F9FA`) and `#6E9B36` for large headings (28px and up) and icons only (3.28 : 1 on white, 3.11 : 1 on `#F8F9FA`; the large-text and graphics threshold is 3 : 1).
3. On dark surfaces the original bright green is used unchanged.
4. Muted text is `#6B6B6B` (5.3 : 1) instead of `#777`.

All other spec colours are used as specified.

## 5. Decisions the spec left open

- **Utility links**: Email · Contact · FAQ. The spec says "Email / Contact / Support", but Support is already the green call-to-action button, so FAQ takes its place in the dark bar.
- **Feature strip content**: Volunteer With Us · Support Our Mission · Partner With Us, using existing labels and routes.
- **Hero photograph**: the existing demonstration photograph, darkened. Replacing demo media remains an open item from PR #3 (register MD-01).
- **Homepage gallery**: the spec describes a "Photo Archives" section with category controls and about four images per row. It is built by reusing the gallery browser in `preview` mode: a centred filter limited to the three categories that actually have photographs, a four-column grid of eight existing photographs, and the same lightbox. The ten empty categories are not shown on the homepage (an empty chip would lead to an empty grid) and remain on `/gallery`. (The first pass had kept a plain link grid; the second pass closed this gap.)

## 6. Where the build still differs from the written spec

Checked in a real browser in the second pass. None of these is a defect; each is a choice, a limit of the available content, or an open observation.

| # | Spec says | Build does | Why |
|---|---|---|---|
| 1 | Footer columns: Organization (About, Services, Contact), Support (Volunteer, Donate, FAQ), Discover (Events, Blog, Gallery), About/Contact | Four columns: brand and mission; Discover (About Us, Our Services, Gallery, Blog); Support (Volunteer, Donate, FAQ, Events) with a Connect group beneath; contact details | The link groups come from the approved content document, and a content-integrity test asserts them ("uses the document footer groups"). Regrouping would change approved structure, so it is left for the founder |
| 2 | Section headings with a green-highlighted word, including testimonials, blog and gallery | "Testimonials", "Blog" and "Gallery" are single words, so they carry the green divider but no green word; FAQ category headings likewise | Highlighting needs a second word, and the headings' wording is approved content |
| 3 | Closing CTA: "Green button" | One green primary ("Support Our Mission") on its own row, and two outlined secondaries ("Volunteer With Us", "Partner With Us") on a second row | Keeps the two existing approved secondary actions without making three equal green buttons. Deliberate and documented in the component |
| 4 | Utility links "Email / Contact / Support" | Email · Contact · FAQ | "Support" is already the green nav button |
| 5 | Hero photograph: prefer a group or community picture | `heroPrimary` (children playing a game with adults watching), the photograph already designated for the hero | Existing demonstration media only; replacement is register item MD-01. Photographs of children are now more prominent: see the founder handoff |
| 6 | Header white row shows the three information blocks | Three blocks from 1280px, two (contact, address) at 1024px, logo only at 768px | The spec says not to force the desktop rows into small widths. Between 768 and 1023px the row has empty space on the right |
| 7 | Event, blog and testimonial content | Unchanged from PR #3 (event date "to be confirmed", blog date "to be confirmed", logo as blog placeholder image) | Honest placeholders; nothing was invented to fill the layout |
| 8 | Contact and homepage location map | A Google Maps iframe (unchanged from PR #3) | Not a difference, but a capture trap: the iframe is `loading="lazy"`, so a quick screenshot shows an empty white frame. With an 8-second wait it renders fully (pin on Nehemiah Autism Center, Kera), and `contact-form-errors-1440.jpg` also shows it rendered. Needs internet access to load |
