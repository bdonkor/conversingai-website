/**
 * Read a visitor-supplied website, safely.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * The Anthropic path does not need this: web_fetch runs on Anthropic's
 * servers, so a hostile URL never reaches ours. Groq has no equivalent — its
 * built-in browser_search cannot visit a given URL — so on that path we do
 * the fetching, and the SSRF problem becomes ours.
 *
 * The attack this exists to stop: a visitor types http://169.254.169.254/ and
 * the agent cheerfully reads the cloud metadata service, including whatever
 * credentials it hands out. Same for 127.0.0.1, 10.x, and anything else only
 * reachable from inside the network.
 *
 * So every hop is checked, not just the first. A public hostname can redirect
 * to a private address, and a DNS record can resolve to one, so the guard is
 * on the resolved IP of each URL in the chain rather than on the text of the
 * URL the visitor typed.
 * ──────────────────────────────────────────────────────────────────────────
 */
import dns from 'node:dns/promises';
import net from 'node:net';

const MAX_BYTES = 400_000;        // enough for a long page, not a download
const MAX_REDIRECTS = 4;
const TIMEOUT_MS = 8_000;
const MAX_TEXT_CHARS = 40_000;    // ~10k tokens, well inside any context

/* Ranges that must never be fetched. Each is [first, last] as 32-bit ints,
 * built once at module load. The list is deliberately broader than "private":
 * link-local carries the cloud metadata endpoint, and the reserved blocks have
 * no business being reachable from a public demo. */
const ip4 = (a, b, c, d) => ((a << 24) >>> 0) + (b << 16) + (c << 8) + d;
const BLOCKED_V4 = [
  [ip4(0, 0, 0, 0), ip4(0, 255, 255, 255)],           // "this network"
  [ip4(10, 0, 0, 0), ip4(10, 255, 255, 255)],         // private
  [ip4(100, 64, 0, 0), ip4(100, 127, 255, 255)],      // carrier NAT
  [ip4(127, 0, 0, 0), ip4(127, 255, 255, 255)],       // loopback
  [ip4(169, 254, 0, 0), ip4(169, 254, 255, 255)],     // link-local + metadata
  [ip4(172, 16, 0, 0), ip4(172, 31, 255, 255)],       // private
  [ip4(192, 0, 0, 0), ip4(192, 0, 0, 255)],           // IETF protocol
  [ip4(192, 0, 2, 0), ip4(192, 0, 2, 255)],           // TEST-NET-1
  [ip4(192, 168, 0, 0), ip4(192, 168, 255, 255)],     // private
  [ip4(198, 18, 0, 0), ip4(198, 19, 255, 255)],       // benchmarking
  [ip4(198, 51, 100, 0), ip4(198, 51, 100, 255)],     // TEST-NET-2
  [ip4(203, 0, 113, 0), ip4(203, 0, 113, 255)],       // TEST-NET-3
  [ip4(224, 0, 0, 0), ip4(239, 255, 255, 255)],       // multicast
  [ip4(240, 0, 0, 0), ip4(255, 255, 255, 255)],       // reserved + broadcast
];

function v4Blocked(addr) {
  const parts = addr.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const n = ip4(...parts);
  return BLOCKED_V4.some(([lo, hi]) => n >= lo && n <= hi);
}

function v6Blocked(addr) {
  const a = addr.toLowerCase().split('%')[0];           // drop any zone id
  if (a === '::' || a === '::1') return true;           // unspecified, loopback
  // IPv4 mapped or compatible: judge the embedded v4 address instead
  const mapped = a.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/) || a.match(/^::(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return v4Blocked(mapped[1]);
  const head = parseInt(a.split(':')[0] || '0', 16);
  if ((head & 0xfe00) === 0xfc00) return true;          // fc00::/7 unique local
  if ((head & 0xffc0) === 0xfe80) return true;          // fe80::/10 link-local
  return false;
}

/** True when this URL resolves somewhere we must not go. */
async function resolvesSomewhereForbidden(url) {
  const host = url.hostname.replace(/^\[|\]$/g, '');

  // A literal IP skips DNS; judge it directly.
  if (net.isIP(host)) {
    return net.isIP(host) === 4 ? v4Blocked(host) : v6Blocked(host);
  }

  let records;
  try {
    records = await dns.lookup(host, { all: true, verbatim: true });
  } catch {
    return true;                                        // cannot resolve: refuse
  }
  if (!records.length) return true;

  // EVERY record must be safe. One public and one private answer is a
  // DNS-rebinding setup, not a coincidence.
  return records.some((r) => (r.family === 4 ? v4Blocked(r.address) : v6Blocked(r.address)));
}

/** Strip a page to the text a model should read. */
function toText(html) {
  let s = html;
  s = s.replace(/<(script|style|noscript|svg|iframe|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  // keep block boundaries so sentences do not run together
  s = s.replace(/<\/(p|div|li|tr|h[1-6]|section|article|br)\s*>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, '’').replace(/&mdash;/gi, '—');
  s = s.replace(/[ \t ]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
  return s.slice(0, MAX_TEXT_CHARS);
}

/**
 * Fetch one page and return its visible text.
 * Never throws: the agent gets a sentence it can read out either way.
 * @returns {Promise<{ok: boolean, url?: string, title?: string, text?: string, detail: string}>}
 */
export async function fetchSite(rawUrl) {
  /* Prepending https:// to anything without one is convenient for "acme.com"
   * but dangerous for "file:///etc/passwd", which would become a URL whose
   * hostname is "file" and get refused only because that fails DNS. Decide
   * the scheme deliberately instead, so a hostile one is rejected as a
   * hostile one. */
  const hasProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(rawUrl);
  // "javascript:", "data:", "file:" have a scheme and no //; "acme.com:8080"
  // only looks like one, so exclude a colon followed by a port number.
  const bareScheme = /^[a-z][a-z0-9+.-]*:/i.test(rawUrl) && !/^[a-z0-9.-]+:\d+(\/|$)/i.test(rawUrl);
  if (!hasProtocol && bareScheme) {
    return { ok: false, detail: 'I can only read http and https addresses.' };
  }

  let url;
  try {
    url = new URL(hasProtocol ? rawUrl : 'https://' + rawUrl);
  } catch {
    return { ok: false, detail: `"${rawUrl}" is not a web address I can read.` };
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { ok: false, detail: 'I can only read http and https addresses.' };
  }

  const seen = new Set();
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (seen.has(url.href)) return { ok: false, detail: 'That address redirects in a loop.' };
    seen.add(url.href);

    if (await resolvesSomewhereForbidden(url)) {
      // Deliberately vague to the visitor; the detail is in the server log.
      console.warn('fetchSite blocked:', url.hostname);
      return { ok: false, detail: `I could not reach ${url.hostname}.` };
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    let res;
    try {
      res = await fetch(url.href, {
        redirect: 'manual',            // follow by hand so every hop is checked
        signal: ctrl.signal,
        headers: {
          'User-Agent': 'ConversingAI-DemoAgent/1.0 (+https://conversingai.com)',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
    } catch (e) {
      clearTimeout(timer);
      return {
        ok: false,
        detail: e?.name === 'AbortError'
          ? `${url.hostname} took too long to respond.`
          : `I could not reach ${url.hostname}.`,
      };
    }
    clearTimeout(timer);

    if (res.status >= 300 && res.status < 400) {
      const next = res.headers.get('location');
      if (!next) return { ok: false, detail: `${url.hostname} redirected to nowhere.` };
      try { url = new URL(next, url); } catch { return { ok: false, detail: 'That redirect is not a valid address.' }; }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { ok: false, detail: 'That address redirects somewhere I cannot follow.' };
      }
      continue;                         // loop re-checks the new host
    }

    if (!res.ok) {
      return { ok: false, detail: `${url.hostname} returned ${res.status}.` };
    }

    const type = res.headers.get('content-type') || '';
    if (!/text\/html|text\/plain|application\/xhtml/i.test(type)) {
      return { ok: false, detail: `${url.hostname} did not return a web page.` };
    }

    // read with a byte ceiling rather than trusting content-length
    const reader = res.body?.getReader();
    if (!reader) return { ok: false, detail: `${url.hostname} returned nothing.` };
    const chunks = [];
    let total = 0;
    while (total < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      chunks.push(value);
    }
    try { await reader.cancel(); } catch { /* already finished */ }

    const html = Buffer.concat(chunks).toString('utf8');
    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim();
    const text = toText(html);
    if (!text) return { ok: false, detail: `${url.hostname} had no readable text.` };

    return { ok: true, url: url.href, title, text, detail: `Read ${text.length} characters from ${url.hostname}.` };
  }

  return { ok: false, detail: 'That address redirects too many times.' };
}
