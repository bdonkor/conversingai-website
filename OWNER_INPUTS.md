# Owner inputs needed

Everything the rebuild could not supply truthfully. Each item says **where it goes**, so most are a one-line edit.

Nothing here blocks the site. Every placeholder is hidden rather than shown broken, so the site is honest and working while these are outstanding.

---

## Priority 1 — a claim is published that I could not verify

- [ ] **Confirm the Yourcountant AI chat agent.**
  The brief says four sites run a live agent and names Yourcountant. I verified three: AnyStudents (Sofia), MockExams (Ama) and RAB Energy (RAB Live Chat). On Yourcountant I found **no chat launcher** on `yourcountant.com` or `app.yourcountant.com` after an 8 second wait in a real browser.
  It is currently published as having an agent, on your word.
  **If correct**, delete the `_todo` line in `data/portfolio.json` under `yourcountant`.
  **If not**, set `"hasAiAgent": false` there and change the second stat in `config/site.json` from `"4"` to `"3"`. Both the badge and the stat update everywhere automatically.

- [ ] **Confirm the RAB Energy "client work" label.**
  Marked as client work in `data/portfolio.json` per the brief's guess. Change `"label"` to `"own-product"` if that is wrong.

---

## Priority 2 — needed before the site can convert properly

- [ ] **Phone number and WhatsApp number.**
  `config/site.json` → `business.phone`, `business.phoneDisplay`, `business.whatsapp` (digits only, country code, no `+`).
  Until these exist there is no way to reach a human quickly, and the floating WhatsApp button stays hidden.

- [ ] **Business hours and location.**
  `config/site.json` → `business.hours`, `business.location` or `business.registeredIn`.
  "Global Remote Team" with no country is a trust problem for a buyer spending real money.

- [ ] **AI chat agent provider for the live demo.**
  `config/site.json` → `chatAgent`. Needs the provider name and either an embed script or an agent ID, then set `enabled: true`.
  You sell AI chat agents but a visitor cannot try one. This is the single highest-value missing piece.
  Also supply the knowledge content to train it on: services, prices, FAQs, turnaround times.

- [ ] **Scheduler link.** `config/site.json` → `booking.url`, then `enabled: true`.
  Cal.com or Calendly. Until then every "Book a call" falls back to the quote form.

- [ ] **Prices.** Website packages, AI agent setup and monthly, bundle price, currency.
  Goes in `data/pricing.json`. Shown as "from" anchors; the fixed-written-quote stance is preserved.

---

## Priority 3 — credibility

- [ ] **Founder and team details.** Name, role, short bio, photo, LinkedIn.
  `data/team.json`. The About page is called "The Team Behind Your AI Growth" and currently names nobody.

- [ ] **Real testimonials, with written permission.**
  `data/testimonials.json` → append to `items`. The six invented ones are gone. While the list is empty the site shows a founding-client block instead.

- [ ] **Remaining social profile URLs.** `config/site.json` → `social`.
  Facebook is set. LinkedIn, Instagram, X, YouTube and TikTok are blank and therefore hidden. The structured data `sameAs` list is built from the same place.

- [ ] **Hydrocom case study permission**, plus real results and a quote.
  Draft exists at `/case-studies/hydrocom`, excluded from the sitemap and marked `noindex` until you approve it.

- [ ] **Any real metric you can source.**
  The "500+ projects", "98% satisfaction", "4.9/5 rating" and "10x efficiency" numbers are removed. If any is real and you can say where it comes from, it can return with the source shown.

- [ ] **Guarantee terms.** `config/site.json` → `guarantee`. For example unlimited revisions until launch, or a 14-day agent trial. Hidden while empty.

- [ ] **Founding-client offer details.** What the first clients get and at what price.

---

## Priority 4 — measurement and launch

- [ ] **Meta Pixel ID.** `config/site.json` → `analytics.metaPixel`. GA4 is already live.
- [ ] **Confirm the legal pages** (privacy, terms, cookies, refund) describe your actual business and carry no other company's name.
- [ ] **Verify Google Search Console** and submit the sitemap. Steps in `docs/launch-checklist.md`.

---

## When a channel launches

Agents run on websites only today. WhatsApp, Facebook Messenger and Instagram are shown as "coming soon" everywhere, driven by one place.

- [ ] When one goes live, set it to `"live"` in `config/site.json` → `channels`.
  That single edit updates the pricing table row, the FAQ answer and every channel badge at once. Then supply the agent's WhatsApp number or page link.
