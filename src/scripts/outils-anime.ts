// Pages des outils et des modèles : cartes qui apparaissent en cascade, légère inclinaison sous le pointeur,
// compteurs du bandeau final. Rien de tout cela si l'utilisateur limite les animations.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const cartes = [...document.querySelectorAll<HTMLElement>('.out-grille > li')];
  document.documentElement.classList.add('out-anime');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('vu');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -6% 0px' });
  cartes.forEach((li, i) => { li.style.setProperty('--delai', `${(i % 3) * 60}ms`); io.observe(li); });

  // Inclinaison 3D au survol (souris uniquement).
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('.out-grille .acc-carte, .mod-grille .mod-cadre').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
        c.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
        c.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        c.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
      c.addEventListener('pointerleave', () => { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); });
    });
  }

  // Compteurs du bandeau final.
  const compteurs = [...document.querySelectorAll<HTMLElement>('[data-compteur]')];
  const ioc = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    ioc.unobserve(e.target);
    const el = e.target as HTMLElement, fin = Number(el.dataset.compteur), suffixe = el.dataset.suffixe || '';
    if (!fin) return;
    const debut = performance.now();
    const pas = (t: number) => {
      const k = Math.min(1, (t - debut) / 900);
      el.textContent = `${Math.round(fin * (1 - Math.pow(1 - k, 3)))}${suffixe}`;
      if (k < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  }), { threshold: 0.6 });
  compteurs.forEach((c) => ioc.observe(c));
}
