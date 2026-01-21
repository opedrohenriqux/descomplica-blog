import { styles, applyStyles, CtaButton } from '../../utils.tsx';
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function renderLogiBot3D(transitionTo, setSelectedGame) {
    const container = document.createElement('div');
    applyStyles(container, {
        ...styles.section,
        justifyContent: 'flex-start',
        paddingTop: '8rem',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
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
        zIndex: '100'
    });

    const stopGame = () => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('resize', onWindowResize);
    };

    const backButton = CtaButton('← Encerrar Sessão', () => {
        stopGame();
        transitionTo(() => { setSelectedGame(null); });
    }, { position: 'absolute', left: '0', top: '0', backgroundColor: '#fff' });

    const title = document.createElement('h2');
    title.textContent = 'LogiBot AMR Simulator';
    applyStyles(title, {
        fontSize: '2rem',
        fontWeight: '900',
        color: '#1a1a1a',
        textAlign: 'center',
        letterSpacing: '-1px'
    });

    header.append(backButton, title);

    // Interface Digital Pro
    const hud = document.createElement('div');
    applyStyles(hud, {
        position: 'absolute',
        top: '12rem',
        left: '2.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #eee',
        zIndex: '100',
        minWidth: '200px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)'
    });
    hud.innerHTML = `
        <div style="font-weight: 800; font-size: 0.65rem; color: #aaa; text-transform: uppercase; margin-bottom: 5px;">Sistema AMR v4.0</div>
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div id="bot-status" style="color: #27ae60; font-weight: 800; font-size: 1.2rem;">ONLINE</div>
            <div id="bot-energy" style="color: #fec700; font-weight: 800;">100%</div>
        </div>
        <div style="height: 4px; width: 100%; background: #eee; margin-top: 10px; border-radius: 2px; overflow: hidden;">
            <div id="energy-bar" style="height: 100%; width: 100%; background: #fec700; transition: width 0.3s;"></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="font-size: 0.7rem; color: #888; font-weight: 700;">ORDENS CONCLUÍDAS</div>
            <div id="score-val" style="font-size: 2rem; font-weight: 900; color: #333;">0</div>
        </div>
        <div style="font-size: 0.7rem; color: #999; margin-top: 10px;">Use WASD para mover o robô.</div>
    `;

    const missionBanner = document.createElement('div');
    applyStyles(missionBanner, {
        position: 'absolute',
        top: '12rem',
        right: '2.5rem',
        backgroundColor: '#1a1a1a',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        color: '#fff',
        zIndex: '100',
        borderLeft: '5px solid #fec700'
    });
    missionBanner.innerHTML = `
        <div style="font-size: 0.7rem; font-weight: 700; opacity: 0.6;">PRÓXIMA COLETA</div>
        <div id="next-target" style="font-size: 1.1rem; font-weight: 800; color: #fec700;">ZONA A-01</div>
    `;

    const gameCanvasContainer = document.createElement('div');
    applyStyles(gameCanvasContainer, {
        width: '100%',
        height: '75vh',
        backgroundColor: '#f8f8f8',
        borderRadius: '40px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
        position: 'relative',
        border: '1px solid #eee'
    });

    container.append(header, gameCanvasContainer, hud, missionBanner);

    // --- Lógica Three.js ---
    let scene, camera, renderer, clock, animationId;
    let robot, floorLines, cargoGroup, targets = [];
    let keys = {};
    let velocity = new THREE.Vector3();
    let score = 0, energy = 100, isCarrying = false;
    let currentCargo = null;
    let missionState = 'PICKUP'; // PICKUP ou DELIVERY

    const handleKeyDown = (e) => keys[e.key.toLowerCase()] = true;
    const handleKeyUp = (e) => keys[e.key.toLowerCase()] = false;
    const onWindowResize = () => {
        camera.aspect = gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
    };

    function init3D() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        scene.fog = new THREE.Fog(0xffffff, 20, 150);

        camera = new THREE.PerspectiveCamera(50, gameCanvasContainer.clientWidth / gameCanvasContainer.clientHeight, 0.1, 1000);
        camera.position.set(0, 15, 20);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(gameCanvasContainer.clientWidth, gameCanvasContainer.clientHeight);
        renderer.shadowMap.enabled = true;
        gameCanvasContainer.appendChild(renderer.domElement);

        const amb = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(amb);

        const point = new THREE.PointLight(0xffffff, 1.2);
        point.position.set(20, 30, 20);
        point.castShadow = true;
        scene.add(point);

        createWarehouse();
        createRobot();
        spawnMission();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', onWindowResize);
        animate();
    }

    function createWarehouse() {
        // Chão clean
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.2 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Grid magnético amarelo
        const grid = new THREE.GridHelper(200, 40, 0xeeeeee, 0xfec700);
        grid.position.y = 0.01;
        grid.material.opacity = 0.3;
        grid.material.transparent = true;
        scene.add(grid);

        // Estantes futuristas brancas
        const shelfMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        for(let i=0; i<8; i++) {
            const shelf = new THREE.Mesh(new THREE.BoxGeometry(2, 6, 30), shelfMat);
            const x = (i < 4 ? -1 : 1) * 35;
            const z = (i % 4 - 1.5) * 40;
            shelf.position.set(x, 3, z);
            shelf.castShadow = true;
            shelf.receiveShadow = true;
            scene.add(shelf);

            // Detalhe luminoso
            const light = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 30), new THREE.MeshBasicMaterial({ color: 0xfec700 }));
            light.position.set(x + (x > 0 ? -1.05 : 1.05), 3, z);
            scene.add(light);
        }

        // Estação de Expedição (Delivery Zone)
        const deliveryZone = new THREE.Mesh(
            new THREE.BoxGeometry(10, 0.2, 10),
            new THREE.MeshBasicMaterial({ color: 0xfec700, transparent: true, opacity: 0.5 })
        );
        deliveryZone.position.set(0, 0.1, -50);
        deliveryZone.name = "DELIVERY_ZONE";
        scene.add(deliveryZone);
    }

    function createRobot() {
        robot = new THREE.Group();
        
        // Base do Robô (Pancake AMR style)
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, 0.6, 32),
            new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
        );
        base.position.y = 0.3;
        base.castShadow = true;
        robot.add(base);

        // Luzes de status
        const led = new THREE.Mesh(
            new THREE.CylinderGeometry(1.55, 1.55, 0.1, 32),
            new THREE.MeshBasicMaterial({ color: 0xfec700 })
        );
        led.position.y = 0.6;
        robot.add(led);

        // Antena / Sensor LIDAR
        const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 0.4), new THREE.MeshStandardMaterial({ color: 0x333 }));
        sensor.position.set(0, 1, 0);
        robot.add(sensor);

        scene.add(robot);
    }

    function spawnMission() {
        if (currentCargo) scene.remove(currentCargo);

        if (missionState === 'PICKUP') {
            const rx = (Math.random() - 0.5) * 60;
            const rz = (Math.random() - 0.5) * 60;
            
            const group = new THREE.Group();
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({ color: 0xfec700 })
            );
            box.position.y = 1;
            box.castShadow = true;
            group.add(box);

            // Palete
            const pallet = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 2.4), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
            pallet.position.y = 0.2;
            group.add(pallet);

            group.position.set(rx, 0, rz);
            currentCargo = group;
            scene.add(currentCargo);
            document.getElementById('next-target').textContent = "COLETAR CARGA";
        } else {
            document.getElementById('next-target').textContent = "EXPEDIÇÃO SUL";
        }
    }

    function animate() {
        animationId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Movimentação Dinâmica
        const moveSpeed = isCarrying ? 12 : 20;
        const rotSpeed = 3.5;

        if (keys['w']) velocity.z = 1;
        else if (keys['s']) velocity.z = -1;
        else velocity.z = 0;

        if (keys['a']) robot.rotation.y += rotSpeed * delta;
        if (keys['d']) robot.rotation.y -= rotSpeed * delta;

        const moveDir = new THREE.Vector3(0, 0, velocity.z).applyQuaternion(robot.quaternion);
        robot.position.add(moveDir.multiplyScalar(moveSpeed * delta));

        // Consumo de energia se movendo
        if (velocity.z !== 0 && energy > 0) {
            energy -= delta * 2;
            updateHUD();
        } else if (velocity.z === 0 && energy < 100) {
            energy += delta * 1; // Recarga lenta
            updateHUD();
        }

        // Câmera orbital suave
        const offset = new THREE.Vector3(0, 10, 15).applyQuaternion(robot.quaternion);
        camera.position.lerp(robot.position.clone().add(offset), 0.1);
        camera.lookAt(robot.position);

        // Lógica de Missão
        if (missionState === 'PICKUP' && currentCargo) {
            const dist = robot.position.distanceTo(currentCargo.position);
            if (dist < 2.5) {
                isCarrying = true;
                missionState = 'DELIVERY';
                currentCargo.position.set(0, 0.8, 0); // Sobe no robô
                robot.add(currentCargo);
                spawnMission();
            }
        } else if (missionState === 'DELIVERY') {
            const distExp = robot.position.distanceTo(new THREE.Vector3(0,0,-50));
            if (distExp < 6) {
                isCarrying = false;
                missionState = 'PICKUP';
                robot.remove(currentCargo);
                score++;
                energy = Math.min(100, energy + 20); // Bonus energia
                document.getElementById('score-val').textContent = score.toString();
                spawnMission();
            }
        }

        if (energy <= 0) {
             document.getElementById('bot-status').textContent = "OFFLINE";
             document.getElementById('bot-status').style.color = "#e74c3c";
             velocity.z = 0;
        } else {
             document.getElementById('bot-status').textContent = "ONLINE";
             document.getElementById('bot-status').style.color = "#27ae60";
        }

        renderer.render(scene, camera);
    }

    function updateHUD() {
        const energyBar = document.getElementById('energy-bar');
        const energyVal = document.getElementById('bot-energy');
        if (energyBar) energyBar.style.width = `${energy}%`;
        if (energyVal) energyVal.textContent = `${Math.round(energy)}%`;
    }

    setTimeout(() => init3D(), 100);

    return container;
}