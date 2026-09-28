(() => {
  'use strict';
  const whatsappNumber = '5564992461349';
  const questions = [
    {
      title: 'Sua empresa já possui uma ficha no Google ou no Google Maps?',
      description: 'Considere a ficha que mostra nome, telefone, horários e localização. Escolha a situação que você já conferiu.',
      options: [
        { value: 'none', label: 'Não. Já conferi e minha empresa não possui ficha.', eligible: true },
        { value: 'existing', label: 'Sim, já possui.' },
        { value: 'unknown', label: 'Não sei ou ainda não conferi.' }
      ]
    },
    {
      title: 'Como sua empresa atende os clientes atualmente?',
      description: 'O serviço é destinado a negócios locais que já estão em funcionamento.',
      options: [
        { value: 'storefront', label: 'Recebemos clientes em um estabelecimento físico.', eligible: true },
        { value: 'service_area', label: 'Atendemos presencialmente no endereço do cliente, na nossa cidade ou região.', eligible: true },
        { value: 'online', label: 'Atendemos somente pela internet.' },
        { value: 'not_open', label: 'O negócio ainda não está funcionando.' }
      ]
    },
    {
      title: 'Você pode aprovar a contratação por R$ 797 e pretende contratar nos próximos 7 dias?',
      description: 'Pagamento único, 100% antecipado após confirmação do escopo.',
      options: [
        { value: 'ready', label: 'Sim, posso aprovar o investimento e quero contratar nesse prazo.', eligible: true },
        { value: 'approval', label: 'Preciso da aprovação de outra pessoa.' },
        { value: 'research', label: 'Estou pesquisando ou não pretendo contratar agora.' }
      ]
    }
  ];
  const rejection = {
    existing: ['Esta oferta é para quem ainda não tem ficha.', 'Como sua empresa já possui uma ficha, este serviço de criação não corresponde à sua situação. Atualizações, recuperações, suspensões e duplicidades ficam fora desta oferta.'],
    unknown: ['Primeiro, confira se a ficha já existe.', 'Pesquise o nome e o endereço da empresa no Google e no Google Maps. Se ainda tiver dúvida, não avance na contratação. Volte quando tiver confirmado que sua empresa não possui ficha.'],
    online: ['Esta oferta atende negócios locais presenciais.', 'O serviço é voltado a empresas que recebem clientes em um estabelecimento ou atendem pessoalmente no endereço deles. Negócios com atendimento somente pela internet ficam fora desta oferta.'],
    not_open: ['Vamos conversar quando o negócio estiver funcionando.', 'Esta oferta é para empresas locais que já atendem clientes presencialmente. Quando sua empresa estiver em operação, você poderá retornar e conferir se o serviço atende sua necessidade.'],
    approval: ['Alinhe a decisão com quem aprova a contratação.', 'Confirme com a pessoa responsável o investimento de R$ 797, o pagamento antecipado e a intenção de contratar nos próximos 7 dias. Depois desse alinhamento, a pessoa autorizada poderá retornar.'],
    research: ['Retorne quando estiver pronto para contratar.', 'Este atendimento é destinado a quem pode aprovar o investimento de R$ 797 e pretende contratar nos próximos 7 dias. A página permanece disponível para você consultar o serviço.']
  };
  const $ = id => document.getElementById(id);
  const dialog = $('qualification');
  const form = $('qualification-form');
  const title = $('quiz-title');
  const description = $('quiz-description');
  const choices = $('choices');
  const next = $('next');
  const previous = $('previous');
  const outcome = $('outcome');
  const whatsapp = $('whatsapp-link');
  const summary = $('answer-summary');
  const returnButton = $('return-to-page');
  const editButton = $('edit-answers');
  let step = 0;
  let answers = [];
  let selected = null;
  let opener = null;

  function isQualified() {
    return answers.length === questions.length && questions.every((question, index) =>
      question.options.some(option => option.value === answers[index] && option.eligible === true)
    );
  }

  function clearContact() {
    whatsapp.hidden = true;
    whatsapp.removeAttribute('href');
    summary.replaceChildren();
  }

  function focusTitle() {
    dialog.scrollTop = 0;
    title.focus({ preventScroll: true });
  }

  function renderQuestion() {
    clearContact();
    const question = questions[step];
    selected = answers[step] || null;
    form.hidden = false;
    outcome.hidden = true;
    $('progress-header').hidden = false;
    $('progress-track').hidden = false;
    $('privacy-note').hidden = false;
    $('step-label').textContent = `PERGUNTA ${step + 1} DE 3`;
    $('progress-track').setAttribute('aria-valuenow', String(step + 1));
    $('progress-fill').style.width = `${((step + 1) / 3) * 100}%`;
    title.textContent = question.title;
    description.textContent = question.description;
    description.classList.toggle('price-reminder', step === 2);
    choices.replaceChildren();
    const legend = document.createElement('legend');
    legend.className = 'sr-only';
    legend.textContent = question.title;
    choices.append(legend);
    question.options.forEach(option => {
      const label = document.createElement('label');
      label.className = 'choice';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = option.value;
      input.checked = selected === option.value;
      input.required = true;
      const text = document.createElement('span');
      text.textContent = option.label;
      label.append(input, text);
      choices.append(label);
      input.addEventListener('change', () => {
        selected = option.value;
        next.disabled = false;
      });
    });
    previous.hidden = step === 0;
    next.disabled = !selected;
    next.firstChild.textContent = step === 2 ? 'Concluir ' : 'Continuar ';
    focusTitle();
  }

  function showOutcome(passed, reason) {
    clearContact();
    form.hidden = true;
    outcome.hidden = false;
    $('progress-header').hidden = true;
    $('progress-track').hidden = true;
    description.classList.remove('price-reminder');
    summary.hidden = !passed;
    editButton.hidden = !passed;
    returnButton.hidden = passed;
    $('privacy-note').hidden = !passed;
    if (!passed || !isQualified()) {
      const copy = rejection[reason] || ['Não foi possível concluir.', 'Volte à página e confira suas respostas.'];
      title.textContent = copy[0];
      description.textContent = copy[1];
      $('result-note').textContent = 'Nenhuma mensagem foi enviada.';
      focusTitle();
      return;
    }
    const serviceMode = answers[1] === 'storefront'
      ? 'Atendimento presencial em estabelecimento físico.'
      : 'Atendimento presencial no endereço do cliente, na nossa cidade ou região.';
    const summaryItems = ['Conferi que a empresa ainda não possui ficha.', serviceMode, 'Posso aprovar R$ 797 e pretendo contratar em até 7 dias.'];
    summaryItems.forEach(text => {
      const item = document.createElement('li');
      item.textContent = text;
      summary.append(item);
    });
    title.textContent = 'Vamos conversar sobre a criação da sua ficha.';
    description.textContent = 'Suas respostas correspondem ao público desta oferta. O próximo passo é conferir os dados da empresa com você.';
    $('result-note').textContent = 'O pagamento de R$ 797 é integral e antecipado, após confirmação do escopo. No WhatsApp, confira o texto e toque em enviar.';
    const message = [
      'Olá! Quero conversar sobre a criação da ficha da minha empresa no Google por R$ 797.', '',
      'Respondi à qualificação no site:',
      '• Já conferi e minha empresa ainda não possui ficha no Google ou no Google Maps.',
      `• O negócio está em funcionamento. ${serviceMode}`,
      '• Posso aprovar o investimento e pretendo contratar nos próximos 7 dias.',
      '• Estou ciente do pagamento único e 100% antecipado, após confirmação do escopo.', '',
      'Nome da empresa:', 'Cidade/estado:'
    ].join('\n');
    whatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    whatsapp.hidden = false;
    focusTitle();
  }

  document.querySelectorAll('[data-start]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      step = 0;
      answers = [];
      selected = null;
      dialog.showModal();
      document.body.classList.add('quiz-open');
      renderQuestion();
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const option = questions[step].options.find(item => item.value === selected);
    if (!option) return;
    answers = answers.slice(0, step);
    answers[step] = option.value;
    if (!option.eligible) {
      showOutcome(false, option.value);
    } else if (step === questions.length - 1) {
      showOutcome(true);
    } else {
      step += 1;
      renderQuestion();
    }
  });
  previous.addEventListener('click', () => { if (step > 0) { step -= 1; renderQuestion(); } });
  editButton.addEventListener('click', () => { step = 0; renderQuestion(); });
  $('close-quiz').addEventListener('click', () => dialog.close());
  returnButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('quiz-open');
    clearContact();
    opener?.focus({ preventScroll: true });
  });
  whatsapp.addEventListener('click', event => { if (!isQualified()) { event.preventDefault(); clearContact(); } });
})();
