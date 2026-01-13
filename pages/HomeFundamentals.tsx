
import { styles, applyStyles, conteudosList, CtaButton } from '../utils.tsx';

export function renderHomeFundamentals() {
  const section = document.createElement('section');
  section.className = 'fundamentals-section';
  applyStyles(section, { ...styles.section, minHeight: 'auto', padding: '6rem 2rem' });

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Fundamentos da <span style="color: ${styles.highlight.color};">Logística</span>`;

  const container = document.createElement('div');
  container.className = 'fundamentals-container';

  const diagramWrapper = document.createElement('div');
  diagramWrapper.className = 'logistics-flow-diagram';
  diagramWrapper.setAttribute('aria-label', 'Diagrama animado mostrando o fluxo da logística de fornecedor para empresa e para cliente.');

  diagramWrapper.innerHTML = `
      <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <path id="flow-path-1" d="M 150 150 Q 275 60, 400 150" stroke="var(--primary-color)" stroke-width="3" fill="none" stroke-dasharray="8, 8" />
        <path id="flow-path-2" d="M 400 150 Q 525 240, 650 150" stroke="var(--primary-color)" stroke-width="3" fill="none" stroke-dasharray="8, 8" />

        <circle cx="0" cy="0" r="6" fill="var(--primary-color)">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
            <mpath xlink:href="#flow-path-1"></mpath>
          </animateMotion>
        </circle>
         <circle cx="0" cy="0" r="6" fill="var(--primary-color)">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" begin="1.5s">
            <mpath xlink:href="#flow-path-2"></mpath>
          </animateMotion>
        </circle>

        <g class="flow-node">
          <circle cx="150" cy="150" r="55" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" stroke-width="2" />
          <text x="150" y="155" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" fill="var(--diagram-text)">Fornecedor</text>
        </g>

        <g class="flow-node">
          <circle cx="400" cy="150" r="75" fill="var(--diagram-node-bg)" stroke="var(--primary-color)" stroke-width="5" />
          <text x="400" y="145" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="var(--diagram-text)">Empresa</text>
          <text x="400" y="165" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" fill="var(--diagram-text)">(Produção)</text>
        </g>

        <g class="flow-node">
          <circle cx="650" cy="150" r="55" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" stroke-width="2" />
          <text x="650" y="155" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" fill="var(--diagram-text)">Cliente</text>
        </g>
      </svg>
  `;

  // Botão Saiba Mais no canto inferior direito
  const learnMoreBtnContainer = document.createElement('div');
  learnMoreBtnContainer.className = 'learn-more-btn-container';
  const learnMoreBtn = CtaButton('Saiba mais', () => openFlowModal(), { fontSize: '0.85rem', padding: '0.5rem 1rem' });
  learnMoreBtn.classList.add('pulse-btn');
  learnMoreBtnContainer.appendChild(learnMoreBtn);
  diagramWrapper.appendChild(learnMoreBtnContainer);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'fundamentals-cards';
  cardsWrapper.innerHTML = `
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'compras').intro}">
        <h3>Compras</h3>
        <p>Aquisição estratégica de bens e serviços.</p>
      </div>
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'recebimento-de-materiais').intro}">
        <h3>Recebimento</h3>
        <p>Conferência e fluxo interno de materiais.</p>
      </div>
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'cadeia-de-suprimentos').intro}">
        <h3>Supply Chain</h3>
        <p>A rede integrada que conecta processos.</p>
      </div>
  `;

  container.append(diagramWrapper, cardsWrapper);
  section.append(title, container);

  // --- Modal de Fluxo Interativo ---
  function openFlowModal() {
    const existing = document.querySelector('.flow-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'flow-modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'flow-modal-content';

    let currentStep = 0;
    const steps = [
      {
        title: "1. Fornecedor (Origem)",
        desc: "Tudo começa aqui. O fornecedor é quem provê os insumos e matérias-primas necessários para que a empresa possa criar seus produtos. Uma boa relação com fornecedores garante agilidade e qualidade desde o primeiro passo.",
        visual: `
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="50" width="120" height="100" rx="10" fill="var(--primary-color)" />
            <path d="M 170 100 L 250 100" stroke="#333" stroke-width="4" stroke-dasharray="8 8" marker-end="url(#arrowhead)" />
            <rect x="250" y="80" width="60" height="40" rx="5" fill="#555" />
            <circle cx="265" cy="120" r="6" fill="#000" />
            <circle cx="295" cy="120" r="6" fill="#000" />
            <text x="110" y="105" text-anchor="middle" font-weight="bold" fill="#fff">Insumos</text>
          </svg>`
      },
      {
        title: "2. Empresa (Produção)",
        desc: "Dentro da organização, os insumos são transformados. A logística interna cuida do recebimento, armazenamento e movimentação desses materiais para que a linha de produção nunca pare e o produto final seja montado com perfeição.",
        visual: `
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100,50)">
               <path d="M0 100 L0 40 L40 0 L80 40 L120 0 L160 40 L200 40 L200 100 Z" fill="var(--primary-color)" />
               <circle cx="50" cy="100" r="20" fill="#333" />
               <circle cx="150" cy="100" r="20" fill="#333" />
               <rect x="80" y="50" width="40" height="40" fill="#fff" opacity="0.5" />
            </g>
          </svg>`
      },
      {
        title: "3. Cliente (Entrega Final)",
        desc: "O destino final da jornada. Aqui, a logística foca na distribuição e transporte eficiente para garantir que o cliente receba seu pedido no lugar certo, no tempo certo e em perfeitas condições. É o momento da verdade e satisfação!",
        visual: `
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
             <path d="M 50 100 L 300 100" stroke="#333" stroke-width="2" />
             <g transform="translate(300,50)">
               <path d="M0 100 L0 40 L50 0 L100 40 L100 100 Z" fill="var(--primary-color)" />
               <rect x="35" y="60" width="30" height="40" fill="#fff" />
             </g>
             <g transform="translate(100,70)">
                <rect width="60" height="40" rx="5" fill="#fec700" stroke="#333" stroke-width="2" />
                <text x="30" y="25" text-anchor="middle" font-size="10" font-weight="bold">📦</text>
                <animateTransform attributeName="transform" type="translate" from="100 70" to="250 70" dur="2s" repeatCount="indefinite" />
             </g>
          </svg>`
      }
    ];

    const renderStep = (idx) => {
      const step = steps[idx];
      content.innerHTML = `
        <button class="close-flow-btn" aria-label="Fechar">&times;</button>
        <div class="flow-step-visual">${step.visual}</div>
        <div class="flow-step-text">
          <h2>${step.title}</h2>
          <p>${step.desc}</p>
        </div>
        <div class="flow-nav">
          <div id="btn-prev-container"></div>
          <div class="step-dots">
            ${steps.map((_, i) => `<div class="dot ${i === idx ? 'active' : ''}"></div>`).join('')}
          </div>
          <div id="btn-next-container"></div>
        </div>
      `;

      const prevCont = content.querySelector('#btn-prev-container');
      const nextCont = content.querySelector('#btn-next-container');

      if (idx > 0) {
        prevCont.appendChild(CtaButton('Anterior', () => renderStep(idx - 1), { fontSize: '0.9rem' }));
      }
      
      if (idx < steps.length - 1) {
        nextCont.appendChild(CtaButton('Próximo', () => renderStep(idx + 1), { fontSize: '0.9rem' }));
      } else {
        nextCont.appendChild(CtaButton('Concluir', closeModal, { fontSize: '0.9rem' }));
      }

      content.querySelector('.close-flow-btn').addEventListener('click', closeModal);
    };

    const closeModal = () => {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 400);
    };

    renderStep(0);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => overlay.classList.add('open'));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
  }

  return section;
}
