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
