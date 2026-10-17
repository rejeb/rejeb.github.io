// Boot sequence on the home page (once per session, any key or tap skips it) and keyboard
// shortcuts: digits open programs, H goes home, G opens GitHub, Esc goes back;
// screenshot viewer on project pages.
(function () {
  const boot = document.querySelector('[data-boot]');
  const screen = document.querySelector('[data-after-boot]');
  if (boot && screen) {
    let seen = false;
    try { seen = sessionStorage.getItem('booted') === '1'; sessionStorage.setItem('booted', '1'); } catch (e) {}
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduce) {
      document.documentElement.classList.add('js');
      const lines = [...boot.querySelectorAll('p')];
      const timers = lines.map((p, i) => setTimeout(() => p.classList.add('on'), 150 + i * 180));
      const finish = () => {
        timers.forEach(clearTimeout);
        lines.forEach(p => p.classList.add('on'));
        screen.classList.add('on');
        ['keydown', 'pointerdown'].forEach(t => document.removeEventListener(t, finish));
      };
      timers.push(setTimeout(finish, 150 + lines.length * 180 + 100));
      ['keydown', 'pointerdown'].forEach(t => document.addEventListener(t, finish));
    }
  }

  // Screenshot viewer.
  const viewer = document.getElementById('viewer');
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-view]');
    if (b) {
      document.getElementById('viewer-img').src = b.dataset.view;
      document.getElementById('viewer-img').alt = b.dataset.caption;
      document.getElementById('viewer-title').textContent = b.dataset.caption;
      viewer.showModal();
      return;
    }
    if (e.target.closest('[data-close]') || e.target === viewer) viewer.close();
  });

  document.addEventListener('keydown', e => {
    if (viewer && viewer.open) return; // Esc closes the dialog natively
    if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    if (e.key === 'Escape') { history.length > 1 ? history.back() : (location.href = '/'); return; }
    const link = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
    if (link) link.click();
  });
})();
