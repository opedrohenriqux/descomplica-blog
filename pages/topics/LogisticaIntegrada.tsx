

import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function renderLogisticaIntegradaPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'logistica-integrada-page';
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
      marginBottom: '2rem',
    });
    title.textContent = 'Logística Integrada';

    // Helper para estilo padrão de título
    const applyH3Style = (element) => {
        applyStyles(element, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--primary-color)',
            width: '100%' // Garante que a linha vá até o final
        });
    };

    const tradTitle = document.createElement('h3');
    tradTitle.textContent = 'Logística tradicional';
    applyH3Style(tradTitle);

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

    const intTitle = document.createElement('h3');
    intTitle.textContent = 'Logística Integrada';
    applyH3Style(intTitle);

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
        const target = e.target;
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

    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

    container.append(
        backButton, 
        title, 
        tradTitle, // Alterado
        tradIntro,
        columns,
        intTitle, // Alterado
        intIntro,
        intTopics,
        timelineSection,
        cardsContainer,
        quizSection,
        topicNav
    );
    return container;
}
