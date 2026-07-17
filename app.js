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

const guideContent = {
  layers: {
    kicker: 'Kaj vidite',
    title: 'Vsaka plast nosi drugače.',
    text: 'Poročilo pokaže debelino in lastnosti plasti. Tako projektant ve, kje je dovolj nosilna podlaga in koliko izkopa je smiselno.'
  },
  water: {
    kicker: 'Zakaj je pomembno',
    title: 'Voda spremeni način gradnje.',
    text: 'Nivo podtalnice vpliva na klet, izkop, hidroizolacijo, ponikanje in odvodnjavanje. Zgodnji podatek prepreči pozne spremembe projekta.'
  },
  foundation: {
    kicker: 'Kaj dobi projektant',
    title: 'Kota temeljenja postane odločitev.',
    text: 'Na podlagi raziskav določimo priporočeno globino in pogoje temeljenja — dovolj varno, brez nepotrebnega predimenzioniranja.'
  }
};

const guideButtons = document.querySelectorAll('[data-guide]');
const guideCard = document.querySelector('.soil-card');
guideButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.guide;
    const content = guideContent[key];
    guideButtons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
    guideCard.dataset.activeLayer = key;
    document.querySelector('#guide-kicker').textContent = content.kicker;
    document.querySelector('#guide-title').textContent = content.title;
    document.querySelector('#guide-text').textContent = content.text;
  });
});

const calculator = document.querySelector('#scope-calculator');
const plotSize = document.querySelector('#plot-size');
const plotOutput = document.querySelector('#plot-size-output');

function updateCalculator() {
  if (!calculator) return;
  const building = calculator.elements.building.value;
  const terrain = calculator.elements.terrain.value;
  const size = Number(calculator.elements.size.value);
  plotOutput.textContent = `${size.toLocaleString('sl-SI')} m²`;

  let score = size > 1200 ? 2 : size > 700 ? 1 : 0;
  if (building === 'commercial' || building === 'slope') score += 2;
  if (building === 'extension') score -= 1;
  if (terrain === 'slope' || terrain === 'wet') score += 2;

  const result = score >= 4
    ? ['Razširjena raziskava', 'Terenski ogled, več raziskovalnih točk, ciljne laboratorijske preiskave in usklajeno geotehnično poročilo.', '14–25 delovnih dni']
    : score >= 2
      ? ['Poglobljena raziskava', 'Pregled dokumentacije, ciljne vrtine ali izkopi ter poročilo z dodatnim poudarkom na vodi ali stabilnosti.', '12–18 delovnih dni']
      : ['Standardna raziskava', 'Ogled dokumentacije, terenski obisk in geološko-geomehansko poročilo.', '10–14 delovnih dni'];

  document.querySelector('#scope-result').textContent = result[0];
  document.querySelector('#scope-detail').textContent = result[1];
  document.querySelector('#scope-time').textContent = result[2];
  document.querySelector('#calc-cta').dataset.result = result[0];
}

calculator?.addEventListener('input', updateCalculator);
updateCalculator();

const places = {
  ljubljana: {
    kicker: 'Osrednja Slovenija',
    title: 'Ljubljana in okolica',
    text: 'Prodno-peščene terase, lokalno barjanska tla in visoka podtalnica zahtevajo premišljen izbor raziskav.',
    tags: ['prod', 'podtalnica', 'mestna gradnja']
  },
  gorenjska: {
    kicker: 'Severozahod',
    title: 'Gorenjska',
    text: 'Ledeniški nanosi, prodne terase in strmejši robovi dolin. Dostopnost in stabilnost pobočja pogosto določata pristop.',
    tags: ['prod', 'morena', 'pobočja']
  },
  stajerska: {
    kicker: 'Vzhodna Slovenija',
    title: 'Štajerska',
    text: 'Glinena in meljasta tla ter lokalna plazovitost zahtevajo pozornost pri odvajanju vode in posedanju.',
    tags: ['glina', 'melj', 'plazovitost']
  },
  dolenjska: {
    kicker: 'Jugovzhod',
    title: 'Dolenjska',
    text: 'Kraški pojavi in neenakomerna kamninska podlaga lahko pomembno vplivajo na zasnovo temeljev.',
    tags: ['kras', 'apnenec', 'neenakomerna tla']
  },
  primorska: {
    kicker: 'Zahodna Slovenija',
    title: 'Primorska',
    text: 'Fliš, kraška podlaga in zahtevna pobočja. Pri izkopih sta posebej pomembni stabilnost in voda.',
    tags: ['fliš', 'kras', 'veter in voda']
  }
};

document.querySelectorAll('.map-point').forEach((button) => {
  button.addEventListener('click', () => {
    const place = places[button.dataset.place];
    document.querySelectorAll('.map-point').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelector('#map-kicker').textContent = place.kicker;
    document.querySelector('#map-title').textContent = place.title;
    document.querySelector('#map-text').textContent = place.text;
    document.querySelector('#map-tags').replaceChildren(...place.tags.map((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));
  });
});

document.querySelector('#calc-cta')?.addEventListener('click', () => {
  const result = document.querySelector('#calc-cta').dataset.result;
  const project = document.querySelector('[name="project"]');
  if (project && !project.value) project.value = `Rezultat orientacijskega izračuna: ${result}. `;
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Povpraševanje — ${data.get('name')}`);
  const body = encodeURIComponent([
    `Ime: ${data.get('name')}`,
    `Telefon: ${data.get('phone')}`,
    `E-pošta: ${data.get('email')}`,
    '',
    `Projekt: ${data.get('project')}`
  ].join('\n'));
  document.querySelector('#form-status').textContent = 'Odpiramo vaše e-poštno sporočilo …';
  window.location.href = `mailto:dir@geo-inz.si?subject=${subject}&body=${body}`;
});

const assistantDrawer = document.querySelector('.assistant-drawer');
const assistantOverlay = document.querySelector('.assistant-overlay');
const assistantFrame = assistantDrawer?.querySelector('iframe');

function setAssistant(open) {
  if (!assistantDrawer || !assistantOverlay) return;
  if (open && !assistantFrame.src) assistantFrame.src = 'geo-inz-cek-lista.html';
  assistantDrawer.classList.toggle('open', open);
  assistantOverlay.classList.toggle('open', open);
  assistantDrawer.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

document.querySelectorAll('[data-assistant-open]').forEach((button) => button.addEventListener('click', () => setAssistant(true)));
document.querySelectorAll('[data-assistant-close]').forEach((button) => button.addEventListener('click', () => setAssistant(false)));
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
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}
