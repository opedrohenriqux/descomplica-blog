
import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderHangmanGame(transitionTo, setSelectedGame) {
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
    title.textContent = 'Forca Logística';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Adivinhe o termo logístico antes que o desenho se complete!<br>Use a dica para ajudar.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // --- Game Container ---
    const gameWrapper = document.createElement('div');
    applyStyles(gameWrapper, {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 12px var(--card-shadow)'
    });

    // --- Game Logic Data ---
    const wordsData = [
        { word: "LOGISTICA", hint: "Processo de planejamento, implementação e controle do fluxo de produtos." },
        { word: "KAIZEN", hint: "Filosofia japonesa de melhoria contínua." },
        { word: "KANBAN", hint: "Sistema visual (cartões) para gestão de fluxo de trabalho." },
        { word: "ESTOQUE", hint: "Acúmulo de materiais ou produtos para venda ou uso futuro." },
        { word: "SUPPLY CHAIN", hint: "Cadeia de Suprimentos: rede que conecta fornecedores ao cliente final." },
        { word: "JUST IN TIME", hint: "Produzir apenas o necessário, no momento certo e na quantidade certa." },
        { word: "ARMAZEM", hint: "Local físico destinado à guarda e conservação de materiais." },
        { word: "FIFO", hint: "Método onde o primeiro produto a entrar é o primeiro a sair (PEPS)." },
        { word: "LIFO", hint: "Método onde o último produto a entrar é o primeiro a sair (UEPS)." },
        { word: "FEFO", hint: "Método baseado na data de validade: Primeiro a Vencer, Primeiro a Sair." },
        { word: "CROSS DOCKING", hint: "Sistema de distribuição onde a mercadoria cruza a doca sem ser estocada." },
        { word: "PICKING", hint: "Processo de separação e preparação de pedidos no armazém." },
        { word: "SKU", hint: "Stock Keeping Unit: Unidade de Manutenção de Estoque (código único)." },
        { word: "LAST MILE", hint: "A última etapa da entrega, do centro de distribuição até o cliente." },
        { word: "MODAL", hint: "Tipo de transporte utilizado (Rodoviário, Aéreo, Marítimo, etc.)." }
    ];

    let currentWordObj = null;
    let guessedLetters = [];
    let wrongGuesses = 0;
    const maxWrongGuesses = 6;
    let isGameOver = false;

    // --- UI Elements ---
    
    // 1. Hangman Drawing (SVG)
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
        <svg width="200" height="250" viewBox="0 0 200 250" style="stroke: var(--text-color); stroke-width: 4; fill: none; stroke-linecap: round; stroke-linejoin: round;">
            <!-- Base -->
            <line x1="20" y1="230" x2="180" y2="230" />
            <line x1="50" y1="230" x2="50" y2="20" />
            <line x1="50" y1="20" x2="120" y2="20" />
            <line x1="120" y1="20" x2="120" y2="50" />
            
            <!-- Parts (Initially Hidden) -->
            <circle id="part-0" cx="120" cy="70" r="20" style="display:none" /> <!-- Head -->
            <line id="part-1" x1="120" y1="90" x2="120" y2="170" style="display:none" /> <!-- Body -->
            <line id="part-2" x1="120" y1="110" x2="90" y2="140" style="display:none" /> <!-- Left Arm -->
            <line id="part-3" x1="120" y1="110" x2="150" y2="140" style="display:none" /> <!-- Right Arm -->
            <line id="part-4" x1="120" y1="170" x2="90" y2="210" style="display:none" /> <!-- Left Leg -->
            <line id="part-5" x1="120" y1="170" x2="150" y2="210" style="display:none" /> <!-- Right Leg -->
        </svg>
    `;

    // 2. Hint Display
    const hintDisplay = document.createElement('div');
    applyStyles(hintDisplay, {
        backgroundColor: 'var(--timeline-bg)',
        padding: '1rem',
        borderRadius: '8px',
        borderLeft: '4px solid var(--primary-color)',
        fontSize: '1.1rem',
        fontStyle: 'italic',
        textAlign: 'center',
        width: '100%'
    });

    // 3. Word Display
    const wordDisplay = document.createElement('div');
    applyStyles(wordDisplay, {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        margin: '1rem 0'
    });

    // 4. Keyboard
    const keyboard = document.createElement('div');
    applyStyles(keyboard, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
        gap: '8px',
        width: '100%',
        maxWidth: '600px'
    });

    // 5. Message/Reset Area
    const messageArea = document.createElement('div');
    applyStyles(messageArea, {
        textAlign: 'center',
        minHeight: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    });

    // --- Functions ---

    const renderWord = () => {
        wordDisplay.innerHTML = '';
        if (!currentWordObj) return;

        const word = currentWordObj.word;
        for (let char of word) {
            const slot = document.createElement('div');
            applyStyles(slot, {
                width: '30px',
                height: '40px',
                borderBottom: '3px solid var(--text-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--text-color)',
                margin: '0 5px'
            });

            if (char === ' ') {
                slot.style.borderBottom = 'none';
                slot.innerHTML = '&nbsp;';
                slot.style.width = '20px';
            } else if (guessedLetters.includes(char) || isGameOver) {
                slot.textContent = char;
                if (isGameOver && !guessedLetters.includes(char)) {
                    slot.style.color = '#ff6b6b'; // Letras não descobertas em vermelho
                }
            } else {
                slot.textContent = '';
            }
            wordDisplay.appendChild(slot);
        }
    };

    const updateHangman = () => {
        for (let i = 0; i < maxWrongGuesses; i++) {
            const part = svgContainer.querySelector(`#part-${i}`);
            if (part && (part instanceof HTMLElement || part instanceof SVGElement)) {
                part.style.display = i < wrongGuesses ? 'block' : 'none';
            }
        }
    };

    const renderKeyboard = () => {
        keyboard.innerHTML = '';
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let char of letters) {
            const btn = document.createElement('button');
            btn.textContent = char;
            const isGuessed = guessedLetters.includes(char);
            
            applyStyles(btn, {
                padding: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isGuessed || isGameOver ? 'default' : 'pointer',
                backgroundColor: isGuessed ? 'var(--timeline-bg)' : 'var(--button-bg)',
                color: isGuessed ? 'var(--text-color-light)' : 'var(--text-color)',
                border: '1px solid var(--card-border)',
                borderRadius: '6px',
                opacity: isGuessed || isGameOver ? '0.6' : '1'
            });

            if (!isGuessed && !isGameOver) {
                btn.addEventListener('click', () => handleGuess(char));
            }
            
            keyboard.appendChild(btn);
        }
    };

    const handleGuess = (char) => {
        if (isGameOver || guessedLetters.includes(char)) return;

        guessedLetters.push(char);
        
        if (!currentWordObj.word.includes(char)) {
            wrongGuesses++;
        }

        checkWinLoss();
        updateUI();
    };

    const checkWinLoss = () => {
        const wordClean = currentWordObj.word.replace(/ /g, '');
        const isWin = wordClean.split('').every(c => guessedLetters.includes(c));
        
        if (isWin) {
            isGameOver = true;
            messageArea.innerHTML = `<h3 style="color: var(--primary-color);">Parabéns! Você acertou! 🎉</h3>`;
            messageArea.appendChild(CtaButton('Jogar Novamente', startGame));
        } else if (wrongGuesses >= maxWrongGuesses) {
            isGameOver = true;
            messageArea.innerHTML = `<h3 style="color: #ff6b6b;">Fim de jogo! A palavra era: ${currentWordObj.word}</h3>`;
            messageArea.appendChild(CtaButton('Tentar Novamente', startGame));
        }
    };

    const updateUI = () => {
        renderWord();
        updateHangman();
        renderKeyboard();
    };

    const startGame = () => {
        // Reset State
        guessedLetters = [];
        wrongGuesses = 0;
        isGameOver = false;
        messageArea.innerHTML = '';
        
        // Pick Random Word
        const randomIndex = Math.floor(Math.random() * wordsData.length);
        currentWordObj = wordsData[randomIndex];
        
        // Set Hint
        hintDisplay.innerHTML = `<strong>DICA:</strong> ${currentWordObj.hint}`;

        updateUI();
    };

    // Initial Setup
    gameWrapper.append(svgContainer, hintDisplay, wordDisplay, keyboard, messageArea);
    container.append(header, gameWrapper);

    startGame();

    return container;
}
