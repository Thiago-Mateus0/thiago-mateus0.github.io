// Destaca na navegação a seção visível
const links = document.querySelectorAll('.nav a');
const sections = [...links].map((a) => document.querySelector(a.getAttribute('href')));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((s) => s && navObserver.observe(s));

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Revelação suave dos blocos ao rolar
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.job, .rows > li, .services article, .toolbox > div')
  .forEach((el) => { el.classList.add('reveal'); revealObserver.observe(el); });

// Hora local ao vivo na barra lateral
const timeEl = document.getElementById('local-time');
const tick = () => {
  timeEl.textContent = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo',
  }) + ' · UTC−3';
};
tick();
setInterval(tick, 30_000);

// Copiar e-mail
const copyBtn = document.querySelector('.copy');
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.copy);
    copyBtn.querySelector('span').textContent = 'copiado ✓';
  } catch {
    copyBtn.querySelector('span').textContent = 'não foi possível copiar';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Alternância de tema claro/escuro (lembra a escolha quando o navegador permite)
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const currentTheme = () => root.dataset.theme
  || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
const applyTheme = (theme) => {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === 'light' ? '☾' : '☀';
};

try {
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
} catch {}
themeBtn.textContent = currentTheme() === 'light' ? '☾' : '☀';

themeBtn.addEventListener('click', () => {
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch {}
});
