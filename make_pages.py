# Founder site, The Record: the person behind the company, in the same house.
# Writes src pages; build.mjs then adds the footer, discovery metadata and sitemap.
# Rule from the founder (2 Oct 2026): countries and languages, never a timeline.
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
FONTS = ('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400'
         '&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap')
SCRIPTS = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&family=Noto+Naskh+Arabic&display=swap'
COMPANY = 'https://company.auraplatform.org'

HEADER = '''<header class="rh fh-head" role="banner">
  <div class="wrap">
    <a class="rh-brand" href="/" aria-label="M S Bajwa, home"><img src="/assets/author.png" alt="" width="28" height="28">M S Bajwa</a>
    <nav class="rh-nav" aria-label="Primary">
      <a href="/journey" data-nav="journey">Journey</a>
      <a href="/writing" data-nav="writing">Writing</a>
      <a href="''' + COMPANY + '''" rel="noopener">Aura Platform LLC ↗</a>
    </nav>
    <a class="rh-cta" href="/start-a-conversation" data-nav="start-a-conversation">Write to me</a>
    <button class="rh-menu" type="button" aria-expanded="false" aria-controls="rh-panel"><span></span><b class="sr-only">Menu</b></button>
  </div>
  <nav class="rh-panel" id="rh-panel" aria-label="Mobile primary">
    <a href="/">Home</a><a href="/journey">Journey</a><a href="/writing">Writing</a><a href="''' + COMPANY + '''" rel="noopener">Aura Platform LLC ↗</a><a href="/start-a-conversation">Write to me</a>
  </nav>
</header>'''


def page(route, key, title, desc, body):
    head = HEADER.replace(f'data-nav="{key}"', f'data-nav="{key}" aria-current="page"')
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}"><meta name="script-fonts" content="{SCRIPTS}">
<link rel="stylesheet" href="/record.css"><link rel="stylesheet" href="/founder.css">
</head>
<body class="record founder" data-canonical-route="{route}">
<a class="skip-link" href="#main">Skip to content</a>
{head}
<main id="main">
{body}
</main>
<!-- FOUNDER_CLOSING -->
<script src="/record.js" defer></script>
</body>
</html>
'''


def write(rel, html):
    path = os.path.join(SRC, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(html)


# A word in the language each place was lived in, in its own script.
def word(text, lang, d, gloss):
    return f'<span class="word" lang="{lang}" dir="{d}"><b>{text}</b><small lang="en" dir="ltr">{gloss}</small></span>'

URDU = word('پیغام', 'ur', 'rtl', 'Urdu · message')
MALAY = word('Selamat datang', 'ms', 'ltr', 'Malay · welcome')
ARABIC = word('تمام', 'ar', 'rtl', 'Arabic · agreed')
WORLD = (word('Merhaba', 'tr', 'ltr', 'Turkish · hello') + word('你好', 'zh', 'ltr', 'Chinese · hello')
         + word('สวัสดี', 'th', 'ltr', 'Thai · hello'))
ENGLISH = word('On the record', 'en', 'ltr', 'English')

BOOKS = [('the-burden-of-knowing', 'The Burden of Knowing', 'the-burden-of-knowing.png', 'Knowing · applying · responsibility'),
         ('the-edge-of-knowing', 'The Edge of Knowing', 'the-edge-of-knowing.jpg', 'Explanation · meaning · proportion'),
         ('the-origin-of-you', 'The Origin of You', 'the-origin-of-you.png', 'Origin · conscience · belonging')]

def books(cls='books3'):
    return f'<div class="{cls}">' + ''.join(
        f'<a class="bk" href="https://bajwawrites.com/books/{slug}" rel="noopener"><img src="/assets/books/{img}" alt="{t}" loading="lazy"><b>{t}</b><small>{th}</small></a>'
        for slug, t, img, th in BOOKS) + '</div>'

READER = '''<div class="book reader" aria-label="A page from my writing">
      <div class="run"><span>Why I Write</span><span>Edition II</span></div>
      <p class="page" lang="en">I do not write to explain the world. I write because the world keeps asking questions it does not wait to answer. Writing, for me, is a way of staying honest in that space. It is not a search for conclusions, but a refusal to rush past what deserves attention.</p>
      <div class="margin"><span>M S Bajwa</span><span>Every revision kept</span></div>
    </div>'''

# ── Home ─────────────────────────────────────────────────────────────────────
home = f'''<section class="hero"><div class="wrap split">
  <div>
    <div class="ey">Founder · Builder · Operator · Author</div>
    <h1 class="h1">A life spent making the next thing <em class="tl">hold.</em></h1>
    <p class="lede">I have served, worked, travelled and written across many countries and in many languages. Everything I build at Aura Platform carries what those places taught me.</p>
    <div class="btns"><a class="b1 tlbg" href="/journey">Walk the journey</a><a class="b2" href="/start-a-conversation">Write to me</a></div>
  </div>
  <figure class="portrait"><img src="/assets/author.png" alt="M S Bajwa" width="640" height="800"><figcaption><b>M S Bajwa</b>Founder &amp; Managing Member, Aura Platform LLC · Taylor, Michigan</figcaption></figure>
</div></section>

<section class="sec" id="carry"><div class="wrap">
  <div class="ey">What I carry</div>
  <h2 class="h2">Three lessons. <em class="tl">Three products.</em></h2>
  <p class="swipe-hint" aria-hidden="true">Swipe →</p>
  <div class="carry">
    <a class="cc" href="{COMPANY}/aura">
      <div class="mini-stage s-aura" data-needs-scripts><span class="bubble" lang="ur" dir="rtl">پیغام پہنچ گیا</span><span class="bubble me">Delivered · read</span></div>
      <h3>A message has to arrive.</h3>
      <p>In uniform I learned that a message only matters when it reaches the person who needs it, clearly, in words they understand.</p>
      <span class="into"><img src="/assets/record/aura-app-icon.png" alt="" width="20" height="20">That became <b>Aura</b> →</span>
    </a>
    <a class="cc" href="{COMPANY}/orchestrate">
      <div class="mini-stage s-orc"><span class="path"><i class="d">Found</i><i class="d">Approved</i><i class="d">Agreed</i><i class="n">Paid</i></span></div>
      <h3>Work is done when it is paid.</h3>
      <p>Running operations by hand, I saw good work lost because nobody could later show who promised what.</p>
      <span class="into"><img src="/assets/record/orchestrate-app-icon.png" alt="" width="20" height="20">That became <b>Orchestrate</b> →</span>
    </a>
    <a class="cc" href="{COMPANY}/colophon">
      <div class="mini-stage s-col"><span class="ed"><b>Edition II</b> · published<br><span>Edition I · still readable</span></span></div>
      <h3>A page should keep its author.</h3>
      <p>Writing my own books, I wanted every version to stay mine, in any language it was written in.</p>
      <span class="into"><img src="/assets/record/colophon-app-icon.png" alt="" width="20" height="20">That became <b>Colophon</b> →</span>
    </a>
  </div>
</div></section>

<section class="sec"><div class="wrap split">
  <div>
    <div class="ey">Where it comes from</div>
    <h2 class="h2">Many countries. <em class="tl">Many languages.</em></h2>
    <p class="lede">Pakistan, Malaysia, Oman, the United Arab Emirates, Saudi Arabia, Türkiye, Europe, China, Thailand, Singapore and now the United States. Institutions from both sides of the counter, and people living far from home.</p>
    <div class="btns"><a class="b1 tlbg" href="/journey">Walk the journey</a></div>
  </div>
  <div class="stage s-co words" data-name="Words I have lived in" data-needs-scripts>{URDU}{MALAY}{ARABIC}{WORLD}{ENGLISH}</div>
</div></section>

<section class="sec quote-sec" id="own-words"><div class="wrap split">
  <div>
    <div class="ey">In my own words</div>
    <blockquote class="quote">Let the machine do the work, and keep the person who owns it <em class="tl">in charge of it.</em></blockquote>
    <p class="lede">A short film: where I come from, and why I built three products around one answer.</p>
    <p class="quiet"><a href="{COMPANY}/company#letter" rel="noopener">Read my letter on the company site →</a></p>
  </div>
  <figure class="own-film">
    <video controls playsinline preload="none" poster="/assets/video/in-my-own-words-poster.jpg" width="720" height="1280">
      <source src="/assets/video/in-my-own-words.mp4" type="video/mp4">
      <track kind="captions" src="/assets/video/in-my-own-words.en.vtt" srclang="en" label="English" default>
    </video>
    <figcaption>In my own words · 1 min 42 s</figcaption>
  </figure>
</div></section>

<section class="sec"><div class="wrap split">
  <div>
    <div class="ey">Writing</div>
    <h2 class="h2">Writing alongside <em class="tl">the company.</em></h2>
    <p class="lede">Questions that would not settle became three books, published on Colophon.</p>
    <div class="btns"><a class="b1 tlbg" href="/writing">Read the writing</a><a class="b2" href="https://bajwawrites.com" rel="noopener">Colophon ↗</a></div>
  </div>
  {books()}
</div></section>

<section class="sec close-sec"><div class="wrap split">
  <div>
    <div class="ey">Write to me</div>
    <h2 class="h2">Every note reaches me. <em class="tl">I read it myself.</em></h2>
    <div class="btns"><a class="b1 tlbg" href="/start-a-conversation">Start a conversation</a><a class="b2" href="{COMPANY}" rel="noopener">Aura Platform LLC ↗</a></div>
  </div>
</div></section>'''

write('index.html', page('/', 'home', 'M S Bajwa - Founder, builder, operator, author',
      'Founder of Aura Platform LLC. Many countries and many languages, and three products that carry what they taught.', home))

# ── Journey: places and languages, never dates ─────────────────────────────────
def chapter(n, place, kicker, title, text, words, into, tone):
    return f'''<section class="sec chapter" id="{n}"><div class="wrap split">
  <div>
    <div class="ey">{kicker}</div>
    <h2 class="h2">{title}</h2>
    <p class="lede">{text}</p>
    <p class="into-line">Carried into {into}</p>
  </div>
  <div class="stage place s-{tone}" data-name="{place}" data-needs-scripts><div class="pl">{place}</div><div class="pw">{words}</div></div>
</div></section>'''

A = f'<a href="{COMPANY}/aura" rel="noopener">Aura</a>'
O = f'<a href="{COMPANY}/orchestrate" rel="noopener">Orchestrate</a>'
C = f'<a href="{COMPANY}/colophon" rel="noopener">Colophon</a>'

journey = f'''<section class="hero"><div class="wrap">
  <div class="ey">Journey</div>
  <h1 class="h1">First, the message <em class="tl">had to arrive.</em></h1>
  <p class="lede">Not a timeline. The places, the languages and the people that made me, and what each one taught me.</p>
  <nav class="jnav" aria-label="Places">
    <a href="#pakistan">Pakistan</a><a href="#malaysia">Malaysia</a><a href="#gulf">Oman and the Gulf</a><a href="#world">The wider world</a><a href="#page">On the page</a><a href="#michigan">Michigan</a>
  </nav>
</div></section>
{chapter('pakistan', 'Pakistan', 'In uniform', 'A message has to <em class="tl">arrive.</em>',
  'Pakistan Army Signals taught me the first condition: a message only matters when it reaches the person who needs it, clearly and on time.',
  URDU, A, 'co')}
{chapter('malaysia', 'Malaysia', 'Living as a newcomer', 'How a place treats <em class="tl">a stranger.</em>',
  'My first life abroad: a new language, new institutions, and the daily lesson of being a newcomer, of how an office answers someone it does not yet know.',
  MALAY, A, 'co')}
{chapter('gulf', 'Oman · UAE · Saudi Arabia', 'Work done by hand', 'Who agreed <em class="tl">to what?</em>',
  'In Oman I ran commercial operations by hand: tenders, agreements, teams, delivery and payment. There, and in the UAE and Saudi Arabia, a spoken agreement carried real weight, and good work was lost whenever nobody could later show who had agreed to what.',
  ARABIC, O, 'co')}
{chapter('world', 'Türkiye · Europe · China · Thailand · Singapore', 'Among people far from home', 'Heard in your own <em class="tl">language.</em>',
  'Travelling, and living among a diaspora from many countries, I met the same need everywhere: to be heard in your own language, and to be answered by the right person.',
  WORLD, f'{A} and {C}', 'co')}
{chapter('page', 'On the page', 'Writing through it all', 'Questions that <em class="tl">would not settle.</em>',
  'Through all of it I wrote. The questions that stayed with me became three books, each kept in every edition.',
  word('Edition II', 'en', 'ltr', 'every revision kept'), C, 'co')}
{chapter('michigan', 'Taylor, Michigan', 'Building it', 'Three lessons, <em class="tl">built.</em>',
  'Here I am building Aura Platform LLC: three products that carry what those places taught me. Software can now do the work; the person who owns it stays in charge.',
  ENGLISH, f'{A}, {O} and {C}', 'co')}
<section class="sec close-sec"><div class="wrap">
  <div class="ey">Continue</div>
  <h2 class="h2">The journey goes on <em class="tl">in the work.</em></h2>
  <div class="btns"><a class="b1 tlbg" href="{COMPANY}" rel="noopener">Aura Platform LLC ↗</a><a class="b2" href="/writing">Read the writing</a><a class="b2" href="/start-a-conversation">Write to me</a></div>
</div></section>'''

write('journey/index.html', page('/journey', 'journey', 'Journey - M S Bajwa',
      'The places, languages and people that shaped M S Bajwa, and what each one taught him.', journey))

# ── Writing ──────────────────────────────────────────────────────────────────
writing = f'''<section class="hero"><div class="wrap split">
  <div>
    <div class="ey">Writing</div>
    <h1 class="h1">What remains when an answer <em class="tl">isn't enough?</em></h1>
    <p class="lede">I write where an answer leaves something unresolved: knowing, conscience, meaning, responsibility and belonging.</p>
    <div class="btns"><a class="b1 tlbg" href="#books">The three books</a><a class="b2" href="https://bajwawrites.com" rel="noopener">Read on Colophon ↗</a></div>
  </div>
  <div class="stage s-col" data-name="A page">{READER}</div>
</div></section>

<section class="sec" id="books"><div class="wrap">
  <div class="ey">Three books</div>
  <h2 class="h2">Some questions need <em class="tl">more room than a page.</em></h2>
  <div class="books-row">{books('books3 wide')}
    <div class="books-note"><p class="lede">My books are the first on Colophon, the house for authored work I built for them, and now for other authors, in their own languages. Every edition is kept.</p>
    <div class="btns"><a class="b1 tlbg" href="https://bajwawrites.com" rel="noopener">Go to Colophon ↗</a><a class="b2" href="{COMPANY}/colophon" rel="noopener">About Colophon ↗</a></div></div>
  </div>
</div></section>
<section class="sec close-sec"><div class="wrap">
  <div class="ey">Write to me</div>
  <h2 class="h2">About a book, a question, <em class="tl">or your own writing.</em></h2>
  <div class="btns"><a class="b1 tlbg" href="/start-a-conversation?intent=authored#route">Write to me</a><a class="b2" href="/journey">Walk the journey</a></div>
</div></section>'''

write('writing/index.html', page('/writing', 'writing', 'Writing - M S Bajwa',
      'Three books by M S Bajwa, published on Colophon: knowing, conscience, meaning and belonging.', writing))

# ── Start a conversation: the same letter as the company site, addressed to me ──
convo = '''<section class="hero convo2" id="route"><div class="wrap split" data-convo data-mailto="msbajwa@auraplatform.org">
  <div class="c-left">
    <div class="ey">Start a conversation</div>
    <h1 class="h1">You can write <em class="tone">to me here.</em></h1>
    <div class="founder-line"><img src="/assets/author.png" alt="" width="56" height="56"><p><b>I read every note myself</b> and reply personally.</p></div>
    <p class="origin" data-origin hidden></p>
    <div class="c-tabs" role="tablist" aria-label="Why are you writing?">
      <button type="button" role="tab" data-intent="product" aria-selected="false">Something I'm building</button>
      <button type="button" role="tab" data-intent="authored" aria-selected="false">My writing</button>
      <button type="button" role="tab" data-intent="partnership" aria-selected="false">Partner</button>
      <button type="button" role="tab" data-intent="capital" aria-selected="false">Invest</button>
      <button type="button" role="tab" data-intent="principal" aria-selected="false">Join</button>
      <button type="button" role="tab" data-intent="unsure" aria-selected="false">Something else</button>
    </div>
    <div class="c-direct" data-direct hidden></div>
  </div>
  <div class="stage s-letter" data-name="Your note">
    <form class="letter-card" data-letter novalidate>
      <div class="lh"><span><b>A personal note</b><small>Read by me, answered by me</small></span><span data-date></span></div>
      <div class="lto"><small>To</small> M S Bajwa · Taylor, Michigan</div>
      <div class="lsubj"><small>About</small> <span data-subject>A conversation</span></div>
      <div class="lbody" data-body></div>
      <button type="button" class="lmore" data-more aria-expanded="false" aria-controls="c-detail">Bringing something specific? <u>Add the details.</u></button>
      <div class="ldetail" id="c-detail" data-detail hidden>
        <label><small>What I'm bringing</small><textarea name="bringing" rows="1" placeholder="The proposal, product, channel or role, in a line or two"></textarea></label>
        <label><small>Why now</small><textarea name="pitch" rows="2" placeholder="What makes this the right moment"></textarea></label>
        <label><small>A good first outcome would be</small><textarea name="outcome" rows="1" placeholder="The first thing that would show it is working"></textarea></label>
      </div>
      <div class="lsign">
        <span>With regards,</span>
        <input name="name" id="c-name" autocomplete="name" required placeholder="Your name" aria-label="Your name">
      </div>
      <div class="lact"><button class="b1 tonebg" type="submit">Open in my email ↗</button><a class="b2" href="https://auraplatform.org/i/aura-platform-llc/meet/founder-conversation" target="_blank" rel="noopener">Or choose a time to talk ↗</a></div>
      <div class="attr" data-status><i></i><span>Sent from your own email. The note stays yours.</span></div>
    </form>
  </div>
</div></section>'''

write('start-a-conversation/index.html', page('/start-a-conversation', 'start-a-conversation', 'Start a conversation - M S Bajwa',
      'Write to M S Bajwa directly. He reads every note himself and replies personally.', convo))
print('pages written')
