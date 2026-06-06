/**
 * Engagement inquiry — submission abstraction.
 *
 * Doctrine: no scheduler, no booking widget, no CRM funnel. A single
 * structured inquiry, routed by engagement type, answered personally.
 *
 * Backend is intentionally NOT hardwired. The handler talks to one seam —
 * `INQUIRY_ENDPOINT`. While that seam is null, inquiries degrade to a
 * structured `mailto:` compose so the form is fully functional with no
 * backend deployed. When a backend exists, set INQUIRY_ENDPOINT to its URL;
 * it will receive the same typed payload (JSON POST) the mailto encodes, and
 * nothing else on the page needs to change.
 */
(function () {
  'use strict';

  /* ----------------------------------------------------------------
     Configuration seam. Set INQUIRY_ENDPOINT when a backend exists,
     e.g. 'https://api.auraplatform.org/engagements/inquiries'. The
     endpoint must accept a JSON POST of the InquiryPayload shape below
     and respond 2xx on accept.
     ---------------------------------------------------------------- */
  const INQUIRY_ENDPOINT = null;

  /* Routing table — every engagement type maps to a stable queue and a
     human label. The queue tag travels on the payload (and the mailto
     subject) so inbound inquiries are sorted by type before any backend
     exists. Adding an engagement type is a one-line change here. */
  const ROUTES = {
    'strategic-advisory':  { label: 'Strategic advisory',  queue: 'advisory' },
    'architecture-review': { label: 'Architecture review', queue: 'architecture' },
    'custom':              { label: 'Custom engagement',   queue: 'custom' },
  };

  const form = document.getElementById('engagement-inquiry');
  if (!form) return;

  const statusEl = document.getElementById('inquiry-status');
  const recipient = form.getAttribute('data-recipient') || 'msbajwa@auraplatform.org';

  function setStatus(message, state) {
    if (!statusEl) return;
    statusEl.textContent = message;
    if (state) {
      statusEl.setAttribute('data-state', state);
    } else {
      statusEl.removeAttribute('data-state');
    }
  }

  /* Build the typed payload from the form. This is the single source of
     truth for what an inquiry IS — both transports (endpoint + mailto)
     serialize from it. `submittedAt` is stamped at submit time. */
  function buildPayload() {
    const get = function (name) {
      const el = form.elements[name];
      return el && el.value ? el.value.trim() : '';
    };
    const engagementType = get('engagementType');
    const route = ROUTES[engagementType] || { label: engagementType, queue: 'unrouted' };

    return {
      name: get('name'),
      organization: get('organization'),
      engagementType: engagementType,       // machine value
      engagementLabel: route.label,         // human label
      queue: route.queue,                   // routing target
      timeline: get('timeline'),
      website: get('website'),              // optional
      description: get('description'),
      submittedAt: new Date().toISOString(),
      source: 'bajwa.auraplatform.org/engagements',
    };
  }

  /* Transport A — POST to the backend when the seam is configured. */
  function sendToEndpoint(payload) {
    return fetch(INQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) throw new Error('Inquiry endpoint responded ' + res.status);
      return true;
    });
  }

  /* Transport B — structured mailto compose. No backend required. The
     subject carries the routing label so the inbox sorts by engagement
     type; the body is a clean, readable transcript of the payload. */
  function composeMailto(payload) {
    const subject = 'Engagement inquiry · ' + payload.engagementLabel;
    const lines = [
      'Name: ' + payload.name,
      'Organization: ' + payload.organization,
      'Engagement type: ' + payload.engagementLabel,
      'Timeline: ' + payload.timeline,
      'Website: ' + (payload.website || '—'),
      '',
      'Description:',
      payload.description,
      '',
      '— sent from ' + payload.source,
    ];
    return 'mailto:' + recipient +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Native validation first — required fields, url format.
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('Please complete the required fields.', 'error');
      return;
    }

    const payload = buildPayload();

    if (INQUIRY_ENDPOINT) {
      setStatus('Sending your inquiry…', null);
      sendToEndpoint(payload)
        .then(function () {
          form.reset();
          setStatus('Your inquiry has been received. You will receive a considered reply.', 'success');
        })
        .catch(function () {
          // Fall back to mailto so the inquiry is never lost on a backend error.
          window.location.href = composeMailto(payload);
          setStatus('Opening your mail client to complete the inquiry…', null);
        });
      return;
    }

    // No backend configured — structured mailto compose.
    window.location.href = composeMailto(payload);
    setStatus('Opening your mail client with a structured inquiry…', null);
  });
})();
