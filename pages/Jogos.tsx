
import { styles, applyStyles, CtaButton } from '../utils.tsx';
import { renderMemoryGame } from './games/MemoryGame.tsx';
import { renderLogisticaRun } from './games/LogisticaRun.tsx';

// Lista de Jogos Disponíveis
const gamesList = [
    {
        id: 'memory-game',
        title: 'Memória Logística',
        description: 'Teste sua memória e conhecimento! Encontre os pares de conceitos logísticos (como Kanban, 5S e Supply Chain) o mais rápido que puder.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="35" height="35" rx="5" fill="#fec700"/><rect x="55" y="10" width="35" height="35" rx="5" fill="#333" fill-opacity="0.1"/><rect x="10" y="55" width="35" height="35" rx="5" fill="#333" fill-opacity="0.1"/><rect x="55" y="55" width="35" height="35" rx="5" fill="#fec700"/><text x="27" y="35" font-family="Arial" font-weight="bold" font-size="20" fill="#333">?</text><text x="72" y="80" font-family="Arial" font-weight="bold" font-size="20" fill="#333">?</text></svg>`
    },
    {
        id: 'logistica-run',
        title: 'Logística Run 2D',
        description: 'Assuma o volante! Corra com o caminhão de entrega, desvie de cones e buracos e colete caixas para garantir a satisfação do cliente.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100" fill="#87CEEB"/><rect x="0" y="70" width="100" height="30" fill="#4CAF50"/><rect x="20" y="50" width="40" height="25" fill="#fec700"/><rect x="60" y="55" width="15" height="20" fill="#fec700"/><circle cx="30" cy="75" r="5" fill="#333"/><circle cx="70" cy="75" r="5" fill="#333"/><rect x="85" y="60" width="10" height="10" fill="#8d6e63"/></svg>`
    }
];

export function renderGamesPage(selectedGame, transitionTo, setSelectedGame) {
    const section = document.createElement('section');
    
    // Se um jogo estiver selecionado, renderiza o jogo específico
    if (selectedGame) {
        let gameContent;
        switch (selectedGame.id) {
            case 'memory-game':
                gameContent = renderMemoryGame(transitionTo, setSelectedGame);
                break;
            case 'logistica-run':
                gameContent = renderLogisticaRun(transitionTo, setSelectedGame);
                break;
            default:
                // Fallback caso o ID não exista
                transitionTo(() => setSelectedGame(null));
                return section;
        }
        section.appendChild(gameContent);
        return section;
    }

    // Caso contrário, renderiza o Catálogo de Jogos
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, textAlign: 'center' });
    title.textContent = 'Aprenda Jogando';

    const intro = document.createElement('p');
    applyStyles(intro, { ...styles.intro, marginBottom: '3rem' });
    intro.textContent = 'Reforce seu aprendizado de forma divertida! Escolha um dos jogos abaixo para praticar conceitos de logística e desafiar suas habilidades.';

    const gamesGrid = document.createElement('div');
    applyStyles(gamesGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px',
    });

    gamesList.forEach(game => {
        const card = document.createElement('div');
        applyStyles(card, {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%' // Garante altura igual
        });

        // Hover Effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px var(--card-shadow-hover)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px var(--card-shadow)';
        });

        // Thumbnail
        const thumbContainer = document.createElement('div');
        applyStyles(thumbContainer, {
            width: '100px',
            height: '100px',
            marginBottom: '1.5rem',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--primary-color)',
            backgroundColor: 'var(--timeline-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        thumbContainer.innerHTML = game.thumbnail;
        
        // Content
        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.title;
        applyStyles(gameTitle, { color: 'var(--primary-color)', margin: '0 0 1rem 0', fontSize: '1.5rem' });

        const gameDesc = document.createElement('p');
        gameDesc.textContent = game.description;
        applyStyles(gameDesc, { color: 'var(--text-color)', marginBottom: '2rem', flex: '1' }); // Flex 1 empurra botão p/ baixo

        const playBtn = CtaButton('Jogar Agora', () => {
            transitionTo(() => {
                setSelectedGame(game);
            });
        });

        card.append(thumbContainer, gameTitle, gameDesc, playBtn);
        gamesGrid.appendChild(card);
    });

    section.append(title, intro, gamesGrid);

    return section;
}
