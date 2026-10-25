#!/usr/bin/env node
/* Injects JSON-LD structured data into every page:
 *   Organization  sitewide, sameAs built from config/site.json
 *   WebSite       on the homepage
 *   BreadcrumbList on every page except the homepage
 *   BlogPosting   on blog posts, using the page's own title and description
 *
 * Service and FAQPage blocks are written by the page builders and left
 * alone here. Run after any change to config/site.json.
 *
 *   node tools/build-schema.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const site = JSON.parse(read('config/site.json'));
const niches = JSON.parse(read('data/niches.json'));
const slugFor = Object.fromEntries(niches.pages.map(p => [p.file, p.slug]));

const SITE = 'https://conversingai.com';
const LOGO = SITE + '/images/conversing-ai-logo.png';

const sameAs = Object.values(site.social || {}).filter(Boolean);

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Conversing AI',
  url: SITE,
  logo: LOGO,
  description: 'Website design and AI chat agents for businesses in any niche.',
  sameAs,
};
const b = site.business || {};
if (b.email || b.phone) {
  org.contactPoint = [{
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: b.email || undefined,
    telephone: b.phone || undefined,
    availableLanguage: ['English'],
  }];
}
if (b.location || b.registeredIn) {
  org.address = { '@type': 'PostalAddress', addressCountry: b.registeredIn || b.location };
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Conversing AI',
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: SITE + '/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

function title(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/);
  return m ? m[1].replace(/\s+/g, ' ').replace(/&mdash;/g, '—').replace(/&amp;/g, '&').trim() : '';
}
function desc(html) {
  const m = html.match(/<meta name="description"[^>]*content="([^"]*)"/);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

function breadcrumb(slug, name) {
  const parts = slug.replace(/^\//, '').split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }];
  let acc = '';
  parts.forEach((seg, i) => {
    acc += '/' + seg;
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: i === parts.length - 1 ? name : seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      item: SITE + acc,
    });
  });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

const MARK_OPEN = '  <!-- BUILD:schema -->';
const MARK_CLOSE = '  <!-- /BUILD:schema -->';

function run() {
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  let n = 0, posts = 0;

  for (const f of files) {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, 'utf8');
    const before = html;

    const slug = f === 'index.html' ? '/' : '/' + (slugFor[f] || f.replace(/\.html$/, ''));
    const t = title(html);
    const d = desc(html);
    const blocks = [org];

    if (f === 'index.html') {
      blocks.push(website);
    } else {
      const short = t.split('—')[0].split('|')[0].trim();
      blocks.push(breadcrumb(slug, short || f));
    }

    if (/^blog-post-/.test(f)) {
      posts++;
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: (t.split('—')[0] || t).trim().slice(0, 110),
        description: d,
        url: SITE + slug,
        image: LOGO,
        author: { '@type': 'Organization', name: 'Conversing AI', url: SITE },
        publisher: { '@type': 'Organization', name: 'Conversing AI', logo: { '@type': 'ImageObject', url: LOGO } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + slug },
        // TODO(owner): real author byline and publication dates. See OWNER_INPUTS.md
      });
    }

    const payload = MARK_OPEN + '\n' +
      blocks.map(x => '  <script type="application/ld+json">\n' +
        JSON.stringify(x, null, 2) + '\n  </script>').join('\n') +
      '\n' + MARK_CLOSE;

    // Remove the old hand-written Organization block once, then our markers.
    html = html.replace(/\s*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Organization"[\s\S]*?<\/script>/, '');
    html = html.replace(new RegExp(MARK_OPEN.trim() + '[\\s\\S]*?' + MARK_CLOSE.trim(), 'g'), '');
    html = html.replace('</head>', payload + '\n</head>');
    html = html.replace(/\n{3,}/g, '\n\n');

    if (html !== before) {
      fs.writeFileSync(p, html);
      n++;
    }
  }

  console.log('schema injected');
  console.log('  pages          : ' + n);
  console.log('  blog posts     : ' + posts + ' with BlogPosting');
  console.log('  sameAs profiles: ' + sameAs.length + (sameAs.length === 1 ? ' (only Facebook is configured)' : ''));
}

run();
