# Founder Story Reconstruction Record

Status: deployed for management visual review

## Experience

`/story` is a narrative founder surface built from the approved founder film,
poster still, verified chronology, founder account, and supporting founder
records. It uses the founder's wordmark-only identity and remains separate from
the Aura Platform product world.

The page moves from presence, to the founder's own voice, to a fact-based life
arc, to authored supporting records, and back into the continuing relationship
path. The chronology supports the narrative; it is not presented as a CV
table. Presentation-style scene numbering was removed from the public surface.

## Material used

- `assets/video/founder.mp4`
- `assets/video/founder-poster.jpg`
- verified founder chronology and public role facts from the source audit

Legacy source remains reference-only and is not a runtime dependency.

## Interaction and responsive behavior

- Native video controls with poster and written-story fallback.
- Keyboard-accessible navigation and skip link.
- Mobile navigation remains available without scroll choreography.
- Mobile arc content changes to a single readable column rather than retaining
  desktop minimum widths.
- Reduced motion leaves all content present and removes reliance on reveal
  timing.

## Visual QA evidence

- Desktop opening: `evidence/founder-story/story-live-1440.png`
- Mobile opening: `evidence/founder-story/story-live-390.png`
- Narrow opening: `evidence/founder-story/story-live-320.png`
- Full desktop traversal: `evidence/founder-story/story-full-1440-pass3.png`
- Full mobile traversal: `evidence/founder-story/story-full-390-pass3.png`

The first full traversal identified mobile arc-column and quote overflow. The
mobile layout was corrected, rerendered at 320/360/390, and then deployed. The
hero's internal `01 / 05` marker was removed because it read as production
presentation language rather than public narrative. The CV-style records
section was subsequently removed from the public Story surface; the PDFs remain
preserved as controlled source artifacts only.

## Verification

- `npm run build` passed.
- `npm run verify` passed.
- Live `/story`, supporting route scaffolds, CSS, and poster asset returned
  successfully from `bajwa.auraplatform.org`.
- Deployment version: `45b2f244-2fe0-4f16-a911-9ee65fec9c35`.

Known limitation: full-page capture evidence is retained from the local
traversal; live browser review was performed on the deployed opening and
route/asset responses. No other founder destination was reconstructed.
