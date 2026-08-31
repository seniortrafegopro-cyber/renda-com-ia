import { CHECKOUT_URL } from './config.js';
import { trackEvent } from './tracking.js';

const services = [
  ['Conteúdo estratégico para redes sociais','Posts, legendas, calendários e variações criativas com revisão humana e consistência de marca.'],
  ['Roteiros para vídeos curtos','Estruturas para Reels, TikTok e Shorts com gancho, desenvolvimento, CTA e adaptação por público.'],
  ['Anúncios simples com IA','Pesquisa de ângulos, headlines, copies e organização de campanhas sem promessas irreais.'],
  ['Atendimento e WhatsApp','FAQ, triagem, respostas padronizadas, mensagens de boas-vindas e fluxos de atendimento.'],
  ['E-mails e relacionamento','Sequências de nutrição, recuperação de orçamento, pós-venda e follow-up comercial.'],
  ['Páginas e textos de oferta','Proposta de valor, headlines, benefícios, objeções, FAQ e CTAs para pequenos negócios.'],
  ['Organização e processos comerciais','Briefings, checklists, SOPs, calendários, pesquisas, resumos e rotinas operacionais.']
];

const modules = [
  ['Fundamentos de IA aplicados ao trabalho','Entenda IA generativa e LLMs, contexto, limites, alucinações, privacidade, verificação e uso responsável.'],
  ['Serviços que o mercado consegue entender','Escolha um serviço, um nicho e uma dor real. Aprenda a transformar ferramenta em solução comercial clara.'],
  ['Prompting profissional e Método C.L.A.R.O.','Construa comandos melhores usando Contexto, Limites, Ação, Referências e Output. Inclui laboratórios e revisão.'],
  ['Produção, qualidade e entrega','Crie um fluxo profissional do briefing ao arquivo final, com SOP, critérios de qualidade e revisão em três passagens.'],
  ['Oferta, preço, portfólio e proposta','Empacote entregáveis, defina limites, construa amostras honestas, precifique e apresente uma proposta profissional.'],
  ['Prospecção, diagnóstico e fechamento','Pesquise leads, personalize abordagens, conduza diagnóstico, trate objeções e faça follow-up sem parecer spam.'],
  ['Execução: sprint de 7 dias e evolução','Saia da teoria com um plano diário, indicadores, projeto final e um plano de continuidade para os próximos 30 dias.']
];

const deliverables = [
  ['100 prompts profissionais','Biblioteca organizada por diagnóstico, conteúdo, copy, vendas, atendimento, e-commerce, pesquisa, apresentações e produtividade.'],
  ['30 mensagens de prospecção','Modelos para WhatsApp, Instagram, e-mail, LinkedIn, follow-up, objeções, fechamento e indicação.'],
  ['Modelo de proposta comercial','Estrutura editável com contexto, solução, entregáveis, processo, prazo, investimento e limites de escopo.'],
  ['Tabela inicial de preços','Faixas de referência para começar a orçar com mais clareza, sem transformar preço em regra fixa.'],
  ['Checklists de produção e cliente','Briefing, revisão, entrega, qualidade, pós-projeto e primeiro cliente em um fluxo organizado.'],
  ['Plano de execução de 7 dias','Roteiro prático para escolher serviço, criar amostras, montar lista, prospectar, propor e revisar resultados.'],
  ['Materiais avançados','Método C.L.A.R.O., glossário de IA, SOP de entrega, auditoria de qualidade, projeto final e plano de 30 dias.']
];

const faq = [
  ['Isso é um e-book?','Não. O IA PRA RENDA foi estruturado como treinamento aplicado, com módulos, laboratórios, exercícios, prompts, modelos, checklists e projeto final. O material didático serve como guia de execução.'],
  ['Preciso entender de programação?','Não. O foco é IA aplicada a serviços, comunicação, produtividade, prospecção e entrega. Você aprende os conceitos necessários sem depender de programação.'],
  ['Vou aprender apenas a escrever prompts?','Não. Prompting é apenas uma parte. O treinamento cobre fundamentos de IA, verificação, oferta, serviço, produção, qualidade, preço, proposta, prospecção, fechamento e execução.'],
  ['Serve para iniciantes?','Sim. O conteúdo começa pelos fundamentos e avança até uma operação prática. O importante é estudar, executar os exercícios e revisar a qualidade das entregas.'],
  ['Existe renda garantida?','Não. O treinamento entrega método, repertório e ferramentas. Resultados dependem de aplicação, posicionamento, mercado, prospecção, qualidade e capacidade comercial.'],
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
    <a class="brand" href="/"><span class="logo">IA</span><span><strong>IA PRA RENDA</strong><small>Treinamento profissional</small></span></a>
    <div class="navlinks"><a href="#metodo">Método</a><a href="#modulos">Módulos</a><a href="#conteudo">Conteúdo</a><a href="#faq">FAQ</a></div>
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
    <div class="topbar">TREINAMENTO DE IA APLICADA • DO FUNDAMENTO À EXECUÇÃO COMERCIAL</div>
    ${nav()}
    <main>
      <section class="hero">
        <div class="heroCopy">
          <span class="badge">✦ Treinamento profissional • acesso imediato</span>
          <h1>Aprenda IA de verdade — e transforme conhecimento em <span class="gradient">serviços que empresas entendem e compram.</span></h1>
          <p class="lead">O <strong>IA PRA RENDA</strong> é um treinamento aplicado para quem quer sair do uso superficial da inteligência artificial e aprender a pesquisar, criar, revisar, organizar, oferecer e entregar serviços digitais com método profissional.</p>
          <div class="heroActions"><button class="btn buy primaryCta" data-source="hero">Quero acessar o treinamento por R$37 →</button><a class="btn secondary" href="#modulos">Ver o programa completo</a></div>
          <div class="trustRow"><span>✓ 7 módulos estruturados</span><span>✓ Aplicação prática</span><span>✓ Garantia de 7 dias</span></div>
        </div>
        <aside class="heroCard premiumPanel">
          <div class="panelGlow"></div>
          <span class="panelKicker">POR DENTRO DO TREINAMENTO</span>
          <h2>Não é um e-book.<br>É um sistema de aprendizagem e execução.</h2>
          <div class="heroGrid">
            <div class="metric"><strong>7</strong><span>módulos progressivos</span></div>
            <div class="metric"><strong>100</strong><span>prompts profissionais</span></div>
            <div class="metric"><strong>30</strong><span>abordagens comerciais</span></div>
            <div class="metric"><strong>7 dias</strong><span>de sprint prática</span></div>
          </div>
          <div class="panelList"><p>${check} Método C.L.A.R.O. de prompting</p><p>${check} Laboratórios e exercícios</p><p>${check} Proposta, preço e checklists</p><p>${check} Projeto final e plano de 30 dias</p></div>
        </aside>
      </section>

      <section class="proofStrip" aria-label="Diferenciais do treinamento">
        <div><strong>ENTENDER</strong><span>Como IA funciona e onde ela falha</span></div>
        <div><strong>APLICAR</strong><span>Prompts, processos e revisão profissional</span></div>
        <div><strong>OFERECER</strong><span>Serviços claros para problemas reais</span></div>
        <div><strong>EXECUTAR</strong><span>Prospecção, proposta, entrega e melhoria</span></div>
      </section>

      ${section('Você não precisa de mais uma lista de ferramentas. Precisa de método.','A diferença entre brincar com IA e trabalhar com IA',`
        <div class="splitStatement"><div><p class="statement">Qualquer pessoa consegue pedir um texto para uma IA. O valor profissional começa quando você sabe <strong>dar contexto, definir limites, avaliar qualidade, verificar fatos e transformar a saída em uma entrega útil.</strong></p></div><div class="comparison"><div class="bad"><span>Uso superficial</span><p>Prompt genérico → copiar → entregar</p></div><div class="good"><span>Uso profissional</span><p>Briefing → contexto → IA → revisão → validação → entrega</p></div></div></div>
      `,'metodo')}

      ${section('O caminho que você vai aprender','Do conhecimento à aplicação',`
        <div class="processGrid">
          ${[
            ['01','Compreender','IA generativa, LLMs, contexto, alucinações, privacidade e verificação.'],
            ['02','Estruturar','Briefing, Método C.L.A.R.O., referências, formatos e critérios de qualidade.'],
            ['03','Produzir','Conteúdo, roteiros, atendimento, ofertas, pesquisas e processos com revisão.'],
            ['04','Empacotar','Serviço, público, escopo, preço, portfólio, proposta e limites claros.'],
            ['05','Prospectar','Lista de leads, diagnóstico, mensagens, follow-up e tratamento de objeções.'],
            ['06','Entregar','SOP, checklist, aprovação, organização de arquivos e melhoria contínua.']
          ].map(x=>`<article class="processCard"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}
        </div>
      `)}

      ${section('Um programa pensado para formar capacidade — não dependência de prompt pronto.','7 módulos profissionais',`<div class="moduleList">${moduleHtml}</div>`,'modulos','Você começa pelos fundamentos e termina com uma operação simples, organizada e executável.')}

      ${section('Sete tipos de serviço que você aprende a estruturar com auxílio de IA','Aplicação comercial',`<div class="grid three">${serviceHtml}</div>`,'servicos','O foco não é vender “IA”. É usar IA nos bastidores para entregar soluções que um cliente realmente consegue usar.')}

      ${section('Tudo o que acompanha o treinamento','Biblioteca de execução',`<div class="grid three">${deliverableHtml}</div>`,'conteudo','Materiais para estudar, aplicar, revisar e usar como base no trabalho com clientes.')}

      <section class="claroSection">
        <div class="sectionHead"><span class="eyebrow">MÉTODO EXCLUSIVO DO TREINAMENTO</span><h2>Aprenda a pensar prompts com o Método <span class="gradient">C.L.A.R.O.</span></h2><p class="lead smallLead">Em vez de decorar frases, você aprende uma estrutura que pode adaptar a diferentes ferramentas e tarefas.</p></div>
        <div class="claroGrid">
          ${[
            ['C','Contexto','Quem é o cliente, qual o cenário e para quem a entrega será criada.'],
            ['L','Limites','O que não pode ser inventado, prometido ou ultrapassado.'],
            ['A','Ação','A tarefa exata que a IA precisa executar.'],
            ['R','Referências','Dados, exemplos, materiais, estilo e informações aprovadas.'],
            ['O','Output','Formato, quantidade, estrutura, tamanho e critérios da saída.']
          ].map(x=>`<article><strong>${x[0]}</strong><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('')}
        </div>
      </section>

      ${section('Para quem este treinamento faz sentido','Perfil do aluno',`
        <div class="audienceGrid">
          <article class="audienceCard positive"><span>✓</span><h3>É para você se...</h3><ul class="list"><li>${check} quer entender IA além do básico;</li><li>${check} precisa de um caminho prático para aplicar o conhecimento;</li><li>${check} deseja estruturar serviços para empresas ou clientes;</li><li>${check} aceita estudar, testar, revisar e melhorar;</li><li>${check} quer usar IA como ferramenta de produtividade, não como atalho mágico.</li></ul></article>
          <article class="audienceCard negative"><span>×</span><h3>Não é para você se...</h3><ul class="list"><li>procura promessa de dinheiro automático;</li><li>quer apenas copiar prompts sem entender o raciocínio;</li><li>não pretende prospectar ou conversar com clientes;</li><li>espera que a IA faça todo o trabalho sem revisão;</li><li>busca garantia de faturamento ou resultado.</li></ul></article>
        </div>
      `)}

      <section id="oferta" class="offerSection">
        <div class="offer premiumOffer">
          <div class="offerTop"><span class="badge">CONDIÇÃO DE LANÇAMENTO</span><h2>Entre no IA PRA RENDA e comece com uma estrutura profissional.</h2><p>Treinamento completo + biblioteca de execução + materiais editáveis + plano prático.</p></div>
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

      <section class="finalCta"><div><span class="eyebrow">SUA PRÓXIMA ETAPA</span><h2>Saia do “eu uso IA” para “eu sei aplicar IA com método”.</h2><p class="lead">Aprenda fundamentos, execução, qualidade e aplicação comercial em um treinamento criado para ser colocado em prática.</p><button class="btn buy primaryCta" data-source="final">Acessar IA PRA RENDA por R$37 →</button></div></section>
    </main>
    ${footer()}
    <div class="mobileBar"><div><small>Acesso completo</small><strong>R$37</strong></div><button class="btn buy" data-source="mobile">Quero acessar</button></div>
  </div>`;
}

function product() {
  return `<div class="productShell"><aside class="sidebar"><div class="brand"><span class="logo">IA</span>Área do aluno</div><p class="muted">Progresso geral</p><div class="progress"><div class="bar"></div></div></aside><main class="content"><h1>Dashboard IA PRA RENDA</h1><div class="grid three">${['Módulos 1 a 7: Aulas organizadas por etapa.','Prompts: Biblioteca com 100 prompts.','Plano de 7 dias: Rotina diária de execução.'].map(x=>{let [a,b]=x.split(': ');return card(a,b)}).join('')}</div><h2>Aulas e checklists</h2>${modules.map((m,i)=>`<div class="lesson"><span>Módulo ${i+1}: ${m[0]}</span><span class="muted">Checklist</span></div>`).join('')}${section('Materiais','Downloads',`<div class="grid three">${['30 mensagens de prospecção','Modelo de proposta comercial','Tabela de preços inicial','Bônus'].map(x=>card(x)).join('')}</div>`)}</main></div>`;
}

function simple(title, items) {
  return `<div>${nav()}${section(title,'IA PRA RENDA',`<div class="grid three">${items.map(x=>Array.isArray(x)?card(x[0],x[1]):card(x)).join('')}</div>`)}${footer()}</div>`;
}

function footer() {
  return `<footer class="footer"><div><strong>IA PRA RENDA</strong><p>Treinamento educacional da Senior Tráfego Pro.</p></div><p>IA é uma ferramenta de produtividade. Não há promessa de renda, clientes ou faturamento garantido.</p></footer>`;
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
