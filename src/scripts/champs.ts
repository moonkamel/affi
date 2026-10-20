// Champs numériques (pages du site et calculateurs intégrables) : clavier numérique sans les défauts de
// <input type="number"> (molette qui change la valeur, virgule refusée, flèches), espaces et symboles
// retirés à la sortie du champ.
const signaler = (el: Element) => { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };

const champNumerique = (i: HTMLInputElement) => {
  if (i.dataset.num) return;
  i.dataset.num = '1';
  if (i.type === 'number') {
    const entier = i.getAttribute('inputmode') === 'numeric' || (i.step && !i.step.includes('.') && i.step !== 'any' && Number(i.step) >= 1 && !(Number(i.min) % 1));
    i.type = 'text';
    i.inputMode = entier ? 'numeric' : 'decimal';
  }
  i.autocomplete = 'off';
  i.setAttribute('enterkeyhint', 'done');
  i.setAttribute('spellcheck', 'false');
  // Sélectionne le contenu au premier clic : on remplace la valeur d'exemple sans devoir l'effacer.
  i.addEventListener('focus', () => setTimeout(() => { if (i.value === '-') return; try { i.select(); } catch { /* champ non sélectionnable */ } }, 0));
  // Nettoyage à la sortie : « 1 200 € » ou « 12 % » deviennent « 1200 » et « 12 ».
  i.addEventListener('blur', () => {
    const propre = i.value.replace(/[\s  €%]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '');
    if (propre !== i.value) { i.value = propre; signaler(i); }
  });
};
const preparerChamps = (racine: ParentNode) => {
  racine.querySelectorAll<HTMLInputElement>('input[type="number"], input[inputmode="decimal"], input[inputmode="numeric"]').forEach(champNumerique);
};
preparerChamps(document);
new MutationObserver((m) => m.forEach((r) => r.addedNodes.forEach((n) => { if (n instanceof Element) preparerChamps(n); })))
  .observe(document.body, { childList: true, subtree: true });
// Entrée dans un champ d'un calculateur : ferme le clavier au lieu de recharger la page.
document.addEventListener('keydown', (e) => {
  const t = e.target as HTMLElement;
  if (e.key === 'Enter' && t instanceof HTMLInputElement && t.closest('.sim') && t.type !== 'submit') { e.preventDefault(); if (matchMedia('(pointer: coarse)').matches) t.blur(); }
});

