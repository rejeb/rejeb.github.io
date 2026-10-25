// Boot sequence on the home page (once per session, any key or tap skips it) and keyboard
// shortcuts: digits open programs, H goes home, G opens GitHub, Esc goes back;
// screenshot viewer on project pages; live versions, stars and forks.
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

  // Live versions (shields.io, which wraps Marketplace, Maven Central and GitHub with CORS) and
  // GitHub stars/forks, cached for an hour. The built-in values stay if a request fails.
  const cached = (key, url, pick) => {
    try {
      const c = JSON.parse(localStorage.getItem(key));
      if (c && Date.now() - c.t < 36e5) return Promise.resolve(c.v);
    } catch (e) {}
    return fetch(url).then(r => r.ok ? r.json() : Promise.reject(r.status)).then(j => {
      const v = pick(j);
      try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch (e) {}
      return v;
    });
  };
  document.querySelectorAll('[data-version]').forEach(el => {
    const src = el.dataset.version;
    if (!src) return;
    cached('ver:' + src, `https://img.shields.io/${src}.json`, j => j.value)
      .then(v => { if (/^v?\d/.test(v)) el.textContent = v.startsWith('v') ? v : 'v' + v; })
      .catch(() => {});
  });
  // GitHub Octicons star-16 and repo-forked-16 (MIT).
  const STAR = 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z';
  const FORK = 'M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z';
  const icon = d => `<svg class="oct" viewBox="0 0 16 16" aria-hidden="true"><path d="${d}"/></svg>`;
  document.querySelectorAll('[data-repo]').forEach(el => {
    const repo = el.dataset.repo;
    cached('gh:' + repo, `https://api.github.com/repos/${repo}`, j => ({ s: j.stargazers_count, f: j.forks_count }))
      .then(v => {
        const n = (k, w) => `${Number(k)} ${w}${k === 1 ? '' : 'S'}`;
        el.innerHTML = `${icon(STAR)} ${n(v.s, 'STAR')} · ${icon(FORK)} ${n(v.f, 'FORK')}`;
        el.hidden = false;
      })
      .catch(() => {});
  });

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
