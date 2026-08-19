/*
  Salama BBQ — Ember Counter behavior
  Supports anchor-led single-page navigation, a compact mobile menu, active-section state,
  a See Menu dialog, accessible reveals, parallax accents, and direct tel: calls. No React or framework runtime is used.
*/

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mobilePanel = document.querySelector('.mobile-panel');
const navLinks = [...document.querySelectorAll('[data-scroll-link]')];
const sections = [...document.querySelectorAll('section[id]')];
const menuDialog = document.querySelector('#full-menu');
const menuTriggers = [...document.querySelectorAll('[data-menu-trigger]')];
const menuClosers = [...document.querySelectorAll('[data-menu-close]')];
const revealItems = [...document.querySelectorAll('[data-reveal]')];
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function closeMenu() {
  document.body.classList.remove('menu-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  const nextState = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', nextState);
  navToggle?.setAttribute('aria-expanded', String(nextState));
}

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
}

navToggle?.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

mobilePanel?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});

menuTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => menuDialog?.showModal());
});

menuClosers.forEach((closer) => {
  closer.addEventListener('click', () => menuDialog?.close());
});

menuDialog?.addEventListener('click', (event) => {
  if (event.target === menuDialog) menuDialog.close();
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const currentId = visible.target.id;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  },
  { rootMargin: '-38% 0px -52% 0px', threshold: [0.01, 0.5, 0.9] }
);

sections.forEach((section) => observer.observe(section));

document.body.classList.add('js-motion');
revealItems.forEach((item) => {
  const delay = Number(item.dataset.delay || 0);
  item.style.setProperty('--reveal-delay', `${delay}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

let animationFrame;
function updateParallax() {
  animationFrame = undefined;
  if (reduceMotion.matches) return;

  const viewportMiddle = window.innerHeight / 2;
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const speed = Number(item.dataset.parallax || 0.08);
    const distance = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewportMiddle) / viewportMiddle));
    const intensity = item.closest('.hero') ? 170 : 120;
    item.style.setProperty('--parallax-y', `${Math.round(distance * speed * -intensity)}px`);
  });
}

function requestMotionUpdate() {
  updateHeader();
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
}

reduceMotion.addEventListener('change', requestMotionUpdate);
window.addEventListener('scroll', requestMotionUpdate, { passive: true });
window.addEventListener('resize', requestMotionUpdate);
updateHeader();
requestMotionUpdate();
