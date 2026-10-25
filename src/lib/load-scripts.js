// Loads legacy classic scripts from public/js once per session, in order.
// Their top-level `const`s can't be re-declared, so each src is cached and only injected once.
const cache = {};

function loadScript(src) {
  if (!cache[src]) {
    cache[src] = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = false;
      el.onload = resolve;
      el.onerror = () => {
        delete cache[src];
        reject(new Error(`Failed to load ${src}`));
      };
      document.body.appendChild(el);
    });
  }
  return cache[src];
}

export async function loadScripts(srcs) {
  for (const src of srcs) await loadScript(src);
}
