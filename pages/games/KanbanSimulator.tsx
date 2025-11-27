


import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderKanbanSimulator(transitionTo, setSelectedGame) {
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

    // Controle do Loop do Jogo
    let gameInterval;
    let spawnInterval;
    let isGameRunning = false;

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
    title.textContent = 'Simulador Kanban';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Gerencie o fluxo! Mova tarefas para <strong>Fazendo</strong> (respeite o limite!) e arquive quando estiverem prontas.<br>Não deixe a lista "A Fazer" transbordar!';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem', maxWidth: '800px' });

    header.append(backButton, title, subtitle);

    // --- Game Container ---
    const gameWrapper = document.createElement('div');
    applyStyles(gameWrapper, {
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    });

    // HUD (Heads Up Display)
    const hud = document.createElement('div');
    applyStyles(hud, {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 12px var(--card-shadow)',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    });
    
    const scoreEl = document.createElement('div');
    scoreEl.innerHTML = `Entregas: <span id="score-display" style="color:var(--primary-color)">0</span>`;
    
    const wipLimit = 4;
    const maxBacklog = 8;
    
    const backlogInfo = document.createElement('div');
    backlogInfo.innerHTML = `Gargalo (A Fazer): <span id="backlog-count">0</span>/${maxBacklog}`;
    
    hud.append(scoreEl, backlogInfo);

    // Board
    const board = document.createElement('div');
    // Ajuste para mobile: colunas menores ou 100%
    applyStyles(board, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        minHeight: '500px'
    });

    // Styles for columns
    const colStyle = {
        backgroundColor: 'var(--timeline-bg)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid var(--card-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'background-color 0.3s',
        minHeight: '400px'
    };

    const headerStyle = {
        textAlign: 'center',
        borderBottom: '2px solid var(--card-border)',
        paddingBottom: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: '700',
        color: 'var(--text-color)'
    };

    // Columns IDs
    const COL_TODO_ID = 'col-todo-list';
    const COL_DOING_ID = 'col-doing-list';
    const COL_DONE_ID = 'col-done-list';

    // Columns
    const colTodo = document.createElement('div');
    applyStyles(colTodo, colStyle);
    colTodo.innerHTML = `<div style="${Object.entries(headerStyle).map(([k,v]) => `${k.replace(/[A-Z]/g, m => "-"+m.toLowerCase())}:${v}`).join(';')}">A Fazer (Backlog)</div><div class="task-list" id="${COL_TODO_ID}" style="flex:1; display:flex; flex-direction:column; gap:10px;"></div>`;

    const colDoing = document.createElement('div');
    colDoing.id = 'col-doing-container';
    applyStyles(colDoing, colStyle);
    colDoing.innerHTML = `<div style="${Object.entries(headerStyle).map(([k,v]) => `${k.replace(/[A-Z]/g, m => "-"+m.toLowerCase())}:${v}`).join(';')}">Fazendo (WIP: <span id="wip-count">0</span>/${wipLimit})</div><div class="task-list" id="${COL_DOING_ID}" style="flex:1; display:flex; flex-direction:column; gap:10px;"></div>`;

    const colDone = document.createElement('div');
    applyStyles(colDone, colStyle);
    colDone.innerHTML = `<div style="${Object.entries(headerStyle).map(([k,v]) => `${k.replace(/[A-Z]/g, m => "-"+m.toLowerCase())}:${v}`).join(';')}">Concluído</div><div class="task-list" id="${COL_DONE_ID}" style="flex:1; display:flex; flex-direction:column; gap:10px; opacity: 0.7;"></div>`;

    board.append(colTodo, colDoing, colDone);
    gameWrapper.append(hud, board);

    // --- Game Logic ---
    let tasks = []; 
    let taskIdCounter = 0;
    let score = 0;

    const taskTypes = [
        { title: "Emitir Nota Fiscal", speed: 0.8, color: "#ff9f43" },
        { title: "Conferir Carga", speed: 0.5, color: "#54a0ff" },
        { title: "Separar Pedido", speed: 0.6, color: "#1dd1a1" },
        { title: "Carregar Caminhão", speed: 0.4, color: "#ff6b6b" },
        { title: "Inventário Rápido", speed: 0.9, color: "#feca57" }
    ];

    function createTaskElement(task) {
        const el = document.createElement('div');
        el.className = 'kanban-task-card';
        el.id = `task-${task.id}`;
        
        applyStyles(el, {
            backgroundColor: 'var(--card-bg)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 5px var(--card-shadow)',
            cursor: 'pointer',
            borderLeft: `5px solid ${task.color}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.1s, border 0.2s',
            animation: 'slideIn 0.3s ease-out'
        });
        
        el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.02)');
        el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
        
        // Handler de clique único
        el.addEventListener('click', () => handleTaskClick(task));

        const title = document.createElement('div');
        title.textContent = task.title;
        title.style.fontWeight = '600';
        title.style.fontSize = '0.9rem';
        title.style.marginBottom = '0.5rem';
        title.style.pointerEvents = 'none'; // Evita clique no texto
        
        // Progress Bar Background
        const progBg = document.createElement('div');
        progBg.style.pointerEvents = 'none';
        applyStyles(progBg, { width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px' });
        
        // Progress Bar Fill
        const progFill = document.createElement('div');
        progFill.className = 'prog-fill';
        applyStyles(progFill, { 
            width: '0%', 
            height: '100%', 
            backgroundColor: task.color, 
            borderRadius: '3px',
            transition: 'width 0.1s linear, background-color 0.3s' 
        });
        progBg.appendChild(progFill);

        el.append(title, progBg);
        return el;
    }

    function handleTaskClick(task) {
        if (!isGameRunning) return;

        if (task.state === 'todo') {
            const currentWip = tasks.filter(t => t.state === 'doing').length;
            if (currentWip < wipLimit) {
                task.state = 'doing';
                moveDomToColumn(task);
            } else {
                // Visual feedback for WIP limit hit
                const container = document.getElementById('col-doing-container');
                if(container) {
                    container.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    setTimeout(() => container.style.backgroundColor = 'var(--timeline-bg)', 200);
                }
            }
        } else if (task.state === 'doing' && task.progress >= 100) {
            task.state = 'done';
            score++;
            
            // Update DOM
            moveDomToColumn(task);
            
            // Remove after delay
            setTimeout(() => {
                if (task.domElement && task.domElement.parentNode) {
                    task.domElement.parentNode.removeChild(task.domElement);
                }
                tasks = tasks.filter(t => t.id !== task.id);
            }, 500);
        }
    }

    function moveDomToColumn(task) {
        const todoCol = document.getElementById(COL_TODO_ID);
        const doingCol = document.getElementById(COL_DOING_ID);
        const doneCol = document.getElementById(COL_DONE_ID);

        if (task.state === 'todo' && todoCol) {
            todoCol.appendChild(task.domElement);
        } else if (task.state === 'doing' && doingCol) {
            doingCol.appendChild(task.domElement);
        } else if (task.state === 'done' && doneCol) {
            doneCol.appendChild(task.domElement);
            // Visual done state
            task.domElement.style.opacity = '0.6';
            task.domElement.style.cursor = 'default';
        }
    }

    function spawnTask() {
        const type = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const task = {
            id: taskIdCounter++,
            title: type.title,
            color: type.color,
            progress: 0,
            state: 'todo',
            speed: type.speed * (1 + score * 0.05), // Difficulty scaling
            domElement: null
        };
        
        // Create DOM immediately
        task.domElement = createTaskElement(task);
        tasks.push(task);
        
        // Initial placement
        const todoCol = document.getElementById(COL_TODO_ID);
        if(todoCol) todoCol.appendChild(task.domElement);
        
        checkGameOver();
    }

    function gameLoop() {
        if (!isGameRunning) return;

        let wipCount = 0;
        let backlogCount = 0;

        tasks.forEach(task => {
            // Logic Update
            if (task.state === 'doing' && task.progress < 100) {
                task.progress += task.speed;
                if (task.progress > 100) task.progress = 100;
            }

            // Visual Update (Direct DOM manipulation)
            if (task.domElement) {
                const bar = task.domElement.querySelector('.prog-fill');
                if (bar) {
                    bar.style.width = `${task.progress}%`;
                    if (task.progress >= 100 && task.state === 'doing') {
                        bar.style.backgroundColor = '#4cd137';
                        if (!task.domElement.classList.contains('ready')) {
                            task.domElement.classList.add('ready');
                            task.domElement.style.border = '2px solid #4cd137';
                            const readyBadge = document.createElement('div');
                            readyBadge.textContent = 'PRONTO ✔';
                            applyStyles(readyBadge, {
                                position: 'absolute', right: '10px', top: '10px', 
                                backgroundColor: '#4cd137', color: '#fff', 
                                fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px',
                                pointerEvents: 'none'
                            });
                            task.domElement.appendChild(readyBadge);
                        }
                    }
                }
            }

            // Count Stats
            if (task.state === 'todo') backlogCount++;
            if (task.state === 'doing') wipCount++;
        });

        // Update Counters
        const wipEl = document.getElementById('wip-count');
        if (wipEl) {
            wipEl.textContent = wipCount.toString();
            wipEl.style.color = wipCount >= wipLimit ? 'red' : 'var(--text-color)';
        }
        
        const backlogEl = document.getElementById('backlog-count');
        if(backlogEl) {
            backlogEl.textContent = backlogCount.toString();
            backlogEl.style.color = backlogCount >= maxBacklog ? 'red' : 'var(--text-color)';
        }
        
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) scoreDisplay.textContent = score.toString();

        checkGameOver(backlogCount);
    }

    function checkGameOver(backlogCount = 0) {
        if (backlogCount > maxBacklog) {
            gameOver();
        }
    }

    function startSimulation() {
        // Clear old tasks
        const todoCol = document.getElementById(COL_TODO_ID);
        const doingCol = document.getElementById(COL_DOING_ID);
        const doneCol = document.getElementById(COL_DONE_ID);
        if(todoCol) todoCol.innerHTML = '';
        if(doingCol) doingCol.innerHTML = '';
        if(doneCol) doneCol.innerHTML = '';

        isGameRunning = true;
        tasks = [];
        score = 0;
        taskIdCounter = 0;
        
        // Initial Tasks
        spawnTask();
        spawnTask();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 50); 
        
        // Spawn system
        let spawnTime = 2500;
        const spawner = () => {
            if (!isGameRunning) return;
            spawnTask();
            const newSpawnTime = Math.max(800, 2500 - (score * 50));
            clearTimeout(spawnInterval);
            spawnInterval = setTimeout(spawner, newSpawnTime);
        };
        spawnInterval = setTimeout(spawner, spawnTime);
    }

    function stopGame() {
        isGameRunning = false;
        clearInterval(gameInterval);
        clearTimeout(spawnInterval);
    }

    function gameOver() {
        stopGame();
        
        const overlay = document.createElement('div');
        applyStyles(overlay, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: '100', borderRadius: '12px', color: '#fff', textAlign: 'center'
        });

        overlay.innerHTML = `
            <h2 style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;">Gargalo Crítico!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">A coluna "A Fazer" lotou. A operação parou.</p>
            <div style="font-size: 1.5rem; margin-bottom: 2rem;">Entregas Realizadas: <strong>${score}</strong></div>
        `;

        const retryBtn = CtaButton('Tentar Novamente', () => {
            overlay.remove();
            startSimulation();
        });

        overlay.appendChild(retryBtn);
        gameWrapper.appendChild(overlay);
    }

    // Start Screen
    const startOverlay = document.createElement('div');
    applyStyles(startOverlay, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'var(--bg-color)', zIndex: '50',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem'
    });
    
    startOverlay.innerHTML = `
        <div style="text-align: center; max-width: 600px;">
            <h3 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 1rem;">Regras do Gestor</h3>
            <ul style="text-align: left; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; list-style: none; padding: 0;">
                <li>📥 <strong>A Fazer:</strong> As tarefas chegam aqui. Se passar de 8, você perde!</li>
                <li>⚙️ <strong>Fazendo:</strong> Clique em uma tarefa de "A Fazer" para movê-la para cá. <strong>Limite máximo de 4</strong> ao mesmo tempo.</li>
                <li>✅ <strong>Concluído:</strong> Quando a barra encher (ficar verde), clique na tarefa para entregar e ganhar pontos.</li>
            </ul>
        </div>
    `;
    
    const btnStart = CtaButton('Iniciar Turno', () => {
        startOverlay.style.display = 'none';
        startSimulation();
    });
    
    startOverlay.appendChild(btnStart);
    gameWrapper.appendChild(startOverlay);

    // Add keyframes for animations
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);

    container.append(header, gameWrapper);
    return container;
}
