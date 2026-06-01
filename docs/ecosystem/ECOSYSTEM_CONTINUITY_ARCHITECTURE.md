# Aura Platform Ecosystem — Continuity Architecture

**Status:** Canonical doctrine. Governs how the five public surfaces
of the Aura Platform LLC ecosystem reference one another in their
headers, footers, and cross-link blocks.

**Owner:** M S Bajwa, Founder & CEO, Aura Platform LLC.

**Authority:** This document sits beside the identity-system
doctrine (`docs/identity/AURA_ECOSYSTEM_IDENTITY_SYSTEM.md`). Where
the identity doctrine prescribes what each surface *looks* like,
this document prescribes how each surface *belongs to the others*.
Any continuity decision — what to link, where to place it, what tone
to use — traces back to this file.

---

## What this document is for

A visitor arriving at any one of the five public surfaces should
understand four things without being asked, sold to, or funnelled:

1. **What is this?** The surface's role.
2. **Who stands behind it?** Aura Platform LLC, named without
   competing.
3. **What related work exists?** The four other surfaces, named with
   restraint.
4. **Where can I go next?** A small, ordered list of canonical links.

This is institutional continuity. It is not cross-selling. It is not
"try our other products". It is the substrate-firm equivalent of a
title page naming the imprint.

---

## Section 1 — Canonical ecosystem structure

```
Aura Platform LLC                            (institutional root)
│
├── Aura                                     auraplatform.org
│     Accountable public discourse and institutional communication
│
├── Orchestrate                              orchestrateops.com
│     Managed commercial execution infrastructure
│
├── Bajwa Writes                             bajwawrites.com
│     Literary and preservation infrastructure
│
└── M S Bajwa                                bajwa.auraplatform.org
      Founder · stewardship · human continuity layer
```

Five identities. Three primary products on equal footing. Two
supporting meta surfaces (founder, company). Per the identity
doctrine, the company is **above in custody, beneath in voice** —
it never out-shouts a product on a shared surface.

---

## Section 2 — Surface roles (canonical)

### 2.1 Company  ·  `company.auraplatform.org`

**Role:** Institutional root.

The company surface is the clearest ecosystem map. Visitors arriving
here see the whole structure. The architectural canon (CG-01, CG-03,
CG-04, AU-01, OR-01, OR-02, BW-01) lives here as content. The
company never frames itself as a product; it carries the substrate
diagram that shows the products share one fingerprint.

### 2.2 Aura  ·  `auraplatform.org`

**Role:** Public discourse and institutional communication.

Aura is the public-record substrate. Civic, accountable,
governance-shaped. Footer carries institutional attribution + a
restrained ecosystem strip. Tone is institutional, not promotional.

### 2.3 Orchestrate  ·  `orchestrateops.com`

**Role:** Execution and operational continuity.

Orchestrate is the operational substrate. Refusable governance,
typed dispatch, audit-first. Footer carries the company attribution
+ related work. Tone is operational and executive — never CRM,
never startup.

### 2.4 Bajwa Writes  ·  `bajwawrites.com`

**Role:** Literary continuity and preservation.

Bajwa Writes is the preservation substrate. Authored, sealed,
bound. Footer reads in literary register. Quiet attribution.
Restrained links. **Atmosphere is the rule** — anything that would
shift the surface toward SaaS or content-platform aesthetics is
refused.

### 2.5 Founder  ·  `bajwa.auraplatform.org`

**Role:** Human continuity layer.

The founder surface is the strongest bridge. It connects the three
products to a person and to the institution. Footer carries the
fullest ecosystem set because the surface's job is to make the
relationships explicit.

---

## Section 3 — Header rules

Headers carry **identity**, not navigation across the ecosystem.
Each surface's header foregrounds its own wordmark and its own
internal nav.

### What every header *must* carry

- The surface's own wordmark (see the identity-system doctrine for
  the canonical form per surface).
- Internal navigation for the surface's own routes.
- Standard accessibility: `aria-label="Primary"` on the nav element,
  keyboard-reachable links.

### What headers *never* carry

- Logos of other ecosystem surfaces.
- Cross-product CTAs ("Try Aura", "See Orchestrate").
- Marketing copy for sibling surfaces.
- Banners, ribbons, or top-bar announcements about other surfaces.
- Sign-up funnels for the company.

### Tone per surface (header)

| Surface | Wordmark | Subordinate line | Header tone |
|---|---|---|---|
| Company | "Aura Platform LLC" | — | Institutional. Restrained. |
| Aura | "Aura" (canonical mark) | — | Public-discourse, civic. |
| Orchestrate | "Orchestrate" (cyclic mark) | — | Operational, calm. |
| Bajwa Writes | "Bajwa Writes" (serif) | — | Literary, italic-serif. |
| Founder | "M S Bajwa" (Inter semibold) | — | Founder identity primary. *No* `by Aura Platform LLC` inline — that attribution moves to the footer per the founder visual brief. |

### Placement

Sticky top bar, blurred background allowed, single horizontal row
at desktop. Internal links collapse at the canonical breakpoint per
surface (see each surface's design tokens).

### Mobile behaviour

- Wordmark left, nav menu collapses to icon or hides.
- No ecosystem links surface in the mobile header — those live in
  the footer where space exists.
- Header height ≤ 56 px so the mobile content area opens promptly.

---

## Section 4 — Footer rules

Footers are where continuity lives. Every footer carries — at
minimum — an attribution to Aura Platform LLC and a restrained
strip listing the other ecosystem surfaces. The set of links
varies slightly per surface; the tone varies more.

### Footer layers (canonical)

Every public surface composes its footer in two layers:

1. **Surface-native footer.** Each surface keeps its existing
   footer columns / link groups / brand block. This is the surface
   speaking in its own voice — do not flatten this layer.
2. **Institutional continuity band.** A horizontal strip beneath
   the surface-native footer, listing the five members of the
   ecosystem in mono-style restraint, with the company wordmark on
   the left and the five named links on the right.

Layer 2 is the canonical continuity device. Every public surface
must carry it. It must never grow louder than the surface-native
footer above it.

### Per-surface continuity-band copy

| Surface | Attribution copy | Continuity-band links |
|---|---|---|
| Company | "Aura Platform LLC" wordmark + tagline "Discourse continuity · Operational continuity · Literary continuity" | **Company** (you are here) · Aura · Orchestrate · Bajwa Writes · Founder |
| Aura | "Built by Aura Platform LLC." | Company · **Aura** (you are here) · Orchestrate · Bajwa Writes · Founder |
| Orchestrate | "Part of Aura Platform LLC." | Company · Aura · **Orchestrate** (you are here) · Bajwa Writes · Founder |
| Bajwa Writes | "Part of the broader work of M S Bajwa and Aura Platform LLC." | Company · Aura · Orchestrate · **Bajwa Writes** (you are here) · Founder |
| Founder | "Founder & CEO, Aura Platform LLC." | Company · Aura · Orchestrate · Bajwa Writes · **Founder** (you are here) |

The "you are here" marker is implemented as `aria-current="page"`
on the matching link. Visual treatment is at most a quiet
underline; never a button, never a chip.

### What footers *must* carry

- The surface-native footer (left intact).
- The institutional continuity band described above.
- The Aura Platform LLC attribution line (worded per surface, as
  above).

### What footers *never* carry

- "Try our other products."
- "Explore Aura Platform's full suite."
- Logo walls of the five surfaces.
- Repeated bold CTAs at the foot.
- Newsletter-signup forms tied to the company (each surface may
  carry its own correspondence channels; the continuity band does
  not become a newsletter funnel).
- Bajwa Writes never carries product / SaaS / business-automation
  language at any tier of its footer.
- Orchestrate never carries CRM / sales-funnel / social-platform
  language at any tier of its footer.
- Aura never carries product-marketing language.

### Hierarchy

The surface-native footer (layer 1) is more visually prominent than
the institutional band (layer 2). The institutional band sits
beneath, in restrained mono-style typography. This preserves the
surface's own voice as primary; the continuity band orients without
overshadowing.

---

## Section 5 — Cross-link canon

**These exact URLs are the only canonical references.** Internal
constants per repo should reference these strings; ad-hoc URLs in
markup are forbidden.

```
COMPANY      https://company.auraplatform.org
AURA         https://auraplatform.org
ORCHESTRATE  https://orchestrateops.com
BAJWA_WRITES https://bajwawrites.com
FOUNDER      https://bajwa.auraplatform.org
```

### Rules of reference

- Always use HTTPS.
- Always use the canonical host above. No `www.` prefix. No
  trailing slash unless the path requires it.
- Cross-link `<a>` elements set `rel="noopener"`. Per the
  identity doctrine, external nav links may set `target="_blank"`
  when the user is leaving the surface; same-ecosystem links do
  not pop new tabs by default unless the surface convention says so.
- The order on a continuity band is always: Company · Aura ·
  Orchestrate · Bajwa Writes · Founder. (Hierarchy: institution →
  three substrates → person.)

### What `rel` to use

| Link context | `rel` value |
|---|---|
| Cross-ecosystem link (e.g. founder site → Aura) | `noopener` |
| Cross-ecosystem link opening new tab | `noopener noreferrer` |
| Same-ecosystem internal link | (none required) |

### What `aria-current` to use

The link to the current surface in its own continuity band carries
`aria-current="page"`. This is the only "you are here" marker;
visual styling (the underline) is keyed off this attribute.

---

## Section 6 — Tone rules per surface

The continuity band uses different attribution copy on each surface
(see the table in Section 4) to honor each surface's tone:

- **Company.** Institutional. "Aura Platform LLC" as a wordmark, no
  apology, no caption longer than the tagline.
- **Aura.** Civic and infrastructural. "Built by Aura Platform LLC."
  reads as a builder credit, not as a sponsor banner.
- **Orchestrate.** Operational. "Part of Aura Platform LLC." reads
  as substrate context — the company is what the operation runs on,
  not its parent corporation.
- **Bajwa Writes.** Literary. "Part of the broader work of M S
  Bajwa and Aura Platform LLC." — the only continuity copy that
  names the founder explicitly because the literary surface's
  voice is the author's, and the founder *is* the author.
- **Founder.** Direct. "Founder & CEO, Aura Platform LLC." — a
  role line, not an attribution.

Any change to these strings requires an amendment to this document.

---

## Section 7 — Prohibited patterns

Aggregated and reaffirmed across the doctrine:

- **No "Try our other products" copy** at any tier on any surface.
- **No SaaS-style product ads** inside Bajwa Writes — at any tier.
  This includes "automate your workflow", "grow your audience",
  and any business-software register.
- **No founder-influencer language** anywhere — no "follow my
  journey", no personal-brand testimonial.
- **No generic startup footer.** "Made with ❤️ in city X" and
  variants are excluded. No emoji at any tier on any footer.
- **No logo walls.** Continuity bands are text strips, not grids
  of product icons.
- **No repeated CTA buttons** at the foot. The continuity band is
  text links only — no FilledButton, no OutlinedButton, no chip
  treatment.
- **No unrelated cross-promotion** — the continuity band names only
  the five ecosystem surfaces and never anything else.
- **No inconsistent domain references.** Surface-native copy that
  references another surface uses the canonical URL from Section 5.
- **No broken external links.** Validation runs the full continuity
  link set on every commit that touches a footer.

---

## Section 8 — Future product rule

When a sixth ecosystem product joins, the process is:

1. **Identity-system amendment first.** Section 6 of
   `AURA_ECOSYSTEM_IDENTITY_SYSTEM.md` (Identity hierarchy) gets a
   new entry under the relevant tier (primary product or supporting
   meta surface). Visual primitives are reasoned out via a
   per-identity visual brief, exactly as Bajwa Writes / Founder /
   Company were.

2. **Continuity-architecture amendment.** A new row is added to
   Section 4's continuity-band table here, with the attribution
   copy and the new link set. **Order in the band is determined by
   tier:**
   - Institution surface(s) first (Company).
   - Then the three (or more) product substrates, in canonical
     reading order.
   - Then the founder.

3. **Cross-link canon update.** Section 5 gets a new entry with the
   canonical URL.

4. **Per-surface footer rollout.** Each repo's continuity-band
   widget gets the new link inserted in canonical order. The widget
   is a single shared shape per repo (a constant array, a small
   render component) — adding a link is a one-line change.

5. **Validation.** Standard validation matrix: desktop / tablet /
   mobile per surface, link-resolution check, no horizontal
   overflow.

A new product **does not** trigger:
- A redesign of the existing surfaces.
- A re-tone of existing footers.
- Re-ordering of the existing surfaces (canonical order is
  doctrine-locked).

---

## Section 9 — Implementation patterns (informational)

This section is non-normative — the doctrine is in Sections 1–8.
Below is the recommended implementation approach for consistency
across repos:

### 9.1 — Static HTML surfaces (Company, Founder)

The institutional continuity band is plain HTML inside the
`<footer>` element. The shared shape:

```html
<div class="footer__ecosystem" aria-label="Institutional continuity">
  <div class="footer__ecosystem-inner">
    <div class="footer__ecosystem-institution">
      <p class="footer__ecosystem-wordmark"><a href="…">Aura Platform LLC</a></p>
      <p class="footer__ecosystem-caption">…attribution copy per Section 4…</p>
    </div>
    <ul class="footer__ecosystem-links">
      <li><a href="https://company.auraplatform.org" rel="noopener">Company</a></li>
      <li><a href="https://auraplatform.org" rel="noopener">Aura</a></li>
      <li><a href="https://orchestrateops.com" rel="noopener">Orchestrate</a></li>
      <li><a href="https://bajwawrites.com" rel="noopener">Bajwa Writes</a></li>
      <li aria-current="page"><a href="…">Founder</a></li>
    </ul>
  </div>
</div>
```

CSS lives in the surface's existing tokens / base / sections
stylesheets. No new framework. No new dependency.

### 9.2 — Flutter web surfaces (Aura, Orchestrate, Bajwa Writes)

Each repo adds one small `EcosystemContinuityBand` widget (or
extends an existing footer widget) and inserts it once into the
public shell. The widget:

- Renders five `Text` + `InkWell` link rows in canonical order.
- Carries a constant array `_ECOSYSTEM_LINKS` at the top of the
  file with the URLs from Section 5.
- Marks the "you are here" link with a visual variant + semantic
  flag (`Semantics(selected: true)`).
- Uses the surface's own typography tokens — never a foreign font
  or color introduced by this widget.
- Does NOT add a new package dependency, new asset, or new
  router rule.

### 9.3 — Where to insert per surface

- **Aura** → extend `ShellFooter` (`lib/app/shell/shell_shared.dart`),
  add the band BENEATH the existing `_FooterBottomRow`.
- **Orchestrate** → extend `_PublicFooter`
  (`lib/app/shell/public_shell.dart`), add the band as a new bottom
  strip below the existing link columns.
- **Bajwa Writes** → extend the existing institutional band in
  `PageShell` (`lib/design/widgets/page_shell.dart`), add the
  cross-link list alongside the existing "Discourse · Operational ·
  Literary continuity" caption.

---

## Document provenance

| Field | Value |
|---|---|
| Path | `docs/ecosystem/ECOSYSTEM_CONTINUITY_ARCHITECTURE.md` |
| Repo | `bajwa4u2/personal` |
| Authored | 2026-06-01 |
| Status | Canonical. Active across all five public surfaces. |
| Companion doctrine | `docs/identity/AURA_ECOSYSTEM_IDENTITY_SYSTEM.md` |
| Supersedes | Any prior ad-hoc footer / cross-link practice in any repo. |
