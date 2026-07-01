# Resourcee Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium 7-page static website for Resourcee (nearshore LATAM talent for US engineering teams) using plain HTML/CSS/JS.

**Architecture:** One HTML file per page sharing a single `css/styles.css` and `js/main.js`. CSS uses custom properties for the design system. No build step — open files directly in a browser or serve with any static host.

**Tech Stack:** HTML5, CSS3, Vanilla JS (ES6+), Inter font via Google Fonts, inline SVG icons.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Homepage — all 9 sections |
| `services.html` | Services detail page |
| `how-it-works.html` | Expanded process + FAQ |
| `about.html` | Founding story + team + values |
| `contact.html` | Contact form + calendar embed |
| `blog/index.html` | Blog listing grid |
| `blog/sample-post.html` | Blog post template |
| `css/styles.css` | Design system tokens + all component + page styles |
| `js/main.js` | Mobile nav toggle, scroll fade-in, contact form handler |
| `assets/map-americas.svg` | Americas SVG map used in "Why South America" section |

---

## Task 1: Project Setup & Design System

**Files:**
- Create: `css/styles.css`
- Create: `index.html` (shell only)

- [ ] Create the folder structure:
```bash
mkdir -p css js assets blog
```

- [ ] Create `css/styles.css` with the full design system:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue-primary: #1C4ED8;
  --blue-light:   #EEF2FF;
  --blue-border:  #C7D7F8;
  --navy:         #0F172A;
  --body-color:   #475569;
  --muted:        #94A3B8;
  --surface:      #F8FAFF;
  --white:        #FFFFFF;
  --green:        #10B981;

  --max-width: 1200px;
  --section-v: 96px;
  --card-radius: 12px;
  --card-shadow: 0 4px 24px rgba(28,78,216,0.08);
  --card-shadow-lg: 0 8px 40px rgba(28,78,216,0.12);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--body-color);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

/* ── Typography ── */
h1 { font-size: clamp(36px, 5vw, 52px); font-weight: 800; color: var(--navy); line-height: 1.1; letter-spacing: -1.5px; }
h2 { font-size: clamp(28px, 4vw, 38px); font-weight: 800; color: var(--navy); line-height: 1.15; letter-spacing: -1px; }
h3 { font-size: 20px; font-weight: 700; color: var(--navy); }
p  { color: var(--body-color); }

.label {
  font-size: 12px; font-weight: 600; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--muted);
  display: block; margin-bottom: 12px;
}
.subtitle { font-size: 17px; color: var(--body-color); line-height: 1.6; }

/* ── Layout ── */
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 32px; }
.section    { padding: var(--section-v) 0; }
.section--surface { background: var(--surface); }
.section--navy    { background: var(--navy); }
.section--blue    { background: var(--blue-primary); }

/* ── Buttons ── */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 15px; font-weight: 600; border-radius: 8px;
  padding: 13px 28px; cursor: pointer; transition: opacity .15s, transform .15s;
  text-decoration: none; border: none;
}
.btn:hover { opacity: .88; transform: translateY(-1px); }
.btn--primary { background: var(--blue-primary); color: #fff; }
.btn--outline  { background: #fff; color: var(--blue-primary); border: 1.5px solid var(--blue-border); }
.btn--white    { background: #fff; color: var(--blue-primary); }
.btn--sm { font-size: 13px; padding: 9px 18px; }

/* ── Cards ── */
.card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 28px;
}

/* ── Eyebrow pill ── */
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--blue-light); color: var(--blue-primary);
  font-size: 12px; font-weight: 600; letter-spacing: 1px;
  text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
  margin-bottom: 20px;
}
.eyebrow-dot {
  width: 7px; height: 7px; background: var(--blue-primary);
  border-radius: 50%; animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.5; transform:scale(1.3); }
}

/* ── Tag pill ── */
.tag {
  background: var(--blue-light); color: var(--blue-primary);
  font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 100px;
}

/* ── Scroll fade-in ── */
.fade-in { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; }
.fade-in.visible { opacity: 1; transform: none; }

/* ── Responsive grid helpers ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2,1fr); }
  .grid-3 { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  :root { --section-v: 56px; }
  .container { padding: 0 20px; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  h1 { font-size: 32px; }
  h2 { font-size: 26px; }
}
```

- [ ] Create `index.html` shell (nav + empty main + footer placeholders):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resourcee — Elite South American Talent for US Engineering Teams</title>
  <meta name="description" content="We connect US companies with the top 3% of South American engineering, design, and operations talent. Built by engineers, for engineering teams."/>
  <link rel="stylesheet" href="css/styles.css"/>
</head>
<body>
  <!-- NAV -->
  <!-- HERO -->
  <!-- TRUST BAR -->
  <!-- PILLARS -->
  <!-- SERVICES -->
  <!-- HOW IT WORKS -->
  <!-- WHY LATAM -->
  <!-- TESTIMONIALS -->
  <!-- FINAL CTA -->
  <!-- FOOTER -->
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] Open `index.html` in browser — should be a blank white page with no console errors.

- [ ] Commit:
```bash
git init
git add css/styles.css index.html
git commit -m "feat: project setup and design system"
```

---

## Task 2: Navigation Component

**Files:**
- Modify: `css/styles.css` (append nav styles)
- Modify: `index.html` (fill NAV comment)

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   NAV
══════════════════════════════ */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #E2E8F0;
  height: 64px;
}
.nav__inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 100%; max-width: var(--max-width); margin: 0 auto; padding: 0 32px;
}
.nav__logo {
  font-size: 20px; font-weight: 800; color: var(--blue-primary);
  text-decoration: none; letter-spacing: -0.5px;
}
.nav__logo span { color: var(--navy); }
.nav__links {
  display: flex; gap: 32px; list-style: none;
}
.nav__links a {
  font-size: 14px; font-weight: 500; color: var(--body-color);
  text-decoration: none; transition: color .15s;
}
.nav__links a:hover { color: var(--blue-primary); }
.nav__cta { display: flex; align-items: center; gap: 12px; }

/* Hamburger */
.nav__burger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; padding: 4px; background: none; border: none;
}
.nav__burger span {
  display: block; width: 22px; height: 2px;
  background: var(--navy); border-radius: 2px; transition: .3s;
}

/* Mobile drawer */
.nav__drawer {
  display: none; flex-direction: column; gap: 0;
  background: #fff; border-bottom: 1px solid #E2E8F0;
  padding: 8px 0;
}
.nav__drawer.open { display: flex; }
.nav__drawer a {
  padding: 14px 32px; font-size: 15px; font-weight: 500;
  color: var(--body-color); text-decoration: none;
  border-bottom: 1px solid #F1F5F9;
}
.nav__drawer a:hover { color: var(--blue-primary); }
.nav__drawer .btn { margin: 12px 32px; }

@media (max-width: 768px) {
  .nav__links, .nav__cta { display: none; }
  .nav__burger { display: flex; }
}
```

- [ ] Replace the `<!-- NAV -->` comment in `index.html` with:
```html
<header>
  <nav class="nav">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">resource<span>e</span></a>
      <ul class="nav__links">
        <li><a href="services.html">Services</a></li>
        <li><a href="how-it-works.html">How It Works</a></li>
        <li><a href="blog/index.html">Blog</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="nav__cta">
        <a href="contact.html" class="btn btn--primary btn--sm">Schedule a Call →</a>
      </div>
      <button class="nav__burger" id="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav__drawer" id="drawer">
    <a href="services.html">Services</a>
    <a href="how-it-works.html">How It Works</a>
    <a href="blog/index.html">Blog</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn btn--primary btn--sm">Schedule a Call →</a>
  </div>
</header>
```

- [ ] Create `js/main.js` with the nav toggle:
```js
// Mobile nav
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => drawer.classList.toggle('open'));
}

// Scroll fade-in
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

- [ ] Open `index.html` in browser. Sticky nav should appear with logo and links. Resize to mobile — hamburger appears and drawer opens/closes on click.

- [ ] Commit:
```bash
git add css/styles.css index.html js/main.js
git commit -m "feat: navigation with mobile drawer"
```

---

## Task 3: Footer Component

**Files:**
- Modify: `css/styles.css` (append footer styles)
- Modify: `index.html` (fill FOOTER comment)

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   FOOTER
══════════════════════════════ */
.footer {
  background: var(--navy); color: rgba(255,255,255,0.6);
  padding: 48px 0 32px;
}
.footer__top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 40px; flex-wrap: wrap; margin-bottom: 40px;
}
.footer__logo {
  font-size: 20px; font-weight: 800; color: #fff;
  text-decoration: none; display: block; margin-bottom: 8px;
}
.footer__logo span { color: var(--blue-primary); }
.footer__tagline { font-size: 13px; max-width: 200px; line-height: 1.5; }
.footer__links { display: flex; gap: 48px; flex-wrap: wrap; }
.footer__col h4 { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
.footer__col a  { display: block; font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none; margin-bottom: 10px; transition: color .15s; }
.footer__col a:hover { color: #fff; }
.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
  font-size: 13px;
}
.footer__bottom a { color: rgba(255,255,255,0.4); text-decoration: none; }
.footer__bottom a:hover { color: #fff; }
.footer__social { display: flex; gap: 16px; }
.footer__social a {
  width: 36px; height: 36px; border-radius: 8px;
  background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: background .15s;
}
.footer__social a:hover { background: var(--blue-primary); color: #fff; }

@media (max-width: 768px) {
  .footer__top { flex-direction: column; }
  .footer__links { gap: 32px; }
  .footer__bottom { flex-direction: column; align-items: flex-start; }
}
```

- [ ] Replace `<!-- FOOTER -->` in `index.html` with:
```html
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <a href="index.html" class="footer__logo">resource<span>e</span></a>
        <p class="footer__tagline">Elite South American talent for US engineering teams.</p>
      </div>
      <div class="footer__links">
        <div class="footer__col">
          <h4>Services</h4>
          <a href="services.html#nearshore">Nearshore Staffing</a>
          <a href="services.html#remote-hiring">Remote Hiring</a>
          <a href="services.html#talent-acquisition">Talent Acquisition</a>
          <a href="services.html#team-pods">Team Pods</a>
          <a href="services.html#consulting">Consulting</a>
        </div>
        <div class="footer__col">
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="how-it-works.html">How It Works</a>
          <a href="blog/index.html">Blog</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
      <div class="footer__social">
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="Twitter">𝕏</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Resourcee. All rights reserved.</span>
      <div style="display:flex;gap:24px;">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

- [ ] Open `index.html` — dark navy footer visible at bottom with logo, links, and social icons.

- [ ] Commit:
```bash
git add css/styles.css index.html
git commit -m "feat: footer component"
```

---

## Task 4: Homepage — Hero Section

**Files:**
- Modify: `css/styles.css` (append hero styles)
- Modify: `index.html` (fill HERO comment)

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   HERO
══════════════════════════════ */
.hero {
  padding: 80px 0 72px;
  border-bottom: 1px solid #E2E8F0;
}
.hero__grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
.hero__sub {
  font-size: 17px; color: var(--body-color); line-height: 1.65;
  margin: 20px 0 36px; max-width: 480px;
}
.hero__ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.hero__stats {
  display: flex; gap: 36px; flex-wrap: wrap;
  padding-top: 36px; border-top: 1px solid #E2E8F0;
}
.hero__stat-num {
  font-size: 30px; font-weight: 800; color: var(--navy); letter-spacing: -1px;
}
.hero__stat-num span { color: var(--blue-primary); }
.hero__stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; font-weight: 500; }

/* Hero visual panel */
.hero__visual {
  background: linear-gradient(135deg, var(--blue-light) 0%, #F0F9FF 100%);
  border-radius: 20px; padding: 28px;
  border: 1px solid var(--blue-border); position: relative;
}
.hero__match-badge {
  position: absolute; top: -12px; right: 24px;
  background: var(--green); color: #fff;
  font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 100px;
}
.candidate-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 18px; margin-bottom: 10px;
}
.candidate-card__header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.avatar {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: #fff;
}
.avatar--blue   { background: linear-gradient(135deg,#1C4ED8,#60A5FA); }
.avatar--green  { background: linear-gradient(135deg,#10B981,#34D399); }
.avatar--purple { background: linear-gradient(135deg,#8B5CF6,#A78BFA); }
.candidate-name { font-size: 14px; font-weight: 700; color: var(--navy); }
.candidate-role { font-size: 12px; color: var(--muted); }
.candidate-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.hero__mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; }
.mini-card {
  background: #fff; border-radius: 10px; padding: 14px;
  box-shadow: var(--card-shadow); display: flex; align-items: center; gap: 10px;
}
.mini-icon {
  width: 36px; height: 36px; background: var(--blue-light);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.mini-label { font-size: 11px; color: var(--muted); }
.mini-value { font-size: 13px; font-weight: 700; color: var(--navy); }

@media (max-width: 1024px) {
  .hero__grid { grid-template-columns: 1fr; gap: 48px; }
  .hero__visual { max-width: 520px; }
  .hero__sub { max-width: 100%; }
}
@media (max-width: 768px) {
  .hero { padding: 48px 0; }
  .hero__stats { gap: 24px; }
  .hero__mini-grid { grid-template-columns: 1fr; }
}
```

- [ ] Replace `<!-- HERO -->` in `index.html` with:
```html
<section class="hero">
  <div class="container">
    <div class="hero__grid">
      <div class="hero__left">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          Built by Engineers · For Engineering Teams
        </div>
        <h1>Build world-class teams. <span style="color:var(--blue-primary)">At a fraction of the cost.</span></h1>
        <p class="hero__sub">We're engineers who got tired of bad hires. Resourcee connects US engineering teams with the top 3% of South American talent — in your timezone, speaking your language, ready in 2 weeks.</p>
        <div class="hero__ctas">
          <a href="contact.html" class="btn btn--primary">Schedule a Free Call →</a>
          <a href="how-it-works.html" class="btn btn--outline">See How It Works</a>
        </div>
        <div class="hero__stats">
          <div>
            <div class="hero__stat-num">500<span>+</span></div>
            <div class="hero__stat-label">Placements made</div>
          </div>
          <div>
            <div class="hero__stat-num">14<span> days</span></div>
            <div class="hero__stat-label">Avg. time to hire</div>
          </div>
          <div>
            <div class="hero__stat-num">60<span>%</span></div>
            <div class="hero__stat-label">Average cost savings</div>
          </div>
          <div>
            <div class="hero__stat-num">13<span>+</span></div>
            <div class="hero__stat-label">Countries sourced</div>
          </div>
        </div>
      </div>
      <div class="hero__visual fade-in">
        <div class="hero__match-badge">✓ 98% Match Rate</div>
        <div class="candidate-card">
          <div class="candidate-card__header">
            <div class="avatar avatar--blue">CM</div>
            <div>
              <div class="candidate-name">Carlos M.</div>
              <div class="candidate-role">Senior Full-Stack Engineer · Bogotá, Colombia</div>
            </div>
          </div>
          <div class="candidate-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
            <span class="tag">AWS</span>
            <span class="tag">7 yrs exp</span>
            <span class="tag">EST overlap</span>
          </div>
        </div>
        <div class="candidate-card">
          <div class="candidate-card__header">
            <div class="avatar avatar--green">AP</div>
            <div>
              <div class="candidate-name">Ana P.</div>
              <div class="candidate-role">Product Designer · Buenos Aires, Argentina</div>
            </div>
          </div>
          <div class="candidate-tags">
            <span class="tag">Figma</span>
            <span class="tag">UX Research</span>
            <span class="tag">Design Systems</span>
            <span class="tag">5 yrs exp</span>
          </div>
        </div>
        <div class="hero__mini-grid">
          <div class="mini-card">
            <div class="mini-icon">⚡</div>
            <div>
              <div class="mini-label">First interview</div>
              <div class="mini-value">Within 48 hrs</div>
            </div>
          </div>
          <div class="mini-card">
            <div class="mini-icon">🌎</div>
            <div>
              <div class="mini-label">Timezone overlap</div>
              <div class="mini-value">6–8 hrs/day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] Open `index.html` — verify two-column hero with candidate cards visible on the right. Check mobile layout stacks correctly.

- [ ] Commit:
```bash
git add css/styles.css index.html
git commit -m "feat: homepage hero section"
```

---

## Task 5: Homepage — Trust Bar & 4 Pillars

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   TRUST BAR
══════════════════════════════ */
.trust-bar { background: var(--surface); padding: 36px 0; border-bottom: 1px solid #E2E8F0; text-align: center; }
.trust-bar__label { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 24px; display: block; }
.trust-bar__logos { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
.trust-bar__logo {
  height: 28px; padding: 0 16px;
  background: #E2E8F0; border-radius: 4px;
  font-size: 12px; font-weight: 700; color: var(--muted);
  letter-spacing: 1px; display: flex; align-items: center;
}

/* ══════════════════════════════
   PILLARS
══════════════════════════════ */
.pillars__header { text-align: center; max-width: 680px; margin: 0 auto 56px; }
.pillars__header .subtitle { margin-top: 16px; }
.pillar-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 32px;
  border-top: 3px solid var(--blue-primary);
  transition: transform .2s, box-shadow .2s;
}
.pillar-card:hover { transform: translateY(-4px); box-shadow: var(--card-shadow-lg); }
.pillar-icon {
  width: 48px; height: 48px; background: var(--blue-light);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 20px;
}
.pillar-stat { font-size: 32px; font-weight: 800; color: var(--blue-primary); letter-spacing: -1px; margin-bottom: 4px; }
.pillar-name { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.pillar-desc { font-size: 14px; color: var(--body-color); line-height: 1.6; }
```

- [ ] Replace `<!-- TRUST BAR -->` in `index.html` with:
```html
<div class="trust-bar">
  <div class="container">
    <span class="trust-bar__label">Trusted by engineering teams at</span>
    <div class="trust-bar__logos">
      <div class="trust-bar__logo">ACME CORP</div>
      <div class="trust-bar__logo">TECHSTART</div>
      <div class="trust-bar__logo">BUILDCO</div>
      <div class="trust-bar__logo">LAUNCHPAD</div>
      <div class="trust-bar__logo">SCALEUP</div>
    </div>
  </div>
</div>
```

- [ ] Replace `<!-- PILLARS -->` in `index.html` with:
```html
<section class="section">
  <div class="container">
    <div class="pillars__header fade-in">
      <span class="label">Why Resourcee</span>
      <h2>Everything you need. None of the compromise.</h2>
      <p class="subtitle">We're engineers who built and scaled technical teams. We know what a great hire looks like — and what a bad one costs.</p>
    </div>
    <div class="grid-4">
      <div class="pillar-card fade-in">
        <div class="pillar-icon">⚡</div>
        <div class="pillar-stat">14 days</div>
        <div class="pillar-name">Speed</div>
        <p class="pillar-desc">From kickoff to first day on the job. We move fast so you don't miss your roadmap.</p>
      </div>
      <div class="pillar-card fade-in">
        <div class="pillar-icon">✦</div>
        <div class="pillar-stat">Top 3%</div>
        <div class="pillar-name">Quality</div>
        <p class="pillar-desc">Multi-stage vetting: technical screen, English fluency, culture fit. Only the best make it through.</p>
      </div>
      <div class="pillar-card fade-in">
        <div class="pillar-icon">🤝</div>
        <div class="pillar-stat">Dedicated</div>
        <div class="pillar-name">Partnership</div>
        <p class="pillar-desc">A dedicated account manager handles compliance, onboarding, payroll, and ongoing success.</p>
      </div>
      <div class="pillar-card fade-in">
        <div class="pillar-icon">💡</div>
        <div class="pillar-stat">60% less</div>
        <div class="pillar-name">Cost Savings</div>
        <p class="pillar-desc">Senior engineers at half the US rate — without cutting corners on skill or experience.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] Open browser — verify 4 pillar cards with blue top border, hover lift effect, and stat numbers in blue.

- [ ] Commit:
```bash
git add css/styles.css index.html
git commit -m "feat: trust bar and pillars sections"
```

---

## Task 6: Homepage — Services Grid

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   SERVICES GRID
══════════════════════════════ */
.services__header { text-align: center; max-width: 600px; margin: 0 auto 52px; }
.service-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 28px;
  display: flex; flex-direction: column;
  transition: transform .2s, box-shadow .2s;
  border: 1px solid transparent;
}
.service-card:hover {
  transform: translateY(-3px); box-shadow: var(--card-shadow-lg);
  border-color: var(--blue-border);
}
.service-icon {
  width: 44px; height: 44px; background: var(--blue-light);
  border-radius: 10px; display: flex; align-items: center;
  justify-content: center; font-size: 20px; margin-bottom: 18px;
}
.service-card h3 { font-size: 17px; margin-bottom: 10px; }
.service-card p  { font-size: 14px; line-height: 1.65; flex: 1; }
.service-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: var(--blue-primary);
  text-decoration: none; margin-top: 18px; transition: gap .15s;
}
.service-link:hover { gap: 8px; }
```

- [ ] Replace `<!-- SERVICES -->` in `index.html` with:
```html
<section class="section section--surface">
  <div class="container">
    <div class="services__header fade-in">
      <span class="label">What We Do</span>
      <h2>Six ways we can build your team</h2>
    </div>
    <div class="grid-3">
      <div class="service-card fade-in">
        <div class="service-icon">🌐</div>
        <h3>Nearshore Staffing</h3>
        <p>Integrated remote team members working in overlapping time zones, fully embedded in your culture and workflow.</p>
        <a href="services.html#nearshore" class="service-link">Learn more →</a>
      </div>
      <div class="service-card fade-in">
        <div class="service-icon">🎯</div>
        <h3>Remote Hiring</h3>
        <p>We source, vet, and place top candidates directly onto your payroll. You own the relationship — we do the heavy lifting.</p>
        <a href="services.html#remote-hiring" class="service-link">Learn more →</a>
      </div>
      <div class="service-card fade-in">
        <div class="service-icon">🔍</div>
        <h3>Talent Acquisition</h3>
        <p>End-to-end recruiting pipeline and candidate assessment for any role, any seniority, across 13 LATAM countries.</p>
        <a href="services.html#talent-acquisition" class="service-link">Learn more →</a>
      </div>
      <div class="service-card fade-in">
        <div class="service-icon">⚙️</div>
        <h3>Team Pods</h3>
        <p>Dedicated cross-functional groups — dev, design, QA, PM — with built-in management support and a single point of contact.</p>
        <a href="services.html#team-pods" class="service-link">Learn more →</a>
      </div>
      <div class="service-card fade-in">
        <div class="service-icon">📋</div>
        <h3>Recruiting Consulting</h3>
        <p>Strategic guidance on building remote-first hiring processes and scalable LATAM talent programs for your organization.</p>
        <a href="services.html#consulting" class="service-link">Learn more →</a>
      </div>
      <div class="service-card fade-in">
        <div class="service-icon">💻</div>
        <h3>Technology Consulting</h3>
        <p>Architecture review, modernization roadmaps, and digital transformation projects led by senior technical experts.</p>
        <a href="services.html#tech-consulting" class="service-link">Learn more →</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] Open browser — 6 service cards in a 3-column grid on a light surface background. Hover lifts cards.

- [ ] Commit:
```bash
git add css/styles.css index.html
git commit -m "feat: services grid section"
```

---

## Task 7: Homepage — How It Works & Why South America

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`
- Create: `assets/map-americas.svg`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   HOW IT WORKS (homepage)
══════════════════════════════ */
.hiw__header { text-align: center; max-width: 600px; margin: 0 auto 56px; }
.hiw__steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; position: relative; }
.hiw__steps::before {
  content: ''; position: absolute;
  top: 28px; left: calc(12.5% + 28px); right: calc(12.5% + 28px);
  height: 2px; background: var(--blue-border);
}
.hiw__step { text-align: center; padding: 0 16px; position: relative; }
.hiw__num {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--blue-primary); color: #fff;
  font-size: 18px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; position: relative; z-index: 1;
}
.hiw__step h3 { font-size: 16px; margin-bottom: 8px; }
.hiw__step p  { font-size: 13px; line-height: 1.6; color: var(--muted); }
.hiw__note { text-align: center; margin-top: 40px; font-size: 14px; color: var(--muted); font-style: italic; }

/* ══════════════════════════════
   WHY LATAM
══════════════════════════════ */
.latam__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.latam__header { margin-bottom: 36px; }
.latam__header h2 { margin-bottom: 12px; }
.latam__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.latam-stat {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 20px 24px;
}
.latam-stat__num { font-size: 28px; font-weight: 800; color: var(--blue-primary); letter-spacing: -1px; }
.latam-stat__label { font-size: 13px; color: var(--muted); margin-top: 4px; }
.latam__map { width: 100%; max-width: 420px; margin: 0 auto; display: block; }

@media (max-width: 1024px) {
  .hiw__steps { grid-template-columns: repeat(2,1fr); gap: 32px; }
  .hiw__steps::before { display: none; }
  .latam__grid { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 768px) {
  .hiw__steps { grid-template-columns: 1fr; }
}
```

- [ ] Create `assets/map-americas.svg` — a clean minimalist SVG of the Americas with pulsing city dots:
```svg
<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style="width:100%">
  <style>
    .land { fill: #EEF2FF; stroke: #C7D7F8; stroke-width: 1; }
    .city-ring { fill: none; stroke: #1C4ED8; stroke-width: 1.5; opacity: 0; animation: ripple 2.5s infinite; }
    .city-dot  { fill: #1C4ED8; }
    @keyframes ripple {
      0%   { r: 4px;  opacity: .8; }
      100% { r: 12px; opacity: 0; }
    }
  </style>
  <!-- Simplified North America -->
  <path class="land" d="M60,20 L200,15 L240,60 L220,100 L180,110 L160,130 L120,120 L80,100 L50,70 Z"/>
  <!-- Mexico -->
  <path class="land" d="M100,120 L160,130 L170,155 L140,170 L110,155 L95,135 Z"/>
  <!-- Central America -->
  <path class="land" d="M130,170 L150,165 L155,185 L140,190 L125,182 Z"/>
  <!-- Colombia / Venezuela -->
  <path class="land" d="M130,195 L185,188 L200,205 L185,225 L155,230 L130,215 Z"/>
  <!-- Brazil -->
  <path class="land" d="M185,200 L260,195 L285,230 L275,290 L240,310 L200,305 L175,275 L165,240 L178,218 Z"/>
  <!-- Peru / Ecuador -->
  <path class="land" d="M120,220 L150,215 L160,250 L148,280 L128,270 L112,248 Z"/>
  <!-- Bolivia -->
  <path class="land" d="M150,255 L180,248 L185,278 L162,285 L148,272 Z"/>
  <!-- Argentina / Chile -->
  <path class="land" d="M130,275 L175,270 L185,310 L175,360 L160,400 L145,430 L135,380 L125,330 L120,295 Z"/>

  <!-- City dots with ripple: Bogotá -->
  <circle class="city-ring" cx="155" cy="210" r="4" style="animation-delay:0s"/>
  <circle class="city-dot" cx="155" cy="210" r="5"/>

  <!-- Buenos Aires -->
  <circle class="city-ring" cx="162" cy="355" r="4" style="animation-delay:.6s"/>
  <circle class="city-dot" cx="162" cy="355" r="5"/>

  <!-- São Paulo -->
  <circle class="city-ring" cx="240" cy="295" r="4" style="animation-delay:1.2s"/>
  <circle class="city-dot" cx="240" cy="295" r="5"/>

  <!-- Santiago -->
  <circle class="city-ring" cx="138" cy="340" r="4" style="animation-delay:1.8s"/>
  <circle class="city-dot" cx="138" cy="340" r="5"/>

  <!-- Lima -->
  <circle class="city-ring" cx="125" cy="255" r="4" style="animation-delay:2.1s"/>
  <circle class="city-dot" cx="125" cy="255" r="5"/>

  <!-- City labels -->
  <text x="162" y="208" font-size="9" fill="#1C4ED8" font-family="Inter,sans-serif" font-weight="600">Bogotá</text>
  <text x="168" y="353" font-size="9" fill="#1C4ED8" font-family="Inter,sans-serif" font-weight="600">Buenos Aires</text>
  <text x="246" y="293" font-size="9" fill="#1C4ED8" font-family="Inter,sans-serif" font-weight="600">São Paulo</text>
  <text x="100" y="338" font-size="9" fill="#1C4ED8" font-family="Inter,sans-serif" font-weight="600">Santiago</text>
  <text x="92" y="253" font-size="9" fill="#1C4ED8" font-family="Inter,sans-serif" font-weight="600">Lima</text>
</svg>
```

- [ ] Replace `<!-- HOW IT WORKS -->` in `index.html` with:
```html
<section class="section">
  <div class="container">
    <div class="hiw__header fade-in">
      <span class="label">The Process</span>
      <h2>From intro call to first day in 14 days.</h2>
    </div>
    <div class="hiw__steps">
      <div class="hiw__step fade-in">
        <div class="hiw__num">1</div>
        <h3>Discovery Call</h3>
        <p>We learn your stack, team culture, role requirements, and timeline. No generic intake forms.</p>
      </div>
      <div class="hiw__step fade-in">
        <div class="hiw__num">2</div>
        <h3>Talent Matching</h3>
        <p>We curate a shortlist of 3–5 vetted candidates within 48 hours. You review profiles, we arrange interviews.</p>
      </div>
      <div class="hiw__step fade-in">
        <div class="hiw__num">3</div>
        <h3>Interview & Select</h3>
        <p>Meet your candidates. We facilitate scheduling and provide debrief support. You choose who joins.</p>
      </div>
      <div class="hiw__step fade-in">
        <div class="hiw__num">4</div>
        <h3>Onboarding & Support</h3>
        <p>We handle contracts, compliance, and equipment. Your account manager stays with you ongoing.</p>
      </div>
    </div>
    <p class="hiw__note">Most clients make a hire within 14 days of their first call.</p>
  </div>
</section>
```

- [ ] Replace `<!-- WHY LATAM -->` in `index.html` with:
```html
<section class="section section--surface">
  <div class="container">
    <div class="latam__grid">
      <div class="fade-in">
        <div class="latam__header">
          <span class="label">The LATAM Advantage</span>
          <h2>South America's best engineers are in your timezone.</h2>
          <p class="subtitle" style="margin-top:12px">Tier-1 technical talent, culturally aligned, with 6–8 hours of daily overlap with US teams.</p>
        </div>
        <div class="latam__stats">
          <div class="latam-stat">
            <div class="latam-stat__num">6–8 hrs</div>
            <div class="latam-stat__label">Daily overlap with US East Coast</div>
          </div>
          <div class="latam-stat">
            <div class="latam-stat__num">300K+</div>
            <div class="latam-stat__label">STEM graduates per year across LATAM</div>
          </div>
          <div class="latam-stat">
            <div class="latam-stat__num">Top 10</div>
            <div class="latam-stat__label">Argentina & Brazil rank globally for dev skill</div>
          </div>
          <div class="latam-stat">
            <div class="latam-stat__num">40–60%</div>
            <div class="latam-stat__label">Cost savings vs. equivalent US talent</div>
          </div>
        </div>
      </div>
      <div class="fade-in">
        <img src="assets/map-americas.svg" alt="South American cities served by Resourcee" class="latam__map"/>
      </div>
    </div>
  </div>
</section>
```

- [ ] Open browser — verify 4-step timeline with numbered circles, and the LATAM two-column section with SVG map on the right. City dots should pulse.

- [ ] Commit:
```bash
git add css/styles.css index.html assets/map-americas.svg
git commit -m "feat: how it works and why LATAM sections"
```

---

## Task 8: Homepage — Testimonials & Final CTA

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   TESTIMONIALS
══════════════════════════════ */
.testimonials__header { text-align: center; max-width: 560px; margin: 0 auto 52px; }
.testimonial-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 32px;
  display: flex; flex-direction: column;
}
.testimonial-quote { font-size: 40px; color: var(--blue-light); line-height: 1; margin-bottom: 12px; font-family: Georgia,serif; }
.testimonial-text { font-size: 15px; line-height: 1.7; color: var(--body-color); flex: 1; font-style: italic; }
.testimonial-author { margin-top: 24px; display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--blue-light); color: var(--blue-primary);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.testimonial-name  { font-size: 14px; font-weight: 700; color: var(--navy); }
.testimonial-role  { font-size: 12px; color: var(--muted); }

/* ══════════════════════════════
   FINAL CTA
══════════════════════════════ */
.final-cta { background: var(--blue-primary); padding: 96px 0; text-align: center; }
.final-cta h2 { color: #fff; margin-bottom: 16px; }
.final-cta p  { color: rgba(255,255,255,.7); font-size: 17px; max-width: 480px; margin: 0 auto 36px; }
.final-cta__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.final-cta__note { margin-top: 16px; font-size: 13px; color: rgba(255,255,255,.5); }
.final-cta__note a { color: rgba(255,255,255,.7); text-decoration: underline; }
```

- [ ] Replace `<!-- TESTIMONIALS -->` in `index.html` with:
```html
<section class="section">
  <div class="container">
    <div class="testimonials__header fade-in">
      <span class="label">Client Stories</span>
      <h2>Don't take our word for it.</h2>
    </div>
    <div class="grid-3">
      <div class="testimonial-card fade-in">
        <div class="testimonial-quote">❝</div>
        <p class="testimonial-text">Resourcee placed our entire backend team in under three weeks. Every engineer has been exceptional — technically sharp, great communicators, and fully in sync with our timezone.</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">JR</div>
          <div>
            <div class="testimonial-name">James R.</div>
            <div class="testimonial-role">CTO · Series B SaaS</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card fade-in">
        <div class="testimonial-quote">❝</div>
        <p class="testimonial-text">The quality of candidates blew us away. We've hired through four agencies before — Resourcee is in a completely different league. We now hire exclusively through them for LATAM roles.</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">SM</div>
          <div>
            <div class="testimonial-name">Sarah M.</div>
            <div class="testimonial-role">VP Engineering · Fintech Startup</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card fade-in">
        <div class="testimonial-quote">❝</div>
        <p class="testimonial-text">Our dedicated account manager made the whole process seamless. It's the best hiring experience we've ever had — and we saved over $800K in salary costs in year one.</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">AC</div>
          <div>
            <div class="testimonial-name">Alex C.</div>
            <div class="testimonial-role">Founder & CEO · E-commerce Platform</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] Replace `<!-- FINAL CTA -->` in `index.html` with:
```html
<section class="final-cta">
  <div class="container">
    <h2>Ready to build your dream team in South America?</h2>
    <p>Free 30-minute strategy call. No commitment. We'll tell you exactly what's possible for your team.</p>
    <div class="final-cta__actions">
      <a href="contact.html" class="btn btn--white">Schedule Your Free Call →</a>
    </div>
    <p class="final-cta__note">Or email us at <a href="mailto:hello@resourcee.co">hello@resourcee.co</a></p>
  </div>
</section>
```

- [ ] Open browser — verify 3 testimonial cards and blue CTA section. Full homepage scroll should now be complete.

- [ ] Commit:
```bash
git add css/styles.css index.html
git commit -m "feat: testimonials and final CTA — homepage complete"
```

---

## Task 9: Services Page

**Files:**
- Create: `services.html`
- Modify: `css/styles.css`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   PAGE HERO (inner pages)
══════════════════════════════ */
.page-hero {
  background: var(--surface); border-bottom: 1px solid #E2E8F0;
  padding: 72px 0 64px; text-align: center;
}
.page-hero .eyebrow { justify-content: center; }
.page-hero h1 { font-size: clamp(30px,4vw,44px); margin: 0 auto 16px; max-width: 700px; }
.page-hero p  { font-size: 18px; color: var(--body-color); max-width: 560px; margin: 0 auto 32px; }

/* ══════════════════════════════
   SERVICE DETAIL ROW
══════════════════════════════ */
.service-detail {
  display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
  align-items: center; padding: 72px 0;
  border-bottom: 1px solid #E2E8F0;
}
.service-detail:nth-child(even) .service-detail__visual { order: -1; }
.service-detail__icon {
  width: 56px; height: 56px; background: var(--blue-light);
  border-radius: 14px; display: flex; align-items: center;
  justify-content: center; font-size: 26px; margin-bottom: 20px;
}
.service-detail h2 { font-size: 28px; margin-bottom: 14px; }
.service-detail p  { margin-bottom: 16px; font-size: 15px; line-height: 1.7; }
.service-outcomes { list-style: none; margin: 20px 0 28px; }
.service-outcomes li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: var(--body-color); margin-bottom: 10px;
}
.service-outcomes li::before {
  content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px;
}
.service-detail__visual {
  background: var(--blue-light); border-radius: 16px;
  padding: 40px; display: flex; flex-direction: column; gap: 12px;
  border: 1px solid var(--blue-border);
}
.service-stat-box {
  background: #fff; border-radius: 10px; padding: 20px;
  box-shadow: var(--card-shadow);
}
.service-stat-box__num { font-size: 32px; font-weight: 800; color: var(--blue-primary); letter-spacing: -1px; }
.service-stat-box__label { font-size: 13px; color: var(--muted); margin-top: 4px; }

@media (max-width: 1024px) {
  .service-detail { grid-template-columns: 1fr; gap: 36px; }
  .service-detail:nth-child(even) .service-detail__visual { order: unset; }
}
```

- [ ] Create `services.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Services — Resourcee</title>
  <meta name="description" content="Six ways Resourcee helps US companies build elite South American engineering teams."/>
  <link rel="stylesheet" href="css/styles.css"/>
</head>
<body>

<header>
  <nav class="nav">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">resource<span>e</span></a>
      <ul class="nav__links">
        <li><a href="services.html">Services</a></li>
        <li><a href="how-it-works.html">How It Works</a></li>
        <li><a href="blog/index.html">Blog</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="nav__cta">
        <a href="contact.html" class="btn btn--primary btn--sm">Schedule a Call →</a>
      </div>
      <button class="nav__burger" id="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav__drawer" id="drawer">
    <a href="services.html">Services</a>
    <a href="how-it-works.html">How It Works</a>
    <a href="blog/index.html">Blog</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn btn--primary btn--sm">Schedule a Call →</a>
  </div>
</header>

<section class="page-hero">
  <div class="container">
    <div class="eyebrow"><span class="eyebrow-dot"></span>What We Offer</div>
    <h1>Six services. One mission: build your perfect team.</h1>
    <p>Whether you need one senior engineer or an entire cross-functional pod, we have a model that fits.</p>
    <a href="contact.html" class="btn btn--primary">Schedule a Free Call →</a>
  </div>
</section>

<main>
  <div class="container">

    <div class="service-detail fade-in" id="nearshore">
      <div>
        <div class="service-detail__icon">🌐</div>
        <span class="label">Service 01</span>
        <h2>Nearshore Staffing</h2>
        <p>Integrated remote team members working in overlapping time zones, fully embedded in your culture, tools, and workflow. They show up to your standups, use your Slack, and ship your product.</p>
        <p>Unlike offshore models, nearshore means real-time collaboration — no async bottlenecks, no communication lag.</p>
        <ul class="service-outcomes">
          <li>Works in your timezone (EST/CST/PST — 6–8 hr overlap)</li>
          <li>Onboarded to your stack, tools, and team rituals</li>
          <li>Fully managed compliance, payroll, and HR by Resourcee</li>
          <li>Dedicated account manager for ongoing success</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Get Started →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">6–8 hrs</div>
          <div class="service-stat-box__label">Daily timezone overlap with US teams</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">Day 1</div>
          <div class="service-stat-box__label">Ready to commit code from day one</div>
        </div>
      </div>
    </div>

    <div class="service-detail fade-in" id="remote-hiring">
      <div>
        <div class="service-detail__icon">🎯</div>
        <span class="label">Service 02</span>
        <h2>Remote Hiring</h2>
        <p>We source, vet, and place top candidates directly onto your payroll. You own the relationship — Resourcee does the heavy lifting of finding, screening, and qualifying talent across 13 LATAM countries.</p>
        <p>Ideal for companies that want full control of the employment relationship but don't want to manage a cross-border recruiting operation.</p>
        <ul class="service-outcomes">
          <li>Candidate shortlist delivered within 48 hours</li>
          <li>Multi-stage vetting: technical, English, culture</li>
          <li>Direct employee relationship — you own it</li>
          <li>90-day replacement guarantee</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Start Hiring →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">48 hrs</div>
          <div class="service-stat-box__label">Shortlist delivered after kickoff call</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">90 days</div>
          <div class="service-stat-box__label">Replacement guarantee on every placement</div>
        </div>
      </div>
    </div>

    <div class="service-detail fade-in" id="talent-acquisition">
      <div>
        <div class="service-detail__icon">🔍</div>
        <span class="label">Service 03</span>
        <h2>Talent Acquisition</h2>
        <p>End-to-end recruiting pipeline for any role, any seniority. We act as your dedicated recruiting function — sourcing, screening, coordinating interviews, and managing offers across 13 LATAM countries.</p>
        <ul class="service-outcomes">
          <li>Roles from junior to C-level across engineering, design, ops</li>
          <li>Full ATS integration with your existing tools</li>
          <li>Candidate debrief and negotiation support</li>
          <li>Scales with your hiring volume — no retainer required</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Learn More →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">13+</div>
          <div class="service-stat-box__label">Countries sourced across Latin America</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">Top 3%</div>
          <div class="service-stat-box__label">Only the top candidates make our shortlist</div>
        </div>
      </div>
    </div>

    <div class="service-detail fade-in" id="team-pods">
      <div>
        <div class="service-detail__icon">⚙️</div>
        <span class="label">Service 04</span>
        <h2>Team Pods</h2>
        <p>Dedicated cross-functional groups — developers, designers, QA, and product management — delivered as a single managed unit with a built-in team lead and a single Resourcee point of contact.</p>
        <p>Ideal for startups that need to ship fast without building a full internal team, or for companies launching a new product line.</p>
        <ul class="service-outcomes">
          <li>Pre-formed teams ready to sprint in week one</li>
          <li>Built-in tech lead and project coordination</li>
          <li>Scales up or down as your roadmap changes</li>
          <li>Single invoice, single point of contact</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Build a Pod →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">Week 1</div>
          <div class="service-stat-box__label">Teams ready to sprint from week one</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">1</div>
          <div class="service-stat-box__label">Single point of contact for the entire pod</div>
        </div>
      </div>
    </div>

    <div class="service-detail fade-in" id="consulting">
      <div>
        <div class="service-detail__icon">📋</div>
        <span class="label">Service 05</span>
        <h2>Recruiting Consulting</h2>
        <p>Strategic guidance on building remote-first hiring processes and scalable LATAM talent programs. We help you design the operating model so you can hire independently at scale.</p>
        <ul class="service-outcomes">
          <li>Remote hiring playbook tailored to your company</li>
          <li>Interviewing frameworks for distributed teams</li>
          <li>Compensation benchmarking across LATAM markets</li>
          <li>Compliance and legal structure recommendations</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Schedule a Consult →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">Custom</div>
          <div class="service-stat-box__label">Every engagement is tailored to your team</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">Ongoing</div>
          <div class="service-stat-box__label">Retained advisory or project-based</div>
        </div>
      </div>
    </div>

    <div class="service-detail fade-in" id="tech-consulting">
      <div>
        <div class="service-detail__icon">💻</div>
        <span class="label">Service 06</span>
        <h2>Technology Consulting</h2>
        <p>Architecture reviews, modernization roadmaps, and digital transformation projects led by senior technical experts from our network. Ideal for companies facing a major technical inflection point.</p>
        <ul class="service-outcomes">
          <li>Architecture review and technical due diligence</li>
          <li>Modernization roadmaps for legacy systems</li>
          <li>AI/ML integration strategy</li>
          <li>Engineering team assessment and process improvement</li>
        </ul>
        <a href="contact.html" class="btn btn--primary">Talk to an Expert →</a>
      </div>
      <div class="service-detail__visual">
        <div class="service-stat-box">
          <div class="service-stat-box__num">Senior</div>
          <div class="service-stat-box__label">Only principal-level and staff engineers</div>
        </div>
        <div class="service-stat-box">
          <div class="service-stat-box__num">Flexible</div>
          <div class="service-stat-box__label">Hourly advisory or full engagement</div>
        </div>
      </div>
    </div>

  </div>
</main>

<section class="final-cta">
  <div class="container">
    <h2>Not sure which service fits?</h2>
    <p>Book a 30-minute call and we'll tell you exactly what we'd recommend for your team size, budget, and timeline.</p>
    <div class="final-cta__actions">
      <a href="contact.html" class="btn btn--white">Schedule a Free Call →</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <a href="index.html" class="footer__logo">resource<span>e</span></a>
        <p class="footer__tagline">Elite South American talent for US engineering teams.</p>
      </div>
      <div class="footer__links">
        <div class="footer__col">
          <h4>Services</h4>
          <a href="services.html#nearshore">Nearshore Staffing</a>
          <a href="services.html#remote-hiring">Remote Hiring</a>
          <a href="services.html#talent-acquisition">Talent Acquisition</a>
          <a href="services.html#team-pods">Team Pods</a>
          <a href="services.html#consulting">Consulting</a>
        </div>
        <div class="footer__col">
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="how-it-works.html">How It Works</a>
          <a href="blog/index.html">Blog</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
      <div class="footer__social">
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="Twitter">𝕏</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Resourcee. All rights reserved.</span>
      <div style="display:flex;gap:24px;">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Open `services.html` in browser — verify 6 alternating two-column rows, anchor links work from nav.

- [ ] Commit:
```bash
git add services.html css/styles.css
git commit -m "feat: services page"
```

---

## Task 10: How It Works Page

**Files:**
- Create: `how-it-works.html`
- Modify: `css/styles.css`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   HOW IT WORKS PAGE
══════════════════════════════ */
.hiw-row {
  display: grid; grid-template-columns: 80px 1fr; gap: 32px;
  padding: 56px 0; border-bottom: 1px solid #E2E8F0; align-items: start;
}
.hiw-row__num {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--blue-primary); color: #fff;
  font-size: 22px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hiw-row h3 { font-size: 22px; margin-bottom: 12px; }
.hiw-row p  { font-size: 15px; line-height: 1.75; margin-bottom: 12px; }
.hiw-row .tag { margin-right: 6px; }

/* FAQ */
.faq { max-width: 720px; margin: 0 auto; }
.faq__item { border-bottom: 1px solid #E2E8F0; }
.faq__question {
  width: 100%; background: none; border: none; text-align: left;
  padding: 20px 0; font-size: 16px; font-weight: 600; color: var(--navy);
  cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.faq__question::after { content: '+'; font-size: 20px; color: var(--blue-primary); flex-shrink: 0; transition: transform .2s; }
.faq__item.open .faq__question::after { transform: rotate(45deg); }
.faq__answer { display: none; padding-bottom: 20px; font-size: 15px; line-height: 1.7; color: var(--body-color); }
.faq__item.open .faq__answer { display: block; }

@media (max-width: 768px) {
  .hiw-row { grid-template-columns: 1fr; }
  .hiw-row__num { width: 48px; height: 48px; font-size: 18px; }
}
```

- [ ] Create `how-it-works.html` — use the same nav/footer pattern as `services.html`, with this main content:
```html
<section class="page-hero">
  <div class="container">
    <div class="eyebrow"><span class="eyebrow-dot"></span>The Process</div>
    <h1>From intro call to first day in 14 days.</h1>
    <p>A streamlined, transparent process built by engineers who have been on both sides of the hiring table.</p>
  </div>
</section>

<main>
  <div class="container">

    <div class="hiw-row fade-in">
      <div class="hiw-row__num">1</div>
      <div>
        <h3>Discovery Call</h3>
        <p>We start with a 30-minute call to understand your team, your stack, your culture, and exactly what you need. No generic intake forms — we ask the questions that matter to engineers: What does your architecture look like? What's your deployment frequency? What does your ideal candidate's first month look like?</p>
        <p>This call shapes every candidate we send you. The more specific you are, the better our matches.</p>
        <span class="tag">30 minutes</span>
        <span class="tag">No commitment</span>
        <span class="tag">Free</span>
      </div>
    </div>

    <div class="hiw-row fade-in">
      <div class="hiw-row__num">2</div>
      <div>
        <h3>Talent Matching</h3>
        <p>Within 48 hours of your discovery call, we deliver a curated shortlist of 3–5 candidates. Every candidate has passed our multi-stage vetting process: technical assessment, English fluency evaluation, culture-fit interview, and reference check.</p>
        <p>You get a detailed profile for each: technical scores, video introduction, salary expectations, and our recruiter's notes on why we think they're a match for your team specifically.</p>
        <span class="tag">48 hr delivery</span>
        <span class="tag">3–5 candidates</span>
        <span class="tag">Full profiles</span>
      </div>
    </div>

    <div class="hiw-row fade-in">
      <div class="hiw-row__num">3</div>
      <div>
        <h3>Interview & Select</h3>
        <p>You interview the candidates you want to meet. We handle all scheduling, prep candidates on your process, and are available for debrief support after each interview. Most clients make a decision after 2–3 interviews.</p>
        <p>Made your choice? We handle the offer process, negotiate on your behalf if needed, and get an acceptance locked in.</p>
        <span class="tag">Your process</span>
        <span class="tag">We handle scheduling</span>
        <span class="tag">Offer support</span>
      </div>
    </div>

    <div class="hiw-row fade-in">
      <div class="hiw-row__num">4</div>
      <div>
        <h3>Onboarding & Ongoing Support</h3>
        <p>Once selected, we handle everything: employment contracts, compliance with local labor law, equipment provisioning, and first-day coordination. Your new team member is ready to join your standup on day one.</p>
        <p>After onboarding, your dedicated account manager stays active — quarterly check-ins, performance escalations, payroll, and anything else that comes up. We're your HR department for LATAM.</p>
        <span class="tag">Contracts & compliance</span>
        <span class="tag">Equipment</span>
        <span class="tag">Dedicated AM</span>
        <span class="tag">Ongoing support</span>
      </div>
    </div>

  </div>

  <section class="section section--surface">
    <div class="container">
      <div style="text-align:center;max-width:560px;margin:0 auto 48px;">
        <span class="label">FAQ</span>
        <h2>Common questions</h2>
      </div>
      <div class="faq">
        <div class="faq__item">
          <button class="faq__question">How long does the process really take?</button>
          <div class="faq__answer">Most clients receive their first shortlist within 48 hours of the discovery call and make a hire within 14 days. Complex, senior, or highly specialized roles can take 3–4 weeks. We'll set accurate expectations during your discovery call.</div>
        </div>
        <div class="faq__item">
          <button class="faq__question">Who handles payroll and compliance?</button>
          <div class="faq__answer">Resourcee does. We act as the employer of record in each country, handling local labor law compliance, payroll in local currency, benefits, taxes, and terminations. You get a single monthly invoice in USD.</div>
        </div>
        <div class="faq__item">
          <button class="faq__question">What if the hire doesn't work out?</button>
          <div class="faq__answer">We offer a 90-day replacement guarantee. If a placement doesn't work out within the first 90 days for any reason, we'll find a replacement at no additional placement fee.</div>
        </div>
        <div class="faq__item">
          <button class="faq__question">What roles can you fill?</button>
          <div class="faq__answer">We specialize in engineering, design, and technical operations. This includes full-stack, frontend, backend, mobile, DevOps, data engineering, ML engineering, product design, QA, and technical project management. We do not place sales or marketing roles.</div>
        </div>
        <div class="faq__item">
          <button class="faq__question">What countries do you source from?</button>
          <div class="faq__answer">We source from 13+ countries across Latin America, with the deepest talent pools in Argentina, Colombia, Brazil, Mexico, Chile, and Peru. We recommend the best country for each role based on the skills required and timezone needs.</div>
        </div>
      </div>
    </div>
  </section>
</main>
```

- [ ] Add FAQ accordion to `js/main.js`:
```js
// FAQ accordion
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
```

- [ ] Open `how-it-works.html` — verify 4 numbered rows and FAQ accordion opens/closes.

- [ ] Commit:
```bash
git add how-it-works.html css/styles.css js/main.js
git commit -m "feat: how it works page with FAQ accordion"
```

---

## Task 11: About Page

**Files:**
- Create: `about.html`
- Modify: `css/styles.css`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   ABOUT PAGE
══════════════════════════════ */
.about-story { max-width: 760px; margin: 0 auto; }
.about-story p { font-size: 17px; line-height: 1.8; margin-bottom: 20px; }

.engineer-callout {
  background: var(--navy); color: #fff;
  border-radius: 16px; padding: 48px;
  margin: 56px 0; text-align: center;
}
.engineer-callout h3 { color: #fff; font-size: 26px; margin-bottom: 12px; }
.engineer-callout p  { color: rgba(255,255,255,.7); font-size: 16px; max-width: 560px; margin: 0 auto; line-height: 1.7; }

.values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
.value-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 28px;
}
.value-icon { font-size: 28px; margin-bottom: 14px; }
.value-card h3 { font-size: 17px; margin-bottom: 8px; }
.value-card p  { font-size: 14px; line-height: 1.65; }

.team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.team-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); padding: 24px; text-align: center;
}
.team-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--blue-light); color: var(--blue-primary);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 22px; margin: 0 auto 16px;
}
.team-name { font-size: 16px; font-weight: 700; color: var(--navy); }
.team-role { font-size: 13px; color: var(--muted); margin-top: 4px; }
.team-linkedin {
  display: inline-block; margin-top: 12px; font-size: 12px;
  color: var(--blue-primary); text-decoration: none; font-weight: 600;
}

@media (max-width: 768px) {
  .values-grid { grid-template-columns: 1fr; }
  .team-grid   { grid-template-columns: repeat(2,1fr); }
  .engineer-callout { padding: 32px 24px; }
}
```

- [ ] Create `about.html` — same nav/footer shell, with:
```html
<section class="page-hero">
  <div class="container">
    <div class="eyebrow"><span class="eyebrow-dot"></span>Our Story</div>
    <h1>We're engineers who got tired of watching great companies struggle to hire.</h1>
    <p>Resourcee was built by technical leaders who lived the problem firsthand.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="about-story fade-in">
      <p>We spent years building and scaling engineering teams at fast-growing companies. We hired through agencies, posted on job boards, ran recruiting operations in-house — and we kept running into the same wall: great US engineers are expensive, hard to find, and take months to hire. Offshore talent is cheap but misaligned in timezone and culture. There had to be a better answer.</p>
      <p>South America was the answer we kept landing on. The engineering talent there is world-class — graduates from elite universities, experienced in US-style product development, English-proficient, and working in overlapping time zones. But the infrastructure to hire them reliably didn't exist. So we built it.</p>
      <p>Resourcee was founded with one belief: if you approach hiring the way engineers approach problems — with rigor, data, and deep domain knowledge — you get dramatically better outcomes. We're not recruiters. We're engineers who built the hiring process we always wished existed.</p>
    </div>

    <div class="engineer-callout fade-in">
      <h3>Built by engineers. For engineering teams.</h3>
      <p>Every process, every vetting standard, every question we ask candidates — designed by people who have written production code, led architecture reviews, and made the call on who to hire and who to pass on. We know what great looks like because we've built teams with it.</p>
    </div>

    <div style="margin-bottom:56px;" class="fade-in">
      <span class="label" style="text-align:center;display:block;margin-bottom:40px;">Our Values</span>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">🔬</div>
          <h3>Engineering Rigor</h3>
          <p>We apply the same standards to talent selection that great engineers apply to code: measure twice, cut once. No gut-feel placements, no resume theater.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🤝</div>
          <h3>Long-Term Partnership</h3>
          <p>We succeed when your team succeeds. Our business model is built on retention, not volume. We'd rather place one great engineer than three mediocre ones.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌎</div>
          <h3>LATAM First</h3>
          <p>South American engineering talent is undervalued by the global market. We're here to change that — for US companies and for the engineers who deserve more opportunity.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">💬</div>
          <h3>Radical Transparency</h3>
          <p>We tell you when a candidate isn't the right fit. We tell you when your timeline is unrealistic. We tell you what things actually cost. No spin, no oversell.</p>
        </div>
      </div>
    </div>

    <div class="fade-in">
      <span class="label" style="text-align:center;display:block;margin-bottom:40px;">The Team</span>
      <div class="team-grid">
        <div class="team-card">
          <div class="team-avatar">JD</div>
          <div class="team-name">Jane Doe</div>
          <div class="team-role">Co-Founder & CEO</div>
          <a href="#" class="team-linkedin">LinkedIn →</a>
        </div>
        <div class="team-card">
          <div class="team-avatar">MS</div>
          <div class="team-name">Mark Smith</div>
          <div class="team-role">Co-Founder & CTO</div>
          <a href="#" class="team-linkedin">LinkedIn →</a>
        </div>
        <div class="team-card">
          <div class="team-avatar">LR</div>
          <div class="team-name">Laura R.</div>
          <div class="team-role">Head of Talent</div>
          <a href="#" class="team-linkedin">LinkedIn →</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] Open `about.html` — verify story section, dark "built by engineers" callout, values grid, team cards.

- [ ] Commit:
```bash
git add about.html css/styles.css
git commit -m "feat: about page"
```

---

## Task 12: Contact Page

**Files:**
- Create: `contact.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   CONTACT PAGE
══════════════════════════════ */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
.contact-form { background: #fff; border-radius: 16px; box-shadow: var(--card-shadow-lg); padding: 40px; }
.contact-form h2 { margin-bottom: 8px; }
.contact-form .subtitle { margin-bottom: 32px; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; padding: 12px 16px; border: 1.5px solid #E2E8F0;
  border-radius: 8px; font-size: 15px; font-family: inherit; color: var(--navy);
  transition: border-color .15s; background: #fff;
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--blue-primary); }
.form-group textarea { resize: vertical; min-height: 120px; }
.form-group select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }

.form-submit { width: 100%; justify-content: center; margin-top: 8px; }
.form-success { display: none; text-align: center; padding: 32px; }
.form-success h3 { color: var(--green); margin-bottom: 8px; }
.form-success.visible { display: block; }

.contact-info { padding-top: 8px; }
.contact-info h3 { margin-bottom: 20px; }
.expect-list { list-style: none; margin-bottom: 36px; }
.expect-list li {
  display: flex; gap: 12px; align-items: flex-start;
  font-size: 15px; color: var(--body-color); margin-bottom: 14px;
}
.expect-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; }
.contact-direct { background: var(--surface); border-radius: 12px; padding: 24px; }
.contact-direct p  { font-size: 14px; color: var(--muted); margin-bottom: 8px; }
.contact-direct a  { font-size: 16px; font-weight: 600; color: var(--blue-primary); text-decoration: none; }

@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}
```

- [ ] Create `contact.html` — same nav/footer shell, with:
```html
<section class="page-hero">
  <div class="container">
    <div class="eyebrow"><span class="eyebrow-dot"></span>Get In Touch</div>
    <h1>Let's talk about your team.</h1>
    <p>Free 30-minute strategy call. We'll tell you exactly what's possible.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-grid">

      <div class="contact-form fade-in">
        <h2>Schedule a Free Call</h2>
        <p class="subtitle">Tell us about your team and we'll reach out within one business day.</p>
        <form id="contact-form" novalidate>
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Jane Smith" required/>
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" name="company" placeholder="Acme Corp" required/>
          </div>
          <div class="form-group">
            <label for="email">Work Email</label>
            <input type="email" id="email" name="email" placeholder="jane@acmecorp.com" required/>
          </div>
          <div class="form-group">
            <label for="role">Your Role</label>
            <select id="role" name="role">
              <option value="">Select your role...</option>
              <option>CTO / VP Engineering</option>
              <option>Founder / CEO</option>
              <option>Engineering Manager</option>
              <option>HR / Talent Leader</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">What are you looking for?</label>
            <textarea id="message" name="message" placeholder="Tell us about the role(s) you need to fill, your team size, tech stack, and timeline..."></textarea>
          </div>
          <button type="submit" class="btn btn--primary form-submit">Send Message →</button>
        </form>
        <div class="form-success" id="form-success">
          <h3>✓ Message received!</h3>
          <p>We'll be in touch within one business day to schedule your call.</p>
        </div>
      </div>

      <div class="contact-info fade-in">
        <h3>What to expect</h3>
        <ul class="expect-list">
          <li>We respond to every inquiry within one business day</li>
          <li>A 30-minute discovery call with a senior team member — not a salesperson</li>
          <li>Honest assessment of whether we're the right fit for your needs</li>
          <li>A tailored plan with timeline and cost estimate</li>
          <li>No pressure, no hard sell — we let our track record speak</li>
        </ul>
        <div class="contact-direct">
          <p>Prefer to reach out directly?</p>
          <a href="mailto:hello@resourcee.co">hello@resourcee.co</a>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] Add form handler to `js/main.js`:
```js
// Contact form
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formSuccess.classList.add('visible');
  });
}
```

- [ ] Open `contact.html` — verify two-column layout, form fields styled correctly, submit shows success state.

- [ ] Commit:
```bash
git add contact.html css/styles.css js/main.js
git commit -m "feat: contact page with form"
```

---

## Task 13: Blog Pages

**Files:**
- Create: `blog/index.html`
- Create: `blog/sample-post.html`
- Modify: `css/styles.css`

- [ ] Append to `css/styles.css`:
```css
/* ══════════════════════════════
   BLOG
══════════════════════════════ */
.blog-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.filter-btn {
  padding: 7px 16px; border-radius: 100px; font-size: 13px; font-weight: 600;
  background: #fff; color: var(--body-color); border: 1.5px solid #E2E8F0;
  cursor: pointer; transition: .15s;
}
.filter-btn:hover, .filter-btn.active { background: var(--blue-primary); color: #fff; border-color: var(--blue-primary); }

.blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
.blog-card {
  background: #fff; border-radius: var(--card-radius);
  box-shadow: var(--card-shadow); overflow: hidden;
  display: flex; flex-direction: column;
  transition: transform .2s, box-shadow .2s;
  text-decoration: none; color: inherit;
}
.blog-card:hover { transform: translateY(-3px); box-shadow: var(--card-shadow-lg); }
.blog-card__img {
  height: 180px; background: var(--blue-light);
  display: flex; align-items: center; justify-content: center; font-size: 48px;
}
.blog-card__body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
.blog-card__cat { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--blue-primary); margin-bottom: 10px; }
.blog-card__title { font-size: 17px; font-weight: 700; color: var(--navy); line-height: 1.4; margin-bottom: 10px; }
.blog-card__excerpt { font-size: 14px; color: var(--body-color); line-height: 1.6; flex: 1; }
.blog-card__meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-top: 16px; padding-top: 16px; border-top: 1px solid #F1F5F9; }

/* Blog post */
.post-hero { background: var(--surface); border-bottom: 1px solid #E2E8F0; padding: 64px 0; }
.post-hero__cat { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--blue-primary); margin-bottom: 16px; display: block; }
.post-hero h1 { max-width: 720px; font-size: clamp(28px,4vw,42px); }
.post-hero__meta { display: flex; gap: 20px; margin-top: 20px; font-size: 13px; color: var(--muted); }

.post-layout { display: grid; grid-template-columns: 1fr 320px; gap: 64px; align-items: start; padding: 64px 0; }
.post-body { max-width: 720px; }
.post-body h2 { font-size: 24px; margin: 36px 0 14px; }
.post-body h3 { font-size: 19px; margin: 28px 0 10px; }
.post-body p  { font-size: 17px; line-height: 1.85; margin-bottom: 18px; }
.post-body ul { margin: 0 0 18px 24px; }
.post-body ul li { font-size: 17px; line-height: 1.85; margin-bottom: 8px; }

.post-sidebar { position: sticky; top: 80px; }
.sidebar-cta { background: var(--blue-primary); color: #fff; border-radius: 14px; padding: 28px; text-align: center; }
.sidebar-cta h4 { color: #fff; font-size: 17px; margin-bottom: 10px; }
.sidebar-cta p  { color: rgba(255,255,255,.75); font-size: 13px; margin-bottom: 20px; line-height: 1.6; }
.sidebar-cta .btn { width: 100%; justify-content: center; }

@media (max-width: 1024px) {
  .blog-grid    { grid-template-columns: repeat(2,1fr); }
  .post-layout  { grid-template-columns: 1fr; }
  .post-sidebar { position: static; }
}
@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
}
```

- [ ] Create `blog/index.html` — nav/footer use `../` prefix for paths, with:
```html
<section class="page-hero">
  <div class="container">
    <div class="eyebrow"><span class="eyebrow-dot"></span>The Resourcee Blog</div>
    <h1>Insights on nearshoring, LATAM talent, and remote team building.</h1>
    <p>Written by engineers who've built and scaled distributed teams firsthand.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="blog-filters">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">Engineering</button>
      <button class="filter-btn">Design</button>
      <button class="filter-btn">Recruiting</button>
      <button class="filter-btn">LATAM</button>
      <button class="filter-btn">Operations</button>
    </div>
    <div class="blog-grid">
      <a href="sample-post.html" class="blog-card fade-in">
        <div class="blog-card__img">🌎</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">LATAM</div>
          <div class="blog-card__title">Why Argentina Produces World-Class Software Engineers</div>
          <div class="blog-card__excerpt">A deep dive into the country's engineering culture, university system, and why top US companies keep coming back for LATAM talent.</div>
          <div class="blog-card__meta"><span>June 2026</span><span>6 min read</span></div>
        </div>
      </a>
      <a href="#" class="blog-card fade-in">
        <div class="blog-card__img">⚙️</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">Engineering</div>
          <div class="blog-card__title">How to Run Effective Technical Interviews Across Time Zones</div>
          <div class="blog-card__excerpt">The frameworks and question formats that work when you're interviewing candidates in a 3-hour timezone difference.</div>
          <div class="blog-card__meta"><span>May 2026</span><span>8 min read</span></div>
        </div>
      </a>
      <a href="#" class="blog-card fade-in">
        <div class="blog-card__img">💰</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">Recruiting</div>
          <div class="blog-card__title">LATAM Developer Salaries in 2026: The Complete Benchmark</div>
          <div class="blog-card__excerpt">Country-by-country salary data for engineers, designers, and technical leads across Latin America.</div>
          <div class="blog-card__meta"><span>April 2026</span><span>10 min read</span></div>
        </div>
      </a>
      <a href="#" class="blog-card fade-in">
        <div class="blog-card__img">🤝</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">Operations</div>
          <div class="blog-card__title">The Nearshore Onboarding Playbook: First 90 Days</div>
          <div class="blog-card__excerpt">What the best engineering managers do in the first 90 days with a new nearshore team member to maximize retention and performance.</div>
          <div class="blog-card__meta"><span>March 2026</span><span>7 min read</span></div>
        </div>
      </a>
      <a href="#" class="blog-card fade-in">
        <div class="blog-card__img">🔍</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">Recruiting</div>
          <div class="blog-card__title">5 Red Flags in LATAM Hiring (And How to Avoid Them)</div>
          <div class="blog-card__excerpt">After 500+ placements, we've seen what goes wrong. Here are the patterns that lead to bad hires — and how to screen against them.</div>
          <div class="blog-card__meta"><span>February 2026</span><span>5 min read</span></div>
        </div>
      </a>
      <a href="#" class="blog-card fade-in">
        <div class="blog-card__img">🚀</div>
        <div class="blog-card__body">
          <div class="blog-card__cat">Engineering</div>
          <div class="blog-card__title">Building a Remote-First Engineering Culture From Day One</div>
          <div class="blog-card__excerpt">The rituals, tools, and communication norms that make distributed engineering teams as effective as co-located ones.</div>
          <div class="blog-card__meta"><span>January 2026</span><span>9 min read</span></div>
        </div>
      </a>
    </div>
  </div>
</section>
```

- [ ] Add filter button toggle to `js/main.js`:
```js
// Blog filters (visual toggle only — no actual filtering in v1)
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
```

- [ ] Create `blog/sample-post.html` — nav/footer with `../` prefix, with:
```html
<section class="post-hero">
  <div class="container">
    <span class="post-hero__cat">LATAM</span>
    <h1>Why Argentina Produces World-Class Software Engineers</h1>
    <div class="post-hero__meta">
      <span>By the Resourcee Team</span>
      <span>June 2026</span>
      <span>6 min read</span>
    </div>
  </div>
</section>

<div class="container">
  <div class="post-layout">
    <article class="post-body fade-in">
      <h2>The engineering talent nobody's talking about</h2>
      <p>Ask any CTO who's hired through Resourcee and they'll tell you the same thing: Argentine engineers are consistently among the best they've ever worked with. That's not an accident — it's the result of a university system, a culture, and an economic history that have combined to create an extraordinary technical talent pool.</p>
      <h2>World-class universities, free of charge</h2>
      <p>Argentina's public universities are free and highly competitive. The University of Buenos Aires (UBA) and ITBA consistently rank among the top engineering schools in Latin America. Admission is merit-based, the programs are rigorous, and graduates enter the workforce with a theoretical foundation that rivals graduates from elite US institutions.</p>
      <p>The result: a developer who graduated from UBA has been through a harder program than many developers who graduated from mid-tier US schools — and they paid nothing for it.</p>
      <h2>English proficiency that actually holds up</h2>
      <p>Argentina has the highest English proficiency in Latin America, consistently ranking in the top 20 countries globally on the EF English Proficiency Index. This isn't conversational English — Argentine engineers can read documentation, write detailed technical specs, lead architecture discussions, and participate in code reviews entirely in English without degrading the quality of the conversation.</p>
      <h2>The timezone advantage</h2>
      <p>Argentina operates on ART (UTC-3), which means Buenos Aires is only one hour ahead of New York in summer and two hours ahead in winter. For a US East Coast team, this is near-perfect overlap — your Argentine engineer is available for your 9am standup, your 2pm code review, and your 4pm sprint planning. For West Coast teams, the overlap is tighter but still workable: 6–7 hours of shared time covers the full US morning.</p>
      <ul>
        <li>EST overlap: 6–8 hours per day</li>
        <li>CST overlap: 5–7 hours per day</li>
        <li>PST overlap: 4–6 hours per day</li>
      </ul>
      <h2>A culture of technical depth</h2>
      <p>Argentine engineering culture prizes technical depth over breadth. Developers there tend to go deep on fundamentals — algorithms, system design, computer science theory — in ways that their US counterparts, trained in bootcamps or accelerated programs, sometimes don't. This shows up in code quality, in architectural decision-making, and in the ability to debug complex systems under pressure.</p>
      <p>If you're looking to add someone who will make your codebase better — not just bigger — Argentine engineers deliver that consistently.</p>
      <h2>The bottom line</h2>
      <p>A senior engineer in Buenos Aires with 7 years of experience in React, Node, and AWS will cost you $65,000–$90,000 per year. A comparable engineer in San Francisco costs $180,000–$220,000. That's not a trade-off — it's an arbitrage opportunity that top companies are already exploiting. The only question is whether you act on it before your competitors do.</p>
    </article>

    <aside class="post-sidebar">
      <div class="sidebar-cta">
        <h4>Need LATAM talent?</h4>
        <p>We'll connect you with the top 3% of South American engineers in 14 days.</p>
        <a href="../contact.html" class="btn btn--white btn--sm">Schedule a Free Call →</a>
      </div>
    </aside>
  </div>
</div>
```

- [ ] Open `blog/index.html` and `blog/sample-post.html` in browser — verify grid layout and sticky sidebar on post page.

- [ ] Commit:
```bash
git add blog/ css/styles.css js/main.js
git commit -m "feat: blog listing and sample post template"
```

---

## Task 14: Responsiveness & Polish Pass

**Files:**
- Modify: `css/styles.css`
- Modify: all `.html` files (meta tags)

- [ ] Open each page at 375px width (mobile) and verify:
  - Navigation: hamburger shows, drawer opens/closes
  - Hero: single column, text readable, cards below content
  - All grids: single column
  - Buttons: full-width on mobile where appropriate
  - Trust bar logos: wrap cleanly
  - How It Works steps: stack vertically with no connector line

- [ ] Add these responsive overrides at bottom of `css/styles.css` for any issues found:
```css
@media (max-width: 768px) {
  .hero__ctas .btn { width: 100%; justify-content: center; }
  .final-cta__actions .btn { width: 100%; }
  .hiw__steps::before { display: none; }
  .trust-bar__logos { gap: 16px; }
}
```

- [ ] Add canonical meta and Open Graph tags to `<head>` of `index.html`:
```html
<meta property="og:title" content="Resourcee — Elite South American Talent for US Engineering Teams"/>
<meta property="og:description" content="We connect US companies with the top 3% of South American engineering, design, and operations talent. Built by engineers, for engineering teams."/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://resourcee.co"/>
<link rel="canonical" href="https://resourcee.co"/>
```

- [ ] Verify no horizontal scroll on any page at any screen width.

- [ ] Commit:
```bash
git add css/styles.css index.html services.html how-it-works.html about.html contact.html blog/index.html blog/sample-post.html
git commit -m "feat: responsive polish and meta tags"
```

---

## Task 15: Final Review

- [ ] Open all 7 pages and click every link — verify no broken hrefs (404s).
- [ ] Test mobile nav hamburger on all pages.
- [ ] Test FAQ accordion on `how-it-works.html` — opens one at a time.
- [ ] Test contact form — submits, shows success state.
- [ ] Test scroll fade-ins — elements fade in as you scroll down on homepage.
- [ ] Confirm logo links back to `index.html` from every page.
- [ ] Confirm all "Schedule a Call" CTAs link to `contact.html`.
- [ ] Replace placeholder team names/content in `about.html` with real names before launch.
- [ ] Replace trust bar placeholders with real client logos before launch.
- [ ] Replace testimonial placeholders with real quotes before launch.

- [ ] Final commit:
```bash
git add .
git commit -m "feat: Resourcee website v1 complete"
```
