const EVENTS = ['view_landing', 'click_cta', 'click_checkout', 'view_offer', 'faq_open'];
export function trackEvent(name, payload = {}) {
  if (!EVENTS.includes(name)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload, timestamp: new Date().toISOString() });
}
