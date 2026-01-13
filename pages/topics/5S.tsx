
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
        sectionEl.appendChild(p);
        return sectionEl;
    }
    
    const intro = createSection('Introdução', 'Fala, galera! O 5S é uma metodologia japonesa que ajuda a organizar o local de trabalho para que tudo seja mais fácil, rápido e seguro. O nome vem de cinco palavras em japonês que começam com "S": Seiri, Seiton, Seiso, Seiketsu e Shitsuke. Cada uma representa um passo para criar um ambiente mais limpo, organizado e produtivo.');
    const comoSurgiu = createSection('Como surgiu?', 'O programa 5S surgiu no Japão, após a Segunda Guerra Mundial, durante a reconstrução do país. A ideia era melhorar a eficiência e a qualidade nas indústrias, eliminando desperdícios e criando um ambiente de trabalho mais organizado. A metodologia se popularizou como parte do Sistema Toyota de Produção e, hoje, é usada por empresas do mundo todo para aumentar a produtividade e a segurança.');
    
    const s5ListContainer = document.createElement('div');
    applyStyles(s5ListContainer, {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        marginTop: '3rem'
    });
    
    const s5Data = [
        { 
            id: "1",
            name: "Seiri",
            subtitle: "(Senso de Utilização)", 
            queE: "Separar o que é necessário do que não é.",
            comoFazer: "Olhe tudo o que você tem na sua área de trabalho e jogue fora, doe ou guarde em outro lugar o que não for essencial para suas tarefas diárias. O objetivo é manter apenas o indispensável.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M54 18h-8v-4c0-2.2-1.8-4-4-4h-8c-2.2 0-4 1.8-4 4v4h-8l-4 40h40l-4-40z" fill="var(--primary-color)" opacity="0.2"/><path d="M52 18h-6v-4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v4h-6l-3.5 36h35l-3.5-36z M38 18h-4v-2h4v2z" fill="var(--primary-color)"/><path d="M22 28l-2 2 10 10 10-10-2-2-8 8z" fill="#fff" opacity="0.8"/><line x1="10" y1="24" x2="54" y2="24" stroke="var(--primary-color)" stroke-width="2" stroke-dasharray="4 4"/></svg>`
        },
        { 
            id: "2",
            name: "Seiton",
            subtitle: "(Senso de Organização)", 
            queE: "Organizar o que ficou.",
            comoFazer: "Defina um lugar para cada coisa e mantenha cada coisa em seu lugar. Use etiquetas, prateleiras e caixas para que qualquer pessoa possa encontrar o que precisa de forma rápida e fácil.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="48" height="44" rx="4" fill="var(--primary-color)" opacity="0.2"/><path d="M12 18h16v8h-16z M32 18h16v8h-16z M12 30h16v8h-16z M32 30h16v8h-16z M12 42h36v8h-36z" fill="var(--primary-color)"/><path d="M14 20h12v4h-12z" fill="#fff" opacity="0.8"/><path d="M34 32h12v4h-12z" fill="#fff" opacity="0.8"/><path d="M14 44h32v4h-32z" fill="#fff" opacity="0.8"/></svg>`
        },
        { 
            id: "3",
            name: "Seiso",
            subtitle: "(Senso de Limpeza)", 
            queE: "Manter o ambiente limpo.",
            comoFazer: "Crie o hábito de limpar sua área de trabalho regularmente. Um ambiente limpo é mais agradável, seguro e ajuda a identificar problemas, como vazamentos ou equipamentos quebrados, mais facilmente.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M52 12l-20 20-12-12-8 8 20 20 28-28z" fill="var(--primary-color)" opacity="0.2"/><path d="M50 8l-28 28-12-12-4 4 16 16 32-32z" fill="var(--primary-color)"/><path d="M18 42l-4 4 8 8 4-4z" fill="#fff" opacity="0.7"/></svg>`
        },
        { 
            id: "4",
            name: "Seiketsu",
            subtitle: "(Senso de Padronização)", 
            queE: "Manter a organização e a limpeza.",
            comoFazer: "Crie regras e padrões para que os três primeiros “S” (Utilização, Organização e Limpeza) se tornem um hábito. Isso pode incluir checklists, rotinas de limpeza e responsabilidades claras para cada um.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="8" width="40" height="48" rx="4" fill="var(--primary-color)" opacity="0.2"/><path d="M20 18h24v4h-24z" fill="var(--primary-color)"/><path d="M20 28l-4 4 2 2 4-4z M20 34l-4 4 2 2 4-4z M20 40l-4 4 2 2 4-4z" fill="#fff"/></svg>`
        },
        { 
            id: "5",
            name: "Shitsuke",
            subtitle: "(Senso de Disciplina)", 
            queE: "Ter disciplina para seguir as regras.",
            comoFazer: "É o compromisso de todos em manter os padrões definidos. Significa transformar o 5S em parte da cultura da empresa, onde cada um faz sua parte sem precisar ser lembrado.",
            icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" fill="var(--primary-color)" opacity="0.2"/><path d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" fill="var(--primary-color)"/><path d="M42 30h-6v-6c0-1.1-.9-2-2-2s-2 .9-2 2v8h8c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="#fff"/></svg>`
        },
    ];

    s5Data.forEach(item => {
        const card = document.createElement('div');
        card.className = 's5-interactive-card';
        applyStyles(card, {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderLeft: '6px solid var(--primary-color)',
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            gap: '2rem',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 4px 15px var(--card-shadow)',
            position: 'relative',
            overflow: 'hidden'
        });

        const iconContainer = document.createElement('div');
        applyStyles(iconContainer, {
            flex: '0 0 80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        iconContainer.innerHTML = item.icon;

        const content = document.createElement('div');
        applyStyles(content, {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
        });

        content.innerHTML = `
            <h3 style="margin:0; font-size: 1.6rem; color: var(--primary-color); font-weight: 700;">
                <span style="margin-right: 5px;">${item.id}. ${item.name}</span>
                <span style="font-size: 1.3rem; color: var(--text-color);">${item.subtitle}</span>
            </h3>
            <div style="font-size: 1.1rem; line-height: 1.5; color: var(--text-color);">
                <strong style="color: var(--text-color); font-weight: 800;">O que é:</strong> ${item.queE}
            </div>
            <div style="font-size: 1.1rem; line-height: 1.6; color: var(--text-color-light);">
                <strong style="color: var(--text-color); font-weight: 800;">Como fazer:</strong> ${item.comoFazer}
            </div>
        `;

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.01)';
            card.style.borderColor = 'var(--primary-color)';
            card.style.boxShadow = '0 12px 30px rgba(254, 199, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.borderColor = 'var(--card-border)';
            card.style.boxShadow = '0 4px 15px var(--card-shadow)';
        });

        card.append(iconContainer, content);
        s5ListContainer.appendChild(card);
    });

    const image5S = document.createElement('div');
    image5S.className = 'media-container';
    image5S.style.marginTop = '4rem';

    const iframeWrapper = document.createElement('div');
    iframeWrapper.className = 'video-wrapper';
    iframeWrapper.innerHTML = `
        <iframe 
            src="https://drive.google.com/file/d/1NB9V6w5gioOpTpUFwR3vLPRFSSZtFlkN/preview" 
            width="640" 
            height="480" 
            allow="autoplay"
            title="Exemplo 5S">
        </iframe>
    `;

    const driveLink = document.createElement('div');
    driveLink.style.marginTop = '0.5rem';
    driveLink.innerHTML = `<a href="https://drive.google.com/file/d/1NB9V6w5gioOpTpUFwR3vLPRFSSZtFlkN/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">Abrir imagem em nova guia <svg style="vertical-align: middle;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;

    const caption = document.createElement('p');
    caption.className = 'media-caption';
    caption.textContent = 'Aplicação do 5S na prática';

    image5S.append(iframeWrapper, driveLink, caption);

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
        { q: "Qual o principal beneficio de aplicar o 5S em um ambiente de trabalho?", a: 2, o: ["Aumentar a quantidade de itens estocados.", "Tornar o trabalho mais burocrático.", "Aumentar a produtividade, a segurança e a organização.", "Diminuir a comunicação entre a equipe."] },
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
        s5ListContainer, // Nova lista interativa estilo imagem
        image5S,
        quizSection,
        topicNav
    );
    return container;
}
