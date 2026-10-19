// Générateurs de données structurées schema.org (JSON-LD).
import { SITE } from '../data/site';
import type { Software } from '../data/software';

export const abs = (path: string) => new URL(path, SITE.url).href;

const ORG_ID = abs('/#organization');
const SITE_ID = abs('/#website');

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/logo.png'), width: 512, height: 512 },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: abs('/'),
  name: SITE.name,
  description: SITE.tagline,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORG_ID },
});


export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const article = (o: {
  path: string;
  title: string;
  description: string;
  published: Date;
  updated: Date;
  image: string;
}) => ({
  '@type': 'Article',
  '@id': abs(o.path) + '#article',
  headline: o.title,
  description: o.description,
  datePublished: o.published.toISOString(),
  dateModified: o.updated.toISOString(),
  inLanguage: 'fr-FR',
  mainEntityOfPage: abs(o.path),
  image: abs(o.image),
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  isPartOf: { '@id': SITE_ID },
});

export const faqPage = (faq: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const softwareApp = (s: Software) => ({
  '@type': 'SoftwareApplication',
  name: s.name,
  url: s.website,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  ...(s.price.from !== null
    ? { offers: { '@type': 'Offer', price: s.price.from, priceCurrency: 'EUR' } }
    : {}),
});

export const itemList = (path: string, products: Software[]) => ({
  '@type': 'ItemList',
  '@id': abs(path) + '#classement',
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  numberOfItems: products.length,
  itemListElement: products.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: softwareApp(s),
  })),
});

/** Avis éditorial (note de l'auteur, pas des avis clients agrégés). */
export const review = (path: string, s: Software, rating: number, summary: string) => ({
  '@type': 'Review',
  '@id': abs(path) + '#avis',
  itemReviewed: softwareApp(s),
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  reviewBody: summary,
  reviewRating: { '@type': 'Rating', ratingValue: rating, bestRating: 10, worstRating: 0 },
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
