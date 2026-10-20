// Pages d'articles : barre de lecture (et chapitre en cours sur mobile), sommaire flottant qui suit la lecture
// avec le temps restant, suggestion « À lire ensuite » en fin d'article, apparitions douces des blocs.
// La barre, le sommaire et la suggestion restent actifs si l'utilisateur limite les animations ; les apparitions non.
const prose = document.querySelector<HTMLElement>('.prose');
const barre = document.querySelector<HTMLElement>('.lecture');
if (prose && barre) {
  const minutes = Number(barre.dataset.minutes || 1);
  const titre = barre.querySelector<HTMLElement>('.lecture-titre')!;
  const toc = document.querySelector<HTMLElement>('.toc-flottant');
  const anneau = toc?.querySelector<SVGCircleElement>('.toc-anneau');
  const reste = toc?.querySelector<HTMLElement>('.toc-reste');
  const tocInline = document.querySelector<HTMLElement>('.prose .toc');
  const liens = [...(toc?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
  const h2 = [...prose.querySelectorAll<HTMLElement>(':scope > h2[id]')];
  const suite = document.querySelector<HTMLElement>('[data-suite]');
  let suiteFermee = false;
  try { suiteFermee = sessionStorage.getItem('logimalin-suite-fermee') === '1'; } catch { /* sans importance */ }
  suite?.querySelector('a')?.addEventListener('click', () => (window as unknown as { mesure?: (e: string) => void }).mesure?.('suite-lire'));
  suite?.querySelector('.suite-fermer')?.addEventListener('click', () => {
    suite.hidden = true; suiteFermee = true;
    try { sessionStorage.setItem('logimalin-suite-fermee', '1'); } catch { /* sans importance */ }
  });

  let attente = 0, dernier = '';
  const maj = () => {
    attente = 0;
    const h = innerHeight, r = prose.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (h * 0.35 - r.top) / Math.max(1, r.height - h * 0.6)));
    barre.style.setProperty('--lecture', p.toFixed(4));
    // Chapitre en cours : dernier intertitre passé sous le haut de l'écran.
    let courant: HTMLElement | undefined;
    for (const t of h2) { if (t.getBoundingClientRect().top < h * 0.35) courant = t; else break; }
    const id = courant?.id ?? '';
    if (id !== dernier) {
      dernier = id;
      titre.textContent = courant?.textContent?.trim() ?? '';
      liens.forEach((a) => a.toggleAttribute('aria-current', a.hash === `#${encodeURIComponent(id)}` || decodeURIComponent(a.hash.slice(1)) === id));
    }
    barre.classList.toggle('avec-titre', Boolean(courant));
    if (toc) {
      toc.classList.toggle('visible', !tocInline || tocInline.getBoundingClientRect().bottom < 0);
      if (anneau) anneau.style.strokeDashoffset = String(100 - p * 100);
      if (reste) reste.textContent = p > 0.97 ? 'Lecture terminée' : `${Math.max(1, Math.round(minutes * (1 - p)))} min restante${Math.round(minutes * (1 - p)) > 1 ? 's' : ''}`;
    }
    if (suite && !suiteFermee) suite.hidden = p < 0.8;
  };
  const demander = () => { if (!attente) attente = requestAnimationFrame(maj); };
  addEventListener('scroll', demander, { passive: true });
  addEventListener('resize', demander, { passive: true });
  maj();

  // Apparitions des blocs, notes qui comptent jusqu'à leur valeur.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('art-anime');
    const blocs = [...prose.querySelectorAll<HTMLElement>(':scope > h2, .card, .md-table, .table-wrap, .callout, .verdict, .faq, .infographic, figure, .voisins')];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add('vu');
      io.unobserve(el);
      const note = el.matches('.card') ? el.querySelector<HTMLElement>('.score') : null;
      const n = note?.firstChild;
      if (note && n && n.nodeType === Node.TEXT_NODE) {
        const fin = parseFloat((n.textContent || '').replace(',', '.'));
        if (Number.isFinite(fin)) {
          const debut = performance.now();
          const pas = (t: number) => {
            const k = Math.min(1, (t - debut) / 800);
            n.textContent = (fin * (1 - Math.pow(1 - k, 3))).toFixed(1).replace('.', ',');
            if (k < 1) requestAnimationFrame(pas);
          };
          requestAnimationFrame(pas);
        }
      }
    }), { rootMargin: '0px 0px -8% 0px' });
    blocs.forEach((b) => {
      b.classList.add('apparait');
      b.querySelectorAll<HTMLElement>('tbody tr').forEach((tr, i) => tr.style.setProperty('--i', String(Math.min(i, 12))));
      io.observe(b);
    });
  }
}
