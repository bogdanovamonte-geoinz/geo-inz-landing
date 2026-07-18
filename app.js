const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Povpraševanje za parcelo — ${data.get('name')}`);
  const body = encodeURIComponent([
    `Ime: ${data.get('name')}`,
    `Kontakt: ${data.get('contact')}`,
    '',
    `Lokacija in objekt: ${data.get('project')}`
  ].join('\n'));
  document.querySelector('#form-status').textContent = 'Odpiramo pripravljeno e-poštno sporočilo …';
  window.location.href = `mailto:dir@geo-inz.si?subject=${subject}&body=${body}`;
});

const assistantDrawer = document.querySelector('.assistant-drawer');
const assistantOverlay = document.querySelector('.assistant-overlay');
const assistantFrame = assistantDrawer?.querySelector('iframe');
const assistantClose = assistantDrawer?.querySelector('[data-assistant-close]');
let assistantTrigger = null;

function setAssistant(open, trigger = null) {
  if (!assistantDrawer || !assistantOverlay || !assistantFrame) return;
  if (open && !assistantFrame.getAttribute('src')) assistantFrame.setAttribute('src', 'geo-inz-cek-lista.html');
  if (open) assistantTrigger = trigger || document.activeElement;
  assistantDrawer.classList.toggle('open', open);
  assistantOverlay.classList.toggle('open', open);
  document.body.classList.toggle('assistant-open', open);
  assistantDrawer.setAttribute('aria-hidden', String(!open));
  assistantOverlay.setAttribute('aria-hidden', String(!open));
  document.querySelectorAll('[data-assistant-open]').forEach((button) => button.setAttribute('aria-expanded', String(open)));
  if (open) assistantClose?.focus();
  else if (assistantTrigger instanceof HTMLElement) assistantTrigger.focus();
}

document.querySelectorAll('[data-assistant-open]').forEach((button) => {
  button.addEventListener('click', () => setAssistant(true, button));
});
document.querySelectorAll('[data-assistant-close]').forEach((button) => {
  button.addEventListener('click', () => setAssistant(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && assistantDrawer?.classList.contains('open')) setAssistant(false);
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}
