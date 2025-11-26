
import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderStockMethodGame(transitionTo, setSelectedGame) {
    const container = document.createElement('div');
    applyStyles(container, {
        ...styles.section,
        justifyContent: 'flex-start',
        paddingTop: '8rem',
        minHeight: '100vh',
    });

    const header = document.createElement('div');
    applyStyles(header, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        width: '100%',
        position: 'relative'
    });

    const backButton = CtaButton('← Voltar aos Jogos', () => {
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0' });

    if (window.innerWidth <= 768) {
        backButton.style.position = 'relative';
        backButton.style.marginBottom = '1rem';
        backButton.style.alignSelf = 'flex-start';
    }

    const title = document.createElement('h2');
    title.textContent = 'Mestre do Estoque';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Analise o produto e escolha o método ideal: <strong>FIFO</strong>, <strong>LIFO</strong> ou <strong>FEFO</strong>.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '1rem' });

    header.append(backButton, title, subtitle);

    // --- Lógica do Jogo ---
    
    // Dados das Questões
    const scenarios = [
        {
            item: "Iogurte Natural",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-2 4h4l-2-4z"/><path d="M6 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8H6z"/><path d="M6 8h12"/></svg>`,
            correct: "FEFO",
            explanation: "Produtos com data de validade curta devem usar <strong>FEFO (Primeiro a Vencer, Primeiro a Sair)</strong>. O que vence primeiro deve sair primeiro para evitar perdas."
        },
        {
            item: "Pilha de Areia / Brita",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 19h20L12 3z"/><path d="M6 19l2-4"/><path d="M18 19l-2-4"/><path d="M12 19v-6"/></svg>`,
            correct: "LIFO",
            explanation: "Para granéis ou materiais empilhados onde é difícil acessar a base, usa-se <strong>LIFO (Último a Entrar, Primeiro a Sair)</strong>. O último a entrar (topo da pilha) é o primeiro a sair."
        },
        {
            item: "Smartphones Modelo Novo",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`,
            correct: "FIFO",
            explanation: "Eletrônicos ficam obsoletos rápido. Usa-se <strong>FIFO (Primeiro a Entrar, Primeiro a Sair)</strong> para vender os modelos mais antigos antes que percam valor de mercado."
        },
        {
            item: "Remédios e Vacinas",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8v4H8z"/><path d="M12 14v8"/><path d="M12 18h8a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-8"/><path d="M12 18H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h8"/><path d="M12 6v6"/></svg>`,
            correct: "FEFO",
            explanation: "Na indústria farmacêutica, a validade é crítica para a saúde. O método obrigatório é o <strong>FEFO</strong> (Primeiro a Vencer, Primeiro a Sair)."
        },
        {
            item: "Roupas da Coleção Atual",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a2 2 0 0 0-2-1H5.62a2 2 0 0 0-2 1L2 6v2h20V6l-1.62-2.6z"/><path d="M12 12v9"/><path d="M12 12H4v7a2 2 0 0 0 2 2h6"/><path d="M12 12h8v7a2 2 0 0 1-2 2h-6"/></svg>`,
            correct: "FIFO",
            explanation: "Moda muda com a estação. Usa-se <strong>FIFO</strong> para garantir que as peças que chegaram primeiro sejam vendidas antes de saírem de moda."
        },
        {
            item: "Carvão Mineral",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="18" r="4"/><circle cx="16" cy="18" r="4"/><circle cx="12" cy="10" r="4"/><path d="M12 2L8 6"/><path d="M12 2l4 4"/></svg>`,
            correct: "LIFO",
            explanation: "Materiais robustos e não perecíveis armazenados em grandes pilhas muitas vezes usam <strong>LIFO</strong> por uma questão logística física (é mais fácil pegar o de cima)."
        },
        {
            item: "Leite UHT (Caixa)",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4" width="10" height="18" rx="2" ry="2"/><path d="M12 2v2"/><path d="M7 9h10"/></svg>`,
            correct: "FEFO",
            explanation: "Alimentos industrializados têm data de validade. Se um lote mais antigo estiver no fundo, ele deve ser vendido antes do lote novo (<strong>FEFO</strong>)."
        },
        {
            item: "Tijolos no Canteiro de Obras",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8z"/><line x1="9" y1="21" x2="9" y2="11"/><line x1="15" y1="21" x2="15" y2="11"/><line x1="3" y1="16" x2="21" y2="16"/></svg>`,
            correct: "LIFO",
            explanation: "Em canteiros de obras, novas remessas de tijolos são colocadas sobre as antigas. O pedreiro pega os de cima primeiro: <strong>LIFO</strong>."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let isFinished = false;

    const gameArea = document.createElement('div');
    applyStyles(gameArea, {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 24px var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    });

    const renderGame = () => {
        gameArea.innerHTML = '';

        if (isFinished) {
            renderResult();
            return;
        }

        const scenario = scenarios[currentQuestion];

        // Progress Bar
        const progressContainer = document.createElement('div');
        applyStyles(progressContainer, { width: '100%', height: '8px', backgroundColor: 'var(--timeline-bg)', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' });
        const progressBar = document.createElement('div');
        applyStyles(progressBar, { width: `${((currentQuestion) / scenarios.length) * 100}%`, height: '100%', backgroundColor: 'var(--primary-color)', transition: 'width 0.3s ease' });
        progressContainer.appendChild(progressBar);

        // Product Icon
        const iconContainer = document.createElement('div');
        applyStyles(iconContainer, {
            width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--timeline-bg)', color: 'var(--primary-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '3px solid var(--primary-color)'
        });
        iconContainer.innerHTML = scenario.icon;
        if(iconContainer.querySelector('svg')) {
             iconContainer.querySelector('svg').style.width = '60%';
             iconContainer.querySelector('svg').style.height = '60%';
        }

        // Question
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = scenario.item;
        applyStyles(questionTitle, { fontSize: '1.8rem', color: 'var(--text-color)', margin: '0 0 2rem 0' });

        // Buttons Container
        const buttonsGrid = document.createElement('div');
        applyStyles(buttonsGrid, { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%' });

        const methods = [
            { id: 'FIFO', label: 'FIFO (PEPS)', full: 'Primeiro a Entrar, Primeiro a Sair' },
            { id: 'LIFO', label: 'LIFO (UEPS)', full: 'Último a Entrar, Primeiro a Sair' },
            { id: 'FEFO', label: 'FEFO (PVPS)', full: 'Primeiro a Vencer, Primeiro a Sair' }
        ];

        methods.forEach(method => {
            const btn = document.createElement('button');
            applyStyles(btn, {
                padding: '1rem',
                backgroundColor: 'var(--button-bg)',
                border: '2px solid var(--card-border)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: 'var(--text-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px'
            });

            btn.innerHTML = `
                <span style="font-weight: 700; font-size: 1.1rem;">${method.label}</span>
                <span style="font-size: 0.7rem; color: var(--text-color-light);">${method.full}</span>
            `;

            btn.addEventListener('mouseenter', () => {
                btn.style.borderColor = 'var(--primary-color)';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = 'var(--card-border)';
                btn.style.transform = 'translateY(0)';
            });

            btn.addEventListener('click', () => handleAnswer(method.id, scenario));
            buttonsGrid.appendChild(btn);
        });

        gameArea.append(progressContainer, iconContainer, questionTitle, buttonsGrid);
    };

    const handleAnswer = (selected, scenario) => {
        const isCorrect = selected === scenario.correct;
        if (isCorrect) score++;

        // Feedback Modal Overlay
        const feedbackOverlay = document.createElement('div');
        applyStyles(feedbackOverlay, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(255,255,255,0.95)', 
            backdropFilter: 'blur(5px)',
            borderRadius: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', zIndex: '10'
        });
        
        if (document.body.dataset.theme === 'dark') {
             feedbackOverlay.style.backgroundColor = 'rgba(44, 44, 44, 0.95)';
        }

        const icon = isCorrect 
            ? `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--quiz-correct-border)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
            : `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--quiz-incorrect-border)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;

        feedbackOverlay.innerHTML = `
            ${icon}
            <h3 style="font-size: 1.5rem; margin: 1rem 0; color: ${isCorrect ? 'var(--quiz-correct-border)' : 'var(--quiz-incorrect-border)'};">${isCorrect ? 'Correto!' : 'Ops, não foi dessa vez!'}</h3>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-color); margin-bottom: 2rem;">
                A resposta correta é <strong>${scenario.correct}</strong>.<br><br>
                ${scenario.explanation}
            </p>
        `;

        const nextBtn = CtaButton(currentQuestion < scenarios.length - 1 ? 'Próximo →' : 'Ver Resultado', () => {
            currentQuestion++;
            if (currentQuestion >= scenarios.length) {
                isFinished = true;
            }
            renderGame();
        });

        feedbackOverlay.appendChild(nextBtn);
        gameArea.appendChild(feedbackOverlay);
    };

    const renderResult = () => {
        gameArea.innerHTML = '';
        
        const percentage = Math.round((score / scenarios.length) * 100);
        let message = '';
        if (percentage === 100) message = 'Incrível! Você é um mestre da logística!';
        else if (percentage >= 70) message = 'Mandou muito bem! Tem futuro no estoque.';
        else if (percentage >= 50) message = 'Bom trabalho, mas dá para melhorar!';
        else message = 'Que tal revisar os conceitos de Estocagem?';

        gameArea.innerHTML = `
            <h3 style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;">Fim de Jogo!</h3>
            <div style="font-size: 4rem; font-weight: 700; color: var(--text-color); margin-bottom: 1rem;">${score}/${scenarios.length}</div>
            <p style="font-size: 1.2rem; color: var(--text-color-light); margin-bottom: 2rem;">${message}</p>
        `;

        const restartBtn = CtaButton('Jogar Novamente', () => {
            currentQuestion = 0;
            score = 0;
            isFinished = false;
            renderGame();
        });

        gameArea.appendChild(restartBtn);
    };

    renderGame();
    container.append(header, gameArea);

    return container;
}
