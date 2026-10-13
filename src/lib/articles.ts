import { getCollection, type CollectionEntry } from 'astro:content';
import { SILOS, type Silo } from '../data/site';

export type Article = CollectionEntry<'articles'>;

export const articlePath = (a: Article) => `/${a.id}/`;
export const siloOf = (a: Article) => a.id.split('/')[0] as Silo;

export async function getArticles() {
  const all = await getCollection('articles', (a) => !a.data.draft);
  for (const a of all) {
    if (!(siloOf(a) in SILOS)) throw new Error(`Silo inconnu pour ${a.id}`);
  }
  return all.sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf());
}

export const toTile = (a: Article) => ({
  href: articlePath(a),
  title: a.data.title,
  description: a.data.description,
});
