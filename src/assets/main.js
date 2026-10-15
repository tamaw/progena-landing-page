// Progena AI landing page behaviour: typed verbs, theme, menu, reveals, copy.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Typed verbs -------------------------------------------------------
  // Same rhythm as the app's pending-reply cursor: type forward one character
  // every 90ms, hold, delete backward, pause on empty, next word. Headline
  // instances hold longer and walk the verbs in order so every one is seen.
  const TYPE_MS = 90;
  const APP_PAUSE_MS = 1000;
  const HEADLINE_HOLD_MS = 2200;
  const HEADLINE_EMPTY_MS = 450;

  function startTyped(el) {
    const textEl = el.querySelector('.typed__text');
    const words = JSON.parse(el.dataset.words || '[]');
    const suffix = el.dataset.suffix || '';
    if (!textEl || words.length === 0) return;

    const headline = el.classList.contains('typed--hero') || el.classList.contains('typed--final');
    const holdMs = headline ? HEADLINE_HOLD_MS : APP_PAUSE_MS;
    const emptyMs = headline ? HEADLINE_EMPTY_MS : APP_PAUSE_MS;
    let index = Math.max(0, words.indexOf(el.dataset.first));
    let current = words[index] + suffix;
    let timer = null;
    let running = false;

    const nextWord = () => {
      if (headline || words.length < 2) {
        index = (index + 1) % words.length;
      } else {
        let pick = index;
        while (pick === index) pick = Math.floor(Math.random() * words.length);
        index = pick;
      }
      current = words[index] + suffix;
    };

    // A zero-width space keeps the line box (and the page) from collapsing
    // while the word is fully deleted.
    const show = (length) => {
      textEl.textContent = current.slice(0, length) || '\u200b';
    };

    const typeForward = (length) => {
      show(length);
      timer = length < current.length
        ? setTimeout(() => typeForward(length + 1), TYPE_MS)
        : setTimeout(() => deleteBackward(length - 1), holdMs);
    };

    const deleteBackward = (length) => {
      show(length);
      timer = length > 0
        ? setTimeout(() => deleteBackward(length - 1), TYPE_MS)
        : setTimeout(() => {
            nextWord();
            typeForward(1);
          }, emptyMs);
    };

    // Rendered fully typed on the server: hold it, then start the cycle.
    const resume = () => {
      if (running) return;
      running = true;
      timer = setTimeout(() => deleteBackward(textEl.textContent.length - 1), holdMs);
    };
    const pause = () => {
      running = false;
      clearTimeout(timer);
    };

    // Only animate while on screen.
    new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.isIntersecting ? resume : pause)();
    }).observe(el);
  }

  if (!reducedMotion) document.querySelectorAll('[data-typed]').forEach(startTyped);

  // ---- Theme -------------------------------------------------------------
  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#ffffff' : '#0e1014');
      try {
        localStorage.setItem('progena-theme', next);
      } catch {
        /* storage unavailable: theme still applies for this visit */
      }
    });
  }

  // ---- Mobile menu -------------------------------------------------------
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuButton && mobileNav) {
    const setOpen = (open) => {
      mobileNav.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
    };
    menuButton.addEventListener('click', () => setOpen(mobileNav.hidden));
    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  // ---- Header border on scroll ------------------------------------------
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Reveal on scroll + demo playback ----------------------------------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const demo = document.querySelector('.demo');
  if (demo) {
    new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        demo.classList.add('is-playing');
        observer.disconnect();
      }
    }, { threshold: 0.25 }).observe(demo);
  }

  // ---- Copy commands -----------------------------------------------------
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const label = button.querySelector('[data-copy-label]');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        if (label) label.textContent = 'Copied';
      } catch {
        if (label) label.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => {
        if (label) label.textContent = 'Copy';
      }, 1800);
    });
  });
})();
