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
