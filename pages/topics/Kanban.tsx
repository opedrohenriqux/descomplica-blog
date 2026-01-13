
import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function renderKanbanPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'kanban-page';
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
    title.textContent = 'Kanban';

    const intro = document.createElement('p');
    intro.textContent = 'Fala, pessoal! Kanban é uma metodologia visual de gestão de tarefas e processos, muito usada para organizar trabalhos de forma eficiente, a ideia é visualizar o andamento do trabalho e limitar o trabalho em andamento para aumentar a produtividade e identificar erros. Além de ser muito útil no ambiente de trabalho, pode ser utilizado até na vida pessoal, principalmente se você tem aquele leve esquecimento as vezes, com o Kanban você consegue facilmente visualizar quais demandas são de extrema urgência.';
    
    // Helper para criar os tópicos destacados (Cards dinâmicos)
    const createHighlightedTopicList = (items) => {
        const listContainer = document.createElement('div');
        applyStyles(listContainer, {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            marginBottom: '2rem',
            marginTop: '1rem'
        });

        items.forEach(itemText => {
            const card = document.createElement('div');
            applyStyles(card, {
                backgroundColor: 'var(--card-bg)',
                border: '2px solid var(--primary-color)',
                borderRadius: '24px',
                padding: '1.2rem 1.8rem',
                boxShadow: '0 4px 10px var(--card-shadow)',
                fontSize: '1.05rem',
                lineHeight: '1.5',
                color: 'var(--text-color)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            });
            
            // Lógica para negritar antes do separador caso exista
            const separator = itemText.includes(':') ? ':' : (itemText.includes('→') ? '→' : null);
            if (separator) {
                const parts = itemText.split(separator);
                card.innerHTML = `<strong>${parts[0]}${separator}</strong> ${parts.slice(1).join(separator).trim()}`;
            } else {
                card.textContent = itemText;
            }

            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateX(8px)';
                card.style.boxShadow = '0 6px 15px var(--card-shadow-hover)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateX(0)';
                card.style.boxShadow = '0 4px 10px var(--card-shadow)';
            });

            listContainer.appendChild(card);
        });

        return listContainer;
    };

    // Quadro Kanban Visual (Cores adaptáveis ao tema)
    const kanbanBoardSVG = document.createElement('div');
    kanbanBoardSVG.className = 'kanban-visual-mock';
    applyStyles(kanbanBoardSVG, {
        width: '100%',
        maxWidth: '750px',
        margin: '2rem auto 0.5rem',
        backgroundColor: 'var(--timeline-bg)', 
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid var(--card-border)', 
        boxShadow: '0 15px 35px var(--card-shadow)', 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
    });

    const createMockColumn = (title, tasks, colorClass) => {
        const col = document.createElement('div');
        applyStyles(col, {
            backgroundColor: 'var(--card-bg)', 
            borderRadius: '16px',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '280px',
            boxShadow: '0 4px 10px var(--card-shadow)'
        });

        const h = document.createElement('h4');
        h.textContent = title;
        applyStyles(h, { 
            color: 'var(--text-color)', 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.2rem', 
            fontWeight: '700' 
        });
        
        col.appendChild(h);

        tasks.forEach(taskText => {
            const task = document.createElement('div');
            task.textContent = taskText;
            applyStyles(task, {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '0.8rem',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '0.9rem',
                color: '#333', 
                backgroundColor: colorClass === 'yellow' ? '#fff9db' : (colorClass === 'green' ? '#d3f9d8' : '#ffe3e3')
            });
            col.appendChild(task);
        });

        return col;
    };

    kanbanBoardSVG.append(
        createMockColumn('A Fazer', ['Tarefa 1', 'Tarefa 2'], 'yellow'),
        createMockColumn('Fazendo', ['Tarefa 3'], 'green'),
        createMockColumn('Feito', ['Tarefa 4'], 'red')
    );

    const imageDesc = document.createElement('p');
    imageDesc.textContent = 'O Kanban funciona como um sistema visual de gestão de tarefas, baseado em alguns princípios simples, mas muito eficazes.';
    imageDesc.style.textAlign = 'center';
    imageDesc.style.fontStyle = 'italic';
    imageDesc.style.marginTop = '1rem';
    imageDesc.style.width = '100%';

    function createSection(titleText, content, useCards = false) {
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
            borderBottom: '2px solid var(--primary-color)',
            width: '100%'
        });
        sectionEl.appendChild(h3);

        if (useCards && Array.isArray(content)) {
            sectionEl.appendChild(createHighlightedTopicList(content));
        } else if (typeof content === 'string') {
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

    const definicao = createSection('DEFINIÇÃO', 'O Kanban é um quadro visual que organiza tarefas em etapas como “A Fazer”, “Em Progresso” e “Concluído”. Cada tarefa é um cartão que se move pelo quadro, permitindo visualizar o fluxo de trabalho, priorizar atividades e evitar sobrecarga, melhorando a produtividade e a entrega de resultados.');
    const comoSurgiu = createSection('COMO SURGIU?', 'O Kanban surgiu no final dos anos 1940 na Toyota, no Japão, como parte do sistema de produção enxuta (Lean Manufacturing). Foi criado por Taiichi Ohno para melhorar a eficiência de produção e evitar desperdícios.A ideia era usar cartões (kanban, em japonês significa “cartão” ou “sinal visual”) para controlar o fluxo de materiais na linha de produção, mostrando quando era necessário produzir mais peças ou repor estoque, garantindo que nada fosse feito em excesso e que a produção acompanhasse a demanda real.');
    
    // Seção de Princípios com Cards Dinâmicos
    const principios = createSection('PRINCÍPIOS', [
        'Visualizar todas as tarefas para ter clareza do processo;',
        'Limitar o trabalho em andamento (WIP) para evitar sobrecarga;',
        'Gerenciar o fluxo de trabalho, identificando e resolvendo gargalos;',
        'Tornar as regras e processos explícitos, garantindo que todos saibam como agir;',
        'Promover melhoria contínua, ajustando processos regularmente;',
        'Respeitar as pessoas e equipes, estimulando colaboração e autonomia.',
    ], true);

    const limitacao = createSection('LIMITAÇÃO DE TAREFAS', 'Limites de WIP (Work In Progress/Trabalho em Progresso) são restrições sobre a quantidade máxima de tarefas que podem estar em andamento simultaneamente em cada etapa do processo. O objetivo é evitar sobrecarga, aumentar o foco da equipe e identificar gargalos no fluxo de trabalho. Ao respeitar esses limites, o time consegue entregar mais rápido e com mais qualidade, pois as tarefas são concluídas antes de novas serem iniciadas.');
    const melhoria = createSection('Melhoria Contínua (Kaizen) no Kanban', 'Melhoria Contínua (Kaizen) no Kanban é a prática de revisar e ajustar processos regularmente para torná-los mais eficientes e reduzir desperdícios. No Kanban, isso envolve observar o fluxo de trabalho para identificar gargalos ou etapas que atrasam tarefas, analisar dados do quadro, como tempo de conclusão e número de tarefas em andamento, e fazer pequenas mudanças constantes para melhorar a produtividade da equipe. Exemplos de ações incluem reduzir tarefas paradas na coluna “Fazendo”, melhorar a comunicação entre membros da equipe e ajustar prioridades ou redefinir limites de WIP. Com essas melhorias contínuas, a equipe trabalha de forma mais eficiente e organizada, e os resultados evoluem ao longo do tempo.');

    const exampleBoard = document.createElement('div');
    exampleBoard.className = 'media-container';
    exampleBoard.style.marginBottom = '3rem';
    exampleBoard.style.marginTop = '2rem';
    
    const exampleTitle = document.createElement('h3');
    exampleTitle.textContent = 'Exemplo de Quadro Kanban';
    applyStyles(exampleTitle, {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)',
        width: '100%'
    });

    const iframeWrapper = document.createElement('div');
    iframeWrapper.className = 'video-wrapper';
    iframeWrapper.innerHTML = `
        <iframe 
            src="https://drive.google.com/file/d/18CUHSjupFlepTkXbskLqv3YOs35U39tU/preview" 
            width="640" 
            height="480" 
            allow="autoplay"
            title="Exemplo de Quadro Kanban">
        </iframe>
    `;
    
    const driveLink = document.createElement('div');
    driveLink.style.marginTop = '0.5rem';
    driveLink.innerHTML = `<a href="https://drive.google.com/file/d/18CUHSjupFlepTkXbskLqv3YOs35U39tU/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">Abrir imagem em nova guia <svg style="vertical-align: middle;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;

    const caption = document.createElement('p');
    caption.className = 'media-caption';
    caption.textContent = 'Quadro Kanban ilustrando o fluxo: Para Fazer, Em Progresso e Concluído.';

    exampleBoard.append(exampleTitle, iframeWrapper, driveLink, caption);

    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "O que significa a palavra japonesa 'kanban'?", a: 1, o: ["Melhoria Contínua", "Cartão ou sinal visual", "Produção Enxuta", "Qualidade Total"] },
        { q: "Qual é o principal objetivo de limitar o Trabalho em Progresso (WIP)?", a: 2, o: ["Aumentar o número de tarefas simultâneas.", "Documentar todo o processo.", "Evitar sobrecarga e aumentar o foco da equipe.", "Reduzir a comunicação da equipe."] },
        { q: "O Kanban é considerado um método de gestão primariamente:", a: 1, o: ["Auditivo", "Visual", "Numérico", "Hierárquico"] },
        { q: "A prática de revisar e ajustar processos regularmente no Kanban está ligada a qual conceito?", a: 1, o: ["WIP (Work In Progress)", "Kaizen (Melhoria Contínua)", "Fluxo de Trabalho Empurrado", "Just in Case"] },
        { q: "Onde o método Kanban foi originalmente desenvolvido?", a: 3, o: ["Ford, nos Estados Unidos", "Volkswagen, na Alemanha", "Fiat, na Itália", "Toyota, no Japão"] },
        { q: "Qual destes NÃO é um princípio do Kanban?", a: 2, o: ["Visualizar o fluxo de trabalho", "Limitar o trabalho em andamento", "Maximizar o número de tarefas em andamento", "Gerenciar o fluxo"] },
        { q: "As colunas em um quadro Kanban representam:", a: 0, o: ["As etapas do fluxo de trabalho", "Os membros da equipe", "Os dias da semana", "As prioridades das tarefas"] },
        { q: "Identificar e resolver gargalos é parte de qual princípio do Kanban?", a: 3, o: ["Visualizar o fluxo", "Tornar as políticas explícitas", "Limitar o WIP", "Gerenciar o fluxo"] },
        { q: "O Kanban ajuda as equipes a mudar de uma abordagem 'empurrada' para uma abordagem:", a: 1, o: ["Linear", "'Puxada'", "Caótica", "Burocrática"] },
        { q: "O que um 'cartão' representa em um quadro Kanban?", a: 2, o: ["Um membro da equipe", "Um dia de trabalho", "Uma tarefa ou item de trabalho", "Uma reunião agendada"] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'kanban-quiz';

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
        input.name = `kanban-question-${index}`;
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

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Kanban', submitButton, resetButton));

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
        kanbanBoardSVG,
        imageDesc,
        definicao,
        comoSurgiu,
        principios,
        limitacao,
        melhoria,
        exampleBoard,
        quizSection,
        topicNav
    );
    return container;
}
