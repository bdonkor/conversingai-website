# Performance and quality baseline

Measured **25 October 2026**, before any Phase 1 changes, against the **live production site**.

## How this was measured

Lighthouse is not installed in this repo and `npx lighthouse` did not complete in the available time, so these numbers come from headless Chrome driven by Playwright, emulating a **Pixel 5 at 390px wide** on the production URLs. That is the device class this market actually uses.

The figures below are real measurements, not estimates. They are directly comparable with a re-run of the same script after each phase. Where the plan asks for Lighthouse category scores, run:

```
npx --yes lighthouse@12 https://conversingai.com/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --output=html --output-path=docs/lh-home.html
```

## Page weight and speed, mobile

| Page | Requests | Transferred | Images | JS | DOM nodes | First Contentful Paint |
|---|---|---|---|---|---|---|
| Home | 12 | 836 KB | 298 KB | 177 KB | 685 | 4504 ms |
| Website design | 12 | 539 KB | 315 KB | 177 KB | 603 | 1756 ms |
| AI chat agents | 12 | 926 KB | 702 KB | 177 KB | 358 | 5080 ms |
| Email marketing | 12 | 523 KB | 299 KB | 177 KB | 369 | 1348 ms |
| Contact | 10 | 366 KB | 142 KB | 177 KB | 294 | 2224 ms |

**Worst offenders.** The AI chat agents page ships 702 KB of images and paints in 5.1 seconds. The homepage is not far behind at 4.5 seconds. Google treats anything over 1.8 seconds as needing improvement, so both are well into the red on a phone.

**JavaScript is identical everywhere** at 177 KB, because every page loads the same bundle regardless of what it uses.

## Image hygiene

| Page | `<img>` count | Missing width/height | Missing alt |
|---|---|---|---|
| Home | 4 | 4 | 0 |
| Website design | 3 | 3 | 0 |
| AI chat agents | 3 | 3 | 0 |
| Email marketing | 3 | 2 | 0 |
| Contact | 2 | 2 | 0 |

Alt text is complete across the board, which is good. Intrinsic dimensions are missing on almost every image, which causes layout shift as each one loads. The only images with dimensions are the ones added most recently.

Every page has exactly one `<h1>`, which is correct.

## Structural findings from the repo audit

| Finding | Count |
|---|---|
| HTML pages | 42 |
| Canonical tags that do not match the served URL | 30 |
| Footer social icons pointing at `#` | 124 (4 per page) |
| Dropdown triggers using `href="#"` (legitimate UI) | 192 |
| Broken internal links | 0 |
| Internal links still using `.html` | 0 |

See `site-map.md` for the per-page inventory and `claims-audit.md` for every unsourced claim.

## Legacy URL status on production

| URL | Status |
|---|---|
| `/about-us/` | 200, redirect already in place |
| `/agricexpert/` | **404** |
| `/how-to-create-a-website-with-lovable-dev-ai-simple-steps-to-follow/` | **404** |
| `/services/` | **404** |
| `/category/news/` | **404** |
| `/wp-login.php` | 403 |

Four legacy WordPress URLs return 404 and are fixed in Phase 3.

## Form handling

All forms submit to **Web3Forms** via `fetch` POST. Relevant files:

- `js/quote-form.js`
- `js/website-request-form.js`
- `js/yourcountant-staff-test.js`
- inline handlers in `blog.html`, `careers.html`, `contact.html`, `corporate-training.html`, `order.html`, `order-receptionist.html`

There is no `/thank-you` page; forms show an inline success message instead. No auto-reply is configured from the site itself, so any confirmation would come from Web3Forms settings.

## Chat widget status

The site has **no chat widget or agent embed of its own**. It sells AI chat agents but a visitor cannot try one.

Agent status on the eight portfolio sites, verified in headless Chrome on 25 October 2026 by looking for a fixed-position chat launcher after an 8 second wait:

| Site | Launcher found | Detail |
|---|---|---|
| AnyStudents | Yes | "Ask Sofia — Student advisor" |
| MockExams | Yes | "Open help chat with Ama" |
| RAB Energy Solutions | Yes | "Open RAB Live Chat" |
| Yourcountant | **No** | nothing found on the marketing site or `app.yourcountant.com` |
| Hydrocom | No | WhatsApp link only, which is a human contact, not an agent |
| SchoolSpec | No | — |
| Fabri Manager | No | — |
| LettersReady | No | — |

RAB Energy's HTML also contains a commented-out ElevenLabs voice widget marked "temporarily disabled", separate from its working live chat.

**This is the one place the brief and the evidence disagree.** The brief states four sites run a live agent, naming Yourcountant among them. Three are confirmed. Yourcountant is carried as `hasAiAgent: true` in `data/portfolio.json` on the owner's confirmation, with a TODO beside it, because the owner is the authority on their own product and an agent could be behind a login. It is listed first in `OWNER_INPUTS.md`.
