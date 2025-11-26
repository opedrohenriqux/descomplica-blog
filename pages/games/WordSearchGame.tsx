

import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderWordSearchGame(transitionTo, setSelectedGame) {
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
        marginBottom: '1rem',
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
    title.textContent = 'Caça-Palavras Logístico';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Encontre os termos logísticos escondidos.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // --- Game Logic & State ---
    
    // Banco de palavras expandido para suportar o nível difícil
    const allWords = [
        'LOGISTICA', 'ESTOQUE', 'KANBAN', 'KAIZEN', 'FRETE', 
        'ROTA', 'SUPPLY', 'LEAN', 'FROTA', 'ARMAZEM', 
        'PICKING', 'MODAL', 'CARGA', 'ENTREGA', 'DEMANDA', 
        'CUSTO', 'FLUXO', 'INSUMO', 'PALETE', 'DOCA', 
        'MODULO', 'TARA', 'LASTMILE', 'CROSSDOCKING', 'RFID', 
        'WMS', 'TMS', 'GRANEIS', 'PORTOS', 'CONTAINER',
        'MODAL', 'CABOTAGEM', 'DIESEL', 'RODOVIA', 'PEDAGIO'
    ];

    const levels = {
        easy: { label: 'Fácil', size: 10, wordCount: 8, color: '#2ecc71' },
        medium: { label: 'Médio', size: 12, wordCount: 14, color: '#f39c12' },
        hard: { label: 'Difícil', size: 15, wordCount: 20, color: '#e74c3c' }
    };

    let currentLevel = null;
    let grid = [];
    let activeWords = [];
    let foundWords = [];
    let firstSelection = null; // {r, c}

    // Wrapper principal que vai alternar entre Menu e Jogo
    const contentWrapper = document.createElement('div');
    applyStyles(contentWrapper, {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    });

    // --- Telas ---

    // 1. Tela de Seleção de Dificuldade
    const renderLevelSelection = () => {
        contentWrapper.innerHTML = '';
        
        const menuContainer = document.createElement('div');
        applyStyles(menuContainer, {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px var(--card-shadow)',
            maxWidth: '500px',
            width: '100%'
        });

        const menuTitle = document.createElement('h3');
        menuTitle.textContent = 'Selecione a Dificuldade';
        applyStyles(menuTitle, { color: 'var(--text-color)', marginBottom: '1rem' });

        Object.keys(levels).forEach(key => {
            const level = levels[key];
            const btn = document.createElement('button');
            applyStyles(btn, {
                padding: '1rem 2rem',
                width: '100%',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: level.color,
                color: '#fff',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            });
            
            btn.innerHTML = `${level.label} <span style="font-size: 0.8em; display: block; font-weight: normal; opacity: 0.9;">${level.wordCount} Palavras</span>`;

            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });

            btn.addEventListener('click', () => startGame(levels[key]));
            menuContainer.appendChild(btn);
        });

        contentWrapper.appendChild(menuContainer);
    };

    // 2. Tela do Jogo
    const renderGameBoard = () => {
        contentWrapper.innerHTML = '';

        const gameContainer = document.createElement('div');
        applyStyles(gameContainer, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '900px'
        });

        // Info Bar
        const infoBar = document.createElement('div');
        applyStyles(infoBar, {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginBottom: '1rem'
        });
        
        const levelBadge = document.createElement('span');
        levelBadge.textContent = `Nível: ${currentLevel.label}`;
        applyStyles(levelBadge, {
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backgroundColor: currentLevel.color,
            color: '#fff',
            fontWeight: 'bold'
        });

        const counter = document.createElement('span');
        counter.id = 'ws-counter';
        counter.textContent = `Encontradas: 0 / ${currentLevel.wordCount}`;
        applyStyles(counter, {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'var(--text-color)'
        });

        infoBar.append(levelBadge, counter);

        // Word List Display
        const wordListContainer = document.createElement('div');
        wordListContainer.id = 'ws-word-list';
        applyStyles(wordListContainer, {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '1rem'
        });

        // Grid Display
        const gridElement = document.createElement('div');
        gridElement.id = 'ws-grid';
        applyStyles(gridElement, {
            display: 'grid',
            gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`,
            gap: '4px',
            backgroundColor: 'var(--card-bg)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px var(--card-shadow)',
            userSelect: 'none',
            maxWidth: '100%',
            width: '100%', 
            aspectRatio: '1/1', 
        });

        // Populate Visuals
        updateWordListUI(wordListContainer);
        renderGridCells(gridElement);

        gameContainer.append(infoBar, wordListContainer, gridElement);
        
        // Botão Desistir/Voltar
        const giveUpBtn = CtaButton('Escolher Outro Nível', renderLevelSelection, { marginTop: '2rem', backgroundColor: '#95a5a6' });
        gameContainer.appendChild(giveUpBtn);

        contentWrapper.appendChild(gameContainer);
    };

    // --- Game Logic Functions ---

    function startGame(levelConfig) {
        currentLevel = levelConfig;
        foundWords = [];
        firstSelection = null;
        
        // Select random words
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        activeWords = shuffled.slice(0, currentLevel.wordCount);
        
        generateGrid();
        renderGameBoard();
    }

    function generateGrid() {
        const size = currentLevel.size;
        // Init empty grid
        grid = Array(size).fill(null).map(() => Array(size).fill(''));
        
        // Place words
        // Sort by length descending to place large words first
        const wordsToPlace = [...activeWords].sort((a, b) => b.length - a.length);

        for (const word of wordsToPlace) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 150) {
                const direction = Math.floor(Math.random() * 3); // 0: horiz, 1: vert, 2: diag
                const r = Math.floor(Math.random() * size);
                const c = Math.floor(Math.random() * size);
                
                if (canPlaceWord(word, r, c, direction, size)) {
                    placeWord(word, r, c, direction);
                    placed = true;
                }
                attempts++;
            }
            if (!placed) {
                // Fallback: if strict placement failed, try again loosely or log error
                // Ideally we would restart generation, but for simplicity we skip
                console.warn(`Could not place word: ${word}`);
            }
        }

        // Fill empty
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (grid[r][c] === '') {
                    grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    function canPlaceWord(word, r, c, direction, size) {
        if (direction === 0) { // Horizontal
            if (c + word.length > size) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[r][c + i] !== '' && grid[r][c + i] !== word[i]) return false;
            }
        } else if (direction === 1) { // Vertical
            if (r + word.length > size) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[r + i][c] !== '' && grid[r + i][c] !== word[i]) return false;
            }
        } else { // Diagonal
            if (r + word.length > size || c + word.length > size) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[r + i][c + i] !== '' && grid[r + i][c + i] !== word[i]) return false;
            }
        }
        return true;
    }

    function placeWord(word, r, c, direction) {
        for (let i = 0; i < word.length; i++) {
            if (direction === 0) grid[r][c + i] = word[i];
            else if (direction === 1) grid[r + i][c] = word[i];
            else grid[r + i][c + i] = word[i];
        }
    }

    function updateWordListUI(container) {
        if (!container) return;
        container.innerHTML = '';
        activeWords.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            const isFound = foundWords.includes(word);
            applyStyles(span, {
                padding: '0.4rem 0.8rem',
                borderRadius: '15px',
                backgroundColor: isFound ? 'var(--quiz-correct-bg)' : 'var(--card-bg)',
                border: `1px solid ${isFound ? 'var(--quiz-correct-border)' : 'var(--card-border)'}`,
                color: isFound ? 'var(--quiz-correct-border)' : 'var(--text-color)',
                textDecoration: isFound ? 'line-through' : 'none',
                fontWeight: '600',
                fontSize: '0.85rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                opacity: isFound ? '0.6' : '1'
            });
            container.appendChild(span);
        });
        
        const counter = document.getElementById('ws-counter');
        if (counter) counter.textContent = `Encontradas: ${foundWords.length} / ${currentLevel.wordCount}`;
    }

    function renderGridCells(gridElement) {
        gridElement.innerHTML = '';
        const size = currentLevel.size;
        
        // Adjust font size based on grid density
        const fontSize = size > 12 ? 'clamp(0.8rem, 2vw, 1.2rem)' : 'clamp(1rem, 3vw, 1.5rem)';

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const cell = document.createElement('div');
                cell.textContent = grid[r][c];
                cell.dataset.r = r.toString();
                cell.dataset.c = c.toString();
                applyStyles(cell, {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--timeline-bg)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: fontSize,
                    fontWeight: 'bold',
                    color: 'var(--text-color)',
                    aspectRatio: '1/1',
                    transition: 'background-color 0.2s',
                    border: '1px solid transparent'
                });

                cell.addEventListener('click', () => handleCellClick(r, c, cell, gridElement));
                gridElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(r, c, cellElement, gridElement) {
        if (cellElement.classList.contains('found')) return; 

        if (!firstSelection) {
            // Primeiro clique
            firstSelection = { r, c };
            cellElement.style.backgroundColor = 'var(--primary-color)';
            cellElement.style.color = '#fff';
        } else {
            // Segundo clique (tentativa de formar palavra)
            const start = firstSelection;
            const end = { r, c };
            
            // Se clicou no mesmo, cancela
            if (start.r === end.r && start.c === end.c) {
                resetSelection(gridElement);
                return;
            }

            const wordObj = getSelectedWord(start, end);
            if (wordObj) {
                const wordStr = wordObj.word;
                const reversedStr = wordStr.split('').reverse().join('');
                
                let found = null;
                if (activeWords.includes(wordStr) && !foundWords.includes(wordStr)) found = wordStr;
                else if (activeWords.includes(reversedStr) && !foundWords.includes(reversedStr)) found = reversedStr;

                if (found) {
                    foundWords.push(found);
                    markFound(wordObj.cells, gridElement);
                    updateWordListUI(document.getElementById('ws-word-list'));
                    checkWin();
                } 
            }
            resetSelection(gridElement);
        }
    }

    function getSelectedWord(start, end) {
        const cells = [];
        let word = "";
        
        // Horizontal
        if (start.r === end.r) {
            const minC = Math.min(start.c, end.c);
            const maxC = Math.max(start.c, end.c);
            for (let c = minC; c <= maxC; c++) {
                word += grid[start.r][c];
                cells.push({r: start.r, c: c});
            }
        }
        // Vertical
        else if (start.c === end.c) {
            const minR = Math.min(start.r, end.r);
            const maxR = Math.max(start.r, end.r);
            for (let r = minR; r <= maxR; r++) {
                word += grid[r][start.c];
                cells.push({r: r, c: start.c});
            }
        }
        // Diagonal
        else if (Math.abs(start.r - end.r) === Math.abs(start.c - end.c)) {
            const dr = end.r > start.r ? 1 : -1;
            const dc = end.c > start.c ? 1 : -1;
            let r = start.r;
            let c = start.c;
            const steps = Math.abs(start.r - end.r);
            for (let i = 0; i <= steps; i++) {
                word += grid[r][c];
                cells.push({r, c});
                r += dr;
                c += dc;
            }
        } else {
            return null; 
        }
        return { word, cells };
    }

    function markFound(cellsCoords, gridElement) {
        cellsCoords.forEach(coord => {
            const index = coord.r * currentLevel.size + coord.c;
            const cell = gridElement.children[index];
            if (cell instanceof HTMLElement) {
                cell.style.backgroundColor = 'var(--quiz-correct-bg)';
                cell.style.borderColor = 'var(--quiz-correct-border)';
                cell.style.color = 'var(--quiz-correct-border)';
                cell.classList.add('found');
            }
        });
    }

    function resetSelection(gridElement) {
        firstSelection = null;
        Array.from(gridElement.children).forEach((cell) => {
            if (cell instanceof HTMLElement && !cell.classList.contains('found')) {
                cell.style.backgroundColor = 'var(--timeline-bg)';
                cell.style.color = 'var(--text-color)';
            }
        });
    }

    function checkWin() {
        if (foundWords.length === currentLevel.wordCount) {
            setTimeout(() => {
                showWinModal();
            }, 500);
        }
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
            zIndex: '20',
            borderRadius: '12px',
            color: '#fff',
            backdropFilter: 'blur(5px)'
        });
        
        overlay.innerHTML = `
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--primary-color);">Parabéns!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Você completou o nível ${currentLevel.label}!</p>
        `;
        
        const restartBtn = CtaButton('Escolher Dificuldade', () => {
            overlay.remove();
            renderLevelSelection();
        });
        
        overlay.appendChild(restartBtn);
        contentWrapper.appendChild(overlay);
    }

    // Start by showing level selection
    renderLevelSelection();

    container.append(header, contentWrapper);
    
    return container;
}
