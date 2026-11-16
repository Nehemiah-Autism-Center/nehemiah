# NAC Media Replacement Manifest

Every photograph on the site is a **temporary demonstration asset** unless marked *final*. None is claimed to depict the event, date or category it sits near. All references live in one file, [`frontend/src/shared/content/media.ts`](../../frontend/src/shared/content/media.ts) (gallery assignments in `features/gallery/data`), so replacing a photo is a file swap plus one line.

**To replace a photo**

```bash
cd frontend
pnpm media:optimize <original.jpg> public/media/demo/<name>.jpg 1600 78
# prints WxH — update width/height in media.ts, then write real alt text
```

The script applies the camera orientation, **strips all metadata (EXIF, GPS, camera, timestamps)**, caps the longest edge at 1600 px and writes a progressive JPEG. Target ≤ 350 KB. A unit test fails if a referenced file is missing, larger than 500 KB, carries metadata, or differs from its declared dimensions.

Permission for every identifiable person (and written parent/guardian permission for children) is required first — register item MD-01.

## Where final photographs are needed

| Slot | Currently | Aspect | Requirement |
|---|---|---|---|
| Home hero — main | `hero-children-playing.jpg` | 16:9 (shown 4:3) | Final hero photo (the document lists two "Hero photo" images) |
| Home hero — inset | `hero-families-event.jpg` | 3:2 | Final second hero photo |
| Home introduction | `demo-03.jpg` | 3:2 | Final photo |
| About banner (decorative, dark overlay) | `demo-09.jpg` | wide (any, cropped) | "Banner photo" from the folder — not supplied |
| About side photo | `demo-03.jpg` | 4:3 | "Side photo" from the folder — not supplied |
| Events — annual awareness event | `hero-families-event.jpg` | 3:2 | The document's "one landscape photo"; confirm this is the right event photo |
| Volunteer banner | `volunteers-certificates.jpg` | 16:9 | Supplied in the document; confirm (it shows sponsor logos behind the group, MD-04) |
| Blog cover — Buhe 2026 | **none** (logo placeholder) | 3:2 card / 16:9 post | "Cover photo at folder" not supplied. Add `cover` support when received |
| Gallery (13 categories) | 17 demo photos, 4 categorised | any; shown 4:3 thumbnails | Photo and video for each category from the folder |
| Share image (link previews) | `brand/share-card.jpg` — logo on white, *final until replaced* | 1200×630 | "Share image" blank in the document |
| Footer photo | none used | — | Document mentions "Photo at the folder" |
| Videos | none | — | "Photo and video on folder" — no video player built until videos exist |

## Inventory of files shipped (`frontend/public`, 3.6 MB; was 174 MB)

| File | Size | Source | Used in |
|---|---|---|---|
| `brand/nehemiah-logo.png` *(final)* | 640², 47 KB | logo in the content document (1254² original) | header, footer, blog placeholder, share card |
| `brand/share-card.jpg` *(final)* | 1200×630 | generated from the logo | Open Graph / Twitter image |
| `src/app/icon.png` *(final)* | 512², 38 KB | the logo | browser tab icon |
| `demo/hero-children-playing.jpg` | 1600×901, 226 KB | document image 3 | home hero; gallery |
| `demo/hero-families-event.jpg` | 1280×853, 137 KB | document image 2 | home hero inset; events; gallery |
| `demo/volunteers-certificates.jpg` | 1600×901, 248 KB | document image 4 | volunteer banner; gallery (Volunteers in Action, Certificate & Recognition) |
| `demo/demo-01.jpg` … `demo-14.jpg` | 97–313 KB each | repo originals `gallery_2/3/4/5/6/10/11/15/16/17/19/20/21`, `20250828_112311` (in that order) | gallery; `demo-03` home + About; `demo-09` About banner |

Gallery photographs with a category are limited to what the picture itself shows: `demo-11` (certificate) → Certificate & Recognition; `demo-09`, `demo-10` (public marches) → Autism Awareness Activities; the volunteers photo → Volunteers in Action and Certificate & Recognition.

## Removed from `public/`

69 files, ~170 MB, all recoverable from `6983de3`:

- **Generic template stock photos** unrelated to the charity and of unknown licence (`about-us.jpg` is the Eiffel Tower; `volunteers.jpg` a person in a forest; `event_*`, `blog_*`, `cause_*`, `home_*_slider_*`, `header-bg`, `cta_bg`). The work order forbids introducing stock photography.
- **Raw originals** of real photos (3–14 MB each, 4–6 thousand pixels, camera metadata): `gallery_*`, `history_*`, `20250828_112311`, `counter_bg` — the 14 chosen for the gallery were re-exported through the script above.
- **Staff portraits** (`team_6…9`, `user_1…4`) — people not named in the document.
- Old 200 px logo variants, `logo_1…3` partner logos, loader/arrow GIFs, patterns, `signature.png`.
- `gallery_19.jpg`/`gallery_3.jpg` had been referenced in lowercase while stored as `.JPG`, a 404 on Linux.
