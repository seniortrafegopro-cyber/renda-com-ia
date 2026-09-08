const EVENTS = [
  'view_landing',
  'click_cta',
  'click_checkout',
  'view_offer',
  'faq_open',
  'view_upsell',
  'click_upsell_accept',
  'click_upsell_decline'
];
const META_PIXEL_ID = '1083842784036393';
const PRODUCT_NAME = 'Rota da Entrevista';
const PRODUCT_VALUE = 19.9;
const UPSELL_NAME = 'LinkedIn Estratégico';
const UPSELL_VALUE = 29.9;

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
      content_ids: ['rota-da-entrevista'],
      content_name: PRODUCT_NAME,
      content_category: 'Desenvolvimento profissional e carreira',
      content_type: 'product',
      value: PRODUCT_VALUE,
      currency: 'BRL'
    });
  }

  if (name === 'click_checkout') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: ['rota-da-entrevista'],
      content_name: PRODUCT_NAME,
      content_type: 'product',
      num_items: 1,
      value: PRODUCT_VALUE,
      currency: 'BRL',
      ...payload
    });
  }

  if (name === 'click_cta') {
    window.fbq('trackCustom', 'ClickCTA', payload);
  }

  if (name === 'view_offer') {
    window.fbq('trackCustom', 'ViewOffer', {
      value: PRODUCT_VALUE,
      currency: 'BRL',
      content_name: PRODUCT_NAME
    });
  }

  if (name === 'faq_open') {
    window.fbq('trackCustom', 'FAQOpen', payload);
  }

  if (name === 'view_upsell') {
    window.fbq('track', 'ViewContent', {
      content_ids: ['linkedin-estrategico'],
      content_name: UPSELL_NAME,
      content_category: 'Desenvolvimento profissional e carreira',
      content_type: 'product',
      value: UPSELL_VALUE,
      currency: 'BRL'
    });
  }

  if (name === 'click_upsell_accept') {
    window.fbq('trackCustom', 'UpsellAcceptClick', {
      content_ids: ['linkedin-estrategico'],
      content_name: UPSELL_NAME,
      value: UPSELL_VALUE,
      currency: 'BRL',
      ...payload
    });
  }

  if (name === 'click_upsell_decline') {
    window.fbq('trackCustom', 'UpsellDecline', {
      content_ids: ['linkedin-estrategico'],
      content_name: UPSELL_NAME,
      ...payload
    });
  }
}
