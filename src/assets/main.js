// Progena AI landing page behaviour: typed verbs, theme, menu and reveals.
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

  // ---- Compact request and single reply ----------------------------------
  const workflow = document.querySelector('[data-workflow-chat]');
  if (workflow && !reducedMotion) {
    const prompt = workflow.querySelector('[data-workflow-prompt]');
    const reply = workflow.querySelector('[data-workflow-response]');
    const text = new Map([prompt, reply].map(el => [el, el.textContent]));
    let visible = false;
    let timer;
    let pending;
    const schedule = (next, delay) => {
      clearTimeout(timer);
      pending = { next, delay };
      if (visible && !document.hidden) {
        timer = setTimeout(() => { pending = null; next(); }, delay);
      }
    };
    const type = (element, done, length = 0) => {
      const value = text.get(element);
      element.textContent = value.slice(0, length) || '\u200b';
      element.toggleAttribute('data-typing-active', length < value.length);
      if (length === value.length) done();
      else schedule(() => type(element, done, length + 1), 22);
    };
    const start = () => {
      text.forEach((value, el) => { el.textContent = '\u200b'; el.removeAttribute('data-typing-active'); });
      schedule(() => type(prompt, () => schedule(() => type(reply, () => schedule(start, 7000)), 650)), 400);
    };
    const syncPlayback = () => {
      clearTimeout(timer);
      if (visible && !document.hidden && pending) schedule(pending.next, pending.delay);
    };
    new IntersectionObserver((entries) => {
      visible = entries.some(entry => entry.isIntersecting);
      syncPlayback();
    }).observe(workflow);
    document.addEventListener('visibilitychange', syncPlayback);
    start();
  }

  // ---- Cloud ownership carousel: manual only; never captures wheel input. --
  const ownership = document.querySelector('[data-ownership]');
  if (ownership) {
    const panels = [...ownership.querySelectorAll('[data-ownership-panel]')];
    const choices = [...ownership.querySelectorAll('[data-ownership-choice]')];
    const status = ownership.querySelector('[data-ownership-status]');
    let selected = 0;
    const select = (index) => {
      selected = (index + panels.length) % panels.length;
      panels.forEach((panel, i) => { panel.hidden = i !== selected; });
      choices.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
      status.textContent = `${selected + 1} of ${panels.length} · ${choices[selected].textContent.trim()}`;
    };
    choices.forEach((button, i) => button.addEventListener('click', () => select(i)));
    ownership.querySelector('[data-ownership-prev]').addEventListener('click', () => select(selected - 1));
    ownership.querySelector('[data-ownership-next]').addEventListener('click', () => select(selected + 1));
    ownership.querySelector('.ownership__choices').addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = selected + 1;
      else if (event.key === 'ArrowLeft') next = selected - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = panels.length - 1;
      else return;
      event.preventDefault();
      select(next);
      choices[selected].focus();
    });
    select(0);
    ownership.classList.add('is-ready');
    ownership.setAttribute('role', 'region');
    ownership.setAttribute('aria-roledescription', 'carousel');
  }

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

  // ---- Automation idea browsing -----------------------------------------
  const ideaSection = document.querySelector('#ideas');
  if (ideaSection) {
    const cards = [...ideaSection.querySelectorAll('[data-idea-category]')];
    const filters = [...ideaSection.querySelectorAll('[data-ideas-filter]')];
    const count = ideaSection.querySelector('[data-ideas-count]');
    let category = filters[0].dataset.ideasFilter;
    const renderIdeas = () => {
      const matching = cards.filter(card => category === 'top' ? card.dataset.ideaTopPick === 'true' : card.dataset.ideaCategory === category);
      cards.forEach(card => { card.hidden = true; });
      matching.forEach(card => { card.hidden = false; });
      count.textContent = matching.length;
      filters.forEach(button => {
        const selected = button.dataset.ideasFilter === category;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('is-selected', selected);
      });
    };
    filters.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.ideasFilter;
      renderIdeas();
    }));
    renderIdeas();
  }

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
})();
