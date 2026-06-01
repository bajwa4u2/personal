# Deploying bajwa.auraplatform.org

The founder site lives at `personal/bajwa/` in the codebase. In production it must
resolve at `https://bajwa.auraplatform.org/` — the directory is mounted as the subdomain
root, so the codebase path never appears in public URLs.

This file documents the deployment configuration and DNS record. **The site is built;
the live deploy is gated on whichever host serves `auraplatform.org` today.**

## What the host needs to do

The deployment target depends on what currently serves `company.auraplatform.org` and the
apex `auraplatform.org`. Whatever host is in use — Cloudflare Pages, Netlify, Vercel,
GitHub Pages, S3 + CloudFront, or a managed VPS — the configuration is one of two shapes:

### Shape A — host supports multi-subdomain projects from one repo

If the existing site is deployed as a single project that already serves multiple subdomains
(`auraplatform.org`, `company.auraplatform.org`, etc.) — for example Cloudflare Pages with
custom domains, or Vercel with multiple production domains on one project — add
`bajwa.auraplatform.org` to that project and configure a rewrite/redirect:

```
# Cloudflare Pages / Workers (example)
Host header: bajwa.auraplatform.org   →   serve from /bajwa/ as root

# Netlify _redirects (example)
https://bajwa.auraplatform.org/*   /bajwa/:splat   200!

# Vercel (vercel.json rewrite)
{
  "rewrites": [
    { "source": "/:path*",
      "has": [{ "type": "host", "value": "bajwa.auraplatform.org" }],
      "destination": "/bajwa/:path*" }
  ]
}

# Nginx (example, if VPS-served)
server {
  listen 443 ssl http2;
  server_name bajwa.auraplatform.org;
  root /var/www/auraplatform/bajwa;
  index index.html;
  location / { try_files $uri $uri.html $uri/ =404; }
}
```

### Shape B — host needs a separate project per subdomain

If the host model is one project per subdomain (typical for Vercel/Netlify when not using
the rewrite approach), create a new project pointing at the same repository with build
output set to **`personal/bajwa/`** as the publish/output directory. No build step
is required — this is plain HTML/CSS/JS. Then attach `bajwa.auraplatform.org` as the
custom domain on that project.

## DNS record

At the DNS provider for `auraplatform.org` (Cloudflare / Route 53 / wherever), add:

```
Type:   CNAME (or ALIAS / ANAME, depending on provider)
Name:   bajwa
Value:  <host-target>            # see below
TTL:    300 (5 minutes) for cutover; raise to 3600 once stable
Proxy:  Enabled (Cloudflare orange-cloud) if using Cloudflare
```

`<host-target>` depends on the host:

| Host                 | CNAME target                                   |
| -------------------- | ---------------------------------------------- |
| Cloudflare Pages     | `<your-project>.pages.dev`                     |
| Netlify              | `<your-site>.netlify.app`                      |
| Vercel               | `cname.vercel-dns.com`                         |
| GitHub Pages         | `<github-username>.github.io`                  |
| Generic CDN / VPS    | the public hostname of the origin / load-balancer |

## SSL / TLS

All four major hosts (Cloudflare Pages, Netlify, Vercel, GitHub Pages) provision Let's
Encrypt or proprietary TLS automatically once the CNAME validates. On a VPS, use:

```
sudo certbot --nginx -d bajwa.auraplatform.org
```

## Verification (after DNS propagates)

```
# DNS resolves to the host
dig +short bajwa.auraplatform.org

# Connectivity + TLS
curl -I https://bajwa.auraplatform.org/

# Pages reachable
curl -s -o /dev/null -w "%{http_code}  /\n"               https://bajwa.auraplatform.org/
curl -s -o /dev/null -w "%{http_code}  /journey.html\n"   https://bajwa.auraplatform.org/journey.html
curl -s -o /dev/null -w "%{http_code}  /ventures.html\n"  https://bajwa.auraplatform.org/ventures.html
curl -s -o /dev/null -w "%{http_code}  /writing.html\n"   https://bajwa.auraplatform.org/writing.html
curl -s -o /dev/null -w "%{http_code}  /conversations.html\n" https://bajwa.auraplatform.org/conversations.html
curl -s -o /dev/null -w "%{http_code}  /contact.html\n"   https://bajwa.auraplatform.org/contact.html

# Robots + sitemap
curl -s https://bajwa.auraplatform.org/robots.txt
curl -s https://bajwa.auraplatform.org/sitemap.xml | head -20

# OG card (SVG)
curl -I https://bajwa.auraplatform.org/assets/og-bajwa.svg

# JSON manifest
curl -s https://bajwa.auraplatform.org/data/writing.json
```

All six pages should return `200`. `robots.txt` should reference the sitemap URL.
`writing.json` should return a JSON document.

## OG preview validation

Once live, validate the OpenGraph card renders on the three crawlers:

- LinkedIn Post Inspector — <https://www.linkedin.com/post-inspector/>
- Twitter / X Card Validator — <https://cards-dev.twitter.com/validator>
- Facebook Sharing Debugger — <https://developers.facebook.com/tools/debug/>

If the SVG OG image is rejected by any crawler (Facebook historically prefers PNG/JPG),
generate a 1200×630 PNG from `assets/og-bajwa.svg` (any local rasterizer works — e.g.
`rsvg-convert`, headless Chrome, or `inkscape --export-type=png --export-width=1200`)
and update the three OG/Twitter image meta tags across the six HTML files.

## Notes on the path strategy

Internal `<a href>` links inside the bajwa site are flat (`journey.html`, `ventures.html`,
etc.). They resolve relative to the current page, which works whether the directory is
mounted at `/` (production) or at `/bajwa/` (local preview). No URL rewriting is needed
inside the HTML.
