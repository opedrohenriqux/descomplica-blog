
import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation, createVideo } from '../../utils.tsx';

export function renderComprasPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'compras-page';
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

    // Injeção de estilos de animação e novos componentes visuais
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes cardAppear {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .dynamic-step-card {
        animation: cardAppear 0.6s ease-out forwards;
        opacity: 0;
      }
      .step-icon-container {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .dynamic-step-card:hover .step-icon-container {
        transform: scale(1.2) rotate(5deg);
        color: var(--primary-color);
      }
      .benefit-item-dynamic {
        display: flex;
        align-items: center;
        gap: 15px;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        padding: 1.2rem 1.5rem;
        border-radius: 16px;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px var(--card-shadow);
        width: 100%;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .benefit-item-dynamic:hover {
        transform: scale(1.02);
        border-color: var(--primary-color);
        background: var(--button-bg-hover);
      }
      .benefit-icon {
        width: 24px;
        height: 24px;
        color: var(--primary-color);
        flex-shrink: 0;
      }
      .benefit-text {
        font-weight: 600;
        color: var(--text-color);
        font-size: 1.05rem;
        text-align: left;
      }
      .example-card {
        width: 100%;
        padding: 2.5rem;
        border-radius: 24px;
        margin-bottom: 2rem;
        display: flex;
        gap: 2rem;
        align-items: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid var(--card-border);
        box-shadow: 0 8px 20px var(--card-shadow);
        background-color: var(--card-bg);
      }
      .example-card:hover { 
        transform: translateY(-5px); 
        box-shadow: 0 12px 30px var(--card-shadow-hover);
      }
      .example-card-positive { 
        border-left: 10px solid #2ecc71; 
      }
      .example-card-negative { 
        border-left: 10px solid #e74c3c; 
      }
      .example-icon-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .example-content h4 { margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 800; }
      .example-content p { margin: 0; line-height: 1.6; font-size: 1.1rem; color: var(--text-color-light); }
      
      @media (max-width: 600px) {
        .example-card {
          flex-direction: column;
          text-align: center;
          padding: 1.5rem;
          gap: 1rem;
        }
      }
    `;
    document.head.appendChild(styleSheet);

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
    
    const videoCompras = createVideo(
        'https://drive.google.com/file/d/1d0UDXdm5tI9_f7AsNlS2zKZq0SACVujC/view?usp=drive_link', 
        'Introdução ao Processo de Compras'
    );

    const definicao = createSection('Definição', 'O setor de compras é responsável por adquirir os produtos que estão em falta. Isso envolve uma série de fatores como fazer cotações de preço, prazo (em busca do menor tempo de entrega e a qualidade do produto de diferentes fornecedores.');
    const objetivo = createSection('Objetivo', 'O objetivo de Compras é utilizar planejamento estratégico para garantir o produto certo no momento certo, e com a qualidade certa. Além disso, garantir o menor custo possível é fundamental nas negociações.');
    const impacto = createSection('Impacto', 'Uma boa gestão de compras impacta diretamente no andamento dos negócios e sucesso da organização, quando Compras fecha uma negociação com o preço certo, a qualidade certa e o prazo certo, isso aumenta o lucro, a produtividade e a satisfação do cliente final.');
    const importancia = createSection('Importância', 'Ou seja, o setor de compras é fundamental para o bom funcionamento de qualquer organização, pois é responsável por garantir que todos os materiais necessários para que a produção, vendas e serviços da empresa não faltem e esses processos continuem em andamento.');
    const comunicacao = createSection('Comunicação', 'Compras deve sempre dialogar com os demais setores da empresa, para entender quais são as necessidades a ser supridas e quais os prazos para entrega. Essa falta de comunicação pode interromper uma venda ou produção, por isso é necessário que tenha esse diálogo positivo para evitar atrasos, perdas e desperdícios.');
    
    // --- SEÇÃO VERTICAL DE EXEMPLOS COM CARDS ---
    const examplesSection = document.createElement('div');
    applyStyles(examplesSection, { width: '100%', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' });

    const createExampleCard = (type, title, desc, iconSvg) => {
        const card = document.createElement('div');
        card.className = `example-card example-card-${type}`;
        
        const iconCircle = document.createElement('div');
        iconCircle.className = 'example-icon-circle';
        applyStyles(iconCircle, { backgroundColor: type === 'positive' ? '#2ecc71' : '#e74c3c', color: '#fff' });
        iconCircle.innerHTML = `<div style="width:40px; height:40px;">${iconSvg}</div>`;

        const content = document.createElement('div');
        content.className = 'example-content';
        content.innerHTML = `<h4 style="color: ${type === 'positive' ? '#27ae60' : '#c0392b'}">${title}</h4><p>${desc}</p>`;

        card.append(iconCircle, content);
        return card;
    };

    const exPositivo = createExampleCard(
        'positive', 
        'Exemplo Positivo', 
        'O setor de compras de uma empresa de alimentos negociou com um novo fornecedor de embalagens e conseguiu 10% de desconto, frete gratuito e prazo de pagamento estendido para 60 dias. Graças a essa negociação, a empresa reduz custos e melhorou o fluxo de caixa sem comprometer a qualidade dos produtos.', 
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    );
    
    const exNegativo = createExampleCard(
        'negative', 
        'Exemplo Negativo', 
        'Em uma determinada empresa, o setor de estoque não avisou o setor de compras que a quantidade de parafusos estava acabando. Como não houve comunicação, o material acabou no meio da produção, atrasando as entregas aos clientes e gerando prejuízo e insatisfação.', 
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    );

    examplesSection.append(exPositivo, exNegativo);

    // --- CICLO DO PROCESSO DE COMPRAS ---
    const cicloTitle = document.createElement('h3');
    cicloTitle.textContent = 'Ciclo do Processo de Compras';
    applyStyles(cicloTitle, {
        fontSize: '2rem',
        fontWeight: '800',
        color: 'var(--text-color)',
        marginTop: '5rem',
        marginBottom: '3rem',
        textAlign: 'center',
        width: '100%'
    });

    const stepsContainer = document.createElement('div');
    applyStyles(stepsContainer, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        marginBottom: '5rem'
    });

    const passos = [
        { passo: "1", title: "Comunicação da Necessidade", desc: "O processo começa quando um setor identifica a falta de um material.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
        { passo: "2", title: "Cotação de Fornecedores", desc: "A equipe pesquisa e solicita propostas de diferentes fornecedores.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
        { passo: "3", title: "Análise e Negociação", desc: "As propostas são analisadas e a equipe negocia as melhores condições.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>` },
        { passo: "4", title: "Emissão do Pedido", desc: "Após a negociação, um pedido de compra formal é gerado.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>` },
        { passo: "5", title: "Acompanhamento (Follow-up)", desc: "A equipe monitora o status para garantir a entrega no prazo.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
        { passo: "6", title: "Recebimento e Conferência", desc: "O material é recebido e conferido qualitativa e quantitativamente.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>` },
        { passo: "7", title: "Pagamento", desc: "Após a conferência, o pagamento é liberado ao fornecedor.", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>` }
    ];

    passos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'dynamic-step-card';
        applyStyles(card, {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            position: 'relative',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            boxShadow: '0 10px 25px var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            animationDelay: `${index * 0.1}s`
        });
        const iconWrap = document.createElement('div');
        iconWrap.className = 'step-icon-container';
        // Fix duplicate 'display' property and typo 'justifyCenter'
        applyStyles(iconWrap, { 
            width: '70px', 
            height: '70px', 
            backgroundColor: 'var(--button-bg)', 
            borderRadius: '18px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--text-color)', 
            marginBottom: '1.5rem', 
            border: '2px solid var(--primary-color)', 
            boxShadow: '0 5px 15px rgba(254, 199, 0, 0.1)' 
        });
        iconWrap.innerHTML = `<div style="width: 35px; height: 35px; display:flex; align-items:center;">${item.icon}</div>`;
        const badge = document.createElement('div');
        badge.textContent = item.passo;
        applyStyles(badge, { position: 'absolute', top: '20px', right: '20px', backgroundColor: 'var(--primary-color)', color: '#000', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800' });
        const h4 = document.createElement('h4');
        h4.textContent = item.title;
        applyStyles(h4, { margin: '0 0 1rem 0', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.3' });
        const p = document.createElement('p');
        p.textContent = item.desc;
        applyStyles(p, { margin: '0', fontSize: '1rem', color: 'var(--text-color-light)', lineHeight: '1.6' });
        card.append(badge, iconWrap, h4, p);
        card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-12px)'; card.style.borderColor = 'var(--primary-color)'; card.style.boxShadow = '0 20px 40px rgba(254, 199, 0, 0.2)'; iconWrap.style.backgroundColor = 'var(--primary-color)'; iconWrap.style.color = '#000'; });
        card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; card.style.borderColor = 'var(--card-border)'; card.style.boxShadow = '0 10px 25px var(--card-shadow)'; iconWrap.style.backgroundColor = 'var(--button-bg)'; iconWrap.style.color = 'var(--text-color)'; });
        stepsContainer.appendChild(card);
    });

    // --- SEÇÃO CENTRALIZADA DE BENEFÍCIOS ---
    const bSectionContainer = document.createElement('div');
    applyStyles(bSectionContainer, { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem', marginBottom: '4rem' });

    const h3Beneficios = document.createElement('h3');
    h3Beneficios.textContent = 'Benefícios';
    applyStyles(h3Beneficios, { fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '2.5rem', textAlign: 'center' });

    const beneficiosItems = [
        'Diminuição de custos;', 
        'Agilidade no processo;', 
        'Gestão eficiente do estoque;', 
        'Tomada de decisões estratégicas;', 
        'Prevenção de falhas na operação;', 
        'Bom relacionamento com fornecedores;', 
        'Satisfação e fidelização dos clientes.'
    ];
    
    const bList = document.createElement('div');
    applyStyles(bList, { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' });

    beneficiosItems.forEach(text => {
        const item = document.createElement('div');
        item.className = 'benefit-item-dynamic';
        item.innerHTML = `
            <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="benefit-text">${text}</div>
        `;
        bList.appendChild(item);
    });
    bSectionContainer.append(h3Beneficios, bList);

    // --- QUIZ ---
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';
    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o principal objetivo do setor de Compras, além de buscar o melhor preço?", a: 2, o: ["Comprar a maior quantidade possível de material.", "Apenas receber cotações de fornecedores.", "Garantir o produto certo, no momento certo e com a qualidade certa.", "Evitar a comunicação com outros setores."] },
        { q: "Uma boa gestão de compras impacta diretamente em quê?", a: 0, o: ["Aumento do lucro, produtividade e satisfação do cliente.", "Aumento dos custos de produção.", "Diminuimção da qualidade dos produtos.", "Atrasos na produção como algo normal."] },
        { q: "Por que a comunicação entre o setor de Compras e os outros setores é fundamental?", a: 3, o: ["Para que o setor de compras trabalhe isoladamente.", "Porque a comunicação não é importante.", "Para gerar mais burocracia na empresa.", "Para evitar a interrupção da produção ou vendas por falta de material."] },
        { q: "No 'Exemplo Positivo', qual foi o principal resultado da negociação bem-sucedida?", a: 1, o: ["A empresa comprou embalagens de qualidade inferior.", "A empresa reduziu custos e melhorou o fluxo de caixa.", "O fornecedor aumentou o preço dos produtos.", "A entrega das embalagens atrasou."] },
        { q: "O que causou o problema no 'Exemplo Negativo'?", a: 2, o: ["Excesso de parafusos no estoque.", "Uma negociação de preço mal-sucedida.", "Falta de comunicação entre o estoque e o setor de compras.", "A má qualidade dos parafusos comprados."] },
        { q: "Qual destes NÃO é um benefício de uma boa gestão de compras?", a: 3, o: ["Diminuição de custos.", "Agilidade no processo.", "Bom relacionamento com fornecedores.", "Aumento de falhas na operação."] },
        { q: "O que o setor de compras faz após identificar a falta de um produto?", a: 0, o: ["Realiza cotações de preço, prazo e qualidade.", "Espera o produto acabar completamente.", "Compra do primeiro fornecedor que encontra.", "Cancela a produção do item."] },
        { q: "A aquisição de bens e serviços de forma consciente, buscando o melhor preço, prazo e qualidade, é a definição de:", a: 1, o: ["Setor de Vendas.", "Compras estratégicas.", "Recursos Humanos.", "Contabilidade."] },
        { q: "No ciclo estratégico, qual etapa é fundamental para garantir o abastecimento sem excessos?", a: 0, o: ["Planejamento e Identificação da Necessidade", "Pagamento", "Recebimento", "Marketing"] },
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

    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

    container.append(
        backButton, 
        title, 
        introducao,
        videoCompras,
        definicao,
        objetivo,
        impacto,
        importancia,
        comunicacao,
        examplesSection,   // Exemplos (Acima do Ciclo)
        cicloTitle,        // Ciclo
        stepsContainer,    // Ciclo
        bSectionContainer, // Benefícios (Abaixo do Ciclo)
        quizSection,
        topicNav
    );
    return container;
}
