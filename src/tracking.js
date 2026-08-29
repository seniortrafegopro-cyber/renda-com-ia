const EVENTS = ['view_landing', 'click_cta', 'click_checkout', 'view_offer', 'faq_open'];
const META_PIXEL_ID = '2173643729873505';

function initMetaPixel() {
  if (window.fbq) return;

  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;
    n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

initMetaPixel();

export function trackEvent(name, payload = {}) {
  if (!EVENTS.includes(name)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload, timestamp: new Date().toISOString() });

  if (!window.fbq) return;

  if (name === 'view_landing') {
    window.fbq('track', 'ViewContent', {
      content_name: 'IA PRA RENDA',
      content_category: 'Infoproduto',
      value: 37,
      currency: 'BRL'
    });
  }

  if (name === 'click_checkout') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'IA PRA RENDA',
      value: 37,
      currency: 'BRL'
    });
  }

  if (name === 'click_cta') {
    window.fbq('trackCustom', 'ClickCTA', payload);
  }

  if (name === 'view_offer') {
    window.fbq('trackCustom', 'ViewOffer', { value: 37, currency: 'BRL' });
  }

  if (name === 'faq_open') {
    window.fbq('trackCustom', 'FAQOpen', payload);
  }
}
