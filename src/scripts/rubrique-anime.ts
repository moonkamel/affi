// Pages de rubrique : lignes de liste qui apparaissent en cascade, compteurs de l'en-tête,
// sommaire des types de contenus qui suit la lecture. Rien de tout cela si l'utilisateur limite les animations.
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sommaire collant : le type de contenu en cours de lecture est mis en avant (utile aussi sans animation).
const ancres = [...document.querySelectorAll<HTMLAnchorElement>('.rub-ancres a')];
if (ancres.length && 'IntersectionObserver' in window) {
  const sections = ancres.map((a) => document.getElementById(a.hash.slice(1))?.closest('section')).filter((x): x is HTMLElement => Boolean(x));
  const visibles = new Set<Element>();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    const actuelle = sections.find((x) => visibles.has(x));
    ancres.forEach((a, i) => { if (actuelle) a.toggleAttribute('aria-current', sections[i] === actuelle); });
  }, { rootMargin: '-30% 0px -55% 0px' });
  sections.forEach((x) => io.observe(x));
}

if (!reduit && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('rub-anime');
  const lignes = [...document.querySelectorAll<HTMLElement>('.rub-liste > li')];
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('vu');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -5% 0px' });
  lignes.forEach((li, i) => { li.style.setProperty('--delai', `${(i % 2) * 70 + Math.floor((i % 6) / 2) * 50}ms`); io.observe(li); });

  const compteurs = [...document.querySelectorAll<HTMLElement>('.rub-chiffres [data-compteur]')];
  compteurs.forEach((el) => {
    const fin = Number(el.dataset.compteur), debut = performance.now();
    const pas = (t: number) => {
      const k = Math.min(1, (t - debut) / 900);
      el.textContent = String(Math.round(fin * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  });
}
