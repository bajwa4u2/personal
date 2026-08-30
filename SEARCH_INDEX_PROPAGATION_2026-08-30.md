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

Google Search Console property and sitemap submission could not be verified
from the available account token: the Search Console API returned HTTP 403.
Bing Webmaster Tools credentials were not available. These are the precise
human actions remaining:

- Google: sign in as an owner/full user, verify or select the founder property,
  submit the sitemap, and use URL Inspection for the four changed URLs.
- Bing: verify/select the founder property, submit the sitemap, and inspect
  the IndexNow activity report.

Google's Indexing API was not used; these are ordinary public pages, not its
supported job-posting or livestream content types.
