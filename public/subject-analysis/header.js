/* Renders the D.Tech site header (mirrors src/components/site-header.tsx) and adds keyboard support. Load as the first element in <body>. */
(function () {
  var NAV = [
    ['DateSheet', '/datesheet'],
    ['Result', '/result'],
    ['Timetable', '/timetable'],
    ['Subject Analysis', '/subject-analysis/index.html'],
    ['PYQ Solutions', '/pyq'],
    ['Placement Stats', 'https://dtu-tnp.vercel.app/', true],
    ['MOOC Practice', 'https://swayam-quiz.vercel.app/', true]
  ];
  function links() {
    return NAV.map(function (n) {
      var cur = n[0] === 'Subject Analysis' ? ' aria-current="page"' : '';
      var ext = n[2] ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a class="site-nav-link" href="' + n[1] + '"' + ext + cur + '>' + n[0] + '</a>';
    }).join('');
  }
  var sun = '<svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var moon = '<svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  var menu = '<svg class="icon-menu" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var close = '<svg class="icon-close" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  var html =
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<header class="site-header"><div class="site-header-inner">' +
    '<a href="/" class="site-logo"><span class="site-logo-badge">D.</span><span>Tech</span></a>' +
    '<nav aria-label="Main" class="site-nav">' + links() + '</nav>' +
    '<div class="site-actions">' +
    '<button type="button" class="icon-btn" id="theme-toggle" aria-label="Toggle dark mode">' + sun + moon + '</button>' +
    '<button type="button" class="icon-btn menu-btn" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' + menu + close + '</button>' +
    '</div></div>' +
    '<nav aria-label="Main" class="site-nav-mobile" id="mobile-nav" hidden>' + links() + '</nav>' +
    '</header>';
  document.body.insertAdjacentHTML('afterbegin', html);

  var root = document.documentElement;
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  });
  var mt = document.getElementById('menu-toggle'), mn = document.getElementById('mobile-nav');
  mt.addEventListener('click', function () {
    var open = mn.hidden;
    mn.hidden = !open;
    mt.setAttribute('aria-expanded', String(open));
    mt.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mt.classList.toggle('is-open', open);
  });

  // Keyboard support for clickable table cells (timetable slots, sortable headers).
  function enhance() {
    var els = document.querySelectorAll('.timetable td[data-slot], #dataTable th[data-sort]');
    Array.prototype.forEach.call(els, function (el) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      if (el.matches('td')) el.setAttribute('aria-label', 'Select slot ' + el.getAttribute('data-slot'));
      else el.setAttribute('aria-label', 'Sort by ' + el.textContent.trim());
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
