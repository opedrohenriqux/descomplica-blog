import { styles, applyStyles, CtaButton } from '../utils.tsx';

// Memory Game Logic
function startMemoryGame(board, overlay, movesDisplay) {
    overlay.style.display = 'none';

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

    const gameCards = [...cardData, ...cardData];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matchedPairs = 0;
    
    board.innerHTML = '';
    movesDisplay.textContent = `Movimentos: 0`;

    gameCards.sort(() => 0.5 - Math.random());
    
    gameCards.forEach(item => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.framework = item.name;

        cardElement.innerHTML = `
            <div class="front-face">
                ${item.icon}
                <span class="card-name">${item.name}</span>
            </div>
            <div class="back-face">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.5V7.5L12 2L3 7.5V16.5L12 22L21 16.5Z"/><path d="M3.27 7.5L12 12.5L20.73 7.5"/><path d="M12 22V12.5"/></svg>
            </div>
        `;
        board.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

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
                endMemoryGame();
            }, 1000);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    function endMemoryGame() {
        overlay.style.display = 'flex';
        overlay.innerHTML = `
            <h2>Parabéns!</h2>
            <p>Você encontrou todos os pares em ${moves} movimentos.</p>
        `;
        const restartButton = CtaButton('Jogar Novamente', () => {
             startMemoryGame(board, overlay, movesDisplay);
        });
        overlay.appendChild(restartButton);
    }
}

export function renderGamesPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, textAlign: 'center' });
    title.textContent = 'Aprenda Jogando';
    
    const gamesGrid = document.createElement('div');
    gamesGrid.className = 'games-grid';
    
    const game2Card = document.createElement('div');
    game2Card.className = 'game-card';
    const game2Description = "Teste sua memória e conhecimento em logística! Encontre os pares de conceitos logísticos o mais rápido que puder.";
    game2Card.setAttribute('data-tooltip', game2Description);
    game2Card.innerHTML = `<h3>Memória Logística</h3>`;

    const memoryGameContainer = document.createElement('div');
    memoryGameContainer.id = 'memory-game-container';
    
    const memoryGameOverlay = document.createElement('div');
    memoryGameOverlay.id = 'game-overlay';
    memoryGameOverlay.innerHTML = `
        <h2>Memória Logística</h2>
        <p>${game2Description}</p>
    `;

    const memoryGameBoard = document.createElement('section');
    memoryGameBoard.className = 'memory-game';
    
    const movesDisplay = document.createElement('div');
    movesDisplay.className = 'game-info';
    movesDisplay.textContent = 'Movimentos: 0';

    const startMemoryGameButton = CtaButton('Iniciar Jogo', () => startMemoryGame(memoryGameBoard, memoryGameOverlay, movesDisplay));
    memoryGameOverlay.appendChild(startMemoryGameButton);

    memoryGameContainer.append(memoryGameBoard, movesDisplay, memoryGameOverlay);
    game2Card.appendChild(memoryGameContainer);

    gamesGrid.append(game2Card);
    section.append(title, gamesGrid);

    return section;
}