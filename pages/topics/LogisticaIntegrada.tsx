


import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation, createCommentSection } from '../../utils.tsx';

export function renderLogisticaIntegradaPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'logistica-integrada-page';
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      textAlign: 'left',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem',
      margin: '0 auto'
    });

    // --- GLOSSARY LOGIC & STYLES ---
    const glossaryStyles = document.createElement('style');
    glossaryStyles.textContent = `
        .glossary-term {
            color: var(--primary-color);
            border-bottom: 1px dashed var(--primary-color);
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            position: relative;
        }
        .glossary-term:hover {
            background-color: rgba(254, 199, 0, 0.1);
            color: var(--text-color);
        }
        .glossary-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.6);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(3px);
        }
        .glossary-overlay.open {
            opacity: 1;
            pointer-events: all;
        }
        .glossary-modal {
            background-color: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border: 1px solid var(--primary-color);
            transform: translateY(20px);
            transition: transform 0.3s ease;
            text-align: center;
        }
        .glossary-overlay.open .glossary-modal {
            transform: translateY(0);
        }
        .glossary-title {
            color: var(--primary-color);
            margin-top: 0;
            font-size: 1.4rem;
            margin-bottom: 1rem;
        }
        .glossary-text {
            color: var(--text-color);
            line-height: 1.6;
            font-size: 1rem;
        }
        .glossary-close {
            margin-top: 1.5rem;
            background: var(--button-bg);
            border: 1px solid var(--card-border);
            padding: 0.5rem 1.5rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            color: var(--text-color);
            transition: background 0.2s;
        }
        .glossary-close:hover {
            background: var(--button-bg-hover);
        }
    `;
    document.head.appendChild(glossaryStyles);

    const glossaryDefinitions = {
        erp: {
            title: "Sistema ERP",
            text: "Sigla para 'Enterprise Resource Planning' (Planejamento dos Recursos da Empresa). É um software que integra todos os dados da empresa (vendas, estoque, financeiro, RH) em um único lugar, garantindo que a informação seja a mesma para todos os setores."
        },
        ecommerce: {
            title: "E-commerce",
            text: "Comércio Eletrônico. É a compra e venda de produtos ou serviços realizada através da internet. Na logística, exige processos ágeis de separação e entrega fracionada."
        },
        log40: {
            title: "Logística 4.0",
            text: "A evolução da logística através da tecnologia digital. Envolve o uso de dados, conectividade e máquinas inteligentes para tornar a operação mais rápida, barata e precisa."
        },
        iot: {
            title: "IoT (Internet das Coisas)",
            text: "Objetos físicos conectados à internet. Na logística, podem ser sensores em caminhões, prateleiras inteligentes ou etiquetas que avisam onde o produto está em tempo real."
        },
        bigdata: {
            title: "Big Data",
            text: "Análise de grandes volumes de dados. Permite que a empresa descubra padrões, preveja tendências de vendas e tome decisões mais inteligentes baseadas em números."
        },
        automacao: {
            title: "Automações",
            text: "Uso de máquinas, robôs ou softwares para realizar tarefas repetitivas automaticamente, sem necessidade de intervenção humana constante (ex: robôs que separam pedidos)."
        },
        ia: {
            title: "Inteligência Artificial (IA)",
            text: "Capacidade de sistemas computacionais de aprender e tomar decisões. Na logística, a IA ajuda a prever demandas futuras, calcular as rotas de entrega mais rápidas e gerenciar estoques de forma autônoma."
        }
    };

    function showGlossary(termKey) {
        const def = glossaryDefinitions[termKey];
        if (!def) return;

        const overlay = document.createElement('div');
        overlay.className = 'glossary-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'glossary-modal';
        
        modal.innerHTML = `
            <h3 class="glossary-title">${def.title}</h3>
            <p class="glossary-text">${def.text}</p>
            <button class="glossary-close">Entendi</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => overlay.classList.add('open'));

        // Close logic
        const close = () => {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 300);
        };

        modal.querySelector('.glossary-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
    }

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { setSelectedTopic(null); });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '2rem',
    });
    title.textContent = 'Logística Integrada';

    // Helper para estilo padrão de título
    const applyH3Style = (element) => {
        applyStyles(element, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--primary-color)',
            width: '100%' // Garante que a linha vá até o final
        });
    };

    const tradTitle = document.createElement('h3');
    tradTitle.textContent = 'Logística tradicional';
    applyH3Style(tradTitle);

    const tradIntro = document.createElement('p');
    tradIntro.textContent = 'Fala, pessoal! Você sabe o que é Logística? Aposto que você pensou na definição de Logística como entrega de "algo". E não está errado, bom... De certa maneira! Sabia que existe um processo muito legal e bacana por trás de cada produto que compramos e recebemos? É o que hoje chamamos de Logística Integrada e veremos isso mais adiante, agora vamos falar sobre a Logística tradicional quando o processo se resumia apenas a transporte e movimentação.';
    
    const columns = document.createElement('div');
    columns.className = 'content-columns';
    const imageCol = document.createElement('div');
    imageCol.className = 'image-col';
    imageCol.innerHTML = `
        <svg width="250" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="70" width="100" height="60" rx="5" fill="#fef4d6" stroke="#fec700" stroke-width="2"/>
            <text x="70" y="105" font-family="Poppins" font-size="14" fill="#333" text-anchor="middle">Transporte</text>
            <rect x="180" y="70" width="100" height="60" rx="5" fill="#fef4d6" stroke="#fec700" stroke-width="2"/>
            <text x="230" y="105" font-family="Poppins" font-size="14" fill="#333" text-anchor="middle">Armazenagem</text>
            <path d="M125 100h50" stroke="#ccc" stroke-width="2" stroke-dasharray="5 5"/>
        </svg>
    `;
    const textCol = document.createElement('div');
    textCol.className = 'text-col';
    textCol.innerHTML = `<p>Antes da Logística Integrada, havia uma visão de que a Logística era apenas transporte e armazenagem, sem nenhuma integração com as outras áreas da empresa. Sabe o que isso gerava? Altos custos, ineficiência e lentidão no atendimento ao cliente.</p>
    <p>Esse isolamento não era nada bom, com a falta de comunicação e organização interna, a empresa não conseguia obter melhores resultados e como não havia coordenação, havia excesso de estoque, rotas mal planejadas, atrasos e retrabalhos, o que aumentava os gastos.</p>`;
    columns.append(imageCol, textCol);

    const intTitle = document.createElement('h3');
    intTitle.textContent = 'Logística Integrada';
    applyH3Style(intTitle);

    const intIntro = document.createElement('div');
    intIntro.innerHTML = `<p>Fala galera, de boa? Como solução para os problemas da Logística tradicional surgiu a Logística Integrada.</p>
    <p>Saca só: Logística Integrada nada mais é do que juntar tudo que acontece dentro de uma empresa, desde pegar o material lá no começo até entregar o produto na mão do cliente. É igual fazer todas as partes do rolê se conectarem, sem bagunça e sem atraso.</p>
    <p>Imagina um time dando um show, cada um sabendo o que tem que fazer e passando a bola na hora certa. É exatamente isso! A empresa ganha tempo, economiza dinheiro e o cliente recebe tudo bem de boa.</p>
    <p>A Logística Integrada surgiu da necessidade das empresas de:</p>`;
    const intTopics = createTopicList([
        'Reduzir custos operacionais (combustível, armazenagem e mão de obra).',
        'Aumentar a eficiência (menos falhas e atrasos).',
        'Responder de forma rápida e flexível às mudanças do mercado.',
        'Integrar informações em tempo real entre setores.',
        'Garantir satisfação do cliente e fidelização.',
        'Se diferenciar em um mercado cada vez mais competitivo',
    ]);

    const timelineData = [
        { id: '1950', label: 'Antes 1950', content: 'A logística era vista apenas como transporte e armazenagem. O foco era movimentar produtos de um ponto a outro.' },
        { id: '1960', label: '1950–1960', content: 'Após a 2ª Guerra Mundial, empresas começaram a aplicar conceitos militares de logística (movimentação estratégica de suprimentos) no setor empresarial.' },
        { id: '1970', label: '1970', content: 'Crises do petróleo aumentaram os custos, e as empresas perceberam a necessidade de reduzir desperdícios e integrar melhor suas operações.' },
        { id: '1980', label: '1980', content: 'Surge o conceito de Supply Chain Management (Gestão da Cadeia de Suprimentos), com visão mais ampla, considerando fornecedores, produção e clientes como partes de um mesmo sistema.' },
        { id: '1990', label: '1990', content: 'Avanço da tecnologia da informação (<span class="glossary-term" data-term="erp">sistemas ERP</span>, código de barras, rastreamento) permite integração em tempo real entre áreas da empresa e parceiros externos.' },
        { id: '2000', label: '2000 em diante', content: 'Globalização, <span class="glossary-term" data-term="ecommerce">e-commerce</span> e <span class="glossary-term" data-term="log40">logística 4.0</span> (uso de <span class="glossary-term" data-term="ia">IA</span>, <span class="glossary-term" data-term="iot">IoT</span>, <span class="glossary-term" data-term="bigdata">Big Data</span>, <span class="glossary-term" data-term="automacao">automações</span>) consolidam a logística integrada como diferencial competitivo.' },
    ];
    const timelineSection = document.createElement('div');
    timelineSection.className = 'timeline-section';
    const timelineNav = document.createElement('div');
    timelineNav.className = 'timeline-nav';
    const timelineContentContainer = document.createElement('div');
    
    timelineData.forEach((item, index) => {
        const navItem = document.createElement('button');
        navItem.className = 'timeline-nav-item';
        navItem.textContent = item.label;
        navItem.dataset.target = `timeline-${item.id}`;
        
        const contentItem = document.createElement('div');
        contentItem.className = 'timeline-content';
        contentItem.id = `timeline-${item.id}`;
        contentItem.innerHTML = item.content; // Changed from textContent to innerHTML

        if (index === 0) {
            navItem.classList.add('active');
            contentItem.classList.add('active');
        }

        timelineNav.appendChild(navItem);
        timelineContentContainer.appendChild(contentItem);
    });

    timelineNav.addEventListener('click', e => {
        const target = e.target;
        if (target instanceof HTMLElement && target.classList.contains('timeline-nav-item')) {
            timelineNav.querySelectorAll('.timeline-nav-item').forEach(btn => btn.classList.remove('active'));
            timelineContentContainer.querySelectorAll('.timeline-content').forEach(content => content.classList.remove('active'));
            
            target.classList.add('active');
            const contentId = target.dataset.target;
            if (contentId) {
                const contentEl = document.getElementById(contentId);
                if (contentEl) {
                    contentEl.classList.add('active');
                }
            }
        }
    });

    // Event listener delegation for glossary terms
    timelineContentContainer.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('glossary-term')) {
            const term = e.target.dataset.term;
            if (term) showGlossary(term);
        }
    });

    timelineSection.append(timelineNav, timelineContentContainer);
    
    // --- NOVA SEÇÃO: Fluxos Logísticos ---
    const fluxosTitle = document.createElement('h3');
    fluxosTitle.textContent = 'Os Dois Fluxos da Logística';
    applyH3Style(fluxosTitle);

    const fluxosContent = document.createElement('div');
    fluxosContent.innerHTML = `
        <p>Para entender a integração, precisamos entender que a logística não movimenta apenas caixas. Ela movimenta informações. Existem dois fluxos principais que correm simultaneamente, mas em direções (geralmente) opostas:</p>
    `;
    
    const fluxosGrid = document.createElement('div');
    applyStyles(fluxosGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem'
    });

    const fluxoFisico = document.createElement('div');
    applyStyles(fluxoFisico, {
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px var(--card-shadow)'
    });
    fluxoFisico.innerHTML = `
        <h4 style="color: var(--primary-color); margin-top: 0;">📦 Fluxo Físico</h4>
        <p style="font-size: 0.95rem;">É o movimento real dos materiais. Começa nos fornecedores, passa pela fábrica, armazéns, transportadoras e termina no cliente final.</p>
        <p style="font-size: 0.95rem;"><strong>Direção:</strong> Origem → Consumidor</p>
    `;

    const fluxoInfo = document.createElement('div');
    applyStyles(fluxoInfo, {
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px var(--card-shadow)'
    });
    fluxoInfo.innerHTML = `
        <h4 style="color: var(--primary-color); margin-top: 0;">📊 Fluxo de Informação</h4>
        <p style="font-size: 0.95rem;">São os dados necessários para o fluxo físico acontecer: pedidos de compra, notas fiscais, rastreamento, inventário, etc. Sem informação precisa, o produto não sai do lugar.</p>
        <p style="font-size: 0.95rem;"><strong>Direção:</strong> Bidirecional (vai e volta)</p>
    `;
    
    fluxosGrid.append(fluxoFisico, fluxoInfo);
    
    // --- NOVA SEÇÃO: Diagrama Visual ---
    const diagramContainer = document.createElement('div');
    applyStyles(diagramContainer, {
        width: '100%',
        margin: '3rem 0',
        textAlign: 'center'
    });
    
    diagramContainer.innerHTML = `
        <h3 style="margin-bottom: 2rem;">O Ciclo da Logística Integrada</h3>
        <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Arrows -->
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="var(--primary-color)" />
                </marker>
            </defs>
            
            <line x1="150" y1="150" x2="250" y2="150" stroke="var(--primary-color)" stroke-width="4" marker-end="url(#arrow)" />
            <line x1="350" y1="150" x2="450" y2="150" stroke="var(--primary-color)" stroke-width="4" marker-end="url(#arrow)" />
            <line x1="550" y1="150" x2="650" y2="150" stroke="var(--primary-color)" stroke-width="4" marker-end="url(#arrow)" />
            
            <!-- Nodes -->
            <g>
                <circle cx="100" cy="150" r="50" fill="var(--card-bg)" stroke="var(--text-color)" stroke-width="2"/>
                <text x="100" y="155" text-anchor="middle" font-weight="bold" fill="var(--text-color)" font-size="12">Fornecedor</text>
            </g>
            
            <g>
                <circle cx="300" cy="150" r="50" fill="var(--card-bg)" stroke="var(--text-color)" stroke-width="2"/>
                <text x="300" y="145" text-anchor="middle" font-weight="bold" fill="var(--text-color)" font-size="12">Indústria</text>
                <text x="300" y="165" text-anchor="middle" fill="var(--text-color-light)" font-size="10">(Produção)</text>
            </g>
            
            <g>
                <circle cx="500" cy="150" r="50" fill="var(--card-bg)" stroke="var(--text-color)" stroke-width="2"/>
                <text x="500" y="145" text-anchor="middle" font-weight="bold" fill="var(--text-color)" font-size="12">Distribuição</text>
                <text x="500" y="165" text-anchor="middle" fill="var(--text-color-light)" font-size="10">(Transporte)</text>
            </g>
            
            <g>
                <circle cx="700" cy="150" r="50" fill="var(--primary-color)" stroke="var(--text-color)" stroke-width="2"/>
                <text x="700" y="155" text-anchor="middle" font-weight="bold" fill="#333" font-size="12">Cliente Final</text>
            </g>
            
            <!-- Information Flow (Dashed lines underneath) -->
            <path d="M 700 210 Q 400 260 100 210" fill="none" stroke="var(--text-color-subtle)" stroke-width="2" stroke-dasharray="5,5" />
            <text x="400" y="240" text-anchor="middle" fill="var(--text-color-light)" font-size="12">Fluxo de Informação (Pedidos, Feedback)</text>
        </svg>
    `;

    // --- NOVA SEÇÃO: Os 4 Pilares ---
    const pilaresTitle = document.createElement('h3');
    pilaresTitle.textContent = 'Os 4 Pilares da Logística Integrada';
    applyH3Style(pilaresTitle);

    const pilaresGrid = document.createElement('div');
    applyStyles(pilaresGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
    });

    const createPilarCard = (icon, title, desc) => {
        const card = document.createElement('div');
        applyStyles(card, {
            backgroundColor: 'var(--timeline-bg)',
            borderRadius: '12px',
            padding: '1.5rem',
            borderLeft: '5px solid var(--primary-color)'
        });
        card.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${icon}</div>
            <h4 style="margin: 0 0 0.5rem 0; color: var(--text-color);">${title}</h4>
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">${desc}</p>
        `;
        return card;
    };

    pilaresGrid.append(
        createPilarCard('🛒', 'Administração de Materiais', 'Envolve tudo que entra na empresa: negociação com fornecedores, compras, transporte de entrada (Inbound) e armazenamento de matéria-prima. O objetivo é garantir que não falte insumo para a produção.'),
        createPilarCard('🏭', 'Movimentação Interna', 'É o controle do fluxo dentro da fábrica ou armazém. Envolve abastecer a linha de produção, controle de estoque em processo e embalagem do produto final.'),
        createPilarCard('🚚', 'Distribuição Física', 'É a logística de saída (Outbound). Envolve o processamento de pedidos, armazenamento de produtos acabados, transporte até o cliente e monitoramento da entrega.'),
        createPilarCard('🔄', 'Logística Reversa', 'O caminho de volta. Cuida do retorno de produtos para troca, devolução, reciclagem ou descarte correto, fechando o ciclo sustentável da cadeia.')
    );


    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'info-cards-container';
    
    const cardImportancia = document.createElement('div');
    cardImportancia.className = 'info-card';
    cardImportancia.innerHTML = '<h3>Importância:</h3>';
    cardImportancia.appendChild(createTopicList([
        'Integração de processos: conecta suprimentos, produção, armazenagem, transporte e distribuição;',
        'Fluxo de informações: uso de sistemas para acompanhar em tempo real pedidos, estoques e entregas;',
        'Redução de custos: elimina desperdícios e atividades duplicadas;',
        'Agilidade e flexibilidade: melhora a capacidade de resposta às mudanças de mercado;',
        'Foco no cliente: garante que o produto certo chegue no lugar certo, na hora certa, com qualidade e menor custo.',
    ]));

    const cardCaracteristicas = document.createElement('div');
    cardCaracteristicas.className = 'info-card';
    cardCaracteristicas.innerHTML = '<h3>Características:</h3>';
     cardCaracteristicas.appendChild(createTopicList([
        'Integração de processos: conecta suprimentos, produção, armazenagem, transporte e distribuição.',
        'Fluxo de informações: uso de sistemas para acompanhar em tempo real pedidos, estoques e entregas.',
        'Redução de custos: elimina desperdícios e atividades duplicadas.',
        'Agilidade e flexibilidade: melhora a capacidade de resposta às mudanças de mercado.',
        'Foco no cliente: garante que o produto certo chegue no lugar certo, na hora certa, com qualidade e menor custo.',
    ]));

    const cardObjetivos = document.createElement('div');
    cardObjetivos.className = 'info-card';
    cardObjetivos.innerHTML = '<h3>Objetivos:</h3>';
     cardObjetivos.appendChild(createTopicList([
        'Redução de custos → eliminar desperdícios, evitar retrabalho e otimizar recursos.',
        'Eficiência operacional → garantir que todos os processos estejam sincronizados e fluindo sem gargalos.',
        'Agilidade e flexibilidade → responder rapidamente a mudanças de demanda ou imprevistos no mercado.',
        'Qualidade no atendimento → entregar o produto certo, no lugar certo, no tempo certo.',
        'Integração da cadeia de suprimentos → conectar fornecedores, produção, armazenagem, transporte e cliente final em um só sistema.',
        'Satisfação e fidelização do cliente → aumentar a competitividade ao oferecer melhor experiência de compra.',
    ]));

    cardsContainer.append(cardObjetivos, cardImportancia, cardCaracteristicas);

    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual era o foco principal da logística tradicional antes do conceito de integração?", a: 0, o: ["Apenas transporte e armazenagem.", "Satisfação total do cliente.", "Gestão completa da cadeia de suprimentos.", "Marketing e vendas."] },
        { q: "O que a Logística Integrada busca unificar?", a: 1, o: ["Apenas o marketing e as vendas.", "Todas as etapas da cadeia de suprimentos.", "Somente a produção e o estoque.", "Apenas o financeiro e o RH."] },
        { q: "Em que década o conceito de Supply Chain Management (SCM) começou a ganhar força?", a: 2, o: ["Década de 1950", "Década de 1970", "Década de 1980", "Década de 2010"] },
        { q: "Qual o resultado final esperado para o cliente com a implementação da Logística Integrada?", a: 2, o: ["Buscar o produto diretamente na fábrica.", "Receber o produto com atraso, mas mais barato.", "Receber o produto certo, no lugar e na hora certa.", "Ter menos opções de produtos disponíveis."] },
        { q: "Um dos principais benefícios da Logística Integrada é:", a: 3, o: ["O aumento do nível de estoque.", "A complexidade na comunicação.", "A maior dependência de um único setor.", "A redução de custos operacionais."] },
        { q: "Que evento histórico impulsionou a necessidade de maior eficiência logística nos anos 1970?", a: 1, o: ["A Segunda Guerra Mundial.", "As crises do petróleo.", "A invenção do código de barras.", "O surgimento do e-commerce."] },
        { q: "A Logística 4.0, que consolida a integração, é marcada pelo uso de qual tecnologia?", a: 0, o: ["Inteligência Artificial (IA) e IoT.", "Máquinas a vapor.", "Telefone e fax.", "Apenas planilhas eletrônicas."] },
        { q: "Qual NÃO é um objetivo da Logística Integrada?", a: 3, o: ["Aumentar a eficiência operacional.", "Responder rapidamente às mudanças de mercado.", "Garantir a satisfação do cliente.", "Manter cada departamento trabalhando de forma isolada."] },
        { q: "A integração do fluxo de informações em tempo real é uma característica-chave da Logística Integrada. Qual tecnologia foi fundamental para isso nos anos 90?", a: 2, o: ["Rádio amador.", "Correio tradicional.", "Sistemas ERP (Enterprise Resource Planning).", "Máquinas de escrever."] },
        { q: "A visão da Logística Integrada considera a empresa como:", a: 1, o: ["Uma coleção de departamentos independentes.", "Um sistema único e conectado.", "Apenas um centro de distribuição.", "Um ponto de venda para o cliente."] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'logistica-quiz';

    quizData.forEach((item, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'quiz-question';
      
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${item.q}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement('ul');
      optionsList.className = 'quiz-options';

      item.o.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${index}`;
        input.value = optionIndex.toString();
        input.required = true;
        
        label.appendChild(input);
        label.append(` ${option}`);
        li.appendChild(label);
        optionsList.appendChild(li);
      });

      questionDiv.appendChild(optionsList);
      quizForm.appendChild(questionDiv);
    });

    const quizButtons = document.createElement('div');
    quizButtons.className = 'quiz-buttons';
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-results';
    const aiTipDiv = document.createElement('div');
    aiTipDiv.className = 'quiz-ai-tip';

    const submitButton = CtaButton('Verificar Respostas', (e) => {}, { margin: '0 0.5rem' });
    const resetButton = CtaButton('Tentar Novamente', () => {}, { display: 'none', margin: '0 0.5rem' });

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Logística Integrada', submitButton, resetButton));
    
    resetButton.addEventListener('click', () => {
        quizForm.reset();
        resultsDiv.textContent = '';
        aiTipDiv.innerHTML = '';
        quizForm.querySelectorAll('.quiz-feedback').forEach(el => el.classList.remove('correct', 'incorrect', 'quiz-feedback'));
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });

    quizButtons.append(submitButton, resetButton);
    quizSection.append(quizTitle, quizForm, resultsDiv, aiTipDiv, quizButtons);

    const commentsSection = createCommentSection('logistica-integrada');
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

    container.append(
        backButton, 
        title, 
        tradTitle,
        tradIntro,
        columns,
        intTitle,
        intIntro,
        intTopics,
        timelineSection,
        fluxosTitle,
        fluxosContent,
        fluxosGrid,
        diagramContainer,
        pilaresTitle,
        pilaresGrid,
        cardsContainer,
        quizSection,
        commentsSection,
        topicNav
    );
    return container;
}
