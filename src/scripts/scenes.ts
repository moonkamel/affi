// Scènes de l'accueil pilotées par le défilement. Chaque [data-scene] reçoit --p (0 → 1) :
// - « pinned » et « horizontal » : avancement pendant que la scène reste collée à l'écran ;
// - « flux » : avancement pendant que la section traverse l'écran.
// Les scènes collées reçoivent aussi data-etape (étape en cours).
// - « boucle » : ne dépend pas du défilement ; les étapes s'enchaînent toutes seules et recommencent.
// Rien ne bouge si l'utilisateur limite les animations.
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
      if (type === 'boucle') continue;
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
  scenes.filter((s) => s.dataset.scene === 'boucle').forEach(boucle);
}

// Enchaîne les étapes d'une scène en boucle (4 s chacune). Pause hors de l'écran, quand l'onglet est caché,
// au survol ou au focus (pour lire et cliquer sans que le texte change), et avec le bouton [data-pause].
function boucle(s: HTMLElement) {
  const n = Number(s.dataset.etapes || 1), duree = 4000;
  const bouton = s.querySelector<HTMLButtonElement>('[data-pause]');
  let t = 0, avant = 0, visible = false, survol = false, arret = false, image = 0;
  const pose = () => {
    const p = t / (n * duree);
    s.style.setProperty('--p', p.toFixed(4));
    const e = String(Math.min(n - 1, Math.floor(t / duree)));
    if (s.dataset.etape !== e) s.dataset.etape = e;
  };
  const tourne = (now: number) => {
    t = (t + Math.min(100, now - avant)) % (n * duree);
    avant = now;
    pose();
    image = requestAnimationFrame(tourne);
  };
  const regle = () => {
    const actif = visible && !survol && !arret && !document.hidden;
    if (actif && !image) { avant = performance.now(); image = requestAnimationFrame(tourne); }
    if (!actif && image) { cancelAnimationFrame(image); image = 0; }
  };
  new IntersectionObserver(([x]) => { visible = x.isIntersecting; regle(); }).observe(s);
  document.addEventListener('visibilitychange', regle);
  s.addEventListener('pointerenter', () => { survol = true; regle(); });
  s.addEventListener('pointerleave', () => { survol = false; regle(); });
  s.addEventListener('focusin', () => { survol = true; regle(); });
  s.addEventListener('focusout', () => { survol = false; regle(); });
  bouton?.addEventListener('click', () => {
    arret = !arret;
    bouton.setAttribute('aria-pressed', String(arret));
    bouton.textContent = arret ? 'Reprendre l’animation' : 'Mettre en pause';
    (window as unknown as { mesure?: (e: string) => void }).mesure?.('journee-pause');
    regle();
  });
  pose();
}
