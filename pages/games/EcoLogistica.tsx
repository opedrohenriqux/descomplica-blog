


import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderEcoLogistica(transitionTo, setSelectedGame) {
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

    // Game Control Variables
    let gameInterval;
    let spawnInterval;
    let isGameRunning = false;
    let items = []; // { id, element, type, x, speed, isDragging, cleanupListeners }
    let score = 0;
    let lives = 3;
    let gameSpeed = 2;
    let itemIdCounter = 0;

    const backButton = CtaButton('← Voltar aos Jogos', () => {
        stopGame();
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0' });

    if (window.innerWidth <= 768) {
        backButton.style.position = 'relative';
        backButton.style.marginBottom = '1rem';
        backButton.style.alignSelf = 'flex-start';
    }

    const title = document.createElement('h2');
    title.textContent = 'Eco Logística';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Logística Reversa na prática! Arraste os itens da esteira para o destino correto:<br><strong>♻️ Reciclagem</strong>, <strong>🛠️ Conserto</strong> ou <strong>🏪 Revenda</strong>.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // --- Game Container ---
    const gameWrapper = document.createElement('div');
    applyStyles(gameWrapper, {
        width: '100%',
        maxWidth: '900px',
        height: '500px',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        borderRadius: '12px',
        border: '4px solid var(--text-color)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
    });

    // HUD
    const hud = document.createElement('div');
    applyStyles(hud, {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: 'var(--card-bg)',
        borderBottom: '2px solid #ccc',
        fontWeight: 'bold',
        zIndex: '10',
        position: 'relative'
    });
    
    const scoreEl = document.createElement('div');
    scoreEl.innerHTML = `Pontos: <span id="eco-score" style="color:var(--primary-color)">0</span>`;
    
    const livesEl = document.createElement('div');
    livesEl.innerHTML = `Vidas: <span id="eco-lives">❤️❤️❤️</span>`;
    
    hud.append(scoreEl, livesEl);

    // Belt Area (The Conveyor Belt)
    const beltArea = document.createElement('div');
    applyStyles(beltArea, {
        flex: '1',
        position: 'relative',
        backgroundColor: '#555',
        backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,.1) 50%)',
        backgroundSize: '50px 50px',
        overflow: 'hidden'
    });
    
    // Animate Belt Background via CSS
    const beltStyle = document.createElement('style');
    beltStyle.textContent = `
        @keyframes moveBelt { 
            from { background-position: 0 0; } 
            to { background-position: 50px 0; } 
        }
        .belt-moving { animation: moveBelt 0.5s linear infinite; }
    `;
    document.head.appendChild(beltStyle);
    beltArea.classList.add('belt-moving');

    // Bins Area (Drop Zones)
    const binsContainer = document.createElement('div');
    applyStyles(binsContainer, {
        height: 'auto',
        minHeight: '120px', // Reduced min height for flexibility
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#333',
        gap: '10px'
    });

    const binTypes = [
        { id: 'recycle', label: 'Reciclagem', icon: '♻️', color: '#2ecc71', desc: 'Lixo, sucata' },
        { id: 'repair', label: 'Conserto', icon: '🛠️', color: '#f39c12', desc: 'Defeito leve' },
        { id: 'resell', label: 'Revenda', icon: '🏪', color: '#3498db', desc: 'Produto perfeito' }
    ];

    // Map for hit testing
    const binElements = {};

    binTypes.forEach(bin => {
        const binEl = document.createElement('div');
        binEl.dataset.type = bin.id;
        applyStyles(binEl, {
            flex: '1',
            backgroundColor: bin.color,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            border: '4px solid transparent',
            transition: 'transform 0.2s, border-color 0.2s',
            padding: '5px'
        });
        
        // Adjusted font sizes for mobile
        binEl.innerHTML = `
            <div style="font-size: clamp(1.5rem, 4vw, 2.5rem);">${bin.icon}</div>
            <div style="font-weight: bold; font-size: clamp(0.8rem, 2.5vw, 1rem); text-align: center;">${bin.label}</div>
            <div style="font-size: clamp(0.6rem, 2vw, 0.7rem); opacity: 0.9; text-align: center;">${bin.desc}</div>
        `;
        
        binsContainer.appendChild(binEl);
        binElements[bin.id] = binEl;
    });

    gameWrapper.append(hud, beltArea, binsContainer);

    // --- Game Logic Data ---
    const itemDefinitions = [
        // Recycle (Lixo)
        { icon: '🥤', type: 'recycle', name: 'Garrafa Plástica' },
        { icon: '🗞️', type: 'recycle', name: 'Jornal Velho' },
        { icon: '📦', type: 'recycle', name: 'Caixa Rasgada' },
        { icon: '🔋', type: 'recycle', name: 'Bateria Velha' },
        { icon: '🍽️', type: 'recycle', name: 'Prato Quebrado' },
        
        // Repair (Conserto)
        { icon: '📱', type: 'repair', name: 'Celular c/ Defeito' },
        { icon: '💻', type: 'repair', name: 'Notebook Lento' },
        { icon: '🪑', type: 'repair', name: 'Cadeira Bamba' },
        { icon: '⌚', type: 'repair', name: 'Relógio Parado' },
        { icon: '🚲', type: 'repair', name: 'Bicicleta s/ Freio' },

        // Resell (Revenda/Estoque)
        { icon: '👕', type: 'resell', name: 'Camisa Nova' },
        { icon: '👟', type: 'resell', name: 'Tênis na Caixa' },
        { icon: '📕', type: 'resell', name: 'Livro Novo' },
        { icon: '🎮', type: 'resell', name: 'Videogame Lacrado' },
        { icon: '🎒', type: 'resell', name: 'Mochila Perfeita' }
    ];

    function spawnItem() {
        const def = itemDefinitions[Math.floor(Math.random() * itemDefinitions.length)];
        
        const el = document.createElement('div');
        el.textContent = def.icon;
        el.title = def.name;
        applyStyles(el, {
            position: 'absolute',
            left: '-60px', // Start off screen
            top: '40%', // Middle of belt
            fontSize: '3rem',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none', // Prevent scrolling while dragging
            transition: 'transform 0.1s',
            zIndex: '20'
        });

        const itemObj = {
            id: itemIdCounter++,
            element: el,
            type: def.type,
            x: -60,
            y: 40, // Percent
            speed: gameSpeed + (Math.random() * 0.5),
            isDragging: false,
            cleanupListeners: null // Placeholder
        };

        // Input Handling (Mouse & Touch)
        const startDrag = (e) => {
            if (!isGameRunning) return;
            e.preventDefault();
            itemObj.isDragging = true;
            el.style.cursor = 'grabbing';
            el.style.zIndex = '100';
            el.style.transform = 'scale(1.2)';
            
            // Initial positioning for drag
            moveAt(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        };

        const moveDrag = (e) => {
            if (!itemObj.isDragging) return;
            e.preventDefault(); // Prevent scrolling on mobile
            moveAt(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        };

        const endDrag = (e) => {
            if (!itemObj.isDragging) return;
            itemObj.isDragging = false;
            el.style.cursor = 'grab';
            el.style.zIndex = '20';
            el.style.transform = 'scale(1)';

            // Check Drop Zone
            const dropX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
            const dropY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);
            
            checkDrop(itemObj, dropX, dropY);
        };

        const moveAt = (pageX, pageY) => {
            // Get game wrapper offsets to calculate relative position
            const rect = gameWrapper.getBoundingClientRect();
            const relX = pageX - rect.left - (el.offsetWidth / 2);
            const relY = pageY - rect.top - (el.offsetHeight / 2);
            
            el.style.left = `${relX}px`;
            el.style.top = `${relY}px`;
        };

        el.addEventListener('mousedown', startDrag);
        el.addEventListener('touchstart', startDrag);
        
        // Global listeners are needed for smooth dragging outside the element
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('touchmove', moveDrag, { passive: false });
        
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);

        // Store cleanup function on item object to remove listeners later
        itemObj.cleanupListeners = () => {
            window.removeEventListener('mousemove', moveDrag);
            window.removeEventListener('touchmove', moveDrag);
            window.removeEventListener('mouseup', endDrag);
            window.removeEventListener('touchend', endDrag);
        };

        beltArea.appendChild(el);
        items.push(itemObj);
    }

    function checkDrop(item, x, y) {
        // Detect which bin is under the cursor/finger
        let droppedBin = null;
        
        for (const typeId in binElements) {
            const binRect = binElements[typeId].getBoundingClientRect();
            if (x >= binRect.left && x <= binRect.right && 
                y >= binRect.top && y <= binRect.bottom) {
                droppedBin = typeId;
                break;
            }
        }

        if (droppedBin) {
            if (droppedBin === item.type) {
                // Correct!
                score += 10;
                showFeedback(item.element, '+10', '#2ecc71');
                highlightBin(droppedBin, true);
                
                // Remove item
                if (item.cleanupListeners) item.cleanupListeners();
                item.element.remove();
                items = items.filter(i => i.id !== item.id);
                
                // Increase difficulty slightly
                if (score % 50 === 0) gameSpeed += 0.5;

            } else {
                // Wrong Bin
                lives--;
                showFeedback(item.element, 'X', '#e74c3c');
                highlightBin(droppedBin, false);
                
                // Reset item to belt (penalty)
                item.element.style.top = '40%';
                item.element.style.left = '-50px';
                item.x = -50;
            }
        } else {
            // Dropped in empty space, return to belt
            item.element.style.top = '40%';
            // Keep X approximate or reset? Let's keep X to not punish misclick too hard, 
            // but update the tracked X variable based on DOM to sync
            const rect = gameWrapper.getBoundingClientRect();
            // We need to reverse calc the left pixel to 'x' variable if we wanted to keep position
            // But for simplicity, let's just reset visual to what logical x should be
            item.element.style.left = `${item.x}px`;
        }
        
        updateHUD();
        if (lives <= 0) gameOver();
    }

    function highlightBin(id, isCorrect) {
        const bin = binElements[id];
        bin.style.borderColor = isCorrect ? '#fff' : '#e74c3c';
        bin.style.transform = 'scale(1.1)';
        setTimeout(() => {
            bin.style.borderColor = 'transparent';
            bin.style.transform = 'scale(1)';
        }, 300);
    }

    function showFeedback(el, text, color) {
        const rect = el.getBoundingClientRect();
        const gameRect = gameWrapper.getBoundingClientRect();
        
        const fb = document.createElement('div');
        fb.textContent = text;
        applyStyles(fb, {
            position: 'absolute',
            left: `${rect.left - gameRect.left}px`,
            top: `${rect.top - gameRect.top}px`,
            color: color,
            fontWeight: 'bold',
            fontSize: '2rem',
            pointerEvents: 'none',
            zIndex: '100',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            animation: 'floatUpFade 1s ease-out forwards'
        });
        
        gameWrapper.appendChild(fb);
        setTimeout(() => fb.remove(), 1000);
    }

    function updateHUD() {
        const scoreEl = document.getElementById('eco-score');
        const livesEl = document.getElementById('eco-lives');
        if(scoreEl) scoreEl.textContent = score.toString();
        if(livesEl) {
            livesEl.textContent = '❤️'.repeat(lives);
        }
    }

    function gameLoop() {
        if (!isGameRunning) return;

        // Move items
        items.forEach(item => {
            if (!item.isDragging) {
                item.x += item.speed;
                item.element.style.left = `${item.x}px`;

                // Check if fell off the belt (right side)
                if (item.x > beltArea.clientWidth) {
                    lives--;
                    updateHUD();
                    
                    if (item.cleanupListeners) item.cleanupListeners();
                    item.element.remove();
                    items = items.filter(i => i.id !== item.id);
                    
                    if (lives <= 0) gameOver();
                }
            }
        });

        gameInterval = requestAnimationFrame(gameLoop);
    }

    function startGame() {
        score = 0;
        lives = 3;
        gameSpeed = 2;
        items.forEach(i => {
            if (i.cleanupListeners) i.cleanupListeners();
            i.element.remove();
        });
        items = [];
        isGameRunning = true;
        updateHUD();
        
        gameLoop();
        
        if (spawnInterval) clearInterval(spawnInterval);
        
        // Dynamic spawn rate
        const spawnLoop = () => {
            if (!isGameRunning) return;
            spawnItem();
            const rate = Math.max(1000, 2500 - (score * 10));
            spawnInterval = setTimeout(spawnLoop, rate);
        };
        spawnLoop();
    }

    function stopGame() {
        isGameRunning = false;
        cancelAnimationFrame(gameInterval);
        clearTimeout(spawnInterval);
        items.forEach(i => {
            if (i.cleanupListeners) i.cleanupListeners();
        });
    }

    function gameOver() {
        stopGame();
        const overlay = document.createElement('div');
        applyStyles(overlay, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '200',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#fff', borderRadius: '12px'
        });
        
        overlay.innerHTML = `
            <h2 style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;">Fim de Jogo!</h2>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">Pontuação Final: <strong>${score}</strong></p>
        `;
        
        const restartBtn = CtaButton('Jogar Novamente', () => {
            overlay.remove();
            startGame();
        });
        
        overlay.appendChild(restartBtn);
        gameWrapper.appendChild(overlay);
    }

    // Start Screen
    const startOverlay = document.createElement('div');
    applyStyles(startOverlay, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'var(--bg-color)', zIndex: '100',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center'
    });
    
    startOverlay.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">♻️</div>
        <h3 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 1rem;">Como Jogar</h3>
        <ul style="text-align: left; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; list-style: none; padding: 0;">
            <li>📦 Itens passarão pela esteira.</li>
            <li>👆 <strong>Arraste e solte</strong> cada item na lixeira correta.</li>
            <li>⚠️ Se o item cair da esteira ou for para a lixeira errada, você perde uma vida.</li>
            <li>⚡ A esteira fica mais rápida conforme você pontua!</li>
        </ul>
    `;
    
    const startBtn = CtaButton('Iniciar Turno', () => {
        startOverlay.style.display = 'none';
        startGame();
    });
    
    startOverlay.appendChild(startBtn);
    gameWrapper.appendChild(startOverlay);

    // CSS Animation Style
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes floatUpFade {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-30px); opacity: 0; }
        }
    `;
    document.head.appendChild(animStyle);

    container.append(header, gameWrapper);
    return container;
}
