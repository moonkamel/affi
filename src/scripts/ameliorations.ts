// Améliorations communes à toutes les pages (chargées par BaseLayout).
// 1. Champs numériques : clavier numérique sans les défauts de <input type="number"> (molette qui change la
//    valeur, virgule refusée, flèches), espaces et symboles retirés à la sortie du champ.
// 2. Calculateurs (form.sim[id]) : dernières valeurs gardées sur l'appareil, bouton « Valeurs par défaut »,
//    lien de partage d'un calcul (valeurs dans l'adresse).
// 3. Recherche dans le site (Pagefind, chargée à la première ouverture) : bouton, touche « / » ou Ctrl+K.
// 4. Bouton « Haut de page » et mise en avant du résultat qui change.
// 5. Résultat flottant pendant la saisie, en-tête qui se replie sur mobile quand on descend.

const lire = (k: string) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const ecrire = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } };
const signaler = (el: Element) => { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };

// ───────── 1. Champs numériques ─────────
import './champs';

// ───────── 2. Mémoire et partage des calculateurs ─────────
const champsDe = (f: HTMLElement) => [...f.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[id], select[id]')]
  .filter((c) => !(c instanceof HTMLInputElement && ['file', 'button', 'submit', 'hidden'].includes(c.type)));
const valeurs = (f: HTMLElement) => Object.fromEntries(champsDe(f).map((c) => [c.id, c instanceof HTMLInputElement && c.type === 'checkbox' ? (c.checked ? '1' : '') : c.value]));
const appliquer = (f: HTMLElement, v: Record<string, string>) => {
  // Les listes d'abord (elles peuvent afficher ou masquer d'autres champs), puis les champs.
  const champs = champsDe(f).sort((a, b) => Number(b instanceof HTMLSelectElement) - Number(a instanceof HTMLSelectElement));
  for (const c of champs) {
    if (!(c.id in v)) continue;
    if (c instanceof HTMLInputElement && c.type === 'checkbox') c.checked = v[c.id] === '1';
    else c.value = v[c.id];
    signaler(c);
  }
};
const lienPartage = (f: HTMLElement) => {
  const p = new URLSearchParams(Object.entries(valeurs(f)).filter(([, x]) => x !== ''));
  return `${location.origin}${location.pathname}#calcul=${encodeURIComponent(p.toString())}`;
};

document.querySelectorAll<HTMLFormElement>('form.sim[id]:not([data-sans-memoire])').forEach((f) => {
  const cle = `logimalin-calcul:${location.pathname}:${f.id}`;
  const defauts = valeurs(f);
  const barre = document.createElement('div');
  barre.className = 'sim-barre';
  barre.innerHTML = '<span class="sim-barre-info" aria-live="polite"></span><button type="button" class="sim-lien" data-action="partager">Copier le lien de ce calcul</button><button type="button" class="sim-lien" data-action="defauts" hidden>Valeurs par défaut</button>';
  f.appendChild(barre);
  const info = barre.querySelector<HTMLElement>('.sim-barre-info')!;
  const btnDefauts = barre.querySelector<HTMLButtonElement>('[data-action="defauts"]')!;

  // Priorité : valeurs partagées dans l'adresse, puis dernières valeurs de ce visiteur (sauf paramètres d'URL,
  // utilisés par certains outils pour pré-remplir, comme le business plan repris de l'étude de marché).
  const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
  const partage = hash.get('calcul');
  if (partage) {
    appliquer(f, Object.fromEntries(new URLSearchParams(partage)));
    info.textContent = 'Calcul partagé chargé.';
    btnDefauts.hidden = false;
  } else if (!location.search) {
    const memo = lire(cle);
    if (memo && JSON.stringify(memo) !== JSON.stringify(defauts)) {
      appliquer(f, memo);
      info.textContent = 'Tes dernières valeurs ont été reprises.';
      btnDefauts.hidden = false;
    }
  }
  let minuteur = 0;
  const memoriser = () => { clearTimeout(minuteur); minuteur = window.setTimeout(() => {
    ecrire(cle, valeurs(f));
    btnDefauts.hidden = JSON.stringify(valeurs(f)) === JSON.stringify(defauts);
    // Dernier résultat, affiché dans « Reprends où tu en étais » sur la page des outils.
    const r = f.querySelector('.sim-out .big')?.textContent?.trim();
    const reprise = lire('logimalin-reprise') || {};
    reprise[location.pathname] = { r: r && r !== '–' && r.length < 40 ? r : '', t: Date.now() };
    ecrire('logimalin-reprise', reprise);
  }, 400); };
  f.addEventListener('input', memoriser);
  f.addEventListener('change', memoriser);
  barre.addEventListener('click', async (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    if (b.dataset.action === 'defauts') {
      appliquer(f, defauts);
      try { localStorage.removeItem(cle); } catch { /* sans importance */ }
      info.textContent = 'Valeurs par défaut rétablies.';
      btnDefauts.hidden = true;
    } else {
      const url = lienPartage(f);
      try { await navigator.clipboard.writeText(url); info.textContent = 'Lien copié : il ouvre ce calcul avec tes valeurs.'; }
      catch { window.prompt('Copie ce lien :', url); }
      try { navigator.sendBeacon('/api/mesure/partage-calcul'); } catch { /* sans importance */ }
    }
  });
});

// Résultat qui change : petite mise en avant (désactivée si l'utilisateur limite les animations).
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll<HTMLElement>('.sim-out .big').forEach((el) => {
    let avant = el.textContent;
    new MutationObserver(() => {
      if (el.textContent === avant) return;
      avant = el.textContent;
      el.classList.remove('maj'); void el.offsetWidth; el.classList.add('maj');
    }).observe(el, { childList: true, characterData: true, subtree: true });
  });
}

// ───────── 3. Recherche ─────────
const dialogue = document.getElementById('recherche') as HTMLDialogElement | null;
let rechercheChargee = false;
const ouvrirRecherche = async () => {
  if (!dialogue) return;
  dialogue.showModal();
  if (!rechercheChargee) {
    rechercheChargee = true;
    try {
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/pagefind/pagefind-ui.css'; document.head.appendChild(css);
      await new Promise<void>((ok, ko) => { const s = document.createElement('script'); s.src = '/pagefind/pagefind-ui.js'; s.onload = () => ok(); s.onerror = () => ko(); document.head.appendChild(s); });
      // @ts-expect-error PagefindUI est fourni par le script chargé ci-dessus.
      new window.PagefindUI({ element: '#recherche-ui', showSubResults: true, showImages: false, resetStyles: false, autofocus: true, translations: { clear_search: 'Effacer', placeholder: 'Rechercher un outil, un guide, un logiciel…', zero_results: 'Aucun résultat pour [SEARCH_TERM]. Essaie un autre mot, ou ouvre la page des outils.' } });
    } catch {
      document.getElementById('recherche-ui')!.innerHTML = '<p>La recherche n’est pas disponible pour le moment. <a href="/outils/">Voir tous les outils</a></p>';
    }
  }
  setTimeout(() => dialogue.querySelector<HTMLInputElement>('input')?.focus(), 50);
};
document.querySelectorAll('[data-ouvrir-recherche]').forEach((b) => b.addEventListener('click', ouvrirRecherche));
document.addEventListener('keydown', (e) => {
  const t = e.target as HTMLElement;
  const saisie = t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || t.isContentEditable;
  if ((e.key === '/' && !saisie) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); ouvrirRecherche(); }
});
dialogue?.addEventListener('click', (e) => { if (e.target === dialogue) dialogue.close(); });

// ───────── 4. Haut de page ─────────
const haut = document.getElementById('haut-de-page');
if (haut) {
  const maj = () => { haut.hidden = scrollY < innerHeight * 1.5; };
  addEventListener('scroll', maj, { passive: true });
  maj();
  haut.addEventListener('click', () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
}

// ───────── 5. Résultat flottant et en-tête mobile ─────────
// Sur un long formulaire, le résultat sort de l'écran : une pastille le rappelle et y ramène d'un geste.
const pastille = document.createElement('button');
pastille.type = 'button';
pastille.className = 'sim-flottant';
pastille.hidden = true;
pastille.innerHTML = '<span></span><b></b>';
document.body.appendChild(pastille);
let cible: HTMLElement | null = null;
const formsVisibles = new Set<Element>();
const sortis = new Set<Element>();
const majPastille = () => {
  const f = [...formsVisibles].find((x) => { const o = x.querySelector('.sim-out'); return o && sortis.has(o) && x.contains(document.activeElement); });
  const big = f?.querySelector<HTMLElement>('.sim-out .big');
  const txt = big?.textContent?.trim();
  if (!f || !big || !txt || txt === '–') { pastille.hidden = true; return; }
  cible = f.querySelector<HTMLElement>('.sim-out');
  const lib = cible?.querySelector(':scope > div:first-child:not(.big)')?.textContent?.trim() || 'Résultat';
  pastille.querySelector('span')!.textContent = lib.length > 28 ? 'Résultat' : lib;
  pastille.querySelector('b')!.textContent = txt;
  pastille.hidden = false;
};
const obsForm = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? formsVisibles.add(e.target) : formsVisibles.delete(e.target))); majPastille(); });
const obsOut = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? sortis.delete(e.target) : sortis.add(e.target))); majPastille(); });
document.querySelectorAll<HTMLElement>('form.sim').forEach((f) => {
  const out = f.querySelector('.sim-out');
  if (!out || !f.querySelector('.sim-out .big')) return;
  obsForm.observe(f); obsOut.observe(out);
  f.addEventListener('input', () => requestAnimationFrame(majPastille));
});
document.addEventListener('focusin', majPastille);
document.addEventListener('focusout', () => setTimeout(majPastille, 150));
pastille.addEventListener('click', () => {
  (document.activeElement as HTMLElement | null)?.blur();
  cible?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  pastille.hidden = true;
});

// Hauteur réelle de l'en-tête (barres collantes et ancres placées juste dessous).
const entete = document.querySelector<HTMLElement>('.site-header');
const mesurerEntete = () => { if (entete) document.documentElement.style.setProperty('--h-entete', `${entete.offsetHeight}px`); };
mesurerEntete();
addEventListener('resize', mesurerEntete, { passive: true });

// Accès direct à l'outil depuis le haut de la page (l'outil vient après le résumé).
const lienOutil = document.querySelector<HTMLAnchorElement>('[data-aller-outil]');
const outil = document.querySelector<HTMLElement>('.prose :is(form.sim, .gen-form, .gen, .dossier, .mx, .sim)');
if (lienOutil && outil) {
  if (!outil.id) outil.id = 'outil';
  lienOutil.href = `#${outil.id}`;
  lienOutil.hidden = outil.getBoundingClientRect().top < innerHeight * 0.9;
}

// En-tête : replié quand on descend, de retour dès qu'on remonte (mobile seulement, via le CSS).
let dernierY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if (Math.abs(y - dernierY) < 8) return;
  document.documentElement.classList.toggle('entete-cachee', y > dernierY && y > 160 && !document.querySelector('dialog[open]'));
  dernierY = y;
}, { passive: true });
document.addEventListener('focusin', (e) => { if ((e.target as Element).closest?.('.site-header')) document.documentElement.classList.remove('entete-cachee'); });
