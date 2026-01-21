import { styles, applyStyles, CtaButton } from '../../utils.tsx';
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function renderLogisticsHero3D(transitionTo, setSelectedGame) {
    const container = document.createElement('div');
    applyStyles(container, {
        ...styles.section,
        justifyContent: 'flex-start',
        paddingTop: '8rem',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden'
    });

    const header = document.createElement('div');
    applyStyles(header, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
        width: '100%',
        position: 'relative',
        zIndex: '10'
    });

    const stopGame = () => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('resize', onWindowResize);
    };

    const backButton = CtaButton('← Sair da Operação', () => {
        stopGame();
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' });

    const title = document.createElement('h2');
    title.textContent = 'Logistics Hero: Terminal Pro';
    applyStyles(title, {
        fontSize: '2rem',
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '0 4px 10px rgba(0,0,0,0.5)'
    });

    header.append(backButton, title);

    // Radar GPS (GTA Style)
    const radarContainer = document.createElement('div');
    applyStyles(radarContainer, {
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        width: '180px',
        height: '180px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '50%',
        border: '4px solid #333',
        zIndex: '100',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)'
    });
    const radarCanvas = document.createElement('canvas');
    radarCanvas.width = 180;
    radarCanvas.height = 180;
    radarContainer.appendChild(radarCanvas);

    // HUD de Missão
    const missionHud = document.createElement('div');
    applyStyles(missionHud, {
        position: 'absolute',
        top: '10rem',
        right: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '8px solid #fec700',
        zIndex: '100',
        minWidth: '280px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
        transform: 'translateX(0)',
        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    missionHud.innerHTML = `
        <div style="font-weight: 900; font-size: 0.7rem; color: #888; text-transform: uppercase; margin-bottom: 5px;">Objetivo Operacional</div>
        <div id="mission-text" style="font-size: 1.2rem; font-weight: 800; color: #111;">Fale com o Supervisor.</div>
        <div id="mission-subtext" style="font-size: 0.85rem; color: #666; margin-top: 5px;">Siga o marcador amarelo no mapa.</div>
    `;

    // Banner de Sucesso (Capa GTA)
    const successBanner = document.createElement('div');
    applyStyles(successBanner, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0.5)',
        zIndex: '500',
        opacity: '0',
        pointerEvents: 'none',
        textAlign: 'center',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    successBanner.innerHTML = `
        <h1 style="font-size: 5rem; font-weight: 900; color: #fec700; text-shadow: 0 10px 30px rgba(0,0,0,0.8); margin: 0;">MISSÃO CONCLUÍDA</h1>
        <div style="background: #fff; height: 10px; width: 100%; margin: 10px 0;"></div>
        <p style="color: #fff; font-size: 1.5rem; font-weight: 700; text-transform: uppercase;">Respeito +</p>
    `;

    const interactionPrompt = document.createElement('div');
    applyStyles(interactionPrompt, {
        position: 'absolute',
        bottom: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        backgroundColor: '#fec700',
        color: '#000',
        borderRadius: '8px',
        fontWeight: '900',
        fontSize: '1.1rem',
        display: 'none',
        zIndex: '200',
        boxShadow: '0 10px 30px rgba(254, 199, 0, 0.4)',
        border: '2px solid #000'
    });
    interactionPrompt.textContent = 'PRESSIONE [E] PARA INTERAGIR';

    const gameCanvasContainer = document.createElement('div');
    applyStyles(gameCanvasContainer, {
        width: '100%',
        height: '80vh',
        backgroundColor: '#000',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        position: 'relative'
    });

    container.append(header, gameCanvasContainer, radarContainer, missionHud, successBanner, interactionPrompt);

    // --- Engine 3D Avançada ---
    let scene, camera, renderer, clock, animationId;
    let player, manager, cargo, truck, warehouses = [];
    let keys = {};
    let missionStep = 0; 
    let playerVelocity = new THREE.Vector3();
    let isCarrying = false;
    let playerRotation = 0;

    const handleKeyDown = (e) => keys[e.key.toLowerCase()] = true;
    const handleKeyUp = (e) => keys[e.key.toLowerCase()] = false;

    function init3D() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f171e);
        scene.fog = new THREE.Fog(0x0f171e, 40, 180);

        camera = new THREE.PerspectiveCamera(60, gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight, 0.1, 1000);
        
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        gameCanvasContainer.appendChild(renderer.domElement);

        // Luzes Dinâmicas
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(50, 100, 30);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        sun.shadow.camera.left = -100;
        sun.shadow.camera.right = 100;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;
        scene.add(sun);

        createWorld();
        createPlayer();
        createEntities();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', onWindowResize);
        animate();
    }

    function createWorld() {
        // Chão de concreto industrial
        const groundGeo = new THREE.PlaneGeometry(300, 300);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8, metalness: 0.1 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Grid de asfalto
        const grid = new THREE.GridHelper(300, 30, 0x333333, 0x222222);
        grid.position.y = 0.01;
        scene.add(grid);

        // Galpões Gigantes (Mundo Aberto)
        const wareColors = [0xeeeeee, 0xcccccc];
        for(let i=0; i<6; i++) {
            const h = 25;
            const w = 50;
            const d = 40;
            const group = new THREE.Group();
            
            const warehouse = new THREE.Mesh(
                new THREE.BoxGeometry(w, h, d),
                new THREE.MeshStandardMaterial({ color: wareColors[i % 2], roughness: 0.5 })
            );
            warehouse.position.y = h/2;
            warehouse.castShadow = true;
            warehouse.receiveShadow = true;
            group.add(warehouse);

            // Detalhes Amarelos nas Docas
            const dock = new THREE.Mesh(new THREE.PlaneGeometry(15, 12), new THREE.MeshBasicMaterial({ color: 0xfec700 }));
            dock.position.set(-w/2 - 0.1, 6, 0);
            dock.rotation.y = -Math.PI / 2;
            group.add(dock);

            const x = (i % 2 === 0 ? -1 : 1) * 70;
            const z = (Math.floor(i/2) - 1) * 80;
            group.position.set(x, 0, z);
            scene.add(group);
            warehouses.push({ x, z, w, d });
        }
    }

    function createPlayer() {
        player = new THREE.Group();
        
        // Corpo (Baseado em GTA character proportions)
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.5), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        body.position.y = 0.9;
        body.castShadow = true;
        player.add(body);

        // Colete Amarelo Refletivo
        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.9, 0.55), new THREE.MeshStandardMaterial({ color: 0xfec700, emissive: 0xfec700, emissiveIntensity: 0.1 }));
        vest.position.y = 1.1;
        player.add(vest);

        // Cabeça
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0xffdbac }));
        head.position.y = 2.0;
        player.add(head);

        // Braços para carregar carga
        const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.2), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        leftArm.position.set(-0.5, 1.2, 0);
        player.add(leftArm);

        const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.2), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        rightArm.position.set(0.5, 1.2, 0);
        player.add(rightArm);

        player.position.set(0, 0, 20);
        scene.add(player);
    }

    function createEntities() {
        // Supervisor (NPC)
        manager = new THREE.Group();
        const mBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.5), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        mBody.position.y = 0.9;
        manager.add(mBody);
        const mCap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.5), new THREE.MeshBasicMaterial({ color: 0xfec700 }));
        mCap.position.y = 1.9;
        manager.add(mCap);
        manager.position.set(0, 0, -10);
        scene.add(manager);

        // Carga Visual
        const cargoGeo = new THREE.BoxGeometry(1.5, 1.2, 1.5);
        const cargoMat = new THREE.MeshStandardMaterial({ color: 0xfec700 });
        cargo = new THREE.Mesh(cargoGeo, cargoMat);
        cargo.position.set(-70, 0.6, -80);
        cargo.castShadow = true;
        cargo.visible = false;
        scene.add(cargo);

        // Caminhão (Veículo Estático Pro)
        truck = new THREE.Group();
        const cab = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 4), new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.8, roughness: 0.2 }));
        cab.position.set(0, 1.5, 6);
        truck.add(cab);
        const glass = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1.5), new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1 }));
        glass.position.set(0, 2, 8.01);
        truck.add(glass);
        const trailer = new THREE.Mesh(new THREE.BoxGeometry(4, 5, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 }));
        trailer.position.set(0, 2.5, -2);
        trailer.castShadow = true;
        truck.add(trailer);
        
        truck.position.set(70, 0, 80);
        scene.add(truck);
    }

    function onWindowResize() {
        camera.aspect = gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
    }

    function updateRadar() {
        const ctx = radarCanvas.getContext('2d');
        ctx.clearRect(0, 0, 180, 180);
        
        const centerX = 90;
        const centerY = 90;
        const zoom = 0.6;

        // Fundo Radar
        ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
        ctx.beginPath(); ctx.arc(centerX, centerY, 90, 0, Math.PI * 2); ctx.fill();

        // Galpões no Radar
        ctx.fillStyle = '#444';
        warehouses.forEach(w => {
            const rx = centerX + w.x * zoom;
            const rz = centerY + w.z * zoom;
            ctx.fillRect(rx - (w.w/2)*zoom, rz - (w.d/2)*zoom, w.w*zoom, w.d*zoom);
        });

        // Marcador de Objetivo
        let target = null;
        if (missionStep === 0) target = manager.position;
        else if (missionStep === 1) target = cargo.position;
        else if (missionStep === 2) target = truck.position;

        if (target) {
            ctx.fillStyle = '#fec700';
            ctx.beginPath();
            ctx.arc(centerX + target.x * zoom, centerY + target.z * zoom, 6, 0, Math.PI * 2);
            ctx.fill();
            // Efeito Pulse
            ctx.strokeStyle = '#fec700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX + target.x * zoom, centerY + target.z * zoom, 6 + Math.sin(Date.now() * 0.01) * 4, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Jogador no Radar (Seta)
        ctx.save();
        ctx.translate(centerX + player.position.x * zoom, centerY + player.position.z * zoom);
        ctx.rotate(-player.rotation.y);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, -8); ctx.lineTo(6, 6); ctx.lineTo(-6, 6); ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function updateMission() {
        const text = document.getElementById('mission-text');
        const sub = document.getElementById('mission-subtext');
        
        if (missionStep === 0) {
            text.textContent = "Fale com o Supervisor.";
            sub.textContent = "Ele está no centro do terminal administrativo.";
        } else if (missionStep === 1) {
            text.textContent = "Colete a Carga Estratégica.";
            sub.textContent = "Vá até o Galpão Noroeste.";
            cargo.visible = true;
        } else if (missionStep === 2) {
            text.textContent = "Despache a mercadoria.";
            sub.textContent = "Leve a caixa até o caminhão de entrega na Doca Sul.";
        } else if (missionStep === 3) {
            text.textContent = "Turno Finalizado.";
            sub.textContent = "Excelente desempenho logístico.";
            showSuccessBanner();
        }
    }

    function showSuccessBanner() {
        successBanner.style.opacity = '1';
        successBanner.style.transform = 'translate(-50%, -50%) scale(1)';
        setTimeout(() => {
            successBanner.style.opacity = '0';
            successBanner.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }, 3000);
    }

    function animate() {
        animationId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Física de Movimento Suave (Estilo GTA)
        const moveSpeed = isCarrying ? 12 : 18;
        const acceleration = 10;
        
        let moveX = 0;
        let moveZ = 0;
        if (keys['w']) moveZ = -1;
        if (keys['s']) moveZ = 1;
        if (keys['a']) moveX = -1;
        if (keys['d']) moveX = 1;

        const inputDir = new THREE.Vector3(moveX, 0, moveZ).normalize();
        if (inputDir.length() > 0) {
            playerVelocity.lerp(inputDir.multiplyScalar(moveSpeed), acceleration * delta);
            // Rotação suave para a direção do movimento
            const targetRot = Math.atan2(moveX, moveZ);
            player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, targetRot, 0.15);
        } else {
            playerVelocity.lerp(new THREE.Vector3(0,0,0), acceleration * delta);
        }

        player.position.add(playerVelocity.clone().multiplyScalar(delta));

        // Animação de Balanço (Cabeça/Corpo)
        if (playerVelocity.length() > 0.1) {
            player.children[0].rotation.x = Math.sin(Date.now() * 0.01) * 0.05;
            player.children[2].position.y = 2.0 + Math.sin(Date.now() * 0.01) * 0.02;
        }

        // Câmera Orbital (Smooth Follow)
        const camOffset = new THREE.Vector3(0, 10, 18);
        const targetCamPos = player.position.clone().add(camOffset);
        camera.position.lerp(targetCamPos, 0.08);
        camera.lookAt(player.position.x, player.position.y + 2, player.position.z);

        // Lógica de Proximidade e Interação
        let dist = 999;
        let targetEnt = null;
        if (missionStep === 0) { dist = player.position.distanceTo(manager.position); targetEnt = manager; }
        else if (missionStep === 1) { dist = player.position.distanceTo(cargo.position); targetEnt = cargo; }
        else if (missionStep === 2) { dist = player.position.distanceTo(truck.position.clone().add(new THREE.Vector3(0,0,-6))); targetEnt = truck; }

        if (dist < 4) {
            interactionPrompt.style.display = 'block';
            if (keys['e']) {
                keys['e'] = false; // Debounce
                missionStep++;
                if (missionStep === 2) {
                    isCarrying = true;
                    cargo.visible = false;
                    // Adiciona caixa nas mãos do player
                    const playerBox = cargo.clone();
                    playerBox.scale.set(0.4, 0.4, 0.4);
                    playerBox.position.set(0, 1.2, 0.8);
                    player.add(playerBox);
                } else if (missionStep === 3) {
                    isCarrying = false;
                    player.remove(player.children[player.children.length-1]); // Remove caixa
                }
                updateMission();
            }
        } else {
            interactionPrompt.style.display = 'none';
        }

        // Marcadores Visuais Flutuantes
        if (targetEnt && missionStep < 3) {
            targetEnt.rotation.y += delta * 2;
        }

        updateRadar();
        renderer.render(scene, camera);
    }

    setTimeout(() => init3D(), 100);

    return container;
}