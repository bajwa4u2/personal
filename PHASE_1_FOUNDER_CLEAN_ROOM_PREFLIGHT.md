# Founder public-web clean-room preflight

Status: technical foundation deployed; founder visual reconstruction has not
started.

## Boundaries

- Permanent source/publish root: `personal/public-web`
- Generated publish output: `personal/public-web/dist`
- Legacy reference-only root: `personal/bajwa`
- Worker: `bajwa`
- Custom domain: `bajwa.auraplatform.org`
- Static delivery: Wrangler Workers Static Assets

The clean build has no runtime dependency on `personal/bajwa`. The legacy root
was not modified, reorganized or copied into the new source tree.

## Route contract

Canonical routes are `/`, `/story`, `/work`, `/writing`, and `/contact`.
Legacy HTML routes are handled by one-hop redirects according to
`route-manifest.json`; `/conversations.html` returns 410; unknown paths return
404. Publication child routes remain unavailable until real authored material
is migrated in its implementation phase.

## Verification

`npm run build`, `npm run verify`, and Wrangler dry-run/deploy completed. Live
direct-route checks passed for all five canonical routes, legacy redirects,
410 behavior, 404 behavior and HTTPS. Deployment version:
`285aaa41-25d8-49e0-955c-dcd5f8b33dc9`.

## Next boundary

Audit and reconstruct the founder Home only after the clean serving boundary is
trusted. Do not use the legacy page shell, CSS, JavaScript, route assumptions
or assets as runtime dependencies. Approved real portrait, video, books and
authored material must be deliberately migrated during page implementation.
