# bajwa.auraplatform.org — founder identity site

Canonical founder, operator, executive, author, and platform architect identity surface for
**Muhammad Sakhawat Bajwa** — founder and CEO of Aura Platform LLC.

Lives at `personal/bajwa/` in the codebase and is served as `https://bajwa.auraplatform.org/`
in production. The subdomain root maps to this directory; the codebase path is *not* part of
public URLs.

## Layout

```
bajwa/
├── index.html              # Home (founder portrait + masthead + identity arc + ventures snapshot)
├── journey.html            # Timeline 1991–present + executive scale + representative orgs
├── ventures.html           # Aura · Orchestrate · Bajwa Writes
├── writing.html            # Selected essays + Selected Works · Books (manifest-driven)
├── conversations.html      # Interviews / podcasts / talks (empty-state today)
├── contact.html            # Direct correspondence
├── styles/
│   ├── tokens.css          # Institutional design tokens
│   ├── base.css            # Reset + typography primitives + nav/footer
│   ├── sections.css        # Composition primitives for sections
│   └── founder.css         # Founder-identity layer (portrait, journey, books, etc.)
├── scripts/
│   ├── scroll.js           # Section-reveal + light/dark register toggle
│   ├── writing-source.js   # Loads data/writing.json into #essays
│   └── books-source.js     # Loads data/books.json into #books
├── data/
│   ├── writing.json        # Essay manifest (currently empty; future API target)
│   └── books.json          # Book manifest (currently three works; future API target)
├── assets/
│   ├── og-bajwa.svg        # 1200×630 OG card
│   ├── author.jpeg         # Founder portrait, 1200×1600 (used on Home masthead)
│   └── books/
│       ├── README.md       # Cover requirements + how to register a new title
│       └── *.png / *.jpg   # Real book covers, 2:3 aspect, referenced from books.json
├── sitemap.xml
├── robots.txt
├── DEPLOY.md               # Host + DNS configuration for bajwa.auraplatform.org
└── README.md               # this file
```

## Visual canon

Inherits the institutional tokens (Inter / JetBrains Mono / Source Serif 4; teal accent; dark
register default with explicit light register toggle). The founder layer in `styles/founder.css`
adds: literary register class, timeline grammar, executive-scale table, empty-state component,
contact treatment.

No skill bars, percentages, GitHub grids, or resume download — by design.

## Writing source

`writing.html` renders from `data/writing.json`. The manifest shape:

```json
{
  "source": "static" | "api",
  "generatedAt": "YYYY-MM-DDTHH:MM:SSZ",
  "essays": [
    {
      "id": "string",
      "title": "string",
      "kind": "Essay" | "Doctrine" | "Letter" | "...",
      "date": "YYYY-MM-DD",
      "excerpt": "string",
      "url": "https://bajwawrites.com/..."
    }
  ]
}
```

Initially empty. Two upgrade paths:

1. **Static refresh** — write entries into `data/writing.json` and commit.
2. **API ingestion** — change `MANIFEST_URL` in `scripts/writing-source.js` to a Bajwa Writes
   manifest endpoint. The shape above is the integration contract.

Fetch failure, empty array, and malformed JSON all degrade to the empty-state template
(`#essays-empty`). The page is whole at every state.

## Deploying

See `DEPLOY.md` for the host configuration and DNS record needed to serve this directory at
`https://bajwa.auraplatform.org/`.
