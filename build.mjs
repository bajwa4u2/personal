import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src');
const dist = join(root, 'dist');
const founderClosing = await readFile(join(src, 'shared', 'founder-closing.html'), 'utf8');
const sharedNavigation = await readFile(join(root, '..', '..', 'public-web', 'shared', 'mobile-navigation.js'), 'utf8');
const sharedNavigationStyles = await readFile(join(root, '..', '..', 'public-web', 'shared', 'mobile-navigation.css'), 'utf8');
const discovery = JSON.parse(await readFile(join(src, 'discovery', 'pages.json'), 'utf8'));

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });
await writeFile(join(dist, 'shell.js'), sharedNavigation);
await writeFile(join(dist, 'mobile-navigation.css'), sharedNavigationStyles);

for (const file of ['index.html', 'journey/index.html', 'writing/index.html', 'start-a-conversation/index.html']) {
  const target = join(dist, file);
  const html = await readFile(target, 'utf8');
  const normalized = html.replace('<!-- FOUNDER_CLOSING -->', founderClosing.trim()).replace(/<footer class="founder-footer"[\s\S]*?<\/footer>/, founderClosing.trim()).replace('</head>', '<link rel="stylesheet" href="/mobile-navigation.css"></head>');
  await writeFile(target, normalized);
}

const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const json = (v) => JSON.stringify(v).replaceAll('<','\\u003c');
const themes = {
  founder: {bg:'#101a20',fg:'#eee9df',accent:'#8ebcb4',label:'M S BAJWA'},
  journey: {bg:'#e5e1d6',fg:'#273335',accent:'#568a83',label:'JOURNEY'},
  writing: {bg:'#1a2b30',fg:'#f3eee5',accent:'#8ebcb4',label:'WRITING'},
  conversation: {bg:'#19282d',fg:'#eef1e9',accent:'#8ebcb4',label:'START A CONVERSATION'}
};
const personId = `${discovery.baseUrl}/#person`;
const companyId = 'https://company.auraplatform.org/#organization';
const schema = (route, page, url) => ({'@context':'https://schema.org','@graph':[
  {'@type':'Person','@id':personId,'name':'Muhammad Sakhawat Bajwa','url':discovery.baseUrl+'/' ,'jobTitle':'Founder, builder, operator and author','worksFor':{'@id':companyId},'authorOf':[{'@type':'Book','name':'The Burden of Knowing'},{'@type':'Book','name':'The Edge of Knowing'},{'@type':'Book','name':'The Origin of You'}]},
  {'@type':page.type,'@id':`${url}#page`,'url':url,'name':page.title,'description':page.description,'isPartOf':{'@id':`${discovery.baseUrl}/#website`},'mainEntity':{'@id':personId}},
  {'@type':'WebSite','@id':`${discovery.baseUrl}/#website`,'name':discovery.siteName,'url':discovery.baseUrl+'/' ,'publisher':{'@id':personId}}
]});
const og = (page, theme) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${theme.bg}"/><path d="M0 520C300 420 430 610 760 360S1080 180 1260 230" fill="none" stroke="${theme.accent}" stroke-width="2" opacity=".55"/><text x="84" y="112" fill="${theme.accent}" font-family="Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="5">${esc(theme.label)}</text><text x="84" y="300" fill="${theme.fg}" font-family="Georgia,serif" font-size="62">${esc(page.title.split(' - ')[0])}</text><text x="84" y="390" fill="${theme.fg}" opacity=".75" font-family="Arial,sans-serif" font-size="24">${esc(page.description)}</text><text x="84" y="548" fill="${theme.fg}" opacity=".58" font-family="Arial,sans-serif" font-size="18">Muhammad Sakhawat Bajwa</text></svg>`;
for (const [route,page] of Object.entries(discovery.pages)) {
  const file = join(dist, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  let html = await readFile(file, 'utf8'); const url = `${discovery.baseUrl}${route === '/' ? '/' : route}`; const theme = themes[page.theme]; const asset = `/assets/og/${route === '/' ? 'home' : route.slice(1)}.png`;
  html = html.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/g,'').replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta\s+(?:property|name)="(?:og:|twitter:|robots)[^"]+"[^>]*>/g,'').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
  const metadata = `<title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${url}"><meta name="robots" content="index,follow"><meta property="og:type" content="${page.type === 'ContactPage' ? 'website' : 'profile'}"><meta property="og:site_name" content="${esc(discovery.siteName)}"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${discovery.baseUrl}${asset}"><meta property="og:image:secure_url" content="${discovery.baseUrl}${asset}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(page.title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}"><meta name="twitter:image" content="${discovery.baseUrl}${asset}"><script type="application/ld+json">${json(schema(route,page,url))}</script>`;
  await writeFile(file, html.replace('</head>', `${metadata}</head>`));
  await mkdir(join(dist,'assets','og'),{recursive:true}); const svg = og(page,theme); const svgFile = join(dist,'assets','og',`${route === '/' ? 'home' : route.slice(1)}.svg`); await writeFile(svgFile,svg); await sharp(Buffer.from(svg)).png().toFile(svgFile.replace(/\.svg$/, '.png'));
}
await writeFile(join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(discovery.pages).map(route=>`<url><loc>${discovery.baseUrl}${route === '/' ? '/' : route}</loc></url>`).join('')}</urlset>\n`);
await writeFile(join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${discovery.baseUrl}/sitemap.xml\n`);

const manifest = JSON.parse(await readFile(join(root, 'route-manifest.json'), 'utf8'));
const buildInfo = {
  estate: manifest.estate,
  generatedFrom: relative(resolve(root, '..', '..'), src).replaceAll('\\', '/'),
  canonicalRoutes: manifest.canonicalRoutes,
  contentAuthority: 'Approved material only; Phase 1 contains no public content migration.',
  sourceHash: createHash('sha256').update(JSON.stringify(manifest)).digest('hex')
};
await writeFile(join(dist, 'build-info.json'), `${JSON.stringify(buildInfo, null, 2)}\n`);
console.log(`Built ${manifest.estate} public-web foundation to ${dist}`);
