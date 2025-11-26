
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
    
    // Vídeo sobre Compras (Google Drive)
    const videoCompras = createVideo(
        'https://drive.google.com/file/d/1d0UDXdm5tI9_f7AsNlS2zKZq0SACVujC/view?usp=sharing', 
        'Introdução ao Processo de Compras'
    );

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
        cycleSection,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}
