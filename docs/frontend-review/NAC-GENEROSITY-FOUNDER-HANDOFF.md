# Generosity-style redesign — plain-language handoff

Written for: the founder and anyone deciding whether to adopt this look. No code knowledge needed.

## What this is

An **experiment**: the same Nehemiah website, content and behaviour, dressed in a green-and-charcoal charity look described in the brief ("Generosity"). It lives on its own branch, `experiment/generosity-visual-redesign`, on this computer only. Nothing was published, pushed, merged or deployed, and the real work (draft PR #3) was not touched.

**Important honesty note:** the actual Generosity template files were not provided, so this follows the *written description* in the brief. It is "inspired by", not a copy, and I cannot say how close it is to the real template in percentage terms. Nothing from the template, or any other template, was used.

## What you will see

- A **three-level top**: a dark strip (social icons and Email / Contact / FAQ links, plus the language switch), a white row with the logo, address, phone, email and opening hours, and a dark menu bar with the current page in solid green and a green "Support Nehemiah" button.
- A **big photograph at the top of the home page** with the welcome heading in large white capitals and "Nehemiah Autism Center" in green, and two buttons.
- Three **get-involved cards** under it (Volunteer With Us, Support Our Mission, Partner With Us), then the services (still exactly ABA, Speech and Language Therapy, Food Therapy), the three real figures (90, 65+, 15) on green cards, the event, the testimonials, the blog post, the gallery (eight photographs, four to a row, with a small category filter and a click-to-enlarge viewer), the map and a closing "Help Us Reach More Children" panel.
- A **dark, four-column footer**, and **photo banners** at the top of every other page.
- Everything still works in English and Amharic, on phones and desktops. The language switch, the honest email-based contact form, the "donations coming soon" page, the FAQ, and the gallery filter and photo viewer all behave as before.

## Nothing invented

No new statistics, sponsors, stories, sliders, donation meters, staff, history or services were added. All wording is the approved text. The first line of the old home-page heading text was moved down into the introduction so the top of the page is short; **no approved words were removed**.

## One change to the colours you should know about

The brand green is **too light for white text** (it fails the standard readability test), so:

- Buttons and cards in green use **near-black text**, not white.
- Green words on white pages use a **slightly darker green** so they stay readable.
- Grey secondary text is a touch darker than the brief's grey.

Everything else uses the colours in the brief.

## Decisions for you

1. **Do you like this direction?** If yes, it can be reviewed and merged into the main work; if no, discard the branch. Nothing else depends on it.
2. **Photographs of children are now much more prominent.** The big home photo and the banner on every page are existing demonstration photographs, several showing identifiable children. The website's code is stored in a public place. Before any public release you need **written permission** for these photographs or replacements (this was already the top open item for PR #3; the redesign makes it more urgent).
3. **Top-bar links.** The brief suggested "Email / Contact / Support". "Support" is already the big green button, so I used **FAQ** for the third link. Say if you prefer something else.
4. **The "get involved" cards** use only existing button names and pages. If you want a short sentence under each, send the approved text.
5. **Amharic** wording for the small labels is still the proposed (provisional) set from PR #3 and has not been checked by a native speaker.
6. **Footer link groups.** The brief suggested a different grouping than the one in your approved content document (for example Events under "Discover"). I kept the approved grouping, and an automated test checks it. Say if you want the brief's grouping instead.

## How to look at it on your computer

**Use http://localhost:3004.** It serves the final build and was left running. Port 3001 (your existing site) is untouched.

Two older preview servers from earlier work are still running on **3002** and **3003**. They hold an earlier version of the homepage in memory (before the gallery filter), so **do not use them**. They can be stopped with Ctrl+C in the window that started them, or from PowerShell with `Get-NetTCPConnection -LocalPort 3002,3003 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess }`.

If 3004 is not running (for example after a restart), open PowerShell and run:

```powershell
cd C:\Users\naods\Documents\nac-generosity-wt\frontend
$env:NEXT_STANDALONE = "0"
pnpm build
pnpm exec next start -p 3004
```

Then open http://localhost:3004 in a browser (add `/am` for Amharic). Stop it with Ctrl+C. **Stop the server before running `pnpm build` again**: a server that is still running keeps showing the old pages. Any free port works instead of 3004 (3002 once the old server is stopped). Pictures of the result are in `docs/frontend-review/evidence-generosity/` (compare with the old look in `docs/frontend-review/evidence/`).

## Known limits

- It is judged by eye and by automated checks, not by a designer or real visitors.
- Between 768 and 1023 pixels wide the white row shows just the logo and name; the address, phone and hours boxes need a wider screen.
- The place-holder photographs, English-only blog, and missing partnership page content are unchanged from PR #3.

More detail for developers: `NAC-GENEROSITY-IMPLEMENTATION.md`, `NAC-GENEROSITY-TEST-RESULTS.md`, `NAC-GENEROSITY-VISUAL-REVIEW.md`, `NAC-GENEROSITY-DESIGN-GAP.md`.
