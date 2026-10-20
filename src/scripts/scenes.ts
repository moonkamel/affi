// Scènes de l'accueil pilotées par le défilement. Chaque [data-scene] reçoit --p (0 → 1) :
// - « pinned » et « horizontal » : avancement pendant que la scène reste collée à l'écran ;
// - « flux » : avancement pendant que la section traverse l'écran.
// Les scènes collées reçoivent aussi data-etape (étape en cours). Rien ne bouge si l'utilisateur limite les animations.
const scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
if (scenes.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('scenes');
  const borne = (x: number) => Math.min(1, Math.max(0, x));
  let attente = 0;
  const maj = () => {
    attente = 0;
    const h = innerHeight;
    for (const s of scenes) {
      if (s.dataset.scene === 'horizontal') {
        const piste = s.querySelector<HTMLElement>('.gm-piste');
        if (piste) s.style.setProperty('--decalage', `${Math.max(0, piste.scrollWidth - piste.clientWidth)}px`);
      }
      const r = s.getBoundingClientRect();
      if (r.bottom < -h || r.top > 2 * h) continue;
      const type = s.dataset.scene;
      const p = type === 'flux' ? borne((h - r.top) / (h + r.height)) : borne(-r.top / Math.max(1, r.height - h));
      s.style.setProperty('--p', p.toFixed(4));
      if (type === 'pinned') {
        const n = Number(s.dataset.etapes || 1);
        const e = String(Math.min(n - 1, Math.floor(p * n * 0.999)));
        if (s.dataset.etape !== e) s.dataset.etape = e;
      }
    }
  };
  const demander = () => { if (!attente) attente = requestAnimationFrame(maj); };
  addEventListener('scroll', demander, { passive: true });
  addEventListener('resize', demander, { passive: true });
  maj();
  document.querySelectorAll('[data-passer]').forEach((a) => a.addEventListener('click', () => (window as unknown as { mesure?: (e: string) => void }).mesure?.('journee-passer')));
}
