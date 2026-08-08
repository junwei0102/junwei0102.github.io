/* Junwei Quan — personal site.
   Two small jobs: highlight the current nav section, and remember the theme
   choice. The page reads fine without either — nothing here is load-bearing. */

(function () {
  'use strict';

  /* --- Theme -------------------------------------------------------------
     The inline script in <head> applies the stored choice before first paint;
     this only handles the toggle. With no stored choice we fall through to
     the OS preference, so the first click has to flip away from whatever the
     OS is currently giving us. */
  var toggle = document.getElementById('theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var stored = document.documentElement.getAttribute('data-theme');
      var current = stored ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* --- Scroll-spy --------------------------------------------------------
     Marks the nav link for whichever section is nearest the top of the
     viewport. Skips the CV link, which points at a PDF rather than an anchor. */
  var links = Array.prototype.filter.call(
    document.querySelectorAll('.nav a'),
    function (a) { return a.getAttribute('href').charAt(0) === '#'; }
  );

  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  var visible = new Set();

  function paint() {
    var top = null;

    sections.forEach(function (section) {
      if (!visible.has(section.id)) return;
      if (top === null || section.getBoundingClientRect().top < top.getBoundingClientRect().top) {
        top = section;
      }
    });

    links.forEach(function (a) {
      a.classList.toggle('is-current', top !== null && a.getAttribute('href') === '#' + top.id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        visible.add(entry.target.id);
      } else {
        visible.delete(entry.target.id);
      }
    });
    paint();
  }, { rootMargin: '-72px 0px -55% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();
