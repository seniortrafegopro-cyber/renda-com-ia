import { CHECKOUT_URL } from './config.js';
import { trackEvent } from './tracking.js';

const CAMPAIGN_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'fbclid',
  'gclid',
  'ttclid',
  'src',
  'sck'
];

function buildCheckoutUrl() {
  const rawUrl = CHECKOUT_URL.trim();
  if (!rawUrl) return '';

  try {
    const checkout = new URL(rawUrl);
    const currentPage = new URL(window.location.href);

    CAMPAIGN_PARAMS.forEach((param) => {
      const value = currentPage.searchParams.get(param);
      if (value) checkout.searchParams.set(param, value);
    });

    return checkout.toString();
  } catch {
    return '';
  }
}

function configureCheckout() {
  const checkoutUrl = buildCheckoutUrl();
  const checkoutLinks = document.querySelectorAll('[data-checkout]');
  const statusElements = document.querySelectorAll('[data-checkout-status]');

  checkoutLinks.forEach((link) => {
    if (checkoutUrl) {
      link.href = checkoutUrl;
    } else {
      link.href = '#conteudo';
      link.classList.add('checkout-disabled');
      link.setAttribute('aria-disabled', 'true');
      link.textContent = link.dataset.location === 'mobile'
        ? 'Checkout em breve'
        : 'Checkout disponível em breve';
    }

    link.addEventListener('click', (event) => {
      if (!checkoutUrl) {
        event.preventDefault();
        return;
      }

      trackEvent('click_checkout', { location: link.dataset.location || 'pagina' });
    });
  });

  if (!checkoutUrl) {
    statusElements.forEach((status) => {
      status.textContent = 'Estamos finalizando o novo checkout da Kiwify.';
    });
  }
}

function configureTracking() {
  trackEvent('view_landing', {
    path: window.location.pathname,
    referrer: document.referrer || 'direct'
  });
}

configureCheckout();
configureTracking();
