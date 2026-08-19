/*
  Salama BBQ — Ember Counter behavior
  Supports anchor-led single-page navigation, a compact mobile menu, active-section state,
  a See Menu dialog, and direct tel: calls. No React or framework runtime is used.
*/

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mobilePanel = document.querySelector('.mobile-panel');
const navLinks = [...document.querySelectorAll('[data-scroll-link]')];
const sections = [...document.querySelectorAll('section[id]')];
const menuDialog = document.querySelector('#full-menu');
const menuTriggers = [...document.querySelectorAll('[data-menu-trigger]')];
const menuClosers = [...document.querySelectorAll('[data-menu-close]')];

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
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
