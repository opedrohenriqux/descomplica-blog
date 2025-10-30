
import { GoogleGenAI } from "@google/genai";

const styles = {
  section: {
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: "5rem 2rem",
    textAlign: 'center',
    width: '100%',
  },
  mainTitle: {
    fontSize: "clamp(3rem, 8vw, 5rem)",
    fontWeight: "700",
    color: "var(--text-color)",
    margin: "0 0 1rem 0",
  },
  highlight: {
    color: "var(--primary-color)",
  },
  intro: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "700px",
    margin: "1.5rem 0",
    color: "var(--text-color-light)",
  },
  slogan: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    fontWeight: "700",
    color: "var(--text-color)",
    margin: "1.5rem 0 2rem 0",
    padding: "1rem 2rem",
    border: "2px solid hsla(47, 100%, 50%, 0.5)",
    borderRadius: "12px",
    backgroundColor: "var(--button-bg)",
    position: 'relative',
    boxShadow: '0 0 30px hsla(47, 100%, 50%, 0.2)',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "var(--text-color)",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "3px solid var(--primary-color)",
  },
};

const conteudosList = [
    { id: 'logistica-integrada', title: 'Logística Integrada', intro: 'Logística integrada é a gestão unificada de todas as etapas da cadeia de suprimentos — desde a compra de insumos, transporte, armazenagem, produção até a entrega ao cliente final — visando otimizar processos, reduzir custos e aumentar a eficiência.', content: 'A Logística Integrada é a gestão unificada de todas as atividades logísticas de uma empresa, desde a aquisição de matéria-prima até a entrega do produto final ao cliente. O objetivo é otimizar processos, reduzir custos e aumentar a eficiência da cadeia de suprimentos.' },
    { id: 'just-in-time', title: 'Just in Time', intro: 'É uma filosofia e sistema de gestão de produção, criado pela Toyota, que visa eliminar desperdícios e aumentar a eficiência ao produzir e entregar produtos apenas quando são necessários e na quantidade exata.', content: 'O Just in Time (JIT) é um sistema de produção que busca produzir e entregar produtos na quantidade exata, no momento exato e no local exato. Ele visa eliminar desperdícios, reduzir estoques e melhorar a qualidade e a eficiência.' },
    { id: 'kanban', title: 'Kanban', intro: 'Kanban é um método de gestão visual para melhorar o fluxo de trabalho, usando um quadro e cartões (como post-its) para representar tarefas e seu status.', content: 'Kanban é um sistema visual de gestão de trabalho que utiliza cartões (ou sinais visuais) para controlar o fluxo de produção. Ele ajuda a visualizar o trabalho, limitar o trabalho em andamento (WIP) e maximizar a eficiência, promovendo a melhoria contínua.' },
    { id: 'kaizen', title: 'Kaizen', intro: 'Kaizen é um termo japonês para "mudança para melhor" e descreve a filosofia da melhoria contínua em todas as áreas de uma organização ou vida pessoal.', content: 'Kaizen é uma filosofia japonesa de melhoria contínua que envolve todos os funcionários de uma organização. O objetivo é fazer pequenas mudanças incrementais nos processos para melhorar a qualidade, a produtividade e a segurança.' },
    { id: '5s', title: '5S', intro: '5S é um programa de origem japonesa que foi criado a partir da aplicação de cinco conceitos: Seiri, Seiton, Seiso, Seiketsu e Shitsuke. Ele tem como foco organizar diferentes setores de uma empresa com base na organização, padronização e limpeza.', content: 'O 5S é uma metodologia de organização de locais de trabalho que utiliza cinco palavras japonesas: Seiri (Utilização), Seiton (Organização), Seiso (Limpeza), Seiketsu (Padronização) e Shitsuke (Disciplina). O objetivo é criar um ambiente de trabalho mais limpo, organizado e eficiente.' },
    { id: 'cadeia-de-suprimentos', title: 'Cadeia de Suprimentos', intro: 'A cadeia de suprimentos (ou supply chain) é a rede de processos, pessoas, tecnologias e atividades que ligam fornecedores, fabricantes, distribuidores e clientes para entregar um produto ou serviço.', content: 'A Cadeia de Suprimentos, ou Supply Chain, engloba todas as atividades, pessoas, organizações, informações e recursos envolvidos na movimentação de um produto ou serviço, desde o fornecedor até o cliente final. A gestão eficiente é crucial para a competitividade.' },
    { id: 'compras', title: 'Compras', intro: 'Compras é o processo de aquisição de bens e serviços necessários para o funcionamento de uma empresa, organização ou indivíduo. Esse processo envolve identificar a demanda, selecionar fornecedores, negociar preços e condições, e garantir a entrega dentro dos prazos estabelecidos.', content: 'A área de Compras é responsável por adquirir os materiais, bens e serviços necessários para as operações de uma empresa. Uma gestão de compras estratégica busca obter os melhores preços, qualidade e condições de entrega, estabelecendo parcerias sólidas com fornecedores.' },
    { id: 'recebimento-de-materiais', title: 'Recebimento de Materiais', intro: 'O processo de recebimento de mercadorias é um conjunto de atividades essenciais na logística, que visa receber os produtos adquiridos de fornecedores e é a fase que inicia o fluxo de materiais na empresa. Atingir a eficiência operacional é um grande objetivo desse processo.', content: 'O Recebimento de Materiais é a primeira etapa do processo de armazenagem e consiste na conferência (quantitativa e qualitativa) dos produtos entregues pelos fornecedores. Um recebimento eficiente garante a exatidão do estoque e a qualidade dos materiais.' },
];

const MoonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const SunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const root = document.getElementById('root');
let currentPage = 'inicio';
let selectedTopic = null;
let currentTheme = 'light';
let isTransitioning = false;
let isChatOpen = false;

async function getAiResponse(prompt, context = '') {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const fullPrompt = `
            Você é um assistente amigável e prestativo para o site "Descomplica Logística".
            Sua função é responder às perguntas dos usuários sobre logística.
            ${context ? `Responda a pergunta a seguir usando APENAS o seguinte contexto. Não adicione informações que não estejam no texto.
            Contexto:
            ---
            ${context}
            ---
            Pergunta do usuário: ${prompt}` : prompt}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt
        });
        
        return response.text;
    } catch (error) {
        console.error("Erro ao chamar a API do Gemini:", error);
        return "Desculpe, não consigo responder agora. Tente novamente mais tarde.";
    }
}

function toggleTheme() {
  const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  currentTheme = newTheme;
  render();
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.body.dataset.theme = theme;
  currentTheme = theme;
}

// Fix: Removed TypeScript type annotation from updateState parameter.
function transitionTo(updateState) {
    if (isTransitioning) return;

    const main = document.querySelector('main');

    if (main) {
        isTransitioning = true;
        main.classList.remove('page-fade-in'); 
        main.classList.add('page-fade-out');

        setTimeout(() => {
            updateState();
            window.scrollTo({ top: 0, behavior: 'instant' });
            render();
        }, 400); 
    } else {
        updateState();
        render();
    }
}

function navigateTo(page) {
    if (currentPage === page && !selectedTopic) return;
    transitionTo(() => {
        currentPage = page;
        selectedTopic = null;
    });
}

function applyStyles(element, styles) {
  for (const property in styles) {
    element.style[property] = styles[property];
  }
}

function CtaButton(text, onClick, customStyle = {}) {
  const button = document.createElement('button');
  button.textContent = text;
  const baseStyle = {
    backgroundColor: 'var(--button-bg)',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    color: 'var(--text-color)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.8rem 1.5rem',
    margin: '0 0.75rem',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
    transform: 'translateY(0)',
    boxShadow: 'none',
    ...customStyle,
  };
  applyStyles(button, baseStyle);
  button.addEventListener('click', onClick);
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'var(--button-bg-hover)';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = `0 4px 12px ${getComputedStyle(button).getPropertyValue('--card-shadow-hover')}`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'var(--button-bg)';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
  });
  return button;
}

function renderFundamentalsSection() {
  const section = document.createElement('section');
  section.className = 'fundamentals-section';
  applyStyles(section, { ...styles.section, minHeight: 'auto', padding: '6rem 2rem' });

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Fundamentos da <span style="color: ${styles.highlight.color};">Logística</span>`;

  const container = document.createElement('div');
  container.className = 'fundamentals-container';

  container.innerHTML = `
    <div class="logistics-flow-diagram" aria-label="Diagrama animado mostrando o fluxo da logística de fornecedor para empresa e para cliente.">
      <svg viewBox="0 0 400 300">
        <!-- Flow Lines -->
        <path id="flow-path-1" d="M 50 150 Q 125 75, 200 150" stroke="var(--primary-color)" stroke-width="2" fill="none" stroke-dasharray="5, 5" />
        <path id="flow-path-2" d="M 200 150 Q 275 225, 350 150" stroke="var(--primary-color)" stroke-width="2" fill="none" stroke-dasharray="5, 5" />

        <!-- Animated dots -->
        <circle cx="0" cy="0" r="4" fill="var(--primary-color)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath xlink:href="#flow-path-1"></mpath>
          </animateMotion>
        </circle>
         <circle cx="0" cy="0" r="4" fill="var(--primary-color)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" begin="2s">
            <mpath xlink:href="#flow-path-2"></mpath>
          </animateMotion>
        </circle>

        <!-- Nodes -->
        <g class="flow-node">
          <circle cx="50" cy="150" r="30" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2" />
          <text x="50" y="155" text-anchor="middle" font-size="10">Fornecedor</text>
        </g>
        <g class="flow-node">
          <circle cx="200" cy="150" r="40" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3" />
          <text x="200" y="150" text-anchor="middle" font-size="12">Empresa</text>
          <text x="200" y="165" text-anchor="middle" font-size="10">(Produção)</text>
        </g>
        <g class="flow-node">
          <circle cx="350" cy="150" r="30" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2" />
          <text x="350" y="155" text-anchor="middle" font-size="10">Cliente</text>
        </g>
      </svg>
    </div>
    <div class="fundamentals-cards">
      <div class="fund-card" data-intro="${conteudosList.find(c => c.id === 'compras').intro}">
        <h3>Compras</h3>
        <p>Aquisição de bens e serviços.</p>
      </div>
      <div class="fund-card" data-intro="${conteudosList.find(c => c.id === 'recebimento-de-materiais').intro}">
        <h3>Recebimento</h3>
        <p>Conferência de materiais.</p>
      </div>
      <div class="fund-card" data-intro="${conteudosList.find(c => c.id === 'cadeia-de-suprimentos').intro}">
        <h3>Supply Chain</h3>
        <p>A rede completa de processos.</p>
      </div>
    </div>
  `;

  section.append(title, container);
  return section;
}

function renderLogisticsRightsSection() {
  const section = document.createElement('section');
  section.className = 'logistics-rights-section';

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Os 5 <span style="color: ${styles.highlight.color};">Certos</span> da Logística`;

  const container = document.createElement('div');
  container.className = 'rights-container';

  const rights = [
    {
      title: 'Produto Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
    },
    {
      title: 'Quantidade Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`
    },
    {
      title: 'Condição Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
    },
    {
      title: 'Lugar Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
    },
    {
      title: 'Tempo Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    }
  ];

  rights.forEach(right => {
    const item = document.createElement('div');
    item.className = 'right-item';
    item.innerHTML = `
      <div class="right-item-icon">${right.icon}</div>
      <h3>${right.title}</h3>
    `;
    container.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(container);
  return section;
}

function renderQuoteSection() {
    const section = document.createElement('section');
    section.className = 'quote-section';
    
    section.innerHTML = `
        <div class="quote-card">
            <span class="quote-mark">“</span>
            <blockquote cite="https://www.goodreads.com/quotes/26083-you-will-not-find-it-difficult-to-prove-that">
                Você não terá dificuldade para provar que batalhas, campanhas e até guerras foram ganhas ou perdidas principalmente devido à logística.
            </blockquote>
            <cite>General Dwight D. Eisenhower (1890-1969)</cite>
        </div>
    `;
    
    return section;
}

function renderInicioPage() {
  const pageContainer = document.createElement('div');

  const section = document.createElement('section');
  section.id = 'inicio';
  section.className = 'custom-cursor';
  applyStyles(section, { ...styles.section, minHeight: 'calc(100vh - 80px)', position: 'relative', overflow: 'hidden' });

  const blob1 = document.createElement('div');
  blob1.className = 'background-blob';
  applyStyles(blob1, {
      top: '10%',
      left: '10%',
      width: '300px',
      height: '300px',
      backgroundColor: 'hsla(47, 100%, 50%, 0.15)',
  });

  const blob2 = document.createElement('div');
  blob2.className = 'background-blob';
  applyStyles(blob2, {
      bottom: '15%',
      right: '5%',
      width: '400px',
      height: '400px',
      backgroundColor: 'hsla(220, 50%, 80%, 0.1)',
  });

  const title = document.createElement('h1');
  applyStyles(title, styles.mainTitle);
  title.innerHTML = `<span>Descomplica </span><span style="color: ${styles.highlight.color};">Logística</span>`;

  const slogan = document.createElement('h2');
  applyStyles(slogan, styles.slogan);
  slogan.innerHTML = `
    <span class="slogan-text">Conectando rotas, descomplicando processos.</span>
    <div class="slogan-animation-bg">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    </div>
  `;

  const buttonContainer = document.createElement('div');
  buttonContainer.style.margin = '0 0 1.5rem 0';
  buttonContainer.append(
    CtaButton('Conteúdos', () => navigateTo('conteudos')),
    CtaButton('Perguntas frequentes', () => navigateTo('quem-somos'))
  );

  const intro = document.createElement('p');
  applyStyles(intro, styles.intro);
  intro.textContent = 'O Descomplica Logística é uma plataforma educativa que ensina conceitos de logística de forma simples, didática e visual, utilizando textos, vídeos e imagens para tornar o aprendizado mais acessível.';

  section.append(blob1, blob2, title, slogan, buttonContainer, intro);
  
  pageContainer.appendChild(section);
  pageContainer.appendChild(renderFundamentalsSection());
  pageContainer.appendChild(renderLogisticsRightsSection());
  pageContainer.appendChild(renderQuoteSection());

  return pageContainer;
}

function createTopicList(items) {
    const ul = document.createElement('ul');
    ul.className = 'topic-list';
    items.forEach(itemText => {
        const li = document.createElement('li');
        const separator = itemText.includes(':') ? ':' : '→';
        const parts = itemText.split(separator);
        if (parts.length > 1) {
            const strong = document.createElement('strong');
            strong.textContent = parts[0] + separator;
            li.appendChild(strong);
            li.append(` ${parts.slice(1).join(separator).trim()}`);
        } else {
            li.textContent = itemText;
        }
        ul.appendChild(li);
    });
    return ul;
}

function createTopicNavigation(topicId) {
    const navContainer = document.createElement('div');
    navContainer.className = 'topic-navigation';

    const currentIndex = conteudosList.findIndex(t => t.id === topicId);

    const prevTopic = currentIndex > 0 ? conteudosList[currentIndex - 1] : null;
    const nextTopic = currentIndex < conteudosList.length - 1 ? conteudosList[currentIndex + 1] : null;

    if (prevTopic) {
        const prevButton = CtaButton(`← Anterior`, () => {
            transitionTo(() => { selectedTopic = prevTopic; });
        }, { margin: '0' });
        navContainer.appendChild(prevButton);
    } else {
        navContainer.appendChild(document.createElement('div')); // Placeholder
    }

    if (nextTopic) {
        const nextButton = CtaButton(`Próximo →`, () => {
            transitionTo(() => { selectedTopic = nextTopic; });
        }, { margin: '0' });
        navContainer.appendChild(nextButton);
    }

    return navContainer;
}

async function handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, topicName, submitButton, resetButton) {
    e.preventDefault();
    let score = 0;
    const incorrectAnswers = [];

    quizData.forEach((item, index) => {
        // Fix: Removed TypeScript type casting 'as HTMLInputElement'.
        const selected = quizForm.querySelector(`input[name*="question-${index}"]:checked`);
        const labels = quizForm.querySelectorAll(`input[name*="question-${index}"]`);
        
        labels.forEach(l => (l.parentElement.classList.remove('correct', 'incorrect', 'quiz-feedback')));

        if (selected) {
            const answerIndex = parseInt(selected.value);
            const correctLabel = labels[item.a].parentElement;
            correctLabel.classList.add('correct', 'quiz-feedback');
            
            if (answerIndex === item.a) {
                score++;
            } else {
                const selectedLabel = selected.parentElement;
                selectedLabel.classList.add('incorrect', 'quiz-feedback');
                incorrectAnswers.push(item.q);
            }
        } else {
            incorrectAnswers.push(item.q);
        }
    });

    resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
    submitButton.style.display = 'none';
    resetButton.style.display = 'inline-block';

    aiTipDiv.innerHTML = '';
    if (incorrectAnswers.length > 0) {
        aiTipDiv.innerHTML = `<h4>Dica do Assistente</h4><p>Estou gerando uma dica de estudo para você...</p>`;
        const prompt = `O usuário errou questões sobre ${topicName}. As perguntas erradas foram: "${incorrectAnswers.join('", "')}". Com base nisso, dê uma dica de estudo amigável e curta, sugerindo que ele revise o conteúdo da página para entender melhor esses pontos.`;
        const tip = await getAiResponse(prompt);
        aiTipDiv.innerHTML = `<h4>💡 Dica do Assistente</h4><p>${tip}</p>`;
    }
}

function renderLogisticaIntegradaPage() {
    const container = document.createElement('div');
    container.className = 'logistica-integrada-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '2rem',
    });
    title.textContent = 'Logística Integrada';

    // Logística Tradicional
    const tradHighlight = document.createElement('div');
    tradHighlight.className = 'highlight-text';
    tradHighlight.textContent = 'Logística tradicional';
    const tradIntro = document.createElement('p');
    tradIntro.textContent = 'Fala, pessoal! Você sabe o que é Logística? Aposto que você pensou na definição de Logística como entrega de "algo". E não está errado, bom... De certa maneira! Sabia que existe um processo muito legal e bacana por trás de cada produto que compramos e recebemos? É o que hoje chamamos de Logística Integrada e veremos isso mais adiante, agora vamos falar sobre a Logística tradicional quando o processo se resumia apenas a transporte e movimentação.';
    
    const columns = document.createElement('div');
    columns.className = 'content-columns';
    const imageCol = document.createElement('div');
    imageCol.className = 'image-col';
    imageCol.innerHTML = `
        <svg width="250" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="70" width="100" height="60" rx="5" fill="#fef4d6" stroke="#fec700" stroke-width="2"/>
            <text x="70" y="105" font-family="Poppins" font-size="14" fill="#333" text-anchor="middle">Transporte</text>
            <rect x="180" y="70" width="100" height="60" rx="5" fill="#fef4d6" stroke="#fec700" stroke-width="2"/>
            <text x="230" y="105" font-family="Poppins" font-size="14" fill="#333" text-anchor="middle">Armazenagem</text>
            <path d="M125 100h50" stroke="#ccc" stroke-width="2" stroke-dasharray="5 5"/>
        </svg>
    `;
    const textCol = document.createElement('div');
    textCol.className = 'text-col';
    textCol.innerHTML = `<p>Antes da Logística Integrada, havia uma visão de que a Logística era apenas transporte e armazenagem, sem nenhuma integração com as outras áreas da empresa. Sabe o que isso gerava? Altos custos, ineficiência e lentidão no atendimento ao cliente.</p>
    <p>Esse isolamento não era nada bom, com a falta de comunicação e organização interna, a empresa não conseguia obter melhores resultados e como não havia coordenação, havia excesso de estoque, rotas mal planejadas, atrasos e retrabalhos, o que aumentava os gastos.</p>`;
    columns.append(imageCol, textCol);

    // Logística Integrada
    const intHighlight = document.createElement('div');
    intHighlight.className = 'highlight-text';
    intHighlight.textContent = 'Logística Integrada';
    const intIntro = document.createElement('div');
    intIntro.innerHTML = `<p>Fala galera, de boa? Como solução para os problemas da Logística tradicional surgiu a Logística Integrada.</p>
    <p>Saca só: Logística Integrada nada mais é do que juntar tudo que acontece dentro de uma empresa, desde pegar o material lá no começo até entregar o produto na mão do cliente. É igual fazer todas as partes do rolê se conectarem, sem bagunça e sem atraso.</p>
    <p>Imagina um time dando um show, cada um sabendo o que tem que fazer e passando a bola na hora certa. É exatamente isso! A empresa ganha tempo, economiza dinheiro e o cliente recebe tudo bem de boa.</p>
    <p>A Logística Integrada surgiu da necessidade das empresas de:</p>`;
    const intTopics = createTopicList([
        'Reduzir custos operacionais (combustível, armazenagem e mão de obra).',
        'Aumentar a eficiência (menos falhas e atrasos).',
        'Responder de forma rápida e flexível às mudanças do mercado.',
        'Integrar informações em tempo real entre setores.',
        'Garantir satisfação do cliente e fidelização.',
        'Se diferenciar em um mercado cada vez mais competitivo',
    ]);

    // Timeline
    const timelineData = [
        { id: '1950', label: 'Antes 1950', content: 'A logística era vista apenas como transporte e armazenagem. O foco era movimentar produtos de um ponto a outro.' },
        { id: '1960', label: '1950–1960', content: 'Após a 2ª Guerra Mundial, empresas começaram a aplicar conceitos militares de logística (movimentação estratégica de suprimentos) no setor empresarial.' },
        { id: '1970', label: '1970', content: 'Crises do petróleo aumentaram os custos, e as empresas perceberam a necessidade de reduzir desperdícios e integrar melhor suas operações.' },
        { id: '1980', label: '1980', content: 'Surge o conceito de Supply Chain Management (Gestão da Cadeia de Suprimentos), com visão mais ampla, considerando fornecedores, produção e clientes como partes de um mesmo sistema.' },
        { id: '1990', label: '1990', content: 'Avanço da tecnologia da informação (sistemas ERP, código de barras, rastreamento) permite integração em tempo real entre áreas da empresa e parceiros externos.' },
        { id: '2000', label: '2000 em diante', content: 'Globalização, e-commerce e logística 4.0 (uso de IA, IoT, Big Data, automações) consolidam a logística integrada como diferencial competitivo.' },
    ];
    const timelineSection = document.createElement('div');
    timelineSection.className = 'timeline-section';
    const timelineNav = document.createElement('div');
    timelineNav.className = 'timeline-nav';
    const timelineContentContainer = document.createElement('div');
    
    timelineData.forEach((item, index) => {
        const navItem = document.createElement('button');
        navItem.className = 'timeline-nav-item';
        navItem.textContent = item.label;
        navItem.dataset.target = `timeline-${item.id}`;
        
        const contentItem = document.createElement('div');
        contentItem.className = 'timeline-content';
        contentItem.id = `timeline-${item.id}`;
        contentItem.textContent = item.content;

        if (index === 0) {
            navItem.classList.add('active');
            contentItem.classList.add('active');
        }

        timelineNav.appendChild(navItem);
        timelineContentContainer.appendChild(contentItem);
    });

    timelineNav.addEventListener('click', e => {
        // Fix: Removed TypeScript type casting 'as HTMLElement'.
        const target = e.target;
        // Fix: Added instanceof check to ensure target is an HTMLElement and has the expected properties.
        if (target instanceof HTMLElement && target.classList.contains('timeline-nav-item')) {
            timelineNav.querySelectorAll('.timeline-nav-item').forEach(btn => btn.classList.remove('active'));
            timelineContentContainer.querySelectorAll('.timeline-content').forEach(content => content.classList.remove('active'));
            
            target.classList.add('active');
            const contentId = target.dataset.target;
            if (contentId) {
                const contentEl = document.getElementById(contentId);
                if (contentEl) {
                    contentEl.classList.add('active');
                }
            }
        }
    });
    timelineSection.append(timelineNav, timelineContentContainer);
    
    // Info Cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'info-cards-container';
    
    const cardImportancia = document.createElement('div');
    cardImportancia.className = 'info-card';
    cardImportancia.innerHTML = '<h3>Importância:</h3>';
    cardImportancia.appendChild(createTopicList([
        'Integração de processos: conecta suprimentos, produção, armazenagem, transporte e distribuição;',
        'Fluxo de informações: uso de sistemas para acompanhar em tempo real pedidos, estoques e entregas;',
        'Redução de custos: elimina desperdícios e atividades duplicadas;',
        'Agilidade e flexibilidade: melhora a capacidade de resposta às mudanças de mercado;',
        'Foco no cliente: garante que o produto certo chegue no lugar certo, na hora certa, com qualidade e menor custo.',
    ]));

    const cardCaracteristicas = document.createElement('div');
    cardCaracteristicas.className = 'info-card';
    cardCaracteristicas.innerHTML = '<h3>Características:</h3>';
     cardCaracteristicas.appendChild(createTopicList([
        'Integração de processos: conecta suprimentos, produção, armazenagem, transporte e distribuição.',
        'Fluxo de informações: uso de sistemas para acompanhar em tempo real pedidos, estoques e entregas.',
        'Redução de custos: elimina desperdícios e atividades duplicadas.',
        'Agilidade e flexibilidade: melhora a capacidade de resposta às mudanças de mercado.',
        'Foco no cliente: garante que o produto certo chegue no lugar certo, na hora certa, com qualidade e menor custo.',
    ]));

    const cardObjetivos = document.createElement('div');
    cardObjetivos.className = 'info-card';
    cardObjetivos.innerHTML = '<h3>Objetivos:</h3>';
     cardObjetivos.appendChild(createTopicList([
        'Redução de custos → eliminar desperdícios, evitar retrabalho e otimizar recursos.',
        'Eficiência operacional → garantir que todos os processos estejam sincronizados e fluindo sem gargalos.',
        'Agilidade e flexibilidade → responder rapidamente a mudanças de demanda ou imprevistos no mercado.',
        'Qualidade no atendimento → entregar o produto certo, no lugar certo, no tempo certo.',
        'Integração da cadeia de suprimentos → conectar fornecedores, produção, armazenagem, transporte e cliente final em um só sistema.',
        'Satisfação e fidelização do cliente → aumentar a competitividade ao oferecer melhor experiência de compra.',
    ]));

    cardsContainer.append(cardObjetivos, cardImportancia, cardCaracteristicas);

    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual era o foco principal da logística tradicional antes do conceito de integração?", a: 0, o: ["Apenas transporte e armazenagem.", "Satisfação total do cliente.", "Gestão completa da cadeia de suprimentos.", "Marketing e vendas."] },
        { q: "O que a Logística Integrada busca unificar?", a: 1, o: ["Apenas o marketing e as vendas.", "Todas as etapas da cadeia de suprimentos.", "Somente a produção e o estoque.", "Apenas o financeiro e o RH."] },
        { q: "Em que década o conceito de Supply Chain Management (SCM) começou a ganhar força?", a: 2, o: ["Década de 1950", "Década de 1970", "Década de 1980", "Década de 2010"] },
        { q: "Qual o resultado final esperado para o cliente com a implementação da Logística Integrada?", a: 2, o: ["Buscar o produto diretamente na fábrica.", "Receber o produto com atraso, mas mais barato.", "Receber o produto certo, no lugar e na hora certa.", "Ter menos opções de produtos disponíveis."] },
        { q: "Um dos principais benefícios da Logística Integrada é:", a: 3, o: ["O aumento do nível de estoque.", "A complexidade na comunicação.", "A maior dependência de um único setor.", "A redução de custos operacionais."] },
        { q: "Que evento histórico impulsionou a necessidade de maior eficiência logística nos anos 1970?", a: 1, o: ["A Segunda Guerra Mundial.", "As crises do petróleo.", "A invenção do código de barras.", "O surgimento do e-commerce."] },
        { q: "A Logística 4.0, que consolida a integração, é marcada pelo uso de qual tecnologia?", a: 0, o: ["Inteligência Artificial (IA) e IoT.", "Máquinas a vapor.", "Telefone e fax.", "Apenas planilhas eletrônicas."] },
        { q: "Qual NÃO é um objetivo da Logística Integrada?", a: 3, o: ["Aumentar a eficiência operacional.", "Responder rapidamente às mudanças de mercado.", "Garantir a satisfação do cliente.", "Manter cada departamento trabalhando de forma isolada."] },
        { q: "A integração do fluxo de informações em tempo real é uma característica-chave da Logística Integrada. Qual tecnologia foi fundamental para isso nos anos 90?", a: 2, o: ["Rádio amador.", "Correio tradicional.", "Sistemas ERP (Enterprise Resource Planning).", "Máquinas de escrever."] },
        { q: "A visão da Logística Integrada considera a empresa como:", a: 1, o: ["Uma coleção de departamentos independentes.", "Um sistema único e conectado.", "Apenas um centro de distribuição.", "Um ponto de venda para o cliente."] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'logistica-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Logística Integrada', submitButton, resetButton));
    
    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });

    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title, 
        tradHighlight, 
        tradIntro,
        columns,
        intHighlight,
        intIntro,
        intTopics,
        timelineSection,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}

function renderJustInTimePage() {
    const container = document.createElement('div');
    container.className = 'jit-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Just in Time';

    const intro = document.createElement('p');
    intro.textContent = 'Fala, pessoal! Dentro da Logística Integrada nós temos o Just In Time (Na hora certa), uma estratégia de gestão da produção e logística que tem como objetivo produzir e entregar apenas o necessário, no momento exato, na quantidade certa, evitando estoques excessivos e desperdícios.';

    const mindMapImage = document.createElement('img');
    mindMapImage.className = 'jit-mind-map';
    mindMapImage.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAUACgADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIREAPwD2aiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-...';
    mindMapImage.alt = 'Mapa Mental sobre Just in Time';
    mindMapImage.setAttribute('aria-label', 'Mapa mental detalhando os conceitos de Just in Time, incluindo definição, objetivo, como surgiu, aplicação, benefícios e logística.');

    const comoSurgiuTitle = document.createElement('h3');
    comoSurgiuTitle.textContent = 'COMO SURGIU?';
    const comoSurgiuText = document.createElement('p');
    comoSurgiuText.textContent = 'O Just in Time (JIT) surgiu no Japão, nas décadas de 1950 e 1960, principalmente na Toyota, com o engenheiro Taiichi Ohno como idealizador. Foi desenvolvido para enfrentar a escassez de recursos e aumentar a eficiência industrial, evitando desperdícios e estoques excessivos. O JIT baseia-se em produzir apenas o necessário, na hora certa, mantendo um fluxo contínuo de produção e priorizando a qualidade total, já que não há estoques para compensar falhas. Essa filosofia reduziu custos, otimizou processos e se tornou referência mundial, especialmente na indústria automotiva.';

    const comoFuncionaTitle = document.createElement('h3');
    comoFuncionaTitle.textContent = 'COMO FUNCIONA';
    const comoFuncionaList = createTopicList([
        'Produção puxada pela demanda → só se fabrica quando há pedido/necessidade.',
        'Controle rigoroso de estoques → materiais chegam quase no momento da produção.',
        'Parceria com fornecedores → entregas frequentes e confiáveis, em pequenos lotes.',
        'Padronização e qualidade → processos precisam ser eficientes para não haver atrasos.',
    ]);

    const exemploTitle = document.createElement('h3');
    exemploTitle.textContent = 'EXEMPLO PRÁTICO';
    const exemploText = document.createElement('p');
    exemploText.innerHTML = 'A Toyota, no Japão, foi pioneira no JIT: Em vez de manter grandes estoques de peças, os fornecedores entregam exatamente o que será usado na linha de produção no momento certo, isso reduz custos de armazenagem e aumenta a eficiência.<br>O Just in Time é um dos pilares da logística integrada e da filosofia de produção enxuta, pois conecta produção, fornecedores e clientes de forma sincronizada.';
    
    const importanciaTitle = document.createElement('h3');
    importanciaTitle.textContent = 'IMPORTÂNCIA';
    const importanciaText = document.createElement('p');
    importanciaText.textContent = 'O Just in Time (JIT) é importante porque aumenta a eficiência e reduz custos, produzindo apenas o necessário, garantindo qualidade e flexibilidade, e permitindo que as empresas se adaptem rapidamente às demandas do mercado.';

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'info-cards-container';

    const vantagesCard = document.createElement('div');
    vantagesCard.className = 'info-card';
    vantagesCard.innerHTML = '<h3>Vantagens</h3>';
    vantagesCard.appendChild(createTopicList([
        'Redução de estoques e custos de armazenamento;',
        'Aumento da eficiência e produtividade;',
        'Melhoria da qualidade dos produtos;',
        'Maior flexibilidade para atender à demanda do mercado.',
    ]));

    const desvantagensCard = document.createElement('div');
    desvantagensCard.className = 'info-card';
    desvantagensCard.innerHTML = '<h3>Desvantagens</h3>';
    desvantagensCard.appendChild(createTopicList([
        'Dependência de fornecedores confiáveis;',
        'Risco elevado em caso de falhas na produção;',
        'Pouca margem para imprevisto;',
        'Necessidade de disciplina e organização rigorosas.',
    ]));

    cardsContainer.append(vantagesCard, desvantagensCard);
    
    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o objetivo principal do Just in Time (JIT)?", a: 2, o: ["Aumentar o tamanho dos estoques para emergências.", "Produzir o máximo possível, o tempo todo.", "Produzir e entregar apenas o necessário, no momento exato.", "Reduzir a qualidade para acelerar a produção."] },
        { q: "O JIT opera com um sistema de produção chamado:", a: 1, o: ["Produção 'empurrada'.", "Produção 'puxada' pela demanda.", "Produção 'antecipada'.", "Produção em massa."] },
        { q: "Qual é uma das principais desvantagens do sistema JIT?", a: 1, o: ["Aumento dos custos de armazenamento.", "Alta dependência de fornecedores confiáveis.", "Excesso de flexibilidade na produção.", "Necessidade de grandes estoques de segurança."] },
        { q: "O JIT é considerado um dos pilares de qual filosofia de produção?", a: 1, o: ["Produção em massa.", "Produção enxuta (Lean Manufacturing).", "Produção artesanal.", "Fordismo."] },
        { q: "Qual empresa é mais famosa por desenvolver e popularizar o JIT?", a: 3, o: ["Ford", "General Motors", "Volkswagen", "Toyota"] },
        { q: "No JIT, o que acontece se um fornecedor atrasa uma entrega?", a: 0, o: ["A linha de produção pode parar.", "O estoque de segurança é usado.", "A produção é adiantada.", "Nada, pois há muitos outros fornecedores."] },
        { q: "O que o JIT busca eliminar primordialmente?", a: 2, o: ["A automação industrial.", "A participação dos funcionários.", "Desperdícios de tempo, material e estoque.", "O controle de qualidade rigoroso."] },
        { q: "Como o JIT impacta o espaço físico de uma fábrica?", a: 1, o: ["Exige mais espaço para grandes estoques.", "Reduz a necessidade de espaço de armazenamento.", "Não tem impacto no espaço físico.", "Aumenta o tamanho das linhas de produção."] },
        { q: "Qual a relação do JIT com a qualidade dos produtos?", a: 3, o: ["A qualidade é menos importante que a velocidade.", "Permite mais defeitos, pois a produção é rápida.", "Não tem relação com a qualidade.", "Exige alta qualidade, pois não há estoque para cobrir peças defeituosas."] },
        { q: "O sistema JIT é mais adequado para ambientes com demanda:", a: 0, o: ["Estável e previsível.", "Totalmente imprevisível e caótica.", "Sazonal e com grandes picos.", "Baixa e esporádica."] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'jit-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `jit-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Just in Time', submitButton, resetButton));
    
    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title,
        intro,
        mindMapImage,
        comoSurgiuTitle,
        comoSurgiuText,
        comoFuncionaTitle,
        comoFuncionaList,
        exemploTitle,
        exemploText,
        importanciaTitle,
        importanciaText,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}

function renderKanbanPage() {
    const container = document.createElement('div');
    container.className = 'kanban-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Kanban';

    const intro = document.createElement('p');
    intro.textContent = 'Fala, pessoal! Kanban é uma metodologia visual de gestão de tarefas e processos, muito usada para organizar trabalhos de forma eficiente, a ideia é visualizar o andamento do trabalho e limitar o trabalho em andamento para aumentar a produtividade e identificar erros. Além de ser muito útil no ambiente de trabalho, pode ser utilizado até na vida pessoal, principalmente se você tem aquele leve esquecimento as vezes, com o Kanban você consegue facilmente visualizar quais demandas são de extrema urgência.';
    
    const kanbanBoardSVG = document.createElement('div');
    kanbanBoardSVG.className = 'kanban-board-svg';
    kanbanBoardSVG.innerHTML = `
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="398" height="198" rx="10" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
        
        <!-- Columns -->
        <rect x="10" y="10" width="120" height="180" rx="5" fill="var(--timeline-bg)"/>
        <text x="70" y="30" font-family="Poppins" font-size="14" font-weight="600" fill="var(--text-color)" text-anchor="middle">A Fazer</text>
        
        <rect x="140" y="10" width="120" height="180" rx="5" fill="var(--timeline-bg)"/>
        <text x="200" y="30" font-family="Poppins" font-size="14" font-weight="600" fill="var(--text-color)" text-anchor="middle">Fazendo</text>
        
        <rect x="270" y="10" width="120" height="180" rx="5" fill="var(--timeline-bg)"/>
        <text x="330" y="30" font-family="Poppins" font-size="14" font-weight="600" fill="var(--text-color)" text-anchor="middle">Feito</text>
        
        <!-- Cards -->
        <g class="kanban-card">
          <rect x="20" y="45" width="100" height="30" rx="3" fill="#fef4d6"/>
          <text x="70" y="64" font-family="Poppins" font-size="10" fill="#333" text-anchor="middle">Tarefa 1</text>
        </g>
        <g class="kanban-card">
          <rect x="20" y="85" width="100" height="30" rx="3" fill="#fef4d6"/>
          <text x="70" y="104" font-family="Poppins" font-size="10" fill="#333" text-anchor="middle">Tarefa 2</text>
        </g>
        <g class="kanban-card">
          <rect x="150" y="45" width="100" height="30" rx="3" fill="#d4edda"/>
          <text x="200" y="64" font-family="Poppins" font-size="10" fill="#333" text-anchor="middle">Tarefa 3</text>
        </g>
        <g class="kanban-card">
          <rect x="280" y="45" width="100" height="30" rx="3" fill="#f8d7da"/>
          <text x="330" y="64" font-family="Poppins" font-size="10" fill="#333" text-anchor="middle">Tarefa 4</text>
        </g>
      </svg>
    `;

    const imageDesc = document.createElement('p');
    imageDesc.textContent = 'O Kanban funciona como um sistema visual de gestão de tarefas, baseado em alguns princípios simples, mas muito eficazes.';
    imageDesc.style.textAlign = 'center';
    imageDesc.style.fontStyle = 'italic';
    imageDesc.style.marginTop = '0.5rem';

    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.innerHTML = content;
            sectionEl.appendChild(p);
        } else if (Array.isArray(content)) {
            sectionEl.appendChild(createTopicList(content));
        } else {
            sectionEl.appendChild(content);
        }
        return sectionEl;
    }

    const definicao = createSection('DEFINIÇÃO', 'O Kanban é um quadro visual que organiza tarefas em etapas como “A Fazer”, “Em Progresso” e “Concluído”. Cada tarefa é um cartão que se move pelo quadro, permitindo visualizar o fluxo de trabalho, priorizar atividades e evitar sobrecarga, melhorando a produtividade e a entrega de resultados.');
    const comoSurgiu = createSection('COMO SURGIU?', 'O Kanban surgiu no final dos anos 1940 na Toyota, no Japão, como parte do sistema de produção enxuta (Lean Manufacturing). Foi criado por Taiichi Ohno para melhorar a eficiência da produção e evitar desperdícios.A ideia era usar cartões (kanban, em japonês significa “cartão” ou “sinal visual”) para controlar o fluxo de materiais na linha de produção, mostrando quando era necessário produzir mais peças ou repor estoque, garantindo que nada fosse feito em excesso e que a produção acompanhasse a demanda real.');
    const principios = createSection('PRINCÍPIOS', [
        'Visualizar todas as tarefas para ter clareza do processo;',
        'Limitar o trabalho em andamento (WIP) para evitar sobrecarga;',
        'Gerenciar o fluxo de trabalho, identificando e resolvendo gargalos;',
        'Tornar as regras e processos explícitos, garantindo que todos saibam como agir;',
        'Promover melhoria contínua, ajustando processos regularmente;',
        'Respeitar as pessoas e equipes, estimulando colaboração e autonomia.',
    ]);
    const limitacao = createSection('LIMITAÇÃO DE TAREFAS', 'Limites de WIP (Work In Progress/Trabalho em Progresso) são restrições sobre a quantidade máxima de tarefas que podem estar em andamento simultaneamente em cada etapa do processo. O objetivo é evitar sobrecarga, aumentar o foco da equipe e identificar gargalos no fluxo de trabalho. Ao respeitar esses limites, o time consegue entregar mais rápido e com mais qualidade, pois as tarefas são concluídas antes de novas serem iniciadas.');
    const melhoria = createSection('Melhoria Contínua (Kaizen) no Kanban', 'Melhoria Contínua (Kaizen) no Kanban é a prática de revisar e ajustar processos regularmente para torná-los mais eficientes e reduzir desperdícios. No Kanban, isso envolve observar o fluxo de trabalho para identificar gargalos ou etapas que atrasam tarefas, analisar dados do quadro, como tempo de conclusão e número de tarefas em andamento, e fazer pequenas mudanças constantes para melhorar a produtividade da equipe. Exemplos de ações incluem reduzir tarefas paradas na coluna “Fazendo”, melhorar a comunicação entre membros da equipe e ajustar prioridades ou redefinir limites de WIP. Com essas melhorias contínuas, a equipe trabalha de forma mais eficiente e organizada, e os resultados evoluem ao longo do tempo.');

    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "O que significa a palavra japonesa 'kanban'?", a: 1, o: ["Melhoria Contínua", "Cartão ou sinal visual", "Produção Enxuta", "Qualidade Total"] },
        { q: "Qual é o principal objetivo de limitar o Trabalho em Progresso (WIP)?", a: 2, o: ["Aumentar o número de tarefas simultâneas.", "Documentar todo o processo.", "Evitar sobrecarga e aumentar o foco da equipe.", "Reduzir a comunicação da equipe."] },
        { q: "O Kanban é considerado um método de gestão primariamente:", a: 1, o: ["Auditivo", "Visual", "Numérico", "Hierárquico"] },
        { q: "A prática de revisar e ajustar processos regularmente no Kanban está ligada a qual conceito?", a: 1, o: ["WIP (Work In Progress)", "Kaizen (Melhoria Contínua)", "Fluxo de Trabalho Empurrado", "Just in Case"] },
        { q: "Onde o método Kanban foi originalmente desenvolvido?", a: 3, o: ["Ford, nos Estados Unidos", "Volkswagen, na Alemanha", "Fiat, na Itália", "Toyota, no Japão"] },
        { q: "Qual destes NÃO é um princípio do Kanban?", a: 2, o: ["Visualizar o fluxo de trabalho", "Limitar o trabalho em andamento", "Maximizar o número de tarefas em andamento", "Gerenciar o fluxo"] },
        { q: "As colunas em um quadro Kanban representam:", a: 0, o: ["As etapas do fluxo de trabalho", "Os membros da equipe", "Os dias da semana", "As prioridades das tarefas"] },
        { q: "Identificar e resolver gargalos é parte de qual princípio do Kanban?", a: 3, o: ["Visualizar o fluxo", "Tornar as políticas explícitas", "Limitar o WIP", "Gerenciar o fluxo"] },
        { q: "O Kanban ajuda as equipes a mudar de uma abordagem 'empurrada' para uma abordagem:", a: 1, o: ["Linear", "'Puxada'", "Caótica", "Burocrática"] },
        { q: "O que um 'cartão' representa em um quadro Kanban?", a: 2, o: ["Um membro da equipe", "Um dia de trabalho", "Uma tarefa ou item de trabalho", "Uma reunião agendada"] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'kanban-quiz';

     quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `kanban-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Kanban', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title,
        intro,
        kanbanBoardSVG,
        imageDesc,
        definicao,
        comoSurgiu,
        principios,
        limitacao,
        melhoria,
        quizSection,
        topicNav
    );
    return container;
}

function renderKaizenPage() {
    const container = document.createElement('div');
    container.className = 'kaizen-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Kaizen';

    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.innerHTML = content;
            sectionEl.appendChild(p);
        } else if (Array.isArray(content)) {
            sectionEl.appendChild(createTopicList(content));
        } else {
            sectionEl.appendChild(content);
        }
        return sectionEl;
    }

    const intro = createSection('Introdução', 'Fala, galera! o Kaizen é uma filosofia japonesa que quer dizer “melhoria contínua” (kai = mudança, zen = melhor). A ideia é simples: todo mundo na empresa fazendo pequenas mudanças o tempo todo, que vão somando e deixando tudo melhor, desde o trabalho, a produtividade, a qualidade e até o clima no lugar.');
    const comoSurgiu = createSection('Como surgiu?', 'Kaizen é uma filosofia japonesa de melhoria contínua, que busca aumentar a produtividade, a qualidade e a eficiência por meio de pequenas mudanças constantes. Surgiu no Japão após a Segunda Guerra Mundial, com a ajuda de especialistas americanos como W. Edwards Deming e Joseph Juran. A ideia principal era reconstruir a indústria do país, focando em processos eficientes e eliminando desperdícios. A Toyota foi pioneira em adotar e popularizar o Kaizen, integrando-o ao seu sistema de produção. Com o tempo, essa filosofia se espalhou pelo mundo e hoje é aplicada em diversas áreas para promover uma cultura de aprendizado e evolução constante.');
    const comoFunciona = createSection('Como funciona?', 'O Kaizen funciona com a colaboração de todos na empresa. A ideia é identificar problemas e sugerir pequenas melhorias no dia a dia, como organizar melhor as ferramentas ou mudar um passo em uma tarefa para ser mais rápido. Em vez de esperar por grandes mudanças, o Kaizen foca em fazer ajustes simples e contínuos que, juntos, geram grandes resultados a longo prazo, tornando o trabalho mais fácil, seguro e eficiente.');
    const importancia = createSection('Importância', 'O Kaizen é importante porque incentiva a empresa a melhorar sempre, eliminando desperdícios e aumentando a eficiência. Isso leva a produtos e serviços de maior qualidade, custos mais baixos e clientes mais satisfeitos. Além disso, valoriza os funcionários, que participam ativamente das melhorias, criando um ambiente de trabalho mais colaborativo e motivador.');
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'kaizen-main-image';
    imageContainer.innerHTML = `
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--button-bg);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:var(--card-bg);stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="200" rx="10" fill="url(#grad1)" />
            <text x="200" y="50" font-family="Poppins" font-size="24" font-weight="700" fill="var(--primary-color)" text-anchor="middle">KAIZEN</text>
            <text x="200" y="75" font-family="Poppins" font-size="14" fill="var(--text-color)" text-anchor="middle">Melhoria Contínua</text>
            
            <g transform="translate(50, 120)">
                <circle cx="0" cy="0" r="20" fill="var(--primary-color)" fill-opacity="0.3"/>
                <text x="0" y="5" font-family="Poppins" font-size="10" fill="var(--text-color)" text-anchor="middle">Planejar</text>
            </g>
            <path d="M75 120 h 40" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4" />
            <g transform="translate(140, 120)">
                <circle cx="0" cy="0" r="20" fill="var(--primary-color)" fill-opacity="0.3"/>
                <text x="0" y="5" font-family="Poppins" font-size="10" fill="var(--text-color)" text-anchor="middle">Fazer</text>
            </g>
             <path d="M165 120 h 40" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4" />
            <g transform="translate(230, 120)">
                <circle cx="0" cy="0" r="20" fill="var(--primary-color)" fill-opacity="0.3"/>
                <text x="0" y="5" font-family="Poppins" font-size="10" fill="var(--text-color)" text-anchor="middle">Checar</text>
            </g>
             <path d="M255 120 h 40" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4" />
            <g transform="translate(320, 120)">
                <circle cx="0" cy="0" r="20" fill="var(--primary-color)" fill-opacity="0.3"/>
                <text x="0" y="5" font-family="Poppins" font-size="10" fill="var(--text-color)" text-anchor="middle">Agir</text>
            </g>
        </svg>
    `;
    
    const cardContainer = document.createElement('div');
    cardContainer.className = 'info-cards-container';
    
    const beneficiosCard = document.createElement('div');
    beneficiosCard.className = 'info-card';
    beneficiosCard.innerHTML = '<h3>Benefícios</h3>';
    beneficiosCard.appendChild(createTopicList([
        'Aumento da produtividade e qualidade;',
        'Redução de desperdícios e custos;',
        'Maior satisfação do cliente;',
        'Melhora do ambiente de trabalho e engajamento da equipe;',
        'Incentivo à inovação e criatividade;',
        'Processos mais eficientes e seguros.',
    ]));
    
    const aplicacaoCard = document.createElement('div');
    aplicacaoCard.className = 'info-card';
    aplicacaoCard.innerHTML = '<h3>Onde se aplica?</h3><p>O Kaizen se aplica em qualquer área ou processo que precise de melhoria, como:</p>';
    aplicacaoCard.appendChild(createTopicList([
        'Indústria → otimizando linhas de produção;',
        'Escritórios → melhorando o fluxo de trabalho;',
        'Hospitais → agilizando o atendimento;',
        'Logística → reduzindo tempos de entrega;',
        'Vida Pessoal → aprimorando hábitos e rotinas.',
    ]));

    cardContainer.append(beneficiosCard, aplicacaoCard);
    
    // Side images
    const sideImagesContainer = document.createElement('div');
    sideImagesContainer.className = 'kaizen-side-images-container';
    sideImagesContainer.innerHTML = `
        <div class="kaizen-side-image">
            <svg viewBox="0 0 200 150">
                <rect x="10" y="10" width="180" height="130" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <circle cx="100" cy="70" r="40" fill="none" stroke="var(--primary-color)" stroke-width="2"/>
                <path d="M100 30 V 20 M100 110 V 120 M60 70 H 50 M140 70 H 150 M71.7 41.7 L 65 35 M128.3 98.3 L 135 105" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/>
                <circle cx="100" cy="70" r="30" fill="var(--primary-color)" fill-opacity="0.1"/>
                <text x="100" y="75" font-family="Poppins" font-size="14" font-weight="600" fill="var(--text-color)" text-anchor="middle">Inovação</text>
            </svg>
            <p>Kaizen vs. Inovação: O Kaizen foca em melhorias pequenas e contínuas, enquanto a inovação busca mudanças radicais e disruptivas. Ambos são importantes para o crescimento da empresa.</p>
        </div>
        <div class="kaizen-side-image">
            <svg viewBox="0 0 200 150">
                <rect x="10" y="10" width="180" height="130" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <path d="M40 110 L80 70 L110 90 L160 40" stroke="var(--primary-color)" stroke-width="3" fill="none"/>
                <circle cx="40" cy="110" r="4" fill="var(--primary-color)"/>
                <circle cx="80" cy="70" r="4" fill="var(--primary-color)"/>
                <circle cx="110" cy="90" r="4" fill="var(--primary-color)"/>
                <circle cx="160" cy="40" r="4" fill="var(--primary-color)"/>
                <path d="M30 120 H 170" stroke="var(--text-color-subtle)" stroke-width="1"/>
                <path d="M30 20 V 120" stroke="var(--text-color-subtle)" stroke-width="1"/>
            </svg>
            <p>Cultura Kaizen: É a criação de um ambiente de trabalho onde todos os funcionários estão engajados em melhorar continuamente, com autonomia para sugerir e implementar mudanças.</p>
        </div>
    `;


    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é a tradução literal da palavra japonesa 'Kaizen'?", a: 2, o: ["Trabalho em Equipe", "Qualidade Total", "Mudança para Melhor", "Produção Rápida"] },
        { q: "O Kaizen foca em que tipo de mudanças?", a: 0, o: ["Pequenas e contínuas", "Grandes e radicais", "Apenas tecnológicas", "Raras e impactantes"] },
        { q: "Onde a filosofia Kaizen surgiu e se popularizou?", a: 1, o: ["Nos Estados Unidos, na Ford", "No Japão, na Toyota", "Na Alemanha, na Volkswagen", "Na Coreia do Sul, na Samsung"] },
        { q: "Quem é responsável por aplicar o Kaizen em uma organização?", a: 3, o: ["Apenas os gerentes", "Apenas a equipe de qualidade", "Apenas os diretores", "Todos os funcionários"] },
        { q: "O Kaizen e a Inovação são a mesma coisa?", a: 1, o: ["Sim, ambos buscam mudanças radicais.", "Não, o Kaizen foca em melhorias contínuas e a inovação em mudanças radicais.", "Sim, ambos são focados em pequenas melhorias diárias.", "Não, o Kaizen é sobre tecnologia e a inovação sobre processos."] },
        { q: "Qual destes NÃO é um benefício direto do Kaizen?", a: 2, o: ["Redução de desperdícios", "Aumento da produtividade", "Aumento do estoque de segurança", "Melhora do ambiente de trabalho"] },
        { q: "O ciclo PDCA (Planejar, Fazer, Checar, Agir) é frequentemente associado ao Kaizen porque ele:", a: 0, o: ["Estrutura o processo de melhoria contínua.", "É usado apenas para grandes projetos de inovação.", "Substitui a necessidade de colaboração da equipe.", "Serve para documentar erros sem corrigi-los."] },
        { q: "O Kaizen pode ser aplicado na vida pessoal?", a: 0, o: ["Sim, para aprimorar hábitos e rotinas.", "Não, é uma filosofia estritamente empresarial.", "Apenas em atividades financeiras.", "Apenas para organização de tarefas domésticas."] },
        { q: "O principal objetivo de criar uma 'Cultura Kaizen' é:", a: 3, o: ["Punir os funcionários que não sugerem melhorias.", "Fazer com que apenas a liderança pense em melhorias.", "Copiar exatamente o que outras empresas fazem.", "Engajar todos na busca constante por melhorias."] },
        { q: "Em qual cenário o Kaizen é mais eficaz?", a: 1, o: ["Em empresas que raramente mudam seus processos.", "Em ambientes que valorizam o aprendizado e a evolução constante.", "Em processos que já são perfeitos e não precisam de ajustes.", "Em equipes que trabalham de forma totalmente isolada."] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'kaizen-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `kaizen-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Kaizen', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);
    
    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title,
        intro,
        comoSurgiu,
        comoFunciona,
        importancia,
        imageContainer,
        cardContainer,
        sideImagesContainer,
        quizSection,
        topicNav
    );
    return container;
}

function render5SPage() {
    const container = document.createElement('div');
    container.className = 's5-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = '5S';
    
    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);
        const p = document.createElement('p');
        p.innerHTML = content;
        sectionEl.appendChild(p);
        return sectionEl;
    }
    
    const intro = createSection('Introdução', 'Fala, galera! O 5S é uma metodologia japonesa que ajuda a organizar o local de trabalho para que tudo seja mais fácil, rápido e seguro. O nome vem de cinco palavras em japonês que começam com "S": Seiri, Seiton, Seiso, Seiketsu e Shitsuke. Cada uma representa um passo para criar um ambiente mais limpo, organizado e produtivo.');
    const comoSurgiu = createSection('Como surgiu?', 'O programa 5S surgiu no Japão, após a Segunda Guerra Mundial, durante a reconstrução do país. A ideia era melhorar a eficiência e a qualidade nas indústrias, eliminando desperdícios e criando um ambiente de trabalho mais organizado. A metodologia se popularizou como parte do Sistema Toyota de Produção e, hoje, é usada por empresas do mundo todo para aumentar a produtividade e a segurança.');
    
    const s5Grid = document.createElement('div');
    s5Grid.className = 's5-visual-grid';
    
    const s5Data = [
        { 
            title: "1. Seiri (Senso de Utilização)", 
            text: "<strong>O que é:</strong> Separar o que é necessário do que não é.<br><strong>Como fazer:</strong> Olhe tudo o que você tem na sua área de trabalho e jogue fora, doe ou guarde em outro lugar o que não for essencial para suas tarefas diárias. O objetivo é manter apenas o indispensável.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><path d="M54 18h-8v-4c0-2.2-1.8-4-4-4h-8c-2.2 0-4 1.8-4 4v4h-8l-4 40h40l-4-40z" fill="url(#s5-grad-1)"/><path d="M52 18h-6v-4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v4h-6l-3.5 36h35l-3.5-36z M38 18h-4v-2h4v2z" fill="var(--text-color)"/><path d="M22 28l-2 2 10 10 10-10-2-2-8 8z" fill="var(--primary-color)" opacity="0.8"/><line x1="10" y1="24" x2="54" y2="24" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4"/></svg>`
        },
        { 
            title: "2. Seiton (Senso de Organização)", 
            text: "<strong>O que é:</strong> Organizar o que ficou.<br><strong>Como fazer:</strong> Defina um lugar para cada coisa e mantenha cada coisa em seu lugar. Use etiquetas, prateleiras e caixas para que qualquer pessoa possa encontrar o que precisa de forma rápida e fácil.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><rect x="8" y="10" width="48" height="44" rx="4" fill="url(#s5-grad-2)"/><path d="M12 18h16v8h-16z M32 18h16v8h-16z M12 30h16v8h-16z M32 30h16v8h-16z M12 42h36v8h-36z" fill="var(--text-color)"/><path d="M14 20h12v4h-12z" fill="var(--primary-color)" opacity="0.8"/><path d="M34 32h12v4h-12z" fill="var(--primary-color)" opacity="0.8"/><path d="M14 44h32v4h-32z" fill="var(--primary-color)" opacity="0.8"/></svg>`
        },
        { 
            title: "3. Seiso (Senso de Limpeza)", 
            text: "<strong>O que é:</strong> Manter o ambiente limpo.<br><strong>Como fazer:</strong> Crie o hábito de limpar sua área de trabalho regularmente. Um ambiente limpo é mais agradável, seguro e ajuda a identificar problemas, como vazamentos ou equipamentos quebrados, mais facilmente.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><path d="M52 12l-20 20-12-12-8 8 20 20 28-28z" fill="url(#s5-grad-3)"/><path d="M48 10h-32v2h32z M48 52h-32v2h32z" fill="var(--text-color)" opacity="0.5"/><path d="M50 8l-28 28-12-12-4 4 16 16 32-32z" fill="var(--primary-color)"/><path d="M18 42l-4 4 8 8 4-4z M10 50l-4 4 8 8 4-4z M26 50l-4 4 8 8 4-4z" fill="var(--text-color)" opacity="0.7"/></svg>`
        },
        { 
            title: "4. Seiketsu (Senso de Padronização)", 
            text: "<strong>O que é:</strong> Manter a organização e a limpeza.<br><strong>Como fazer:</strong> Crie regras e padrões para que os três primeiros “S” (Utilização, Organização e Limpeza) se tornem um hábito. Isso pode incluir checklists, rotinas de limpeza e responsabilidades claras para cada um.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><rect x="12" y="8" width="40" height="48" rx="4" fill="url(#s5-grad-4)"/><path d="M20 18h24v4h-24z" fill="var(--text-color)"/><path d="M24 28h16v2h-16zm0 6h16v2h-16zm0 6h16v2h-16z" fill="var(--text-color)" opacity="0.7"/><path d="M20 28l-4 4 2 2 4-4z M20 34l-4 4 2 2 4-4z M20 40l-4 4 2 2 4-4z" fill="var(--primary-color)"/></svg>`
        },
        { 
            title: "5. Shitsuke (Senso de Disciplina)", 
            text: "<strong>O que é:</strong> Ter disciplina para seguir as regras.<br><strong>Como fazer:</strong> É o compromisso de todos em manter os padrões definidos. Significa transformar o 5S em parte da cultura da empresa, onde cada um faz sua parte sem precisar ser lembrado.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><circle cx="32" cy="32" r="24" fill="url(#s5-grad-5)"/><path d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" fill="var(--text-color)"/><path d="M42 30h-6v-6c0-1.1-.9-2-2-2s-2 .9-2 2v8h8c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="var(--primary-color)"/></svg>`
        },
    ];

    s5Data.forEach(item => {
        const card = document.createElement('div');
        card.className = 's5-visual-card';
        card.innerHTML = `
            <div class="s5-card-icon">${item.icon}</div>
            <div class="s5-card-content">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        `;
        s5Grid.appendChild(card);
    });

    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o primeiro passo do 5S, representado por 'Seiri'?", a: 0, o: ["Separar o necessário do desnecessário", "Organizar os itens restantes", "Limpar o local de trabalho", "Criar padrões de limpeza"] },
        { q: "O 'Seiton' (Senso de Organização) prega que deve haver:", a: 1, o: ["Muitos itens guardados, para o caso de precisar.", "Um lugar para cada coisa, e cada coisa em seu lugar.", "Limpeza constante, mesmo que o ambiente esteja desorganizado.", "Reuniões diárias sobre disciplina."] },
        { q: "Manter o ambiente de trabalho limpo para identificar problemas facilmente é o objetivo de qual senso?", a: 2, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Shitsuke (Disciplina)"] },
        { q: "O 'Seiketsu' (Senso de Padronização) serve para:", a: 3, o: ["Descartar itens uma única vez.", "Organizar o ambiente apenas quando há visitas.", "Limpar o local de trabalho esporadicamente.", "Manter os três primeiros sensos como um hábito."] },
        { q: "O 'Shitsuke' (Senso de Disciplina) representa:", a: 1, o: ["A punição para quem não segue as regras.", "O compromisso de todos em manter os padrões.", "A limpeza feita apenas pela equipe de faxina.", "A compra de novos materiais de organização."] },
        { q: "O 5S é uma metodologia que se originou em qual país?", a: 0, o: ["Japão", "Estados Unidos", "Alemanha", "China"] },
        { q: "Qual o principal benefício de aplicar o 5S em um ambiente de trabalho?", a: 2, o: ["Aumentar a quantidade de itens estocados.", "Tornar o trabalho mais burocrático.", "Aumentar a produtividade, a segurança e a organização.", "Diminuir a comunicação entre a equipe."] },
        { q: "Qual senso do 5S está mais relacionado à cultura organizacional e ao comprometimento de longo prazo?", a: 3, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Shitsuke (Disciplina)"] },
        { q: "Etiquetar prateleiras e caixas para facilitar a localização de itens é uma prática de qual senso?", a: 1, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Seiketsu (Padronização)"] },
        { q: "O programa 5S foi popularizado como parte de qual famoso sistema de produção?", a: 2, o: ["Fordismo", "Taylorismo", "Sistema Toyota de Produção", "Produção em Massa"] },
    ];
    
    const quizForm = document.createElement('form');
    quizForm.id = 's5-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `s5-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, '5S', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);
    
    container.append(
        backButton, 
        title,
        intro,
        comoSurgiu,
        s5Grid,
        quizSection,
        topicNav
    );
    return container;
}

function renderSupplyChainPage() {
    const container = document.createElement('div');
    container.className = 'supply-chain-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Cadeia de Suprimentos (Supply Chain)';
    
    function createSection(titleText, content, addClass = '') {
        const sectionEl = document.createElement('div');
        if (addClass) sectionEl.className = addClass;
        
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.innerHTML = content;
            sectionEl.appendChild(p);
        } else if (Array.isArray(content)) {
            sectionEl.appendChild(createTopicList(content));
        } else {
            sectionEl.appendChild(content);
        }
        return sectionEl;
    }

    const intro = createSection('O que é?', 'Fala, galera! A Cadeia de Suprimentos (ou Supply Chain, em inglês) é todo o caminho que um produto faz, desde a matéria-prima até chegar na sua mão. Pensa no seu celular: a cadeia de suprimentos inclui a mineração dos metais, a fabricação das peças, a montagem do aparelho, o transporte para a loja e, finalmente, a venda para você. É uma rede gigante que conecta fornecedores, fabricantes, distribuidores, lojas e clientes.');
    
    const diagramContainer = document.createElement('div');
    diagramContainer.className = 'supply-chain-diagram-container';
    diagramContainer.innerHTML = `
        <svg viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
            <style>
                .sc-node { transition: transform 0.3s ease; }
                .sc-node:hover { transform: scale(1.1); }
                .sc-text { font-family: 'Poppins', sans-serif; font-weight: 600; fill: var(--text-color); }
                .sc-subtext { font-family: 'Poppins', sans-serif; font-size: 12px; fill: var(--text-color-light); }
            </style>
            <!-- Flow Line -->
            <path d="M 75 75 H 725" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="8 4">
                <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1s" repeatCount="indefinite" />
            </path>
            
            <!-- Nodes -->
            <g class="sc-node" transform="translate(50, 75)">
                <circle r="40" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <text class="sc-text" text-anchor="middle" y="-5">Matéria-Prima</text>
                <text class="sc-subtext" text-anchor="middle" y="15">(Fornecedor)</text>
            </g>
            <g class="sc-node" transform="translate(225, 75)">
                <circle r="40" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <text class="sc-text" text-anchor="middle" y="-5">Produção</text>
                 <text class="sc-subtext" text-anchor="middle" y="15">(Fábrica)</text>
            </g>
            <g class="sc-node" transform="translate(400, 75)">
                <circle r="40" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <text class="sc-text" text-anchor="middle" y="-5">Armazenagem</text>
                 <text class="sc-subtext" text-anchor="middle" y="15">(Distribuidor)</text>
            </g>
            <g class="sc-node" transform="translate(575, 75)">
                <circle r="40" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <text class="sc-text" text-anchor="middle" y="-5">Varejo</text>
                 <text class="sc-subtext" text-anchor="middle" y="15">(Loja)</text>
            </g>
            <g class="sc-node" transform="translate(750, 75)">
                <circle r="40" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <text class="sc-text" text-anchor="middle" y="5">Cliente Final</text>
            </g>
        </svg>
    `;
    
    const logisticaVsSCM = createSection('Logística vs. Supply Chain Management (SCM)', 'Muita gente confunde, mas saca só a diferença: a <strong>Logística</strong> é uma parte da cadeia de suprimentos. Ela cuida da movimentação e armazenagem dos produtos (transporte, estoque, etc.). Já o <strong>Supply Chain Management (SCM)</strong> é a gestão de TUDO: desde a negociação com fornecedores, produção, logística, até o serviço ao cliente. Ou seja, a logística é o "como" (movimentar), e o SCM é o "o quê" e o "porquê" (gerenciar o processo todo).');
    
    const cardContainer = document.createElement('div');
    cardContainer.className = 'info-cards-container';

    const importanciaCard = document.createElement('div');
    importanciaCard.className = 'info-card';
    importanciaCard.innerHTML = '<h3>Importância da Gestão</h3>';
    importanciaCard.appendChild(createTopicList([
        'Redução de custos → Processos eficientes evitam desperdícios.',
        'Satisfação do cliente → O produto certo chega na hora certa.',
        'Vantagem competitiva → Empresas com boa gestão de SCM são mais rápidas e confiáveis.',
        'Flexibilidade → Consegue se adaptar a mudanças no mercado (como aumento de demanda).',
    ]));

    const etapasCard = document.createElement('div');
    etapasCard.className = 'info-card';
    etapasCard.innerHTML = '<h3>Principais Etapas</h3>';
    etapasCard.appendChild(createTopicList([
        'Planejamento → Prever a demanda e planejar a produção.',
        'Compras (Sourcing) → Escolher fornecedores e comprar matéria-prima.',
        'Produção (Fabricação) → Transformar a matéria-prima em produto.',
        'Distribuição e Logística → Armazenar e transportar o produto.',
        'Logística Reversa → Lidar com devoluções ou reciclagem de produtos.',
    ]));
    
    cardContainer.append(importanciaCard, etapasCard);

    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "O que é a Cadeia de Suprimentos (Supply Chain)?", a: 1, o: ["Apenas o transporte de produtos da fábrica para a loja.", "Todo o caminho do produto, da matéria-prima ao cliente final.", "Apenas o processo de venda no varejo.", "O gerenciamento do estoque dentro do armazém."] },
        { q: "Qual a principal diferença entre Logística e Supply Chain Management (SCM)?", a: 2, o: ["Não há diferença, são a mesma coisa.", "Logística gerencia tudo, enquanto SCM cuida apenas do transporte.", "A Logística é uma parte do SCM, que gerencia todo o processo.", "SCM foca em fornecedores e Logística foca em clientes."] },
        { q: "Qual etapa da cadeia de suprimentos envolve a escolha de fornecedores e a compra de matéria-prima?", a: 0, o: ["Compras (Sourcing)", "Produção", "Distribuição", "Logística Reversa"] },
        { q: "Uma boa gestão da cadeia de suprimentos resulta em:", a: 3, o: ["Aumento de custos e mais desperdícios.", "Clientes insatisfeitos com atrasos.", "Menos flexibilidade para o mercado.", "Redução de custos e clientes mais satisfeitos."] },
        { q: "A gestão de devoluções e reciclagem de produtos é responsabilidade de qual área?", a: 1, o: ["Planejamento", "Logística Reversa", "Produção", "Varejo"] },
        { q: "No diagrama da cadeia de suprimentos, qual é o elo que vem imediatamente antes do 'Cliente Final'?", a: 3, o: ["Produção", "Matéria-Prima", "Armazenagem", "Varejo (Loja)"] },
        { q: "O termo em inglês para Cadeia de Suprimentos é:", a: 2, o: ["Just in Time", "Kaizen", "Supply Chain", "Kanban"] },
        { q: "Prever a demanda dos clientes e planejar a produção faz parte de qual etapa do SCM?", a: 0, o: ["Planejamento", "Compras", "Distribuição", "Venda"] },
        { q: "Por que a gestão da cadeia de suprimentos é considerada uma vantagem competitiva?", a: 1, o: ["Porque aumenta o preço final do produto.", "Porque torna a empresa mais rápida, confiável e eficiente.", "Porque elimina a necessidade de fornecedores.", "Porque foca apenas na produção interna."] },
        { q: "A 'fábrica' está associada a qual etapa da cadeia de suprimentos?", a: 2, o: ["Compras", "Armazenagem", "Produção", "Cliente Final"] },
    ];
    
    const quizForm = document.createElement('form');
    quizForm.id = 'supply-chain-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `sc-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Cadeia de Suprimentos', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);
    
    const topicNav = createTopicNavigation(selectedTopic.id);
    
    container.append(
        backButton, 
        title,
        intro,
        diagramContainer,
        logisticaVsSCM,
        cardContainer,
        quizSection,
        topicNav
    );
    return container;
}

function renderComprasPage() {
    const container = document.createElement('div');
    container.className = 'compras-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Compras';

    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        applyStyles(h3, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--primary-color)'
        });
        sectionEl.appendChild(h3);
        const p = document.createElement('p');
        p.innerHTML = content;
        p.style.fontSize = '1.1rem';
        p.style.lineHeight = '1.8';
        sectionEl.appendChild(p);
        return sectionEl;
    }

    const introducao = createSection('Introdução', 'Fala, galera! Quando falamos de compras não estamos falando apenas de comprar aquilo que é necessário, mas sim de um departamento estratégico que adquire produtos, equipamentos, serviços, entre outros de maneira consciente, buscando o melhor preço, o melhor prazo e a melhor qualidade.');
    const definicao = createSection('Definição', 'O setor de compras é responsável por adquirir os produtos que estão em falta. Isso envolve uma série de fatores como fazer cotações de preço, prazo (em busca do menor tempo de entrega e a qualidade do produto de diferentes fornecedores.');
    const objetivo = createSection('Objetivo', 'O objetivo de Compras é utilizar planejamento estratégico para garantir o produto certo no momento certo, e com a qualidade certa. Além disso, garantir o menor custo possível é fundamental nas negociações.');
    const impacto = createSection('Impacto', 'Uma boa gestão de compras impacta diretamente no andamento dos negócios e sucesso da organização, quando Compras fecha uma negociação com o preço certo, a qualidade certa e o prazo certo, isso aumenta o lucro, a produtividade e a satisfação do cliente final.');
    const importancia = createSection('Importância', 'Ou seja, o setor de compras é fundamental para o bom funcionamento de qualquer organização, pois é responsável por garantir que todos os materiais necessários para que a produção, vendas e serviços da empresa não faltem e esses processos continuem em andamento.');
    const comunicacao = createSection('Comunicação', 'Compras deve sempre dialogar com os demais setores da empresa, para entender quais são as necessidades a ser supridas e quais os prazos para entrega. Essa falta de comunicação pode interromper uma venda ou produção, por isso é necessário que tenha esse diálogo positivo para evitar atrasos, perdas e desperdícios.');
    
    const cycleSection = document.createElement('div');
    const cycleTitle = document.createElement('h3');
    cycleTitle.textContent = 'O Ciclo de uma Compra';
     applyStyles(cycleTitle, {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '3rem',
        marginBottom: '2rem',
        textAlign: 'center',
        width: '100%'
    });
    const cycleGrid = document.createElement('div');
    cycleGrid.className = 'compras-cycle-grid';
    
    const steps = [
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`,
            title: "Comunicação da Necessidade",
            description: "O processo começa quando um setor identifica a falta de um material e informa a equipe de compras."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
            title: "Cotação de Fornecedores",
            description: "A equipe pesquisa e solicita propostas de diferentes fornecedores para comparar preços, prazos e qualidade."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
            title: "Análise e Negociação",
            description: "As propostas são analisadas e a equipe negocia as melhores condições com os fornecedores selecionados."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
            title: "Emissão do Pedido",
            description: "Após a negociação, um pedido de compra formal é gerado e enviado ao fornecedor."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M21.99 8c0-.55-.45-1-1-1h-1V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2H2c-.55 0-1 .45-1 1s.45 1 1 1h1v1H2c-.55 0-1 .45-1 1s.45 1 1 1h1v1H2c-.55 0-1 .45-1 1s.45 1 1 1h1v2c0 1.1.9 2 2 2h4v1c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1v-1h4c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1h1c.55 0 1-.45 1-1zM17 17H7V7h10v10z"/><path d="M16 11H8v2h8v-2z"/></svg>`,
            title: "Acompanhamento (Follow-up)",
            description: "A equipe de compras monitora o status do pedido para garantir que a entrega ocorra no prazo combinado."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M20.59 5.59L19 4l-9 9-4.5-4.5L4 10l6 6zM20 12v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h10l-2 2H6v4h12v-2.17l2-2z"/></svg>`,
            title: "Recebimento e Conferência",
            description: "O material é recebido, e a equipe confere se a quantidade e a qualidade estão de acordo com o pedido."
        },
        {
            icon: `<svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
            title: "Pagamento",
            description: "Após a conferência, o pagamento é liberado para o fornecedor, finalizando o ciclo de compra."
        }
    ];

    steps.forEach((step, index) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'compras-cycle-step';
        stepCard.innerHTML = `
            <div class="cycle-step-icon">${step.icon}</div>
            <div class="cycle-step-content">
                <h4><span>Passo ${index + 1}:</span> ${step.title}</h4>
                <p>${step.description}</p>
            </div>
        `;
        cycleGrid.appendChild(stepCard);
    });
    
    cycleSection.append(cycleTitle, cycleGrid);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'info-cards-container';

    const beneficiosCard = document.createElement('div');
    beneficiosCard.className = 'info-card';
    beneficiosCard.innerHTML = '<h3>Benefícios</h3>';
    beneficiosCard.appendChild(createTopicList([
        'Diminuição de custos;',
        'Agilidade no processo;',
        'Gestão eficiente do estoque;',
        'Tomada de decisões estratégicas;',
        'Prevenção de falhas na operação;',
        'Bom relacionamento com fornecedores;',
        'Satisfação e fidelização dos clientes.',
    ]));

    const exemplosContainer = document.createElement('div');
    exemplosContainer.style.flex = '1 1 300px';
    exemplosContainer.style.display = 'flex';
    exemplosContainer.style.flexDirection = 'column';
    exemplosContainer.style.gap = '1.5rem';

    const exemploPositivoCard = document.createElement('div');
    exemploPositivoCard.className = 'info-card';
    exemploPositivoCard.innerHTML = '<h4>Exemplo positivo</h4><p>O setor de compras de uma empresa de alimentos negociou com um novo fornecedor de embalagens e conseguiu 10% de desconto, frete gratuito e prazo de pagamento estendido para 60 dias. Graças a essa negociação, a empresa reduziu custos e melhorou o fluxo de caixa sem comprometer a qualidade dos produtos.</p>';
    
    const exemploNegativoCard = document.createElement('div');
    exemploNegativoCard.className = 'info-card';
    exemploNegativoCard.innerHTML = '<h4>Exemplo negativo</h4><p>Em uma determinada empresa, o setor de estoque não avisou o setor de compras que a quantidade de parafusos estava acabando. Como não houve comunicação, o material acabou no meio da produção, atrasando as entregas aos clientes e gerando prejuízo e insatisfação.</p>';

    exemplosContainer.append(exemploPositivoCard, exemploNegativoCard);
    cardsContainer.append(beneficiosCard, exemplosContainer);

    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o principal objetivo do setor de Compras, além de buscar o melhor preço?", a: 2, o: ["Comprar a maior quantidade possível de material.", "Apenas receber cotações de fornecedores.", "Garantir o produto certo, no momento certo e com a qualidade certa.", "Evitar a comunicação com outros setores."] },
        { q: "Uma boa gestão de compras impacta diretamente em quê?", a: 0, o: ["Aumento do lucro, produtividade e satisfação do cliente.", "Aumento dos custos de produção.", "Diminuição da qualidade dos produtos.", "Atrasos na produção como algo normal."] },
        { q: "Por que a comunicação entre o setor de Compras e os outros setores é fundamental?", a: 3, o: ["Para que o setor de compras trabalhe isoladamente.", "Porque a comunicação não é importante.", "Para gerar mais burocracia na empresa.", "Para evitar a interrupção da produção ou vendas por falta de material."] },
        { q: "No 'Exemplo Positivo', qual foi o principal resultado da negociação bem-sucedida?", a: 1, o: ["A empresa comprou embalagens de qualidade inferior.", "A empresa reduziu custos e melhorou o fluxo de caixa.", "O fornecedor aumentou o preço dos produtos.", "A entrega das embalagens atrasou."] },
        { q: "O que causou o problema no 'Exemplo Negativo'?", a: 2, o: ["Excesso de parafusos no estoque.", "Uma negociação de preço mal-sucedida.", "Falta de comunicação entre o estoque e o setor de compras.", "A má qualidade dos parafusos comprados."] },
        { q: "Qual destes NÃO é um benefício de uma boa gestão de compras?", a: 3, o: ["Diminuição de custos.", "Agilidade no processo.", "Bom relacionamento com fornecedores.", "Aumento de falhas na operação."] },
        { q: "O que o setor de compras faz após identificar a falta de um produto?", a: 0, o: ["Realiza cotações de preço, prazo e qualidade.", "Espera o produto acabar completamente.", "Compra do primeiro fornecedor que encontra.", "Cancela a produção do item."] },
        { q: "A aquisição de bens e serviços de forma consciente, buscando o melhor preço, prazo e qualidade, é a definição de:", a: 1, o: ["Setor de Vendas.", "Compras estratégicas.", "Recursos Humanos.", "Contabilidade."] },
        { q: "De acordo com o ciclo visual, qual etapa vem logo após a 'Cotação com Fornecedores'?", a: 0, o: ["Análise e Negociação", "Pagamento", "Recebimento", "Comunicação da Necessidade"] },
        { q: "A satisfação do cliente final pode ser afetada por uma má gestão de compras?", a: 0, o: ["Sim, pois pode causar atrasos na produção e entrega.", "Não, a gestão de compras não tem relação com o cliente.", "Apenas se o preço do produto aumentar.", "Apenas em empresas de serviço."] },
    ];
    
    const quizForm = document.createElement('form');
    quizForm.id = 'compras-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `compras-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Compras', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });

    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title,
        introducao,
        definicao,
        objetivo,
        impacto,
        importancia,
        comunicacao,
        cycleSection,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}


function renderRecebimentoPage() {
    const container = document.createElement('div');
    container.className = 'recebimento-page';
     applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });
    
    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { selectedTopic = null; });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Recebimento de Materiais';
    
    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        applyStyles(h3, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--primary-color)'
        });
        sectionEl.appendChild(h3);
        const p = document.createElement('p');
        p.innerHTML = content;
        p.style.fontSize = '1.1rem';
        p.style.lineHeight = '1.8';
        sectionEl.appendChild(p);
        return sectionEl;
    }

    const introducao = createSection('Introdução', 'Fala, galera! Sobre recebimento de materiais não estamos falando de receber aquilo que é necessário, mas sim de um departamento estratégico que recebe os produtos essenciais para serviços, realiza vistoria física dos materiais para identificar avarias, compara a quantidade recebida com a nota fiscal e verifica a qualidade dos produtos.');
    const definicao = createSection('Definição', 'O recebimento de mercadorias consiste em um conjunto de atividades necessárias para receber os produtos adquiridos dos fornecedores. Ou seja, é o processo que acontece assim que as mercadorias compradas são entregues na empresa.');
    const objetivo = createSection('Objetivo', 'O objetivo do recebimento de compras é utilizar planejamento estratégico para garantir que o material seja recebido de forma certa, e com a qualidade certa. Além disso, garantir que as necessidades da empresa sejam atendidas.');
    const importancia = createSection('Importância', `Longe de ser apenas uma função de apoio, o recebimento é uma etapa estratégica e prioritária na cadeia de suprimentos. Papel Estratégico na Logística e Geração de Receita O recebimento de materiais é um dos pilares da gestão de materiais. Ele é considerado a primeira etapa da cadeia de suprimentos interna da empresa.<br><br>Ou seja, o setor de recebimento é fundamental para o bom funcionamento de qualquer organização, pois é responsável por garantir que todos os materiais necessários para que a produção, vendas e serviços da empresa não faltem e esses processos continuem em andamento.`);
    const comunicacao = createSection('Comunicação', 'O setor de recebimento de materiais precisa dialogar e estar estritamente integrado com diversas áreas, tanto internas quanto externas à empresa, para garantir a eficiência do processo logístico e a conformidade do estoque. Departamentos Internos<br><br>O diálogo interno é vital para antecipar as entregas, garantir que o material recebido seja o correto e finalizar a transação financeira. A área de recebimento precisa estar integrada ao setor de compras, sabendo antecipadamente a programação de entregas.');

    // Interactive Animation Section
    const animationSection = document.createElement('div');
    animationSection.className = 'recebimento-animation-section';
    const animationTitle = document.createElement('h3');
    animationTitle.textContent = 'Interaja com o Processo de Recebimento';
    applyStyles(animationTitle, {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '3rem',
        marginBottom: '1rem',
        textAlign: 'center',
        width: '100%'
    });
    const animationContainer = document.createElement('div');
    animationContainer.className = 'recebimento-animation-container';
    
    animationContainer.innerHTML = `
        <div class="recebimento-svg-scene">
            <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                <!-- Supplier -->
                <g transform="translate(50, 100)">
                    <rect x="-40" y="-30" width="80" height="60" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                    <text x="0" y="5" text-anchor="middle" font-weight="600" fill="var(--text-color)">Fornecedor</text>
                </g>
                <!-- Company -->
                <g transform="translate(550, 100)">
                     <rect x="-50" y="-50" width="100" height="100" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                    <text x="0" y="5" text-anchor="middle" font-weight="600" fill="var(--text-color)">Empresa</text>
                </g>
                <!-- Road -->
                <line x1="90" y1="130" x2="500" y2="130" stroke="var(--text-color-subtle)" stroke-width="10"/>
                <line x1="90" y1="130" x2="500" y2="130" stroke="white" stroke-width="2" stroke-dasharray="10 10" class="road-lines"/>
                <!-- Truck -->
                <g id="truck-group">
                    <path d="M 0 0 L 0 -25 L 25 -25 L 35 -15 L 35 0 Z" fill="var(--primary-color)" transform="translate(100, 120)"/>
                    <rect x="70" y="95" width="40" height="25" fill="#fec700"/>
                    <circle cx="80" cy="120" r="8" fill="#333"/>
                    <circle cx="125" cy="120" r="8" fill="#333"/>
                    <animateMotion id="truck-animation" xlink:href="#truck-group" dur="4s" begin="indefinite" fill="freeze" path="M 0 0 H 380" />
                </g>
            </svg>
        </div>
        <div class="recebimento-controls">
             <button id="start-recebimento-btn" class="cta-button">Iniciar Recebimento</button>
        </div>
        <div class="step-display-container">
            <div class="recebimento-step" id="step1">
                <h4>1. Checagem da Nota Fiscal</h4>
                <p>Verificar se o pedido corresponde ao que foi entregue.</p>
            </div>
            <div class="recebimento-step" id="step2">
                <h4>2. Inspeção Quantitativa</h4>
                <p>Contar os volumes e conferir se a quantidade está correta.</p>
            </div>
            <div class="recebimento-step" id="step3">
                <h4>3. Inspeção Qualitativa</h4>
                <p>Analisar a qualidade e verificar se há avarias nos produtos.</p>
            </div>
             <div class="recebimento-step" id="step4">
                <h4>4. Endereçamento</h4>
                <p>Enviar os materiais conferidos para o estoque.</p>
            </div>
        </div>
    `;
    
    const startBtn = animationContainer.querySelector('#start-recebimento-btn');
    const animationEl = animationContainer.querySelector('#truck-animation');
    const steps = animationContainer.querySelectorAll('.recebimento-step');
    
    startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', 'true');
        startBtn.textContent = 'Em trânsito...';
        steps.forEach(s => s.classList.remove('visible'));

        // Fix: Use a type guard to ensure animationEl is an SVGAnimationElement before calling beginElement.
        if (animationEl instanceof SVGAnimationElement) {
            animationEl.beginElement();
        }
        
        setTimeout(() => {
            startBtn.textContent = 'Entrega Realizada!';
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('visible');
                }, index * 700);
            });
            setTimeout(() => {
                startBtn.removeAttribute('disabled');
                startBtn.textContent = 'Reiniciar Animação';
            }, steps.length * 700);
        }, 4000); // Same as animation duration
    });
    
    animationSection.append(animationTitle, animationContainer);
    
    
    // Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';
    
    const quizData = [
        { q: "Qual é o objetivo principal do processo de recebimento de materiais?", a: 2, o: ["Apenas guardar os produtos o mais rápido possível.", "Pagar os fornecedores no prazo.", "Garantir que o material recebido esteja certo e com a qualidade certa.", "Vender os produtos recebidos imediatamente."] },
        { q: "O recebimento de materiais é considerado a primeira etapa de qual processo interno?", a: 1, o: ["Vendas", "Cadeia de suprimentos interna", "Marketing", "Recursos Humanos"] },
        { q: "Por que a comunicação do setor de recebimento com o de compras é vital?", a: 0, o: ["Para saber antecipadamente a programação de entregas.", "Para negociar descontos de última hora.", "Para cancelar pedidos já enviados.", "Não é vital, eles operam de forma independente."] },
        { q: "O que é a inspeção qualitativa no recebimento?", a: 3, o: ["Contar o número de caixas recebidas.", "Verificar o preço na nota fiscal.", "Pesar todos os produtos.", "Verificar a qualidade e identificar possíveis avarias nos produtos."] },
        { q: "O que acontece logo após a entrega da mercadoria na empresa?", a: 2, o: ["O produto é enviado diretamente para a produção.", "O pagamento é feito imediatamente.", "Inicia-se o processo de recebimento e conferência.", "O fornecedor leva a mercadoria de volta."] },
        { q: "Qual o risco de uma falha na comunicação entre o recebimento e outros setores?", a: 1, o: ["Otimização do tempo e recursos.", "Inconsistências no estoque e possíveis paradas na produção.", "Aumento automático do lucro da empresa.", "Melhora no relacionamento com o fornecedor."] },
        { q: "Comparar a quantidade de itens recebidos com a nota fiscal é parte de qual etapa?", a: 0, o: ["Inspeção quantitativa", "Inspeção qualitativa", "Endereçamento", "Pagamento ao fornecedor"] },
        { q: "Na animação interativa, qual é a última etapa do processo de recebimento mostrado?", a: 3, o: ["Checagem da Nota Fiscal", "Inspeção Qualitativa", "Inspeção Quantitativa", "Endereçamento"] },
        { q: "Por que o recebimento de materiais é considerado uma etapa estratégica?", a: 2, o: ["Porque é a etapa mais cara de toda a logística.", "Porque é a única etapa que envolve contato com o fornecedor.", "Porque garante a conformidade do estoque e a qualidade dos insumos.", "Porque é a etapa mais rápida e fácil de executar."] },
        { q: "Um recebimento eficiente ajuda a garantir:", a: 1, o: ["Que a empresa pague mais caro pelos produtos.", "A exatidão do estoque e a qualidade dos materiais.", "Que o setor de compras trabalhe menos.", "A redução do número de fornecedores."] }
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'recebimento-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `recebimento-question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });
    
    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Recebimento de Materiais', submitButton, resetButton));

    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);
    
    container.append(
        backButton,
        title,
        introducao,
        definicao,
        objetivo,
        importancia,
        comunicacao,
        animationSection,
        quizSection,
        topicNav
    );
    return container;
}


function renderConteudoPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '10rem' });
    
    if (selectedTopic) {
        let topicContent;
        switch (selectedTopic.id) {
            case 'logistica-integrada':
                topicContent = renderLogisticaIntegradaPage();
                break;
            case 'just-in-time':
                topicContent = renderJustInTimePage();
                break;
            case 'kanban':
                topicContent = renderKanbanPage();
                break;
            case 'kaizen':
                topicContent = renderKaizenPage();
                break;
            case '5s':
                topicContent = render5SPage();
                break;
            case 'cadeia-de-suprimentos':
                topicContent = renderSupplyChainPage();
                break;
            case 'compras':
                topicContent = renderComprasPage();
                break;
            case 'recebimento-de-materiais':
                topicContent = renderRecebimentoPage();
                break;
            default:
                const title = document.createElement('h1');
                title.textContent = selectedTopic.title;
                const content = document.createElement('p');
                content.textContent = selectedTopic.content;
                topicContent = document.createElement('div');
                topicContent.append(title, content);
        }
        section.appendChild(topicContent);

    } else {
        const title = document.createElement('h2');
        applyStyles(title, styles.sectionTitle);
        title.textContent = 'Conteúdos Educacionais';
        title.style.textAlign = 'center';

        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        applyStyles(searchContainer, {
            margin: '2rem 0',
            width: '100%',
            maxWidth: '600px',
        });
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Pesquisar conteúdo...';
        applyStyles(searchInput, {
            width: '100%',
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '50px',
            border: `1px solid var(--search-border)`,
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
        });
        searchContainer.appendChild(searchInput);
        
        const cardGrid = document.createElement('div');
        cardGrid.className = 'card-grid';
        applyStyles(cardGrid, {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1200px',
            marginTop: '2rem',
        });

        const createCard = (item) => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            applyStyles(card, {
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: `0 4px 12px var(--card-shadow)`,
            });
            card.innerHTML = `
                <h3 style="margin-top:0; color:var(--primary-color);">${item.title}</h3>
                <p style="color:var(--text-color-light);">${item.intro}</p>
            `;
            card.addEventListener('click', () => {
              transitionTo(() => {
                selectedTopic = item;
              });
            });
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = `0 10px 20px var(--card-shadow-hover)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = `0 4px 12px var(--card-shadow)`;
            });
            return card;
        };

        const renderCards = (filter = '') => {
            cardGrid.innerHTML = '';
            const filteredTopics = conteudosList.filter(topic => 
                topic.title.toLowerCase().includes(filter.toLowerCase()) || 
                topic.intro.toLowerCase().includes(filter.toLowerCase())
            );
            filteredTopics.forEach(item => {
                cardGrid.appendChild(createCard(item));
            });
        };
        
        searchInput.addEventListener('input', (e) => {
            // Fix: Removed TypeScript type casting 'as HTMLInputElement'.
            // Fix: Added instanceof check to ensure e.target is an HTMLInputElement and has a 'value' property.
            if (e.target instanceof HTMLInputElement) {
                renderCards(e.target.value);
            }
        });

        renderCards();
        section.append(title, searchContainer, cardGrid);
    }
    
    return section;
}

function renderGamesPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '10rem' });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, textAlign: 'center' });
    title.textContent = 'Aprenda Jogando';
    
    const gamesGrid = document.createElement('div');
    gamesGrid.className = 'games-grid';
    
    // Game 1: Delivery Dash
    const game1Card = document.createElement('div');
    game1Card.className = 'game-card';
    game1Card.innerHTML = `<h3>Delivery Dash: O Desafio do Tempo Certo</h3>`;
    
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    
    const canvas = document.createElement('canvas');
    canvas.id = 'game-canvas';
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score-display';
    scoreDisplay.textContent = 'Entregas: 0';
    
    const overlay = document.createElement('div');
    overlay.id = 'game-overlay';
    overlay.innerHTML = `
        <h2>Delivery Dash</h2>
        <p>Pilote o caminhão e colete as caixas corretas para entregar aos clientes antes que o tempo acabe! Cuidado com os obstáculos no caminho.</p>
    `;

    const startButton = CtaButton('Iniciar Jogo', () => startGame(canvas, scoreDisplay, overlay));
    overlay.appendChild(startButton);
    
    gameContainer.append(canvas, scoreDisplay, overlay);
    game1Card.appendChild(gameContainer);
    
    // Game 2: Placeholder
    const game2Card = document.createElement('div');
    game2Card.className = 'game-card placeholder';
    game2Card.innerHTML = `
        <h3>Em Breve</h3>
        <div class="placeholder-content">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-color-subtle); margin-bottom: 1rem;"><path d="M16 12V4H17V2H7V4H8V12H6V4H5V2H2V4H3V14H5V22H7V14H9V22H11V14H13V22H15V14H17V12H16M14,12H10V4H14V12Z" /></svg>
            <p>Novo jogo em desenvolvimento!</p>
        </div>
    `;

    gamesGrid.append(game1Card, game2Card);
    section.append(title, gamesGrid);

    return section;
}

// Game Logic
function startGame(canvas, scoreDisplay, overlay) {
    overlay.style.display = 'none';
    scoreDisplay.style.display = 'block';

    // Fix: Removed TypeScript type casting '(canvas as HTMLCanvasElement)'.
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 450;
    
    let score = 0;
    let gameOver = false;
    
    const truck = { x: 50, y: canvas.height - 70, width: 80, height: 50, speed: 5, dy: 0, gravity: 0.5, jumpPower: -12, onGround: true };
    const obstacles = [];
    const packages = [];
    let frame = 0;

    function drawTruck() {
        ctx.fillStyle = '#fec700'; // Primary color
        ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
        ctx.fillStyle = '#333';
        ctx.fillRect(truck.x + 10, truck.y + truck.height - 10, 15, 15); // Back wheel
        ctx.fillRect(truck.x + truck.width - 25, truck.y + truck.height - 10, 15, 15); // Front wheel
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(truck.x + truck.width - 30, truck.y + 10, 25, 25); // Window
    }
    
    function drawRoad() {
        ctx.fillStyle = '#555'; // Road color
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.setLineDash([20, 20]);
        ctx.lineDashOffset = -frame * 0.1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 10);
        ctx.lineTo(canvas.width, canvas.height - 10);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function createObstacle() {
        const height = Math.random() * 50 + 20;
        obstacles.push({ x: canvas.width, y: canvas.height - 20 - height, width: 30, height: height });
    }

    function createPackage() {
        packages.push({ x: canvas.width, y: canvas.height - 100, width: 30, height: 30 });
    }

    function drawObstacles() {
        ctx.fillStyle = 'red';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }
    
    function drawPackages() {
        ctx.fillStyle = 'brown';
        packages.forEach(pkg => {
            ctx.fillRect(pkg.x, pkg.y, pkg.width, pkg.height);
             ctx.strokeStyle = 'white';
             ctx.lineWidth = 2;
             ctx.strokeRect(pkg.x, pkg.y, pkg.width, pkg.height);
        });
    }

    function update() {
        if (gameOver) return;

        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        drawRoad();

        // Truck
        truck.dy += truck.gravity;
        truck.y += truck.dy;
        if (truck.y > canvas.height - 20 - truck.height) {
            truck.y = canvas.height - 20 - truck.height;
            truck.dy = 0;
            truck.onGround = true;
        }
        drawTruck();
        
        // Obstacles
        if (frame % 150 === 0) createObstacle();
        obstacles.forEach((obs, index) => {
            obs.x -= 4; // Obstacle speed
            if (obs.x + obs.width < 0) obstacles.splice(index, 1);
            
            if (truck.x < obs.x + obs.width && truck.x + truck.width > obs.x && truck.y < obs.y + obs.height && truck.y + truck.height > obs.y) {
                endGame();
            }
        });
        drawObstacles();

        // Packages
        if (frame % 100 === 0) createPackage();
        packages.forEach((pkg, index) => {
            pkg.x -= 4; // Package speed
            if (pkg.x + pkg.width < 0) packages.splice(index, 1);

            // Fix: Replaced out-of-scope 'obs' variable with 'pkg' for correct package collision detection.
            if (truck.x < pkg.x + pkg.width && truck.x + truck.width > pkg.x && truck.y < pkg.y + pkg.height && truck.y + truck.height > pkg.y) {
                packages.splice(index, 1);
                score++;
                scoreDisplay.textContent = `Entregas: ${score}`;
            }
        });
        drawPackages();

        requestAnimationFrame(update);
    }
    
    function endGame() {
        gameOver = true;
        overlay.style.display = 'flex';
        overlay.innerHTML = `
            <h2>Fim de Jogo!</h2>
            <p>Sua pontuação final: ${score} entregas.</p>
        `;
        const restartButton = CtaButton('Jogar Novamente', () => {
            // Reset game state and restart
            score = 0;
            gameOver = false;
            obstacles.length = 0;
            packages.length = 0;
            frame = 0;
            truck.y = canvas.height - 70;
            scoreDisplay.textContent = 'Entregas: 0';
            startGame(canvas, scoreDisplay, overlay);
        });
        overlay.appendChild(restartButton);
    }

    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.code === 'ArrowUp') && truck.onGround) {
            truck.dy = truck.jumpPower;
            truck.onGround = false;
        }
    });

    update();
}


function renderQuemSomosPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '10rem' });
    const container = document.createElement('div');
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, marginBottom: '2rem' });
    title.textContent = 'Perguntas Frequentes';

    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';
    applyStyles(faqContainer, {
      width: '100%',
      textAlign: 'left'
    });

    const faqs = [
        { q: "O que é o Descomplica Logística?", a: "É uma plataforma educativa com o objetivo de ensinar conceitos de logística de forma simples, didática e visual. Usamos textos, vídeos e imagens para tornar o aprendizado mais acessível a todos." },
        { q: "Para quem é este site?", a: "Para estudantes, profissionais da área que buscam reciclar conhecimentos, e qualquer pessoa curiosa sobre como os produtos chegam até elas. Nossa abordagem é feita para ser compreendida por todos, desde o iniciante até o mais experiente." },
        { q: "O conteúdo é gratuito?", a: "Sim, todo o conteúdo educacional e os jogos disponíveis no Descomplica Logística são 100% gratuitos." },
        { q: "Como posso usar o assistente de IA?", a: "Clique no ícone de chat no canto inferior direito da tela. Você pode fazer perguntas sobre os temas de logística abordados no site, e nosso assistente usará o conteúdo da página para te dar uma resposta direta e precisa." },
        { q: "Com que frequência o conteúdo é atualizado?", a: "Estamos sempre trabalhando para adicionar novos tópicos, aprofundar os existentes e criar novas formas interativas de aprendizado. Siga-nos para ficar por dentro das novidades!" }
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        applyStyles(faqItem, {
            marginBottom: '1rem',
            border: `1px solid var(--card-border)`,
            borderRadius: '12px',
            overflow: 'hidden'
        });

        const question = document.createElement('div');
        question.className = 'faq-question';
        question.innerHTML = `<p>${faq.q}</p><span>+</span>`;
        applyStyles(question, {
            padding: '1.2rem 1.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)'
        });
        applyStyles(question.querySelector('p'), { margin: 0 });

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = `<p>${faq.a}</p>`;
        applyStyles(answer, {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
            backgroundColor: 'var(--timeline-bg)'
        });
        applyStyles(answer.querySelector('p'), { 
            margin: 0,
            padding: '1.2rem 1.5rem',
            lineHeight: '1.7'
        });
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            document.querySelectorAll('.faq-answer').forEach(el => {
                // Fix: Added instanceof check to ensure element is an HTMLElement before accessing style.
                if (el instanceof HTMLElement) {
                    el.style.maxHeight = '0';
                    if (el.previousElementSibling && el.previousElementSibling.querySelector('span')) {
                      el.previousElementSibling.querySelector('span').textContent = '+';
                    }
                }
            });
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('span').textContent = '-';
            }
        });
        
        faqItem.append(question, answer);
        faqContainer.appendChild(faqItem);
    });

    container.append(title, faqContainer);
    section.appendChild(container);
    return section;
}

function renderHeader() {
  const header = document.createElement('header');
  header.id = 'main-header';
  applyStyles(header, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'var(--header-bg)',
    backdropFilter: 'blur(10px)',
    zIndex: '1000',
    borderBottom: '1px solid var(--footer-border)',
    transition: 'transform 0.3s ease-in-out',
  });

  const logo = document.createElement('a');
  logo.href = '#';
  logo.textContent = 'Descomplica Logística';
  applyStyles(logo, {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-color)',
    textDecoration: 'none',
  });
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('inicio');
  });

  const nav = document.createElement('nav');
  applyStyles(nav, {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  });

  const navLinks = [
    { text: 'Início', page: 'inicio' },
    { text: 'Conteúdos', page: 'conteudos' },
    { text: 'Jogos', page: 'jogos' },
    { text: 'FAQ', page: 'quem-somos' },
  ];

  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = `#${link.page}`;
    a.textContent = link.text;
    applyStyles(a, {
      color: 'var(--text-color-light)',
      textDecoration: 'none',
      fontWeight: '600',
      padding: '0.5rem 0.8rem',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    });
    if (link.page === currentPage) {
      a.style.color = 'var(--text-color)';
      a.style.backgroundColor = 'var(--button-bg)';
    }
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.page);
    });
    nav.appendChild(a);
  });
  
  const themeToggleButton = document.createElement('button');
  themeToggleButton.className = 'theme-toggle-button';
  themeToggleButton.innerHTML = currentTheme === 'light' ? MoonIcon : SunIcon;
  themeToggleButton.setAttribute('aria-label', `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`);
  themeToggleButton.addEventListener('click', toggleTheme);

  nav.appendChild(themeToggleButton);
  header.append(logo, nav);
  
  // Hide header on scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if(window.scrollY > lastScrollY && window.scrollY > 80) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
  });

  return header;
}

function renderFooter() {
  const footer = document.createElement('footer');
  applyStyles(footer, {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: 'var(--footer-bg)',
    borderTop: '1px solid var(--footer-border)',
    marginTop: 'auto',
    width: '100%',
  });

  const p = document.createElement('p');
  p.textContent = `© ${new Date().getFullYear()} Descomplica Logística. Todos os direitos reservados.`;
  applyStyles(p, {
    margin: '0',
    color: 'var(--text-color-subtle)',
  });

  footer.appendChild(p);
  return footer;
}

function renderChatWidget() {
    const fab = document.createElement('button');
    fab.id = 'ai-chat-fab';
    fab.setAttribute('aria-label', 'Abrir chat com assistente de IA');
    fab.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;

    const widget = document.createElement('div');
    widget.id = 'ai-chat-widget';

    widget.innerHTML = `
        <div class="chat-header">
            <h3>Assistente de Logística</h3>
            <button class="chat-close-btn" aria-label="Fechar chat">×</button>
        </div>
        <div class="chat-messages">
             <div class="chat-message ai">Olá! Como posso ajudar com suas dúvidas sobre logística?</div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Digite sua pergunta...">
            <button id="chat-send-btn" aria-label="Enviar mensagem">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    `;

    fab.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        widget.classList.toggle('open');
        if (isChatOpen) {
            // Fix: Removed TypeScript type casting 'as HTMLInputElement'.
            const chatInput = widget.querySelector('#chat-input');
            // Fix: Added instanceof check to ensure element is an HTMLElement before calling focus.
            if (chatInput instanceof HTMLElement) {
                chatInput.focus();
            }
        }
    });

    widget.querySelector('.chat-close-btn').addEventListener('click', () => {
        isChatOpen = false;
        widget.classList.remove('open');
    });
    
    const messagesContainer = widget.querySelector('.chat-messages');
    // Fix: Removed TypeScript type casting 'as HTMLInputElement'.
    const input = widget.querySelector('#chat-input');
    
    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const handleSend = async () => {
        // Fix: Added instanceof check to ensure input is an HTMLInputElement.
        if (input instanceof HTMLInputElement && messagesContainer) {
            const userMessage = input.value.trim();
            if (!userMessage) return;

            addMessage(userMessage, 'user');
            input.value = '';
            addMessage('Pensando...', 'ai');

            const context = selectedTopic ? selectedTopic.content : '';
            const aiResponse = await getAiResponse(userMessage, context);
            
            const lastMessage = messagesContainer.lastChild;
            // Fix: Added instanceof check to ensure lastMessage is an Element.
            if(lastMessage instanceof Element && lastMessage.classList.contains('ai')) {
                lastMessage.textContent = aiResponse;
            } else {
                addMessage(aiResponse, 'ai');
            }
        }
    };
    
    widget.querySelector('#chat-send-btn').addEventListener('click', handleSend);
    // Fix: Removed TypeScript type annotation from event parameter.
    if (input) {
        input.addEventListener('keypress', (e) => {
            // Fix: Added type guard to ensure e has the 'key' property.
            if ('key' in e && e.key === 'Enter') {
                handleSend();
            }
        });
    }

    document.body.append(fab, widget);
}

function render() {
  if (!root) return;

  root.innerHTML = '';
  
  const header = renderHeader();
  const main = document.createElement('main');
  main.className = 'page-fade-in';
  
  let pageContent;
  switch (currentPage) {
    case 'inicio':
      pageContent = renderInicioPage();
      break;
    case 'conteudos':
      pageContent = renderConteudoPage();
      break;
    case 'jogos':
      pageContent = renderGamesPage();
      break;
    case 'quem-somos':
      pageContent = renderQuemSomosPage();
      break;
    default:
      pageContent = renderInicioPage();
  }
  main.appendChild(pageContent);
  
  const footer = renderFooter();

  root.append(header, main, footer);
  
  if (!document.getElementById('ai-chat-fab')) {
      renderChatWidget();
  }

  isTransitioning = false;
}

initTheme();
render();
