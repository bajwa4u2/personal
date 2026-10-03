import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const manifest = JSON.parse(await readFile(join(root, 'route-manifest.json'), 'utf8'));
const forbidden = /(?:company[\\/]website|personal[\\/]bajwa|\.\.[\\/]website|\.\.[\\/]bajwa)/i;
const discovery = JSON.parse(await readFile(join(root, 'src', 'discovery', 'pages.json'), 'utf8'));
const required = [...manifest.canonicalRoutes.map((route) => route === '/' ? 'index.html' : `${route.slice(1)}/index.html`), '404.html', 'site.css', 'shell.js', 'mobile-navigation.css', 'build-info.json', 'robots.txt', 'sitemap.xml'];

if (manifest.canonicalRoutes.some((route) => ['/story', '/work', '/contact'].includes(route))) {
  throw new Error('Retired founder route remains canonical');
}

for (const file of required) await access(join(dist, file));
for (const file of required.filter((file) => /\.(html|css|js|json)$/.test(file))) {
  const contents = await readFile(join(dist, file), 'utf8');
  if (forbidden.test(contents)) throw new Error(`Legacy runtime reference in ${file}`);
}
await access(join(root, 'worker.js'));
await access(join(root, 'wrangler.jsonc'));
const worker = await readFile(join(root, 'worker.js'), 'utf8');
if (forbidden.test(worker)) throw new Error('Legacy runtime reference in worker.js');

for (const route of manifest.canonicalRoutes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
  const html = await readFile(join(dist, file), 'utf8');
  if (!html.includes('role="banner"') || !html.includes('<main') || !html.includes('role="contentinfo"') || !html.includes('mobile-navigation.css')) {
    throw new Error(`Missing shell landmarks in ${file}`);
  }
  if (!html.includes(`data-canonical-route="${route}"`)) throw new Error(`Missing route marker in ${file}`);
  const page = discovery.pages[route];
  if (!page) throw new Error(`Missing discovery contract for ${route}`);
  const url = `${discovery.baseUrl}${route === '/' ? '/' : route}`;
  for (const marker of [`<title>${page.title}</title>`, `rel="canonical" href="${url}"`, `property="og:url" content="${url}"`, 'property="og:image"', 'property="og:image:type" content="image/png"', 'property="og:image:width" content="1200"', 'property="og:image:height" content="630"', 'name="robots" content="index,follow"']) if (!html.includes(marker)) throw new Error(`Discovery marker missing in ${file}: ${marker}`);
  const og = route === '/' ? 'home' : route.slice(1);
  const ogFile = join(dist, 'assets', 'og', `${og}.png`);
  await access(ogFile);
  const ogInfo = await sharp(ogFile).metadata();
  if (ogInfo.format !== 'png' || ogInfo.width !== 1200 || ogInfo.height !== 630) throw new Error(`Invalid raster OG asset for ${route}`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) throw new Error(`JSON-LD missing in ${file}`);
  for (const block of ld) JSON.parse(block[1]);
}
const journeyHtml = await readFile(join(dist, 'journey', 'index.html'), 'utf8');
if (/<video\b|founder\.mp4|founder-poster/i.test(journeyHtml)) throw new Error('Journey duplicates the Home founder video');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
for (const route of manifest.canonicalRoutes) {
  if (!sitemap.includes(`${manifest.canonicalBase}${route === '/' ? '/' : route}`)) throw new Error(`Missing canonical route in sitemap: ${route}`);
}
if (/story|work|contact/.test(sitemap)) throw new Error('Retired route in sitemap');
if (!sitemap.includes('https://bajwa.auraplatform.org/start-a-conversation')) throw new Error('Canonical relationship route missing in sitemap');
if (!/Sitemap:\s*https:\/\/bajwa\.auraplatform\.org\/sitemap\.xml/.test(await readFile(join(dist, 'robots.txt'), 'utf8'))) throw new Error('Robots sitemap reference missing');
for (const [legacy, target] of Object.entries({ '/story': '/journey', '/work': '/journey', '/contact': '/start-a-conversation' })) {
  if (!worker.includes(`'${legacy}': '${target}'`)) throw new Error(`Missing compatibility redirect ${legacy}`);
}
console.log(`Verified ${manifest.canonicalRoutes.length} founder canonical routes, isolated output, landmarks, and legacy isolation.`);

// The closed mobile menu sits off-screen; its backdrop shadow must not (2026-10-02: every phone page
// was under a 42% veil because the closed panel still cast its full-screen shadow).
{
  const nav = await readFile(join(dist, 'mobile-navigation.css'), 'utf8');
  const closed = nav.match(/\{[^{}]*translateX\(-105%\)[^{}]*\}/)?.[0] ?? '';
  if (!closed) throw new Error('Closed mobile menu rule not found');
  if (/100vw 0 0 100vw/.test(closed)) throw new Error('Closed mobile menu casts the full-screen backdrop');
  console.log('Verified the closed mobile menu casts no backdrop.');
}

// ── The Record (2 Oct 2026): founder decisions that must not drift ──────────────
{
  const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<head[\s\S]*?<\/head>/, ' ').replace(/<[^>]+>/g, ' ');
  for (const route of manifest.canonicalRoutes) {
    const file = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
    const html = await readFile(join(dist, file), 'utf8');
    const text = strip(html);
    for (const sheet of ['record.css', 'founder.css', 'record.js']) if (!html.includes(`/${sheet}`)) throw new Error(`${route} misses ${sheet}`);
    // Countries and languages, never a timeline: the only year a visitor sees is the copyright.
    const years = text.replace(/© \d{4}/g, '').match(/\b(19[5-9]\d|20[0-4]\d)\b/g);
    if (years && route !== '/start-a-conversation') throw new Error(`Timeline year on ${route}: ${years.join(', ')}`);
    // M S Bajwa is the visible name on this site; the full names live only in structured data.
    if (/Muhammad Sakhawat/.test(text)) throw new Error(`Full name visible on ${route}; this site uses M S Bajwa`);
    if (!text.includes('M S Bajwa')) throw new Error(`${route} does not carry the name M S Bajwa`);
    if (!html.includes('"alternateName":["Muhammad Sakhawat Bajwa","M S Bajwa"]')) throw new Error(`${route} lost the name bridge in structured data`);
    if (!html.includes('href="https://company.auraplatform.org"') || !html.includes('href="/start-a-conversation"')) throw new Error(`${route} lost its way to the company or to the letter`);
    if (/Legal name/.test(text)) throw new Error(`${route} footer carries the long legal line again`);
    if (!/© 2026 M S Bajwa/.test(text)) throw new Error(`${route} footer copyright missing`);
  }
  const journey = await readFile(join(dist, 'journey', 'index.html'), 'utf8');
  if (journey.includes('وعد')) throw new Error('The Gulf chapter uses the dictionary word; the founder chose تمام');
  if (!journey.includes('تمام')) throw new Error('The Gulf chapter lost تمام');
  if (/public account does not fill/i.test(journey)) throw new Error('The old gap sentence returned to Journey');
  const convo = await readFile(join(dist, 'start-a-conversation', 'index.html'), 'utf8');
  if (!convo.includes('data-mailto="msbajwa@auraplatform.org"')) throw new Error('The letter does not reach msbajwa@');
  for (const intent of ['product', 'authored', 'partnership', 'capital', 'principal', 'unsure']) if (!convo.includes(`data-intent="${intent}"`)) throw new Error(`Letter reason missing: ${intent}`);
  const js = await readFile(join(dist, 'record.js'), 'utf8');
  if (/fetch\(|XMLHttpRequest|sendBeacon/.test(js)) throw new Error('record.js must not send anything anywhere');
  console.log('Verified the Record surface: no timeline, M S Bajwa, تمام, the letter to msbajwa@, ways back to the company.');
}

// record.js is shared with sites that have no /get, /orchestrate… pages of their own (2 Oct 2026:
// "Get Aura" pointed at bajwa.…/get and 404'd). Company paths in it must be absolute.
{
  const js = await readFile(join(dist, 'record.js'), 'utf8');
  const relative = [...js.matchAll(/'(\/(?:get|orchestrate|aura|colophon|company|films)\b[^']*)'/g)].map((m) => m[1]);
  if (relative.length) throw new Error(`record.js links to company pages by relative path: ${relative.join(', ')}`);
  console.log('Verified record.js links to company pages absolutely.');
}

// Video on the founder site must answer Range requests (iPhone Safari will not play it otherwise).
{
  const w = await readFile(join(root, 'worker.js'), 'utf8');
  const cfg = await readFile(join(root, 'wrangler.jsonc'), 'utf8');
  if (!cfg.includes('"/assets/video/*"') || !/status: 206/.test(w) || !/content-range/.test(w)) throw new Error('Video assets are not served with Range support');
  console.log('Verified video assets answer Range requests.');
}
