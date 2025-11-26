

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
    subtitle.innerHTML = 'Encontre as palavras escondidas na horizontal, vertical ou diagonal.<br><strong>Clique na primeira e na última letra</strong> para selecionar.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // --- Lógica do Jogo ---
    const words = ['LOGISTICA', 'ESTOQUE', 'KANBAN', 'KAIZEN', 'FRETE', 'ROTA', 'SUPPLY', 'LEAN', 'FROTA'];
    const gridSize = 10;
    let grid = [];
    let foundWords = [];
    let firstSelection = null; // {r, c}

    const gameContainer = document.createElement('div');
    applyStyles(gameContainer, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        width: '100%',
        maxWidth: '800px'
    });

    // Word List Display
    const wordListContainer = document.createElement('div');
    applyStyles(wordListContainer, {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    });

    function updateWordList() {
        wordListContainer.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            const isFound = foundWords.includes(word);
            applyStyles(span, {
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                backgroundColor: isFound ? 'var(--quiz-correct-bg)' : 'var(--card-bg)',
                border: `1px solid ${isFound ? 'var(--quiz-correct-border)' : 'var(--card-border)'}`,
                color: isFound ? 'var(--quiz-correct-border)' : 'var(--text-color)',
                textDecoration: isFound ? 'line-through' : 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            });
            wordListContainer.appendChild(span);
        });
    }

    // Grid Display
    const gridElement = document.createElement('div');
    applyStyles(gridElement, {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '4px',
        backgroundColor: 'var(--card-bg)',
        padding: '10px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px var(--card-shadow)',
        userSelect: 'none',
        maxWidth: '100%',
        width: '100%', // Ocupa largura disponivel
        aspectRatio: '1/1', // Mantém quadrado
    });
    
    // Media query adjustments for grid via JS logic mainly, but responsive styling is handled by grid layout

    function generateGrid() {
        // Init empty grid
        grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
        
        // Place words
        for (const word of words) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 100) {
                const direction = Math.floor(Math.random() * 3); // 0: horiz, 1: vert, 2: diag
                const r = Math.floor(Math.random() * gridSize);
                const c = Math.floor(Math.random() * gridSize);
                
                if (canPlaceWord(word, r, c, direction)) {
                    placeWord(word, r, c, direction);
                    placed = true;
                }
                attempts++;
            }
        }

        // Fill empty
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (grid[r][c] === '') {
                    grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        renderGrid();
    }

    function canPlaceWord(word, r, c, direction) {
        if (direction === 0) { // Horizontal
            if (c + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[r][c + i] !== '' && grid[r][c + i] !== word[i]) return false;
            }
        } else if (direction === 1) { // Vertical
            if (r + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[r + i][c] !== '' && grid[r + i][c] !== word[i]) return false;
            }
        } else { // Diagonal
            if (r + word.length > gridSize || c + word.length > gridSize) return false;
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

    function renderGrid() {
        gridElement.innerHTML = '';
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
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
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    fontWeight: 'bold',
                    color: 'var(--text-color)',
                    aspectRatio: '1/1',
                    transition: 'background-color 0.2s',
                    border: '1px solid transparent'
                });

                cell.addEventListener('click', () => handleCellClick(r, c, cell));
                gridElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(r, c, cellElement) {
        // Se já foi encontrado, ignora (opcional, mas bom pra evitar confusão)
        // if (cellElement.classList.contains('found')) return; 

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
                resetSelection();
                return;
            }

            const wordObj = getSelectedWord(start, end);
            if (wordObj) {
                const wordStr = wordObj.word;
                const reversedStr = wordStr.split('').reverse().join('');
                
                let found = null;
                if (words.includes(wordStr) && !foundWords.includes(wordStr)) found = wordStr;
                else if (words.includes(reversedStr) && !foundWords.includes(reversedStr)) found = reversedStr;

                if (found) {
                    foundWords.push(found);
                    markFound(wordObj.cells);
                    updateWordList();
                    checkWin();
                } 
            }
            resetSelection();
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
            // Número de passos
            const steps = Math.abs(start.r - end.r);
            for (let i = 0; i <= steps; i++) {
                word += grid[r][c];
                cells.push({r, c});
                r += dr;
                c += dc;
            }
        } else {
            return null; // Seleção inválida
        }

        // Se a seleção foi feita de trás pra frente, precisamos inverter no check,
        // mas aqui retornamos a string "crua" formada pelas coordenadas.
        // O check acima verifica normal e reverso.
        return { word, cells };
    }

    function markFound(cellsCoords) {
        cellsCoords.forEach(coord => {
            // Find DOM element
            const index = coord.r * gridSize + coord.c;
            const cell = gridElement.children[index];
            if (cell instanceof HTMLElement) {
                cell.style.backgroundColor = 'var(--quiz-correct-bg)';
                cell.style.borderColor = 'var(--quiz-correct-border)';
                cell.style.color = 'var(--quiz-correct-border)';
                cell.classList.add('found');
            }
        });
    }

    function resetSelection() {
        firstSelection = null;
        // Limpa visualmente apenas quem não é "found"
        Array.from(gridElement.children).forEach((cell) => {
            if (!cell.classList.contains('found') && cell instanceof HTMLElement) {
                cell.style.backgroundColor = 'var(--timeline-bg)';
                cell.style.color = 'var(--text-color)';
            }
        });
    }

    function checkWin() {
        if (foundWords.length === words.length) {
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
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Você encontrou todas as palavras!</p>
        `;
        
        const restartBtn = CtaButton('Jogar Novamente', () => {
            overlay.remove();
            foundWords = [];
            firstSelection = null;
            updateWordList();
            generateGrid();
        });
        
        overlay.appendChild(restartBtn);
        container.appendChild(overlay); // Append to main container to cover everything
    }

    // Inicialização
    updateWordList();
    generateGrid();

    gameContainer.append(wordListContainer, gridElement);
    container.append(header, gameContainer);
    
    return container;
}
