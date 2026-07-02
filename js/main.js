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

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.faq__item').classList.toggle('open'));
});

// Animated stat counters
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  function tick(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - elapsed, 3);
    const value = target * ease;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (elapsed < 1) requestAnimationFrame(tick);
    else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

// Side nav — highlight active section + dark/light background detection
const sideNavItems = document.querySelectorAll('.side-nav__item');
if (sideNavItems.length) {
  const sectionIds = ['hero','pillars','services','how-it-works','savings','latam','faq','testimonials'];
  const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  // Sections with dark/navy backgrounds — dots need to go white
  const darkSections = new Set(['services', 'savings']);

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Update active state with animation
        sideNavItems.forEach(n => n.classList.remove('active'));
        const active = document.querySelector(`.side-nav__item[href="#${e.target.id}"]`);
        if (active) {
          active.classList.add('active');
          // Pulse animation on active dot
          const dot = active.querySelector('.side-nav__dot');
          if (dot) {
            dot.classList.add('side-nav__dot--pulse');
            setTimeout(() => dot.classList.remove('side-nav__dot--pulse'), 400);
          }
        }
        // Swap dot color for dark/light sections
        if (darkSections.has(e.target.id)) {
          document.body.classList.add('side-nav--dark-bg');
        } else {
          document.body.classList.remove('side-nav--dark-bg');
        }
      }
    });
  }, { threshold: 0.35 });
  sectionEls.forEach(s => sectionObserver.observe(s));
}

// Service side nav active tracking (services.html)
const serviceSideItems = document.querySelectorAll('.service-side-nav__item');
if (serviceSideItems.length) {
  const serviceIds = ['nearshore','remote-hiring','talent-acquisition','team-pods','consulting','tech-consulting'];
  const serviceEls = serviceIds.map(id => document.getElementById(id)).filter(Boolean);
  const serviceObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        serviceSideItems.forEach(n => n.classList.remove('active'));
        const active = document.querySelector(`.service-side-nav__item[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  serviceEls.forEach(s => serviceObs.observe(s));
}

// Quick Connect pill — opens Calendly on click
function initQuickConnect() {
  const pill = document.createElement('a');
  pill.href = 'https://calendly.com/resourcee-founders/meet-with-resourcee';
  pill.target = '_blank';
  pill.rel = 'noopener';
  pill.className = 'qc-pill';
  pill.setAttribute('aria-label', 'Schedule a call');
  pill.innerHTML = `<span class="qc-pill__dot"></span>Schedule a Call &rarr;`;
  document.body.appendChild(pill);
  requestAnimationFrame(() => requestAnimationFrame(() => pill.classList.add('qc-pill--visible')));
}

setTimeout(initQuickConnect, 2000);

// Interactive LATAM talent map — floating tooltips + leader lines
function initLatamMap() {
  const card = document.getElementById('latam-map-card');
  if (!card) return;
  const svg = card.querySelector('.latam-map__svg');
  const leaders = document.getElementById('latam-map-leaders');
  const SVGNS = 'http://www.w3.org/2000/svg';
  const GAP = 26; // distance from pin to tooltip edge

  // Line-icons keyed by name, styled like the site's floating badges
  const ICONS = {
    clock: { tile: '#EEF2FF', svg: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#1C4ED8" stroke-width="1.7"/><path d="M9 5.5v3.5l2.5 2" stroke="#1C4ED8" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    check: { tile: '#F0FDF4', svg: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M2.5 9.5l4 4 9-9" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    chat:  { tile: '#EEF2FF', svg: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M2.5 5.5a2 2 0 012-2h9a2 2 0 012 2v5a2 2 0 01-2 2H7l-3.5 3v-3H4.5a2 2 0 01-2-2v-5z" stroke="#1C4ED8" stroke-width="1.5" stroke-linejoin="round"/></svg>' },
    star:  { tile: '#EEF2FF', svg: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2l2.1 4.5 4.9.6-3.6 3.4 1 4.9L9 13.6 4.6 15.8l1-4.9L2 7.1l4.9-.6L9 2z" stroke="#1C4ED8" stroke-width="1.4" stroke-linejoin="round" fill="none"/></svg>' },
    globe: { tile: '#EEF2FF', svg: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#1C4ED8" stroke-width="1.6"/><path d="M2.5 9h13M9 2.2c1.9 2 2.9 4.4 2.9 6.8S10.9 13.8 9 15.8C7.1 13.8 6.1 11.4 6.1 9S7.1 4.2 9 2.2z" stroke="#1C4ED8" stroke-width="1.3"/></svg>' }
  };

  // Map SVG viewBox coords -> card pixel coords
  function toCardXY(vx, vy) {
    const r = svg.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    const sx = r.width / 280, sy = r.height / 280;
    return { x: (r.left - cr.left) + vx * sx, y: (r.top - cr.top) + vy * sy };
  }

  function makeTip(d) {
    const ic = ICONS[d.icon] || { tile: '#EEF2FF', svg: '' };
    const el = document.createElement('div');
    el.className = 'latam-map__tooltip';
    el.innerHTML =
      '<div class="latam-map__tt-ico" style="background:' + ic.tile + '">' + ic.svg + '</div>' +
      '<div><div class="latam-map__tt-title">' + d.title + '</div>' +
      '<div class="latam-map__tt-sub">' + d.sub + '</div></div>';
    card.appendChild(el);
    return el;
  }

  const built = [].slice.call(card.querySelectorAll('.latam-map__marker')).map(g => {
    const d = g.dataset;
    const dir = d.dir || 'up';
    const el = makeTip(d);
    let tx = '-50%', ty = '-50%';
    if (dir === 'up') ty = '-100%';
    if (dir === 'down') ty = '0%';
    if (dir === 'left') tx = '-100%';
    if (dir === 'right') tx = '0%';
    el.style.setProperty('--tx', tx);
    el.style.setProperty('--ty', ty);
    return { d, dir, el };
  });

  function place() {
    const cr = card.getBoundingClientRect();
    leaders.setAttribute('viewBox', '0 0 ' + cr.width + ' ' + cr.height);
    leaders.setAttribute('width', cr.width);
    leaders.setAttribute('height', cr.height);
    while (leaders.firstChild) leaders.removeChild(leaders.firstChild);

    built.forEach(b => {
      const p = toCardXY(+b.d.x, +b.d.y);
      let ex = p.x, ey = p.y;
      if (b.dir === 'up') ey = p.y - GAP;
      if (b.dir === 'down') ey = p.y + GAP;
      if (b.dir === 'left') ex = p.x - GAP;
      if (b.dir === 'right') ex = p.x + GAP;
      b.el.style.left = ex + 'px';
      b.el.style.top = ey + 'px';

      const line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('x1', p.x); line.setAttribute('y1', p.y);
      line.setAttribute('x2', ex); line.setAttribute('y2', ey);
      line.setAttribute('stroke', 'rgba(196,206,238,0.3)');
      line.setAttribute('stroke-width', '1');
      leaders.appendChild(line);
      const dot = document.createElementNS(SVGNS, 'circle');
      dot.setAttribute('cx', ex); dot.setAttribute('cy', ey);
      dot.setAttribute('r', '1.6'); dot.setAttribute('fill', '#c4ceee');
      leaders.appendChild(dot);
    });
  }

  function reveal() {
    built.forEach((b, i) => setTimeout(() => b.el.classList.add('in'), 120 + i * 90));
  }

  function run() { place(); reveal(); }

  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run);
  window.addEventListener('resize', place);
}

initLatamMap();
