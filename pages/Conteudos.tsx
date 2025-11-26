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

export function renderConteudoPage(selectedTopic, transitionTo, setSelectedTopic) {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });
    
    if (selectedTopic) {
        let topicContent;
        switch (selectedTopic.id) {
            case 'logistica-integrada':
                topicContent = renderLogisticaIntegradaPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'just-in-time':
                topicContent = renderJustInTimePage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'kanban':
                topicContent = renderKanbanPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'kaizen':
                topicContent = renderKaizenPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case '5s':
                topicContent = render5SPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'cadeia-de-suprimentos':
                topicContent = renderSupplyChainPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'compras':
                topicContent = renderComprasPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'recebimento-de-materiais':
                topicContent = renderRecebimentoPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            case 'estocagem':
                topicContent = renderEstocagemPage(transitionTo, selectedTopic, setSelectedTopic);
                break;
            default:
                const title = document.createElement('h1');
                title.textContent = selectedTopic.title;
                const content = document.createElement('p');
                content.textContent = selectedTopic.content;
                topicContent = document.createElement('div');
                topicContent.append(title, content);
        }
        section.appendChild(topicContent);

    } else {
        const title = document.createElement('h2');
        applyStyles(title, styles.sectionTitle);
        title.textContent = 'Conteúdos Educacionais';
        title.style.textAlign = 'center';

        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        applyStyles(searchContainer, {
            margin: '2rem 0',
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
        cardGrid.className = 'card-grid';
        applyStyles(cardGrid, {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1200px',
            marginTop: '2rem',
        });

        const createCard = (item) => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.setAttribute('data-tooltip', `Clique para saber mais sobre ${item.title}`);
            applyStyles(card, {
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: `0 4px 12px var(--card-shadow)`,
            });
            card.innerHTML = `
                <h3 style="margin-top:0; color:var(--primary-color);">${item.title}</h3>
                <p style="color:var(--text-color-light);">${item.intro}</p>
            `;
            card.addEventListener('click', () => {
              transitionTo(() => {
                setSelectedTopic(item);
              });
            });
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = `0 10px 20px var(--card-shadow-hover)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = `0 4px 12px var(--card-shadow)`;
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
        section.append(title, searchContainer, cardGrid);
    }
    
    return section;
}