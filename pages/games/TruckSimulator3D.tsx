import { styles, applyStyles, CtaButton } from '../../utils.tsx';
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function renderTruckSimulator3D(transitionTo, setSelectedGame) {
    const container = document.createElement('div');
    applyStyles(container, {
        ...styles.section,
        justifyContent: 'flex-start',
        paddingTop: '8rem',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#050505'
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

    const backButton = CtaButton('← Encerrar Turno', () => {
        stopGame();
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0' });

    const title = document.createElement('h2');
    title.textContent = 'Simulador Descomplica Pro';
    applyStyles(title, {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        letterSpacing: '-2px'
    });

    header.append(backButton, title);

    // Mini-mapa GPS
    const gpsContainer = document.createElement('div');
    applyStyles(gpsContainer, {
        position: 'absolute',
        bottom: '2rem',
        right: '2.5rem',
        width: '210px',
        height: '210px',
        backgroundColor: 'rgba(15, 15, 15, 0.9)',
        borderRadius: '30px',
        border: '3px solid #444',
        zIndex: '100',
        boxShadow: '0 15px 45px rgba(0,0,0,0.7)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(10px)'
    });
    
    const gpsHeader = document.createElement('div');
    applyStyles(gpsHeader, {
        padding: '6px',
        fontSize: '0.7rem',
        textAlign: 'center',
        fontWeight: '900',
        color: '#000',
        backgroundColor: '#fec700',
        textTransform: 'uppercase'
    });
    gpsHeader.id = 'gps-status-label';
    gpsHeader.textContent = 'Aguardando Carga';

    const gpsCanvas = document.createElement('canvas');
    gpsCanvas.width = 210;
    gpsCanvas.height = 180;
    gpsContainer.append(gpsHeader, gpsCanvas);

    // Painel HUD
    const hud = document.createElement('div');
    applyStyles(hud, {
        position: 'absolute',
        bottom: '2rem',
        left: '2.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '24px',
        border: '1px solid #ddd',
        zIndex: '100',
        color: '#111',
        minWidth: '280px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
    });
    hud.innerHTML = `
        <div style="font-weight: 900; font-size: 0.65rem; color: #888; text-transform: uppercase; margin-bottom: 8px;">Telemetria Logística</div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <div style="font-size: 2.5rem; font-weight: 900; line-height: 0.9;"><span id="truck-speed">0</span> <small style="font-size: 0.9rem; opacity: 0.5;">km/h</small></div>
                <div style="font-size: 0.9rem; margin-top: 5px; font-weight: 600;">Missões: <span id="truck-score" style="color: #27ae60;">0</span></div>
            </div>
            <div style="text-align: right;">
                <div id="mission-tag" style="background: #fec700; color: #000; padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800;">ATIVO</div>
            </div>
        </div>
        <div id="collision-alert" style="display:none; margin-top:10px; color:#e74c3c; font-weight:800; font-size:0.7rem; text-align:center;">⚠️ OBSTÁCULO À FRENTE</div>
    `;

    const gameCanvasContainer = document.createElement('div');
    applyStyles(gameCanvasContainer, {
        width: '100%',
        height: '75vh',
        backgroundColor: '#000',
        borderRadius: '35px',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.1)'
    });

    container.append(header, gameCanvasContainer, hud, gpsContainer);

    // --- Three.js Logic ---
    let scene, camera, renderer, truck, wheels = [], cargoVisual, clock;
    let speed = 0, rotation = 0;
    let keys = {};
    let animationId;
    let missionState = 'COLLECT'; 
    let targetPos = new THREE.Vector3();
    let targetObject, score = 0;
    
    // Configurações da Cidade
    const GRID_UNIT = 60; // Tamanho do Quarteirão + Rua
    const ROAD_WIDTH = 25; // Espaço para dirigir
    const CITY_RADIUS = 300;
    const buildings = []; // Para detecção de colisão manual simplificada

    const handleKeyDown = (e) => keys[e.key.toLowerCase()] = true;
    const handleKeyUp = (e) => keys[e.key.toLowerCase()] = false;
    const onWindowResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
    };

    function init3D() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0c10); 
        scene.fog = new THREE.Fog(0x0a0c10, 40, 220);

        camera = new THREE.PerspectiveCamera(60, gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight, 0.1, 1000);
        
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        gameCanvasContainer.appendChild(renderer.domElement);

        const hemiLight = new THREE.HemisphereLight(0x4444ff, 0x000000, 0.4);
        scene.add(hemiLight);

        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(100, 150, 50);
        sun.castShadow = true;
        sun.shadow.camera.left = -250;
        sun.shadow.camera.right = 250;
        sun.shadow.camera.top = 250;
        sun.shadow.camera.bottom = -250;
        sun.shadow.mapSize.set(2048, 2048);
        scene.add(sun);

        createCity();
        createTruck();
        spawnMission();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', onWindowResize);
        animate();
    }

    function createCity() {
        // Chão de Asfalto
        const groundGeo = new THREE.PlaneGeometry(CITY_RADIUS * 2.5, CITY_RADIUS * 2.5);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Faixas das Ruas
        const gridHelper = new THREE.GridHelper(CITY_RADIUS * 2.5, CITY_RADIUS * 2.5 / (GRID_UNIT/2), 0x333333, 0x222222);
        gridHelper.position.y = 0.05;
        scene.add(gridHelper);

        const buildColors = [0x444444, 0x2c3e50, 0x34495e, 0x7f8c8d];

        for (let x = -CITY_RADIUS; x <= CITY_RADIUS; x += GRID_UNIT) {
            for (let z = -CITY_RADIUS; z <= CITY_RADIUS; z += GRID_UNIT) {
                // Deixa o centro livre
                if (Math.abs(x) < 30 && Math.abs(z) < 30) continue;

                // Calçada (Onde ficam os prédios)
                const sidewalkSize = GRID_UNIT - ROAD_WIDTH;
                const sidewalkGeo = new THREE.BoxGeometry(sidewalkSize, 1, sidewalkSize);
                const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
                const sidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
                sidewalk.position.set(x, 0.5, z);
                sidewalk.receiveShadow = true;
                scene.add(sidewalk);

                // Prédio Principal
                const h = 20 + Math.random() * 80;
                const bGeo = new THREE.BoxGeometry(sidewalkSize - 4, h, sidewalkSize - 4);
                const bMat = new THREE.MeshStandardMaterial({ 
                    color: buildColors[Math.floor(Math.random() * buildColors.length)],
                    roughness: 0.3,
                    metalness: 0.2
                });
                const building = new THREE.Mesh(bGeo, bMat);
                building.position.set(x, h/2 + 1, z);
                building.castShadow = true;
                building.receiveShadow = true;
                scene.add(building);

                // Janelas (Visual de luzes)
                const winGeo = new THREE.BoxGeometry(sidewalkSize - 3.5, h * 0.9, sidewalkSize - 3.5);
                const winMat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    emissive: 0xfec700, 
                    emissiveIntensity: 0.1, 
                    wireframe: true 
                });
                const win = new THREE.Mesh(winGeo, winMat);
                win.position.copy(building.position);
                scene.add(win);

                // Guardar para colisão
                buildings.push({
                    x: x,
                    z: z,
                    halfSize: sidewalkSize / 2 + 1.5 // Margem de segurança
                });
            }
        }
        
        // Pintura das Ruas (Faixas Amarelas)
        for (let i = -CITY_RADIUS; i <= CITY_RADIUS; i += GRID_UNIT) {
            // Horizontais
            const stripeH = new THREE.Mesh(new THREE.PlaneGeometry(CITY_RADIUS * 2, 0.5), new THREE.MeshBasicMaterial({ color: 0xfec700 }));
            stripeH.rotation.x = -Math.PI / 2;
            stripeH.position.set(0, 0.1, i + (GRID_UNIT/2));
            scene.add(stripeH);
            
            // Verticais
            const stripeV = new THREE.Mesh(new THREE.PlaneGeometry(0.5, CITY_RADIUS * 2), new THREE.MeshBasicMaterial({ color: 0xfec700 }));
            stripeV.rotation.x = -Math.PI / 2;
            stripeV.position.set(i + (GRID_UNIT/2), 0.1, 0);
            scene.add(stripeV);
        }
    }

    function createTruck() {
        truck = new THREE.Group();
        
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 0.8, 6),
            new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 })
        );
        body.position.y = 0.8;
        body.castShadow = true;
        truck.add(body);

        const cab = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 1.8, 2),
            new THREE.MeshStandardMaterial({ color: 0xfec700, metalness: 0.5, roughness: 0.1 })
        );
        cab.position.set(0, 2.1, 2);
        cab.castShadow = true;
        truck.add(cab);

        const trailer = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 3, 4.2),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
        );
        trailer.position.set(0, 2.7, -1.1);
        trailer.castShadow = true;
        truck.add(trailer);

        cargoVisual = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 1.5, 1.8),
            new THREE.MeshStandardMaterial({ color: 0xfec700, emissive: 0xfec700, emissiveIntensity: 0.2 })
        );
        cargoVisual.position.set(0, 4.5, -1.1);
        cargoVisual.visible = false;
        truck.add(cargoVisual);

        const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.5, 32);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
        const wheelPositions = [[-1.2, 0.55, 2.2], [1.2, 0.55, 2.2], [-1.2, 0.55, -0.8], [1.2, 0.55, -0.8], [-1.2, 0.55, -2.6], [1.2, 0.55, -2.6]];
        wheelPositions.forEach(p => {
            const w = new THREE.Mesh(wheelGeo, wheelMat);
            w.rotation.z = Math.PI / 2;
            w.position.set(p[0], p[1], p[2]);
            truck.add(w);
            wheels.push(w);
        });

        scene.add(truck);
    }

    function spawnMission() {
        if (targetObject) scene.remove(targetObject);

        // Posicionar na rua (múltiplos de GRID_UNIT desfazendo o centro)
        const rx = (Math.round((Math.random() - 0.5) * 8)) * GRID_UNIT + (GRID_UNIT / 2);
        const rz = (Math.round((Math.random() - 0.5) * 8)) * GRID_UNIT + (GRID_UNIT / 2);
        targetPos.set(rx, 0, rz);

        if (missionState === 'COLLECT') {
            const group = new THREE.Group();
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(4, 4, 4),
                new THREE.MeshStandardMaterial({ color: 0xfec700, emissive: 0xfec700, emissiveIntensity: 0.3 })
            );
            group.add(box);
            group.position.set(rx, 5, rz);
            targetObject = group;

            document.getElementById('gps-status-label').textContent = "Coletar Carga";
            document.getElementById('gps-status-label').style.backgroundColor = "#fec700";
        } else {
            const geo = new THREE.CylinderGeometry(8, 8, 0.5, 32);
            const mat = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.6 });
            targetObject = new THREE.Mesh(geo, mat);
            targetObject.position.set(rx, 0.2, rz);
            
            const pLight = new THREE.PointLight(0xe74c3c, 20, 30);
            pLight.position.y = 5;
            targetObject.add(pLight);

            document.getElementById('gps-status-label').textContent = "Entregar em Vermelho";
            document.getElementById('gps-status-label').style.backgroundColor = "#e74c3c";
        }
        
        scene.add(targetObject);
    }

    function updateGPS() {
        const ctx = gpsCanvas.getContext('2d');
        ctx.clearRect(0, 0, 210, 180);
        const center = { x: 105, y: 90 };
        const scale = 0.25;

        // Prédios no GPS
        ctx.fillStyle = "#333";
        buildings.forEach(b => {
            ctx.fillRect(center.x + (b.x - b.halfSize) * scale, center.y + (b.z - b.halfSize) * scale, b.halfSize * 2 * scale, b.halfSize * 2 * scale);
        });

        // Alvo
        const tx = center.x + (targetPos.x * scale);
        const ty = center.y + (targetPos.z * scale);
        ctx.fillStyle = missionState === 'COLLECT' ? "#fec700" : "#e74c3c";
        ctx.beginPath(); ctx.arc(tx, ty, 6, 0, Math.PI*2); ctx.fill();

        // Caminhão
        const px = center.x + (truck.position.x * scale);
        const py = center.y + (truck.position.z * scale);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(-truck.rotation.y);
        ctx.fillStyle = "#fff";
        ctx.fillRect(-4, -7, 8, 14);
        ctx.restore();
    }

    function checkCollision(newPos) {
        for (let b of buildings) {
            if (newPos.x > b.x - b.halfSize && newPos.x < b.x + b.halfSize &&
                newPos.z > b.z - b.halfSize && newPos.z < b.z + b.halfSize) {
                return true;
            }
        }
        return false;
    }

    function animate() {
        animationId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Input e Aceleração
        if (keys['arrowup'] || keys['w']) speed += 35 * delta;
        if (keys['arrowdown'] || keys['s']) speed -= 30 * delta;
        
        if (Math.abs(speed) > 0.1) {
            const rotDir = speed > 0 ? 1 : -1;
            if (keys['arrowleft'] || keys['a']) rotation += rotDir * 2.2 * delta;
            if (keys['arrowright'] || keys['d']) rotation -= rotDir * 2.2 * delta;
        }

        speed *= 0.98; // Atrito
        
        // Simulação de movimento com teste de colisão
        const nextRotation = rotation;
        const moveStep = speed * delta;
        
        const nextPos = truck.position.clone();
        const direction = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), nextRotation);
        nextPos.add(direction.multiplyScalar(moveStep));

        const alertEl = document.getElementById('collision-alert');
        if (checkCollision(nextPos)) {
            speed *= -0.5; // Rebate levemente
            if(alertEl) alertEl.style.display = 'block';
        } else {
            truck.position.copy(nextPos);
            truck.rotation.y = nextRotation;
            if(alertEl) alertEl.style.display = 'none';
        }

        wheels.forEach(w => w.rotation.x += speed * delta * 3);

        // Animação Marcador
        if (targetObject) {
            if (missionState === 'COLLECT') {
                targetObject.rotation.y += delta * 2;
                targetObject.position.y = 5 + Math.sin(Date.now() * 0.005) * 1.5;
            } else {
                targetObject.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.1);
            }
        }

        // Câmera Suave
        const idealCamPos = new THREE.Vector3(0, 12, -22);
        idealCamPos.applyQuaternion(truck.quaternion);
        idealCamPos.add(truck.position);
        camera.position.lerp(idealCamPos, 0.08);
        camera.lookAt(truck.position.clone().add(new THREE.Vector3(0, 2, 0)));

        // Missão
        const dist = truck.position.distanceTo(targetPos);
        if (dist < 12) {
            if (missionState === 'COLLECT') {
                missionState = 'DELIVER';
                cargoVisual.visible = true;
                spawnMission();
            } else {
                missionState = 'COLLECT';
                cargoVisual.visible = false;
                score++;
                document.getElementById('truck-score').textContent = score.toString();
                spawnMission();
            }
        }

        document.getElementById('truck-speed').textContent = Math.abs(Math.round(speed * 3.6)).toString();
        updateGPS();
        renderer.render(scene, camera);
    }

    setTimeout(() => { init3D(); }, 100);

    return container;
}