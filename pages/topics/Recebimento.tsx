
import { styles, applyStyles, CtaButton, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

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
    
    // --- NOVA SEÇÃO INTERATIVA: Interaja com o Processo de Recebimento ---
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'recebimento-interaction-container';
    applyStyles(interactiveSection, {
        width: '100%',
        margin: '4rem 0',
        padding: '2.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '24px',
        border: '2px solid var(--primary-color)',
        boxShadow: '0 15px 45px var(--card-shadow)',
        position: 'relative'
    });

    const interTitle = document.createElement('h3');
    interTitle.textContent = 'Interaja com o Processo de Recebimento';
    applyStyles(interTitle, { 
        textAlign: 'center', 
        marginBottom: '2rem', 
        fontSize: '2rem', 
        color: 'var(--text-color)',
        fontWeight: '800'
    });

    // Palco da Animação
    const animationStage = document.createElement('div');
    applyStyles(animationStage, {
        width: '100%',
        height: '200px',
        backgroundColor: 'var(--timeline-bg)',
        borderRadius: '16px',
        position: 'relative',
        marginBottom: '2rem',
        overflow: 'hidden',
        border: '1px solid var(--card-border)'
    });

    animationStage.innerHTML = `
        <style>
            .truck-sprite { 
                position: absolute; 
                bottom: 40px; 
                left: -150px; 
                transition: left 2s cubic-bezier(0.4, 0, 0.2, 1); 
                z-index: 10;
            }
            .truck-sprite.arrived { left: 100px; }
            .warehouse-dock { 
                position: absolute; 
                bottom: 40px; 
                right: 0; 
                width: 250px; 
                height: 120px; 
                background: #333; 
                border-radius: 8px 0 0 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .warehouse-dock::after {
                content: "RECEBIMENTO";
                color: #fec700;
                font-weight: 800;
                font-size: 0.7rem;
                letter-spacing: 2px;
            }
            .status-indicator {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 8px 20px;
                background: #fec700;
                color: #000;
                border-radius: 50px;
                font-weight: bold;
                opacity: 0;
                transition: opacity 0.5s;
                z-index: 15;
            }
            .road-line {
                position: absolute;
                bottom: 40px;
                width: 100%;
                height: 4px;
                background: #ccc;
            }
        </style>
        <div class="road-line"></div>
        <div class="warehouse-dock"></div>
        <div class="status-indicator" id="process-status">INICIANDO...</div>
        <div class="truck-sprite" id="truck-visual">
            <svg width="120" height="70" viewBox="0 0 120 70">
                <rect x="0" y="10" width="80" height="50" rx="4" fill="#333" />
                <rect x="0" y="0" width="80" height="50" rx="4" fill="#fec700" />
                <rect x="80" y="20" width="30" height="40" rx="4" fill="#fec700" />
                <rect x="100" y="25" width="10" height="15" fill="#87CEEB" />
                <circle cx="20" cy="62" r="8" fill="#111" />
                <circle cx="70" cy="62" r="8" fill="#111" />
                <circle cx="100" cy="62" r="8" fill="#111" />
            </svg>
        </div>
    `;

    const stepsContainer = document.createElement('div');
    applyStyles(stepsContainer, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        width: '100%'
    });

    const stepData = [
        { id: 1, title: '1. Checagem da Nota Fiscal', desc: 'Verificar se o pedido corresponde ao que foi entregue.', icon: '📑' },
        { id: 2, title: '2. Inspeção Quantitativa', desc: 'Contar os volumes e conferir se a quantidade está correta.', icon: '🔢' },
        { id: 3, title: '3. Inspeção Qualitativa', desc: 'Analisar a qualidade e verificar se há avarias nos produtos.', icon: '🔍' },
        { id: 4, title: '4. Endereçamento', desc: 'Enviar os materiais conferidos para o estoque.', icon: '📍' }
    ];

    const stepCards = stepData.map(step => {
        const card = document.createElement('div');
        applyStyles(card, {
            padding: '1.5rem',
            backgroundColor: 'var(--timeline-bg)',
            borderRadius: '16px',
            border: '2px solid transparent',
            opacity: '0.3',
            transform: 'translateY(10px)',
            transition: 'all 0.5s ease'
        });
        card.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${step.icon}</div>
            <strong style="display:block; margin-bottom: 0.5rem; color: var(--text-color);">${step.title}</strong>
            <p style="font-size: 0.9rem; color: var(--text-color-light); margin: 0; line-height: 1.4;">${step.desc}</p>
        `;
        stepsContainer.appendChild(card);
        return card;
    });

    const controls = document.createElement('div');
    applyStyles(controls, { marginTop: '2.5rem', display: 'flex', justifyContent: 'center' });
    
    const startBtn = CtaButton('Iniciar Processo de Recebimento', () => runProcess());
    controls.appendChild(startBtn);

    interactiveSection.append(interTitle, animationStage, stepsContainer, controls);

    async function runProcess() {
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        
        const truck = animationStage.querySelector('#truck-visual') as HTMLElement;
        const status = animationStage.querySelector('#process-status') as HTMLElement;
        
        // Reset state
        stepCards.forEach(card => applyStyles(card, { opacity: '0.3', transform: 'translateY(10px)', borderColor: 'transparent' }));
        truck.classList.remove('arrived');
        status.style.opacity = '0';

        // 1. Caminhão anda até o destino
        await new Promise(r => setTimeout(r, 100));
        truck.classList.add('arrived');
        status.textContent = "CHEGADA DO VEÍCULO";
        status.style.opacity = '1';

        await new Promise(r => setTimeout(r, 2200));

        // 2. Passos sequenciais
        for (let i = 0; i < stepCards.length; i++) {
            status.textContent = stepData[i].title.toUpperCase();
            applyStyles(stepCards[i], {
                opacity: '1',
                transform: 'translateY(0)',
                borderColor: '#fec700',
                backgroundColor: 'var(--card-bg)',
                boxShadow: '0 8px 20px var(--card-shadow)'
            });
            await new Promise(r => setTimeout(r, 1500));
        }

        status.textContent = "PROCESSO CONCLUÍDO!";
        status.style.background = "#2ecc71";
        status.style.color = "#fff";
        
        await new Promise(r => setTimeout(r, 1000));
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        startBtn.textContent = 'Reiniciar Processo';
    }

    // Outras seções
    const objetivo = createSection('Objetivo', 'O objetivo do recebimento de compras é utilizar planejamento estratégico para garantir que o material seja recebido de forma certa, e com a qualidade certa. Além disso, garantir que as necessidades da empresa sejam atendidas.');
    const importancia = createSection('Importância', `Longe de ser apenas uma função de apoio, o recebimento é uma etapa estratégica e prioritária na cadeia de suprimentos. Papel Estratégico na Logística e Geração de Receita O recebimento de materiais é um dos pilares da gestão de materiais. Ele é considerado a primeira etapa da cadeia de suprimentos interna da empresa.<br><br>Ou seja, o setor de recebimento é fundamental para o bom funcionamento de qualquer organização, pois é responsável por garantir que todos os materiais necessários para que a produção, vendas e serviços da empresa não faltem e esses processos continuem em andamento.`);
    const comunicacao = createSection('Comunicação', 'O setor de recebimento de materiais precisa dialogar e estar estritamente integrado com diversas áreas, tanto internas quanto externas à empresa, para garantir a eficiência do processo logístico e a conformidade do estoque. Departamentos Internos<br><br>O diálogo interno é vital para antecipar as entregas, garantir que o material recebido seja o correto e finalizar a transação financeira. A área de recebimento precisa estar integrada ao setor de compras, sabendo antecipadamente a programação de entregas.');

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

    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);
    
    container.append(
        backButton,
        title,
        introducao,
        definicao,
        objetivo,
        interactiveSection,
        importancia,
        comunicacao,
        quizSection,
        topicNav
    );
    return container;
}
