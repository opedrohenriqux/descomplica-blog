






import { styles, applyStyles, CtaButton } from '../utils.tsx';
import { renderMemoryGame } from './games/MemoryGame.tsx';
import { renderLogisticaRun } from './games/LogisticaRun.tsx';
import { renderWordSearchGame } from './games/WordSearchGame.tsx';
import { renderStockMethodGame } from './games/StockMethodGame.tsx';
import { renderKanbanSimulator } from './games/KanbanSimulator.tsx';
import { renderJitManager } from './games/JitManager.tsx';
import { renderHangmanGame } from './games/HangmanGame.tsx';

// Lista de Jogos Disponíveis
const gamesList = [
    {
        id: 'memory-game',
        title: 'Memória Logística',
        description: 'Teste sua memória e conhecimento! Encontre os pares de conceitos logísticos (como Kanban, 5S e Supply Chain) o mais rápido que puder.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="35" height="35" rx="5" fill="#fec700"/><rect x="55" y="10" width="35" height="35" rx="5" fill="#333" fill-opacity="0.1"/><rect x="10" y="55" width="35" height="35" rx="5" fill="#333" fill-opacity="0.1"/><rect x="55" y="55" width="35" height="35" rx="5" fill="#fec700"/><text x="27" y="35" font-family="Arial" font-weight="bold" font-size="20" fill="#333">?</text><text x="72" y="80" font-family="Arial" font-weight="bold" font-size="20" fill="#333">?</text></svg>`
    },
    {
        id: 'kanban-simulator',
        title: 'Simulador Kanban',
        description: 'Seja o gerente! Controle o fluxo de tarefas do armazém, respeite os limites de WIP (Trabalho em Progresso) e não deixe o gargalo parar a operação.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="25" height="80" rx="2" fill="#333" fill-opacity="0.1"/><rect x="38" y="10" width="25" height="80" rx="2" fill="#333" fill-opacity="0.1"/><rect x="66" y="10" width="25" height="80" rx="2" fill="#333" fill-opacity="0.1"/><rect x="15" y="20" width="15" height="15" fill="#ff6b6b"/><rect x="43" y="30" width="15" height="15" fill="#fec700"/><rect x="43" y="50" width="15" height="15" fill="#fec700"/><rect x="71" y="20" width="15" height="15" fill="#1dd1a1"/></svg>`
    },
    {
        id: 'jit-manager',
        title: 'Gerente Just in Time',
        description: 'Evite desperdícios! Analise o estoque e o tempo de produção para iniciar a fabricação no momento exato. Nem antes (custo), nem depois (multa).',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="#333" stroke-width="4" fill="none"/><line x1="50" y1="50" x2="50" y2="20" stroke="#fec700" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="50" x2="70" y2="50" stroke="#333" stroke-width="4" stroke-linecap="round"/><text x="50" y="80" font-family="Arial" font-weight="bold" font-size="12" fill="#333" text-anchor="middle">JIT</text></svg>`
    },
    {
        id: 'logistica-run',
        title: 'Logística Run 2D',
        description: 'Assuma o volante! Corra com o caminhão de entrega, desvie de cones e buracos e colete caixas para garantir a satisfação do cliente.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100" fill="#87CEEB"/><rect x="0" y="70" width="100" height="30" fill="#4CAF50"/><rect x="20" y="50" width="40" height="25" fill="#fec700"/><rect x="60" y="55" width="15" height="20" fill="#fec700"/><circle cx="30" cy="75" r="5" fill="#333"/><circle cx="70" cy="75" r="5" fill="#333"/><rect x="85" y="60" width="10" height="10" fill="#8d6e63"/></svg>`
    },
    {
        id: 'word-search',
        title: 'Caça-Palavras',
        description: 'Encontre os termos logísticos escondidos no quadro! Treine sua percepção visual procurando palavras como Kanban, Frete e Estoque.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="8" fill="#fff" stroke="#333" stroke-width="2"/><text x="25" y="35" font-family="monospace" font-weight="bold" font-size="20" fill="#333">L</text><text x="50" y="35" font-family="monospace" font-weight="bold" font-size="20" fill="#333">O</text><text x="75" y="35" font-family="monospace" font-weight="bold" font-size="20" fill="#333">G</text><text x="25" y="60" font-family="monospace" font-weight="bold" font-size="20" fill="#333">A</text><text x="50" y="60" font-family="monospace" font-weight="bold" font-size="20" fill="#fec700">X</text><text x="75" y="60" font-family="monospace" font-weight="bold" font-size="20" fill="#333">B</text><line x1="20" y1="40" x2="80" y2="40" stroke="#fec700" stroke-width="3" opacity="0.5"/></svg>`
    },
    {
        id: 'stock-method',
        title: 'Mestre do Estoque',
        description: 'FIFO, LIFO ou FEFO? Analise diferentes produtos e situações e decida qual é a melhor estratégia de gestão de estoque para cada caso.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 80V30l30-15 30 15v50" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M20 30l30 15 30-15" stroke="#333" stroke-width="4"/><path d="M50 80V45" stroke="#333" stroke-width="4"/><rect x="30" y="55" width="15" height="15" fill="#fec700"/><rect x="30" y="35" width="15" height="15" fill="#333" fill-opacity="0.1"/><path d="M70 70l-10-10m0 10l10-10" stroke="#d9534f" stroke-width="3"/></svg>`
    },
    {
        id: 'hangman-game',
        title: 'Forca Logística',
        description: 'Descubra o termo logístico oculto antes que o desenho se complete! Use as dicas conceituais para ajudar a desvendar a palavra.',
        thumbnail: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="20" y1="80" x2="80" y2="80" stroke="#333" stroke-width="4"/><line x1="35" y1="80" x2="35" y2="20" stroke="#333" stroke-width="4"/><line x1="35" y1="20" x2="65" y2="20" stroke="#333" stroke-width="4"/><line x1="65" y1="20" x2="65" y2="35" stroke="#333" stroke-width="4"/><circle cx="65" cy="42" r="7" stroke="#fec700" stroke-width="3"/><line x1="65" y1="49" x2="65" y2="65" stroke="#fec700" stroke-width="3"/><line x1="65" y1="55" x2="55" y2="62" stroke="#fec700" stroke-width="3"/></svg>`
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
            case 'word-search':
                gameContent = renderWordSearchGame(transitionTo, setSelectedGame);
                break;
            case 'stock-method':
                gameContent = renderStockMethodGame(transitionTo, setSelectedGame);
                break;
            case 'kanban-simulator':
                gameContent = renderKanbanSimulator(transitionTo, setSelectedGame);
                break;
            case 'jit-manager':
                gameContent = renderJitManager(transitionTo, setSelectedGame);
                break;
            case 'hangman-game':
                gameContent = renderHangmanGame(transitionTo, setSelectedGame);
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
