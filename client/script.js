/*
  Salama BBQ — Ember Counter behavior
  Supports anchor-led single-page navigation, a compact mobile menu, active-section state,
  a See Menu dialog, accessible reveals, parallax accents, dark mode, English/Kiswahili switching,
  and direct tel: calls. Everything runs through direct browser DOM APIs.
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
const themeToggle = document.querySelector('[data-theme-toggle]');
const languageToggle = document.querySelector('[data-lang-toggle]');
const languageLabel = document.querySelector('[data-language-label]');
const scrollCue = document.querySelector('.scroll-cue');

const translations = {
  en: {
    nav_home: 'Home', nav_menu: 'Menu', nav_our_way: 'Our Way', nav_visit: 'Visit', nav_visit_hours: 'Visit & Hours',
    call_to_order: 'Call to order', call_button: 'Call', hero_title_one: 'Grill. Sip.', hero_title_two: 'Repeat.',
    hero_description: 'Char-grilled chicken, colorful pours, and crisp chicken samosas. Call to order and we’ll fire it fresh.',
    hero_hint: 'Fresh food. No accounts. No fuss.', ticker_one: 'SMASHED. SAUCED. SENT.', ticker_two: 'CALL TO ORDER', ticker_three: 'CHARCOAL, CRISP, & READY',
    menu_kicker: 'Three good reasons', menu_title: 'Go with your craving.',
    menu_intro: 'Pizza, grill smoke, and warm comfort plates. Hit See Menu for the whole board, then call to order.',
    pizza_name: 'Vegetable Pizza', pizza_description: 'Roasted peppers, mushroom, red onion, sweetcorn, greens, and melty cheese.',
    mshikaki_name: 'Chicken and Chips', mshikaki_description: 'Crispy chicken, golden chips, ketchup, and lime.',
    ugali_name: 'Meat & Ugali', ugali_description: 'Soft ugali, grilled meat, greens, tomato, and lime.',
    see_menu: 'See Menu', or_call: 'Or call', to_order: 'to order',
    story_kicker: 'Our way', story_title: 'Fast food with a little fire in it.',
    story_description: 'We believe quick can still be considered. That means hard-seared burgers, crispy chicken with a real crunch, and sauces with enough character to make you reach for a napkin.',
    story_value_one: 'Hot food, every order', story_value_two: 'Simple, big ingredients', story_value_three: 'Order, then collect',
    visit_kicker: 'Find us', visit_title: 'Meet us at the counter.', visit_description: 'Come hungry, call to order, and take the good stuff with you. Get your order, then get on with your day.',
    location_label: 'Location', hours_label: 'Hours', hours_value: 'Mon-Sat 8am-10pm', need_it: 'Need it soon?',
    callout_one: 'Your order is a', callout_two: 'ring', callout_three: 'away.',
    callout_description: 'Give us a call, tell us what sounds good, and we’ll get your order on the board.',
    dialog_kicker: 'The full board', dialog_title: 'Pick your move.'
  },
  sw: {
    nav_home: 'Mwanzo', nav_menu: 'Menyu', nav_our_way: 'Namna Yetu', nav_visit: 'Tufikie', nav_visit_hours: 'Tufikie & Saa',
    call_to_order: 'Piga kuagiza', call_button: 'Piga', hero_title_one: 'Choma. Kunywa.', hero_title_two: 'Rudia.',
    hero_description: 'Kuku wa kuchoma, vinywaji vya rangi na sambusa za kuku. Piga kuagiza, tutapika moto moto.',
    hero_hint: 'Chakula kipya. Hakuna akaunti. Hakuna usumbufu.', ticker_one: 'CHOMA. MCHUZI. TUMA.', ticker_two: 'PIGA KUAGIZA', ticker_three: 'MAKAA, CRISPY, TAYARI',
    menu_kicker: 'Sababu tatu za kuanza', menu_title: 'Chagua unachotamani.',
    menu_intro: 'Pizza, harufu ya grill na sahani za kushibisha. Bonyeza Menyu kwa orodha yote, kisha piga kuagiza.',
    pizza_name: 'Pizza ya Mboga', pizza_description: 'Pilipili, uyoga, kitunguu chekundu, mahindi, mboga za majani na jibini laini.',
    mshikaki_name: 'Chipsi Kuku', mshikaki_description: 'Kuku wa kukaanga, chipsi za dhahabu, ketchup na limau.',
    ugali_name: 'Ugali Nyama', ugali_description: 'Ugali laini, nyama ya kuchoma, mboga za majani, nyanya na limau.',
    see_menu: 'Tazama Menyu', or_call: 'Au piga', to_order: 'kuagiza',
    story_kicker: 'Namna yetu', story_title: 'Chakula cha haraka chenye moto wa kweli.',
    story_description: 'Tunaamini chakula cha haraka kinaweza kutengenezwa kwa umakini. Burger za kuchoma, kuku crispy na michuzi yenye ladha halisi.',
    story_value_one: 'Chakula cha moto kila oda', story_value_two: 'Viungo rahisi, vikubwa', story_value_three: 'Agiza, kisha chukua',
    visit_kicker: 'Tupate', visit_title: 'Tukutane kaunta.', visit_description: 'Njoo na njaa, piga kuagiza, kisha chukua chakula kizuri. Chukua oda yako, endelea na siku yako.',
    location_label: 'Mahali', hours_label: 'Saa', hours_value: 'Jumatatu–Jumamosi 8am–10pm', need_it: 'Unahitaji haraka?',
    callout_one: 'Agizo lako ni', callout_two: 'simu', callout_three: 'moja mbali.',
    callout_description: 'Tupigie, tuambie unachotaka, nasi tutaweka oda yako kwenye grill.',
    dialog_kicker: 'Menyu yote', dialog_title: 'Chagua unachotaka.'
  }
};

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
  localStorage.setItem('salama-theme', isDark ? 'dark' : 'light');
}

function setLanguage(language) {
  const dictionary = translations[language];
  if (!dictionary) return;

  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  const isSwahili = language === 'sw';
  languageLabel.textContent = isSwahili ? 'EN' : 'SW';
  languageToggle?.setAttribute('aria-pressed', String(isSwahili));
  languageToggle?.setAttribute('aria-label', isSwahili ? 'Switch language to English' : 'Switch language to Kiswahili');
  localStorage.setItem('salama-language', language);
}

themeToggle?.addEventListener('click', () => {
  setTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
});

languageToggle?.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'sw' ? 'en' : 'sw');
});

setTheme(localStorage.getItem('salama-theme') || 'light');
setLanguage(localStorage.getItem('salama-language') || 'sw');

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
  scrollCue?.classList.toggle('is-hidden', window.scrollY > 72);
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
    const direction = item.dataset.parallaxDirection === 'up' ? 1 : -1;
    const distance = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewportMiddle) / viewportMiddle));
    const intensity = item.closest('.hero') ? 170 : 120;
    item.style.setProperty('--parallax-y', `${Math.round(distance * speed * intensity * direction)}px`);
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
