/*
  Salama BBQ — Ember Counter behavior
  Supports anchor-led single-page navigation, a compact mobile menu, active-section state,
  menu-category filters, and direct tel: calls. No React or framework runtime is used.
*/

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mobilePanel = document.querySelector('.mobile-panel');
const navLinks = [...document.querySelectorAll('[data-scroll-link]')];
const sections = [...document.querySelectorAll('section[id]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const menuItems = [...document.querySelectorAll('.menu-item')];

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

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter || 'all';
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    menuItems.forEach((item) => {
      const visible = selected === 'all' || item.dataset.category === selected;
      item.classList.toggle('is-hidden', !visible);
    });
  });
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
