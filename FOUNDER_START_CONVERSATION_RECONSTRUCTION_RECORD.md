# Founder Start a Conversation Reconstruction Record

Status: implementation complete for management visual review.

## Governing model

`/start-a-conversation` is a person-to-person relationship surface:
personal context -> meaningful reasons to approach -> appropriate continuation.
Muhammad Sakhawat Bajwa remains the sole primary recipient. The page does not
ask visitors to classify themselves before approaching.

## Relationship paths

Direct email, verified founder scheduling, collaboration, partnership, capital,
defined engagement/proposal context, authored-work conversation, company/product
context and unexpected conversation are all supported without an intent grid.
The form is secondary and revealed only for a defined matter. It prepares a
truthful email locally; no CRM, form API or durable relationship backend is
claimed.

Verified authorities:
- Founder email: `msbajwa@auraplatform.org`
- Founder scheduling: `https://auraplatform.org/i/aura-platform-llc/meet/founder-conversation`
- Strategic member links are preserved only as contextual continuations.
- Company handoff: `https://company.auraplatform.org/`

## Context and privacy

Bounded public `from` values can influence the email subject for home, journey,
writing, Aura, Orchestrate, Bajwa Writes, company and founder origins. Visitor
names, email addresses, messages, proposal answers and other private content
never enter URL state. Query variants remain one canonical document.

## Shared shell

The founder closing is generated from `src/shared/founder-closing.html` for
Home, Journey, Writing and Start a Conversation. Both estates consume the
canonical build-time navigation primitive at
`public-web/shared/mobile-navigation.js`; estate markup supplies only its
navigation contract. The drawer owns focus, Escape, route-close, scroll-lock,
resize and reduced-motion behavior.

## Legacy boundary

Legacy `personal/bajwa` was used as reference only. It remains untouched and
is not a runtime dependency.

## QA

Build and verify pass for both estates. Local browser checks covered the
founder relationship page at 1440, 1024, 390, 360 and 320 widths, including
direct entry, proposal reveal and responsive layout. Menu behavior is shared
and was exercised through the browser shell. Live deployment follows after
final local inspection.

