# Homepage photography drop-in

> ⚠️ **The image files currently in this folder are AI-generated REPRESENTATIVE placeholders**
> chosen to convey the intended warm, Greek-Orthodox, aged-care tone for the client preview.
> They are **not authentic GOCSA photography** and **must be replaced** with real, consented
> photography before launch. Replacing a file with the same name updates the site instantly.


Drop real documentary photographs into this folder using the filenames below. As soon as a
file is present and its `image` field is set in
`apps/web/src/content/homepage/fixtures.ts`, the warm placeholder is replaced by the photo
automatically (via `BrandImage` → `next/image`). No component changes needed.

| Slot | Suggested filename | Ratio (guide) | Subject |
| --- | --- | --- | --- |
| Hero (full-bleed) | `hero.jpg` + `hero.mp4` | landscape, ~16:9+ | Warm gathering / family — golden hour. `hero.mp4` is a looping motion version (poster = `hero.jpg`); reduced-motion viewers see the still. Any banner can take a `video` the same way. |
| Heritage (archival) | `heritage.jpg` | 3:2 | Historic / community heritage image |
| Who we are | `who-we-are.jpg` | 4:5 portrait | Elder + carer, at home, in language |
| Care in Motion (full-bleed) | `care-in-motion.jpg` | landscape | Carer arriving at the door / in the kitchen or garden |
| Service — Personal care (featured) | `service-personal-care.jpg` | 16:9 | Respectful in-home personal care |
| Service — Household help | `service-household-help.jpg` | 4:3 | Help around the home |
| Service — Social support | `service-social-support.jpg` | 4:3 | Companionship / outing |
| Service — In-home nursing | `service-nursing.jpg` | 4:3 | Clinical care at home |
| Service — Respite care | `service-respite.jpg` | 4:3 | Family carer resting |
| Service — Transport & errands | `service-transport.jpg` | 4:3 | Getting out and about |
| Contact (full-bleed) | `contact.jpg` | landscape | Warm, inviting — a hand on a shoulder / doorway |

**Format:** JPG or WebP, sRGB, long edge ≥ 2000px for full-bleed, ≥ 1400px for cards.
**Rights:** authentic GOCSA photography preferred (no stock), with consent for any people shown.
Each image also needs descriptive `alt` text (set alongside `src` in the fixtures).
