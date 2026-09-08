import { trackEvent } from './tracking.js';

function configureUpsellTracking() {
  trackEvent('view_upsell', { location: 'pagina-upsell' });

  const acceptButton = document.querySelector('[id^="kiwify-upsell-trigger-"]');
  const declineButton = document.querySelector('[id^="kiwify-upsell-cancel-trigger-"]');

  acceptButton?.addEventListener(
    'click',
    () => trackEvent('click_upsell_accept', { location: 'oferta-linkedin' }),
    { once: true }
  );

  declineButton?.addEventListener(
    'click',
    () => trackEvent('click_upsell_decline', { location: 'oferta-linkedin' }),
    { once: true }
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', configureUpsellTracking, { once: true });
} else {
  configureUpsellTracking();
}
