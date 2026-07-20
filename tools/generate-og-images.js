#!/usr/bin/env node
/**
 * Renders a 1200x630 Open Graph card for every page on the site.
 *
 * Titles come from each page's own <title>, so the cards stay in sync with the
 * pages themselves. Output lands in assets/og/<slug>.png.
 *
 * Usage: node tools/generate-og-images.js
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'og');
const TEMPLATE = path.join(__dirname, 'og-card.html');
// chrome-headless-shell starts an order of magnitude faster than full Chrome,
// which matters when rendering ~20 cards in a row. Fall back to Chrome itself.
const CHROME = [
  ...(function () {
    const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell');
    if (!fs.existsSync(base)) return [];
    return fs.readdirSync(base).map((v) =>
      path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell'));
  })(),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error('No Chrome binary found. Install Chrome or run: npx @puppeteer/browsers install chrome-headless-shell@stable');
  process.exit(1);
}

// Pages whose card should carry a kicker other than the default.
const KICKERS = {
  'index': 'Nearshore Talent Partner',
  'services': 'Services',
  'how-it-works': 'How It Works',
  'about': 'About Resourcee',
  'contact': 'Book a Call',
  'privacy-policy': 'Legal',
  'terms-of-service': 'Legal',
  'blog/index': 'The Resourcee Blog',
};
const BLOG_KICKER = 'Resourcee Blog';

// Headlines that read better on a card than the raw <title> does.
const TITLE_OVERRIDES = {
  'index': 'Hire the top 3% of South American engineering talent',
  'contact': 'Book a free 30-minute call with Resourcee',
  'blog/index': 'Nearshoring and LATAM engineering insights',
};

/**
 * Maps each post slug to its illustration by reading the blog index, so the
 * cards always use the same artwork the listing page shows. Covers both the
 * featured card and the grid cards.
 */
function blogArtwork() {
  const html = fs.readFileSync(path.join(ROOT, 'blog', 'index.html'), 'utf8');
  const map = {};
  const re = /href="([a-z0-9-]+)"[^>]*>\s*(?:<[^>]*>\s*)*<img src="\.\.\/assets\/blog\/([a-z0-9-]+\.svg)"/g;
  let m;
  while ((m = re.exec(html))) map[m[1]] = m[2];
  return map;
}

function pageTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  return m[1]
    .replace(/&amp;/g, '&')
    .replace(/&iacute;/g, 'í')
    .replace(/\s*\|\s*Resourcee(\s+Blog|\s+LLC)?\s*$/i, '')
    .replace(/^\s*Resourcee\s*\|\s*/i, '')
    .trim();
}

function htmlFiles() {
  const files = ['index.html', 'services.html', 'how-it-works.html', 'about.html',
                 'contact.html', 'privacy-policy.html', 'terms-of-service.html'];
  for (const f of fs.readdirSync(path.join(ROOT, 'blog')).sort()) {
    if (f.endsWith('.html')) files.push(path.join('blog', f));
  }
  return files;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const tmp = fs.mkdtempSync('/tmp/og-chrome-');
const artwork = blogArtwork();
let count = 0;
let missingArt = [];

for (const rel of htmlFiles()) {
  const slug = rel.replace(/\.html$/, '');
  const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const title = TITLE_OVERRIDES[slug] || pageTitle(html);
  if (!title) {
    console.warn(`skip ${rel}: no <title>`);
    continue;
  }
  const kicker = KICKERS[slug] || (slug.startsWith('blog/') ? BLOG_KICKER : 'Resourcee');
  const out = path.join(OUT_DIR, slug.replace('/', '-') + '.png');

  // Posts carry their own illustration; section pages keep the LATAM map.
  const art = slug.startsWith('blog/') && slug !== 'blog/index'
    ? artwork[path.basename(slug)]
    : null;
  if (slug.startsWith('blog/') && slug !== 'blog/index' && !art) {
    missingArt.push(slug);
  }

  const url = 'file://' + TEMPLATE +
    '?title=' + encodeURIComponent(title) +
    '&kicker=' + encodeURIComponent(kicker) +
    (art ? '&image=' + encodeURIComponent('../assets/blog/' + art) : '');

  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files', // so the file:// template can load its local font files

    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=4000',
    `--user-data-dir=${tmp}`,
    `--screenshot=${out}`,
    url,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  console.log(`${out.replace(ROOT + '/', '')}  <-  "${title}"${art ? '  [' + art + ']' : ''}`);
  count++;
}

if (missingArt.length) {
  console.warn(`\nNo artwork found on the blog index for: ${missingArt.join(', ')}` +
               `\nThose cards fell back to the plain layout.`);
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${count} Open Graph cards written to assets/og/`);
