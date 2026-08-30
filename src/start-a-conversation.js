const params = new URLSearchParams(location.search);
const allowedFrom = new Set(['home','journey','writing','aura','orchestrate','bajwa-writes','company','founder']);
const from = allowedFrom.has(params.get('from')) ? params.get('from') : '';
const email = document.querySelector('#email-link');
const proposal = document.querySelector('#proposal-continuation');
const proposalOpen = document.querySelector('[data-proposal-open]');
const subjects = {home:'Starting a conversation',journey:'A conversation about the journey',writing:'A conversation about writing',aura:'A conversation about Aura',orchestrate:'A conversation about Orchestrate','bajwa-writes':'A conversation about Bajwa Writes',company:'A conversation about Aura Platform',founder:'Starting a conversation'};
if (from && email) email.href = `mailto:msbajwa@auraplatform.org?subject=${encodeURIComponent(subjects[from])}`;
proposalOpen?.addEventListener('click', () => {
  const open = proposal.hidden;
  proposal.hidden = !open;
  proposalOpen.setAttribute('aria-expanded', String(open));
  if (open) proposal.scrollIntoView({behavior: document.documentElement.dataset.motion === 'reduced' ? 'auto' : 'smooth', block:'start'});
});
document.querySelector('#proposal-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = ['Name: ' + data.get('name'), 'Email: ' + data.get('email'), '', 'Context for Muhammad:', String(data.get('context'))].join(String.fromCharCode(10));
  document.querySelector('#form-status').textContent = 'Opening your email client with the prepared context. Nothing has been submitted to this website.';
  location.href = `mailto:msbajwa@auraplatform.org?subject=${encodeURIComponent('Conversation context')}&body=${encodeURIComponent(body)}`;
});
