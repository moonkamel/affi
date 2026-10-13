// Notifie Bing, Yandex, Seznam, Naver… (protocole IndexNow) des URLs du site après une mise en ligne.
// Usage : npm run build && npm run indexnow   (à lancer depuis une machine qui a accès à Internet).
// Google n'utilise pas IndexNow : pour Google, soumets le sitemap dans Search Console.
import { readFileSync, readdirSync } from 'node:fs';

const KEY = '80c7c33af51e118e73a6d449a2908b88'; // doit correspondre au fichier public/80c7c33af51e118e73a6d449a2908b88.txt
const DIST = new URL('../dist/', import.meta.url).pathname;
const xml = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(DIST + f, 'utf8')).join('');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error('Aucune URL trouvée : lance npm run build avant.');
const host = new URL(urls[0]).host;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow : ${urls.length} URLs envoyées pour ${host} → HTTP ${res.status}`);
