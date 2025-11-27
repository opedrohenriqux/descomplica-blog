
import { styles, applyStyles, CtaButton, handleQuizSubmit, createTopicNavigation, createCommentSection } from '../../utils.tsx';

function renderNotasFiscaisSection() {
    const section = document.createElement('div');
    section.className = 'notas-fiscais-section';

    const title = document.createElement('h3');
    title.textContent = 'Tipos de Documentos Fiscais';
    applyStyles(title, {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '3rem',
        marginBottom: '2rem',
        textAlign: 'center',
        width: '100%'
    });

    const grid = document.createElement('div');
    grid.className = 'notas-fiscais-grid';

    const notasData = [
        {
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
            title: "NF-e (Nota Fiscal Eletrônica)",
            oQueE: "É o documento digital que registra a venda de produtos. Ela substitui a nota fiscal de papel modelo 1 e 1A.",
            quandoUsar: "Obrigatória em praticamente todas as operações de circulação de mercadorias, como vendas, devoluções, transferências, etc."
        },
        {
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
            title: "NFS-e (Nota Fiscal de Serviços)",
            oQueE: "Similar à NF-e, mas específica para a prestação de serviços. Cada prefeitura tem seu próprio sistema para emissão.",
            quandoUsar: "Utilizada por empresas que prestam serviços, como consultorias, oficinas mecânicas, academias, escolas, etc."
        },
        {
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4zM17 14H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z"/></svg>`,
            title: "CT-e (Conhecimento de Transporte)",
            oQueE: "Documento fiscal digital que registra a prestação de serviço de transporte de cargas entre municípios ou estados.",
            quandoUsar: "Emitido por transportadoras para cobrir o frete de mercadorias. Ele acompanha a carga junto com a NF-e."
        },
        {
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zM16 11H8V9h8v2zm-2-4H8V5h6v2z"/></svg>`,
            title: "MDF-e (Manifesto Eletrônico)",
            oQueE: "Agrupa vários CT-es ou NF-es em um único documento, simplificando a fiscalização de cargas em trânsito.",
            quandoUsar: "Obrigatório quando há mais de um CT-e ou NF-e no mesmo veículo. Vincula os documentos da carga ao veículo transportador."
        }
    ];

    notasData.forEach(nota => {
        const card = document.createElement('div');
        card.className = 'nota-fiscal-card';
        card.innerHTML = `
            <div class="nf-card-header">
                <div class="nf-card-icon">${nota.icon}</div>
                <h3>${nota.title}</h3>
            </div>
            <div class="nf-card-content">
                <h4>O que é?</h4>
                <p>${nota.oQueE}</p>
                <h4>Quando usar?</h4>
                <p>${nota.quandoUsar}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    section.append(title, grid);
    return section;
}


export function renderRecebimentoPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'recebimento-page';
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

    const notasFiscaisSection = renderNotasFiscaisSection();

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
        }, 4000); 
    });
    
    animationSection.append(animationTitle, animationContainer);
    
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

    const commentsSection = createCommentSection('recebimento');
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);
    
    container.append(
        backButton,
        title,
        introducao,
        definicao,
        objetivo,
        importancia,
        comunicacao,
        notasFiscaisSection,
        animationSection,
        quizSection,
        commentsSection,
        topicNav
    );
    return container;
}
