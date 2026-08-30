# Search index propagation record — 2026-08-30

Canonical founder sitemap: https://bajwa.auraplatform.org/sitemap.xml

IndexNow ownership key: `https://bajwa.auraplatform.org/48735aee7c93aa108b808479d5d3aca7.txt`

The key returned HTTP 200 after deployment. The initial registry-backed batch
contained the four canonical founder URLs and was accepted by the global
IndexNow endpoint with HTTP 202. This is a notification receipt, not a ranking
or indexing guarantee.

The deployment script now hashes the canonical discovery registry and built
canonical HTML. It submits only after a meaningful hash change, and records
local notification state outside Git. Retired or removed URLs are included
only when they were previously in that state file; query and tracking
variants are never submitted.

The native Google authorization flow was completed once for the existing
account with `webmasters` and `webmasters.readonly` scopes. The resulting token
was tested against property listing, property-add, and sitemap endpoints; each
returned HTTP 403. This proves the account is authenticated but is not an
authorized Search Console owner/full user for this property. Ordinary-page
Request Indexing remains a Search Console UI operation, not an API operation.

The available controllable CDP browser is a clean QA profile and reaches the
public Search Console landing page, not the signed-in console session. No
repeated browser or API attempts were made.

The precise remaining authorization is: grant the existing Google account
owner/full-user access to the founder Search Console property (or complete the
one-time DNS/property verification in the signed-in console). After that
authorization, the existing automation can list the property, submit the
sitemap, and inspect the four canonical URLs. Bing Webmaster API credentials
are not present in the environment; its remaining authorization is an API key
or controlled owner session for the founder property, after which sitemap and
IndexNow status can be collected programmatically.

Google's Indexing API was not used; these are ordinary public pages, not its
supported job-posting or livestream content types.

## Platform public-estate scope amendment

The founder estate remains one of five legitimate public discovery hosts:
`bajwa.auraplatform.org` is the canonical founder presence with four registry
routes. The related public hosts are `company.auraplatform.org`,
`auraplatform.org`, `orchestrateops.com`, and `bajwawrites.com`. Product
application, operator, account-specific, private publication-studio, API and
other user-specific routes are excluded from search propagation.

The minimum Google ownership topology is the parent DNS domain property
`auraplatform.org` for the company and founder subdomains, plus separate
domain properties for `orchestrateops.com` and `bajwawrites.com`. Bing can use
the same three-domain topology where its Google import/domain-property flow
supports it.

The inventory found a product discovery dependency: the live Bajwa Writes
`robots.txt` and `sitemap.xml` endpoints currently return SPA HTML rather than
machine-readable policy/index documents. This is recorded for the product
owner; no product implementation was changed here.

The corrected Google ownership topology is three Domain properties, not one:
`auraplatform.org` covers the company and founder subdomains, while
`orchestrateops.com` and `bajwawrites.com` require separate properties. All
three domains use Cloudflare DNS. The available Cloudflare identity has zone
read but not DNS-write permission, and the scoped Search Console API token
returns HTTP 403 for property listing/property-add, so the one-time ownership
episode must establish DNS verification and owner/full-user access for the
existing Google account before Codex resumes administration. Bing can then
import the three verified Google properties.
