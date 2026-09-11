# RETIRED — this is not the founder site any more

`bajwa.auraplatform.org` is **not** served from this repository. It has not
been for some time. Do not deploy this estate, do not treat it as the
production source, and do not copy its pages into the live one to "restore"
routes.

## Where the live site actually is

```
personal/public-web/          <- CANONICAL. Cloudflare Worker `bajwa`,
                                 routes: bajwa.auraplatform.org (custom domain)
personal/bajwa/               <- this repository. Retired predecessor.
```

Established 2026-09-11 by evidence, not by memory:

- The Worker `bajwa` is configured in `personal/public-web/wrangler.jsonc`
  with `bajwa.auraplatform.org` as a custom domain, last deployed
  2026-08-31T06:41Z.
- All 41 files in that estate's build output are **byte-identical** to what
  the live origin serves.
- There is no Cloudflare Pages project for this site and no CI in this
  repository, so the `_redirects` file here governs nothing and a push
  deploys nothing.

## These routes were retired deliberately

`personal/public-web/worker.js` carries an explicit map that sends every page
of this repository somewhere else:

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
drift and not a regression.

**Having more routes here is not authority to restore them.** The live
clean-room reconstruction is the authority. Reconstruct something into
`personal/public-web` only when a product decision calls for it — never
because this repository still contains a page the live site lacks.

## What this repository is for now

Reference material. These pages hold content the live estate has not
reconstructed, and it is worth reading before anyone writes something
similar from scratch. It is **not** a backlog.

## Standing instructions

- Do not deploy from here.
- Do not treat a push here as a deployment; nothing is bound to it.
- Do not copy pages from here into `personal/public-web` without a product
  reason.
- Do not delete this repository to tidy up. It is intentional history.
