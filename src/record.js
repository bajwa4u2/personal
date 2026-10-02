// The Record — one script for every page. Each block runs only if its markup is present.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  // Header: mobile menu
  var rh = $('.rh'), menu = $('.rh-menu');
  if (rh && menu) menu.addEventListener('click', function () {
    var open = !rh.classList.contains('open');
    rh.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open));
  });

  // Home: Decide · Say · Make
  var machine = $('[data-machine]');
  if (machine) {
    var tabs = $$('.lens button', machine), scenes = $$('.scene', machine);
    var foot = $('[data-foot]', machine), go = $('[data-go]', machine);
    var meta = {
      decide: ['Orchestrate: AI prepares, the owner decides.', '/orchestrate', 'See Orchestrate →'],
      say: ['Aura: institutions answer in their own name.', '/aura', 'See Aura →'],
      make: ['Colophon: the work keeps its author.', '/colophon', 'See Colophon →']
    };
    var order = ['decide', 'say', 'make'], idx = 0, auto = !reduce, timer;
    var appr = $('[data-approve]', machine), ad = $('[data-dattr]', machine), adt = $('[data-dattr] span', machine);
    var approved = function (on) { ad.classList.toggle('on', on); adt.textContent = on ? 'Approved by Sam Ortiz, Owner · sent from sam@ortizsurvey.com · 9:42 AM' : 'Waiting for the owner’s approval'; appr.textContent = on ? 'Sent ✓' : 'Approve and send'; };
    var show = function (k, user) {
      if (user) { auto = false; clearInterval(timer); }
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.lens === k ? 'true' : 'false'); });
      scenes.forEach(function (s) { s.classList.toggle('off', s.dataset.scene !== k); s.setAttribute('aria-hidden', String(s.dataset.scene !== k)); });
      foot.textContent = meta[k][0]; go.href = meta[k][1]; go.textContent = meta[k][2];
      var a = $('[data-scene="' + k + '"] .attr', machine);
      idx = order.indexOf(k);
    };
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.lens, true); }); });
    appr.addEventListener('click', function () { approved(true); auto = false; clearInterval(timer); });
    $('[data-reset]', machine).addEventListener('click', function () { approved(false); });
    var rev = $('[data-rev]', machine), rl = $('[data-revlabel]', machine);
    rev.addEventListener('input', function () { var v = +rev.value; rl.textContent = 'Rev ' + v + (v === 4 ? ' · current' : ' · kept'); });
    if (auto) timer = setInterval(function () {
      if (!auto) return;
      if (idx === 0) { approved(true); setTimeout(function () { if (auto) show('say'); }, 1800); }
      else { var next = order[(idx + 1) % 3]; show(next); if (next === 'decide') approved(false); }
    }, 4200);
  }

  // Orchestrate: the path to paid
  $$('[data-flow]').forEach(function (flow) {
    var steps = $$('.steps span', flow), st = 1, nb = $('[data-next]', flow), att = $('[data-flow-attr]', flow);
    var after = ['Approve and send', 'Agreement confirmed', 'Invoice paid', 'Paid ✓'];
    var says = ['', 'Approved by Sam Ortiz, Owner · sent from sam@ortizsurvey.com', 'Terms accepted by Kestrel Civil Works · confirmed by Sam Ortiz', 'Invoice paid · recorded against the agreement'];
    var paint = function () { steps.forEach(function (s, i) { s.className = i < st ? 'done' : (i === st ? 'now' : ''); }); };
    nb.addEventListener('click', function () {
      if (st < steps.length) { st++; paint(); }
      nb.textContent = st >= steps.length ? 'Paid ✓' : after[Math.min(st - 1, 3)];
      if (att) { att.textContent = says[Math.min(st - 1, 3)] || ''; att.hidden = !att.textContent; }
    });
    $('[data-restart]', flow).addEventListener('click', function () { st = 1; paint(); nb.textContent = 'Approve and send'; if (att) att.hidden = true; });
  });

  // Aura: post types and a call
  var kinds = { Ask: 'Will the library keep weekend hours through the winter?', Issue: 'The crosswalk on Ford Road has no signal at night.', Update: 'Our reading circle meets Thursday at 6.' };
  $$('[data-phone]').forEach(function (ph) {
    var chips = $$('.chips button', ph);
    chips.forEach(function (b) { b.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $('[data-kindlabel]', ph).textContent = b.dataset.kind; $('[data-kindtext]', ph).textContent = kinds[b.dataset.kind];
    }); });
    var cb = $('[data-callbtn]', ph), cl = $('[data-call]', ph), on = false;
    if (cb) cb.addEventListener('click', function () {
      on = !on; cl.textContent = on ? 'Ringing…' : 'Maya R. · audio call'; cb.textContent = on ? 'End' : 'Call';
      if (on) setTimeout(function () { if (on) cl.textContent = 'Connected · 00:03'; }, 1500);
    });
  });

  // Colophon: one work, seven languages
  var verses = { en: ['When care carries weight', ''], ur: ['جب احساس بوجھ بننے لگتا ہے', 'ur'], ar: ['حين يصبح الإحساس ثقلًا', 'ar'], hi: ['जब एहसास बोझ बनने लगे', 'hi'], fr: ['Quand le ressenti devient lourd', ''], es: ['Cuando el sentir empieza a pesar', ''], tr: ['His ağırlaştığında', ''] };
  $$('[data-book]').forEach(function (bk) {
    var bs = $$('.langs button', bk), ve = $('.verse', bk);
    bs.forEach(function (b) { b.addEventListener('click', function () {
      bs.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var v = verses[b.dataset.l]; ve.textContent = v[0]; ve.className = 'verse ' + v[1];
      ve.dir = (b.dataset.l === 'ur' || b.dataset.l === 'ar') ? 'rtl' : 'ltr'; ve.lang = b.dataset.l;
    }); });
  });

  // Urdu, Arabic and Hindi faces arrive only when a visitor first switches language
  var fontsLoaded = false, loadScriptFonts = function () {
    if (fontsLoaded) return; fontsLoaded = true;
    var m = document.querySelector('meta[name="script-fonts"]'); if (!m) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = m.content; document.head.appendChild(l);
  };
  $$('.langs button').forEach(function (b) { b.addEventListener('click', loadScriptFonts); });
  $$('[data-needs-scripts]').forEach(function (el) { if ('IntersectionObserver' in window) { var o = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { loadScriptFonts(); o.disconnect(); } }, { rootMargin: '300px' }); o.observe(el); } else loadScriptFonts(); });
  // Colophon shelf: filter by language
  $$('[data-shelf-filter]').forEach(function (fl) { var bs = $$('button', fl), shelf = fl.parentNode.querySelector('[data-shelf]');
    bs.forEach(function (b) { b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.cover', shelf).forEach(function (c) { c.hidden = b.dataset.f !== 'all' && c.dataset.lang !== b.dataset.f; }); loadScriptFonts(); }); }); });
  if ($('.urline')) { var io0 = 'IntersectionObserver' in window && new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { loadScriptFonts(); io0.disconnect(); } }); io0 && io0.observe($('.urline')); }

  // Orchestrate: businesses ready for you
  $$('[data-market]').forEach(function (mk) {
    var note = $('[data-mnote]', mk), txt = $('[data-mtext]', mk), att = $('[data-mattr]', mk), ap = $('[data-mapprove]', mk);
    $$('[data-write]', mk).forEach(function (btn) { btn.addEventListener('click', function () {
      var row = btn.closest('[data-row]');
      $$('[data-row]', mk).forEach(function (r) { r.hidden = r !== row; });
      txt.textContent = '“' + row.dataset.note + '”';
      note.hidden = false; att.textContent = 'Waiting for the owner’s approval'; att.style.opacity = .6; ap.textContent = 'Approve and send';
    }); });
    ap.addEventListener('click', function () { att.textContent = 'Approved by Sam Ortiz, Owner · sent from sam@ortizsurvey.com'; att.style.opacity = 1; ap.textContent = 'Sent ✓'; });
    $('[data-mback]', mk).addEventListener('click', function () { $$('[data-row]', mk).forEach(function (r) { r.hidden = false; }); note.hidden = true; });
  });

  // Aura: a conversation
  $$('[data-chat]').forEach(function (ch) {
    var list = $('[data-bubbles]', ch), inp = $('[data-chatinput]', ch), cb = $('[data-chatcall]', ch), on = false;
    var add = function (cls, t) { var p = document.createElement('p'); p.className = 'bub ' + cls; p.textContent = t; list.appendChild(p); list.scrollTop = list.scrollHeight; return p; };
    var send = function () { var t = (inp.value || '').trim() || 'Talk tonight?'; add('me', t); inp.value = ''; setTimeout(function () { add('them', 'Yes, call me after eight.'); }, 900); };
    $('[data-chatsend]', ch).addEventListener('click', send);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    cb.addEventListener('click', function () { on = !on; cb.textContent = on ? 'End' : 'Call'; var s = add('sys', on ? 'Ringing…' : 'Call ended'); if (on) setTimeout(function () { if (on) s.textContent = 'Audio call · connected'; }, 1400); });
  });

  // Feature minis
  $$('[data-toggle-approve]').forEach(function (b) { var t = b.parentNode.querySelector('[data-approve-text]'), on = false;
    b.addEventListener('click', function () { on = !on; b.textContent = on ? 'Approved ✓' : 'Approve'; t.textContent = on ? 'Sent from your mailbox' : 'Waiting for you'; }); });
  $$('[data-toggle-call]').forEach(function (b) { var t = b.parentNode.querySelector('[data-call-text]'), on = false;
    b.addEventListener('click', function () { on = !on; b.textContent = on ? 'End' : 'Call'; t.textContent = on ? 'Ringing…' : 'Maya R.'; if (on) setTimeout(function () { if (on) t.textContent = 'Connected · 00:02'; }, 1300); }); });

  // Get the apps: the right store for this device, scan codes on desktop
  var get = $('[data-get]');
  if (get) {
    var ua = navigator.userAgent || '';
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua);
    var device = ios ? 'platform-apple' : android ? 'platform-android' : /Windows/.test(ua) ? 'platform-windows' : 'platform-web';
    var labels = { 'platform-apple': 'on the App Store', 'platform-android': 'on Google Play', 'platform-windows': 'from Microsoft', 'platform-web': 'on the web' };
    var wanted = (new URLSearchParams(location.search).get('app') || '').toLowerCase();
    if (!ios && !android) document.body.classList.add('show-qr');
    if (window.innerWidth >= 1000) $$('.stores', get).forEach(function (d) { d.open = true; });
    if (/FBAN|FBAV|Instagram|LinkedInApp|musical_ly|TikTok|Bytedance|Line\//.test(ua)) document.body.classList.add('is-inapp');
    $$('.appc', get).forEach(function (card) {
      var name = card.dataset.name;
      var pick = $('.platform-link .' + device, card), kind = device;
      if (!pick) { pick = $('.platform-link .platform-web', card); kind = 'platform-web'; }
      if (!pick) return;
      var link = pick.closest('a'), button = $('[data-get-button]', card);
      button.href = link.href;
      button.textContent = (kind === 'platform-web' ? 'Open ' + name + ' ' : 'Get ' + name + ' ') + labels[kind];
      if (wanted && wanted === card.dataset.app) location.replace(link.href);
    });
  }

  // Start a conversation: a letter, already addressed. The tab chooses why you are
  // writing; the blanks sit inside the sentence; your own email sends it.
  var convo = $('[data-convo]');
  if (convo) {
    var params = new URLSearchParams(location.search);
    var froms = { aura: 'Aura', orchestrate: 'Orchestrate', 'bajwa-writes': 'Colophon', colophon: 'Colophon', company: 'the company page', founder: 'the founder', home: 'the home page', films: 'the films' };
    var D = {
      product: { tone: 'orc', s: 'Putting a product to work', body: ['We are ', ['org', 'your business or institution'], ' in ', ['city', 'your city'], '. We would like to use ', ['which', 'Orchestrate, Aura or Colophon'], ' to ', ['want', 'what you want it to do'], '.'],
        direct: [['Start with Orchestrate', 'https://orchestrateops.com'], ['Get Aura', '/get?app=aura'], ['Apply to write on Colophon', 'https://bajwawrites.com/apply']] },
      partnership: { tone: 'aura', s: 'A partnership', body: ['I am writing from ', ['org', 'your organisation'], '. We reach ', ['reach', 'who you reach'], '. The partnership I have in mind is ', ['shape', 'its shape'], '.'], direct: [] },
      capital: { tone: 'ink', s: 'A capital conversation', body: ['I invest ', ['how', 'through a fund, or as an individual'], ' in ', ['stage', 'stages and areas'], '. What drew me to Aura Platform is ', ['why', 'what caught your eye'], '.'], direct: [] },
      principal: { tone: 'col', s: 'The founding commercial role', body: ['I have sold ', ['what', 'what you sold'], ' to ', ['whom', 'whom'], ', and built partnerships with ', ['partners', 'whom'], '. I want this role because ', ['why', 'your reason'], '.'], direct: [] },
      authored: { tone: 'col', s: 'About your writing', body: ['I read ', ['which', 'which book'], ', and I would like to ', ['want', 'ask, discuss or share'], '.'],
        direct: [['Read on Colophon', 'https://bajwawrites.com'], ['Apply to write on Colophon', 'https://bajwawrites.com/apply']] },
      unsure: { tone: 'orc', s: 'A conversation', body: ['I am writing because ', ['why', 'say it in a line'], '.'], direct: [] }
    };
    var alias = { proposal: 'partnership' };
    var more = $('[data-more]', convo), detail = $('[data-detail]', convo);
    var fit = function (t) { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; };
    var openDetail = function (on, focus) {
      detail.hidden = !on; more.setAttribute('aria-expanded', on ? 'true' : 'false'); more.hidden = on;
      if (on) { $$('textarea', detail).forEach(fit); if (focus) $('textarea', detail).focus(); }
    };
    more.addEventListener('click', function () { openDetail(true, true); });
    $$('textarea', detail).forEach(function (t) { t.addEventListener('input', function () { fit(t); }); });
    var from = froms[params.get('from')] ? params.get('from') : '';
    var want = alias[params.get('intent')] || params.get('intent');
    var tabs = $$('.c-tabs [data-intent]', convo), letter = $('[data-letter]', convo), bodyEl = $('[data-body]', convo);
    var direct = $('[data-direct]', convo), origin = $('[data-origin]', convo), current = '';
    var typed = {};
    try { $('[data-date]', convo).textContent = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) {}
    if (from) { origin.hidden = false; origin.textContent = 'From ' + froms[from] + '. That travels with your note.'; }
    var ruler = document.createElement('canvas').getContext('2d');
    var grow = function (i) { var cs = getComputedStyle(i); ruler.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      i.style.width = Math.ceil(ruler.measureText(i.value || i.placeholder).width + 6) + 'px'; };
    var set = function (k, focus) {
      var c = D[k]; if (!c) return; current = k;
      convo.closest('section').dataset.tone = c.tone;
      tabs.forEach(function (t) { var on = t.dataset.intent === k; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
      $('[data-subject]', convo).textContent = c.s + (from ? ' · from ' + froms[from] : '');
      bodyEl.innerHTML = ''; var p = document.createElement('p'); p.textContent = 'Dear Muhammad,'; bodyEl.appendChild(p);
      var q = document.createElement('p');
      c.body.forEach(function (seg) {
        if (typeof seg === 'string') {
          // punctuation stays on the same line as the blank before it
          var m = /^[.,;:]/.test(seg) && q.lastChild && q.lastChild.tagName === 'INPUT' ? seg.charAt(0) : '';
          if (m) { var nw = document.createElement('span'); nw.style.whiteSpace = 'nowrap'; q.insertBefore(nw, q.lastChild); nw.appendChild(nw.nextSibling); nw.appendChild(document.createTextNode(m)); seg = seg.slice(1); }
          if (seg) q.appendChild(document.createTextNode(seg)); return;
        }
        var i = document.createElement('input'); i.name = seg[0]; i.placeholder = seg[1]; i.setAttribute('aria-label', seg[1]);
        i.value = typed[seg[0]] || ''; grow(i);
        i.addEventListener('input', function () { typed[seg[0]] = i.value; grow(i); });
        q.appendChild(i);
      });
      bodyEl.appendChild(q);
      direct.innerHTML = ''; if (c.direct.length) { var lab = document.createElement('small'); lab.textContent = 'Or go straight there'; direct.appendChild(lab);
        c.direct.forEach(function (x) { var a = document.createElement('a'); a.href = x[1]; a.textContent = x[0] + ' →'; if (/^https?:/.test(x[1])) { a.target = '_blank'; a.rel = 'noopener'; } direct.appendChild(a); }); }
      direct.hidden = !c.direct.length;
      if (k === 'unsure') { more.hidden = true; detail.hidden = true; } else if (detail.hidden) { more.hidden = false; }
      var u = new URLSearchParams(); if (from) u.set('from', from); u.set('intent', k);
      history.replaceState({}, '', '/start-a-conversation?' + u.toString() + '#route');
      if (focus && window.innerWidth >= 1000) { var first = $('input', bodyEl); if (first) first.focus({ preventScroll: true }); }
    };
    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () { set(t.dataset.intent, true); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (!d) return;
        e.preventDefault(); var nx = tabs[(n + d + tabs.length) % tabs.length]; nx.focus(); set(nx.dataset.intent, false);
      });
    });
    letter.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#c-name', letter);
      if (!name.value.trim()) { name.focus(); name.reportValidity(); return; }
      var line = D[current].body.map(function (seg) { return typeof seg === 'string' ? seg : (typed[seg[0]] || '[' + seg[1] + ']'); }).join('');
      var parts = [];
      if (!detail.hidden) $$('label', detail).forEach(function (l) { var v = $('textarea', l).value.trim(); if (v) parts.push($('small', l).textContent + ':\n' + v); });
      var text = 'Dear Muhammad,\n\n' + line + (parts.length ? '\n\n' + parts.join('\n\n') : '') + '\n\nWith regards,\n' + name.value.trim();
      location.href = 'mailto:' + (convo.dataset.mailto || 'hello@auraplatform.org') + '?subject=' + encodeURIComponent($('[data-subject]', convo).textContent) + '&body=' + encodeURIComponent(text);
      $('[data-status] span', letter).textContent = 'Opening your email with this note. Send it from there.';
    });
    set(D[want] ? want : 'unsure', false);
    if (params.get('intent') === 'proposal') openDetail(true, false);
    if (document.fonts) document.fonts.ready.then(function () { $$('input', letter).forEach(grow); });
  }
})();

// Films: play in place (privacy-enhanced YouTube) instead of leaving the site.
(function () {
  [].slice.call(document.querySelectorAll('.watch[data-yt]')).forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + a.dataset.yt + '?autoplay=1&rel=0';
      f.title = a.getAttribute('aria-label') || 'Film';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.setAttribute('allowfullscreen', '');
      a.replaceWith(Object.assign(document.createElement('div'), { className: 'watch' })); 
      document.querySelector('.watch:not([data-yt])').appendChild(f);
    });
  });
})();

// Fit every stage (and the Home card) to the screen it is on: never taller than
// what is left beside its headline, so a section reads as one composition.
(function () {
  var targets = [].slice.call(document.querySelectorAll('.stage:not(.s-letter), [data-machine]'));
  var boxes = targets.map(function (el) {
    var box = document.createElement('div'); box.className = 'fitbox';
    el.parentNode.insertBefore(box, el); box.appendChild(el); return box;
  });
  var fit = function () {
    var H = window.innerHeight, wide = window.innerWidth >= 1000;
    boxes.forEach(function (box) {
      var el = box.firstElementChild;
      el.style.transform = ''; box.style.height = '';
      var sec = box.closest('section'), cs = sec ? getComputedStyle(sec) : null;
      var pad = cs ? parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) : 0;
      var avail = wide ? H - 64 - pad - 8 : H * 0.46;
      var nat = el.offsetHeight;
      if (nat > avail && avail > 200) {
        var s = Math.max(0.6, avail / nat);
        el.style.transform = 'scale(' + s.toFixed(3) + ')';
        box.style.height = Math.ceil(nat * s) + 'px';
      }
    });
  };
  fit();
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('load', fit);
  // interactive pieces can change height (a note opens, a list folds): refit after each click
  document.addEventListener('click', function (e) { if (e.target.closest('.fitbox')) setTimeout(fit, 60); });
})();
