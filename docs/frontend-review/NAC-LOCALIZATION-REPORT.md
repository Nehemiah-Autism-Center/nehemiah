# NAC Localization Report

English and Amharic are both fully navigable. Where the organization's document supplied Amharic, it is used **verbatim**. Where it did not, the site shows English tagged `lang="en"` instead of inventing translations — with one deliberate exception, short interface labels, listed in section 5 for native review.

## 1. Decision

Custom, dependency-free i18n built on the App Router. No `next-intl` or similar was added.

**Why.** The site is ~12 mostly static pages and two languages. What it needs beyond a library's features is a *fallback model that never presents unapproved text as approved* (per-string provenance, `lang` tagging, a switch to hide proposals). A library gives message catalogs and formatting, not that. The custom layer is ~450 lines including the middleware and the interface dictionary, fully typed, statically rendered and unit-tested. **Migration path:** if more locales or ICU plurals are ever needed, `ui.ts` maps 1:1 onto next-intl message files and the `[locale]` routing is already the library's convention.

## 2. How it works

| Concern | Implementation |
|---|---|
| URLs | `/en/…` and `/am/…` under a `[locale]` segment. The language is part of the address: shareable, indexable, and it **persists across navigation with no client state**. Static generation (`generateStaticParams`) — all 24 localized pages (12 × 2) are prerendered. |
| Entry | `src/middleware.ts` redirects unprefixed URLs (`/` → `/en`, `/about` → `/en/about`, query kept) using the `NEXT_LOCALE` cookie, else English. A real page request for a localized URL (a typed or shared link) refreshes the cookie, and clicking a language link records the choice explicitly (`shared/i18n/cookie.ts`). **Router prefetches and client navigations never change it** — otherwise merely viewing the other-language link flipped the saved language (NAC-031). Decision logic is the pure, unit-tested `resolveLocaleRedirect`. |
| Switcher | Plain links to the same page in the other language (`hreflang`, `lang`, `aria-current`), each language named in its own script ("English", "አማርኛ"). Works by keyboard, touch and screen reader. Phones show it in the header bar without opening the menu. Replaces Google Translate. |
| Document language | `<html lang>` is `en` or `am` per route (two root layouts: the localized site and the unlocalized `/login`, `/register`, `/dashboard` scaffold, which stay `en`/noindex). |
| Content shape | `{ en, am?, amProvisional? }` (`shared/i18n/localized.ts`). `resolve()` returns the value, its language and whether it is a fallback. `<LocalizedText>` adds `lang="en"` on fallbacks. Attributes (`alt`, `aria-label`) use plain `text()`. |
| Single source of truth | Organisation facts, the three services, navigation and media are shared modules, so a fact is changed once. |
| Fonts | Noto Sans Ethiopic (variable) via `next/font`, self-hosted at build time — visitors never contact Google. `:lang(am)` swaps the font stack, raises line-height (1.85) and disables letter-spacing. |
| SEO | Localized `<title>` and description, canonical, `hreflang` en/am/`x-default`, Open Graph locale `am_ET`. Needs `NEXT_PUBLIC_SITE_URL`. |
| Switches | `NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC=true` shows English for proposed labels; `NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS=true` withholds testimonials. |

Amharic overflow: cards use `min-w-0`, `break-words` and wrapping buttons; verified at 320 px (below).

## 3. Coverage by page

| Page | English | Amharic |
|---|---|---|
| Header, footer, navigation | complete | document's six button labels and "About Us" approved; other labels **proposed (§5)**; footer sentence, tagline, address, hours approved |
| Home | complete | hero heading + both paragraphs, services heading/descriptions, location, closing CTA, site description approved. "What's up next", testimonials, blog/gallery/events cards: English fallback |
| About | complete | introduction, mission, history, services overview approved (Food Therapy edits: AM-06). Section headings proposed |
| Services | complete | service names and descriptions approved; summary sentence approved (edited) |
| Volunteer | complete | introduction and five roles approved; "How to get involved" English fallback |
| FAQ | complete | intro and all 5 Q&As approved (edited Q3); category names proposed |
| Events | complete | title, description, frequency, time, place, and the labels "የሚከናወንበት ጊዜ / ሰዓት / ቦታ" approved; status notes English fallback |
| Blog | complete | English fallback (no Amharic supplied) |
| Gallery | complete | English fallback for categories/descriptions (none supplied); controls proposed |
| Testimonials | complete | English fallback |
| Contact | complete | contact details and location text approved; form labels proposed; form messages English fallback |
| Donate | complete | English fallback (message not supplied in Amharic) |
| 404 / error | complete | title and button proposed; sentence English fallback |
| Image descriptions | complete | English (no approved Amharic alt text) |

## 4. Source text preserved, flagged or corrected

Kept verbatim and logged (do **not** fix without the organization): AM-03 tagline "የወሳጆቻቸውን"; AM-04 "የኔህምያ" in the FAQ; AM-05 two spellings of the address; AM-07 "ሁለተንናዊ". Edited only as required by the Food Therapy decision: AM-06. See `NAC-CONTENT-APPROVAL-REGISTER.md`.

## 5. Proposed Amharic (needs native-speaker review — AM-01)

Short interface text written by the development team, flagged `amProvisional`. Not organizational content. To show English instead, build with `NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC=true`. Generated from the code.

| Key | English | Amharic (proposed) |
|---|---|---|
| nav.home | Home | መነሻ |
| nav.services | Our Services | አገልግሎቶቻችን |
| nav.events | Events | ዝግጅቶች |
| nav.blog | Blog | ብሎግ |
| nav.contact | Contact | ያግኙን |
| nav.gallery | Gallery | ጋለሪ |
| nav.volunteer | Volunteer | በጎ ፈቃደኛ |
| nav.donate | Donate | ልገሳ |
| nav.faq | FAQ | ተደጋጋሚ ጥያቄዎች |
| footer.support | Support | ድጋፍ |
| footer.discover | Discover | ይወቁ |
| footer.connect | Connect | ተገናኙ |
| footer.contactUs | Contact Us | ያግኙን |
| footer.visit | Visit the Center | ማዕከሉን ይጎብኙ |
| footer.social | Social Media | ማህበራዊ ሚዲያ |
| footer.navLabel | Footer navigation | የግርጌ ምናሌ |
| common.skipToContent | Skip to main content | ወደ ዋናው ይዘት ዝለል |
| common.menu | Menu | ምናሌ |
| common.openMenu | Open menu | ምናሌ ክፈት |
| common.closeMenu | Close menu | ምናሌ ዝጋ |
| common.mainNavigation | Main navigation | ዋና ምናሌ |
| common.language | Language | ቋንቋ |
| common.breadcrumb | Breadcrumb | የገጽ መንገድ |
| common.readMore | Read more | ተጨማሪ ያንብቡ |
| common.backToTop | Back to top | ወደ ላይ ተመለስ |
| common.followUs | Follow us | ይከተሉን |
| common.openInMaps | Open in Google Maps | በጉግል ካርታ ክፈት |
| common.opensInNewTab | (opens in a new tab) | (በአዲስ ትር ይከፈታል) |
| common.contactDetails | Contact details | የመገናኛ መረጃ |
| contact.email | Email | ኢሜይል |
| contact.phone | Phone | ስልክ |
| contact.address | Address | አድራሻ |
| contact.hours | Opening hours | የሥራ ሰዓት |
| form.name | Your name | ስምዎ |
| form.email | Email address | ኢሜይል አድራሻ |
| form.subject | Subject | ርዕስ |
| form.message | Message | መልዕክት |
| form.send | Write my email | ኢሜይሌን አዘጋጅ |
| notFound.title | Page not found | ገጹ አልተገኘም |
| notFound.back | Back to home | ወደ መነሻ ተመለስ |
| — | Introduction | መግቢያ |
| — | Our Mission | ተልዕኳችን |
| — | Our History | ታሪካችን |
| — | General | ጠቅላላ |
| — | Services | አገልግሎቶች |
| all | All photos | ሁሉም ፎቶዎች |
| filterLabel | Show photos from | ፎቶዎችን አሳይ |
| viewGallery | View the gallery | ጋለሪውን ይመልከቱ |
| close | Close | ዝጋ |
| previous | Previous photo | ቀዳሚ ፎቶ |
| next | Next photo | ቀጣይ ፎቶ |
| openPhoto | Open photo larger | ፎቶውን አስፋ |
| label | Children supported today | አሁን የሚደገፉ ህጻናት |
| label | Children graduated | የተመረቁ ህጻናት |
| label | Years since the Center was founded | ማዕከሉ ከተቋቋመ ዓመታት |
| — | Volunteer roles | የበጎ ፈቃደኞች ሚናዎች |
| mapTitle | Map showing the location of Nehemiah Autism Center | የነህምያ ኦቲዝም ማዕከል አድራሻ ካርታ |

## 6. Adding approved Amharic

Find the English string in `src/features/<page>/data` (or `shared/i18n/ui.ts`) and add the Amharic as the second argument: `loc('Testimonials', '…')`. Delete `amProvisional`/use `loc()` instead of `locProvisional()` once a reviewer approves a label. The unit test "flags every proposed Amharic label as provisional" keeps proposals honest.

## 7. Verified

Both languages were checked at 320, 375, 390, 768, 1024 and 1440 px for horizontal overflow, broken images and console errors, and with axe; navigation persistence, the switcher, the cookie, fallbacks and `lang` tagging have unit and browser tests. Results: `NAC-TEST-RESULTS.md`. A native Amharic reader has **not** reviewed the layout or any text.
