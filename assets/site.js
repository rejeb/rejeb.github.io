// RBR-OS: selection panes (home program list and Quickstart tabs, screenshot list), documentation shown one
// section at a time, keyboard shortcuts (digits select programs on the home page and switch workspaces elsewhere,
// Enter opens the selected program, H home, G GitHub, F/D features/docs, P/N previous/next section, Esc back),
// release log, live versions, stars and forks, screenshot and clip viewer.
(function () {
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // Selection panes. Every [data-picker] container with the same name shares one selection: buttons
  // [data-pick=i] select, panes [data-pane=i] show the selected item (the CSS hides the others).
  const select = (name, i) => {
    $$(`[data-picker="${name}"]`).forEach(box => {
      $$('[data-pick]', box).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.pick === String(i))));
      $$('[data-pane]', box).forEach(p => p.classList.toggle('on', p.dataset.pane === String(i)));
    });
  };

  // Documentation: the page is cut into its intro and its ## sections, and one shows at a time. The URL hash
  // names the section (or an element inside it), so links from other pages open the right one.
  const doc = document.querySelector('[data-doc]');
  let route = null;
  if (doc) {
    const units = [];
    let cur = { id: '', title: '', nodes: [] };
    [...doc.childNodes].forEach(n => {
      if (n.nodeName === 'H2' && n.id) {
        units.push(cur);
        cur = { id: n.id, title: n.textContent.trim(), nodes: [] };
      }
      cur.nodes.push(n);
    });
    units.push(cur);
    const blank = u => u.nodes.every(n => n.nodeType === 8 || (n.nodeType === 3 && !n.textContent.trim()));
    if (blank(units[0])) units.shift();
    if (units.length > 1) {
      units.forEach(u => {
        const w = document.createElement('div');
        w.dataset.unit = u.id;
        doc.insertBefore(w, u.nodes[0]);
        u.nodes.forEach(n => w.appendChild(n));
        u.el = w;
      });
      const title = (document.querySelector('#doc-top h1') || {}).textContent || '';
      const label = u => title.trim().toUpperCase() + (u.id ? ' · ' + u.title.toUpperCase() : '');
      const pos = document.querySelector('[data-pos]');
      const [prevSlot, nextSlot] = document.querySelector('[data-pager]').children;
      const pageLinks = [prevSlot.firstElementChild, nextSlot.firstElementChild];
      const secLinks = $$('[data-sec]');
      const introLink = document.querySelector('[data-intro]');
      const nav = document.querySelector('.tree-nav');
      const reveal = el => {
        if (!nav || !el || nav.scrollHeight <= nav.clientHeight) return;
        const n = nav.getBoundingClientRect(), r = el.getBoundingClientRect();
        if (r.top < n.top || r.bottom > n.bottom) nav.scrollTop += r.top - n.top - n.height / 3;
      };
      const link = (u, key, text) => {
        const a = document.createElement('a');
        a.href = u.id ? '#' + encodeURIComponent(u.id) : location.pathname;
        a.dataset.key = key;
        a.textContent = text;
        return a;
      };
      const show = unit => {
        units.forEach(u => { u.el.hidden = u !== unit; });
        const k = units.indexOf(unit);
        pos.textContent = `${pos.dataset.pos} · SECTION ${k + 1} / ${units.length}`;
        let on = introLink;
        secLinks.forEach(a => {
          const sel = a.dataset.sec === unit.id;
          a.classList.toggle('on', sel);
          if (sel) { a.setAttribute('aria-current', 'location'); on = a; } else a.removeAttribute('aria-current');
        });
        if (introLink) introLink.classList.toggle('on', !unit.id);
        reveal(on);
        prevSlot.replaceChildren(k > 0 ? link(units[k - 1], 'p', '◂ ' + label(units[k - 1])) : pageLinks[0] || '');
        nextSlot.replaceChildren(k < units.length - 1 ? link(units[k + 1], 'n', label(units[k + 1]) + ' ▸') : pageLinks[1] || '');
      };
      let at = '';
      route = user => {
        if (location.href === at) return;
        at = location.href;
        let target = null;
        try { target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
        const unit = (target && units.find(u => u.el.contains(target))) || units[0];
        show(unit);
        if (target && unit.el.contains(target) && target.nodeName !== 'H2') { target.scrollIntoView(); return; }
        const top = document.getElementById('doc-top');
        if (user && top && top.getBoundingClientRect().top < 0) top.scrollIntoView();
      };
      addEventListener('hashchange', () => route(true));
      addEventListener('popstate', () => route(true));
      route(false);
      // Opened on a section: its heading is the first thing in the page, so keep the title in view instead of
      // the browser's jump to the heading (unless the reader has scrolled since).
      const head = location.hash && document.querySelector('[data-unit]:not([hidden]) > h2');
      const unjump = () => { if (head && Math.abs(head.getBoundingClientRect().top) < 4) scrollTo(0, 0); };
      unjump();
      addEventListener('load', unjump, { once: true });
    }
  }

  // Tree groups fold and unfold. Where the tree sits above the page (narrow screens), the groups other than the
  // current page's start folded so the page is not pushed far down.
  const fold = (b, open) => {
    b.setAttribute('aria-expanded', String(open));
    document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    b.querySelector('.c').textContent = open ? '▾' : '▸';
  };
  const narrow = matchMedia('(max-width: 900px)').matches;
  $$('[data-toggle]').forEach(b => {
    if (narrow && !document.getElementById(b.getAttribute('aria-controls')).querySelector('[aria-current]')) fold(b, false);
    b.addEventListener('click', () => fold(b, b.getAttribute('aria-expanded') !== 'true'));
  });

  // Release log: NEW marks releases published since the previous visit (the last 30 days on a first visit).
  // The previous visit is read once per session, so reloading keeps the marks.
  const dated = $$('[data-date]');
  if (dated.length) {
    const DAY = 864e5;
    let last = null;
    try {
      let s = sessionStorage.getItem('rbr:login');
      if (s === null) {
        s = localStorage.getItem('rbr:last') || '';
        sessionStorage.setItem('rbr:login', s);
        localStorage.setItem('rbr:last', String(Date.now()));
      }
      last = s ? Number(s) : null;
    } catch (e) {}
    const end = d => Date.parse(d + 'T00:00:00Z') + DAY;
    const isNew = d => (last ? end(d) > last : Date.now() - end(d) < 30 * DAY);
    let fresh = 0;
    dated.forEach(el => {
      if (!isNew(el.dataset.date)) return;
      if (el.closest('.rel')) fresh++;
      const badge = document.createElement('span');
      badge.className = 'new';
      badge.textContent = 'NEW';
      el.insertBefore(badge, el.querySelector('a'));
    });
    const login = document.querySelector('[data-login]');
    if (login) {
      const day = new Date(last || 0).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      const since = fresh ? `${fresh} NEW RELEASE${fresh > 1 ? 'S' : ''} SINCE` : 'NO NEW RELEASES SINCE';
      login.textContent = last ? `LAST LOGIN: ${day.replace(/,/g, '').toUpperCase()} · ${since}` : 'FIRST LOGIN · WELCOME TO RBR-OS';
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
  const group = attr => $$(`[data-${attr}]`).reduce((m, el) => {
    const k = el.dataset[attr];
    if (k) (m[k] = m[k] || []).push(el);
    return m;
  }, {});
  Object.entries(group('version')).forEach(([src, els]) => {
    cached('ver:' + src, `https://img.shields.io/${src}.json`, j => j.value)
      .then(v => { if (/^v?\d/.test(v)) els.forEach(el => { el.textContent = v.startsWith('v') ? v : 'v' + v; }); })
      .catch(() => {});
  });
  // GitHub Octicons star-16 and repo-forked-16 (MIT).
  const STAR = 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z';
  const FORK = 'M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z';
  const icon = d => `<svg class="oct" viewBox="0 0 16 16" aria-hidden="true"><path d="${d}"/></svg>`;
  Object.entries(group('repo')).forEach(([repo, els]) => {
    cached('gh:' + repo, `https://api.github.com/repos/${repo}`, j => ({ s: j.stargazers_count, f: j.forks_count }))
      .then(v => {
        const n = (k, w) => `${Number(k)} ${w}${k === 1 ? '' : 'S'}`;
        els.forEach(el => {
          el.innerHTML = `${icon(STAR)} ${n(v.s, 'STAR')} · ${icon(FORK)} ${n(v.f, 'FORK')}`;
          el.hidden = false;
        });
      })
      .catch(() => {});
  });

  // Screenshot and clip viewer.
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewer-img');
  const viewerClip = document.getElementById('viewer-clip');
  const viewerHint = document.getElementById('viewer-hint');
  const show = (caption, isClip) => {
    viewerImg.hidden = isClip;
    viewerClip.hidden = !isClip;
    viewerHint.hidden = !isClip;
    viewerImg.alt = isClip ? '' : caption;
    document.getElementById('viewer-title').textContent = caption;
    viewer.showModal();
  };

  // Clips play once, on their own, when half visible; they pause out of view and behind the
  // viewer, and stay stopped once ended. With reduced motion they only play when enlarged.
  const clips = $$('[data-clip] video');
  const inView = new Set();
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resume = () => {
    if (calm || viewer.open) return;
    inView.forEach(v => { if (!v.ended) v.play().catch(() => {}); });
  };
  const watcher = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { inView.add(target); } else { inView.delete(target); target.pause(); }
    });
    resume();
  }, { threshold: 0.5 });
  clips.forEach(v => watcher.observe(v));
  document.addEventListener('ended', e => e.target.closest('.hud').classList.add('ended'), true);
  document.addEventListener('play', e => e.target.closest('.hud').classList.remove('ended'), true);

  document.addEventListener('click', e => {
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      const box = pick.closest('[data-picker]');
      if (box) select(box.dataset.picker, pick.dataset.pick);
      return;
    }
    // In split documentation, a link to this page without a hash shows its intro instead of reloading it.
    const a = e.target.closest('a[href]');
    if (a && route && a.origin === location.origin && a.pathname === location.pathname && !a.hash) {
      e.preventDefault();
      history.pushState(null, '', a.pathname + a.search);
      route(true);
      return;
    }
    const shot = e.target.closest('[data-view]');
    if (shot) {
      viewerImg.src = shot.dataset.view;
      show(shot.dataset.caption, false);
      return;
    }
    const clip = e.target.closest('[data-clip]');
    if (clip) {
      const v = clip.querySelector('video');
      if (v.ended) { v.play(); return; }
      clips.forEach(c => c.pause());
      viewerClip.poster = v.poster;
      viewerClip.src = v.src;
      show(clip.dataset.caption, true);
      viewerClip.play().catch(() => {});
      return;
    }
    if (e.target === viewerClip) {
      if (viewerClip.paused) { viewerClip.play(); } else { viewerClip.pause(); }
      return;
    }
    if (e.target.closest('[data-close]') || e.target === viewer) viewer.close();
  });
  // In the frame a click stops the clip, then resumes it, or replays it once it has ended.
  const hint = text => () => { viewerHint.textContent = text; };
  viewerClip.addEventListener('play', hint('[ ■ ] STOP'));
  viewerClip.addEventListener('pause', hint('[ ▶ ] RESUME'));
  viewerClip.addEventListener('ended', hint('[ ↻ ] REPLAY'));
  viewer.addEventListener('close', () => {
    viewerClip.pause();
    viewerClip.removeAttribute('src');
    viewerClip.load();
    viewerClip.closest('.hud').classList.remove('ended');
    resume();
  });

  document.addEventListener('keydown', e => {
    if (viewer.open) return; // Esc closes the dialog natively
    const t = e.target;
    if (e.ctrlKey || e.metaKey || e.altKey || t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName)) return;
    // Enter opens the program of a focused list entry, or the selected one when nothing is focused.
    if (e.key === 'Enter') {
      const entry = t.closest('[data-href]') ||
        (!t.closest('a, button, summary') && document.querySelector('[data-href][aria-pressed="true"]'));
      if (entry) { e.preventDefault(); location.href = entry.dataset.href; }
      return;
    }
    if (e.key === 'Escape') { if (history.length > 1) history.back(); else location.href = '/'; return; }
    const k = e.key.toLowerCase();
    if (k.length !== 1 || !/[a-z0-9]/.test(k)) return;
    // keys in the page win over the workspace bar (digits select a program on the home page)
    const el = document.querySelector(`main [data-key="${k}"]`) || document.querySelector(`[data-key="${k}"]`);
    if (!el) return;
    el.click();
    if (el.tagName === 'BUTTON') el.focus();
  });
})();
