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
    return env.ASSETS.fetch(request);
  }
};
