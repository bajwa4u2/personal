document.documentElement.dataset.motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';

(() => {
  const contracts = [
    ['.menu-toggle', '#founder-nav'],
    ['.aura-menu', '#aura-mobile-menu'],
    ['.orchestrate-menu', '#orchestrate-mobile-menu'],
    ['.bw-menu', '#bw-mobile-nav'],
    ['.company-menu', '#company-menu-panel'],
    ['.conversation-menu', '#conversation-mobile-menu']
  ];
  const active = contracts.map(([buttonSelector, panelSelector]) => {
    const button = document.querySelector(buttonSelector);
    const panel = document.querySelector(panelSelector);
    if (!button || !panel) return null;
    let returnFocus = button;
    const focusables = () => [...panel.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
    const setOpen = (open, restore = true) => {
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) {
        returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : button;
        const first = focusables()[0];
        window.setTimeout(() => (first || panel).focus?.(), 0);
      } else if (restore) window.setTimeout(() => returnFocus?.focus?.(), 0);
    };
    button.addEventListener('click', toggle);
    function toggle() { setOpen(button.getAttribute('aria-expanded') !== 'true'); }
    panel.addEventListener('click', event => {
      if (event.target.closest('a[href]')) setOpen(false, false);
      if (event.target === panel || event.target.closest('[data-menu-close]')) setOpen(false);
    });
    return {button, panel, setOpen, focusables};
  }).filter(Boolean);
  document.addEventListener('keydown', event => {
    const current = active.find(item => item.button.getAttribute('aria-expanded') === 'true');
    if (!current) return;
    if (event.key === 'Escape') { event.preventDefault(); current.setOpen(false); return; }
    if (event.key !== 'Tab') return;
    const items = current.focusables(); if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) active.forEach(item => item.setOpen(false, false)); });
  window.addEventListener('pageshow', () => active.forEach(item => item.setOpen(false, false)));
})();
