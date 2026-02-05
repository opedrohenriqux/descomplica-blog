
import { styles, applyStyles, CtaButton } from '../utils.tsx';

export function renderHomeQuote() {
    const section = document.createElement('section');
    section.className = 'quote-section';
    applyStyles(section, { ...styles.section, backgroundColor: 'var(--footer-bg)' });

    // Injeta estilos específicos para os modais
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .history-modal-overlay, .summary-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(10px);
      }
      .summary-modal-overlay { z-index: 6000; background-color: rgba(0,0,0,0.85); }
      
      .history-modal-overlay.open, .summary-modal-overlay.open {
        opacity: 1;
        pointer-events: all;
      }
      .history-modal-content, .summary-modal-content {
        background-color: var(--card-bg);
        width: 95%;
        max-width: 1000px;
        max-height: 90vh;
        border-radius: 32px;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.4s ease;
        box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        border: 2px solid var(--primary-color);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .summary-modal-content { max-width: 700px; border-color: #fff; }

      .history-modal-overlay.open .history-modal-content,
      .summary-modal-overlay.open .summary-modal-content {
        transform: translateY(0);
      }
      .history-header, .summary-header {
        padding: 2rem 3rem;
        background: var(--timeline-bg);
        border-bottom: 1px solid var(--card-border);
      }
      .history-body, .summary-body {
        padding: 2rem 3rem;
        overflow-y: auto;
        flex: 1;
      }
      .history-footer {
        padding: 1.5rem 3rem;
        background: var(--timeline-bg);
        border-top: 1px solid var(--card-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .history-tag {
        display: inline-block;
        background: var(--primary-color);
        color: #000;
        padding: 4px 12px;
        border-radius: 50px;
        font-weight: 800;
        font-size: 0.75rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
      }
      .history-title {
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        color: var(--text-color);
      }
      .op-link {
        color: var(--primary-color);
        text-decoration: underline;
        cursor: pointer;
        transition: opacity 0.2s;
      }
      .op-link:hover { opacity: 0.8; }
      
      .history-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 1.5rem;
      }
      .history-box {
        background: var(--timeline-bg);
        padding: 1.5rem;
        border-radius: 16px;
        border-left: 4px solid var(--primary-color);
      }
      .history-box h4 {
        margin: 0 0 0.5rem 0;
        color: var(--primary-color);
        font-size: 1rem;
        text-transform: uppercase;
      }
      .history-box p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.6;
      }
      .summary-section { margin-bottom: 1.5rem; }
      .summary-section strong { color: var(--primary-color); display: block; margin-bottom: 5px; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
      .summary-section p { margin: 0; line-height: 1.6; font-size: 1.05rem; color: var(--text-color-light); }

      .history-nav-dots { display: flex; gap: 10px; }
      .nav-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--card-border); cursor: pointer; transition: all 0.3s; }
      .nav-dot.active { background: var(--primary-color); width: 30px; border-radius: 10px; }
      
      @media (max-width: 768px) {
        .history-grid { grid-template-columns: 1fr; }
        .history-header, .history-body, .history-footer, .summary-header, .summary-body { padding: 1.5rem; }
        .history-title { font-size: 1.6rem; }
      }
    `;
    document.head.appendChild(styleSheet);

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '3rem', borderBottom: 'none' });
    title.innerHTML = `Importância <span style="color: ${styles.highlight.color};">Logística</span>`;
    
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-card';
    applyStyles(quoteContainer, { position: 'relative' });

    quoteContainer.innerHTML = `
        <span class="quote-mark">“</span>
        <blockquote cite="https://www.goodreads.com/quotes/26083-you-will-not-find-it-difficult-to-prove-that">
            Você não terá dificuldade para provar que batalhas, campanhas e até guerras foram vencidas ou perdidas principalmente devido à logística.
        </blockquote>
        <cite>General Dwight D. Eisenhower (1890-1969)</cite>
    `;

    const saibaMaisBtn = CtaButton('Saiba mais', () => openHistoryModal(), {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '0.85rem',
        padding: '0.5rem 1.2rem',
        margin: '0'
    });

    quoteContainer.appendChild(saibaMaisBtn);
    
    function openHistoryModal() {
        const existing = document.querySelector('.history-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'history-modal-overlay';
        
        const content = document.createElement('div');
        content.className = 'history-modal-content';

        const historySteps = [
            {
                tag: "Conceito",
                title: "O Coração da Estratégia",
                intro: "A logística é a inteligência que garante que a força bruta não seja desperdiçada. Sem o recurso certo no lugar certo, planos geniais tornam-se desastres.",
                boxes: [
                    { h: "Visão Profissional", p: "Amadores discutem tática; profissionais discutem logística. É a diferença entre um ataque isolado e a sustentação de uma vitória." },
                    { h: "Sincronia Total", p: "Integrar Compras, Estoque e Transporte é o que mantém a engrenagem girando, seja no campo de batalha ou no e-commerce." }
                ]
            },
            {
                tag: "Falha Crítica",
                title: "O Colapso de <span class='op-link' data-op='napoleao'>Napoleão na Rússia</span>",
                intro: "Em 1812, o maior exército da Europa foi derrotado não por canhões, mas pela distância e pela falta de suprimentos básicos.",
                boxes: [
                    { h: "O Erro", p: "Napoleão subestimou o clima e a tática de terra arrasada russa, esticando suas linhas de abastecimento até o ponto de ruptura." },
                    { h: "Consequência", p: "A falta de roupas de inverno, comida e forragem dizimou 90% da Grande Armée durante a retirada." }
                ]
            },
            {
                tag: "Exaustão",
                title: "O Cerco de <span class='op-link' data-op='stalingrado'>Stalingrado</span>",
                intro: "A virada da 2ª Guerra Mundial ocorreu quando um exército inteiro foi isolado de sua fonte de materiais vitais.",
                boxes: [
                    { h: "Ruptura de Fluxo", p: "O 6º Exército alemão foi cercado e a logística aérea falhou em entregar as 300 toneladas diárias de suprimentos necessárias." },
                    { h: "Lição Logística", p: "Depender de modais de emergência (aviões) para grandes volumes sem redundância terrestre é fatal." }
                ]
            },
            {
                tag: "Inovação",
                title: "O Sucesso do <span class='op-link' data-op='diad'>Dia D</span>",
                intro: "A Operação Overlord foi o maior triunfo logístico da história, viabilizado por infraestruturas criadas do zero.",
                boxes: [
                    { h: "Portos Artificiais", p: "Sem acesso a portos reais, os aliados construíram os 'Mulberrys' e oleodutos sob o mar para abastecer a invasão." },
                    { h: "Resultado", p: "O fluxo ininterrupto de munição e combustível permitiu a libertação da Europa em tempo recorde." }
                ]
            },
            {
                tag: "Estrangulamento",
                title: "A <span class='op-link' data-op='pacifico'>Guerra do Pacífico</span>",
                intro: "A vitória no mar não foi apenas sobre navios de guerra, mas sobre o controle absoluto das rotas comerciais de insumos.",
                boxes: [
                    { h: "Bloqueio Naval", p: "A marinha mercante japonesa foi destruída, cortando o suprimento de ferro e petróleo das ilhas ocupadas." },
                    { h: "Veredito", p: "Sem matéria-prima, a indústria de guerra para. Quem domina o fluxo global, domina o conflito." }
                ]
            }
        ];

        const summaries = {
            napoleao: {
                title: "Napoleão na Rússia (1812)",
                context: "Napoleão Bonaparte invadiu a Rússia para forçar o Czar Alexandre I a aderir ao bloqueio econômico contra o Reino Unido.",
                event: "A 'Grande Armée' entrou em território russo com 600 mil homens, a maior força militar já vista na época.",
                confronto: "Os russos evitavam batalhas diretas, queimando recursos enquanto recuavam. Napoleão tomou Moscou, mas a cidade foi incendiada e estava vazia.",
                link: "A derrota foi 100% logística. As linhas de suprimento eram longas demais para estradas precárias; soldados morreram de fome e frio antes mesmo de dispararem suas armas."
            },
            stalingrado: {
                title: "Cerco de Stalingrado (1942)",
                context: "A Alemanha nazista buscava capturar os campos de petróleo do Cáucaso e o centro industrial de Stalingrado.",
                event: "O que deveria ser uma vitória rápida tornou-se uma luta urbana brutal de meses em meio a ruínas.",
                confronto: "O Exército Vermelho cercou 250 mil alemães. Hitler proibiu a retirada, prometendo suprimento total via aérea.",
                link: "A logística falhou: a Luftwaffe só conseguia entregar uma fração do necessário. Sem combustível para aquecimento e comida, o exército alemão definhou e se rendeu por inanição."
            },
            diad: {
                title: "Desembarque da Normandia (1944)",
                context: "Plano aliado (Operação Overlord) para abrir uma nova frente e libertar a Europa Ocidental da ocupação nazista.",
                event: "Em 6 de junho, 150 mil soldados cruzaram o Canal da Mancha para assaltar cinco praias fortemente defendidas.",
                confronto: "Batalha anfíbia épica que exigiu sincronia perfeita entre exército, marinha e força aérea para romper a 'Muralha do Atlântico'.",
                link: "O sucesso dependeu de inovações logísticas sem precedentes: os portos flutuantes 'Mulberry' permitiram o descarregamento contínuo de tanques sem a captura de um porto real."
            },
            pacifico: {
                title: "Bloqueio do Pacífico (1941-1945)",
                context: "Conflito entre EUA e Japão pelo controle do Sudeste Asiático e rotas comerciais oceânicas.",
                event: "Uma campanha de 'salto entre ilhas' para isolar as bases japonesas enquanto se avançava em direção a Tóquio.",
                confronto: "Grandes batalhas de porta-aviões, mas o golpe silencioso foi o ataque sistemático aos navios de carga japoneses por submarinos.",
                link: "Ao cortar o fluxo de borracha, estanho e petróleo, os EUA 'mataram a sede' da indústria japonesa. Sem logística de suprimento externo, o Japão não conseguia mais fabricar aviões ou navios."
            }
        };

        const openSummary = (id) => {
            const data = summaries[id];
            const sOverlay = document.createElement('div');
            sOverlay.className = 'summary-modal-overlay';
            
            const sContent = document.createElement('div');
            sContent.className = 'summary-modal-content';
            sContent.innerHTML = `
                <div class="summary-header">
                    <h3 style="margin:0; font-size:1.6rem;">${data.title}</h3>
                </div>
                <div class="summary-body">
                    <div class="summary-section">
                        <strong>Contexto Histórico</strong>
                        <p>${data.context}</p>
                    </div>
                    <div class="summary-section">
                        <strong>O Confronto</strong>
                        <p>${data.confronto}</p>
                    </div>
                    <div class="summary-section" style="background:var(--primary-color); padding:1.5rem; border-radius:16px; border: 2px solid #000;">
                        <strong style="color:#000; font-weight: 900; border-bottom: 2px solid rgba(0,0,0,0.2); padding-bottom: 5px; margin-bottom: 10px;">O Link com a Logística</strong>
                        <p style="color:#000; font-weight:700; line-height: 1.5;">${data.link}</p>
                    </div>
                </div>
                <button class="close-summary-btn" style="position:absolute; top:20px; right:20px; background:#000; color: #fff; border:none; border-radius:50%; width:35px; height:35px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;">&times;</button>
            `;

            sOverlay.appendChild(sContent);
            document.body.appendChild(sOverlay);
            requestAnimationFrame(() => sOverlay.classList.add('open'));

            const closeS = () => { sOverlay.classList.remove('open'); setTimeout(() => sOverlay.remove(), 400); };
            sContent.querySelector('.close-summary-btn').addEventListener('click', closeS);
            sOverlay.addEventListener('click', (e) => { if (e.target === sOverlay) closeS(); });
        };

        let currentIdx = 0;

        const renderHistoryStep = (idx) => {
            const step = historySteps[idx];
            currentIdx = idx;

            content.innerHTML = `
                <div class="history-header">
                    <span class="history-tag">${step.tag}</span>
                    <h3 class="history-title">${step.title}</h3>
                    <p style="font-size: 1.15rem; line-height: 1.6; margin: 0; color: var(--text-color-light);">${step.intro}</p>
                    <p style="margin-top:10px; font-size:0.8rem; opacity:0.7;">(Clique nos nomes destacados para ver o resumo completo)</p>
                </div>
                <div class="history-body">
                    <div class="history-grid">
                        ${step.boxes.map(box => `
                            <div class="history-box">
                                <h4>${box.h}</h4>
                                <p>${box.p}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="history-footer">
                    <div id="hist-btn-prev"></div>
                    <div class="history-nav-dots">
                        ${historySteps.map((_, i) => `<div class="nav-dot ${i === idx ? 'active' : ''}" data-idx="${i}"></div>`).join('')}
                    </div>
                    <div id="hist-btn-next"></div>
                </div>
                <button class="close-flow-btn" style="position:absolute; top:20px; right:30px; background:none; border:none; font-size:2.5rem; cursor:pointer; color:var(--text-color-subtle);">&times;</button>
            `;

            content.querySelectorAll('.op-link').forEach(link => {
                link.addEventListener('click', () => openSummary((link as HTMLElement).dataset.op));
            });

            const prevDiv = content.querySelector('#hist-btn-prev');
            const nextDiv = content.querySelector('#hist-btn-next');

            if (idx > 0) {
                prevDiv.appendChild(CtaButton('← Anterior', () => renderHistoryStep(idx - 1), { fontSize: '0.9rem' }));
            } else {
                prevDiv.innerHTML = '<div style="width:100px"></div>';
            }

            if (idx < historySteps.length - 1) {
                nextDiv.appendChild(CtaButton('Próximo →', () => renderHistoryStep(idx + 1), { fontSize: '0.9rem' }));
            } else {
                nextDiv.appendChild(CtaButton('Fechar', closeModal, { fontSize: '0.9rem' }));
            }

            content.querySelector('.close-flow-btn').addEventListener('click', closeModal);
            content.querySelectorAll('.nav-dot').forEach(dot => {
                dot.addEventListener('click', () => renderHistoryStep(parseInt((dot as HTMLElement).dataset.idx)));
            });
        };

        const closeModal = () => {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 400);
        };

        renderHistoryStep(0);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('open'));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    }
    
    section.append(title, quoteContainer);
    return section;
}
