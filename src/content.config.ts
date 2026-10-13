import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  // Le chemin du fichier donne l'URL : src/content/articles/restaurant/logiciel-caisse-restaurant.mdx
  // → /restaurant/logiciel-caisse-restaurant/
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    /** H1 visible. */
    title: z.string(),
    /** Balise <title> : 45-60 caractères (la marque est ajoutée si la place le permet), mot-clé principal au début. */
    seoTitle: z.string().max(60),
    /** Meta description : 120-158 caractères, avec un bénéfice et un appel à l'action. */
    description: z.string().min(110).max(160),
    /** Mot-clé principal ciblé (documentation interne + contrôle). */
    keyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    type: z.enum(['comparatif', 'guide', 'avis', 'versus', 'alternatives', 'outil']),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /** Logiciels classés dans la page (ordre = classement) → tableau + ItemList JSON-LD. */
    products: z.array(z.string()).default([]),
    /** Pour les pages avis : logiciel évalué + note /10 → Review JSON-LD. */
    review: z.object({ product: z.string(), rating: z.number().min(0).max(10) }).optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Maillage interne explicite : slugs complets ("facturation/facture-electronique-2026"). */
    related: z.array(z.string()).default([]),
    /** Résumé « en bref » affiché en haut de page (bon pour les extraits et les réponses IA). */
    tldr: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
