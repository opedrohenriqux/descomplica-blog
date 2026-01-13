
import { styles, applyStyles } from '../utils.tsx';

export function renderQuemSomosPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });
    
    // Injeta estilos específicos para a animação da equipe e do Modal
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translate3d(0, 40px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      .team-card {
        animation-duration: 0.8s;
        animation-fill-mode: both;
        animation-name: fadeInUp;
        cursor: pointer;
      }
      .team-card:nth-child(1) { animation-delay: 0.2s; }
      .team-card:nth-child(2) { animation-delay: 0.4s; }
      .team-card:nth-child(3) { animation-delay: 0.6s; }
      
      .team-avatar-container {
        position: relative;
        width: 220px;
        height: 220px;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
        padding: 5px;
        background: linear-gradient(45deg, var(--primary-color), transparent);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .team-avatar-mask {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        background-color: var(--timeline-bg);
        z-index: 1;
      }
      
      .team-card:hover .team-avatar-container {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0 10px 25px rgba(254, 199, 0, 0.4);
      }
      
      .team-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease; 
      }

      /* Modal Styles */
      .team-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .team-modal-overlay.open {
        opacity: 1;
        pointer-events: all;
      }
      
      .team-modal-content {
        background-color: var(--card-bg);
        width: 95%;
        max-width: 600px;
        border-radius: 24px;
        padding: 0;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid var(--card-border);
        box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        max-height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .team-modal-overlay.open .team-modal-content {
        transform: scale(1);
      }

      /* Skill Visualizers Styles */
      .skill-visualizer-header {
        height: 200px;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #111;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Heloisa - Admin Visuals */
      .vis-admin .bar { fill: var(--primary-color); animation: barGrow 2s ease-out infinite alternate; }
      @keyframes barGrow { from { height: 20px; y: 150px; } to { height: 100px; y: 70px; } }
      .vis-admin .gear { transform-origin: center; animation: rotate 10s linear infinite; fill: #444; }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      /* Pedro - Tech Visuals */
      .vis-tech { color: #0f0; font-family: monospace; font-size: 10px; opacity: 0.3; }
      .vis-tech .code-line { animation: codeSlide 5s linear infinite; }
      @keyframes codeSlide { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
      .vis-tech .circuit { stroke: var(--primary-color); stroke-width: 1; fill: none; stroke-dasharray: 100; animation: dash 3s linear infinite; }
      @keyframes dash { to { stroke-dashoffset: 200; } }

      /* Arthur - Marketing Visuals */
      .vis-marketing .blob { fill: var(--primary-color); filter: blur(20px); opacity: 0.4; animation: pulseBlob 4s ease-in-out infinite; }
      @keyframes pulseBlob { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); } }
      .vis-marketing .idea { animation: floatIdea 3s ease-in-out infinite; }
      @keyframes floatIdea { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

      .close-modal-btn {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        background: rgba(0,0,0,0.5);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
        z-index: 10;
        transition: background 0.2s;
      }
      .close-modal-btn:hover { background: var(--primary-color); }

      .modal-body { padding: 2rem; position: relative; }
      .modal-avatar-wrapper {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 5px solid var(--card-bg);
        margin: -90px auto 1rem;
        position: relative;
        z-index: 5;
        overflow: hidden;
        background: var(--timeline-bg);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
      .modal-avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }
      
      .skill-tag {
        display: inline-block;
        background-color: var(--button-bg);
        color: var(--text-color);
        padding: 0.4rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        margin: 0.3rem;
        border: 1px solid var(--card-border);
        font-weight: 600;
        transition: all 0.2s;
      }
      .skill-tag:hover { background: var(--primary-color); border-color: var(--primary-color); transform: scale(1.05); }
      
      .info-label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--primary-color);
        margin-bottom: 0.6rem;
        font-weight: 700;
      }
      .info-value { font-size: 1.1rem; color: var(--text-color); line-height: 1.6; }
      .section-divider { height: 1px; background: var(--card-border); margin: 1.5rem 0; }
    `;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: '1200px',
      padding: '0 1rem'
    });

    // --- FAQ Section ---
    const faqTitle = document.createElement('h2');
    applyStyles(faqTitle, { ...styles.sectionTitle, marginBottom: '2rem' });
    faqTitle.textContent = 'Perguntas Frequentes';

    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';
    applyStyles(faqContainer, { width: '100%', maxWidth: '800px', textAlign: 'left', margin: '0 auto' });

    const faqs = [
        { q: "O que é o Descomplica Logística?", a: "É uma plataforma educativa com o objetivo de ensinar conceitos de logística de forma simples, didática e visual. Usamos textos, vídeos e imagens para tornar o aprendizado mais acessível a todos." },
        { q: "Para quem é este site?", a: "Para estudantes, profissionais da área que buscam reciclar conhecimentos, e qualquer pessoa curiosa sobre como os produtos chegam até elas. Nossa abordagem é feita para ser compreendida por todos, desde o iniciante até o mais experiente." },
        { q: "O conteúdo é gratuito?", a: "Sim, todo o conteúdo educacional e os jogos disponíveis no Descomplica Logística são 100% gratuitos." },
        { q: "Com que frequência o conteúdo é atualizado?", a: "Estamos sempre trabalhando para adicionar novos tópicos, aprofundar os existentes e criar novas formas interativas de aprendizado. Siga-nos para ficar por dentro das novidades!" }
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        // Reduzido marginBottom de 1rem para 0.6rem para ficar mais compacto
        applyStyles(faqItem, { marginBottom: '0.6rem', border: `1px solid var(--card-border)`, borderRadius: '12px', overflow: 'hidden' });
        
        const question = document.createElement('div');
        question.className = 'faq-question';
        question.innerHTML = `<p style="margin:0;">${faq.q}</p><span>+</span>`;
        // Reduzido padding de 1.2rem para 0.9rem para acompanhar a estética compacta
        applyStyles(question, { padding: '0.9rem 1.5rem', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card-bg)' });
        
        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = `<p>${faq.a}</p>`;
        applyStyles(answer, { maxHeight: '0', overflow: 'hidden', transition: 'max-height: 0.4s ease', backgroundColor: 'var(--timeline-bg)' });
        // Ajustado padding interno da resposta para manter consistência
        applyStyles(answer.querySelector('p'), { margin: 0, padding: '0.9rem 1.5rem', lineHeight: '1.7' });
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            document.querySelectorAll('.faq-answer').forEach(el => { if (el instanceof HTMLElement) el.style.maxHeight = '0'; });
            document.querySelectorAll('.faq-question span').forEach(el => el.textContent = '+');
            
            if (!isOpen) { 
                answer.style.maxHeight = answer.scrollHeight + 'px'; 
                question.querySelector('span').textContent = '-'; 
            }
        });
        faqItem.append(question, answer);
        faqContainer.appendChild(faqItem);
    });

    // --- Quem Somos Section ---
    const teamSection = document.createElement('div');
    applyStyles(teamSection, { width: '100%', marginTop: '6rem', paddingTop: '4rem', borderTop: '2px solid var(--timeline-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' });

    const teamTitle = document.createElement('h2');
    applyStyles(teamTitle, { ...styles.sectionTitle, marginBottom: '0.5rem' });
    teamTitle.textContent = 'Quem Somos';
    
    const teamSubtitle = document.createElement('p');
    teamSubtitle.textContent = 'Os idealizadores por trás do Descomplica Logística. Clique na foto para ver o perfil dinâmico.';
    applyStyles(teamSubtitle, { color: 'var(--text-color-light)', marginBottom: '3rem', fontSize: '1.1rem' });

    const teamGrid = document.createElement('div');
    applyStyles(teamGrid, { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', width: '100%' });

    const getDriveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w500`;

    const teamMembers = [
        {
            name: "Heloisa Dias",
            role: "Idealizadora",
            specialty: "admin",
            age: "18 anos", 
            hardSkills: ["Gestão de Estoque", "Planejamento Estratégico", "Pacote Office"],
            softSkills: ["Liderança", "Comunicação", "Resolução de Problemas"],
            projectRole: "Responsável pela pesquisa de conteúdo, estruturação didática e revisão técnica dos materiais.",
            imgId: "1bJMLIfhNOFDS-IKK2aHt-7ClQNkgMfQy"
        },
        {
            name: "Pedro Henrique",
            role: "Idealizador",
            specialty: "tech",
            age: "19 anos",
            hardSkills: ["Análise de Dados", "Gestão de Projetos", "Tecnologia"],
            softSkills: ["Trabalho em Equipe", "Pensamento Crítico", "Adaptabilidade"],
            projectRole: "Responsável pela execução técnica do projeto, focado em desenvolver soluções estratégicas para implementação e manutenção.",
            imgId: "1TXPQ5toyv9MVHsc5Ky0TJZvx7mRV2uai"
        },
        {
            name: "Arthur Augusto",
            role: "Idealizador",
            specialty: "marketing",
            age: "18 anos",
            hardSkills: ["Design Gráfico", "Edição de Vídeo", "Marketing Digital"],
            softSkills: ["Criatividade", "Inovação", "Empatia"],
            projectRole: "Cuida da identidade visual, criação de mídias e experiência do usuário na plataforma.",
            imgId: "1GAVSKeHNMvUt4S0wJEzNn8Bkqn1_fPqw",
            imgStyle: { objectPosition: 'center 20%', transform: 'scale(1.4)' }
        }
    ];

    const getVisualizer = (type) => {
        if (type === 'admin') {
            return `
                <div class="skill-visualizer-header vis-admin">
                    <svg width="100%" height="100%" viewBox="0 0 400 200">
                        <rect x="50" y="150" width="30" height="40" class="bar" style="animation-delay:0s" />
                        <rect x="100" y="150" width="30" height="60" class="bar" style="animation-delay:0.2s" />
                        <rect x="150" y="150" width="30" height="80" class="bar" style="animation-delay:0.4s" />
                        <rect x="200" y="150" width="30" height="100" class="bar" style="animation-delay:0.6s" />
                        <circle cx="320" cy="100" r="40" class="gear" />
                        <path d="M320 60 L320 40 M320 140 L320 160 M280 100 L260 100 M360 100 L380 100" stroke="#fec700" stroke-width="4" />
                    </svg>
                </div>`;
        } else if (type === 'tech') {
            return `
                <div class="skill-visualizer-header vis-tech">
                    <div style="position:absolute; top:0; left:10px;" class="code-line">01011010101101<br>FUNCTION_INIT<br>DATA_STREAM_ON<br>LOGISTICS_SYNC</div>
                    <div style="position:absolute; top:0; right:10px;" class="code-line">SYSTEM_ONLINE<br>USER_AUTH_OK<br>RENDER_3D_CORE<br>00111010110</div>
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <path class="circuit" d="M10 10 H40 V40 H10 Z M60 60 H90 V90 H60 Z M40 40 L60 60" />
                        <circle cx="50" cy="50" r="5" fill="#fec700">
                            <animate attributeName="r" values="5;8;5" dur="1s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>`;
        } else {
            return `
                <div class="skill-visualizer-header vis-marketing">
                    <svg width="100%" height="100%" viewBox="0 0 400 200">
                        <!-- Central glow element -->
                        <circle cx="200" cy="100" r="40" class="blob" />
                        
                        <!-- Orbital rings and floating icons -->
                        <g style="transform-origin: 200px 100px; animation: rotate 15s linear infinite;">
                            <circle cx="270" cy="100" r="8" fill="var(--primary-color)" />
                            <rect x="120" y="90" width="15" height="15" rx="3" fill="var(--primary-color)" opacity="0.6" />
                            <path d="M 200 40 L 210 60 L 190 60 Z" fill="var(--primary-color)" opacity="0.8" />
                        </g>
                        
                        <circle cx="200" cy="100" r="75" fill="none" stroke="var(--primary-color)" stroke-width="1" stroke-dasharray="5 5" opacity="0.3">
                             <animateTransform attributeName="transform" type="rotate" from="0 200 100" to="360 200 100" dur="20s" repeatCount="indefinite" />
                        </circle>

                        <!-- Bulb Icon -->
                        <g class="idea">
                            <svg x="180" y="80" width="40" height="40" viewBox="0 0 24 24" fill="#fec700">
                                <path d="M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                            </svg>
                        </g>

                        <!-- Extra sparkles -->
                        <circle cx="100" cy="50" r="2" fill="var(--primary-color)">
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="150" r="2" fill="var(--primary-color)">
                            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>`;
        }
    };

    const openTeamModal = (member) => {
        const existingModal = document.querySelector('.team-modal-overlay');
        if (existingModal) existingModal.remove();

        const overlay = document.createElement('div');
        overlay.className = 'team-modal-overlay';
        const content = document.createElement('div');
        content.className = 'team-modal-content';
        
        content.innerHTML = `
            <button class="close-modal-btn" title="Fechar">×</button>
            ${getVisualizer(member.specialty)}
            <div class="modal-body">
                <div class="modal-avatar-wrapper">
                    <img src="${getDriveImg(member.imgId)}" alt="${member.name}" style="${member.specialty === 'marketing' ? 'object-position: center 20%; transform: scale(1.4);' : ''}">
                </div>
                <h2 style="margin:0; font-size:2rem; color:var(--text-color);">${member.name}</h2>
                <div style="color:var(--primary-color); font-weight:700; text-transform:uppercase; letter-spacing:3px; margin: 0.5rem 0 1.5rem 0; font-size:0.9rem;">${member.role}</div>
                
                <div class="modal-info-grid">
                    <div class="info-label">Idade</div>
                    <div class="info-value" style="margin-bottom:1.5rem;">${member.age}</div>
                    
                    <div class="info-label">Propósito no Projeto</div>
                    <div class="info-value" style="font-style: italic; background: var(--timeline-bg); padding: 1rem; border-radius: 12px; margin-bottom:1.5rem;">
                        "${member.projectRole}"
                    </div>
                    
                    <div class="info-label">Especialidades Técnicas</div>
                    <div style="margin-bottom:1.5rem;">
                        ${member.hardSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    
                    <div class="info-label">Diferenciais Pessoais</div>
                    <div>
                        ${member.softSkills.map(skill => `<span class="skill-tag" style="background:transparent; border-color:var(--primary-color)">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('open'));
        const closeModal = () => { overlay.classList.remove('open'); setTimeout(() => overlay.remove(), 400); };
        content.querySelector('.close-modal-btn').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    };

    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.setAttribute('role', 'button');
        applyStyles(card, { textAlign: 'center', width: '300px', flex: '0 1 300px' });
        card.addEventListener('click', () => openTeamModal(member));
        const imgContainer = document.createElement('div');
        imgContainer.className = 'team-avatar-container';
        const imgMask = document.createElement('div');
        imgMask.className = 'team-avatar-mask';
        const imgContent = document.createElement('img');
        imgContent.className = 'team-avatar';
        imgContent.src = getDriveImg(member.imgId);
        if (member.imgStyle) applyStyles(imgContent, member.imgStyle);
        imgMask.appendChild(imgContent);
        imgContainer.appendChild(imgMask);
        const name = document.createElement('h3');
        name.textContent = member.name;
        applyStyles(name, { margin: '0', fontSize: '1.4rem', color: 'var(--text-color)', fontWeight: '700' });
        const role = document.createElement('p');
        role.textContent = member.role;
        applyStyles(role, { margin: '0.5rem 0 0 0', fontSize: '1rem', color: 'var(--primary-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' });
        card.append(imgContainer, name, role);
        teamGrid.appendChild(card);
    });

    teamSection.append(teamTitle, teamSubtitle, teamGrid);
    container.append(faqTitle, faqContainer, teamSection);
    section.appendChild(container);
    return section;
}
