/* Applies the D.Tech theme before first paint. Same storage as next-themes: localStorage.theme = "light" | "dark" (default light). */
(function () {
  try {
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
