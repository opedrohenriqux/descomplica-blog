


import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderJitManager(transitionTo, setSelectedGame) {
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

    // Game Interval Control
    let dayInterval;
    let isPaused = false;
    let showTips = false; // Estado para controlar as dicas
    let gameSpeed = 2000; // ms per day (Slower for better playability)

    const backButton = CtaButton('← Voltar aos Jogos', () => {
        clearInterval(dayInterval);
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0' });

    if (window.innerWidth <= 768) {
        backButton.style.position = 'relative';
        backButton.style.marginBottom = '1rem';
        backButton.style.alignSelf = 'flex-start';
    }

    const title = document.createElement('h2');
    title.textContent = 'Gerente Just in Time';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Produza na hora certa! Evite estoques (custo) e atrasos (multa).<br>A meta é entregar o pedido <strong>exatamente</strong> no dia do prazo.';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // --- Game UI Structure ---
    const gameWrapper = document.createElement('div');
    applyStyles(gameWrapper, {
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    });

    // Dashboard (Top Bar)
    const dashboard = document.createElement('div');
    applyStyles(dashboard, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', // Reduced minmax for mobile
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 12px var(--card-shadow)',
        textAlign: 'center'
    });

    const createDashItem = (label, valueId, icon) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-color);">${icon}</div>
            <div style="font-size: 0.8rem; color: var(--text-color-light); text-transform: uppercase; letter-spacing: 1px;">${label}</div>
            <div id="${valueId}" style="font-size: 1.3rem; font-weight: 700; color: var(--text-color);">0</div>
        `;
        return div;
    };

    dashboard.append(
        createDashItem('Dia', 'jit-day', '📅'),
        createDashItem('Saldo ($)', 'jit-balance', '💰'),
        createDashItem('Capacidade', 'jit-capacity', '🏭')
    );

    // Main Simulation Area
    const simulationArea = document.createElement('div');
    applyStyles(simulationArea, {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    });

    // Factory Visual
    const factoryContainer = document.createElement('div');
    applyStyles(factoryContainer, {
        backgroundColor: 'var(--timeline-bg)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
    });

    factoryContainer.innerHTML = `
        <div style="text-align: left; z-index: 2;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--text-color);">Status da Fábrica</h3>
            <div id="jit-factory-status" style="font-weight: 600; color: var(--text-color-subtle);">OCIOSA</div>
            <div id="jit-current-job" style="font-size: 0.9rem; margin-top: 0.5rem;">Nenhum pedido em produção</div>
        </div>
        <div style="font-size: 4rem; opacity: 0.2; z-index: 1;">⚙️</div>
        
        <!-- Progress Bar for Production -->
        <div style="position: absolute; bottom: 0; left: 0; height: 5px; width: 0%; background-color: var(--primary-color); transition: width 0.5s linear;" id="jit-progress-bar"></div>
    `;

    // Orders Grid
    const ordersTitle = document.createElement('h3');
    ordersTitle.textContent = 'Pedidos Pendentes';
    applyStyles(ordersTitle, { margin: '1rem 0 0.5rem 0', color: 'var(--text-color)' });

    const ordersGrid = document.createElement('div');
    ordersGrid.id = 'jit-orders-grid';
    applyStyles(ordersGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Slightly reduced for mobile
        gap: '1rem'
    });

    simulationArea.append(factoryContainer, ordersTitle, ordersGrid);
    gameWrapper.append(dashboard, simulationArea);

    // --- Game Logic ---
    let currentDay = 1;
    let balance = 1000;
    let factoryCapacity = 10; // Units per day
    let orders = []; // { id, client, quantity, dueDay, status: 'pending'|'producing'|'completed', value }
    let production = null; // { orderId, daysRemaining, totalDays }
    let orderIdCounter = 1;

    // Updates UI Elements
    const updateUI = () => {
        const dayEl = document.getElementById('jit-day');
        const balanceEl = document.getElementById('jit-balance');
        const capEl = document.getElementById('jit-capacity');
        const statusEl = document.getElementById('jit-factory-status');
        const jobEl = document.getElementById('jit-current-job');
        const progressEl = document.getElementById('jit-progress-bar');

        if (dayEl) dayEl.textContent = currentDay.toString();
        if (balanceEl) {
            balanceEl.textContent = balance.toFixed(0);
            balanceEl.style.color = balance < 0 ? '#ff6b6b' : 'var(--text-color)';
        }
        if (capEl) capEl.textContent = `${factoryCapacity} un/dia`;

        if (statusEl && jobEl && progressEl) {
            if (production) {
                statusEl.textContent = "EM PRODUÇÃO 🔨";
                statusEl.style.color = "#e67e22";
                const order = orders.find(o => o.id === production.orderId);
                jobEl.innerHTML = `Produzindo Pedido #${order.id}<br>Dias restantes: <strong>${production.daysRemaining}</strong>`;
                
                const progress = ((production.totalDays - production.daysRemaining) / production.totalDays) * 100;
                progressEl.style.width = `${progress}%`;
            } else {
                statusEl.textContent = "OCIOSA 💤";
                statusEl.style.color = "var(--text-color-subtle)";
                jobEl.textContent = "Aguardando ordem de produção";
                progressEl.style.width = `0%`;
            }
        }

        renderOrders();
    };

    const renderOrders = () => {
        ordersGrid.innerHTML = '';
        
        // Sort: Active production first, then by Due Day
        const sortedOrders = [...orders].sort((a, b) => {
            if (a.status === 'producing') return -1;
            if (b.status === 'producing') return 1;
            return a.dueDay - b.dueDay;
        });

        if (sortedOrders.length === 0) {
            ordersGrid.innerHTML = `<p style="color: var(--text-color-light); grid-column: 1/-1; text-align: center;">Nenhum pedido pendente.</p>`;
            return;
        }

        sortedOrders.forEach(order => {
            if (order.status === 'completed') return;

            const card = document.createElement('div');
            applyStyles(card, {
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '1rem',
                boxShadow: '0 2px 5px var(--card-shadow)',
                borderLeft: order.status === 'producing' ? '5px solid #e67e22' : '5px solid var(--card-border)',
                opacity: order.status === 'producing' ? '1' : '0.9',
                position: 'relative',
                transition: 'border 0.3s, transform 0.3s'
            });

            const productionTime = Math.ceil(order.quantity / factoryCapacity);
            const idealStartDay = order.dueDay - productionTime;
            
            // Visual cue for difficulty
            let timeStatus = "";
            let statusColor = "var(--text-color-light)";
            let cardHighlight = "";

            if (currentDay > idealStartDay) {
                timeStatus = `⚠️ ATRASADO!`;
                statusColor = "#ff6b6b";
            } else if (currentDay === idealStartDay) {
                timeStatus = `⭐ DIA IDEAL!`;
                statusColor = "#2ecc71";
                if (!production && order.status !== 'producing') {
                    card.style.border = "2px solid #2ecc71"; // Highlight card
                    card.style.transform = "scale(1.03)";
                }
            } else {
                const daysUntilStart = idealStartDay - currentDay;
                timeStatus = `Aguarde ${daysUntilStart} dias`;
            }

            let tipHtml = "";
            if (showTips && order.status !== 'producing') {
                tipHtml = `
                    <div style="margin-top: 0.8rem; padding: 0.5rem; background-color: rgba(254, 199, 0, 0.15); border-radius: 6px; border-left: 3px solid var(--primary-color); font-size: 0.85rem; color: var(--text-color);">
                        <strong>💡 Dica JIT:</strong><br>
                        ${order.quantity} un / ${factoryCapacity} cap = <strong>${productionTime} dias</strong> prod.<br>
                        Prazo (Dia ${order.dueDay}) - ${productionTime} dias = <br>
                        <strong>Iniciar no Dia ${idealStartDay}</strong>
                    </div>
                `;
            }

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
                    <span style="font-weight:700;">Pedido #${order.id}</span>
                    <span style="font-size:0.9rem; color:var(--text-color-light);">Valor: $${order.value}</span>
                </div>
                <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">
                    Cliente: <strong>${order.client}</strong><br>
                    Quantidade: <strong>${order.quantity} un.</strong><br>
                    Prazo de Entrega: Dia <strong>${order.dueDay}</strong>
                </div>
                <div style="background: var(--timeline-bg); padding: 0.5rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 0.5rem;">
                    Tempo de Produção: <strong>${productionTime} dias</strong><br>
                    <span style="color: ${statusColor}; font-weight: bold;">${timeStatus}</span>
                </div>
                ${tipHtml}
            `;

            const btn = document.createElement('button');
            
            if (order.status === 'producing') {
                btn.textContent = 'Em Produção...';
                btn.disabled = true;
                applyStyles(btn, {
                    width: '100%', padding: '0.5rem', borderRadius: '4px', border: 'none',
                    backgroundColor: '#ccc', color: '#666', cursor: 'not-allowed', marginTop: '0.5rem'
                });
            } else {
                btn.textContent = 'Iniciar Produção';
                const isFactoryBusy = production !== null;
                applyStyles(btn, {
                    width: '100%', padding: '0.5rem', borderRadius: '4px', border: 'none',
                    backgroundColor: isFactoryBusy ? '#eee' : 'var(--primary-color)',
                    color: isFactoryBusy ? '#aaa' : '#333',
                    fontWeight: '600',
                    cursor: isFactoryBusy ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.1s',
                    marginTop: '0.5rem'
                });
                
                if (!isFactoryBusy) {
                    btn.addEventListener('click', () => startProduction(order));
                    btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.98)');
                    btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');
                } else {
                    btn.disabled = true;
                }
            }

            card.appendChild(btn);
            ordersGrid.appendChild(card);
        });
    };

    const startProduction = (order) => {
        if (production) return; // Factory busy

        const daysNeeded = Math.ceil(order.quantity / factoryCapacity);
        order.status = 'producing';
        production = {
            orderId: order.id,
            daysRemaining: daysNeeded,
            totalDays: daysNeeded
        };
        updateUI();
    };

    const advanceDay = () => {
        currentDay++;

        // Handle Production
        if (production) {
            production.daysRemaining--;
            if (production.daysRemaining <= 0) {
                completeOrder(production.orderId);
                production = null;
            }
        }

        // Handle Completed Orders (Storage Costs)
        orders.forEach(order => {
            if (order.status === 'completed_in_stock') {
                if (currentDay < order.dueDay) {
                    // Storage Cost
                    const dailyStorageCost = 20;
                    balance -= dailyStorageCost;
                    showFloatingText(`-$${dailyStorageCost} (Estoque)`, '#ff6b6b');
                } else if (currentDay === order.dueDay) {
                    // Deliver
                    deliverOrder(order);
                }
            }
        });

        // Generate New Orders (Randomly)
        if (Math.random() < 0.4) { // 40% chance per day
            generateOrder();
        }

        updateUI();
        checkGameOver();
    };

    const completeOrder = (orderId) => {
        const order = orders.find(o => o.id === orderId);
        
        if (currentDay > order.dueDay) {
            // LATE DELIVERY
            const daysLate = currentDay - order.dueDay;
            const penalty = 100 + (daysLate * 50);
            balance -= penalty; // Penalidade direta
            // Entrega imediata com multa
            balance += order.value; 
            showFloatingText(`ATRASADO! Multa: -$${penalty}`, '#d63031');
            order.status = 'completed';
            orders = orders.filter(o => o.id !== orderId);
        } else if (currentDay === order.dueDay) {
            // PERFECT JIT
            const bonus = 150;
            balance += order.value + bonus;
            showFloatingText(`JIT PERFEITO! +$${bonus}`, '#2ecc71');
            order.status = 'completed';
            orders = orders.filter(o => o.id !== orderId);
        } else {
            // EARLY (Stored)
            order.status = 'completed_in_stock'; // Holding status
            showFloatingText(`Estocado (Custo Diário)`, '#f39c12');
        }
    };

    const deliverOrder = (order) => {
        balance += order.value;
        showFloatingText(`Entregue +$${order.value}`, '#f1c40f');
        order.status = 'completed';
        orders = orders.filter(o => o.id !== order.id);
    };

    const generateOrder = () => {
        const clients = ['TechCorp', 'AutoParts', 'BuildIt', 'FastFood', 'RetailKing'];
        const quantity = Math.floor(Math.random() * 40) + 10; // 10 to 50
        const productionDays = Math.ceil(quantity / factoryCapacity);
        // Due day needs to be at least productionDays + buffer ahead
        const dueDay = currentDay + productionDays + Math.floor(Math.random() * 5) + 2; 
        
        const order = {
            id: orderIdCounter++,
            client: clients[Math.floor(Math.random() * clients.length)],
            quantity: quantity,
            dueDay: dueDay,
            status: 'pending',
            value: quantity * 10 // $10 per unit base value
        };
        orders.push(order);
    };

    const showFloatingText = (text, color) => {
        const floatEl = document.createElement('div');
        floatEl.textContent = text;
        applyStyles(floatEl, {
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            color: color,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            animation: 'floatUp 1.5s ease-out forwards',
            zIndex: '100'
        });
        factoryContainer.appendChild(floatEl);
        setTimeout(() => floatEl.remove(), 1500);
    };

    const checkGameOver = () => {
        if (balance < 0) {
            stopGame();
            showGameOver();
        }
    };

    const startGame = () => {
        // Reset variables
        currentDay = 1;
        balance = 1000;
        orders = [];
        production = null;
        orderIdCounter = 1;
        showTips = false; // Reset tips
        
        generateOrder(); // Start with one order
        updateUI();

        if (dayInterval) clearInterval(dayInterval);
        dayInterval = setInterval(() => {
            if (!isPaused) advanceDay();
        }, gameSpeed);
    };

    const stopGame = () => {
        clearInterval(dayInterval);
    };

    const showGameOver = () => {
        const overlay = document.createElement('div');
        applyStyles(overlay, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)', zIndex: '200',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#fff', borderRadius: '12px'
        });
        
        overlay.innerHTML = `
            <h2 style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b6b;">FALÊNCIA!</h2>
            <p style="font-size: 1.2rem;">Sua fábrica acumulou muitos prejuízos.</p>
            <p style="margin-bottom: 2rem;">Dias sobrevividos: <strong>${currentDay}</strong></p>
        `;
        
        const restartBtn = CtaButton('Tentar Novamente', () => {
            overlay.remove();
            startGame();
        });
        overlay.appendChild(restartBtn);
        gameWrapper.appendChild(overlay); // Append to wrapper to cover game
    };

    // Controls (Pause/Tips)
    const controls = document.createElement('div');
    applyStyles(controls, {
        display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap'
    });
    
    const pauseBtn = CtaButton('Pausar / Continuar', () => {
        isPaused = !isPaused;
        pauseBtn.style.opacity = isPaused ? '0.6' : '1';
        pauseBtn.textContent = isPaused ? 'Continuar ▶️' : 'Pausar ⏸️';
    });

    const tipsBtn = CtaButton('💡 Ativar Dicas', () => {
        showTips = !showTips;
        tipsBtn.style.backgroundColor = showTips ? 'var(--button-bg-hover)' : 'var(--button-bg)';
        tipsBtn.style.border = showTips ? '2px solid var(--primary-color)' : '2px solid var(--card-border)';
        tipsBtn.textContent = showTips ? '💡 Dicas: ON' : '💡 Ativar Dicas';
        updateUI(); // Re-render to show/hide tips
    });
    
    // Start Overlay
    const startOverlay = document.createElement('div');
    applyStyles(startOverlay, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'var(--bg-color)', zIndex: '100',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem'
    });
    
    startOverlay.innerHTML = `
        <h3 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 1rem;">Como Jogar</h3>
        <ul style="text-align: left; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; max-width: 600px;">
            <li>🏭 <strong>Sua fábrica faz 10 unidades por dia.</strong></li>
            <li>📅 Cada pedido tem um <strong>Prazo</strong> e uma <strong>Quantidade</strong>.</li>
            <li>🧠 Calcule: <em>Dias Necessários = Quantidade / 10</em>.</li>
            <li>✅ Inicie a produção para que termine <strong>EXATAMENTE</strong> no dia do prazo.</li>
            <li>💰 Terminar cedo gera custo de estoque. Terminar tarde gera multa.</li>
            <li>💡 <strong>Dica:</strong> Se estiver difícil, use o botão de Dicas!</li>
        </ul>
    `;
    
    const startBtn = CtaButton('Abrir Fábrica', () => {
        startOverlay.style.display = 'none';
        startGame();
    });
    
    startOverlay.appendChild(startBtn);
    gameWrapper.appendChild(startOverlay);

    controls.append(pauseBtn, tipsBtn);
    gameWrapper.append(controls); // Add controls below simulation

    // Styles for animation
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes floatUp {
        0% { transform: translate(-50%, 0); opacity: 1; }
        100% { transform: translate(-50%, -50px); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);

    container.append(header, gameWrapper);
    return container;
}
