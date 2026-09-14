import { CHECKOUT_URL } from './config.js';
import { trackEvent } from './tracking.js';

const app=document.querySelector('#app');
const answers=[];
const questions=[
 {q:'Você envia currículos e quase nunca recebe retorno?',a:['Sim, acontece muito','Às vezes','Não']},
 {q:'Você adapta seu currículo para cada vaga ou envia praticamente o mesmo?',a:['Envio praticamente o mesmo','Faço pequenas alterações','Adapto para cada vaga']},
 {q:'Você sente dificuldade em passar por plataformas como Gupy e outras etapas de seleção?',a:['Sim, bastante','Às vezes','Não']},
 {q:'Se fosse chamado hoje para uma entrevista, você saberia exatamente como se preparar e responder?',a:['Não, ficaria inseguro','Mais ou menos','Sim']}
];
const weights=[[2,1,0],[2,1,0],[2,1,0],[2,1,0]];

const CAMPAIGN_PARAMS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','fbclid','gclid','ttclid','src','sck'];

function checkoutUrl(){
 const raw=CHECKOUT_URL.trim(); if(!raw)return '';
 try{const u=new URL(raw);const current=new URL(location.href);CAMPAIGN_PARAMS.forEach(p=>{const v=current.searchParams.get(p);if(v)u.searchParams.set(p,v)});return u.toString()}catch{return ''}
}
function shell(content,extra=''){app.innerHTML=`<section class="screen fade"><div class="card ${extra}">${content}</div></section>`}

function start(){
 shell(`<p class="kicker">Diagnóstico Rota da Entrevista</p>
 <h1>Por que seu currículo ainda não está virando entrevistas?</h1>
 <p class="lead">Responda 4 perguntas rápidas e descubra o que pode estar travando sua próxima oportunidade.</p>
 <button class="primary" id="start">FAZER DIAGNÓSTICO</button><p class="micro">Leva menos de 1 minuto.</p>`);
 document.querySelector('#start').onclick=()=>{trackEvent('click_cta',{location:'diagnostico_inicio'});question(0)};
}
function question(i){
 const item=questions[i];
 shell(`<div class="progress-wrap"><div class="progress-top"><span>Diagnóstico</span><strong>${i+1}/4</strong></div><div class="progress"><span style="width:${(i+1)*25}%"></span></div></div>
 <p class="kicker">Pergunta ${i+1}</p><h2>${item.q}</h2>
 <div class="answers">${item.a.map((x,j)=>`<button class="answer" data-answer="${j}">${x}</button>`).join('')}</div>
 ${i>0?'<button class="back" id="back">← Voltar</button>':''}`);
 document.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>{answers[i]=Number(btn.dataset.answer);answers.length=i+1;i===3?result():question(i+1)});
 const back=document.querySelector('#back');if(back)back.onclick=()=>question(i-1);
}
function result(){
 const score=answers.reduce((sum,a,i)=>sum+weights[i][a],0);
 let diagnosis='Há alguns pontos de ajuste que podem tornar sua candidatura mais estratégica e sua preparação mais segura.';
 if(score>=6)diagnosis='Suas respostas indicam vários pontos de atenção na candidatura — principalmente antes da entrevista. Ajustar currículo, adaptação por vaga e preparação pode reduzir bastante o envio no escuro.';
 else if(score>=3)diagnosis='Você já acerta parte do processo, mas ainda há pontos que podem estar limitando seus avanços. Uma rota mais estruturada tende a deixar cada candidatura mais consistente.';
 else diagnosis='Sua base parece mais organizada, mas ainda vale transformar o que você já faz em um processo repetível para manter consistência e preparação em cada vaga.';
 const url=checkoutUrl();
 shell(`<div class="result-grid">
   <div class="result-copy">
     <p class="kicker">Seu diagnóstico</p>
     <h2>Você não precisa continuar enviando currículos no escuro.</h2>
     <p class="diagnosis">${diagnosis}</p>
     <p class="lead"><strong>Rota da Entrevista</strong> organiza sua candidatura do currículo à entrevista, com materiais práticos para aplicar na próxima vaga.</p>
     <ul class="included"><li>Currículo + 6 modelos</li><li>Método VAGA</li><li>Entrevista + estrutura CAR</li><li>30 perguntas + 60 prompts</li><li>Checklist da candidatura</li></ul>
     <p class="optional">No checkout, você ainda pode escolher complementos opcionais: <strong>Banco de 50 Respostas</strong> e <strong>10 Currículos Premium</strong>. Após a compra, há a oferta opcional <strong>LinkedIn Estratégico</strong>.</p>
   </div>
   <aside class="offer">
     <span class="tag">OFERTA DE LANÇAMENTO</span>
     <div class="old">de <s>R$ 97,00</s> por</div>
     <div class="price"><small>R$</small><strong>37</strong><sup>,00</sup></div>
     <a class="primary" id="buy" href="${url||'#'}">QUERO AUMENTAR MINHAS CHANCES DE SER CHAMADO</a>
     <p class="trust">Pagamento único • Acesso imediato • Compra segura pela Kiwify</p>
   </aside>
 </div><p class="disclaimer">Material educacional. Não há garantia de entrevista ou contratação.</p>`,'result-card');
 trackEvent('view_offer',{diagnostic_score:score});
 const buy=document.querySelector('#buy');buy.onclick=e=>{if(!url){e.preventDefault();return}trackEvent('click_checkout',{location:'diagnostico_resultado',diagnostic_score:score})};
}
trackEvent('view_landing',{path:location.pathname,referrer:document.referrer||'direct'});
start();
