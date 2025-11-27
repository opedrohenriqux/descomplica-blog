

import { styles, applyStyles } from '../utils.tsx';

export function renderQuemSomosPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });
    
    // Injeta estilos específicos para a animação da equipe e do Modal
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      .team-card {
        animation-duration: 0.8s;
        animation-fill-mode: both;
        animation-name: fadeInUp;
        cursor: pointer; /* Indica clicável */
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
        padding: 5px; /* Espaço para a borda gradient aparecer */
        background: linear-gradient(45deg, var(--primary-color), transparent);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .team-avatar-mask {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden; /* Corta o excesso da imagem com zoom */
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
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
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
        width: 90%;
        max-width: 500px;
        border-radius: 16px;
        padding: 2rem;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid var(--card-border);
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        max-height: 90vh;
        overflow-y: auto;
      }
      .team-modal-overlay.open .team-modal-content {
        transform: translateY(0);
      }

      .close-modal-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-color-light);
        transition: color 0.2s;
      }
      .close-modal-btn:hover {
        color: var(--primary-color);
      }

      .modal-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 1rem;
      }
      .modal-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .modal-info-grid {
        display: grid;
        gap: 1.5rem;
      }
      
      .skill-tag {
        display: inline-block;
        background-color: var(--button-bg);
        color: var(--text-color);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        margin: 0.2rem;
        border: 1px solid var(--card-border);
      }
      
      .info-label {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-color-light);
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      .info-value {
        font-size: 1rem;
        color: var(--text-color);
      }

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
    applyStyles(faqContainer, {
      width: '100%',
      maxWidth: '800px',
      textAlign: 'left',
      margin: '0 auto'
    });

    const faqs = [
        { q: "O que é o Descomplica Logística?", a: "É uma plataforma educativa com o objetivo de ensinar conceitos de logística de forma simples, didática e visual. Usamos textos, vídeos e imagens para tornar o aprendizado mais acessível a todos." },
        { q: "Para quem é este site?", a: "Para estudantes, profissionais da área que buscam reciclar conhecimentos, e qualquer pessoa curiosa sobre como os produtos chegam até elas. Nossa abordagem é feita para ser compreendida por todos, desde o iniciante até o mais experiente." },
        { q: "O conteúdo é gratuito?", a: "Sim, todo o conteúdo educacional e os jogos disponíveis no Descomplica Logística são 100% gratuitos." },
        { q: "Com que frequência o conteúdo é atualizado?", a: "Estamos sempre trabalhando para adicionar novos tópicos, aprofundar os existentes e criar novas formas interativas de aprendizado. Siga-nos para ficar por dentro das novidades!" }
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        applyStyles(faqItem, {
            marginBottom: '1rem',
            border: `1px solid var(--card-border)`,
            borderRadius: '12px',
            overflow: 'hidden'
        });

        const question = document.createElement('div');
        question.className = 'faq-question';
        question.innerHTML = `<p>${faq.q}</p><span>+</span>`;
        applyStyles(question, {
            padding: '1.2rem 1.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)'
        });
        applyStyles(question.querySelector('p'), { margin: 0 });

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = `<p>${faq.a}</p>`;
        applyStyles(answer, {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
            backgroundColor: 'var(--timeline-bg)'
        });
        applyStyles(answer.querySelector('p'), { 
            margin: 0,
            padding: '1.2rem 1.5rem',
            lineHeight: '1.7'
        });
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            document.querySelectorAll('.faq-answer').forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.maxHeight = '0';
                    if (el.previousElementSibling && el.previousElementSibling.querySelector('span')) {
                      el.previousElementSibling.querySelector('span').textContent = '+';
                    }
                }
            });
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
    applyStyles(teamSection, {
        width: '100%',
        marginTop: '6rem',
        paddingTop: '4rem',
        borderTop: '2px solid var(--timeline-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    });

    const teamTitle = document.createElement('h2');
    applyStyles(teamTitle, { ...styles.sectionTitle, marginBottom: '0.5rem' });
    teamTitle.textContent = 'Quem Somos';
    
    const teamSubtitle = document.createElement('p');
    teamSubtitle.textContent = 'Os idealizadores por trás do Descomplica Logística. Clique na foto para ver mais detalhes.';
    applyStyles(teamSubtitle, {
        color: 'var(--text-color-light)',
        marginBottom: '3rem',
        fontSize: '1.1rem'
    });

    const teamGrid = document.createElement('div');
    applyStyles(teamGrid, {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        width: '100%'
    });

    // Helper para gerar URL de thumbnail do Drive
    const getDriveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w500`;

    // Dados da Equipe
    const teamMembers = [
        {
            name: "Heloisa Dias",
            role: "Idealizadora",
            age: "18 anos", 
            hardSkills: ["Gestão de Estoque", "Planejamento Estratégico", "Pacote Office"],
            softSkills: ["Liderança", "Comunicação", "Resolução de Problemas"],
            projectRole: "Responsável pela pesquisa de conteúdo, estruturação didática e revisão técnica dos materiais.",
            imgId: "1bJMLIfhNOFDS-IKK2aHt-7ClQNkgMfQy",
            isPlaceholder: false
        },
        {
            name: "Pedro Henrique",
            role: "Idealizador",
            age: "19 anos",
            hardSkills: ["Análise de Dados", "Gestão de Projetos", "Tecnologia"],
            softSkills: ["Trabalho em Equipe", "Pensamento Crítico", "Adaptabilidade"],
            projectRole: "Atuação como responsável pela execução técnica do projeto e focado em desenvolver soluções estratégicas para implementação e manutenção dos conteúdos, visando uma otimização de tempo e de recursos.",
            imgId: "1TXPQ5toyv9MVHsc5Ky0TJZvx7mRV2uai",
            isPlaceholder: false
        },
        {
            name: "Arthur Augusto",
            role: "Idealizador",
            age: "18 anos",
            hardSkills: ["Design Gráfico", "Edição de Vídeo", "Marketing Digital"],
            softSkills: ["Criatividade", "Inovação", "Empatia"],
            projectRole: "Cuida da identidade visual, criação de mídias e experiência do usuário na plataforma.",
            imgId: "1GAVSKeHNMvUt4S0wJEzNn8Bkqn1_fPqw",
            isPlaceholder: false,
            imgStyle: {
                objectPosition: 'center 20%', // Foca mais acima (rosto)
                transform: 'scale(1.4)'       // Dá um zoom na imagem
            }
        }
    ];

    // Função para criar e abrir o modal
    const openTeamModal = (member) => {
        const existingModal = document.querySelector('.team-modal-overlay');
        if (existingModal) existingModal.remove();

        const overlay = document.createElement('div');
        overlay.className = 'team-modal-overlay';
        
        const imgSrc = member.isPlaceholder 
            ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
            : getDriveImg(member.imgId);

        const content = document.createElement('div');
        content.className = 'team-modal-content';
        
        content.innerHTML = `
            <button class="close-modal-btn">×</button>
            <div class="modal-header">
                <img src="${imgSrc}" alt="${member.name}" class="modal-avatar" style="${member.isPlaceholder ? 'padding: 15px; background: #eee;' : ''}">
                <h2 style="margin:0; font-size:1.8rem; color:var(--text-color);">${member.name}</h2>
                <span style="color:var(--primary-color); font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-top:0.5rem;">${member.role}</span>
            </div>
            
            <div class="modal-info-grid">
                <div>
                    <div class="info-label">Idade</div>
                    <div class="info-value">${member.age}</div>
                </div>

                 <div>
                    <div class="info-label">Papel no Descomplica Logística</div>
                    <div class="info-value" style="font-style: italic;">"${member.projectRole}"</div>
                </div>
                
                <div>
                    <div class="info-label">Hard Skills</div>
                    <div class="skills-container">
                        ${member.hardSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div>
                    <div class="info-label">Soft Skills</div>
                    <div class="skills-container">
                        ${member.softSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('open');
        });

        const closeBtn = content.querySelector('.close-modal-btn');
        const closeModal = () => {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    };

    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalhes de ${member.name}`);
        applyStyles(card, {
            textAlign: 'center',
            width: '300px',
            flex: '0 1 300px'
        });

        card.addEventListener('click', () => openTeamModal(member));

        // Container Externo (Borda/Gradiente)
        const imgContainer = document.createElement('div');
        imgContainer.className = 'team-avatar-container';

        // Container Interno (Máscara)
        const imgMask = document.createElement('div');
        imgMask.className = 'team-avatar-mask';

        let imgContent;
        if (member.isPlaceholder) {
            imgContent = document.createElement('div');
            imgContent.className = 'team-avatar';
            applyStyles(imgContent, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--timeline-border)',
                color: 'var(--text-color-light)'
            });
            imgContent.innerHTML = `<svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        } else {
            imgContent = document.createElement('img');
            imgContent.className = 'team-avatar';
            imgContent.src = getDriveImg(member.imgId);
            imgContent.alt = member.name;
            
            if (member.imgStyle) {
                applyStyles(imgContent, member.imgStyle);
            }
        }

        imgMask.appendChild(imgContent);
        imgContainer.appendChild(imgMask);

        const name = document.createElement('h3');
        name.textContent = member.name;
        applyStyles(name, {
            margin: '0',
            fontSize: '1.4rem',
            color: 'var(--text-color)',
            fontWeight: '700'
        });

        const role = document.createElement('p');
        role.textContent = member.role;
        applyStyles(role, {
            margin: '0.5rem 0 0 0',
            fontSize: '1rem',
            color: 'var(--primary-color)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        });

        card.append(imgContainer, name, role);
        teamGrid.appendChild(card);
    });

    teamSection.append(teamTitle, teamSubtitle, teamGrid);

    container.append(faqTitle, faqContainer, teamSection);
    section.appendChild(container);
    return section;
}
