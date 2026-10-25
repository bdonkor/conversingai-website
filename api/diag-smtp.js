/**
 * Temporary SMTP diagnostic.
 *
 * Answers one question: can a Vercel serverless function reach the cPanel
 * mail server at all, and if not, with which error? Cloud platforms often
 * block outbound SMTP ports to stop spam, and the failure looks identical
 * to a slow server from inside the app.
 *
 * Protected by DIAG_TOKEN so it is not a public probe. DELETE THIS FILE
 * once the mail path is settled.
 *
 *   GET /api/diag-smtp?token=<DIAG_TOKEN>
 */

import net from 'node:net';
import tls from 'node:tls';

function tryPort(host, port, useTls, timeoutMs) {
  return new Promise((resolve) => {
    const started = Date.now();
    let settled = false;
    const done = (result) => {
      if (settled) return;
      settled = true;
      try { sock.destroy(); } catch {}
      resolve({ port, tls: useTls, ms: Date.now() - started, ...result });
    };

    const opts = { host, port };
    const sock = useTls
      ? tls.connect({ ...opts, servername: host, rejectUnauthorized: false })
      : net.connect(opts);

    sock.setTimeout(timeoutMs);
    sock.once(useTls ? 'secureConnect' : 'connect', () => done({ reachable: true, stage: 'connected' }));
    sock.once('data', (b) => done({ reachable: true, stage: 'banner', banner: b.toString().slice(0, 90).trim() }));
    sock.once('timeout', () => done({ reachable: false, error: 'TIMEOUT' }));
    sock.once('error', (e) => done({ reachable: false, error: e.code || e.message.slice(0, 40) }));
  });
}

export default async function handler(req, res) {
  const token = process.env.DIAG_TOKEN;
  if (!token || req.query?.token !== token) {
    return res.status(404).json({ error: 'Not found.' });
  }

  const host = process.env.SMTP_HOST || 'mail.conversingai.com';

  const results = [];
  for (const [port, useTls] of [[465, true], [587, false], [2525, false], [25, false]]) {
    results.push(await tryPort(host, port, useTls, 7000));
  }

  // Can the function reach the open internet at all? Isolates "SMTP blocked"
  // from "no outbound network".
  let httpsOk = false;
  try {
    const r = await fetch('https://api.anthropic.com/v1/models', {
      method: 'GET',
      headers: { 'x-api-key': 'probe', 'anthropic-version': '2023-06-01' },
      signal: AbortSignal.timeout(6000),
    });
    httpsOk = r.status > 0;
  } catch { httpsOk = false; }

  res.status(200).json({
    host,
    env: {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT || '(unset, defaults to 465)',
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      LEAD_EMAIL_BCC: !!process.env.LEAD_EMAIL_BCC,
    },
    outbound_https_works: httpsOk,
    smtp_ports: results,
    verdict: results.some((r) => r.reachable)
      ? 'At least one SMTP port is reachable from this function.'
      : httpsOk
        ? 'HTTPS works but every SMTP port is blocked. This platform does not allow outbound SMTP.'
        : 'No outbound connectivity at all from this function.',
  });
}
