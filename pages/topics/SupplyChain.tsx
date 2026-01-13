
import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation, createImage } from '../../utils.tsx';

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

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.innerHTML = content;
            p.style.fontSize = '1.1rem';
            p.style.lineHeight = '1.8';
            sectionEl.appendChild(p);
        } else if (Array.isArray(content)) {
            sectionEl.appendChild(createTopicList(content));
        } else {
            sectionEl.appendChild(content);
        }
        return sectionEl;
    }

    const intro = createSection('O que é?', 'Fala, galera! A Cadeia de Suprimentos (ou Supply Chain, em inglês) é todo o caminho que um produto faz, desde a matéria-prima até chegar na sua mão. Pensa no seu celular: a cadeia de suprimentos inclui a mineração dos metais, a fabricação das peças, a montagem do aparelho, o transporte para a loja e, finalmente, a venda para você. É uma rede gigante que conecta fornecedores, fabricantes, distribuidores, lojas e clientes.');
    
    const imageDiagram = document.createElement('div');
    imageDiagram.className = 'media-container';
    
    const iframeWrapper = document.createElement('div');
    iframeWrapper.className = 'video-wrapper'; 
    iframeWrapper.innerHTML = `
        <iframe 
            src="https://drive.google.com/file/d/1EGKuZFzTNSZe_YGYc5tw9-ujt_3SY2JP/preview" 
            width="640" 
            height="480" 
            allow="autoplay"
            title="Diagrama Cadeia de Suprimentos">
        </iframe>
    `;

    const driveLink = document.createElement('div');
    driveLink.style.marginTop = '0.5rem';
    driveLink.innerHTML = `<a href="https://drive.google.com/file/d/1EGKuZFzTNSZe_YGYc5tw9-ujt_3SY2JP/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">Abrir imagem em nova guia <svg style="vertical-align: middle;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;

    const caption = document.createElement('p');
    caption.className = 'media-caption';
    caption.textContent = 'Diagrama Ilustrativo da Cadeia de Suprimentos';

    imageDiagram.append(iframeWrapper, driveLink, caption);
    
    const logisticaVsSCM = createSection('Logística vs. Supply Chain Management (SCM)', 'Muita gente confunde, mas saca só a diferença: a <strong>Logística</strong> é uma parte da cadeia de suprimentos. Ela cuida da movimentação e armazenagem dos produtos (transporte, estoque, etc.). Já o <strong>Supply Chain Management (SCM)</strong> é a gestão de TUDO: desde a negociação com fornecedores, produção, logística, até o serviço ao cliente. Ou seja, a logística é o "como" (movimentar), e o SCM é o "o quê" e o "porquê" (gerenciar o processo todo).');
    
    const importanciaSection = createSection('Qual a importância?', 'A gestão da Cadeia de Suprimentos é o coração pulsante de qualquer empresa moderna. Sem ela, os produtos não chegariam às prateleiras, os hospitais ficariam sem remédios e as fábricas parariam. <br><br>Em um mundo globalizado, uma falha em um fornecedor do outro lado do mundo pode parar uma linha de montagem inteira aqui no Brasil. Por isso, gerenciar essa cadeia não é apenas sobre "transportar caixas", mas sobre <strong>estratégia, inteligência e previsão</strong> para garantir que o negócio continue rodando mesmo diante de imprevistos.');

    const bTitle = document.createElement('h3');
    bTitle.textContent = 'Principais Benefícios';
    applyStyles(bTitle, {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)',
        width: '100%'
    });

    const benefitsGrid = document.createElement('div');
    applyStyles(benefitsGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        marginBottom: '3rem'
    });

    const benefitsData = [
        { title: "Redução de Custos Operacionais", icon: "💰", desc: "Identificar desperdícios e otimizar rotas economiza muito dinheiro." },
        { title: "Melhoria na Qualidade", icon: "💎", desc: "Controle rigoroso desde a matéria-prima garante um produto final melhor." },
        { title: "Satisfação do Cliente", icon: "😊", desc: "Entregar no prazo e sem avarias fideliza quem compra." },
        { title: "Gestão de Riscos", icon: "🛡️", desc: "Ter planos para lidar com crises, greves ou falta de material." },
        { title: "Fluxo de Caixa Otimizado", icon: "📈", desc: "Estoque parado é dinheiro parado; o SCM ajuda a girar o estoque mais rápido." }
    ];

    benefitsData.forEach(item => {
        const bCard = document.createElement('div');
        applyStyles(bCard, {
            backgroundColor: 'var(--card-bg)',
            border: '2px solid var(--card-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 4px 10px var(--card-shadow)',
            cursor: 'default'
        });

        bCard.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">${item.icon}</div>
            <h4 style="margin: 0 0 0.5rem 0; color: var(--text-color); font-weight: 700; line-height: 1.2;">${item.title}</h4>
            <p style="margin: 0; font-size: 0.95rem; color: var(--text-color-light); line-height: 1.5;">${item.desc}</p>
        `;

        bCard.addEventListener('mouseenter', () => {
            bCard.style.transform = 'translateY(-10px) scale(1.03)';
            bCard.style.borderColor = 'var(--primary-color)';
            bCard.style.boxShadow = '0 15px 30px rgba(254, 199, 0, 0.25)';
        });

        bCard.addEventListener('mouseleave', () => {
            bCard.style.transform = 'translateY(0) scale(1)';
            bCard.style.borderColor = 'var(--card-border)';
            bCard.style.boxShadow = '0 4px 10px var(--card-shadow)';
        });

        benefitsGrid.appendChild(bCard);
    });

    const beneficiosSection = document.createElement('div');
    beneficiosSection.style.width = '100%';
    beneficiosSection.append(bTitle, benefitsGrid);

    const typesTitle = document.createElement('h3');
    typesTitle.textContent = 'Tipos de Cadeia de Suprimentos';
    applyStyles(typesTitle, {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)'
    });

    const typesGrid = document.createElement('div');
    applyStyles(typesGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem',
        width: '100%'
    });

    const typesData = [
        {
            title: 'Cadeia de Suprimentos Ágil',
            desc: 'Focada em velocidade e capacidade de resposta. Ideal para mercados onde a demanda muda muito rápido (como moda ou tecnologia). A prioridade é se adaptar e entregar rápido, mesmo que custe um pouco mais.',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`
        },
        {
            title: 'Cadeia de Suprimentos Enxuta (Lean)',
            desc: 'Focada na eficiência e baixo custo. O objetivo é eliminar todo tipo de desperdício (tempo, material, estoque). Funciona muito bem para produtos com alta demanda e pouca variação, como alimentos básicos.',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        },
        {
            title: 'Reposição Contínua',
            desc: 'Baseada na fidelidade e previsibilidade. A entrega de produtos é feita de forma constante e programada, garantindo que o cliente nunca fique sem estoque. Muito comum em parcerias B2B (empresa para empresa).',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>`
        }
    ];

    typesData.forEach(type => {
        const card = document.createElement('div');
        applyStyles(card, {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px var(--card-shadow)',
        });
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div style="color:var(--primary-color); width:30px; height:30px;">${type.icon}</div>
                <h4 style="margin:0; font-size:1.1rem; color:var(--text-color);">${type.title}</h4>
            </div>
            <p style="margin:0; font-size:0.95rem; color:var(--text-color-light); line-height:1.6;">${type.desc}</p>
        `;
        typesGrid.appendChild(card);
    });

    const typesSection = document.createElement('div');
    typesSection.append(typesTitle, typesGrid);

    const imageTech = createImage(
        'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80',
        'Armazém automatizado moderno',
        'A tecnologia é vital para gerenciar os diferentes tipos de cadeias de suprimentos com eficiência.'
    );

    const cardContainer = document.createElement('div');
    applyStyles(cardContainer, {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        margin: '3rem 0'
    });

    const createDarkAccentCard = (title, items) => {
        const group = document.createElement('div');
        applyStyles(group, {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        });

        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = title;
        applyStyles(sectionHeader, {
            fontSize: '1.6rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginBottom: '0.5rem'
        });
        group.appendChild(sectionHeader);

        items.forEach(item => {
            const card = document.createElement('div');
            applyStyles(card, {
                backgroundColor: 'var(--timeline-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'stretch',
                gap: '1.2rem',
                boxShadow: '0 4px 15px var(--card-shadow)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                position: 'relative'
            });
            
            // A barra lateral amarela arredondada estilo "pill" da imagem
            const accentBar = document.createElement('div');
            applyStyles(accentBar, {
                width: '6px',
                backgroundColor: '#fec700',
                borderRadius: '10px',
                flexShrink: '0'
            });

            const contentWrap = document.createElement('div');
            applyStyles(contentWrap, {
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: '1'
            });

            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateX(8px)';
                card.style.backgroundColor = 'var(--button-bg-hover)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateX(0)';
                card.style.backgroundColor = 'var(--timeline-bg)';
            });

            const separator = item.includes('→') ? '→' : ':';
            const parts = item.split(separator);
            
            if (parts.length > 1) {
                contentWrap.innerHTML = `
                    <div style="color: var(--text-color); font-weight: 700; font-size: 1.1rem; line-height: 1.2;">${parts[0].trim()}</div>
                    <div style="color: var(--text-color-light); font-size: 0.95rem; line-height: 1.4;">${parts.slice(1).join(separator).trim()}</div>
                `;
            } else {
                contentWrap.innerHTML = `<div style="color: var(--text-color); font-weight: 700; font-size: 1.1rem;">${item}</div>`;
            }
            
            card.append(accentBar, contentWrap);
            group.appendChild(card);
        });

        return group;
    };

    const etapasCard = createDarkAccentCard('Principais Etapas', [
        'Planejamento → Prever a demanda e planejar a produção.',
        'Compras (Sourcing) → Escolher fornecedores e comprar matéria-prima.',
        'Produção (Fabricação) → Transformar a matéria-prima em produto.',
        'Distribuição e Logística → Armazenar e transportar o produto.',
        'Logística Reversa → Lidar com devoluções ou reciclagem de produtos.'
    ]);

    const componentsCard = createDarkAccentCard('Quem participa?', [
        'Fornecedores primários e secundários.',
        'Fabricantes e montadoras.',
        'Distribuidores e atacadistas.',
        'Varejistas (físicos e e-commerce).',
        'Consumidor final (Você!).'
    ]);
    
    cardContainer.append(etapasCard, componentsCard);

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
        { q: "Qual tipo de Cadeia de Suprimentos foca em eliminar desperdícios e reduzir custos?", a: 1, o: ["Cadeia Ágil", "Cadeia Enxuta (Lean)", "Cadeia de Reposição Contínua", "Cadeia Flexível"] },
        { q: "Qual etapa da cadeia de suprimentos envolve a escolha de fornecedores e a compra de matéria-prima?", a: 0, o: ["Compras (Sourcing)", "Produção", "Distribuição", "Logística Reversa"] },
        { q: "Uma boa gestão da cadeia de suprimentos resulta em:", a: 3, o: ["Aumento de custos e mais desperdícios.", "Clientes insatisfeitos com atrasos.", "Menos flexibilidade para o mercado.", "Redução de custos e clientes mais satisfeitos."] },
        { q: "A cadeia de suprimentos Ágil é ideal para:", a: 0, o: ["Mercados onde a demanda muda rápido (ex: moda).", "Produtos básicos com demanda estável (ex: arroz).", "Produtos que nunca mudam.", "Empresas que não querem inovar."] },
        { q: "No diagrama da cadeia de suprimentos, qual é o elo que vem imediatamente antes do 'Cliente Final'?", a: 3, o: ["Produção", "Matéria-Prima", "Armazenagem", "Varejo (Loja)"] },
        { q: "O termo em inglês para Cadeia de Suprimentos é:", a: 2, o: ["Just in Time", "Kaizen", "Supply Chain", "Kanban"] },
        { q: "Prever a demanda dos clientes e planejar a produção faz parte de qual etapa do SCM?", a: 0, o: ["Planejamento", "Compras", "Distribuição", "Venda"] },
        { q: "Por que a gestão da cadeia de suprimentos é considerada uma vantagem competitiva?", a: 1, o: ["Porque aumenta o preço final do produto.", "Porque torna a empresa mais rápida, confiável e eficiente.", "Porque elimina a necessidade de fornecedores.", "Porque foca apenas na produção interna."] },
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
        imageDiagram,
        logisticaVsSCM,
        importanciaSection,
        beneficiosSection, 
        typesSection,
        imageTech,
        cardContainer,
        quizSection,
        topicNav
    );
    return container;
}
