/**
 * Books source loader.
 *
 * Renders the Selected Works · Books surface on writing.html (and a
 * compact home-page preview when #books-preview is present) from the
 * manifest at `data/books.json`. Manifest shape — a top-level array:
 *
 *   [
 *     {
 *       "slug": "string",
 *       "title": "string",
 *       "category": "string",   // e.g. "Faith · Ethics · Institutions"
 *       "status": "Published" | "Forthcoming" | "...",
 *       "cover": "string",      // path relative to site root
 *       "url": "string",        // destination on bajwawrites.com
 *       "summary": "string"     // 1–2 sentence posture
 *     }
 *   ]
 *
 * Empty array, fetch failure, malformed JSON — all degrade to the
 * empty-state template (#books-empty). The page is whole at every
 * state. Same posture as writing-source.js.
 */
(function () {
  'use strict';

  var MANIFEST_URL = 'data/books.json';

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function isAbsoluteUrl(url) {
    return /^https?:\/\//i.test(url || '');
  }

  function renderEmpty(container, emptyTemplate) {
    if (!emptyTemplate) return;
    var clone = emptyTemplate.content
      ? emptyTemplate.content.cloneNode(true)
      : emptyTemplate.cloneNode(true);
    container.innerHTML = '';
    container.appendChild(clone);
  }

  function makeBookTile(book, compact) {
    var tile = el('article', 'book');
    if (compact) tile.classList.add('book--compact');

    var coverFrame = el('div', 'book__cover-frame');
    var img = el('img', 'book__cover');
    img.src = book.cover;
    img.alt =
      'Cover of "' + (book.title || 'Untitled') + '" by Muhammad Sakhawat Bajwa.';
    img.loading = 'lazy';
    img.decoding = 'async';

    if (book.url) {
      var coverLink = el('a', 'book__cover-link');
      coverLink.href = book.url;
      coverLink.rel = 'noopener';
      if (isAbsoluteUrl(book.url)) coverLink.target = '_blank';
      coverLink.setAttribute('aria-label', 'Open ' + (book.title || 'book') + ' on Bajwa Writes.');
      coverLink.appendChild(img);
      coverFrame.appendChild(coverLink);
    } else {
      coverFrame.appendChild(img);
    }
    tile.appendChild(coverFrame);

    var meta = el('div', 'book__meta');

    if (book.category) {
      meta.appendChild(el('p', 'book__category', book.category));
    }

    var title = el('h3', 'book__title');
    if (book.url) {
      var titleLink = el('a', null, book.title || 'Untitled');
      titleLink.href = book.url;
      titleLink.rel = 'noopener';
      if (isAbsoluteUrl(book.url)) titleLink.target = '_blank';
      title.appendChild(titleLink);
    } else {
      title.textContent = book.title || 'Untitled';
    }
    meta.appendChild(title);

    // Status chip (e.g. "Published") sits as a quiet mono pill,
    // never as a marketing badge — no "bestseller", no "new".
    if (book.status) {
      meta.appendChild(el('p', 'book__status', book.status));
    }

    // Compact tiles drop the summary so the home preview reads as a
    // shelf, not a detail page.
    if (!compact && book.summary) {
      meta.appendChild(el('p', 'book__summary', book.summary));
    }

    tile.appendChild(meta);
    return tile;
  }

  function renderInto(containerId, emptyTemplateId, books, opts) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var emptyTemplate = document.getElementById(emptyTemplateId);
    var compact = !!(opts && opts.compact);
    var limit = (opts && opts.limit) || books.length;

    if (!books.length) {
      renderEmpty(container, emptyTemplate);
      return;
    }
    container.innerHTML = '';
    books.slice(0, limit).forEach(function (book) {
      if (!book || typeof book !== 'object' || !book.cover) return;
      container.appendChild(makeBookTile(book, compact));
    });
  }

  function showPrefetchEmptyStates() {
    // Show the empty-state templates immediately so the page never
    // flashes "loading" copy. The fetch upgrades the surface only
    // if real data lands.
    [
      ['books', 'books-empty'],
      ['books-preview', 'books-preview-empty'],
    ].forEach(function (pair) {
      var c = document.getElementById(pair[0]);
      var t = document.getElementById(pair[1]);
      if (c && !c.children.length && t) renderEmpty(c, t);
    });
  }

  function init() {
    if (!document.getElementById('books') && !document.getElementById('books-preview')) {
      return;
    }
    showPrefetchEmptyStates();

    fetch(MANIFEST_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('books manifest fetch failed: ' + res.status);
        return res.json();
      })
      .then(function (manifest) {
        // Accept either a top-level array (the canonical shape) or
        // an object with a `books` key, for forward compatibility
        // with future API responses that may wrap the array.
        var books = Array.isArray(manifest)
          ? manifest
          : (manifest && Array.isArray(manifest.books) ? manifest.books : null);
        if (!books) throw new Error('books manifest shape invalid');

        renderInto('books', 'books-empty', books, { compact: false });
        renderInto('books-preview', 'books-preview-empty', books, { compact: true, limit: 3 });
      })
      .catch(function (_err) {
        // Manifest unreachable — leave the empty-states in place.
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
