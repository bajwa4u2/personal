# Footer Reconciliation — 2026-06-01

**Status:** Second-pass redesign. The first ecosystem implementation
(commits `60e5854`, `e039184`, `5f7d9d7`) attached the continuity band
mechanically — a separate stacked slab beneath each surface's native
footer. Visiting the surfaces afterward showed the problem: the
ecosystem band reads as a *second* footer, not as the bottom layer
of one footer.

This document records the critique, the surface-by-surface verdict,
and the reconciled approach.

---

## Why Founder works

The founder footer is a single `<footer>` container with two
internal layers separated by one hairline rule, padded as one
composition. The brand block sits at the top with the surface-
native page links to its right; the institutional band sits at
the bottom with the five canonical ecosystem links to its right.
The wordmark "Aura Platform LLC" appears once, in the institutional
band only — not duplicated above.

**The lesson:** continuity is the *closing layer* of the surface's
own footer, not a second footer below it.

---

## Per-surface verdicts

### Aura — REBUILD (do not just edit)

Production today still shows Aura's pre-existing 4-column footer
(Aura / Participation / Support / Legal) followed by my new
stacked ecosystem slab. From the bottom-of-page crop the
duplication is the visible feeling — the page closes once, then
closes again.

**Reconciled approach:**

1. Remove the standalone `_EcosystemContinuityBand` insertion.
2. Inside the existing `ShellFooter` container, add ONE hairline
   below `_FooterBottomRow`, then add an *inline ecosystem row* in
   the same restrained scale as the bottom row — institution lockup
   on the left, the five canonical links on the right.
3. Move the "Built by Aura Platform LLC." attribution from a free-
   floating line to *the institution lockup* (left side of the
   ecosystem row). The wordmark is named exactly once.
4. Net visual: the footer closes in three layers within one
   container — top columns, copyright bottom row, ecosystem bottom
   row — separated by two hairlines. No second slab.

### Orchestrate — REBUILD

Production today shows Orchestrate's existing 5-group column footer
(Product / Trust architecture / Start / Legal / Trust). My new
band was appended below. Same stacking problem as Aura.

**Reconciled approach:**

1. Remove the standalone `_EcosystemContinuityBand` insertion.
2. Inside `_PublicFooter`, add a single bottom row directly beneath
   the column groups, separated by ONE hairline. The row carries
   the wordmark "Aura Platform LLC" on the left with "Part of Aura
   Platform LLC." attribution, and the five canonical links on the
   right.
3. Operational tone: mono-style restrained scale, no header
   adornment, no "we are part of a portfolio" framing.
4. Net visual: one footer container, one bottom continuity row.

### Bajwa Writes — STRIP, REPLACE WITH COLOPHON LINE

This is the most sensitive surface. The current `_InstitutionalFooter`
prints:

> Aura Platform LLC
> Part of the broader work of M S Bajwa and Aura Platform LLC.
> Company · Aura · Orchestrate · Bajwa Writes · Founder

— in a paperShade band at the foot of every reader surface. The
attribution copy is accurate but the band is **announced**. A
literary press never names its broader corporate structure with
that visual weight. Bajwawrites should feel like a book you closed.

**Reconciled approach:**

1. Delete the loud wordmark + tagline + sibling row.
2. Replace with a single colophon line — Source Serif 4 italic,
   muted color, set at the same scale as the body text of the
   reading column above:

   > *Bajwa Writes — an imprint of Aura Platform LLC.*

3. The five canonical cross-links appear *only on the colophon
   line of bound editions / publication detail pages* (already
   present there as the URN block), NOT in the public reader
   footer. The general reader footer carries the imprint line and
   nothing else.

4. **What this gives up:** direct cross-links from reader surfaces
   to Aura / Orchestrate / Founder / Company. Per the ecosystem
   doctrine, every public surface must carry the continuity. But
   the doctrine also says Bajwa Writes is the surface where
   **atmosphere overrides convenience**. The colophon line satisfies
   the doctrine's *attribution* requirement; the cross-link
   requirement is honored through the publication detail surfaces
   (which already cross-link) and through the absence of any
   competing brand on reader pages.

5. Net visual: a single italic serif line at the foot of every
   reader page. Nothing else. The surface closes like a book.

### Founder — NO CHANGE

Reference implementation. Already canonical.

### Company — NO CHANGE TO FOOTER

The company's institutional band is already correct. The page
*itself* is the ecosystem map; the footer carries the closing
attribution. Footer was not in the regression set.

---

## Continuity per surface — final shape

Not identical across surfaces. The doctrine's "five canonical links
in fixed order" still holds *as the link-canon* — but the
**presentation** varies:

| Surface | Continuity presentation |
|---|---|
| Company | Full 5-link band — the surface IS the ecosystem map |
| Aura | 5-link inline row inside the existing footer container |
| Orchestrate | 5-link inline row inside the existing footer container |
| Founder | 5-link inline row inside the existing footer container *(reference)* |
| **Bajwa Writes** | **Single italic colophon line — no cross-links in the reader footer; cross-links appear only on publication detail surfaces** |

This is what the user's brief asked for: "Should presentation vary? Should density vary? Should visual treatment vary? — Answer per surface."

---

## Company 403 — diagnostic record

Three independent audits in this session probed
`https://company.auraplatform.org/`. All returned HTTP 200 OK with
`CF-Cache-Status: HIT`, no `cf-access-*` headers, no
`cf-mitigated`, no redirect to `*.cloudflareaccess.com`. Probes
included default curl, browser-UA curl, IPv4, IPv6, headless Edge
with full Playwright pipeline. None reproduced a 403.

The most likely vectors for the user-side 403 — none of which can
be fixed from this session:

1. Browser cache holding a 403 from a Pages deploy window.
2. Network-side WAF / proxy / corporate-network intercept.
3. Cloudflare bot-fight or rate-limit rule triggering on the
   user's IP fingerprint (no global effect).

**The actionable diagnostic step** lives in the Cloudflare
dashboard — capture the `cf-ray` ID of any 403 response from the
user's browser and look it up in *Security → Events*. That tells
us whether the response came from origin (Railway), Pages SPA
fallback, WAF, Bot Management, an Access policy, or rate limiting.
I cannot do this from this session.

For this redesign task, the Company footer is treated as **not in
regression**, because production is currently serving correctly
under my probes.

---

## Doctrine-level update

`docs/ecosystem/ECOSYSTEM_CONTINUITY_ARCHITECTURE.md` §9.2 currently
prescribes a standalone `EcosystemContinuityBand` widget appended
to the public shell footer. **That guidance was wrong.** This
reconciliation document supersedes that section in spirit; the
canonical pattern is now:

- One footer container per surface.
- Continuity occupies the bottom layer of that container.
- Bajwa Writes is the documented exception — colophon-only.

A future doctrine pass will fold this back into Section 9 of the
governing document.

---

*Authored 2026-06-01. Companion to
`ECOSYSTEM_CONTINUITY_ARCHITECTURE.md` and the per-identity visual
briefs.*
