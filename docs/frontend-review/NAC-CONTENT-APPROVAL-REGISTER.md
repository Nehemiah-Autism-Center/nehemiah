# NAC Content Approval Register

Everything that needs the organization's confirmation before a public release. IDs are referenced from code comments. **Handling** says what the site does *today* so nothing is misleading while a decision is pending.

Not listed, because it is decided: the three principal therapies are **ABA, Speech and Language Therapy and Food Therapy**.

## Statistics and history

| ID | Item | Source | Handling now | Needed |
|---|---|---|---|---|
| ST-01 | "90 children" currently supported | Amharic site description; About text | Shown (home, About) | Confirm figure and date it applies to |
| ST-02 | "More than 65" children graduated | About text | Shown as "65+" | Confirm figure |
| ST-03 | "Established 15 years ago" | About text; Amharic description | Shown as "15 years since the Center was founded". Relative: goes stale every year | Provide founding year so it can be absolute |
| HI-01 | History section — English text blank in the document | Document | The matching English sentence from the Introduction ("founded by parents who struggled to find schools…") is used; Amharic is the document's own | Supply a History text, or approve this reuse |
| HI-02 | No timeline, founding date, names, donors or milestones were supplied | Document | About page states only what the document supports | Supply, if wanted |

## Events

| ID | Item | Handling now | Needed |
|---|---|---|---|
| EV-01 | **Date conflict.** English: "April 4-5". Amharic: "ሚያዝያ 4" (Miazia 4, an Ethiopian-calendar month). The two were not converted or reconciled. | Event shown as an annual event with **"Date to be confirmed"**; no date, countdown or "upcoming" claim. Time 8:00 AM–1:00 PM / ከጠዋቱ 2፡00 እስከ ቀኑ 7፡00 is consistent in both and shown as planned | State the date(s) and which calendar; then set `dateStatus: 'confirmed'` |
| EV-02 | Venue is only "a specific and selected place" | "Venue will be announced" | Venue name and address |
| EV-03 | Event photo is a crowd photo with identifiable people | Demo asset | Approved event photo and permissions (see MD-01) |

## Blog

| ID | Item | Handling now | Needed |
|---|---|---|---|
| BL-01 | Buhe 2026 article has **no publication date**, no author, and its cover photo ("at folder") was not supplied | "Publication date to be confirmed"; a logo placeholder instead of a photo — no stock or unrelated photo | Date, byline (optional), cover photo with permission |

## Testimonials

| ID | Item | Handling now | Needed |
|---|---|---|---|
| TS-01 | Six testimonials supplied by the social media manager; publication approval **pending**; consent of the people quoted not recorded; no Amharic | Shown verbatim with attributions unchanged, flagged `approval: 'pending'`. **Withhold with one setting**: build with `NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS=true` (section disappears; no code change). Mark an item `approved` in `features/testimonials/data` to show it again | Written approval per testimonial; Amharic if wanted |

## Media

| ID | Item | Handling now | Needed |
|---|---|---|---|
| MD-01 | Photos show identifiable people, **including children** | All photographs are temporary demos (see media manifest) | Written permission from parents/guardians and adults before publishing any photo |
| MD-02 | Photos/videos "on folder" (About banner and side photo, blog cover, gallery, footer, videos) were **not supplied** | Existing demo photos reused; nothing assigned to events it cannot be shown to depict | Supply the folder |
| MD-03 | "Share image" blank in the document | Generated card: the logo on white (no photo of children as a link preview) | Approved share image |
| MD-04 | Volunteer banner photo contains third-party sponsor logos on the background banner | Used as supplied | Confirm acceptable |
| MD-05 | Gallery photos are assigned to a category **only where the image visibly shows it** (certificate; awareness march). Of 17 photos, 4 carry a category and 13 are unassigned; 3 of the 13 categories have photos and 10 show "photos will be added soon" | Honest empty states | Assign final photos to the 13 categories |

## Amharic

| ID | Item | Handling now | Needed |
|---|---|---|---|
| AM-01 | Short interface labels (menu, footer headings, form labels, buttons not in the document) are **proposed by the development team**, flagged `amProvisional` (list in `NAC-LOCALIZATION-REPORT.md`) | Shown in Amharic | Native-speaker review. To show English instead, build with `NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC=true` |
| AM-02 | No Amharic exists for: testimonials, blog, gallery categories and descriptions, donations message, "What's up next", form messages, 404/error text, volunteer how-to, image descriptions, page meta descriptions where noted | English is shown **tagged `lang="en"`** (screen readers pronounce it correctly) | Approved Amharic text for each |
| AM-03 | Tagline "የወሳጆቻቸውን" looks like a typo for "የወላጆቻቸውን" (parents') | Kept verbatim | Confirm spelling |
| AM-04 | FAQ spells the name "የኔህምያ የኦቲዝም ማዕከል"; everywhere else "ነህምያ ኦቲዝም ማዕከል" | Kept verbatim | Choose one spelling |
| AM-05 | Address: "አልማዝዬ ሜዳ" (contact details) vs "አለማየሁ ሜዳ" (homepage location text). English says "Alemazeye" in both places | Both kept as supplied, so the two spellings appear on the site | **Which is correct** (high priority: it is the address) |
| AM-06 | Food Therapy substitution in Amharic: "የሙያ ሕክምና (Occupational Therapy)" → "የምግብ አመጋገብ ቴራፒ (Food Therapy)" (About) and "የሙያ ቴራፒ" → "የምግብ አመጋገብ ቴራፒ" (FAQ). The replacement term is the document's own | Applied | Native-speaker glance at the two edited sentences |
| AM-07 | "ሁለተንናዊ" in the About text is probably "ሁለንተናዊ"; one missing space after "።" was inserted | Spelling kept | Confirm |
| AM-08 | Amharic opening hours use the Ethiopian clock ("ጠዋት 2፡30 – ቀን 9፡30" = 8:30–3:30) | Shown as supplied, not converted | Confirm intended |

## Copy and contact

| ID | Item | Handling now | Needed |
|---|---|---|---|
| CP-01 | "Stay tuned with nehemiah scroll into our upcoming events and make an impact" reads as a draft | Only "Nehemiah" capitalised | Proofread |
| CP-02 | Team-written English copy not in the document: honesty notes on the contact form and donate page, "How to get involved" (volunteer), event status lines, section labels ("Volunteer roles", "Introduction"), and meta descriptions for the gallery | Used; clearly neutral | Review or replace |
| CT-01 | **Partnership page**: the document's "Partner With Us → Partnership page" has no content | Button opens the contact form with the subject filled in; no page invented | Supply content, or confirm the contact route |
| CT-02 | External links opened in a real browser (headless Chromium): **Facebook** share link redirects to the "Nehemiah Autism Center \| Addis Ababa" page; **Instagram**, **TikTok**, **YouTube** and **Google Maps** (place "Nehemiah Autism Center") load the right pages. **LinkedIn** and **X** show bot-protection walls (HTTP 403) to automated browsers although both answered 200 to `curl`, so they could not be visually confirmed | Used as supplied | Click LinkedIn and X once in a normal browser |
| CT-03 | Contact form has no backend | Opens the visitor's own email app; says nothing is sent | A delivery endpoint (see Issues NAC-003) |
| CT-04 | Social links: Instagram and TikTok tracking parameters removed, YouTube upgraded to https; profile targets unchanged | Applied | — |
| CT-05 | Phone `+251930012652` is displayed spaced as `+251 93 001 2652` to match the second number's format | Applied | — |

## Removed because not in the document

Recoverable from commit `6983de3`. **Re-add only after written confirmation**; items marked ⚠ concern children or money.

| ID | Removed content |
|---|---|
| RM-01 | 12-entry "15 Years" history (named people, donors, relocations, ministries, awards) |
| RM-02 | Founder name and biography, four staff profiles (names, roles, photos) |
| RM-03 ⚠ | **Three success stories naming individual children** with developmental and school histories |
| RM-04 ⚠ | Fundraiser meter "TARGET $10,000 / RAISED $6,000", and FAQ text directing donors to a bank account; therapy cost "18,000 birr per child" |
| RM-05 | Counters 300+ children / 500+ families / 30 staff; "38 children daily meals"; "600,000 children"; "1,000 on waiting lists"; "463rd on a waiting list" |
| RM-06 | Sponsor and partner names/logos (banks, insurers, an embassy, ministries) |
| RM-07 | Three invented events (Autism Awareness Walk, Parent Training Workshop, School Seminar) with dates and venues; four blog posts |
| RM-08 | Services not in the document: Parent Training, Parent Empowerment, Social & Financial Aid, Health & Wellness, Daily Meal Support |
| RM-09 | Volunteer "agreement" text and 14-field application form (never reached a server) |
| RM-10 | Donation amount form; `/coming-soon` countdown and newsletter box |

## Other

| ID | Item | Needed |
|---|---|---|
| OR-01 | Production site URL for canonical links, hreflang and Open Graph | Set `NEXT_PUBLIC_SITE_URL` per environment |
| OR-02 | No privacy notice. The contact page embeds a Google Maps frame (third-party) and the site sets one language cookie | Decide on a notice / consent for the map |
| OR-03 | Real donation channels (bank, mobile money) were not supplied, so none are shown | Supply when ready |
