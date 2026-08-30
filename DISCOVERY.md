# Public discovery contract

`src/discovery/pages.json` is the sole founder route authority for canonical
title, description, URL, indexability, OG representation, and page entity.
`build.mjs` generates metadata, distinct deterministic SVG share assets,
Person/WebSite/page JSON-LD, `sitemap.xml`, and `robots.txt` into `dist`;
`verify.mjs` validates the generated output.

The founder graph uses a stable Person identity related to Aura Platform LLC
and authored books. Query state does not create a second document. Retired
routes remain compatibility redirects only. Future authored objects require
their own approved canonical authority before registration.

Do not hardcode independent metadata or social cards in route HTML.

Resolver contract:

- `STATIC_ROUTE_RESOLVER` is the registry-backed resolver for the finite set of
  canonical founder page paths. One registry entry produces that page's
  document metadata, share representation, JSON-LD context, sitemap entry and
  indexing policy.
- `PUBLIC_OBJECT_RESOLVER_BOUNDARY` is the reserved extension boundary for a
  future approved public object authority. Such an object may provide its own
  canonical identity and URL, title, description, object type,
  author/publisher, artwork, legitimate publication/update date,
  relationships, indexability and share representation. No speculative object
  types are emitted by the current build.
- `BOUNDED_PUBLIC_STATE_RULE`: only recognized, non-sensitive public state such
  as approved origin or intent context may affect human interaction. It does
  not create a second canonical document or discovery record.
- `UNKNOWN_QUERY_STATE_RULE`: arbitrary query state is ignored for document
  selection and never creates an indexable page, sitemap URL, canonical URL or
  share asset.
- `TRACKING_PARAMETER_RULE`: tracking parameters never affect canonical,
  Open Graph, JSON-LD, sitemap or route identity.
