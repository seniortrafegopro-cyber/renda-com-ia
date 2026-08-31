import { CHECKOUT_URL } from './config.js';
import { trackEvent } from './tracking.js';

const PRODUCT_NAME = 'IA para Negócios e Renda Extra';

const services = [
  ['Conteúdo estratégico para redes sociais','Crie posts, legendas, calendários e variações criativas com revisão humana e consistência de marca.'],
  ['Roteiros para vídeos curtos','Estruture Reels, TikTok e Shorts com gancho, desenvolvimento, CTA e adaptação para diferentes públicos.'],
  ['Anúncios simples com IA','Use IA para pesquisar ângulos, organizar ideias, criar headlines e apoiar a produção de copies para campanhas.'],
  ['Atendimento e WhatsApp','Estruture FAQ, triagem, mensagens de boas-vindas, respostas padronizadas e fluxos de atendimento.'],
  ['E-mails e relacionamento','Crie sequências de nutrição, recuperação de orçamento, pós-venda e follow-up comercial.'],
  ['Páginas e textos de oferta','Desenvolva proposta de valor, headlines, benefícios, tratamento de objeções, FAQ e CTAs para pequenos negócios.'],
  ['Organização e processos comerciais','Monte briefings, checklists, SOPs, calendários, pesquisas, resumos e rotinas para ganhar produtividade.']
];

const modules = [
  ['Fundamentos de IA aplicados ao trabalho','Entenda IA generativa e LLMs, contexto, limites, alucinações, privacidade, verificação e uso responsável.'],
  ['IA para negócios e oportunidades de renda extra','Identifique tarefas, problemas e serviços que podem ser melhorados com IA e aprenda a transformar ferramenta em solução clara.'],
  ['Prompting profissional e Método C.L.A.R.O.','Construa comandos melhores usando Contexto, Limites, Ação, Referências e Output. Inclui laboratórios e revisão.'],
  ['Produção, qualidade e entrega','Crie um fluxo profissional do briefing ao arquivo final, com SOP, critérios de qualidade e revisão em três etapas.'],
  ['Oferta, preço, portfólio e proposta','Empacote entregáveis, defina limites, crie amostras honestas, precifique e apresente uma proposta profissional.'],
  ['Prospecção, diagnóstico e fechamento','Pesquise leads, personalize abordagens, conduza diagnósticos, trate objeções e faça follow-up sem parecer spam.'],
  ['Execução: sprint de 7 dias e evolução','Saia da teoria com um plano diário, indicadores, projeto final e um plano de continuidade para os próximos 30 dias.']
];

const deliverables = [
  ['100 prompts profissionais','Biblioteca organizada por diagnóstico, conteúdo, copy, vendas, atendimento, e-commerce, pesquisa, apresentações e produtividade.'],
  ['30 mensagens de prospecção','Modelos para WhatsApp, Instagram, e-mail, LinkedIn, follow-up, objeções, fechamento e indicação.'],
  ['Modelo de proposta comercial','Estrutura editável com contexto, solução, entregáveis, processo, prazo, investimento e limites de escopo.'],
  ['Tabela inicial de preços','Faixas de referência para começar a orçar com mais clareza, sem tratar preço como regra fixa.'],
  ['Checklists de produção e cliente','Briefing, revisão, entrega, qualidade, pós-projeto e primeiro cliente em um fluxo organizado.'],
  ['Plano de execução de 7 dias','Roteiro prático para escolher uma aplicação, criar amostras, montar uma lista, prospectar, propor e revisar resultados.'],
  ['Materiais avançados','Método C.L.A.R.O., glossário de IA, SOP de entrega, auditoria de qualidade, projeto final e plano de 30 dias.']
];

const faq = [
  ['Isso é um e-book?','Não. O IA para Negócios e Renda Extra foi estruturado como um treinamento aplicado, com módulos, laboratórios, exercícios, prompts, modelos, checklists e projeto final. O material didático funciona como guia de estudo e execução.'],
  ['Preciso entender de programação?','Não. O foco é o uso prático da inteligência artificial em negócios, serviços, comunicação, produtividade, prospecção e entrega.'],
  ['O treinamento serve para quem já tem um negócio?','Sim. Você pode aplicar IA para organizar processos, produzir materiais, melhorar comunicação, atendimento, vendas e produtividade no próprio negócio.'],
  ['E para quem busca renda extra?','Também. O treinamento mostra como transformar habilidades apoiadas por IA em serviços digitais que podem ser oferecidos a empresas e profissionais. Não existe renda garantida: o resultado depende de execução, mercado, prospecção e qualidade.'],
  ['Vou aprender apenas a escrever prompts?','Não. Prompting é apenas uma parte. O treinamento cobre fundamentos de IA, verificação, processos, oferta, serviço, produção, qualidade, preço, proposta, prospecção, fechamento e execução.'],
  ['Serve para iniciantes?','Sim. O conteúdo começa pelos fundamentos e avança até uma aplicação prática. O mais importante é estudar, executar os exercícios e revisar a qualidade das entregas.'],
  ['Como recebo o acesso?','A compra é processada pela Kiwify. Após a confirmação do pagamento, as instruções de acesso são enviadas ao e-mail usado na compra.'],
  ['Qual é a garantia?','Você tem 7 dias de garantia, conforme as condições exibidas no checkout da Kiwify.']
];

const icon = '✦';
const check = '<span class="check">✓</span>';

function card(title, text = '', extra = '') {
  return `<article class="card ${extra}"><div class="icon">${icon}</div><h3>${title}</h3>${text ? `<p class="muted">${text}</p>` : ''}</article>`;
}

function nav() {
  return `<nav class="nav">
    <a class="brand" href="/"><span class="logo">IA</span><span><strong>IA para Negócios</strong><small>e Renda Extra</small></span></a>
    <div class="navlinks"><a href="#aplicacoes">Aplicações</a><a href="#modulos">Módulos</a><a href="#conteudo">Conteúdo</a><a href="#faq">FAQ</a></div>
    <button class="btn buy navBuy" data-source="nav">Quero começar</button>
  </nav>`;
}

function section(title, kicker, body, id = '', subtitle = '') {
  return `<section ${id ? `id="${id}"` : ''}><div class="sectionHead"><span class="eyebrow">${kicker}</span><h2>${title}</h2>${subtitle ? `<p class="lead smallLead">${subtitle}</p>` : ''}</div>${body}</section>`;
}

function landing() {
  const moduleHtml = modules.map((m, i) => `<article class="moduleCard"><div class="moduleNumber">0${i + 1}</div><div><span class="moduleLabel">MÓDULO ${i + 1}</span><h3>${m[0]}</h3><p>${m[1]}</p></div></article>`).join('');
  const serviceHtml = services.map(([title, text]) => card(title, text)).join('');
  const deliverableHtml = deliverables.map(([title, text]) => card(title, text, 'deliverable')).join('');

  return `<div class="app">
    <div class="topbar">TREINAMENTO PRÁTICO DE INTELIGÊNCIA ARTIFICIAL • NEGÓCIOS • PRODUTIVIDADE • SERVIÇOS</div>
    ${nav()}
    <main>
      <section class="hero">
        <div class="heroCopy">
          <span class="badge">✦ Treinamento profissional • acesso imediato</span>
          <h1>Aprenda a usar Inteligência Artificial para <span class="gradient">melhorar negócios e criar novas possibilidades de renda extra.</span></h1>
          <p class="lead">O <strong>${PRODUCT_NAME}</strong> é um treinamento prático para quem quer entender IA além do básico e aplicá-la em tarefas reais: produtividade, conteúdo, atendimento, vendas, processos e serviços digitais que podem ser oferecidos a empresas.</p>
          <div class="heroActions"><button class="btn buy primaryCta" data-source="hero">Quero aprender IA na prática por R$37 →</button><a class="btn secondary" href="#modulos">Ver o programa completo</a></div>
          <div class="trustRow"><span>✓ Para iniciantes</span><span>✓ 7 módulos estruturados</span><span>✓ Garantia de 7 dias</span></div>
        </div>
        <aside class="heroCard premiumPanel">
          <div class="panelGlow"></div>
          <span class="panelKicker">DUAS FORMAS DE APLICAR O MESMO CONHECIMENTO</span>
          <h2>Use IA no seu negócio.<br>Ou transforme a habilidade em serviço.</h2>
          <div class="heroGrid">
            <div class="metric"><strong>Negócios</strong><span>produtividade, marketing, atendimento e processos</span></div>
            <div class="metric"><strong>Renda extra</strong><span>serviços digitais apoiados por IA</span></div>
            <div class="metric"><strong>100</strong><span>prompts profissionais</span></div>
            <div class="metric"><strong>30</strong><span>abordagens comerciais</span></div>
          </div>
          <div class="panelList"><p>${check} Método C.L.A.R.O. de prompting</p><p>${check} Laboratórios e exercícios práticos</p><p>${check} Proposta, preço e checklists</p><p>${check} Sprint de 7 dias + plano de 30 dias</p></div>
        </aside>
      </section>

      <section class="proofStrip" aria-label="Diferenciais do treinamento">
        <div><strong>ENTENDER</strong><span>Como IA funciona e onde ela pode falhar</span></div>
        <div><strong>APLICAR</strong><span>Prompts, processos e revisão profissional</span></div>
        <div><strong>GANHAR EFICIÊNCIA</strong><span>Menos retrabalho e mais organização</span></div>
        <div><strong>CRIAR OFERTAS</strong><span>Serviços claros para problemas reais</span></div>
      </section>

      ${section('Você não precisa “virar especialista em tecnologia” para começar.','IA útil para a vida profissional',`
        <div class="splitStatement"><div><p class="statement">A diferença está em aprender a usar a IA com <strong>contexto, critérios, revisão e objetivo.</strong> Assim, ela deixa de ser apenas uma ferramenta curiosa e passa a apoiar decisões, produção, organização e entregas profissionais.</p></div><div class="comparison"><div class="bad"><span>Uso superficial</span><p>Prompt genérico → copiar → confiar</p></div><div class="good"><span>Uso profissional</span><p>Objetivo → contexto → IA → revisão → validação → aplicação</p></div></div></div>
      `,'aplicacoes')}

      ${section('Escolha como você quer aplicar o treinamento','Dois caminhos, uma mesma base',`
        <div class="grid">
          ${card('CAMINHO 1 — IA para Negócios','Para empreendedores, autônomos e profissionais que querem usar IA para organizar processos, acelerar produção, melhorar comunicação, atendimento e vendas.')}
          ${card('CAMINHO 2 — IA para Renda Extra','Para quem quer aprender habilidades aplicáveis e estruturar serviços digitais que possam ser oferecidos a empresas, profissionais e pequenos negócios.')}
        </div>
      `,'caminhos','Você pode seguir apenas um caminho ou combinar os dois. O treinamento ensina a base necessária para aplicar IA com método.')}

      ${section('O caminho que você vai aprender','Do conhecimento à aplicação',`
        <div class="processGrid">
          ${[
            ['01','Compreender','IA generativa, LLMs, contexto, alucinações, privacidade e verificação.'],
            ['02','Estruturar','Briefing, Método C.L.A.R.O., referências, formatos e critérios de qualidade.'],
            ['03','Produzir','Conteúdo, roteiros, atendimento, ofertas, pesquisas e processos com revisão.'],
            ['04','Aplicar','Use a IA no próprio negócio ou transforme a habilidade em um serviço profissional.'],
            ['05','Oferecer','Defina escopo, preço, proposta, abordagem comercial e follow-up.'],
            ['06','Entregar','Use SOP, checklist, aprovação, organização de arquivos e melhoria contínua.']
          ].map(x=>`<article class="processCard"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}
        </div>
      `)}

      ${section('Um programa construído para gerar aplicação prática.','7 módulos profissionais',`<div class="moduleList">${moduleHtml}</div>`,'modulos','Você começa pelos fundamentos e termina com um plano simples, organizado e executável.')}

      ${section('Sete serviços que podem ser estruturados com apoio da IA','Possibilidades de renda extra',`<div class="grid three">${serviceHtml}</div>`,'servicos','O objetivo não é “vender IA”. É usar IA nos bastidores para entregar soluções que resolvem necessidades reais de empresas e profissionais.')}

      ${section('Tudo o que acompanha o treinamento','Biblioteca de execução',`<div class="grid three">${deliverableHtml}</div>`,'conteudo','Materiais criados para ajudar você a estudar, aplicar, revisar e executar com mais segurança.')}

      <section class="claroSection">
        <div class="sectionHead"><span class="eyebrow">MÉTODO C.L.A.R.O.</span><h2>Aprenda a construir prompts com <span class="gradient">raciocínio e estrutura.</span></h2><p class="lead smallLead">Em vez de depender de frases prontas, você aprende uma lógica que pode ser adaptada a diferentes ferramentas, negócios e tarefas.</p></div>
        <div class="claroGrid">
          ${[
            ['C','Contexto','Quem é o negócio, qual é o cenário e para quem a entrega será criada.'],
            ['L','Limites','O que não pode ser inventado, prometido ou ultrapassado.'],
            ['A','Ação','A tarefa exata que a IA precisa executar.'],
            ['R','Referências','Dados, exemplos, materiais, estilo e informações aprovadas.'],
            ['O','Output','Formato, quantidade, estrutura, tamanho e critérios da saída.']
          ].map(x=>`<article><strong>${x[0]}</strong><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('')}
        </div>
      </section>

      ${section('Para quem este treinamento foi criado','Perfil do aluno',`
        <div class="audienceGrid">
          <article class="audienceCard positive"><span>✓</span><h3>É para você se...</h3><ul class="list"><li>${check} quer entender IA e usá-la com mais segurança;</li><li>${check} tem um pequeno negócio, presta serviços ou trabalha com vendas e marketing;</li><li>${check} busca aumentar produtividade e organizar processos;</li><li>${check} quer aprender habilidades que possam ser oferecidas como serviço;</li><li>${check} aceita estudar, testar, revisar e melhorar suas entregas.</li></ul></article>
          <article class="audienceCard negative"><span>×</span><h3>Não é para você se...</h3><ul class="list"><li>procura promessa de dinheiro rápido ou automático;</li><li>quer copiar prompts sem compreender o raciocínio;</li><li>espera que a IA faça todo o trabalho sem revisão humana;</li><li>não pretende praticar ou aplicar o conteúdo;</li><li>busca garantia de clientes, faturamento ou resultado.</li></ul></article>
        </div>
      `)}

      <section id="oferta" class="offerSection">
        <div class="offer premiumOffer">
          <div class="offerTop"><span class="badge">CONDIÇÃO DE LANÇAMENTO</span><h2>Comece agora no ${PRODUCT_NAME}.</h2><p>Treinamento completo + biblioteca de execução + materiais editáveis + plano prático para aplicar o conhecimento.</p></div>
          <div class="valueStack">
            <div><span>Treinamento profissional</span><strong>7 módulos</strong></div>
            <div><span>Biblioteca prática</span><strong>100 prompts</strong></div>
            <div><span>Prospecção</span><strong>30 mensagens</strong></div>
            <div><span>Execução</span><strong>Modelos + checklists</strong></div>
          </div>
          <div class="priceLabel">Acesso completo por</div><div class="price">R$37</div><p class="installmentNote">pagamento único • acesso liberado pela Kiwify</p>
          <button class="btn buy offerBtn" data-source="offer">QUERO COMEÇAR AGORA →</button>
          <div class="guarantee"><strong>7 dias de garantia.</strong> Você pode conhecer o conteúdo e avaliar se o treinamento faz sentido para você.</div>
        </div>
      </section>

      ${section('Dúvidas antes de começar','FAQ',`<div class="faq">${faq.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p class="muted">${a}</p></details>`).join('')}</div>`,'faq')}

      <section class="finalCta"><div><span class="eyebrow">SUA PRÓXIMA ETAPA</span><h2>Use a IA para trabalhar melhor — e abra espaço para novas oportunidades.</h2><p class="lead">Aprenda fundamentos, prompting, produtividade, serviços, prospecção e execução em um treinamento criado para sair da teoria.</p><button class="btn buy primaryCta" data-source="final">Acessar por R$37 →</button></div></section>
    </main>
    ${footer()}
    <div class="mobileBar"><div><small>Acesso completo</small><strong>R$37</strong></div><button class="btn buy" data-source="mobile">Quero acessar</button></div>
  </div>`;
}

function product() {
  return `<div class="productShell"><aside class="sidebar"><div class="brand"><span class="logo">IA</span>Área do aluno</div><p class="muted">Progresso geral</p><div class="progress"><div class="bar"></div></div></aside><main class="content"><h1>${PRODUCT_NAME}</h1><div class="grid three">${['Módulos 1 a 7: Aulas organizadas por etapa.','Prompts: Biblioteca com 100 prompts.','Plano de 7 dias: Rotina diária de execução.'].map(x=>{let [a,b]=x.split(': ');return card(a,b)}).join('')}</div><h2>Aulas e checklists</h2>${modules.map((m,i)=>`<div class="lesson"><span>Módulo ${i+1}: ${m[0]}</span><span class="muted">Checklist</span></div>`).join('')}${section('Materiais','Downloads',`<div class="grid three">${['30 mensagens de prospecção','Modelo de proposta comercial','Tabela de preços inicial','Bônus'].map(x=>card(x)).join('')}</div>`)}</main></div>`;
}

function simple(title, items) {
  return `<div>${nav()}${section(title,PRODUCT_NAME,`<div class="grid three">${items.map(x=>Array.isArray(x)?card(x[0],x[1]):card(x)).join('')}</div>`)}${footer()}</div>`;
}

function footer() {
  return `<footer class="footer"><div><strong>${PRODUCT_NAME}</strong><p>Treinamento educacional da Senior Tráfego Pro.</p></div><p>A inteligência artificial é uma ferramenta de produtividade. Não há promessa de renda, clientes ou faturamento garantido.</p></footer>`;
}

function render() {
  const p = location.pathname.replace(/\/$/, '') || '/';
  const html = p === '/produto' ? product() : p === '/obrigado' ? simple('Obrigado pela compra',['Confira seu e-mail de acesso','Entre na área de membros','Comece pelo Módulo 1']) : p === '/servicos' ? simple('Serviços que você pode estruturar',services) : p === '/prospeccao' ? simple('Prospecção com IA',['Defina nicho e oferta','Personalize as 30 mensagens','Registre respostas e próximos passos','Envie proposta com clareza']) : landing();
  document.getElementById('root').innerHTML = html;

  if (p === '/' || p === '/ia-pra-renda') trackEvent('view_landing');

  document.querySelectorAll('.buy').forEach(button => button.addEventListener('click', () => {
    const source = button.dataset.source;
    trackEvent('click_cta', { source });
    trackEvent('click_checkout', { source });
    location.href = CHECKOUT_URL;
  }));

  document.querySelectorAll('details').forEach(d => d.addEventListener('toggle', () => d.open && trackEvent('faq_open', { question: d.querySelector('summary').textContent })));

  const offer = document.querySelector('#oferta');
  if (offer) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) trackEvent('view_offer');
    }, { threshold: .45 });
    io.observe(offer);
  }
}

render();