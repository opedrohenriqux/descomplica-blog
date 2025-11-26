import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function renderSupplyChainPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'supply-chain-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem',
      margin: '0 auto'
    });

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { setSelectedTopic(null); });
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
    
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);
    
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
