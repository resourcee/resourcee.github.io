#!/usr/bin/env node
/**
 * Normalizes the social-sharing meta block on every page: points each one at
 * its own 1200x630 Open Graph card and fills in the tags LinkedIn, Facebook and
 * X need to render a large preview.
 *
 * The existing blocks were inconsistent (some pages had no twitter:image at
 * all), so rather than patching tag-by-tag this strips every og: and twitter:
 * tag and rewrites the block from the page's canonical URL, title and
 * description.
 *
 * Idempotent — safe to re-run after adding a page. Run generate-og-images.js
 * first so the card exists.
 *
 * Usage: node tools/update-og-tags.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://resourcee.co';

function pages() {
  const out = ['index.html', 'services.html', 'how-it-works.html', 'about.html',
               'contact.html', 'privacy-policy.html', 'terms-of-service.html'];
  for (const f of fs.readdirSync(path.join(ROOT, 'blog')).sort()) {
    if (f.endsWith('.html')) out.push(path.join('blog', f));
  }
  return out;
}

/** Reads a meta tag's raw (still HTML-escaped) content attribute. */
function meta(html, key) {
  const re = new RegExp(`<meta\\s+(?:property|name)="${key}"\\s+content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

let changed = 0;

for (const rel of pages()) {
  const file = path.join(ROOT, rel);
  const original = fs.readFileSync(file, 'utf8');

  const slug = rel.replace(/\.html$/, '');
  const image = `${SITE}/assets/og/${slug.replace('/', '-')}.png`;
  const isArticle = slug.startsWith('blog/') && slug !== 'blog/index';

  const canonical = (original.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1];
  const title = meta(original, 'og:title') ||
                (original.match(/<title>([\s\S]*?)<\/title>/i) || [])[1].trim();
  const description = meta(original, 'og:description') || meta(original, 'description');

  if (!canonical || !title || !description) {
    console.warn(`skip ${rel}: missing canonical/title/description`);
    continue;
  }

  // og:image:alt describes the card for screen readers; the card renders the
  // headline, so the title is the accurate description of it.
  const block = [
    '  <!-- Open Graph / social sharing -->',
    `  <meta property="og:type" content="${isArticle ? 'article' : 'website'}"/>`,
    `  <meta property="og:url" content="${canonical}"/>`,
    `  <meta property="og:title" content="${title}"/>`,
    `  <meta property="og:description" content="${description}"/>`,
    `  <meta property="og:site_name" content="Resourcee"/>`,
    `  <meta property="og:locale" content="en_US"/>`,
    // Explicit dimensions let LinkedIn commit to the large card layout before
    // the image finishes downloading; without them it often falls back to the
    // small thumbnail treatment.
    `  <meta property="og:image" content="${image}"/>`,
    `  <meta property="og:image:secure_url" content="${image}"/>`,
    `  <meta property="og:image:type" content="image/png"/>`,
    `  <meta property="og:image:width" content="1200"/>`,
    `  <meta property="og:image:height" content="630"/>`,
    `  <meta property="og:image:alt" content="${title}"/>`,
    '  <!-- Twitter Card -->',
    `  <meta name="twitter:card" content="summary_large_image"/>`,
    `  <meta name="twitter:title" content="${title}"/>`,
    `  <meta name="twitter:description" content="${description}"/>`,
    `  <meta name="twitter:image" content="${image}"/>`,
    `  <meta name="twitter:image:alt" content="${title}"/>`,
  ].join('\n');

  // Strip the old block (tags plus the comments that labelled them), then drop
  // the blank run it leaves behind.
  let html = original
    .replace(/^[ \t]*<!--\s*(Open Graph|Twitter Card)[^>]*-->[ \t]*\r?\n/gim, '')
    .replace(/^[ \t]*<meta\s+(?:property="og:[^"]*"|name="twitter:[^"]*")[^>]*>[ \t]*\r?\n/gim, '')
    .replace(/\n{3,}/g, '\n\n');

  // Anchor on the canonical link — present on every page, and the block reads
  // naturally right after it.
  html = html.replace(/(<link\s+rel="canonical"[^>]*>)/i, `$1\n${block}`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    console.log(`updated ${rel}`);
    changed++;
  }
}

console.log(`\n${changed} pages updated.`);
