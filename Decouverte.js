
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.nova-faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

let cycleSeconds = 0;
function updateCycle() {
  cycleSeconds = (cycleSeconds + 1) % 47;
  const remaining = 47 - cycleSeconds;
  const el = document.getElementById('nova-cycle');
  if (el) el.textContent = remaining + 's';
}
setInterval(updateCycle, 1000);

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('navbar-menu-links');
if (hamburger && menu) {
  hamburger.addEventListener('click', () => menu.classList.toggle('open'));
}