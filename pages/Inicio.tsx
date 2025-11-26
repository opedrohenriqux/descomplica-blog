import { styles, applyStyles, CtaButton, conteudosList } from '../utils.tsx';

function renderFundamentalsSection() {
  const section = document.createElement('section');
  section.className = 'fundamentals-section';
  applyStyles(section, { ...styles.section, minHeight: 'auto', padding: '6rem 2rem' });

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Fundamentos da <span style="color: ${styles.highlight.color};">Logística</span>`;

  const container = document.createElement('div');
  container.className = 'fundamentals-container';

  container.innerHTML = `
    <div class="logistics-flow-diagram" aria-label="Diagrama animado mostrando o fluxo da logística de fornecedor para empresa e para cliente.">
      <svg viewBox="0 0 400 300">
        <!-- Flow Lines -->
        <path id="flow-path-1" d="M 50 150 Q 125 75, 200 150" stroke="var(--primary-color)" stroke-width="2" fill="none" stroke-dasharray="5, 5" />
        <path id="flow-path-2" d="M 200 150 Q 275 225, 350 150" stroke="var(--primary-color)" stroke-width="2" fill="none" stroke-dasharray="5, 5" />

        <!-- Animated dots -->
        <circle cx="0" cy="0" r="4" fill="var(--primary-color)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath xlink:href="#flow-path-1"></mpath>
          </animateMotion>
        </circle>
         <circle cx="0" cy="0" r="4" fill="var(--primary-color)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" begin="2s">
            <mpath xlink:href="#flow-path-2"></mpath>
          </animateMotion>
        </circle>

        <!-- Nodes -->
        <g class="flow-node">
          <circle cx="50" cy="150" r="30" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2" />
          <text x="50" y="155" text-anchor="middle" font-size="10">Fornecedor</text>
        </g>
        <g class="flow-node">
          <circle cx="200" cy="150" r="40" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3" />
          <text x="200" y="150" text-anchor="middle" font-size="12">Empresa</text>
          <text x="200" y="165" text-anchor="middle" font-size="10">(Produção)</text>
        </g>
        <g class="flow-node">
          <circle cx="350" cy="150" r="30" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2" />
          <text x="350" y="155" text-anchor="middle" font-size="10">Cliente</text>
        </g>
      </svg>
    </div>
    <div class="fundamentals-cards">
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'compras').intro}">
        <h3>Compras</h3>
        <p>Aquisição de bens e serviços.</p>
      </div>
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'recebimento-de-materiais').intro}">
        <h3>Recebimento</h3>
        <p>Conferência de materiais.</p>
      </div>
      <div class="fund-card" data-tooltip="${conteudosList.find(c => c.id === 'cadeia-de-suprimentos').intro}">
        <h3>Supply Chain</h3>
        <p>A rede completa de processos.</p>
      </div>
    </div>
  `;

  section.append(title, container);
  return section;
}

function renderLogisticsRightsSection() {
  const section = document.createElement('section');
  section.className = 'logistics-rights-section';

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Os 5 <span style="color: ${styles.highlight.color};">Certos</span> da Logística`;

  const container = document.createElement('div');
  container.className = 'rights-container';

  const rights = [
    {
      title: 'Produto Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
    },
    {
      title: 'Quantidade Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`
    },
    {
      title: 'Condição Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
    },
    {
      title: 'Lugar Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
    },
    {
      title: 'Tempo Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    }
  ];

  rights.forEach(right => {
    const item = document.createElement('div');
    item.className = 'right-item';
    item.innerHTML = `
      <div class="right-item-icon">${right.icon}</div>
      <h3>${right.title}</h3>
    `;
    container.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(container);
  return section;
}

function renderQuoteSection() {
    const section = document.createElement('section');
    section.className = 'quote-section';
    
    section.innerHTML = `
        <div class="quote-card">
            <span class="quote-mark">“</span>
            <blockquote cite="https://www.goodreads.com/quotes/26083-you-will-not-find-it-difficult-to-prove-that">
                Você não terá dificuldade para provar que batalhas, campanhas e até guerras foram ganhas ou perdidas principalmente devido à logística.
            </blockquote>
            <cite>General Dwight D. Eisenhower (1890-1969)</cite>
        </div>
    `;
    
    return section;
}

export function renderInicioPage(navigateTo) {
  const pageContainer = document.createElement('div');

  const section = document.createElement('section');
  section.id = 'inicio';
  applyStyles(section, { ...styles.section, minHeight: 'calc(100vh - 80px)', position: 'relative', overflow: 'hidden' });

  const blob1 = document.createElement('div');
  blob1.className = 'background-blob';
  applyStyles(blob1, {
      top: '10%',
      left: '10%',
      width: '300px',
      height: '300px',
      backgroundColor: 'hsla(47, 100%, 50%, 0.15)',
  });

  const blob2 = document.createElement('div');
  blob2.className = 'background-blob';
  applyStyles(blob2, {
      bottom: '15%',
      right: '5%',
      width: '400px',
      height: '400px',
      backgroundColor: 'hsla(220, 50%, 80%, 0.1)',
  });

  const title = document.createElement('h1');
  applyStyles(title, styles.mainTitle);
  title.innerHTML = `<span>Descomplica </span><span style="color: ${styles.highlight.color};">Logística</span>`;

  const slogan = document.createElement('h2');
  applyStyles(slogan, styles.slogan);
  slogan.innerHTML = `
    <span class="slogan-text">Conectando rotas, descomplicando processos.</span>
    <div class="slogan-animation-bg">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    </div>
  `;

  const buttonContainer = document.createElement('div');
  buttonContainer.style.margin = '0 0 1.5rem 0';
  buttonContainer.append(
    CtaButton('Conteúdos', () => navigateTo('conteudos')),
    CtaButton('Perguntas frequentes', () => navigateTo('quem-somos'))
  );

  const intro = document.createElement('p');
  applyStyles(intro, styles.intro);
  intro.textContent = 'O Descomplica Logística é uma plataforma educativa que ensina conceitos de logística de forma simples, didática e visual, utilizando textos, vídeos e imagens para tornar o aprendizado mais acessível.';

  section.append(blob1, blob2, title, slogan, buttonContainer, intro);
  
  pageContainer.appendChild(section);
  pageContainer.appendChild(renderFundamentalsSection());
  pageContainer.appendChild(renderLogisticsRightsSection());
  pageContainer.appendChild(renderQuoteSection());

  return pageContainer;
}
