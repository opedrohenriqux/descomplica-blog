
import { styles, applyStyles, conteudosList } from '../utils.tsx';
import { renderLogisticaIntegradaPage } from './topics/LogisticaIntegrada.tsx';
import { renderJustInTimePage } from './topics/JustInTime.tsx';
import { renderKanbanPage } from './topics/Kanban.tsx';
import { renderKaizenPage } from './topics/Kaizen.tsx';
import { render5SPage } from './topics/5S.tsx';
import { renderSupplyChainPage } from './topics/SupplyChain.tsx';
import { renderComprasPage } from './topics/Compras.tsx';
import { renderRecebimentoPage } from './topics/Recebimento.tsx';
import { renderEstocagemPage } from './topics/Estocagem.tsx';

// Estado local para controlar o modo de exibição (mantido durante a sessão)
let viewMode = 'catalog'; // 'catalog' ou 'landing'

export function renderConteudoPage(selectedTopic, transitionTo, setSelectedTopic) {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });
    
    // Se um tópico específico estiver selecionado (clique vindo do catálogo), mostra apenas ele
    if (selectedTopic) {
        return renderSingleTopic(selectedTopic, transitionTo, setSelectedTopic);
    }

    // --- Cabeçalho da Seção de Conteúdos ---
    const headerContainer = document.createElement('div');
    applyStyles(headerContainer, {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3rem'
    });

    const title = document.createElement('h2');
    applyStyles(title, styles.sectionTitle);
    title.textContent = 'Conteúdos Educacionais';
    title.style.textAlign = 'center';

    // Seletor de Modo de Visualização
    const viewToggle = document.createElement('div');
    applyStyles(viewToggle, {
        display: 'flex',
        backgroundColor: 'var(--timeline-bg)',
        padding: '5px',
        borderRadius: '50px',
        marginTop: '1.5rem',
        border: '1px solid var(--card-border)',
        boxShadow: '0 2px 8px var(--card-shadow)'
    });

    const createToggleBtn = (mode, label, icon) => {
        const btn = document.createElement('button');
        btn.innerHTML = `${icon} ${label}`;
        const isActive = viewMode === mode;
        applyStyles(btn, {
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
            color: isActive ? '#333' : 'var(--text-color-light)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        });
        btn.addEventListener('click', () => {
            if (viewMode !== mode) {
                viewMode = mode;
                transitionTo(() => { setSelectedTopic(null); }); // Recarrega a página no novo modo
            }
        });
        return btn;
    };

    const catalogBtn = createToggleBtn('catalog', 'Catálogo', '📂');
    const landingBtn = createToggleBtn('landing', 'Página Única', '📜');
    viewToggle.append(catalogBtn, landingBtn);

    headerContainer.append(title, viewToggle);
    section.appendChild(headerContainer);

    // --- Renderização condicional baseada no Modo ---
    if (viewMode === 'catalog') {
        renderCatalogView(section, transitionTo, setSelectedTopic);
    } else {
        renderLandingView(section, transitionTo, setSelectedTopic);
    }
    
    return section;
}

function renderCatalogView(section, transitionTo, setSelectedTopic) {
    const searchContainer = document.createElement('div');
    applyStyles(searchContainer, {
        margin: '0 0 2rem 0',
        width: '100%',
        maxWidth: '600px',
    });
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar conteúdo...';
    applyStyles(searchInput, {
        width: '100%',
        padding: '0.8rem 1.2rem',
        fontSize: '1rem',
        borderRadius: '50px',
        border: `1px solid var(--search-border)`,
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
    });
    searchContainer.appendChild(searchInput);
    
    const cardGrid = document.createElement('div');
    applyStyles(cardGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px',
    });

    const createCard = (item) => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        // Estilos básicos mantidos via CSS Global (index.html)
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.intro}</p>
        `;
        card.addEventListener('click', () => {
          transitionTo(() => {
            setSelectedTopic(item);
          });
        });
        return card;
    };

    const renderCards = (filter = '') => {
        cardGrid.innerHTML = '';
        const filteredTopics = conteudosList.filter(topic => 
            topic.title.toLowerCase().includes(filter.toLowerCase()) || 
            topic.intro.toLowerCase().includes(filter.toLowerCase())
        );
        filteredTopics.forEach(item => {
            cardGrid.appendChild(createCard(item));
        });
    };
    
    searchInput.addEventListener('input', (e) => {
        if (e.target instanceof HTMLInputElement) {
            renderCards(e.target.value);
        }
    });

    renderCards();
    section.append(searchContainer, cardGrid);
}

function renderLandingView(section, transitionTo, setSelectedTopic) {
    // Menu de Âncoras para Navegação Rápida
    const anchorNav = document.createElement('div');
    applyStyles(anchorNav, {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '4rem',
        padding: '1rem',
        backgroundColor: 'var(--timeline-bg)',
        borderRadius: '16px',
        border: '1px solid var(--card-border)'
    });

    conteudosList.forEach(topic => {
        const link = document.createElement('a');
        link.href = `#section-${topic.id}`;
        link.textContent = topic.title;
        applyStyles(link, {
            fontSize: '0.85rem',
            padding: '5px 12px',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            textDecoration: 'none',
            color: 'var(--text-color)',
            border: '1px solid var(--card-border)',
            transition: 'all 0.2s'
        });
        link.addEventListener('mouseenter', () => link.style.borderColor = 'var(--primary-color)');
        link.addEventListener('mouseleave', () => link.style.borderColor = 'var(--card-border)');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const el = document.getElementById(`section-${topic.id}`);
            if (el) {
                const headerOffset = 100;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
        anchorNav.appendChild(link);
    });

    const landingContainer = document.createElement('div');
    applyStyles(landingContainer, {
        display: 'flex',
        flexDirection: 'column',
        gap: '8rem', // Grande espaçamento entre os tópicos para parecer uma landing page
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto'
    });

    // Mapeamento de funções de renderização
    const renderFunctions = {
        'logistica-integrada': renderLogisticaIntegradaPage,
        'just-in-time': renderJustInTimePage,
        'kanban': renderKanbanPage,
        'kaizen': renderKaizenPage,
        '5s': render5SPage,
        'cadeia-de-suprimentos': renderSupplyChainPage,
        'compras': renderComprasPage,
        'recebimento-de-materiais': renderRecebimentoPage,
        'estocagem': renderEstocagemPage
    };

    conteudosList.forEach((topic) => {
        const topicWrapper = document.createElement('div');
        topicWrapper.id = `section-${topic.id}`;
        applyStyles(topicWrapper, {
            width: '100%',
            padding: '2rem 0',
            borderBottom: '1px solid var(--footer-border)'
        });

        // Renderiza o tópico chamando sua função específica
        const renderFn = renderFunctions[topic.id];
        if (renderFn) {
            // Passamos funções "vazias" ou ajustadas para evitar que botões de navegação e voltar quebrem a Landing Page
            const content = renderFn(
                () => {}, // transitionTo (desativado para não sair da landing)
                topic,    // selectedTopic
                () => {}  // setSelectedTopic
            );

            // Ajustes Finos: Removemos o botão de voltar e a navegação de tópico em cada seção para não poluir
            const backBtn = content.querySelector('.cta-button');
            if (backBtn && backBtn.textContent.includes('Voltar')) backBtn.remove();
            
            const topicNav = content.querySelector('.topic-navigation');
            if (topicNav) topicNav.remove();

            topicWrapper.appendChild(content);
            landingContainer.appendChild(topicWrapper);
        }
    });

    section.append(anchorNav, landingContainer);
}

function renderSingleTopic(selectedTopic, transitionTo, setSelectedTopic) {
    const renderFunctions = {
        'logistica-integrada': renderLogisticaIntegradaPage,
        'just-in-time': renderJustInTimePage,
        'kanban': renderKanbanPage,
        'kaizen': renderKaizenPage,
        '5s': render5SPage,
        'cadeia-de-suprimentos': renderSupplyChainPage,
        'compras': renderComprasPage,
        'recebimento-de-materiais': renderRecebimentoPage,
        'estocagem': renderEstocagemPage
    };

    const renderFn = renderFunctions[selectedTopic.id];
    if (renderFn) {
        return renderFn(transitionTo, selectedTopic, setSelectedTopic);
    }

    // Fallback caso não encontre a função
    const container = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = selectedTopic.title;
    const content = document.createElement('p');
    content.textContent = selectedTopic.content;
    container.append(title, content);
    return container;
}
