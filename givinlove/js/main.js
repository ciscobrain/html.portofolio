/* Fondation Giv'in Love — interactions & animations */
(function () {
  'use strict';

  /* ---------- Thème (mode sombre) ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('gil-theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('gil-theme', next);
    });
  });

  /* ---------- Header au scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header && !header.classList.contains('header-solid')) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Révélations au scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const dur = 1800;
        const t0 = performance.now();
        const step = function (t) {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('fr-FR');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseInt(el.getAttribute('data-count'), 10).toLocaleString('fr-FR');
    });
  }

  /* ---------- Filtres (galerie / actualités) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    const targetSel = group.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSel);
    group.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const cat = btn.getAttribute('data-cat');
        items.forEach(function (it) {
          const show = cat === 'tous' || (it.getAttribute('data-cat') || '').split(' ').indexOf(cat) !== -1;
          it.classList.toggle('hidden', !show);
        });
        applyNewsSearch();
      });
    });
  });

  /* ---------- Recherche actualités ---------- */
  const newsSearch = document.getElementById('news-search');
  function applyNewsSearch() {
    if (!newsSearch) return;
    const q = newsSearch.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.news-card');
    let visible = 0;
    cards.forEach(function (c) {
      if (c.classList.contains('hidden')) return;
      const match = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
      c.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    const empty = document.querySelector('.news-empty');
    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  }
  if (newsSearch) newsSearch.addEventListener('input', applyNewsSearch);

  /* ---------- Lightbox galerie ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('figcaption');
    let current = 0;
    const visibleItems = function () {
      return Array.prototype.filter.call(
        document.querySelectorAll('.masonry-item'),
        function (it) { return !it.classList.contains('hidden'); }
      );
    };
    const show = function (idx) {
      const items = visibleItems();
      if (!items.length) return;
      current = (idx + items.length) % items.length;
      const item = items[current];
      const img = item.querySelector('img');
      lbImg.src = item.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
    };
    document.querySelectorAll('.masonry-item').forEach(function (item) {
      item.addEventListener('click', function () {
        show(visibleItems().indexOf(item));
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const close = function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lightbox.querySelector('.lb-close').addEventListener('click', close);
    lightbox.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Page don : montants & fréquence ---------- */
  const amountBtns = document.querySelectorAll('.amount-btn');
  const amountCustom = document.getElementById('don-libre');
  const donSummary = document.getElementById('don-summary');
  let donFreq = 'unique';
  function updateDonSummary() {
    if (!donSummary) return;
    const active = document.querySelector('.amount-btn.active');
    const val = amountCustom && amountCustom.value
      ? parseInt(amountCustom.value, 10)
      : (active ? parseInt(active.getAttribute('data-amount'), 10) : 0);
    if (!val || val <= 0) { donSummary.textContent = 'Choisissez un montant pour continuer.'; return; }
    donSummary.textContent = 'Votre don : ' + val.toLocaleString('fr-FR') + ' € ' +
      (donFreq === 'mensuel' ? 'par mois' : 'ponctuel') + '. Merci pour votre générosité !';
  }
  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      if (amountCustom) amountCustom.value = '';
      updateDonSummary();
    });
  });
  if (amountCustom) {
    amountCustom.addEventListener('input', function () {
      amountBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      updateDonSummary();
    });
  }
  document.querySelectorAll('.freq-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      donFreq = btn.getAttribute('data-freq');
      updateDonSummary();
    });
  });
  updateDonSummary();

  /* ---------- Formulaires (anti-spam honeypot) ---------- */
  document.querySelectorAll('form[data-guarded]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const hp = form.querySelector('.hp input');
      if (hp && hp.value) return; // bot détecté : on ignore silencieusement
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const ok = form.parentElement.querySelector('.form-success');
      if (ok) {
        ok.classList.add('show');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  });

  /* ---------- Newsletter ---------- */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input.checkValidity()) { input.reportValidity(); return; }
      const ok = form.parentElement.querySelector('.newsletter-ok');
      if (ok) ok.classList.add('show');
      form.reset();
    });
  });

  /* ---------- Retour en haut ---------- */
  const topBtn = document.querySelector('.back-to-top');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('show', window.scrollY > 700);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Année du footer ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
