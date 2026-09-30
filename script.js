const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const toast = document.getElementById('toast');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') body.classList.add('dark');
function updateThemeIcon(){ themeToggle.textContent = body.classList.contains('dark') ? '☾' : '☼'; }
updateThemeIcon();
themeToggle.addEventListener('click', () => { body.classList.toggle('dark'); localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light'); updateThemeIcon(); });
menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => sidebar.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
window.addEventListener('scroll', () => {
  const current = sections.reduce((active, section) => window.scrollY >= section.offsetTop - 220 ? section.id : active, 'home');
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });

document.querySelectorAll('a[href^="mailto:"]').forEach(link => link.addEventListener('click', () => { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }, { passive: true });
