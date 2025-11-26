import { getAiResponse, MoonIcon, SunIcon, applyStyles } from './utils.tsx';
import { renderInicioPage } from './pages/Inicio.tsx';
import { renderConteudoPage } from './pages/Conteudos.tsx';
import { renderGamesPage } from './pages/Jogos.tsx';
import { renderQuemSomosPage } from './pages/QuemSomos.tsx';

const root = document.getElementById('root');
let currentPage = 'inicio';
let selectedTopic = null;
let currentTheme = 'light';
let isTransitioning = false;
let isChatOpen = false;
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

function transitionTo(updateState) {
    if (isTransitioning) return;

    const main = document.querySelector('main');

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

function renderChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget-container';
    
    const fab = document.createElement('button');
    fab.id = 'ai-chat-fab';
    fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    fab.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        const widget = document.getElementById('ai-chat-widget');
        if (widget) {
            if (isChatOpen) {
                widget.classList.add('open');
            } else {
                widget.classList.remove('open');
            }
        }
    });

    const widgetWindow = document.createElement('div');
    widgetWindow.id = 'ai-chat-widget';
    widgetWindow.innerHTML = `
        <div class="chat-header">
            <h3>Assistente Logística</h3>
            <button class="chat-close-btn">×</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="chat-message ai">Olá! Sou o assistente virtual do Descomplica Logística. Como posso te ajudar hoje?</div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Digite sua pergunta..." />
            <button id="chat-send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    `;

    const closeBtn = widgetWindow.querySelector('.chat-close-btn');
    closeBtn.addEventListener('click', () => {
        isChatOpen = false;
        widgetWindow.classList.remove('open');
    });

    const sendBtn = widgetWindow.querySelector('#chat-send-btn');
    const input = widgetWindow.querySelector('#chat-input');
    const messagesContainer = widgetWindow.querySelector('#chat-messages');

    const sendMessage = async () => {
        if (!(input instanceof HTMLInputElement) || !messagesContainer) return;
        const text = input.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = text;
        messagesContainer.appendChild(userMsg);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'chat-message ai';
        loadingMsg.textContent = 'Digitando...';
        messagesContainer.appendChild(loadingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        let context = '';
        if (selectedTopic) {
            context = `O usuário está visualizando a página sobre "${selectedTopic.title}". Conteúdo da página: ${selectedTopic.content || selectedTopic.intro}.`;
        } else {
             context = `O usuário está na página principal. Contexto geral: O Descomplica Logística ensina sobre Logística Integrada, Just in Time, Kanban, Kaizen, 5S, Supply Chain, Compras e Recebimento.`;
        }

        const response = await getAiResponse(text, context);
        
        messagesContainer.removeChild(loadingMsg);
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message ai';
        aiMsg.textContent = response;
        messagesContainer.appendChild(aiMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e instanceof KeyboardEvent && e.key === 'Enter') sendMessage();
    });

    chatWidget.appendChild(fab);
    chatWidget.appendChild(widgetWindow);
    return chatWidget;
}

function renderBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top-btn';
    button.setAttribute('aria-label', 'Voltar ao topo');
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
    if (currentPage === page && !selectedTopic) {
        isMenuOpen = false; 
        render(); 
        return;
    }
    
    isMenuOpen = false;
    
    transitionTo(() => {
        currentPage = page;
        selectedTopic = null;
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
  applyStyles(logo, {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-color)',
    textDecoration: 'none',
    zIndex: '1003',
    position: 'relative'
  });
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('inicio');
  });

  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';

  const nav = document.createElement('nav');
  nav.className = `nav-links ${isMenuOpen ? 'open' : ''}`;

  const navLinks = [
    { text: 'Início', page: 'inicio' },
    { text: 'Conteúdos', page: 'conteudos' },
    { text: 'Jogos', page: 'jogos' },
    { text: 'FAQ', page: 'quem-somos' },
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
  themeToggleButton.setAttribute('aria-label', `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`);
  themeToggleButton.addEventListener('click', toggleTheme);

  const hamburger = document.createElement('button');
  hamburger.className = `hamburger-btn ${isMenuOpen ? 'open' : ''}`;
  hamburger.setAttribute('aria-label', 'Abrir menu');
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
  const footer = renderFooter();
  const chatWidget = renderChatWidget();
  const backToTopButton = renderBackToTopButton();

  const setSelectedTopic = (topic) => {
    selectedTopic = topic;
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
      pageContent = renderGamesPage();
      break;
    case 'quem-somos':
      pageContent = renderQuemSomosPage();
      break;
    default:
      pageContent = renderInicioPage(navigateTo);
  }

  main.appendChild(pageContent);
  root.append(header, main, footer, chatWidget, backToTopButton);

  setTimeout(() => {
    main.classList.add('page-fade-in');
    isTransitioning = false;
  }, 50);
}

function init() {
    initTheme();
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
