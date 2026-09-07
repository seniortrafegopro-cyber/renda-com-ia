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

function configureDiagnostic() {
  const questions = [...document.querySelectorAll('.diagnostic-question')];
  const result = document.querySelector('#diagnostic-result');
  const resultTitle = document.querySelector('#diagnostic-title');
  const resultDescription = document.querySelector('#diagnostic-description');
  const progressBar = document.querySelector('#diagnostic-progress-bar');
  const progressText = document.querySelector('#diagnostic-progress-text');
  const restartButton = document.querySelector('#diagnostic-restart');

  if (!questions.length || !result || !resultTitle || !resultDescription || !progressBar || !progressText) return;

  const recommendations = {
    curriculo: {
      title: 'Comece pelo currículo base',
      description: 'Seu maior ganho tende a vir de uma estrutura mais clara e de adaptações honestas para cada oportunidade. O guia e os 6 modelos ajudam você a montar essa base.'
    },
    processo: {
      title: 'Comece pelo Método VAGA e pelo checklist',
      description: 'Você precisa de um processo para interpretar a oportunidade, priorizar informações e revisar cada envio. Esses dois materiais organizam exatamente essa etapa.'
    },
    entrevista: {
      title: 'Comece pela preparação para entrevista',
      description: 'Sua prioridade é transformar experiências reais em respostas claras. As 30 perguntas, a estrutura CAR e os prompts de simulação ajudam você a praticar.'
    }
  };

  let scores = { curriculo: 0, processo: 0, entrevista: 0 };

  function updateProgress(questionIndex, completed = false) {
    const percentage = completed ? 100 : ((questionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', String(percentage));
    progressText.textContent = completed
      ? 'Diagnóstico concluído'
      : `Pergunta ${questionIndex + 1} de ${questions.length}`;
  }

  function showQuestion(questionIndex) {
    questions.forEach((question, index) => { question.hidden = index !== questionIndex; });
    result.hidden = true;
    updateProgress(questionIndex);
    window.requestAnimationFrame(() => questions[questionIndex].querySelector('h3')?.focus());
  }

  function showResult() {
    questions.forEach((question) => { question.hidden = true; });
    const bestMatch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    resultTitle.textContent = recommendations[bestMatch].title;
    resultDescription.textContent = recommendations[bestMatch].description;
    result.hidden = false;
    updateProgress(questions.length - 1, true);
    window.requestAnimationFrame(() => result.focus());
  }

  questions.forEach((question, questionIndex) => {
    question.querySelectorAll('[data-answer]').forEach((answer) => {
      answer.addEventListener('click', () => {
        const category = answer.dataset.answer;
        scores[category] += Number(answer.dataset.score || 0);

        const nextQuestion = questionIndex + 1;
        if (nextQuestion < questions.length) showQuestion(nextQuestion);
        else showResult();
      });
    });
  });

  restartButton?.addEventListener('click', () => {
    scores = { curriculo: 0, processo: 0, entrevista: 0 };
    showQuestion(0);
  });

  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progressBar.setAttribute('aria-valuenow', '25');
  result.setAttribute('tabindex', '-1');
  questions.forEach((question) => question.querySelector('h3')?.setAttribute('tabindex', '-1'));
}

function configureTracking() {
  trackEvent('view_landing', {
    path: window.location.pathname,
    referrer: document.referrer || 'direct'
  });

  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent('click_cta', { location: link.dataset.cta || 'pagina' });
    });
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
  }, { threshold: 0.45 });

  observer.observe(offerCard);
}

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
configureDiagnostic();
configureCheckout();
configureTracking();
