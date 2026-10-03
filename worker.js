const CANONICAL_ROUTES = new Set(['/', '/journey', '/writing', '/start-a-conversation']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const legacyRedirects = {
      '/story': '/journey',
      '/work': '/journey',
      '/contact': '/start-a-conversation',
      '/story.html': '/journey',
      '/ventures.html': '/journey',
      '/writing.html': '/writing',
      '/contact.html': '/start-a-conversation',
      '/journey.html': '/journey',
      '/vision.html': '/writing',
      '/collaborate.html': '/start-a-conversation',
      '/engagements.html': '/start-a-conversation',
      '/book.html': '/start-a-conversation',
      '/pitch.html': '/start-a-conversation?intent=proposal',
      '/works': '/writing',
      '/engage': '/start-a-conversation'
    };
    const path = url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname;
    if (legacyRedirects[path]) return Response.redirect(new URL(legacyRedirects[path], url.origin).toString(), 301);
    if (path !== url.pathname) {
      url.pathname = path;
      return Response.redirect(url.toString(), 301);
    }
    if (path === '/conversations.html') return new Response('Gone', { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    if (CANONICAL_ROUTES.has(path)) {
      const documentUrl = new URL(url);
      documentUrl.pathname = path === '/' ? '/index.html' : `${path}/index.html`;
      documentUrl.search = '';
      return env.ASSETS.fetch(new Request(documentUrl, { method: request.method }));
    }
    if (path.startsWith('/assets/video/')) return serveVideo(request, env);
    return env.ASSETS.fetch(request);
  }
};

// Static assets ignore Range, but Safari (iPhone) will only stream video that answers Range
// requests with 206 Partial Content. Serve the asset ourselves and slice it.
async function serveVideo(request, env) {
  const asset = await env.ASSETS.fetch(new Request(new URL(request.url).toString(), { method: 'GET' }));
  if (!asset.ok) return asset;
  const headers = new Headers(asset.headers);
  headers.set('accept-ranges', 'bytes');
  headers.set('cache-control', 'public, max-age=86400');
  const range = request.headers.get('range');
  const buf = await asset.arrayBuffer();
  const size = buf.byteLength;
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m) {
    headers.set('content-length', String(size));
    return new Response(request.method === 'HEAD' ? null : buf, { status: 200, headers });
  }
  let start = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1]);
  let end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (start >= size || start > end) {
    headers.set('content-range', `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  headers.set('content-range', `bytes ${start}-${end}/${size}`);
  headers.set('content-length', String(end - start + 1));
  return new Response(request.method === 'HEAD' ? null : buf.slice(start, end + 1), { status: 206, headers });
}
