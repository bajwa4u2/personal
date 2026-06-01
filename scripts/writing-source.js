/**
 * Writing source loader.
 *
 * Pulls the essay manifest at `data/writing.json` and renders it into
 * `#essays`. The manifest shape is designed to be swappable with a
 * future Bajwa Writes API response without changing this renderer:
 *
 *   {
 *     "source": "static" | "api",
 *     "generatedAt": "2026-05-31T00:00:00Z",
 *     "essays": [
 *       {
 *         "id": "string",
 *         "title": "string",
 *         "kind": "Essay" | "Doctrine" | "Letter" | "...",
 *         "date": "YYYY-MM-DD" | "" ,
 *         "excerpt": "string",
 *         "url": "string"            // absolute or path on bajwawrites.com
 *       },
 *       ...
 *     ]
 *   }
 *
 * The contract above is the integration point. When Bajwa Writes
 * exposes /api/v1/manifest (or similar), point `MANIFEST_URL` at
 * that endpoint and the page renders identically.
 *
 * Empty list, fetch failure, and malformed JSON all degrade to the
 * empty-state — the page never shows a half-broken essay list.
 */
(function () {
  'use strict';

  // Same-origin path today; swap to the Bajwa Writes API later.
  // Same-origin keeps the page CSP-clean and works without CORS.
  var MANIFEST_URL = 'data/writing.json';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    if (!iso || typeof iso !== 'string') return '';
    // Accept either YYYY-MM-DD or full ISO. Fall back to the raw
    // string if Date parsing fails so the renderer never throws.
    var parts = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!parts) return iso;
    var y = parts[1], m = parts[2], d = parts[3];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var mi = parseInt(m, 10);
    if (isNaN(mi) || mi < 1 || mi > 12) return iso;
    return months[mi - 1] + ' ' + parseInt(d, 10) + ', ' + y;
  }

  function renderEmpty(container, emptyTemplate) {
    if (!emptyTemplate) return;
    var clone = emptyTemplate.content
      ? emptyTemplate.content.cloneNode(true)
      : emptyTemplate.cloneNode(true);
    container.innerHTML = '';
    container.appendChild(clone);
  }

  function renderEssays(container, essays) {
    container.innerHTML = '';
    essays.forEach(function (essay) {
      if (!essay || typeof essay !== 'object') return;

      var row = el('article', 'essay');

      var meta = el('div', 'essay__meta');
      if (essay.kind) meta.appendChild(el('p', 'essay__kind', essay.kind));
      var dateLabel = formatDate(essay.date);
      if (dateLabel) meta.appendChild(el('p', 'essay__date', dateLabel));
      row.appendChild(meta);

      var body = el('div');
      var title = el('h3', 'essay__title');
      if (essay.url) {
        var a = el('a', null, essay.title || 'Untitled');
        a.href = essay.url;
        a.rel = 'noopener';
        if (/^https?:\/\//i.test(essay.url)) {
          a.target = '_blank';
        }
        title.appendChild(a);
      } else {
        title.textContent = essay.title || 'Untitled';
      }
      body.appendChild(title);

      if (essay.excerpt) {
        body.appendChild(el('p', 'essay__excerpt', essay.excerpt));
      }
      row.appendChild(body);

      container.appendChild(row);
    });
  }

  function init() {
    var container = document.getElementById('essays');
    var emptyTemplate = document.getElementById('essays-empty');
    if (!container) return;

    // Show empty state immediately so the page never flashes "loading"
    // copy. The fetch upgrades the surface only if real data lands.
    if (!container.children.length && emptyTemplate) {
      renderEmpty(container, emptyTemplate);
    }

    fetch(MANIFEST_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('manifest fetch failed: ' + res.status);
        return res.json();
      })
      .then(function (manifest) {
        if (!manifest || !Array.isArray(manifest.essays)) {
          throw new Error('manifest shape invalid');
        }
        if (manifest.essays.length === 0) {
          renderEmpty(container, emptyTemplate);
          return;
        }
        renderEssays(container, manifest.essays);
      })
      .catch(function (_err) {
        // Network down, malformed JSON, CSP block — all collapse to
        // the empty state. The page stays whole.
        renderEmpty(container, emptyTemplate);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
