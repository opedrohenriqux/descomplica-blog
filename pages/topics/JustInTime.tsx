

import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation, createVideo, createImage } from '../../utils.tsx';

export function renderJustInTimePage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'jit-page';
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
    title.textContent = 'Just in Time';

    const intro = document.createElement('p');
    intro.textContent = 'Fala, pessoal! Dentro da Logística Integrada nós temos o Just In Time (Na hora certa), uma estratégia de gestão da produção e logística que tem como objetivo produzir e entregar apenas o necessário, no momento exato, na quantidade certa, evitando estoques excessivos e desperdícios.';
    
    // Seção de Imagem (Substituindo o Vídeo)
    const mediaSection = document.createElement('div');
    mediaSection.style.width = '100%';
    mediaSection.style.marginBottom = '2rem';
    
    const mediaTitle = document.createElement('h3');
    mediaTitle.textContent = 'Fluxo do Just in Time';
    applyStyles(mediaTitle, { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '1rem' });
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'media-container';
    
    const iframeWrapper = document.createElement('div');
    iframeWrapper.className = 'video-wrapper'; 
    iframeWrapper.innerHTML = `
        <iframe 
            src="https://drive.google.com/file/d/12oA58IBZC3oT6ixN2UTbSZRU73CAB9RI/preview" 
            width="640" 
            height="480" 
            allow="autoplay"
            title="Diagrama Just in Time">
        </iframe>
    `;

    const driveLink = document.createElement('div');
    driveLink.style.marginTop = '0.5rem';
    driveLink.innerHTML = `<a href="https://drive.google.com/file/d/12oA58IBZC3oT6ixN2UTbSZRU73CAB9RI/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">Abrir imagem em nova guia <svg style="vertical-align: middle;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;

    const caption = document.createElement('p');
    caption.className = 'media-caption';
    caption.textContent = 'Diagrama ilustrativo do sistema Just in Time';

    imageContainer.append(iframeWrapper, driveLink, caption);
    mediaSection.append(mediaTitle, imageContainer);

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
    
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o objetivo principal do Just in Time (JIT)?", a: 2, o: ["Aumentar o tamanho dos estoques para emergências.", "Produzir o máximo possível, o tempo todo.", "Produzir e entregar apenas o necessário, no momento exato.", "Reduzir a qualidade para acelerar a produção."] },
        { q: "O JIT opera com um sistema de produção chamado:", a: 1, o: ["Produção 'empurrada'.", "Produção 'puxada' pela demanda.", "Produção 'antecipada'.", "Produção em massa."] },
        { q: "Qual é uma das principais desvantagens do sistema JIT?", a: 1, o: ["Aumento dos custos de armazenamento.", "Alta dependência de fornecedores confiáveis.", "Excesso de flexibilidade na produção.", "Necessidade de grandes estoques de segurança."] },
        { q: "O JIT é considerado um dos pilares de qual filosofia de produção?", a: 1, o: ["Produção em massa.", "Produção enxuta (Lean Manufacturing).", "Produção artesanal.", "Fordismo."] },
        { q: "Qual empresa é mais famosa por desenvolver e popularizar o JIT?", a: 3, o: ["Ford", "General Motors", "Volkswagen", "Toyota"] },
        { q: "No JIT, o que acontece se um fornecedor atrasa uma entrega?", a: 0, o: ["A linha de produção pode parar.", "O estoque de segurança é usado.", "A produção é adiantada.", "Nada, pois há muitos outros fornecedores."] },
        { q: "O que o JIT busca eliminar primordialmente?", a: 2, o: ["A automação industrial.", "A participação dos funcionários.", "Desperdícios de tempo, material e estoque.", "O controle de qualidade rigoroso."] },
        { q: "Como o JIT impacta o espaço físico de uma fábrica?", a: 1, o: ["Exige mais espaço para grandes estoques.", "Reduz a necessidade de espaço de armazenamento.", "Não tem impacto no espaço físico.", "Aumenta o tamanho das linhas de produção."] },
        { q: "Qual a relação do JIT com a qualidade dos produtos?", a: 3, o: ["A qualidade é menos importante que a velocidade.", "Permite mais defeitos, pois a produção é rápida.", "Não tem relação com a qualidade.", "Exige alta qualidade, pois não há estoque para cobrir peças defeituosas."] },
        { q: "O sistema JIT é mais adequado para ambientes com demanda:", a: 0, o: ["Estável e previsível.", "Totalmente imprevisível e caótica.", "Sazonal e com grandes picos.", "Baixa e esporádica."] },
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
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Just in Time', submitButton, resetButton));
    
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
        mediaSection,
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
