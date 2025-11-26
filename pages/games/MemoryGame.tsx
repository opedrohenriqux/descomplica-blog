
import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderMemoryGame(transitionTo, setSelectedGame) {
    const container = document.createElement('div');
    applyStyles(container, {
        ...styles.section,
        justifyContent: 'flex-start',
        paddingTop: '8rem', // Menos padding que o padrão para aproveitar espaço
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
    
    // Ajuste para mobile
    if (window.innerWidth <= 768) {
        backButton.style.position = 'relative';
        backButton.style.marginBottom = '1rem';
        backButton.style.alignSelf = 'flex-start';
    }

    const title = document.createElement('h2');
    title.textContent = 'Memória Logística';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Encontre os pares de conceitos logísticos o mais rápido que puder!';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center' });

    header.append(backButton, title, subtitle);

    // Container do Jogo
    const gameWrapper = document.createElement('div');
    gameWrapper.id = 'memory-game-wrapper';
    applyStyles(gameWrapper, {
        position: 'relative',
        width: '100%',
        maxWidth: '800px', // Maior que antes
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    });

    const movesDisplay = document.createElement('div');
    applyStyles(movesDisplay, {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'var(--primary-color)',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 2px 5px var(--card-shadow)'
    });
    movesDisplay.textContent = 'Movimentos: 0';

    const board = document.createElement('section');
    board.className = 'memory-game';
    applyStyles(board, {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        width: '100%',
        aspectRatio: '1 / 1', // Mantém quadrado
        perspective: '1000px',
    });

    // Lógica do Jogo
    const cardData = [
        { name: 'Supply Chain', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 54V32l8-6h8l8 6v22h-8v-16h-8v16z"/><path d="M54 54V32l-8-6h-8l-8 6v22h8v-16h8v16z"/><path d="M26 40h12"/><path d="M20 22l12-8 12 8"/><path d="M32 14v12"/></g></svg>` },
        { name: 'Just in Time', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M32 18v14l10 6"/><path d="M50 32l-6-4v-6h-8v6l-6 4"/><path d="M30 22h4v8h-4z"/></g></svg>` },
        { name: 'Kanban', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="10" width="44" height="44" rx="2"/><path d="M28 10v44M46 10v44"/><rect x="14" y="18" width="10" height="8" rx="1" fill="var(--primary-color)" fill-opacity="0.3"/><rect x="14" y="38" width="10" height="8" rx="1" fill="var(--primary-color)" fill-opacity="0.3"/><rect x="32" y="28" width="10" height="8" rx="1" fill="var(--primary-color)" fill-opacity="0.3"/></g></svg>` },
        { name: 'Kaizen', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M32 10a22 22 0 1 0 18.6 12.8"/><path d="M54 20l-4 8-8-4"/><path d="M32 24v16m-8-8h16"/></g></svg>` },
        { name: '5S', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><text x="14" y="48" font-family="Poppins, sans-serif" font-size="40" font-weight="700">5S</text></g></svg>` },
        { name: 'Compras', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="54" r="4"/><circle cx="48" cy="54" r="4"/><path d="M56 12H14l-4-8H2"/><path d="M14 12l8 28h28l8-20H20"/></g></svg>` },
        { name: 'Transporte', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="20" width="32" height="24"/><path d="M42 20h8v16h-8"/><circle cx="18" cy="44" r="4"/><circle cx="44" cy="44" r="4"/><path d="M26 20v-4h12v4"/></g></svg>` },
        { name: 'Armazenagem', icon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 54h44v-32l-22-12-22 12z"/><path d="M18 54v-16h28v16"/><rect x="24" y="26" width="16" height="12"/></g></svg>` }
    ];

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matchedPairs = 0;

    function startGame() {
        board.innerHTML = '';
        moves = 0;
        matchedPairs = 0;
        movesDisplay.textContent = `Movimentos: 0`;
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];

        const gameCards = [...cardData, ...cardData];
        gameCards.sort(() => 0.5 - Math.random());

        gameCards.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.framework = item.name;

            // Ajuste CSS para as cartas funcionarem bem no grid responsivo
            applyStyles(cardElement, {
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            });

            cardElement.innerHTML = `
                <div class="front-face" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: var(--card-bg); border: 2px solid var(--primary-color); transform: rotateY(180deg);">
                    <div style="width: 50%; height: 50%; color: var(--primary-color);">${item.icon}</div>
                    <span class="card-name" style="font-size: 0.8rem; font-weight: 600; margin-top: 5px; color: var(--text-color); text-align: center;">${item.name}</span>
                </div>
                <div class="back-face" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px; display: flex; justify-content: center; align-items: center; background-color: var(--primary-color); background-image: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent); background-size: 20px 20px;">
                    <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.5V7.5L12 2L3 7.5V16.5L12 22L21 16.5Z"/><path d="M3.27 7.5L12 12.5L20.73 7.5"/><path d="M12 22V12.5"/></svg>
                </div>
            `;
            board.appendChild(cardElement);
            cardElement.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip'); // CSS class must be handled globally or inline. 
        // Note: transform: rotateY(180deg) needs to be applied when 'flip' class is added.
        // We will add a small style tag to ensure this specific behavior works in this isolated component if global css misses it.
        this.style.transform = 'rotateY(180deg)';

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        moves++;
        movesDisplay.textContent = `Movimentos: ${moves}`;
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        if (matchedPairs === cardData.length) {
            setTimeout(() => {
                showWinModal();
            }, 500);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.style.transform = 'rotateY(0deg)';
            secondCard.style.transform = 'rotateY(0deg)';
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showWinModal() {
        const overlay = document.createElement('div');
        applyStyles(overlay, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10',
            borderRadius: '12px',
            color: '#fff'
        });
        
        overlay.innerHTML = `
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--primary-color);">Parabéns!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Você completou em ${moves} movimentos.</p>
        `;
        
        const restartBtn = CtaButton('Jogar Novamente', () => {
            overlay.remove();
            startGame();
        });
        
        overlay.appendChild(restartBtn);
        gameWrapper.appendChild(overlay);
    }

    gameWrapper.append(movesDisplay, board);
    container.append(header, gameWrapper);
    
    // Inicia o jogo
    startGame();

    return container;
}
