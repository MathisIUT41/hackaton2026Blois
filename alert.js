const menu = document.getElementById('navbar-menu-links');
const hamburger = document.getElementById('hamburger');
const indicator = document.querySelector('.alert-indicator');

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

if (indicator) {
  const triggerPulse = () => {
    indicator.classList.add('alert-bump');
    window.setTimeout(() => indicator.classList.remove('alert-bump'), 180);
  };

  triggerPulse();
  window.setInterval(triggerPulse, 4200);
}
