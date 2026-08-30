# Founder Home Reconstruction Record

Status: proving surface for management review. Story, Work, Writing, and the full relationship experience remain unbuilt.

## Experience architecture

Founder presence → lived work arc → founder voice → current Aura Platform work → authored objects → Start a Conversation continuation.

The page uses the founder as the primary subject. Aura Platform is the current work chapter, not the whole identity.

## Approved material used

- Supplied founder portrait migrated into `src/assets/author.png`.
- Supplied founder video and poster migrated into `src/assets/video/`.
- Three supplied book covers migrated into `src/assets/books/`.
- Verified four-period chronology: military communications, Oman operations, platform formation, Aura Platform LLC.
- Canonical Founder & Managing Member role and Canton, Michigan location.
- Canonical relationship to Aura Platform LLC and Bajwa Writes.

## Material consciously rejected

Founder mark, old visitor header/footer, identity and authority pages, empty Conversations content, unsupported operating metrics and organizations, CEO wording, old Vision 2050 taxonomy, generic product cards, and fabricated historical imagery.

## Interaction and motion

The mobile menu is keyboard-operable through `aria-expanded` and closes after navigation. Scroll reveal is progressive enhancement only: meaningful content is visible on first paint and remains visible under reduced motion. Book objects use restrained pointer/focus lift without hover-only meaning. Video includes native controls, poster, and text fallback.

## Responsive model

Desktop uses a portrait-led two-field hero. Mobile becomes a deliberate vertical composition with bounded text measures, a full-width portrait crop, two-column-to-one-column chronology, and reflowing footer. The 320px correction uses intentional display line groups and a safe supporting text measure.

## Discovery

Home includes founder-specific canonical, search, social, and ProfilePage/Person metadata. The relationship CTA uses the bounded `/start-a-conversation?from=founder` context; query state is not a separate canonical document.

## Visual QA evidence

Reviewed locally after correction at 1440×1000, 390×844, and 320×720, plus a complete-page desktop/mobile render pass. The first hidden-reveal defect and narrow-width typography overflow were found by looking and corrected before handoff.

Evidence directory: `evidence/founder-home/`.

## Known limitations

The deeper Story, Work, Writing, and full Start a Conversation experiences are intentionally not reconstructed in this phase. The current Start a Conversation route is only a truthful technical relationship foundation so Home links do not dead-end.
