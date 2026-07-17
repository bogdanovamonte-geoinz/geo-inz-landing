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
    `Telefon: ${data.get('phone')}`,
    `E-pošta: ${data.get('email')}`,
    '',
    `Lokacija in objekt: ${data.get('project')}`
  ].join('\n'));
  document.querySelector('#form-status').textContent = 'Odpiramo pripravljeno e-poštno sporočilo …';
  window.location.href = `mailto:dir@geo-inz.si?subject=${subject}&body=${body}`;
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
