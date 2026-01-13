
import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function renderKaizenPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'kaizen-page';
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
    title.textContent = 'Kaizen';

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
    
    // --- Seção: As 7 Etapas do Kaizen ---
    const etapasSection = document.createElement('div');
    etapasSection.style.width = '100%';
    etapasSection.style.marginTop = '3rem';
    
    const etapasTitle = document.createElement('h3');
    etapasTitle.textContent = 'As 7 Etapas do Kaizen';
    applyStyles(etapasTitle, {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '2rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)',
        textAlign: 'center'
    });
    
    const stepsData = [
        { title: "Identificar oportunidades", desc: "Analise falhas, gargalos ou processos que podem ser otimizados no dia a dia para reduzir desperdícios." },
        { title: "Mapear o processo atual", desc: "Entenda como a tarefa é feita hoje, passo a passo, para enxergar onde estão os problemas reais." },
        { title: "Desenvolver uma solução", desc: "Crie um plano de ação simples e prático para resolver o problema identificado pela equipe." },
        { title: "Implementar", desc: "Coloque a solução em teste no ambiente real de trabalho, monitorando as primeiras mudanças." },
        { title: "Analisar os resultados", desc: "Verifique se a mudança trouxe os benefícios esperados e meça os ganhos reais de produtividade." },
        { title: "Criar um padrão", desc: "Se a solução funcionou, transforme a nova forma de trabalho na regra oficial para todos os colaboradores." },
        { title: "Planejar os próximos passos", desc: "O ciclo não para! Use o que aprendeu para buscar o próximo ponto de melhoria contínua." }
    ];

    const interactiveContainer = document.createElement('div');
    interactiveContainer.className = 'kaizen-steps-interactive';
    applyStyles(interactiveContainer, {
        position: 'relative',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%'
    });

    const tooltip = document.createElement('div');
    tooltip.className = 'kaizen-step-tooltip';
    applyStyles(tooltip, {
        position: 'absolute',
        backgroundColor: 'var(--card-bg)',
        border: '3px solid var(--primary-color)',
        padding: '1.2rem',
        borderRadius: '16px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
        maxWidth: '300px',
        zIndex: '100',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.3s, transform 0.3s',
        color: 'var(--text-color)',
        fontSize: '1rem',
        lineHeight: '1.5',
        textAlign: 'center'
    });
    interactiveContainer.appendChild(tooltip);

    const stepsGrid = document.createElement('div');
    applyStyles(stepsGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        width: '100%'
    });

    stepsData.forEach((step, index) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'kaizen-step-bubble';
        applyStyles(stepCard, {
            backgroundColor: 'var(--primary-color)',
            color: '#333',
            padding: '2rem 1rem',
            borderRadius: '20px',
            textAlign: 'center',
            cursor: 'help',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
            minHeight: '140px',
            position: 'relative'
        });

        const numberCircle = document.createElement('div');
        numberCircle.textContent = (index + 1).toString();
        applyStyles(numberCircle, {
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--card-bg)',
            border: '3px solid var(--primary-color)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.2rem',
            color: 'var(--text-color)'
        });
        
        stepCard.appendChild(numberCircle);
        stepCard.append(step.title);

        stepCard.addEventListener('mouseenter', (e) => {
            stepCard.style.transform = 'translateY(-10px) scale(1.05)';
            stepCard.style.boxShadow = '0 12px 25px rgba(254, 199, 0, 0.3)';
            
            tooltip.innerHTML = `<strong>Etapa ${index + 1}:</strong><br>${step.desc}`;
            tooltip.style.opacity = '1';
        });

        stepCard.addEventListener('mousemove', (e) => {
            const rect = interactiveContainer.getBoundingClientRect();
            let x = e.clientX - rect.left + 20;
            let y = e.clientY - rect.top + 20;

            if (x + 300 > rect.width) x -= 320;
            if (y + 150 > rect.height) y -= 160;

            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        });

        stepCard.addEventListener('mouseleave', () => {
            stepCard.style.transform = 'translateY(0) scale(1)';
            stepCard.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
            tooltip.style.opacity = '0';
        });

        stepsGrid.appendChild(stepCard);
    });

    interactiveContainer.appendChild(stepsGrid);
    etapasSection.append(etapasTitle, interactiveContainer);

    const pdcaSection = document.createElement('div');
    pdcaSection.style.width = '100%';
    pdcaSection.style.marginTop = '4rem';
    
    const pdcaTitle = document.createElement('h3');
    pdcaTitle.textContent = 'O Motor do Kaizen: Ciclo PDCA';
    applyStyles(pdcaTitle, { 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: 'var(--text-color)', 
        marginTop: '2.5rem',
        marginBottom: '1rem', 
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)' 
    });
    
    const pdcaText = document.createElement('p');
    pdcaText.innerHTML = 'Passe o mouse em cada etapa do ciclo para entender o processo de <strong>Melhoria Contínua</strong>:';
    
    const pdcaVisual = document.createElement('div');
    pdcaVisual.className = 'pdca-visual-container';
    applyStyles(pdcaVisual, {
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    });

    const pdcaData = [
        { id: 'plan', label: 'PLAN', sub: '(Planejar)', color: '#FFD700', text: 'Identificar o problema, analisar as causas e criar um plano de ação estratégico.', path: 'M 300 30 A 120 120 0 0 1 420 150 L 300 150 Z' },
        { id: 'do', label: 'DO', sub: '(Fazer)', color: '#FFA500', text: 'Colocar o plano em prática e executar as ações definidas pela equipe.', path: 'M 420 150 A 120 120 0 0 1 300 270 L 300 150 Z' },
        { id: 'check', label: 'CHECK', sub: '(Checar)', color: '#FF8C00', text: 'Verificar os resultados e comparar o que foi feito com o que foi planejado.', path: 'M 300 270 A 120 120 0 0 1 180 150 L 300 150 Z' },
        { id: 'act', label: 'ACT', sub: '(Agir)', color: '#fec700', text: 'Padronizar o que deu certo ou agir sobre os erros para iniciar um novo ciclo.', path: 'M 180 150 A 120 120 0 0 1 300 30 L 300 150 Z' }
    ];

    const descriptionBox = document.createElement('div');
    applyStyles(descriptionBox, {
        marginTop: '1.5rem',
        padding: '1.5rem',
        backgroundColor: 'var(--timeline-bg)',
        borderRadius: '12px',
        borderLeft: '5px solid var(--primary-color)',
        minHeight: '80px',
        width: '100%',
        textAlign: 'center',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease'
    });
    descriptionBox.innerHTML = '<em>Passe o mouse em um segmento do ciclo acima...</em>';

    pdcaVisual.innerHTML = `
        <style>
            .pdca-segment { cursor: pointer; transition: transform 0.3s ease; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
            .pdca-segment:hover { transform: scale(1.05); transform-origin: 300px 150px; filter: drop-shadow(0 8px 15px rgba(0,0,0,0.2)); }
            .pdca-center-circle { fill: var(--card-bg); stroke: var(--primary-color); stroke-width: 4; }
            .pdca-text-main { font-family: 'Poppins'; font-weight: 800; font-size: 22px; fill: var(--text-color); }
            .pdca-text-sub { font-family: 'Poppins'; font-weight: 600; font-size: 14px; fill: var(--primary-color); }
            .pdca-arrow-label { font-family: 'Poppins'; font-weight: 700; font-size: 18px; fill: #333; pointer-events: none; }
        </style>
        <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
            <g class="pdca-segment" data-id="plan">
                <path d="${pdcaData[0].path}" fill="${pdcaData[0].color}" />
                <text x="365" y="105" class="pdca-arrow-label" text-anchor="middle">P</text>
            </g>
            <g class="pdca-segment" data-id="do">
                <path d="${pdcaData[1].path}" fill="${pdcaData[1].color}" />
                <text x="365" y="215" class="pdca-arrow-label" text-anchor="middle">D</text>
            </g>
            <g class="pdca-segment" data-id="check">
                <path d="${pdcaData[2].path}" fill="${pdcaData[2].color}" />
                <text x="235" y="215" class="pdca-arrow-label" text-anchor="middle">C</text>
            </g>
            <g class="pdca-segment" data-id="act">
                <path d="${pdcaData[3].path}" fill="${pdcaData[3].color}" />
                <text x="235" y="105" class="pdca-arrow-label" text-anchor="middle">A</text>
            </g>
            
            <circle cx="300" cy="150" r="65" class="pdca-center-circle" />
            <text x="300" y="145" class="pdca-text-main" text-anchor="middle">CICLO</text>
            <text x="300" y="170" class="pdca-text-main" text-anchor="middle" style="fill: var(--primary-color)">PDCA</text>
        </svg>
    `;

    // Interatividade do Ciclo
    setTimeout(() => {
        const segments = pdcaVisual.querySelectorAll('.pdca-segment');
        segments.forEach(seg => {
            seg.addEventListener('mouseenter', () => {
                const id = seg.getAttribute('data-id');
                const data = pdcaData.find(d => d.id === id);
                if (data) {
                    descriptionBox.innerHTML = `<strong style="color:var(--primary-color); display:block; margin-bottom:5px;">${data.label} ${data.sub}</strong> ${data.text}`;
                    descriptionBox.style.backgroundColor = 'var(--highlight-bg)';
                }
            });
            seg.addEventListener('mouseleave', () => {
                descriptionBox.innerHTML = '<em>Passe o mouse em um segmento do ciclo acima...</em>';
                descriptionBox.style.backgroundColor = 'var(--timeline-bg)';
            });
        });
    }, 100);

    pdcaVisual.appendChild(descriptionBox);
    pdcaSection.append(pdcaTitle, pdcaText, pdcaVisual);

    // --- Nova Seção: Benefícios Dinâmicos ---
    const beneficiosSection = document.createElement('div');
    beneficiosSection.style.width = '100%';
    beneficiosSection.style.marginTop = '4rem';

    const bTitle = document.createElement('h3');
    bTitle.textContent = 'Benefícios do Kaizen';
    applyStyles(bTitle, {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '1.5rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)'
    });

    const benefitsGrid = document.createElement('div');
    applyStyles(benefitsGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        width: '100%'
    });

    const benefitsData = [
        { title: "Produtividade & Qualidade", icon: "📈", desc: "Aumenta a entrega de valor com menos erros." },
        { title: "Redução de Custos", icon: "💰", desc: "Elimina desperdícios de tempo, material e esforço." },
        { title: "Satisfação do Cliente", icon: "🤝", desc: "Processos melhores resultam em clientes mais felizes." },
        { title: "Engajamento da Equipe", icon: "👥", desc: "Trabalhadores motivados e ouvidos pela gestão." },
        { title: "Inovação Constante", icon: "💡", desc: "Cultura que incentiva a criatividade diária." },
        { title: "Processos Seguros", icon: "🛡️", desc: "Reduz riscos e acidentes através da padronização." }
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
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px var(--card-shadow)'
        });

        bCard.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">${item.icon}</div>
            <h4 style="margin: 0 0 0.5rem 0; color: var(--text-color); font-weight: 700;">${item.title}</h4>
            <p style="margin: 0; font-size: 0.95rem; color: var(--text-color-light); line-height: 1.4;">${item.desc}</p>
        `;

        bCard.addEventListener('mouseenter', () => {
            bCard.style.transform = 'translateY(-8px)';
            bCard.style.borderColor = 'var(--primary-color)';
            bCard.style.boxShadow = '0 10px 25px rgba(254, 199, 0, 0.2)';
        });

        bCard.addEventListener('mouseleave', () => {
            bCard.style.transform = 'translateY(0)';
            bCard.style.borderColor = 'var(--card-border)';
            bCard.style.boxShadow = '0 4px 10px var(--card-shadow)';
        });

        benefitsGrid.appendChild(bCard);
    });

    beneficiosSection.append(bTitle, benefitsGrid);

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
        { q: "No exemplo de 'Picking' na logística, qual foi a ação Kaizen aplicada?", a: 2, o: ["Contratar mais funcionários.", "Aumentar o tamanho do armazém.", "Reorganizar o layout usando a Curva ABC.", "Comprar empilhadeiras novas."] },
        { q: "Qual é o significado do 'C' no ciclo PDCA?", a: 1, o: ["Create (Criar)", "Check (Checar/Verificar)", "Control (Controlar)", "Calculate (Calcular)"] },
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
    
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

    container.append(
        backButton, 
        title,
        intro,
        comoSurgiu,
        comoFunciona,
        importancia,
        etapasSection,
        pdcaSection,
        beneficiosSection, // Nova seção dinâmica adicionada
        quizSection,
        topicNav
    );
    return container;
}
