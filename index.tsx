// FIX: Removed invalid file markers from the top of the file.
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

function transitionTo(updateState: () => void) {
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

function renderInicioPage() {
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
  return section;
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
        const target = e.target as HTMLElement;
        if (target.classList.contains('timeline-nav-item')) {
            timelineNav.querySelectorAll('.timeline-nav-item').forEach(btn => btn.classList.remove('active'));
            timelineContentContainer.querySelectorAll('.timeline-content').forEach(content => content.classList.remove('active'));
            
            target.classList.add('active');
            const contentId = target.dataset.target;
            document.getElementById(contentId).classList.add('active');
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
      { q: "Qual era o foco principal da logística tradicional?", a: 0, o: ["Apenas transporte e armazenagem.", "Satisfação do cliente.", "Gestão da cadeia de suprimentos."] },
      { q: "O que a Logística Integrada busca unificar?", a: 1, o: ["Apenas o marketing e as vendas.", "Todas as etapas da cadeia de suprimentos.", "Somente a produção e o estoque."] },
      { q: "Em que década surgiu o conceito de Supply Chain Management?", a: 2, o: ["Década de 1950", "Década de 1970", "Década de 1980"] },
      { q: "Qual o resultado final esperado para o cliente com a Logística Integrada?", a: 2, o: ["Buscar o produto na fábrica", "Produto chega com atraso", "Produto certo, no lugar e hora certa"] },
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

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
    mindMapImage.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAUACgADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-igA-...';
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
      { q: "Qual é o objetivo principal do Just in Time?", a: 2, o: ["Aumentar o tamanho dos estoques para emergências.", "Produzir o máximo possível, o tempo todo.", "Produzir e entregar apenas o necessário, no momento exato."] },
      { q: "O JIT opera com um sistema de produção chamado:", a: 1, o: ["Produção 'empurrada'.", "Produção 'puxada' pela demanda.", "Produção 'antecipada'."] },
      { q: "Qual é uma das principais desvantagens do sistema JIT?", a: 1, o: ["Aumento dos custos de armazenamento.", "Alta dependência de fornecedores confiáveis.", "Excesso de flexibilidade na produção."] },
      { q: "O JIT é considerado um dos pilares de qual filosofia de produção?", a: 1, o: ["Produção em massa.", "Produção enxuta (Lean Manufacturing).", "Produção artesanal."] },
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="jit-question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="jit-question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

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
        { q: "O que significa a palavra japonesa 'kanban'?", a: 1, o: ["Melhoria Contínua", "Cartão ou sinal visual", "Produção Enxuta"] },
        { q: "Qual é o principal objetivo de limitar o Trabalho em Progresso (WIP)?", a: 2, o: ["Aumentar o número de tarefas simultâneas.", "Documentar todo o processo.", "Evitar sobrecarga e aumentar o foco da equipe."] },
        { q: "O Kanban é considerado um método de gestão:", a: 1, o: ["Apenas para fábricas.", "Visual.", "Apenas para projetos de software."] },
        { q: "A prática de revisar e ajustar processos regularmente no Kanban é chamada de:", a: 1, o: ["WIP", "Melhoria Contínua (Kaizen)", "Fluxo de Trabalho"] },
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="kanban-question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="kanban-question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

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
    const comoSurgiu = createSection('Como surgiu?', 'Kaizen é uma filosofia japonesa de melhoria contínua, que busca aumentar a produtividade, a qualidade e a eficiência por meio de pequenas mudanças constantes. Surgiu no Japão pós-Segunda Guerra Mundial, quando empresas precisavam se reconstruir e melhorar seus processos sem grandes investimentos. Inspirado em métodos de controle de qualidade, o Kaizen valoriza a participação de todos os funcionários e a eliminação de desperdícios, tornando-se um pilar da indústria japonesa, especialmente na Toyota');
    const importancia = createSection('Importância do KAIZEN', 'A importância do Kaizen está em promover a melhoria contínua dentro de organizações, tornando processos mais eficientes, reduzindo desperdícios e aumentando a qualidade de produtos e serviços. Ele envolve todos os colaboradores, estimulando a participação, o aprendizado e a inovação constantes. Além disso, o Kaizen ajuda a criar uma cultura organizacional de responsabilidade e colaboração, garantindo que pequenas mudanças diárias se transformem em grandes resultados ao longo do tempo, fortalecendo a competitividade e a sustentabilidade da empresa.');

    const mainImage = document.createElement('div');
    mainImage.className = 'kaizen-main-image';
    mainImage.innerHTML = `
        <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:hsla(47, 100%, 80%, 1);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:var(--primary-color);stop-opacity:1" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.5"/>
                    </feComponentTransfer>
                    <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(250, 125)" filter="url(#shadow)">
                <!-- Arrows -->
                <path d="M 0 -80 A 80 80 0 1 1 -56.57 -56.57" fill="none" stroke="url(#grad1)" stroke-width="10"/>
                <path d="M -50 -70 L -56.57 -56.57 L -70 -50" fill="none" stroke="var(--primary-color)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 80 0 A 80 80 0 0 1 -56.57 56.57" fill="none" stroke="url(#grad1)" stroke-width="10" transform="rotate(120)"/>
                <path d="M -50 70 L -56.57 56.57 L -70 50" fill="none" stroke="var(--primary-color)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="rotate(120)"/>
                <path d="M 80 0 A 80 80 0 0 1 -56.57 56.57" fill="none" stroke="url(#grad1)" stroke-width="10" transform="rotate(240)"/>
                <path d="M -50 70 L -56.57 56.57 L -70 50" fill="none" stroke="var(--primary-color)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="rotate(240)"/>
                <!-- Texts -->
                <text x="0" y="-90" text-anchor="middle" font-size="16" font-weight="600" fill="var(--text-color)">Planejar</text>
                <text x="110" y="50" text-anchor="middle" font-size="16" font-weight="600" fill="var(--text-color)">Executar</text>
                <text x="-105" y="50" text-anchor="middle" font-size="16" font-weight="600" fill="var(--text-color)">Verificar & Agir</text>
                <text x="0" y="8" text-anchor="middle" font-size="24" font-weight="bold" fill="var(--primary-color)">KAIZEN</text>
            </g>
        </svg>
    `;

    const pdcaCardsContainer = document.createElement('div');
    pdcaCardsContainer.className = 'info-cards-container';
    pdcaCardsContainer.style.marginTop = '1rem';

    const planCard = document.createElement('div');
    planCard.className = 'info-card';
    planCard.innerHTML = `
        <h3>Planejar (Plan)</h3>
        <p>Identifique um problema ou uma oportunidade de melhoria. Analise o processo atual, estabeleça uma meta clara e mensurável, e desenvolva um plano de ação detalhado para alcançar essa meta.</p>
    `;

    const doCard = document.createElement('div');
    doCard.className = 'info-card';
    doCard.innerHTML = `
        <h3>Executar (Do)</h3>
        <p>Implemente o plano de ação em uma escala pequena e controlada. O objetivo desta fase é testar a mudança proposta, executar as tarefas definidas e coletar dados sobre o desempenho para análise posterior.</p>
    `;

    const checkActCard = document.createElement('div');
    checkActCard.className = 'info-card';
    checkActCard.innerHTML = `
        <h3>Verificar & Agir (Check & Act)</h3>
        <p><b>Verificar:</b> Compare os resultados obtidos com as metas planejadas. <b>Agir:</b> Se a mudança foi bem-sucedida, padronize o novo processo. Se não, analise o que deu errado, aprenda com a experiência e reinicie o ciclo com um novo plano.</p>
    `;

    pdcaCardsContainer.append(planCard, doCard, checkActCard);

    const aplicacao = createSection('Aplicação', 'O Kaizen é aplicado na prática para melhorar continuamente processos em produção, logística, serviços e gestão, com foco em aumentar a eficiência, reduzir desperdícios, otimizar recursos e envolver todos os colaboradores na busca por melhores resultados.');
    const objetivo = createSection('Objetivo', 'O objetivo do Kaizen é promover a melhoria contínua em processos, produtos e serviços, tornando-os mais eficientes, ágeis e de maior qualidade. Ele busca eliminar desperdícios, reduzir erros, otimizar recursos e envolver todos os colaboradores na busca por pequenas mudanças diárias que, somadas, geram grandes resultados ao longo do tempo.');
    const logistica = createSection('KAIZEN na Logística', 'O Kaizen na logística é a aplicação da filosofia de melhoria contínua para tornar os processos logísticos mais eficientes, ágeis e econômicos. Ele busca pequenas melhorias diárias, como redução de desperdícios, otimização de rotas, reorganização de estoques e automatização de tarefas, envolvendo todos os colaboradores na análise e aprimoramento de cada etapa. Com isso, a logística se torna mais rápida, segura e sustentável, gerando grandes resultados ao longo do tempo.');
    
    const sideImages = document.createElement('div');
    sideImages.className = 'kaizen-side-images-container';
    sideImages.innerHTML = `
      <div class="kaizen-side-image">
        <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="190" height="140" rx="10" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
            <path d="M 50 110 L 70 50 L 90 90 L 110 70 L 130 100 L 150 80" stroke="var(--primary-color)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="50" cy="110" r="4" fill="var(--primary-color)"/>
            <circle cx="150" cy="80" r="4" fill="var(--primary-color)"/>
            <path d="M 150 80 L 170 60" stroke-width="3" stroke="var(--primary-color)" stroke-linecap="round" stroke-dasharray="4 4"/>
            <path d="M 163 53 L 170 60 L 177 53" stroke-width="3" fill="none" stroke="var(--primary-color)" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="100" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-color)">Otimização de Processos</text>
        </svg>
        <p>Analisar e otimizar processos existentes.</p>
      </div>
      <div class="kaizen-side-image">
        <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="190" height="140" rx="10" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
            <g transform="translate(100, 80)">
                <circle cx="0" cy="-10" r="20" fill="hsla(47, 100%, 80%, 1)"/>
                <path d="M 0 -30 L -5 -25 M 0 -30 L 5 -25 M 0 10 L -5 15 M 0 10 L 5 15" stroke-width="2" stroke="var(--primary-color)"/>
                <circle cx="-40" cy="20" r="20" fill="hsla(47, 100%, 80%, 1)"/>
                <path d="M -40 0 L -45 5 M -40 0 L -35 5 M -40 40 L -45 35 M -40 40 L -35 35" stroke-width="2" stroke="var(--primary-color)"/>
                <circle cx="40" cy="20" r="20" fill="hsla(47, 100%, 80%, 1)"/>
                <path d="M 40 0 L 35 5 M 40 0 L 45 5 M 40 40 L 35 35 M 40 40 L 45 35" stroke-width="2" stroke="var(--primary-color)"/>
            </g>
            <text x="100" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text-color)">Participação de Todos</text>
        </svg>
        <p>Envolvimento de toda a equipe.</p>
      </div>
    `;

    const conceitos = createSection('Conceitos importantes', [
        'Melhoria contínua: Pequenas mudanças diárias que, somadas, geram grandes resultados.',
        'Eliminação de desperdícios (Muda): Reduzir tudo que não agrega valor, como tempo ocioso, retrabalho e excesso de estoque.',
        'Participação de todos: Todos os colaboradores, do chão de fábrica à gestão, contribuem com ideias de melhoria.',
        'Foco em processos: Analisar e otimizar processos existentes em vez de apenas resultados finais.',
        'Padronização: Após melhorias, processos são padronizados para manter a eficiência.',
        'Feedback constante: Avaliar resultados e ajustar continuamente para evitar erros e melhorar ainda mais.',
        'Cultura de aprendizado: Encoraja a inovação, colaboração e responsabilidade coletiva.',
    ]);

    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "O que significa a palavra japonesa 'Kaizen'?", a: 0, o: ["Melhoria Contínua", "Qualidade Total", "Produção Rápida"] },
        { q: "Qual é a ideia central do Kaizen?", a: 2, o: ["Fazer grandes mudanças tecnológicas de uma só vez.", "Contratar consultores para resolver todos os problemas.", "Fazer pequenas mudanças constantes para melhorar processos."] },
        { q: "O que é 'Muda' no contexto do Kaizen?", a: 0, o: ["Qualquer tipo de desperdício que não agrega valor.", "O nome de uma ferramenta de qualidade.", "Um tipo de reunião de equipe."] },
        { q: "O que acontece depois que uma melhoria é implementada com sucesso no Kaizen?", a: 1, o: ["O processo antigo é descartado e nunca mais usado.", "O novo processo é padronizado para manter a eficiência.", "A equipe recebe um bônus financeiro imediatamente."] },
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="kaizen-question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="kaizen-question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton, 
        title,
        intro,
        comoSurgiu,
        importancia,
        mainImage,
        pdcaCardsContainer,
        aplicacao,
        objetivo,
        logistica,
        sideImages,
        conceitos,
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
    title.textContent = 'Metodologia 5S';

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

    const intro = createSection('Introdução', 'Fala, galera! O 5S é um jeitinho japonês de organizar e deixar qualquer lugar mais limpo, prático e agradável. A ideia é simples: separar o que serve do que não serve, deixar tudo no lugar, manter limpo, cuidar da saúde e higiene, e criar o hábito de manter isso sempre. Basicamente, é tipo deixar seu quarto ou seu cantinho de trabalho sempre arrumado e funcionando bem, mas de forma profissional.');

    const diagram = document.createElement('div');
    diagram.className = 's5-diagram-container';
    diagram.innerHTML = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="60" fill="var(--primary-color)" />
          <text x="200" y="205" text-anchor="middle" font-size="24" font-weight="bold" fill="#333">5S</text>
          
          <g class="s5-item" transform="translate(200, 60)">
              <text text-anchor="middle" font-weight="600" fill="var(--text-color)">Seiri (Utilização)</text>
              <path d="M 0 15 Q 0 60 -60 90" stroke="var(--text-color-subtle)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
              <text font-size="10" fill="var(--text-color-light)">
                  <tspan x="-110" y="100">Separar o necessário</tspan>
                  <tspan x="-110" y="112">do desnecessário</tspan>
              </text>
          </g>
          <g class="s5-item" transform="translate(340, 200)">
              <text text-anchor="middle" x="10" font-weight="600" fill="var(--text-color)">Seiton (Organização)</text>
               <path d="M -15 0 Q -60 0 -90 60" stroke="var(--text-color-subtle)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
               <text font-size="10" fill="var(--text-color-light)">
                  <tspan x="-140" y="45">Um lugar para</tspan>
                  <tspan x="-140" y="57">cada coisa</tspan>
              </text>
          </g>
          <g class="s5-item" transform="translate(200, 340)">
              <text text-anchor="middle" font-weight="600" fill="var(--text-color)">Seiso (Limpeza)</text>
              <path d="M 0 -15 Q 0 -60 60 -90" stroke="var(--text-color-subtle)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
              <text font-size="10" fill="var(--text-color-light)">
                  <tspan x="80" y="-110">Limpar e cuidar</tspan>
                  <tspan x="80" y="-98">do ambiente</tspan>
              </text>
          </g>
          <g class="s5-item" transform="translate(60, 200)">
              <text text-anchor="middle" x="-10" font-weight="600" fill="var(--text-color)">Seiketsu (Padronização)</text>
              <path d="M 15 0 Q 60 0 90 -60" stroke="var(--text-color-subtle)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
               <text font-size="10" fill="var(--text-color-light)">
                  <tspan x="115" y="-45">Manter a ordem e</tspan>
                  <tspan x="115" y="-33">a saúde em dia</tspan>
              </text>
          </g>
           <g class="s5-item" transform="translate(130, 110)">
              <text text-anchor="middle" x="-10" transform="rotate(-45)" font-weight="600" fill="var(--text-color)">Shitsuke (Disciplina)</text>
              <path d="M 15 15 Q 40 40 70 70" stroke="var(--text-color-subtle)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
              <text font-size="10" fill="var(--text-color-light)" transform="translate(70, 75)">
                  <tspan x="0" y="0">Transformar em</tspan>
                  <tspan x="0" y="12">hábito</tspan>
              </text>
          </g>
      </svg>
    `;

    const historia = createSection('História e Origem do 5S', 'O 5S surgiu no Japão, na década de 1950, como parte do Sistema de Produção Toyota (TPS), desenvolvido por Taiichi Ohno. Esse sistema foi criado para melhorar a eficiência e reduzir desperdícios nas fábricas da Toyota.');
    const relacao = createSection('Relação com a Melhoria Contínua (Kaizen)', 'O 5S se alinha com os princípios do Kaizen, os dois buscam melhorar a eficiência e a produtividade a partir de pequenas melhorias constantes. A combinação de 5S e Kaizen é uma prática comum em ambientes de manufatura e logística.');

    const detailsGrid = document.createElement('div');
    detailsGrid.className = 's5-details-grid';

    detailsGrid.innerHTML = `
      <div class="s5-detail-item">
        <div class="s5-detail-text">
          <h3>1. Seiri (Senso de Utilização)</h3>
          <p>É o ato de separar o que é necessário do que é desnecessário no ambiente de trabalho. Itens que não são usados com frequência ou que estão quebrados devem ser descartados ou realocados. Isso libera espaço, reduz a bagunça e facilita a localização do que realmente importa.</p>
        </div>
        <div class="s5-detail-image">
          <svg viewBox="0 0 100 100"><path d="M20 30h60v60H20z" fill="var(--timeline-bg)" stroke="var(--text-color)" stroke-width="2"/><path d="M10 30h80M35 20h30v10H35zM40 30v60M60 30v60" fill="none" stroke="var(--text-color)" stroke-width="2"/><path d="M80 15L70 5" stroke="red" stroke-width="3" stroke-linecap="round"/><path d="M70 15L80 5" stroke="red" stroke-width="3" stroke-linecap="round"/></svg>
        </div>
      </div>
      <div class="s5-detail-item">
        <div class="s5-detail-image">
           <svg viewBox="0 0 100 100"><path d="M15 70h70v15H15zM20 30h60v40H20z" fill="var(--timeline-bg)" stroke="var(--text-color)" stroke-width="2"/><path d="M30 40h10M30 55h10M55 40h15M55 55h15" fill="none" stroke="var(--text-color)" stroke-width="2"/></svg>
        </div>
        <div class="s5-detail-text">
          <h3>2. Seiton (Senso de Organização)</h3>
          <p>Depois de separar, é hora de organizar. "Um lugar para cada coisa, e cada coisa em seu lugar." Itens devem ser guardados em locais lógicos e de fácil acesso, identificados corretamente para que qualquer pessoa possa encontrá-los e guardá-los de volta rapidamente.</p>
        </div>
      </div>
      <div class="s5-detail-item">
        <div class="s5-detail-text">
          <h3>3. Seiso (Senso de Limpeza)</h3>
          <p>Mais do que apenas limpar a sujeira, o Seiso significa manter o ambiente de trabalho impecável. Isso inclui máquinas, ferramentas e o próprio espaço físico. Um local limpo não só é mais seguro e agradável, como também ajuda a identificar problemas (vazamentos, peças soltas) mais facilmente.</p>
        </div>
        <div class="s5-detail-image">
          <svg viewBox="0 0 100 100"><path d="M20 80h60v10H20zM40 20h20v60H40z" fill="var(--timeline-bg)" stroke="var(--text-color)" stroke-width="2"/><path d="M40 80L30 90M45 80L35 90M50 80L40 90M55 80L45 90M60 80L50 90" fill="none" stroke="var(--text-color)" stroke-width="2"/></svg>
        </div>
      </div>
      <div class="s5-detail-item">
        <div class="s5-detail-image">
          <svg viewBox="0 0 100 100"><rect x="20" y="30" width="60" height="50" fill="var(--timeline-bg)" stroke="var(--text-color)" stroke-width="2"/><path d="M30 40h40M30 50h40M30 60h20" fill="none" stroke="var(--text-color)" stroke-width="2"/><path d="M50 85 a 15 15 0 1 1 0.01 0z" stroke="var(--primary-color)" stroke-width="3" fill="none"/><path d="M45 85 l 5 5 l 10 -10" stroke="var(--primary-color)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
        </div>
        <div class="s5-detail-text">
          <h3>4. Seiketsu (Senso de Padronização)</h3>
          <p>Este senso busca manter os três primeiros (Utilização, Organização e Limpeza) como um padrão. Envolve criar regras, procedimentos e checklists para garantir que as melhorias não se percam com o tempo. A padronização ajuda a manter a consistência e a ordem no longo prazo.</p>
        </div>
      </div>
       <div class="s5-detail-item">
        <div class="s5-detail-text">
          <h3>5. Shitsuke (Senso de Disciplina)</h3>
          <p>O último e mais desafiador S. Refere-se à disciplina e ao comprometimento de todos para seguir as regras e manter os padrões estabelecidos. É transformar a metodologia 5S em um hábito, criando uma cultura de melhoria contínua e responsabilidade coletiva.</p>
        </div>
        <div class="s5-detail-image">
          <svg viewBox="0 0 100 100"><path d="M50,20 C80,20 80,50 50,50 C20,50 20,80 50,80" stroke="var(--primary-color)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 80 L 50 90 L 60 80" stroke="var(--primary-color)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
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
        { q: "Qual o primeiro passo (senso) da metodologia 5S?", a: 0, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)"] },
        { q: "A frase 'Um lugar para cada coisa, e cada coisa em seu lugar' se refere a qual senso?", a: 1, o: ["Seiri", "Seiton", "Shitsuke"] },
        { q: "Qual senso é responsável por transformar as práticas do 5S em um hábito?", a: 2, o: ["Seiketsu (Padronização)", "Seiso (Limpeza)", "Shitsuke (Disciplina)"] },
        { q: "O 5S surgiu como parte de qual famoso sistema de produção?", a: 1, o: ["Fordismo", "Sistema de Produção Toyota", "Manufatura Ágil"] },
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="s5-question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="s5-question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });


    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);

    container.append(
        backButton,
        title,
        intro,
        diagram,
        historia,
        relacao,
        detailsGrid,
        quizSection,
        topicNav
    );
    return container;
}

function renderCadeiaDeSuprimentosPage() {
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
    title.textContent = 'Cadeia de Suprimentos';

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
    
    const intro = createSection('Introdução', 'Fala, galera! A cadeia de suprimentos é tudo que envolve fazer um produto chegar até você. Isso inclui produção, armazenamento e distribuição, além de todas as pessoas, empresas, informações e recursos que entram no processo, desde a matéria-prima até o consumidor final.');
    
    const diagram = document.createElement('div');
    diagram.className = 'supply-chain-diagram-container';
    diagram.innerHTML = `
      <svg viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--primary-color)" />
          </marker>
        </defs>
        <!-- Nodes -->
        <g class="sc-node">
          <rect x="10" y="50" width="120" height="50" rx="5" fill="var(--card-bg)" stroke="var(--card-border)"/>
          <text x="70" y="80" text-anchor="middle" fill="var(--text-color)">Fornecedor</text>
        </g>
        <g class="sc-node">
          <rect x="170" y="50" width="120" height="50" rx="5" fill="var(--card-bg)" stroke="var(--card-border)"/>
          <text x="230" y="80" text-anchor="middle" fill="var(--text-color)">Indústria</text>
        </g>
        <g class="sc-node">
          <rect x="330" y="50" width="120" height="50" rx="5" fill="var(--card-bg)" stroke="var(--card-border)"/>
          <text x="390" y="80" text-anchor="middle" fill="var(--text-color)">Distribuidor</text>
        </g>
        <g class="sc-node">
          <rect x="490" y="50" width="120" height="50" rx="5" fill="var(--card-bg)" stroke="var(--card-border)"/>
          <text x="550" y="80" text-anchor="middle" fill="var(--text-color)">Varejista</text>
        </g>
        <g class="sc-node">
          <rect x="650" y="50" width="120" height="50" rx="5" fill="var(--card-bg)" stroke="var(--card-border)"/>
          <text x="710" y="80" text-anchor="middle" fill="var(--text-color)">Consumidor</text>
        </g>
        <!-- Arrows -->
        <line x1="135" y1="75" x2="165" y2="75" stroke="var(--primary-color)" stroke-width="2" marker-end="url(#arrowhead)" />
        <line x1="295" y1="75" x2="325" y2="75" stroke="var(--primary-color)" stroke-width="2" marker-end="url(#arrowhead)" />
        <line x1="455" y1="75" x2="485" y2="75" stroke="var(--primary-color)" stroke-width="2" marker-end="url(#arrowhead)" />
        <line x1="615" y1="75" x2="645" y2="75" stroke="var(--primary-color)" stroke-width="2" marker-end="url(#arrowhead)" />
      </svg>
    `;

    const surgimento = createSection('Surgimento', 'O SCM (Supply Chain Management) apareceu lá nos anos 1980, mas a ideia já vinha de muito antes, desde quando criaram as linhas de montagem no começo do século XX. No início, a preocupação era só fazer a fábrica produzir mais rápido e com menos estoque parado. Com o tempo, a coisa foi mudando. A globalização e os avanços na tecnologia da informação transformaram a cadeia de suprimentos em uma rede gigante e complexa, conectando empresas do mundo todo.');
    const naLogistica = createSection('Na Logística', 'A cadeia de suprimentos envolve todas as etapas que um produto percorre, desde a compra da matéria-prima, passando pela produção, até chegar ao consumidor. Já a logística é responsável por fazer esse processo funcionar na prática, cuidando do transporte, do armazenamento e da distribuição. Quando as duas atuam de forma integrada, a empresa consegue reduzir custos, evitar estoques desnecessários, organizar melhor o fluxo de informações e agilizar as entregas. Isso não só aumenta a eficiência interna, mas também melhora a experiência do cliente, que recebe seus pedidos no prazo e com qualidade. No fim, essa integração deixa a empresa mais preparada para competir em um mercado cada vez mais exigente.');

    const tiposTitle = document.createElement('h3');
    tiposTitle.textContent = 'Tipos de Cadeias de Suprimentos';
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'info-cards-container';
    cardsContainer.style.flexWrap = 'nowrap'; 
    cardsContainer.style.overflowX = 'auto'; 
    cardsContainer.style.paddingBottom = '1rem'; 
    
    const tiposData = [
        { title: 'Enxuta (Lean)', content: 'Focada em eliminar desperdícios e reduzir custos. Ideal para produtos com demanda estável e previsível.' },
        { title: 'Ágil (Agile)', content: 'Prioriza a rapidez e a flexibilidade para responder a mudanças rápidas no mercado. Ideal para produtos com ciclo de vida curto e demanda volátil (ex: moda, tecnologia).' },
        { title: 'Eficiente (Efficient)', content: 'Busca otimizar a produção e a distribuição em larga escala para reduzir o custo por unidade. Comum em indústrias com margens apertadas e alta competição.' },
        { title: 'Responsiva (Responsive)', content: 'Combina elementos das cadeias ágil e eficiente, adaptando-se para atender às necessidades específicas dos clientes o mais rápido possível.' },
    ];

    tiposData.forEach(tipo => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.style.minWidth = '250px'; 
        card.innerHTML = `<h4>${tipo.title}</h4><p>${tipo.content}</p>`;
        cardsContainer.appendChild(card);
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
        { q: "O que a Cadeia de Suprimentos engloba?", a: 2, o: ["Apenas o transporte do produto.", "Apenas a produção na fábrica.", "Todo o processo, da matéria-prima ao consumidor final."] },
        { q: "Qual o papel da logística dentro da cadeia de suprimentos?", a: 0, o: ["Cuidar da execução prática, como transporte e armazenamento.", "Definir a estratégia de marketing do produto.", "Gerenciar as finanças da empresa."] },
        { q: "Uma cadeia de suprimentos focada em responder a mercados voláteis é do tipo:", a: 1, o: ["Enxuta (Lean)", "Ágil (Agile)", "Eficiente (Efficient)"] },
        { q: "A integração entre logística e cadeia de suprimentos resulta em:", a: 2, o: ["Aumento de custos e estoques.", "Pior experiência para o cliente.", "Redução de custos e entregas mais ágeis."] },
    ];
    
    const quizForm = document.createElement('form');
    quizForm.id = 'sc-quiz';
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

    const submitButton = CtaButton('Verificar Respostas', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name="sc-question-${index}"]:checked`) as HTMLInputElement;
        const labels = quizForm.querySelectorAll(`input[name="sc-question-${index}"]`);
        
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
          }
        }
      });
      resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }, { margin: '0 0.5rem' });

    const resetButton = CtaButton('Tentar Novamente', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }, { display: 'none', margin: '0 0.5rem' });

    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, quizButtons);

    const topicNav = createTopicNavigation(selectedTopic.id);
    
    container.append(
        backButton,
        title,
        intro,
        diagram,
        surgimento,
        naLogistica,
        tiposTitle,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}


function renderConteudosPage() {
  const section = document.createElement('section');
  section.id = 'conteudos';
  section.className = 'custom-cursor';
  applyStyles(section, styles.section);

  if (selectedTopic) {
    let content;
    if (selectedTopic.id === 'logistica-integrada') {
        content = renderLogisticaIntegradaPage();
    } else if (selectedTopic.id === 'just-in-time') {
        content = renderJustInTimePage();
    } else if (selectedTopic.id === 'kanban') {
        content = renderKanbanPage();
    } else if (selectedTopic.id === 'kaizen') {
        content = renderKaizenPage();
    } else if (selectedTopic.id === '5s') {
        content = render5SPage();
    } else if (selectedTopic.id === 'cadeia-de-suprimentos') {
        content = renderCadeiaDeSuprimentosPage();
    } else {
        // Generic topic renderer
        const container = document.createElement('div');
        applyStyles(container, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            textAlign: 'left',
            width: '100%',
            maxWidth: '800px',
        });
        const backButton = CtaButton('← Voltar para a lista', () => {
            transitionTo(() => { selectedTopic = null; });
        }, { margin: '0 0 2rem 0' });
        const title = document.createElement('h2');
        applyStyles(title, {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginBottom: '1rem',
        });
        title.textContent = selectedTopic.title;
        const contentEl = document.createElement('p');
        applyStyles(contentEl, {
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text-color-light)',
        });
        contentEl.textContent = selectedTopic.content;
        const topicNav = createTopicNavigation(selectedTopic.id);
        container.append(backButton, title, contentEl, topicNav);
        content = container;
    }
    section.appendChild(content);
    return section;
  }

  const title = document.createElement('h2');
  applyStyles(title, styles.sectionTitle);
  title.textContent = 'Conteúdos de Logística';
  const intro = document.createElement('p');
  applyStyles(intro, styles.intro);
  intro.textContent = 'Explore nossos tópicos para descomplicar a logística de vez.';
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Pesquisar por um tópico...';
  searchBar.setAttribute('aria-label', 'Pesquisar por um tópico de logística');
  applyStyles(searchBar, {
    width: '80%',
    maxWidth: '500px',
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '25px',
    border: '2px solid var(--search-border)',
    marginBottom: '2.5rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
  });
  const gridContainer = document.createElement('div');
  applyStyles(gridContainer, {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 2rem',
  });

  const renderGrid = (term) => {
    gridContainer.innerHTML = '';
    const filtered = conteudosList.filter(c => c.title.toLowerCase().includes(term.toLowerCase()));
    if (filtered.length > 0) {
      filtered.forEach(topic => {
        const card = document.createElement('div');
        applyStyles(card, {
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: `0 4px 12px var(--card-shadow)`,
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
        });
        const cardTitle = document.createElement('h3');
        applyStyles(cardTitle, {
          fontSize: '1.3rem',
          fontWeight: '600',
          color: 'var(--text-color)',
          margin: '0 0 1rem 0',
        });
        cardTitle.textContent = topic.title;
        const cardIntro = document.createElement('p');
        applyStyles(cardIntro, {
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: 'var(--text-color-light)',
          margin: '0',
        });
        cardIntro.textContent = topic.intro;
        card.append(cardTitle, cardIntro);
        card.addEventListener('mouseenter', e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px var(--card-shadow-hover), 0 0 20px hsla(47, 100%, 50%, 0.15)`;
        });
        card.addEventListener('mouseleave', e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px var(--card-shadow)`;
        });
        card.addEventListener('click', () => {
          transitionTo(() => { selectedTopic = topic; });
        });
        gridContainer.appendChild(card);
      });
    } else {
      gridContainer.innerHTML = '<p>Nenhum tópico encontrado com sua busca.</p>';
    }
  };
  searchBar.addEventListener('input', e => renderGrid((e.target as HTMLInputElement).value));
  section.append(title, intro, searchBar, gridContainer);
  renderGrid('');
  return section;
}

function renderJogosPage() {
    const section = document.createElement('section');
    section.id = 'jogos';
    section.className = 'custom-cursor';
    applyStyles(section, styles.section);

    const title = document.createElement('h2');
    applyStyles(title, styles.sectionTitle);
    title.textContent = 'Jogos Interativos';
    const intro = document.createElement('p');
    applyStyles(intro, styles.intro);
    intro.textContent = 'Aprenda logística de uma forma divertida!';

    const gamesGrid = document.createElement('div');
    gamesGrid.className = 'games-grid';

    // Truck Game
    const gameWrapper = document.createElement('div');
    gameWrapper.className = 'game-card';

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = 'Corrida Logística 3D';
    
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    
    const canvas = document.createElement('canvas');
    canvas.id = 'game-canvas';
    canvas.width = 600;
    canvas.height = 450;

    const gameOverlay = document.createElement('div');
    gameOverlay.id = 'game-overlay';

    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score-display';

    gameContainer.append(canvas, gameOverlay, scoreDisplay);
    gameWrapper.append(gameTitle, gameContainer);
    gamesGrid.appendChild(gameWrapper);
    
    // Placeholders
    const placeholder1 = document.createElement('div');
    placeholder1.className = 'game-card placeholder';
    placeholder1.innerHTML = `
        <h3>Organize o Estoque</h3>
        <div class="placeholder-content">
            <p>Em breve...</p>
        </div>
    `;
    gamesGrid.appendChild(placeholder1);

    const placeholder2 = document.createElement('div');
    placeholder2.className = 'game-card placeholder';
    placeholder2.innerHTML = `
        <h3>Simulador de Rotas</h3>
        <div class="placeholder-content">
            <p>Em breve...</p>
        </div>
    `;
    gamesGrid.appendChild(placeholder2);
    
    section.append(title, intro, gamesGrid);

    const ctx = canvas.getContext('2d');
    
    let truck, obstacles, roadLines, score, gameOver, gameSpeed, keys;
    
    const roadWidth = 300;
    const horizon = canvas.height / 2.5;

    function resetGame() {
        truck = { x: canvas.width / 2 - 25, y: canvas.height - 100, width: 50, height: 80, speed: 7 };
        obstacles = [];
        roadLines = [];
        score = 0;
        gameOver = true;
        gameSpeed = 5;
        keys = { ArrowLeft: false, ArrowRight: false };

        gameOverlay.style.display = 'flex';
        scoreDisplay.style.display = 'none';
        gameOverlay.innerHTML = `
            <h2>Corrida Logística 3D</h2>
            <p>Use as setas ⬅️ e ➡️ para desviar dos obstáculos e entregar sua carga!</p>
        `;
        const startButton = CtaButton('Iniciar Jogo', () => {
            resetGameInternal();
            gameOverlay.style.display = 'none';
            scoreDisplay.style.display = 'block';
            gameOver = false;
            requestAnimationFrame(gameLoop);
        });
        gameOverlay.appendChild(startButton);
    }
    
    function resetGameInternal() {
         truck = { x: canvas.width / 2 - 25, y: canvas.height - 100, width: 50, height: 80, speed: 7 };
        obstacles = [];
        roadLines = [];
        score = 0;
        gameOver = false;
        gameSpeed = 5;
        keys = { ArrowLeft: false, ArrowRight: false };
    }

    function createObstacle() {
        const width = 50 + Math.random() * 50;
        const height = 30;
        const x = (canvas.width / 2 - roadWidth / 2) + Math.random() * (roadWidth - width);
        obstacles.push({ x, y: horizon - height, width, height, z: 1 });
    }

    function createRoadLine() {
        roadLines.push({ y: horizon, z: 1 });
    }

    function drawTruck() {
        const { x, y, width, height } = truck;
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x, y, width, height / 2);
        ctx.fillStyle = '#7f8c8d';
        ctx.fillRect(x + 5, y + height / 2, width - 10, height / 2);
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(x - 5, y + 10, 5, 20);
        ctx.fillRect(x + width, y + 10, 5, 20);
        ctx.fillRect(x - 5, y + 55, 5, 20);
        ctx.fillRect(x + width, y + 55, 5, 20);
    }

    function drawObstacle(obs) {
        const projX = (obs.x - canvas.width / 2) / obs.z + canvas.width / 2;
        const projY = obs.y;
        const projWidth = obs.width / obs.z;
        const projHeight = obs.height / obs.z;

        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(projX - projWidth / 2, projY, projWidth, projHeight);
    }

    function drawRoadLine(line) {
        const projWidth = 10 / line.z;
        const projY = line.y;
        const leftX = (canvas.width / 2 - roadWidth / 2) / line.z + canvas.width / 2 - projWidth / 2;
        const rightX = (canvas.width / 2 + roadWidth / 2) / line.z + canvas.width / 2 - projWidth / 2;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(leftX, projY, projWidth, 2 / line.z * 15);
        ctx.fillRect(rightX, projY, projWidth, 2 / line.z * 15);
    }
    
    function update() {
        if (gameOver) return;

        if (keys.ArrowLeft && truck.x > canvas.width / 2 - roadWidth / 2) {
            truck.x -= truck.speed;
        }
        if (keys.ArrowRight && truck.x < canvas.width / 2 + roadWidth / 2 - truck.width) {
            truck.x += truck.speed;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.y += gameSpeed;
            obs.z = 1 + (obs.y - horizon) / (canvas.height - horizon) * 2;

            const projWidth = obs.width / obs.z;
            const projHeight = obs.height / obs.z;
            const projX = (obs.x - canvas.width / 2) / obs.z + canvas.width / 2 - projWidth / 2;
            const projY = obs.y;

            if (
                truck.x < projX + projWidth &&
                truck.x + truck.width > projX &&
                truck.y < projY + projHeight &&
                truck.y + truck.height > projY
            ) {
                gameOver = true;
            }

            if (obs.y > canvas.height) {
                obstacles.splice(i, 1);
                score++;
                if (score % 10 === 0) gameSpeed += 0.5;
            }
        }
        
        for(let i = roadLines.length - 1; i >= 0; i--) {
            const line = roadLines[i];
            line.y += gameSpeed;
            line.z = 1 + (line.y - horizon) / (canvas.height - horizon) * 2;
            if (line.y > canvas.height) {
                roadLines.splice(i, 1);
            }
        }

        if (Math.random() < 0.03) {
            createObstacle();
        }
        if (roadLines.length < 20 && roadLines.every(l => l.y > horizon + 20)) {
             createRoadLine();
        }

        scoreDisplay.textContent = `Score: ${score}`;
    }

    function gameLoop() {
        if (gameOver) {
            if (score > 0) {
                 gameOverlay.style.display = 'flex';
                 scoreDisplay.style.display = 'none';
                 gameOverlay.innerHTML = `
                    <h2>Fim de Jogo!</h2>
                    <p>Sua pontuação final: ${score}</p>
                 `;
                 const restartButton = CtaButton('Jogar Novamente', () => {
                    resetGameInternal();
                    gameOverlay.style.display = 'none';
                    scoreDisplay.style.display = 'block';
                    gameOver = false;
                    requestAnimationFrame(gameLoop);
                 });
                 gameOverlay.appendChild(restartButton);
            }
            return;
        }

        update();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#34495e';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - roadWidth, horizon);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width / 2 + roadWidth, horizon);
        ctx.closePath();
        ctx.fill();

        const allObjects = [...roadLines, ...obstacles].sort((a, b) => a.z - b.z);
        allObjects.forEach(obj => {
           if ('width' in obj) {
               drawObstacle(obj);
           } else {
               drawRoadLine(obj);
           }
        });
        
        drawTruck();

        requestAnimationFrame(gameLoop);
    }
    
    window.addEventListener('keydown', e => {
        if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
    });
    window.addEventListener('keyup', e => {
        if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
    });
    
    resetGame();
    return section;
}

function renderQuemSomosPage() {
    const section = document.createElement('section');
    section.id = 'quem-somos';
    section.className = 'custom-cursor';
    applyStyles(section, styles.section);
    
    const title = document.createElement('h2');
    applyStyles(title, styles.sectionTitle);
    title.textContent = 'Perguntas Frequentes (FAQ)';

    const intro = document.createElement('p');
    applyStyles(intro, styles.intro);
    intro.textContent = 'Tem alguma dúvida? Confira as respostas para as perguntas mais comuns sobre nossa plataforma e sobre logística em geral.';

    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';
    applyStyles(faqContainer, {
      maxWidth: '800px',
      width: '100%',
      textAlign: 'left',
      marginTop: '2rem'
    });

    const faqData = [
      { q: 'O que é o Descomplica Logística?', a: 'É uma plataforma educativa focada em ensinar conceitos de logística de forma simples, visual e interativa. Nosso objetivo é tornar o aprendizado sobre a cadeia de suprimentos acessível para todos.' },
      { q: 'Todo o conteúdo é gratuito?', a: 'Sim! Atualmente, todos os nossos artigos, quizzes e jogos são 100% gratuitos. Acreditamos no poder do conhecimento aberto.' },
      { q: 'Para quem é esta plataforma?', a: 'Para estudantes de logística, profissionais da área que buscam reciclar conhecimentos, e qualquer pessoa curiosa sobre como os produtos chegam até suas mãos.' },
      { q: 'O que é Logística 4.0?', a: 'É a aplicação de tecnologias como Inteligência Artificial (IA), Internet das Coisas (IoT) e Big Data aos processos logísticos, tornando-os mais inteligentes, autônomos e eficientes.' },
    ];

    faqData.forEach(item => {
      const faqItem = document.createElement('details');
      faqItem.className = 'faq-item';
      applyStyles(faqItem, {
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        marginBottom: '1rem',
        padding: '1rem',
        cursor: 'pointer'
      });

      const summary = document.createElement('summary');
      applyStyles(summary, {
        fontWeight: '600',
        fontSize: '1.1rem'
      });
      summary.textContent = item.q;

      const answer = document.createElement('p');
      applyStyles(answer, {
        marginTop: '1rem',
        lineHeight: '1.7',
        fontSize: '1rem',
        color: 'var(--text-color-light)'
      });
      answer.textContent = item.a;

      faqItem.append(summary, answer);
      faqContainer.appendChild(faqItem);
    });

    section.append(title, intro, faqContainer);
    return section;
}

function renderHeader() {
    const header = document.createElement('header');
    header.className = 'sticky-header';
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > 150) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

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
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease',
        borderBottom: '1px solid var(--footer-border)',
    });

    const logo = document.createElement('div');
    applyStyles(logo, { fontSize: '1.5rem', fontWeight: '700', cursor: 'pointer' });
    logo.textContent = 'Descomplica Logística';
    logo.onclick = () => navigateTo('inicio');

    const nav = document.createElement('nav');
    applyStyles(nav, { display: 'flex', alignItems: 'center', gap: '1.5rem' });

    const navLinks = [
        { page: 'inicio', text: 'Início' },
        { page: 'conteudos', text: 'Conteúdos' },
        { page: 'jogos', text: 'Jogos' },
        { page: 'quem-somos', text: 'Perguntas Frequentes' },
    ];

    navLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = link.text;
        applyStyles(a, {
            textDecoration: 'none',
            color: 'var(--text-color)',
            fontWeight: '600',
            position: 'relative',
            padding: '5px 0'
        });
        if (currentPage === link.page) {
            a.style.color = 'var(--primary-color)';
            a.style.setProperty('--underline-width', '100%');
        }
        a.onclick = (e) => { e.preventDefault(); navigateTo(link.page); };
        const underline = document.createElement('span');
        applyStyles(underline, {
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: currentPage === link.page ? '100%' : '0',
            height: '2px',
            backgroundColor: 'var(--primary-color)',
            transition: 'width 0.3s ease',
        });
        a.appendChild(underline);
        a.addEventListener('mouseenter', () => {
            underline.style.width = '100%';
        });
        a.addEventListener('mouseleave', () => {
            if (currentPage !== link.page) {
                underline.style.width = '0';
            }
        });
        nav.appendChild(a);
    });

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-button';
    themeToggle.setAttribute('aria-label', `Mudar para tema ${currentTheme === 'light' ? 'escuro' : 'claro'}`);
    themeToggle.innerHTML = currentTheme === 'light' ? MoonIcon : SunIcon;
    themeToggle.addEventListener('click', toggleTheme);
    
    nav.appendChild(themeToggle);
    header.append(logo, nav);
    return header;
}

function renderFooter() {
    const footer = document.createElement('footer');
    applyStyles(footer, {
        backgroundColor: 'var(--footer-bg)',
        borderTop: '1px solid var(--footer-border)',
        textAlign: 'center',
        padding: '2rem',
        marginTop: 'auto',
    });
    footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} Descomplica Logística. Todos os direitos reservados.</p>`;
    return footer;
}

function render() {
    if (!root) return;

    root.innerHTML = '';
    root.appendChild(renderHeader());
    
    const main = document.createElement('main');
    main.id = 'main-content';
    applyStyles(main, {
        paddingTop: '80px', /* Header height */
    });
    
    let pageContent;
    switch (currentPage) {
        case 'conteudos':
            pageContent = renderConteudosPage();
            break;
        case 'jogos':
            pageContent = renderJogosPage();
            break;
        case 'quem-somos':
            pageContent = renderQuemSomosPage();
            break;
        case 'inicio':
        default:
            pageContent = renderInicioPage();
            break;
    }
    
    main.appendChild(pageContent);
    
    if (isTransitioning) {
        main.classList.add('page-fade-in');
        isTransitioning = false;
    } else {
        main.style.opacity = '0';
        setTimeout(() => {
            main.style.transition = 'opacity 0.4s ease';
            main.style.opacity = '1';
        }, 10);
    }

    root.appendChild(main);
    root.appendChild(renderFooter());
}

function init() {
    initTheme();
    render();
}

init();
