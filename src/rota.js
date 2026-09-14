import { CHECKOUT_URL } from './config.js';
import { trackEvent } from './tracking.js';

const CAMPAIGN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src'];

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
      link.href = '#oferta';
      link.classList.add('checkout-disabled');
      link.setAttribute('aria-disabled', 'true');
      link.textContent = link.dataset.location === 'mobile'
        ? 'Checkout em breve'
        : 'Checkout disponível em breve';
    }

    link.addEventListener('click', (event) => {
      if (!checkoutUrl) {
        event.preventDefault();
        document.querySelector('#oferta')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  document.querySelectorAll('.faq-list details').forEach((item, index) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      trackEvent('faq_open', {
        index: index + 1,
        question: item.querySelector('summary')?.textContent?.trim() || ''
      });
    });
  });

  const offerCard = document.querySelector('[data-offer-card]');
  if (!offerCard || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    trackEvent('view_offer');
    observer.disconnect();
  }, { threshold: 0.35 });

  observer.observe(offerCard);
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

configureCheckout();
configureTracking();
