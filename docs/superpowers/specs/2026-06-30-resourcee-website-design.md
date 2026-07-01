# Resourcee Website Redesign — Design Spec
**Date:** 2026-06-30  
**Status:** Approved for implementation

---

## 1. Goals

Replace the current generic site at resourcee.co with a premium, authority-signaling website that:
- Converts CTO/VP Engineering visitors at startups and mid-market companies into booked calls
- Communicates four core pillars: Speed, Quality, Partnership, Cost-to-quality ratio
- Positions Resourcee as the definitive expert on South American nearshore talent for US companies
- Looks and feels at the level of BairesDev or Tecla — not a template site
- Communicates that Resourcee was **built by engineers** — the founders understand engineering teams from the inside, not as recruiters or salespeople

---

## 2. Site Structure

| Page | Purpose |
|------|---------|
| `/` — Homepage | Long-scroll conversion page, one primary CTA: Schedule a Call |
| `/services` | Detailed breakdown of all 6 services |
| `/how-it-works` | Expanded 4-step process with detail |
| `/blog` | Article grid with category filters |
| `/blog/[slug]` | Individual blog post template |
| `/about` | Company story, team, values |
| `/contact` | Contact form + calendar embed |

---

## 3. Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--blue-primary` | `#1C4ED8` | CTAs, links, accents, brand |
| `--blue-light` | `#EEF2FF` | Section backgrounds, tag pills, cards |
| `--blue-border` | `#C7D7F8` | Card borders, dividers |
| `--navy` | `#0F172A` | Headlines |
| `--body` | `#475569` | Body text |
| `--muted` | `#94A3B8` | Labels, secondary text |
| `--surface` | `#F8FAFF` | Alternating section background |
| `--white` | `#FFFFFF` | Primary background |
| `--green` | `#10B981` | Success states, match badges |

### Typography
- **Font:** Inter (Google Fonts) — weights 400, 500, 600, 700, 800
- **H1:** 52px / 800 / letter-spacing -1.5px / color `--navy`
- **H2:** 38px / 800 / letter-spacing -1px / color `--navy`
- **H3:** 22px / 700 / color `--navy`
- **Body:** 16px / 400 / line-height 1.7 / color `--body`
- **Label:** 12px / 600 / letter-spacing 1.5px / uppercase / color `--muted`
- **Stat:** 32–48px / 800 / letter-spacing -1px

### Spacing
- Max content width: `1200px`, centered with `auto` margins
- Section vertical padding: `96px` top/bottom (desktop), `56px` (mobile)
- Card padding: `28px`
- Grid gaps: `24px`

### Border Radius
- Cards: `12px`
- Buttons: `8px`
- Tags/pills: `100px`
- Hero visual card: `16px`

### Shadows
- Card: `0 4px 24px rgba(28, 78, 216, 0.08)`
- Elevated card: `0 8px 40px rgba(28, 78, 216, 0.12)`

---

## 4. Navigation

Sticky top nav, white background, 1px bottom border `#E2E8F0`, height 64px.

**Left:** Logo — wordmark "resourcee" in `--blue-primary` with `.co` in `--navy`, 800 weight  
**Center:** Links — Services · How It Works · Blog · About · Contact — 14px / 500 / `--body`  
**Right:** "Schedule a Call →" — filled blue button, 13px / 600

On mobile: hamburger menu, links stack vertically in a slide-down drawer.

---

## 5. Homepage Sections

### Section 1 — Hero
**Layout:** Two-column grid (left: content, right: visual). Desktop only — stacks on mobile.

**Left column:**
- Eyebrow pill: blue background, "Built by Engineers · For Engineering Teams" with a pulsing blue dot
- H1: "Build world-class teams. **At a fraction of the cost.**" — "At a fraction of the cost." in `--blue-primary`
- Subheadline (17px): "We're engineers who got tired of bad hires. Resourcee connects US engineering teams with the top 3% of South American talent — in your timezone, speaking your language, ready in 2 weeks."
- Two CTAs: Primary "Schedule a Free Call →" (filled blue) + Secondary "See How It Works" (blue outline)
- Stats bar (border-top divider above):
  - 500+ Placements made
  - 14 days Avg. time to hire
  - 60% Average cost savings
  - 13+ Countries sourced

**Right column (visual):**
- Light blue gradient card (`#EEF2FF → #F0F9FF`), `border-radius: 16px`
- Two candidate preview cards (name, role, city/country, colored avatar initials, skill tags, experience tag, timezone tag)
- A "98% Match" green badge top-right of the outer card
- Two mini stat cards below: "⚡ 48 hours — Time to first interview" and "🌎 6–8 hrs/day — Timezone overlap"

### Section 2 — Trust Bar
Background: `--surface`. Centered.

- Label: "Trusted by teams at" — muted uppercase label
- Row of 5–6 client logo SVGs (grayscale), evenly spaced, centered
- If no logos yet: placeholder company name pills in `#E2E8F0`

### Section 3 — 4 Pillars
Background: white. Full-width with max-width container.

- Section label: "Why Resourcee"
- H2: "Everything you need. None of the compromise."
- Subheadline below H2: "We're engineers who built and scaled technical teams. We know what a great hire looks like — and what a bad one costs."
- 4-column grid of pillar cards (each card: icon in blue square, large bold stat, 2-line description):
  1. ⚡ **Speed** — "Hire in 14 days" — "From kickoff to first day on the job. We move fast so you don't miss your roadmap."
  2. ✓ **Top 3% Quality** — "Rigorously vetted" — "Multi-stage assessment: technical screen, English fluency, culture fit. Only the best make it through."
  3. 🤝 **True Partnership** — "Dedicated support" — "A dedicated account manager handles compliance, onboarding, payroll, and ongoing success."
  4. 💰 **60% Cost Savings** — "World-class talent" — "Senior engineers at half the US rate — without cutting corners on skill or experience."

### Section 4 — Services Grid
Background: `--surface`.

- Section label: "What We Do"
- H2: "Six ways we can build your team"
- 3-column grid of 6 service cards (each: icon, service name, 2-line description, "Learn more →" link):
  1. **Nearshore Staffing** — Integrated remote team members working in overlapping time zones, embedded in your culture.
  2. **Remote Hiring** — We source, vet, and place top candidates directly onto your payroll. You own the relationship.
  3. **Talent Acquisition** — End-to-end recruiting pipeline and candidate assessment for any role, any seniority.
  4. **Team Pods** — Dedicated cross-functional groups (dev + design + QA + PM) with built-in management support.
  5. **Recruiting Consulting** — Strategic guidance on building remote-first hiring processes and LATAM talent programs.
  6. **Technology Consulting** — Architecture review, modernization roadmaps, and digital transformation with senior technical leaders.

### Section 5 — How It Works
Background: white.

- Section label: "The Process"
- H2: "From intro call to first day in 14 days."
- 4-step horizontal timeline with numbered circles connected by a dashed line:
  1. **Discovery Call** — "We learn your stack, team culture, role requirements, and timeline. No generic intake forms."
  2. **Talent Matching** — "Our team curates a shortlist of 3–5 vetted candidates within 48 hours. You review profiles, we arrange interviews."
  3. **Interview & Select** — "Meet your candidates. We facilitate scheduling and provide debrief support. You choose who joins."
  4. **Onboarding & Support** — "We handle contracts, compliance, and equipment. Your dedicated account manager stays with you ongoing."
- Below the steps: "Most clients make a hire within 14 days of their first call." — muted text, centered

### Section 6 — Why South America
Background: `--surface`.

- Section label: "The LATAM Advantage"
- H2: "South America's best engineers are in your timezone."
- Two-column layout: left = text + 4 stat boxes, right = stylized Americas SVG map with pulsing dots on key cities (Bogotá, Buenos Aires, São Paulo, Santiago, Lima, Mexico City)
- 4 stat boxes (2x2 grid):
  - **6–8 hrs** — Daily overlap with US East Coast
  - **300K+** — STEM graduates per year across LATAM
  - **Top 10** — Argentina & Brazil rank globally for developer skill
  - **40–60%** — Cost savings vs. equivalent US talent

### Section 7 — Testimonials
Background: white.

- Section label: "Client Stories"
- H2: "Don't take our word for it."
- 3-column grid of quote cards (each: large quotation mark in `--blue-light`, quote text, client name + role + company, company logo if available — otherwise colored initial avatar)
- Placeholder quotes to be replaced with real client testimonials:
  - *"Resourcee placed our entire backend team in under three weeks. Every engineer has been exceptional."* — CTO, Series B SaaS company
  - *"The quality of candidates blew us away. We now hire exclusively through Resourcee for LATAM roles."* — VP Engineering, fintech startup
  - *"Our dedicated account manager made the whole process feel seamless. It's the best hiring experience we've had."* — Founder & CEO, e-commerce platform

### Section 8 — Final CTA
Background: `--blue-primary` (full bleed). White text.

- H2 (white): "Ready to build your dream team in South America?"
- Subtext (white, 60% opacity): "Free 30-minute strategy call. No commitment. We'll tell you exactly what's possible for your team."
- Primary CTA: "Schedule Your Free Call →" — white button, blue text
- Secondary CTA: "Or email us at hello@resourcee.co"

### Footer
Background: `#0F172A` (dark navy). White text.

- Row 1: Logo left + nav links center + social icons right (LinkedIn, Twitter/X)
- Row 2: "© 2026 Resourcee. All rights reserved." + Privacy Policy + Terms
- Optional: brief tagline "Elite South American talent for US teams."

---

## 6. Supporting Pages

### /services
- Hero section: "Six services. One mission: build your perfect team."
- One detailed card per service: icon, name, full description (3–4 sentences), who it's for, key outcomes, CTA
- Bottom CTA section linking to /contact

### /how-it-works
- Expanded version of homepage Section 5
- Each step gets its own full-width row: step number, title, 2–3 paragraphs, illustrative card/visual on the right
- FAQ accordion at bottom (5–7 common questions)
- Bottom CTA

### /blog
- Hero: "Insights on nearshoring, LATAM talent, and remote team building."
- Filter pills: All · Engineering · Design · Operations · Recruiting · LATAM
- Article grid: 3 columns, each card has: category tag, title, excerpt, author, date, read time, "Read More →"
- Pagination or "Load More" button

### /blog/[slug]
- Full-width hero: category tag + title + author/date/read time
- Max-width 720px article body, Inter 18px body text, generous line-height
- Sidebar (desktop): table of contents + CTA card "Need LATAM talent? Let's talk."
- Related articles at bottom

### /about
- Mission statement hero: "We're engineers who got tired of watching great companies struggle to hire."
- Company story (2–3 paragraphs): founders' background as engineers/engineering leaders, why they built Resourcee, their firsthand experience scaling teams and understanding what good talent looks like
- "Built by engineers" callout block: dark navy background, white text — short punchy statement about the founding team's technical background and why that makes Resourcee different from a traditional staffing firm
- Values grid (4 values with icons)
- Team section: photo grid with name, role, LinkedIn link
- Bottom CTA

### /contact
- Two-column: left = contact form (Name, Company, Email, Role, What are you looking for? — text area), right = "What to expect" bullet list + calendar embed (Calendly or similar)
- Form submission: thank you state inline, no page redirect

---

## 7. Technical Stack

- **Language:** Plain HTML5 / CSS3 / Vanilla JavaScript — no frameworks, no build step
- **Structure:** One `.html` file per page, one `styles.css`, one `main.js`
- **Fonts:** Google Fonts — Inter, loaded via `<link>` in `<head>`
- **Icons:** Inline SVGs or a single sprite — no external icon library CDN dependency
- **Animations:** CSS transitions + `IntersectionObserver` for scroll-triggered fade-ins — no animation libraries
- **Mobile:** Fully responsive, mobile-first breakpoints at 768px and 1024px
- **Hosting:** Static — compatible with any CDN/host (Netlify, Vercel, Cloudflare Pages, etc.)
- **No CMS:** Blog posts are static `.html` files for v1; can migrate to a CMS later

---

## 8. Content Placeholders (to supply before launch)

- [ ] Real client logos for Trust Bar
- [ ] Real client testimonials (3 quotes with name/role/company)
- [ ] Real stats (placements, countries, avg hire time — confirm actual numbers)
- [ ] Team photos and bios for /about
- [ ] 2–3 initial blog posts
- [ ] Calendly or calendar link for CTA buttons
- [ ] hello@resourcee.co email confirmed

---

## 9. Out of Scope (v1)

- Live talent directory / candidate browsing
- Client portal / login
- Salary calculator tool
- CMS integration
- Multilingual (Spanish) version
- Animations beyond scroll fade-ins
