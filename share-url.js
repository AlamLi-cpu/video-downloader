(function () {
  'use strict';
  function extractShareUrl(text) {
    const value = String(text || '').trim();
    const candidates = value.match(/https?:\/\/[^\s<>"'，。；、！？“”（）【】]+/gi) || [];
    for (let candidate of candidates) {
      // Share apps often append closing punctuation to the URL.
      candidate = candidate.replace(/[.,;!?)\]}]+$/, '');
      try {
        const url = new URL(candidate);
        if (url.hostname && ['http:', 'https:'].includes(url.protocol)) return candidate;
      } catch (_) { /* Try the next URL in the shared text. */ }
    }
    return value;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { extractShareUrl };
  if (typeof document === 'undefined') return;
  const selector = '.add-url-box input[type="text"][autocomplete="off"]';
  function normalize(input) {
    if (!(input instanceof HTMLInputElement) || !input.matches(selector)) return false;
    const next = extractShareUrl(input.value);
    if (next === input.value) return false;
    input.value = next;
    return true;
  }
  // Capture runs before Angular's input listener, so its model receives the clean URL.
  document.addEventListener('input', event => normalize(event.target), true);
  document.addEventListener('change', event => {
    if (normalize(event.target)) event.target.dispatchEvent(new Event('input', { bubbles: true }));
  }, true);
  document.addEventListener('click', event => {
    if (!event.target.closest('.add-url-box button')) return;
    for (const input of document.querySelectorAll(selector)) {
      if (input.getClientRects().length && normalize(input)) input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, true);
})();
