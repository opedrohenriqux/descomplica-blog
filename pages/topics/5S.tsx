import { styles, applyStyles, CtaButton, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function render5SPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 's5-page';
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
    title.textContent = '5S';
    
    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);
        const p = document.createElement('p');
        p.innerHTML = content;
        sectionEl.appendChild(p);
        return sectionEl;
    }
    
    const intro = createSection('Introdução', 'Fala, galera! O 5S é uma metodologia japonesa que ajuda a organizar o local de trabalho para que tudo seja mais fácil, rápido e seguro. O nome vem de cinco palavras em japonês que começam com "S": Seiri, Seiton, Seiso, Seiketsu e Shitsuke. Cada uma representa um passo para criar um ambiente mais limpo, organizado e produtivo.');
    const comoSurgiu = createSection('Como surgiu?', 'O programa 5S surgiu no Japão, após a Segunda Guerra Mundial, durante a reconstrução do país. A ideia era melhorar a eficiência e a qualidade nas indústrias, eliminando desperdícios e criando um ambiente de trabalho mais organizado. A metodologia se popularizou como parte do Sistema Toyota de Produção e, hoje, é usada por empresas do mundo todo para aumentar a produtividade e a segurança.');
    
    const s5Grid = document.createElement('div');
    s5Grid.className = 's5-visual-grid';
    
    const s5Data = [
        { 
            title: "1. Seiri (Senso de Utilização)", 
            text: "<strong>O que é:</strong> Separar o que é necessário do que não é.<br><strong>Como fazer:</strong> Olhe tudo o que você tem na sua área de trabalho e jogue fora, doe ou guarde em outro lugar o que não for essencial para suas tarefas diárias. O objetivo é manter apenas o indispensável.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><path d="M54 18h-8v-4c0-2.2-1.8-4-4-4h-8c-2.2 0-4 1.8-4 4v4h-8l-4 40h40l-4-40z" fill="url(#s5-grad-1)"/><path d="M52 18h-6v-4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v4h-6l-3.5 36h35l-3.5-36z M38 18h-4v-2h4v2z" fill="var(--text-color)"/><path d="M22 28l-2 2 10 10 10-10-2-2-8 8z" fill="var(--primary-color)" opacity="0.8"/><line x1="10" y1="24" x2="54" y2="24" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4"/></svg>`
        },
        { 
            title: "2. Seiton (Senso de Organização)", 
            text: "<strong>O que é:</strong> Organizar o que ficou.<br><strong>Como fazer:</strong> Defina um lugar para cada coisa e mantenha cada coisa em seu lugar. Use etiquetas, prateleiras e caixas para que qualquer pessoa possa encontrar o que precisa de forma rápida e fácil.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><rect x="8" y="10" width="48" height="44" rx="4" fill="url(#s5-grad-2)"/><path d="M12 18h16v8h-16z M32 18h16v8h-16z M12 30h16v8h-16z M32 30h16v8h-16z M12 42h36v8h-36z" fill="var(--text-color)"/><path d="M14 20h12v4h-12z" fill="var(--primary-color)" opacity="0.8"/><path d="M34 32h12v4h-12z" fill="var(--primary-color)" opacity="0.8"/><path d="M14 44h32v4h-32z" fill="var(--primary-color)" opacity="0.8"/></svg>`
        },
        { 
            title: "3. Seiso (Senso de Limpeza)", 
            text: "<strong>O que é:</strong> Manter o ambiente limpo.<br><strong>Como fazer:</strong> Crie o hábito de limpar sua área de trabalho regularmente. Um ambiente limpo é mais agradável, seguro e ajuda a identificar problemas, como vazamentos ou equipamentos quebrados, mais facilmente.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><path d="M52 12l-20 20-12-12-8 8 20 20 28-28z" fill="url(#s5-grad-3)"/><path d="M48 10h-32v2h32z M48 52h-32v2h32z" fill="var(--text-color)" opacity="0.5"/><path d="M50 8l-28 28-12-12-4 4 16 16 32-32z" fill="var(--primary-color)"/><path d="M18 42l-4 4 8 8 4-4z M10 50l-4 4 8 8 4-4z M26 50l-4 4 8 8 4-4z" fill="var(--text-color)" opacity="0.7"/></svg>`
        },
        { 
            title: "4. Seiketsu (Senso de Padronização)", 
            text: "<strong>O que é:</strong> Manter a organização e a limpeza.<br><strong>Como fazer:</strong> Crie regras e padrões para que os três primeiros “S” (Utilização, Organização e Limpeza) se tornem um hábito. Isso pode incluir checklists, rotinas de limpeza e responsabilidades claras para cada um.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><rect x="12" y="8" width="40" height="48" rx="4" fill="url(#s5-grad-4)"/><path d="M20 18h24v4h-24z" fill="var(--text-color)"/><path d="M24 28h16v2h-16zm0 6h16v2h-16zm0 6h16v2h-16z" fill="var(--text-color)" opacity="0.7"/><path d="M20 28l-4 4 2 2 4-4z M20 34l-4 4 2 2 4-4z M20 40l-4 4 2 2 4-4z" fill="var(--primary-color)"/></svg>`
        },
        { 
            title: "5. Shitsuke (Senso de Disciplina)", 
            text: "<strong>O que é:</strong> Ter disciplina para seguir as regras.<br><strong>Como fazer:</strong> É o compromisso de todos em manter os padrões definidos. Significa transformar o 5S em parte da cultura da empresa, onde cada um faz sua parte sem precisar ser lembrado.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s5-grad-5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.1"/></linearGradient></defs><circle cx="32" cy="32" r="24" fill="url(#s5-grad-5)"/><path d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" fill="var(--text-color)"/><path d="M42 30h-6v-6c0-1.1-.9-2-2-2s-2 .9-2 2v8h8c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="var(--primary-color)"/></svg>`
        },
    ];

    s5Data.forEach(item => {
        const card = document.createElement('div');
        card.className = 's5-visual-card';
        card.innerHTML = `
            <div class="s5-card-icon">${item.icon}</div>
            <div class="s5-card-content">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        `;
        s5Grid.appendChild(card);
    });

    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é o primeiro passo do 5S, representado por 'Seiri'?", a: 0, o: ["Separar o necessário do desnecessário", "Organizar os itens restantes", "Limpar o local de trabalho", "Criar padrões de limpeza"] },
        { q: "O 'Seiton' (Senso de Organização) prega que deve haver:", a: 1, o: ["Muitos itens guardados, para o caso de precisar.", "Um lugar para cada coisa, e cada coisa em seu lugar.", "Limpeza constante, mesmo que o ambiente esteja desorganizado.", "Reuniões diárias sobre disciplina."] },
        { q: "Manter o ambiente de trabalho limpo para identificar problemas facilmente é o objetivo de qual senso?", a: 2, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Shitsuke (Disciplina)"] },
        { q: "O 'Seiketsu' (Senso de Padronização) serve para:", a: 3, o: ["Descartar itens uma única vez.", "Organizar o ambiente apenas quando há visitas.", "Limpar o local de trabalho esporadicamente.", "Manter os três primeiros sensos como um hábito."] },
        { q: "O 'Shitsuke' (Senso de Disciplina) representa:", a: 1, o: ["A punição para quem não segue as regras.", "O compromisso de todos em manter os padrões.", "A limpeza feita apenas pela equipe de faxina.", "A compra de novos materiais de organização."] },
        { q: "O 5S é uma metodologia que se originou em qual país?", a: 0, o: ["Japão", "Estados Unidos", "Alemanha", "China"] },
        { q: "Qual o principal benefício de aplicar o 5S em um ambiente de trabalho?", a: 2, o: ["Aumentar a quantidade de itens estocados.", "Tornar o trabalho mais burocrático.", "Aumentar a produtividade, a segurança e a organização.", "Diminuir a comunicação entre a equipe."] },
        { q: "Qual senso do 5S está mais relacionado à cultura organizacional e ao comprometimento de longo prazo?", a: 3, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Shitsuke (Disciplina)"] },
        { q: "Etiquetar prateleiras e caixas para facilitar a localização de itens é uma prática de qual senso?", a: 1, o: ["Seiri (Utilização)", "Seiton (Organização)", "Seiso (Limpeza)", "Seiketsu (Padronização)"] },
        { q: "O programa 5S foi popularizado como parte de qual famoso sistema de produção?", a: 2, o: ["Fordismo", "Taylorismo", "Sistema Toyota de Produção", "Produção em Massa"] },
    ];
    
    const quizForm = document.createElement('form');
    quizForm.id = 's5-quiz';

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
        input.name = `s5-question-${index}`;
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

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, '5S', submitButton, resetButton));

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
        s5Grid,
        quizSection,
        topicNav
    );
    return container;
}
