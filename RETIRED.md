# RETIRED — this is not the founder site any more

`bajwa.auraplatform.org` is **not** served from this directory. It has not
been for some time. Do not deploy this estate, do not treat it as the
production source, and do not copy its pages into the live one to "restore"
routes.

## Where the live site actually is

```
personal/public-web/          <- CANONICAL. Cloudflare Worker `bajwa`,
                                 routes: bajwa.auraplatform.org (custom domain)
personal/bajwa/               <- this directory. Retired predecessor.
```

Established 2026-09-11 by evidence, not by memory:

- The Worker `bajwa` is configured in `personal/public-web/wrangler.jsonc`
  with `bajwa.auraplatform.org` as a custom domain, last deployed
  2026-08-31T06:41Z.
- All 41 files in `personal/public-web/dist` are **byte-identical** to what
  the live origin serves.
- There is no Cloudflare Pages project for this site, so the `_redirects`
  file here governs nothing.

## This estate's routes were retired deliberately

`personal/public-web/worker.js` carries an explicit map that sends every page
of this directory somewhere else:

```
/ventures.html    -> /journey        /vision.html      -> /writing
/engagements.html -> /start-a-conversation
/story.html       -> /journey        /collaborate.html -> /start-a-conversation
/book.html        -> /start-a-conversation
/works -> /writing    /engage -> /start-a-conversation    /contact -> /start-a-conversation
```

The live surface is four routes: `/`, `/journey`, `/writing`,
`/start-a-conversation`. Extensionless `/ventures`, `/vision`,
`/engagements`, `/identity`, `/authority`, `/collaborate`, `/book` and
`/conversations` all return **404**. That is a designed consolidation, not
drift or a regression.

## What this directory is for now

Reference material. The pages here hold content the live estate has not
reconstructed, and that content is worth reading before anyone writes
something similar from scratch. It is **not** a to-do list: the fact that
this estate has more routes is not a reason to reintroduce them. Reconstruct
something into `personal/public-web` only when a product decision calls for
it.

## Standing instructions

- Do not deploy from here.
- Do not push this repository in order to make it current — pushing deploys
  nothing, and the last commit (`dac6467`, the Google Play distribution
  correction) is an archival edit that keeps the reference copy accurate.
- Do not copy pages from here into `personal/public-web` without a product
  reason.
- Do not delete this directory to tidy up. It is intentional history.

The full provenance record is in `personal/public-web` and in the session
notes that established it.
