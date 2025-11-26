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
    
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

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
