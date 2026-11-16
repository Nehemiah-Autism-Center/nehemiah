# NAC Content Matrix

Every item in `website content.docx` (read in full, including tables, 5 image references / 4 media files, captions and links) mapped to where it is implemented. Paths are under `frontend/src`. **Verbatim** = copied character for character. "Approval" IDs point to `NAC-CONTENT-APPROVAL-REGISTER.md`.

| Status | Meaning |
|---|---|
| ✅ | Implemented as supplied |
| ✏️ | Implemented with a documented edit |
| ⚠️ | Implemented with an honest placeholder or fallback; needs input |
| ➖ | Not supplied by the document in that language |

## Organization basics

| Document item | Implemented in | EN | AM | Notes |
|---|---|---|---|---|
| Organization name | `shared/content/organization.ts` | ✅ | ✅ | Amharic name used throughout the document |
| Site description | same; home intro, `<meta description>` | ✅ | ✅ | |
| Public email | same; header, footer, contact, volunteer, donate | ✅ | — | `mailto:` |
| Public phones (2) | same | ✅ | — | `tel:`; first number spaced (CT-05) |
| Address | same; footer, contact | ✅ | ✅ | AM-05 spelling conflict |
| Opening hours | same; footer, contact, home location | ✏️ | ✅ | English title-cased, en dash; Amharic Ethiopian clock as supplied (AM-08) |
| Social links (6) | same; header, footer, contact | ✏️ | — | tracking parameters removed (CT-04); verified CT-02 |
| Tagline | same; home intro, footer | ✅ | ✅ | AM-03 |
| Share image | `shared/content/media.ts` `shareCard` | ⚠️ | — | blank in document; logo card (MD-03) |
| Logo | `public/media/brand/nehemiah-logo.png`, `app/icon.png` | ✅ | — | 1254² original optimised to 640² |

## Homepage (`features/home`)

| Document item | Implemented in | EN | AM | Notes |
|---|---|---|---|---|
| Hero heading | `home/data` `HERO.headline`+`continuation`, `HeroSection` | ✅ | ✅ | split at the em dash into two sizes; words unchanged |
| Hero paragraph | `HERO.intro`, `HERO.invitation` | ✅ | ✅ | the document's two paragraphs, shown invitation-first beside the buttons so the primary action stays on screen (order only) |
| Main button A "Support Nehemiah" → donate | hero primary button, header CTA | ✅ | ✅ | `/donate` |
| B "Learn More" → About | hero secondary, intro | ✅ | ✅ | |
| C "What We Do" → services | services section | ✅ | ✅ | |
| D "Our Impact" → success stories/achievements | impact section heading (`#impact`); retired `/success-stories` redirects here | ✅ | ✅ | children's stories removed (RM-03) |
| E "Volunteer With Us" | closing CTA | ✅ | ✅ | |
| F "Partner With Us" → Partnership page | closing CTA → contact form | ⚠️ | ✅ | no page content supplied (CT-01) |
| Hero photos (2) | `MEDIA.heroPrimary/Secondary` | ⚠️ | — | document images 3 and 2; demo (MD-01) |
| Services heading + three services | `shared/content/services.ts` | ✅ | ✅ | Food Therapy third; home list says "Speech Therapy" in the document, the work order's "Speech and Language Therapy" is used everywhere |
| Home services descriptions (document lists Occupational Therapy third) | — | ✏️ | ✏️ | replaced by Food Therapy per work order §4.1 |
| Location heading + sentence | `contact/data` `LOCATION`, `LocationSection` | ✅ | ✅ | AM-05 |
| Google Maps link | `ORGANIZATION.mapsUrl` + embed | ✅ | — | short link resolves to the same place as the embed |
| Closing CTA | `home/data` `CLOSING_CTA` | ✅ | ✅ | |
| "What's up next" title + sentence | `events/data` | ✏️ | ➖ | CP-01 |

## About (`features/about`)

| Document item | Implemented in | EN | AM | Notes |
|---|---|---|---|---|
| Introduction (3 paragraphs) | `about/data` `ABOUT_INTRO` | ✏️ | ✏️ | third paragraph: Occupational → Food Therapy (AM-06); AM-07 |
| Mission | `ABOUT_MISSION` | ✅ | ✅ | two statements, split at the sentence boundary |
| History | `ABOUT_HISTORY` | ⚠️ | ✅ | English blank in the document (HI-01) |
| Services overview | `ServiceCards` | ✅ | ✅ | |
| Impact | `ImpactStats` | ✅ | ⚠️ | 90 / 65+ / 15 (ST-01..03); Amharic labels proposed |
| Banner + side photo | `MEDIA.aboutBanner/aboutSide` | ⚠️ | — | folder not supplied (MD-02) |

## Volunteer, FAQ, Blog, Events, Gallery, Testimonials, Donations

| Document item | Implemented in | EN | AM | Notes |
|---|---|---|---|---|
| Volunteer introduction | `volunteer/data` | ✅ | ✅ | |
| Five roles | `VOLUNTEER_ROLES` | ✅ | ✅ | |
| Volunteer banner | `MEDIA.volunteerBanner` | ⚠️ | — | document image 4 (MD-04) |
| Volunteer call to action | `VolunteerPage` → `/contact?topic=volunteer` | ⚠️ | ⚠️ | label approved; explanation English fallback; no application form (NAC-007) |
| FAQ intro | `faq/data` | ✅ | ✅ | |
| FAQ Q&A (5) in categories General, Services | `FAQ_CATEGORIES` | ✏️ | ✏️ | Q3 answer corrected (shared with Services summary); AM-04 |
| Blog: Buhe 2026 title/text | `blog/data` | ✅ | ➖ | |
| Blog "search summary" | `summary`, `<meta description>` | ✅ | ➖ | |
| Blog cover photo | placeholder | ⚠️ | — | not supplied (BL-01) |
| Event title/description | `events/data` | ✅ | ✅ | |
| Event schedule: "April 4-5" / "ሚያዝያ 4" | **not shown** | ⚠️ | ⚠️ | conflict, not reconciled (EV-01) |
| Event time 8:00–1:00 / 2:00–7:00 | `EVENTS[0].time` | ✅ | ✅ | consistent; shown as planned |
| Event place "specific and selected place" | `EVENTS[0].venue` | ✅ | ✅ | EV-02 |
| Event photo | `MEDIA.event` | ⚠️ | — | document image 2 (EV-03) |
| Gallery: 13 categories + descriptions | `gallery/data` | ✅ | ➖ | filter + lightbox |
| Gallery photos/videos "on folder" | 17 demo photos | ⚠️ | — | MD-02, MD-05 |
| Testimonials (6) | `testimonials/data` | ✅ | ➖ | pending approval (TS-01) |
| Donations message (heading + body) | `donation/data` | ✅ | ➖ | no payment features |

## Menu and footer

| Document item | Implemented in | EN | AM | Notes |
|---|---|---|---|---|
| Menu order Home · About Us · Our Services · Events · Blog · Contact | `shared/content/navigation.ts` | ✅ | ⚠️ | Amharic labels proposed (AM-01) except "About Us" |
| Footer sentence | `ORGANIZATION.footerSentence` | ✅ | ✅ | |
| Footer groups Support / Discover / Connect and their links | `FOOTER_GROUPS` | ✅ | ⚠️ | "Visit the Center" → `/contact#location`, "Social Media" → `/contact#social` |
| Footer photo | none | ➖ | ➖ | not supplied |

## Not in the document, therefore not on the site

Team, success stories, sponsors, history timeline, fundraising meter, invented events and posts, extra services, volunteer agreement, newsletter, countdown, video — see RM-01…RM-10.
