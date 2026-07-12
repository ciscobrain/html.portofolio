/* Espace administrateur (démonstration) — les données sont stockées dans le navigateur. */
(function () {
  'use strict';

  var loginView = document.getElementById('login-view');
  var dashView = document.getElementById('dash-view');
  var logoutBtn = document.getElementById('btn-logout');
  if (!loginView || !dashView) return;

  /* ---------- Session ---------- */
  function setView(logged) {
    loginView.style.display = logged ? 'none' : '';
    dashView.style.display = logged ? '' : 'none';
    logoutBtn.style.display = logged ? '' : 'none';
  }
  setView(sessionStorage.getItem('gil-admin') === '1');

  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var u = document.getElementById('adm-user').value.trim();
    var p = document.getElementById('adm-pass').value;
    if (u === 'admin' && p === 'givinlove') {
      sessionStorage.setItem('gil-admin', '1');
      setView(true);
    } else {
      alert('Identifiants incorrects. En mode démonstration : admin / givinlove');
    }
  });
  logoutBtn.addEventListener('click', function () {
    sessionStorage.removeItem('gil-admin');
    setView(false);
  });

  /* ---------- Navigation entre panneaux ---------- */
  var navBtns = document.querySelectorAll('.admin-nav button');
  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      navBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.admin-panel').forEach(function (p) { p.classList.remove('active'); });
      document.getElementById('panel-' + btn.getAttribute('data-panel')).classList.add('active');
    });
  });

  /* ---------- Stockage local ---------- */
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function write(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function render(key) {
    var list = document.querySelector('[data-list="' + key + '"]');
    if (!list) return;
    var items = read(key);
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<p class="form-note">Aucun élément pour le moment.</p>';
      return;
    }
    items.forEach(function (it, i) {
      var row = document.createElement('div');
      row.className = 'admin-item';
      var info = document.createElement('div');
      var strong = document.createElement('strong');
      strong.textContent = it.titre;
      var small = document.createElement('small');
      small.textContent = (it.extra ? it.extra + ' — ' : '') + (it.detail || '') +
        (it.date ? '  ·  ajouté le ' + it.date : '');
      info.appendChild(strong);
      info.appendChild(small);
      var del = document.createElement('button');
      del.className = 'admin-del';
      del.type = 'button';
      del.textContent = 'Supprimer';
      del.addEventListener('click', function () {
        items.splice(i, 1);
        write(key, items);
        render(key);
      });
      row.appendChild(info);
      row.appendChild(del);
      list.appendChild(row);
    });
  }

  document.querySelectorAll('.admin-form').forEach(function (form) {
    var key = form.getAttribute('data-store');
    render(key);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var items = read(key);
      items.unshift({
        titre: (form.elements.titre && form.elements.titre.value) || '',
        extra: (form.elements.extra && form.elements.extra.value) || '',
        detail: (form.elements.detail && form.elements.detail.value) || '',
        date: new Date().toLocaleDateString('fr-FR')
      });
      write(key, items);
      form.reset();
      render(key);
    });
  });

  /* ---------- Messages de démonstration ---------- */
  var demo = document.getElementById('demo-messages');
  if (demo) {
    [
      { titre: 'Awa K. — Devenir bénévole', detail: 'Bonjour, je souhaite rejoindre vos équipes à Abidjan…', date: '02/07/2026' },
      { titre: 'Michel R. — Faire un don', detail: 'Comment mettre en place un don mensuel depuis la Suisse ?', date: '28/06/2026' },
      { titre: 'ONG Espoir Partagé — Partenariat', detail: 'Nous aimerions coopérer sur un projet de reboisement…', date: '19/06/2026' }
    ].forEach(function (m) {
      var row = document.createElement('div');
      row.className = 'admin-item';
      row.innerHTML = '<div><strong></strong><small></small></div>';
      row.querySelector('strong').textContent = m.titre;
      row.querySelector('small').textContent = m.detail + '  ·  reçu le ' + m.date;
      demo.appendChild(row);
    });
  }
})();
