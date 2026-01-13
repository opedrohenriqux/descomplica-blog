
import { MoonIcon, SunIcon, AccessibilityIcon, applyStyles } from './utils.tsx';
import { renderInicioPage } from './pages/Inicio.tsx';
import { renderConteudoPage } from './pages/Conteudos.tsx';
import { renderGamesPage } from './pages/Jogos.tsx';
import { renderQuemSomosPage } from './pages/QuemSomos.tsx';

const root = document.getElementById('root');
let currentPage = 'inicio';
let selectedTopic = null;
let selectedGame = null; 
let currentTheme = 'light';
let isTransitioning = false;
let isMenuOpen = false;

function toggleTheme() {
  const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  currentTheme = newTheme;
  render();
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.body.dataset.theme = theme;
  currentTheme = theme;
}

// Accessibility Logic
const accessState = {
    grayscale: false,
    highContrast: false,
    largeText: false,
    readableFont: false,
    highlightLinks: false,
    readingMode: false // Nova funcionalidade de leitura
};

let speechInstance = null;

function stopSpeaking() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}

function speakContent() {
    if (!window.speechSynthesis) return;
    
    stopSpeaking();
    
    // Coleta textos significativos da página mantendo a ordem
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, li, blockquote');
    let fullText = "";
    
    elements.forEach(el => {
        // Ignora elementos dentro do cabeçalho ou menu de acessibilidade para focar no conteúdo
        if (!el.closest('header') && !el.closest('.access-panel')) {
            fullText += el.textContent + ". ";
        }
    });

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    
    utterance.onend = () => {
        accessState.readingMode = false;
        updateAccessMenuState();
    };

    window.speechSynthesis.speak(utterance);
}

function initAccessibility() {
    const saved = localStorage.getItem('accessibility');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Garantimos que readingMode comece sempre falso para não assustar o usuário
        parsed.readingMode = false;
        Object.assign(accessState, parsed);
        applyAccessibility();
    }
}

function applyAccessibility() {
    const el = document.documentElement;
    
    if (accessState.grayscale) el.classList.add('access-grayscale');
    else el.classList.remove('access-grayscale');

    if (accessState.highContrast) el.classList.add('access-high-contrast');
    else el.classList.remove('access-high-contrast');

    if (accessState.largeText) el.classList.add('access-large-text');
    else el.classList.remove('access-large-text');

    if (accessState.readableFont) el.classList.add('access-readable-font');
    else el.classList.remove('access-readable-font');

    if (accessState.highlightLinks) el.classList.add('access-highlight-links');
    else el.classList.remove('access-highlight-links');

    if (accessState.readingMode) {
        speakContent();
    } else {
        stopSpeaking();
    }

    localStorage.setItem('accessibility', JSON.stringify(accessState));
    updateAccessMenuState();
}

function updateAccessMenuState() {
    const panel = document.querySelector('.access-panel');
    if (!panel) return;

    const buttons = panel.querySelectorAll('.access-option');
    buttons.forEach(btn => {
        const element = btn as HTMLElement;
        const type = element.dataset.type;
        if (type && accessState[type]) element.classList.add('active');
        else element.classList.remove('active');
    });
}

function toggleAccessOption(type) {
    if (type === 'reset') {
        Object.keys(accessState).forEach(key => accessState[key] = false);
        stopSpeaking();
    } else {
        accessState[type] = !accessState[type];
    }
    applyAccessibility();
}

function renderAccessibilityMenu() {
    const btn = document.createElement('button');
    btn.id = 'accessibility-btn';
    btn.innerHTML = AccessibilityIcon;
    btn.setAttribute('aria-label', 'Abrir Menu de Acessibilidade');
    btn.title = 'Acessibilidade';

    const panel = document.createElement('div');
    panel.className = 'access-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Opções de Acessibilidade');
    panel.innerHTML = `
        <div class="access-option" data-type="readingMode" role="button" aria-pressed="${accessState.readingMode}">🔊 Ouvir Conteúdo</div>
        <div class="access-option" data-type="largeText" role="button" aria-pressed="${accessState.largeText}">🔠 Aumentar Texto</div>
        <div class="access-option" data-type="grayscale" role="button" aria-pressed="${accessState.grayscale}">👁️ Escala de Cinza</div>
        <div class="access-option" data-type="highContrast" role="button" aria-pressed="${accessState.highContrast}">🌗 Alto Contraste</div>
        <div class="access-option" data-type="readableFont" role="button" aria-pressed="${accessState.readableFont}">📖 Fonte Legível</div>
        <div class="access-option" data-type="highlightLinks" role="button" aria-pressed="${accessState.highlightLinks}">🔗 Destacar Links</div>
        <div class="access-option" data-type="reset" role="button">❌ Reiniciar</div>
    `;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('visible');
        updateAccessMenuState();
    });

    panel.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = (e.target as HTMLElement).closest('.access-option') as HTMLElement;
        if (target && target.dataset.type) {
            toggleAccessOption(target.dataset.type);
        }
    });

    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target as Node) && e.target !== btn) {
            panel.classList.remove('visible');
        }
    });

    return { btn, panel };
}

function transitionTo(updateState) {
    if (isTransitioning) return;

    const main = document.querySelector('main');
    stopSpeaking(); // Para a leitura ao mudar de página

    if (main) {
        isTransitioning = true;
        main.classList.remove('page-fade-in'); 
        main.classList.add('page-fade-out');

        setTimeout(() => {
            updateState();
            window.scrollTo({ top: 0, behavior: 'instant' });
            render();
        }, 400); 
    } else {
        updateState();
        render();
    }
}

function renderFooter() {
    const footer = document.createElement('footer');
    footer.id = 'main-footer';
    applyStyles(footer, {
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'var(--footer-bg)',
        borderTop: '1px solid var(--footer-border)',
        color: 'var(--text-color-light)',
        marginTop: 'auto'
    });
    footer.innerHTML = `<p>© ${new Date().getFullYear()} Descomplica Logística. Todos os direitos reservados.</p>`;
    return footer;
}

function renderBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top-btn';
    button.setAttribute('aria-label', 'Voltar ao topo da página');
    button.title = 'Voltar ao topo';
    button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    return button;
}

function navigateTo(page) {
    if (currentPage === page && !selectedTopic && !selectedGame) {
        isMenuOpen = false; 
        render(); 
        return;
    }
    
    isMenuOpen = false;
    
    transitionTo(() => {
        currentPage = page;
        selectedTopic = null;
        selectedGame = null;
    });
}

function renderHeader() {
  const header = document.createElement('header');
  header.id = 'main-header';
  applyStyles(header, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'var(--header-bg)',
    backdropFilter: 'blur(10px)',
    zIndex: '1000',
    borderBottom: '1px solid var(--footer-border)',
    transition: 'transform 0.3s ease-in-out',
  });

  const logo = document.createElement('a');
  logo.href = '#';
  logo.textContent = 'Descomplica Logística';
  logo.setAttribute('aria-label', 'Descomplica Logística - Ir para a página inicial');
  applyStyles(logo, {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--text-color)',
    textDecoration: 'none',
    zIndex: '1003',
    position: 'relative',
    letterSpacing: '-1px'
  });
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('inicio');
  });

  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';

  const nav = document.createElement('nav');
  nav.className = `nav-links ${isMenuOpen ? 'open' : ''}`;
  nav.setAttribute('aria-label', 'Navegação principal');

  const navLinks = [
    { text: 'Início', page: 'inicio' },
    { text: 'Conteúdos', page: 'conteudos' },
    { text: 'Jogos', page: 'jogos' },
    { text: 'Quem Somos', page: 'quem-somos' },
  ];

  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = `#${link.page}`;
    a.textContent = link.text;
    applyStyles(a, {
      color: 'var(--text-color-light)',
      textDecoration: 'none',
      fontWeight: '600',
      padding: '0.5rem 0.8rem',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    });
    if (link.page === currentPage) {
      a.style.color = 'var(--text-color)';
      a.style.backgroundColor = 'var(--button-bg)';
      a.setAttribute('aria-current', 'page');
    }
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.page);
    });
    nav.appendChild(a);
  });

  const themeToggleButton = document.createElement('button');
  themeToggleButton.className = 'theme-toggle-button';
  themeToggleButton.innerHTML = currentTheme === 'light' ? MoonIcon : SunIcon;
  themeToggleButton.setAttribute('aria-label', `Mudar para modo ${currentTheme === 'light' ? 'escuro' : 'claro'}`);
  themeToggleButton.addEventListener('click', toggleTheme);

  const hamburger = document.createElement('button');
  hamburger.className = `hamburger-btn ${isMenuOpen ? 'open' : ''}`;
  hamburger.setAttribute('aria-label', isMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação');
  hamburger.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  `;
  hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    render();
  });
  
  navContainer.append(nav, themeToggleButton, hamburger);
  header.append(logo, navContainer);
  
  return header;
}


function render() {
  if (!root) return;
  root.innerHTML = '';

  const header = renderHeader();
  const main = document.createElement('main');
  main.setAttribute('role', 'main');
  const footer = renderFooter();
  const backToTopButton = renderBackToTopButton();
  
  const { btn: accessBtn, panel: accessPanel } = renderAccessibilityMenu();

  const setSelectedTopic = (topic) => {
    selectedTopic = topic;
  };

  const setSelectedGame = (game) => {
    selectedGame = game;
  };

  let pageContent;
  switch (currentPage) {
    case 'inicio':
      pageContent = renderInicioPage(navigateTo);
      break;
    case 'conteudos':
      pageContent = renderConteudoPage(selectedTopic, transitionTo, setSelectedTopic);
      break;
    case 'jogos':
      pageContent = renderGamesPage(selectedGame, transitionTo, setSelectedGame);
      break;
    case 'quem-somos':
      pageContent = renderQuemSomosPage();
      break;
    default:
      pageContent = renderInicioPage(navigateTo);
  }

  main.appendChild(pageContent);
  root.append(header, main, footer, backToTopButton, accessBtn, accessPanel);

  setTimeout(() => {
    main.classList.add('page-fade-in');
    isTransitioning = false;
  }, 50);
}

function init() {
    initTheme();
    initAccessibility();
    render();

    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        const backToTopButton = document.getElementById('back-to-top-btn');
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                header.style.transform = 'translateY(-100%)';
            } else if (currentScrollY < lastScrollY) {
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY < 0 ? 0 : currentScrollY;
        }
        
        if (backToTopButton) {
            if (currentScrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    });
}

init();
