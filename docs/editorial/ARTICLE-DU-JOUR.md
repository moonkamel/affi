# Article du jour : charte de la routine quotidienne

Une publication par jour ouvré, sans validation humaine. La qualité prime sur la régularité :
**s'il n'y a pas de sujet solide ce jour-là, on ne publie rien** et on le note dans le journal.

## 1. Choisir le sujet (dans cet ordre)
1. **Veille officielle des 7 derniers jours** : entreprendre.service-public.gouv.fr/actualites (source principale),
   urssaf.fr, impots.gouv.fr, bpifrance-creation.fr/entrepreneur/actualites, francetravail.fr, economie.gouv.fr,
   Journal officiel. Compléter par WebSearch (allowed_domains sur ces sites).
2. **Pertinence** : le sujet doit concerner les lecteurs du site (créateurs, auto-entrepreneurs, TPE, artisans,
   commerçants, employeurs de 0 à 10 salariés) et entrer dans une rubrique existante
   (`creer`, `comptabilite`, `facturation`, `equipe`, `encaissement`, `metiers`, `site-internet`, `crm`).
3. **Pas de doublon** : chercher dans `src/content/articles` (grep sur le mot-clé) et dans `journal.md`.
   - Si une page traite déjà le sujet → **mettre à jour cette page** (section « Ce qui change en 2026/2027 »,
     tldr, FAQ, champ `updated`) : c'est l'action prioritaire, elle rapporte souvent plus qu'une page neuve.
   - Sinon → nouvel article de type `guide`.
4. **Durée de vie** : préférer un angle durable (« Prélèvement des cotisations par les plateformes : ce qui change
   en 2027 ») à une brève (« Le gouvernement annonce… »). Pas de rumeur, pas de projet de loi non voté présenté
   comme acquis.
5. **Demande** : si un outil de mots-clés est disponible (Semrush keyword_research base fr, ou OpenSEO s'il reste des
   crédits), viser un mot-clé principal recherché. Sinon, partir des formulations des pages officielles.

## 2. Rédiger
- Fichier `src/content/articles/<rubrique>/<slug>.mdx`, slug court sans date ni année si le sujet peut durer.
- Frontmatter conforme à `src/content.config.ts` : `seoTitle` ≤ 60 caractères, mot-clé en tête ;
  `description` 110 à 160 caractères avec bénéfice et appel à l'action ; `type: guide` ; `published`/`updated`
  = date du jour ; 3 à 5 `tldr` ; 4 à 6 questions de `faq` ; 3 à 5 `related` vers des pages existantes ;
  `products: []`.
- Style du site : **tutoiement**, phrases courtes, concret, exemples chiffrés, aucun superlatif creux, aucune
  formule du type « dans un monde en constante évolution ». Signature collective (« la rédaction »), jamais de nom.
- Structure : intro de 2-3 phrases qui donne la réponse ; `## Ce qui change` ; `## Qui est concerné` ;
  `## Ce que tu dois faire` (étapes, dates) ; un exemple chiffré ; lien vers l'outil ou la page du site le plus utile.
  900 à 1 500 mots : assez pour répondre complètement, pas de remplissage.
- **Chaque chiffre, date ou condition** vient d'une source officielle lue ce jour-là (WebFetch). En cas de
  désaccord entre sources ou de doute, ne pas l'écrire. Ligne finale :
  `Sources : [nom](url), [nom](url). Vérifié le JJ/MM/AAAA.`
- Maillage : ajouter un lien vers le nouvel article depuis 1 à 2 pages existantes proches (phrase naturelle).
- Interdits : `AffLink` et `ProductCard` dans les articles d'actualité (ils garderont ainsi les emplacements
  publicitaires) ; aucune affiliation sur banques, assurances, Qonto, Shine ; pas de contenu copié (reformuler,
  citer).

## 3. Contrôler avant de publier
1. `npm run build` puis `npm run check` : zéro erreur, zéro avertissement.
2. Relecture adversariale du texte : chiffres recoupés avec la source, dates au bon format, pas de faute,
   pas de phrase générique, réponse donnée dès l'intro, pas de cannibalisation avec une page existante.
3. Si un contrôle échoue et ne se corrige pas proprement : ne rien publier, noter la raison dans le journal.

## 4. Publier
- Commit `Article du jour : <titre court>` avec les lignes d'attribution habituelles, push sur
  `claude/clever-lamport-jokvuo` (Cloudflare Pages déploie).
- Soumettre l'URL (et les pages mises à jour) à IndexNow via OpenSEO `submit_indexnow_urls`
  (projet 843bb08b-66e9-4e4b-8f7f-1b17cd27f773) si l'outil répond ; sinon le noter.
- Ajouter une ligne à `docs/editorial/journal.md`.

## 5. Le vendredi
Faire en plus un bilan de la semaine dans le journal : articles publiés, et, si la Search Console est lisible
(OpenSEO `get_search_console_performance`), impressions et clics des articles du jour publiés depuis plus de
14 jours. Un article sans aucune impression après 6 semaines : l'améliorer ou le fusionner dans une page proche.
