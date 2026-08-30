import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname.replace(/^\//, '').replaceAll('/', '\\');
const dist = join(root, 'dist');
const discovery = JSON.parse(await readFile(join(root, 'src', 'discovery', 'pages.json'), 'utf8'));
const manifest = JSON.parse(await readFile(join(root, 'route-manifest.json'), 'utf8'));
const key = '48735aee7c93aa108b808479d5d3aca7';
const routes = manifest.canonicalRoutes;
const urls = routes.map((route) => `${discovery.baseUrl}${route === '/' ? '/' : route}`);
const material = await Promise.all(routes.map((route) => readFile(route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html'), 'utf8')));
const hash = createHash('sha256').update(JSON.stringify(discovery.pages)).update(material.join('')).digest('hex');
const stateFile = join(root, '.indexnow-state.json');
let previous = null;
try { previous = JSON.parse(await readFile(stateFile, 'utf8')); } catch {}
if (previous?.hash === hash) { console.log('IndexNow: no meaningful canonical change; no notification sent.'); process.exit(0); }
const removed = (previous?.urls ?? []).filter((url) => !urls.includes(url));
const urlList = [...urls, ...removed];
const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: new URL(discovery.baseUrl).host, key, keyLocation: `${discovery.baseUrl}/${key}.txt`, urlList }) });
console.log(`IndexNow: ${response.status} for ${urlList.length} canonical URL notifications.`);
if (!response.ok) throw new Error(`IndexNow notification failed: ${response.status} ${await response.text()}`);
await writeFile(stateFile, `${JSON.stringify({ hash, urls, notifiedAt: new Date().toISOString() }, null, 2)}\n`);
