// Mobile nav toggle (header.html is injected via includes.js)
(function () {
  function init() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const btn = header.querySelector('.nav-toggle');
    if (!btn) return;

    const close = () => {
      header.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = header.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Click outside closes
    document.addEventListener('click', (e) => {
      if (!header.classList.contains('nav-open')) return;
      if (header.contains(e.target)) return;
      close();
    });

    // Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Resize up closes
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) close();
    });
  }

  // Expose for includes.js (header is injected after DOM load)
  window.HWA_INIT_NAV = init;
})();
