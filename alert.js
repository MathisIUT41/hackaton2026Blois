const menu = document.getElementById('navbar-menu-links');
const hamburger = document.getElementById('hamburger');
const indicator = document.querySelector('.alert-indicator');
const alertBanner = document.querySelector('.alert-banner');
const alertTitle = document.getElementById('alert-title');
const alertStatusLine = document.getElementById('alert-status-line');
const alertBadge = document.getElementById('alert-badge');
const alertToggle = document.getElementById('alert-mode-toggle');

const alertStates = {
  confidentiel: ['Signal anormal détecté', 'Canal principal instable, validation en cours avant diffusion.', 'CONFIDENTIEL', 'Passer en public'],
  public: ['Signal validé pour diffusion', 'Le flux est stabilisé et prêt à être partagé à l’extérieur.', 'PUBLIC', 'Revenir en confidentiel'],
};

const storageKey = 'vizion-alert-mode';

function pulseIndicator() {
  if (!indicator) return;
  indicator.classList.add('alert-bump');
  window.setTimeout(() => indicator.classList.remove('alert-bump'), 180);
}

function applyAlertMode(mode) {
  const nextMode = alertStates[mode] ? mode : 'confidentiel';
  const [title, statusLine, badge, nextAction] = alertStates[nextMode];

  if (alertBanner) alertBanner.dataset.alertMode = nextMode;
  if (alertTitle) alertTitle.textContent = title;
  if (alertStatusLine) alertStatusLine.textContent = statusLine;
  if (alertBadge) {
    alertBadge.textContent = badge;
    alertBadge.className = `alert-status-badge ${nextMode}`;
  }
  if (alertToggle) {
    alertToggle.textContent = nextAction;
    alertToggle.setAttribute('aria-pressed', String(nextMode === 'public'));
  }

  pulseIndicator();

  try {
    window.localStorage.setItem(storageKey, nextMode);
  } catch (error) {
    // Ignore storage failures in restricted contexts.
  }
}

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

if (alertToggle) {
  alertToggle.addEventListener('click', () => {
    const currentMode = alertBanner?.dataset.alertMode === 'public' ? 'public' : 'confidentiel';
    applyAlertMode(currentMode === 'public' ? 'confidentiel' : 'public');
  });
}

if (indicator) {
  pulseIndicator();
  window.setInterval(pulseIndicator, 4200);
}

if (alertBanner) {
  try {
    applyAlertMode(window.localStorage.getItem(storageKey) || alertBanner.dataset.alertMode || 'confidentiel');
  } catch (error) {
    applyAlertMode(alertBanner.dataset.alertMode || 'confidentiel');
  }
}
