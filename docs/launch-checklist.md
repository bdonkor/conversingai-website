# Launch checklist

What to do after the rebuild is deployed. Items marked **owner** need something only you have.

## 1. Verify Google Search Console

1. Go to search.google.com/search-console and add `conversingai.com` as a **Domain** property, which covers every subdomain and both protocols.
2. Verification needs a DNS TXT record. Your zone is at Namecheap, served by `dns1/dns2.namecheaphosting.com`, so add it in **cPanel, Zone Editor**, not in the Advanced DNS tab of the domain dashboard. Editing the wrong one does nothing.
3. Add the TXT record Google gives you at the root (`@`), with TTL 14400, then press Verify. It can take up to four hours for the record to propagate.
4. Once verified, open **Sitemaps** and submit `sitemap.xml`.

## 2. Tell Google about the redirects

The rebuild fixed 30 canonical URLs that previously pointed at `.html` addresses while the clean URL was served. Google has both versions indexed.

- In Search Console, open **Pages** and watch the "Duplicate without user-selected canonical" count. It should fall over a few weeks.
- Use **URL Inspection** on `/about`, `/contact` and `/website-design` and request indexing to speed it up.
- Legacy WordPress URLs now 301 rather than 404. Check **Pages → Not found (404)** a fortnight after launch; anything still listed needs a redirect adding to `vercel.json`.

## 3. Analytics

GA4 (`G-LQKGQXKE92`) is already installed and now runs behind a consent banner, defaulting to denied. Nothing identifying fires until a visitor allows it.

- **owner** Add the Meta Pixel ID to `config/site.json` → `analytics.metaPixel` if you intend to run Facebook ads. It loads only after consent.
- Confirm events are arriving in GA4 under **Reports → Realtime**. The tracked events are:
  `chat_widget_open`, `chat_conversation_start`, `chat_lead_captured`, `book_call_open`, `booking_completed`, `quote_form_submit`, `whatsapp_click`, `facebook_click`, `pricing_view`, `roi_calculated`, `portfolio_click`.
- Mark `quote_form_submit` and `booking_completed` as **key events** in GA4 so they show as conversions.

## 3b. Demo agent

Set these in Vercel → Settings → Environment Variables, Production:

| Variable | Value |
|---|---|
| `ANTHROPIC_API_KEY` | your Anthropic key |
| `SMTP_HOST` | `mail.conversingai.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | a cPanel mailbox, e.g. `demo@conversingai.com` |
| `SMTP_PASS` | that mailbox's password |
| `LEAD_EMAIL_BCC` | optional, copies each demo lead to you |

The lead email goes out through your own cPanel mailbox, which is already
SPF-authenticated (`+mx` and `include:spf.web-hosting.com`) and DKIM-signed
on the `default` selector. No third-party sender setup is needed.

## 4. Check the forms end to end

1. Submit `/website-development-request` with a real address.
2. Confirm it arrives in the Web3Forms inbox.
3. Confirm the browser lands on `/thank-you`.
4. **owner** Set up the auto-reply in the Web3Forms dashboard. The site cannot send that itself.

## 5. Re-run the performance baseline

```
npx --yes lighthouse@12 https://conversingai.com/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --output=html --output-path=docs/lh-after.html
```

Compare against the before figures in `baseline.md`.

## 6. Still open

Tracked in `OWNER_INPUTS.md`. The ones that block conversion:

- Phone and WhatsApp numbers, so a buyer can reach a human.
- A chat agent provider, so the live demo stops being a placeholder.
- A scheduler link, so "Book a call" books a call.
- Prices, so the pricing page shows numbers rather than "Quoted per project".
- Confirmation of the Yourcountant agent claim, which the site currently publishes on your word.

## 7. Unrelated to this rebuild, still outstanding

- The Brevo API key used from an Amazon address has never been identified.
- Email deliverability is unfinished; Brevo knows you own the domain but cannot send as you.
- `preview.conversingai.com` serves a full public copy of the site with only a canonical tag discouraging indexing.
