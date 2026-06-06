# AUTHORITY_ACTIONS.md — External authority actions (out-of-repo)

Layer 1 (clarity: structured data, metadata, sitemaps, robots, canonical entity
graph, identity/authority pages) is **complete and validated in-repo**. Layer 2
(authority: independent recognition) cannot be produced by code — it requires
third-party accounts, submissions, and time. This file lists only actions that
**cannot be completed inside the repositories**.

Locked canonical references for every action below:

- Person — **Muhammad Sakhawat** (aliases: M S Bajwa, Muhammad Sakhawat Bajwa) — https://bajwa.auraplatform.org/
- Organization — **Aura Platform LLC** — https://company.auraplatform.org/
- Products — **Aura** (https://auraplatform.org/), **Orchestrate** (https://orchestrateops.com/), **Bajwa Writes** (https://bajwawrites.com/)

When any external profile below goes live, send the URL so it can be added to the
on-page **Authority** surfaces and to the structured-data `sameAs` arrays.

---

## Immediate External Actions

### 1. Google Search Console verification
- **Purpose:** confirm indexation, submit sitemaps, monitor coverage/queries.
- **Target entity:** both domains.
- **Required canonical name/URL:** https://company.auraplatform.org/sitemap.xml and https://bajwa.auraplatform.org/sitemap.xml
- **Expected authority value:** indirect (indexing health; not a ranking signal itself).
- **Dependency:** domain DNS/registrar access.

### 2. Bing Webmaster Tools verification
- **Purpose:** indexation + sitemap submission for Bing and ChatGPT Search (which draws on Bing).
- **Target entity:** both domains.
- **Required:** same sitemap URLs.
- **Expected authority value:** AI-search visibility (ChatGPT Search retrieval).
- **Dependency:** DNS or Search Console import.

### 3. LinkedIn Company Page — Aura Platform LLC
- **Purpose:** first-party company entity on a high-trust platform; only the personal profile exists today.
- **Target entity:** Organization.
- **Required:** name "Aura Platform LLC", website https://company.auraplatform.org/, founder linked to the personal profile.
- **Expected authority value:** high (corroborates the Organization entity; feeds knowledge graphs).
- **Dependency:** LinkedIn admin; link from personal profile `linkedin.com/in/msbajwa`.

### 4. Crunchbase profile — company + founder
- **Purpose:** canonical startup-registry record; strongly weighted by Google/AI knowledge graphs.
- **Target entity:** Organization + Person.
- **Required:** "Aura Platform LLC", founder "Muhammad Sakhawat", product links.
- **Expected authority value:** high (independent corroboration).
- **Dependency:** Crunchbase account; review queue.

### 5. GitHub Organization
- **Purpose:** developer-authority signal + consistent handle for an infrastructure company.
- **Target entity:** Organization (and products, if any public repos).
- **Required:** org display name "Aura Platform LLC", URL in profile.
- **Expected authority value:** medium.
- **Dependency:** GitHub org creation; consistent naming.

### 6. Product Hunt — Orchestrate
- **Purpose:** launch surface + backlink for the one launch-ready product (live pricing + diagnostics).
- **Target entity:** Product (Orchestrate) → Organization.
- **Required:** "Orchestrate by Aura Platform LLC", https://orchestrateops.com/
- **Expected authority value:** medium-high (backlink + traffic + disambiguation from IBM/WestCX Orchestrate).
- **Dependency:** launch readiness; maker account.

### 7. App Store / Microsoft Store publisher consistency
- **Purpose:** ensure any Aura app listing shows publisher = "Aura Platform LLC" with the canonical site.
- **Target entity:** Product (Aura) → Organization.
- **Required:** publisher "Aura Platform LLC", support URL https://auraplatform.org/
- **Expected authority value:** medium (store listings are trusted corroborators).
- **Dependency:** store developer-account access; verify the existing/claimed listing.

---

## Medium-Term Authority Actions

### 8. Wikidata eligibility review
- **Purpose:** structured, machine-readable knowledge-graph node for company/founder.
- **Target entity:** Organization (and Person if notability supports).
- **Required:** independent sources first (Crunchbase, press) to satisfy notability.
- **Expected authority value:** high for AI retrieval; **do not create prematurely** (risk of deletion without sources).
- **Dependency:** ≥1–2 independent references existing first (Actions 4, 9).

### 9. Founder interviews / podcasts / conversations
- **Purpose:** independent media references; populate the reserved `/conversations` surface.
- **Target entity:** Person → Organization/Products.
- **Required:** consistent name "Muhammad Sakhawat", company/product links in show notes.
- **Expected authority value:** high (independent, citable).
- **Dependency:** outreach / relationship-building.

### 10. Product mentions & ecosystem references
- **Purpose:** third-party articles, directories (e.g., relevant B2B/SaaS directories), and ecosystem pages referencing the products.
- **Target entity:** Products → Organization.
- **Required:** canonical product URLs + "a product of Aura Platform LLC".
- **Expected authority value:** medium-high.
- **Dependency:** product maturity; legitimate editorial inclusion only.

### 11. Credible backlinks
- **Purpose:** earned links from reputable, topical sources.
- **Target entity:** all.
- **Required:** canonical URLs.
- **Expected authority value:** medium-high — only when **editorially earned**.
- **Dependency:** content/relationships; never purchased.

---

## Do Not Do (explicitly forbidden)

- Spam backlinks or link farms / PBNs.
- Fake or low-quality directory submissions.
- Link exchanges / reciprocal-link schemes.
- Paid backlink schemes.
- Auto-generated SEO/doorway pages.
- Keyword stuffing (on-page or in metadata).
- Fake press releases or planted "news."
- Fake testimonials, fabricated customers, investors, partnerships, or awards.

These tactics damage entity trust and risk manual penalties. Authority here is built
only from **legitimate first-party clarity + earned independent corroboration**.

---

## Status note

As of this pass, the only confirmed independent signal is the founder's LinkedIn
(`linkedin.com/in/msbajwa`). Everything else above is genuinely pending and is
represented honestly on the `/authority` pages as "pending" rather than implied.
