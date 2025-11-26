

import { styles, applyStyles, CtaButton } from '../../utils.tsx';

export function renderLogisticaRun(transitionTo, setSelectedGame) {
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

    // Variável para controlar o loop do jogo e permitir cancelamento ao sair
    let gameAnimationId;
    let isGameRunning = false;

    const backButton = CtaButton('← Voltar aos Jogos', () => {
        // Cleanup ao sair
        if (gameAnimationId) cancelAnimationFrame(gameAnimationId);
        isGameRunning = false;
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0' });

    if (window.innerWidth <= 768) {
        backButton.style.position = 'relative';
        backButton.style.marginBottom = '1rem';
        backButton.style.alignSelf = 'flex-start';
    }

    const title = document.createElement('h2');
    title.textContent = 'Logística Run 2D';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'center'
    });

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Entregue as encomendas, desvie dos obstáculos e vá o mais longe possível!';
    applyStyles(subtitle, { color: 'var(--text-color-light)', textAlign: 'center', marginBottom: '2rem' });

    header.append(backButton, title, subtitle);

    // Container do Canvas
    const canvasContainer = document.createElement('div');
    applyStyles(canvasContainer, {
        position: 'relative',
        width: '100%',
        height: '60vh', // Altura fixa relativa à viewport
        maxHeight: '600px',
        backgroundColor: '#87CEEB',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        border: '4px solid var(--primary-color)'
    });

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const overlay = document.createElement('div');
    applyStyles(overlay, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        color: '#fff'
    });

    overlay.innerHTML = `
        <h2 style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-color);">Pronto?</h2>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">Use ESPAÇO ou TOQUE na tela para pular.</p>
    `;

    const startBtn = CtaButton('Começar Corrida', () => {
        overlay.style.display = 'none';
        startGame();
    });
    overlay.appendChild(startBtn);

    canvasContainer.append(canvas, overlay);
    container.append(header, canvasContainer);

    // --- Lógica do Jogo ---
    function startGame() {
        const ctx = canvas.getContext('2d');
        isGameRunning = true;
        
        let score = 0;
        let gameSpeed = 6;
        let gameOver = false;
        let frame = 0;

        // Ajuste de Resolução
        function resize() {
            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const GRAVITY = 0.6;
        const JUMP_FORCE = -12;
        const GROUND_HEIGHT = 50;
        
        // Input
        let keys = {};
        const handleKeyDown = (e) => {
             if (e.code === 'Space' || e.code === 'ArrowUp') {
                 e.preventDefault(); 
                 keys['Jump'] = true;
             }
        };
        const handleKeyUp = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') keys['Jump'] = false;
        };
        const handleTouchStart = (e) => { e.preventDefault(); keys['Jump'] = true; };
        const handleTouchEnd = (e) => { e.preventDefault(); keys['Jump'] = false; };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('touchstart', handleTouchStart, {passive: false});
        canvas.addEventListener('touchend', handleTouchEnd, {passive: false});
        canvas.addEventListener('mousedown', () => keys['Jump'] = true);
        canvas.addEventListener('mouseup', () => keys['Jump'] = false);

        // Game Objects
        const truck = {
            x: 50,
            y: 0,
            width: 80,
            height: 50,
            dy: 0,
            grounded: false,
            draw: function() {
                const truckY = this.y + (canvas.height - GROUND_HEIGHT - this.height);
                
                // Shadow
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.beginPath();
                ctx.ellipse(this.x + this.width/2, canvas.height - GROUND_HEIGHT + 5, this.width/2, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Body
                ctx.fillStyle = "#fec700";
                ctx.fillRect(this.x, truckY, this.width, this.height);
                ctx.fillRect(this.x + this.width, truckY + 15, 20, 35); // Cabin
                ctx.fillStyle = "#87CEEB"; // Window
                ctx.fillRect(this.x + this.width + 2, truckY + 18, 15, 15);
                
                // Wheels
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.arc(this.x + 20, truckY + this.height, 8, 0, Math.PI*2);
                ctx.arc(this.x + this.width + 5, truckY + this.height, 8, 0, Math.PI*2);
                ctx.fill();
            },
            update: function() {
                if (keys['Jump']) {
                    if (this.grounded) {
                        this.dy = JUMP_FORCE;
                        this.grounded = false;
                    }
                }
                this.y += this.dy;
                // Gravity
                if (this.y < 0) {
                    this.dy += GRAVITY;
                    this.grounded = false;
                } else {
                    this.dy = 0;
                    this.grounded = true;
                    this.y = 0;
                }
            }
        };

        let obstacles = [];
        let items = [];
        let clouds = [];

        class Obstacle {
            w: number;
            h: number;
            x: number;
            y: number;
            markedForDeletion: boolean;

            constructor() {
                this.w = 30;
                this.h = 40;
                this.x = canvas.width;
                this.y = canvas.height - GROUND_HEIGHT - this.h;
                this.markedForDeletion = false;
            }
            update() {
                this.x -= gameSpeed;
                if (this.x + this.w < 0) this.markedForDeletion = true;
            }
            draw() {
                ctx.fillStyle = "#e67e22";
                ctx.beginPath();
                ctx.moveTo(this.x + this.w / 2, this.y);
                ctx.lineTo(this.x + this.w, this.y + this.h);
                ctx.lineTo(this.x, this.y + this.h);
                ctx.closePath();
                ctx.fill();
            }
        }

        class Item {
            w: number;
            h: number;
            x: number;
            y: number;
            markedForDeletion: boolean;
            bobAngle: number;
            visualY: number;

            constructor() {
                this.w = 30;
                this.h = 30;
                this.x = canvas.width;
                this.y = canvas.height - GROUND_HEIGHT - this.h - (Math.random() > 0.5 ? 60 : 0);
                this.markedForDeletion = false;
                this.bobAngle = 0;
                this.visualY = this.y;
            }
            update() {
                this.x -= gameSpeed;
                this.bobAngle += 0.1;
                this.visualY = this.y + Math.sin(this.bobAngle) * 5;
                if (this.x + this.w < 0) this.markedForDeletion = true;
            }
            draw() {
                const y = this.visualY || this.y;
                ctx.fillStyle = "#8d6e63"; // Brown box
                ctx.fillRect(this.x, y, this.w, this.h);
                ctx.fillStyle = "#d7ccc8"; // Tape
                ctx.fillRect(this.x, y + 12, this.w, 6);
                ctx.fillRect(this.x + 12, y, 6, this.h);
                ctx.strokeStyle = "#5d4037";
                ctx.strokeRect(this.x, y, this.w, this.h);
            }
        }

        class Cloud {
            x: number;
            y: number;
            w: number;
            speed: number;
            markedForDeletion: boolean;

            constructor() {
                this.x = canvas.width + Math.random() * 200;
                this.y = Math.random() * (canvas.height / 2);
                this.w = 60 + Math.random() * 40;
                this.speed = gameSpeed * 0.2 + Math.random() * 0.5;
                this.markedForDeletion = false;
            }
            update() {
                this.x -= this.speed;
                if (this.x + this.w < 0) this.markedForDeletion = true;
            }
            draw() {
                ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.w/3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function animate() {
            if (!isGameRunning) return; // Parar loop se saiu da página

            if (gameOver) {
                showGameOver();
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Sky
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#87CEEB");
            gradient.addColorStop(1, "#E0F7FA");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ground
            ctx.fillStyle = "#4CAF50";
            ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
            
            // Clouds
            if (frame % 100 === 0) clouds.push(new Cloud());
            clouds.forEach(c => { c.update(); c.draw(); });
            clouds = clouds.filter(c => !c.markedForDeletion);

            // Spawns
            if (frame % Math.floor(1000 / (gameSpeed * 1.5)) === 0) {
                if (Math.random() < 0.6) obstacles.push(new Obstacle());
                else items.push(new Item());
            }

            // Obstacles & Collision
            obstacles.forEach(obs => {
                obs.update();
                obs.draw();
                // Hitbox Truck
                const truckBox = { x: truck.x + 10, y: truck.y + (canvas.height - GROUND_HEIGHT - truck.height) + 10, w: truck.width - 20, h: truck.height - 10 };
                if (truckBox.x < obs.x + obs.w && truckBox.x + truckBox.w > obs.x && truckBox.y < obs.y + obs.h && truckBox.y + truckBox.h > obs.y) {
                    gameOver = true;
                }
            });
            obstacles = obstacles.filter(o => !o.markedForDeletion);

            // Items
            items.forEach(item => {
                item.update();
                item.draw();
                const truckBox = { x: truck.x, y: truck.y + (canvas.height - GROUND_HEIGHT - truck.height), w: truck.width, h: truck.height };
                const itemY = item.visualY || item.y;
                if (truckBox.x < item.x + item.w && truckBox.x + truckBox.w > item.x && truckBox.y < itemY + item.h && truckBox.y + truckBox.h > itemY) {
                    score += 10;
                    item.markedForDeletion = true;
                }
            });
            items = items.filter(i => !i.markedForDeletion);

            truck.update();
            truck.draw();

            // UI
            ctx.fillStyle = "#333";
            ctx.font = "bold 20px Poppins";
            ctx.fillText(`Pontos: ${Math.floor(score + (frame/10))}`, 20, 40);

            frame++;
            gameSpeed += 0.001;
            gameAnimationId = requestAnimationFrame(animate);
        }

        function showGameOver() {
            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <h2>Fim da Entrega!</h2>
                <p>Pontuação: ${Math.floor(score + (frame/10))}</p>
            `;
            const restartBtn = CtaButton('Jogar Novamente', () => {
                overlay.style.display = 'none';
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
                startGame();
            });
            
            // Remove previous buttons to avoid duplicates if re-appended
            // But here we overwrite innerHTML so it's fine.
            overlay.appendChild(restartBtn);
        }

        animate();
    }

    return container;
}
