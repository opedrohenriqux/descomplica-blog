
import { styles, applyStyles, CtaButton, createTopicList, handleQuizSubmit, createTopicNavigation } from '../../utils.tsx';

export function renderKaizenPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'kaizen-page';
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

    const backButton = CtaButton('← Voltar para a lista', () => {
        transitionTo(() => { setSelectedTopic(null); });
    }, { margin: '0 0 2rem 0' });

    const title = document.createElement('h2');
    applyStyles(title, {
      fontSize: '2.8rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      marginBottom: '1rem',
    });
    title.textContent = 'Kaizen';

    function createSection(titleText, content) {
        const sectionEl = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        sectionEl.appendChild(h3);

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.innerHTML = content;
            sectionEl.appendChild(p);
        } else if (Array.isArray(content)) {
            sectionEl.appendChild(createTopicList(content));
        } else {
            sectionEl.appendChild(content);
        }
        return sectionEl;
    }

    const intro = createSection('Introdução', 'Fala, galera! o Kaizen é uma filosofia japonesa que quer dizer “melhoria contínua” (kai = mudança, zen = melhor). A ideia é simples: todo mundo na empresa fazendo pequenas mudanças o tempo todo, que vão somando e deixando tudo melhor, desde o trabalho, a produtividade, a qualidade e até o clima no lugar.');
    const comoSurgiu = createSection('Como surgiu?', 'Kaizen é uma filosofia japonesa de melhoria contínua, que busca aumentar a produtividade, a qualidade e a eficiência por meio de pequenas mudanças constantes. Surgiu no Japão após a Segunda Guerra Mundial, com a ajuda de especialistas americanos como W. Edwards Deming e Joseph Juran. A ideia principal era reconstruir a indústria do país, focando em processos eficientes e eliminando desperdícios. A Toyota foi pioneira em adotar e popularizar o Kaizen, integrando-o ao seu sistema de produção. Com o tempo, essa filosofia se espalhou pelo mundo e hoje é aplicada em diversas áreas para promover uma cultura de aprendizado e evolução constante.');
    const comoFunciona = createSection('Como funciona?', 'O Kaizen funciona com a colaboração de todos na empresa. A ideia é identificar problemas e sugerir pequenas melhorias no dia a dia, como organizar melhor as ferramentas ou mudar um passo em uma tarefa para ser mais rápido. Em vez de esperar por grandes mudanças, o Kaizen foca em fazer ajustes simples e contínuos que, juntos, geram grandes resultados a longo prazo, tornando o trabalho mais fácil, seguro e eficiente.');
    const importancia = createSection('Importância', 'O Kaizen é importante porque incentiva a empresa a melhorar sempre, eliminando desperdícios e aumentando a eficiência. Isso leva a produtos e serviços de maior qualidade, custos mais baixos e clientes mais satisfeitos. Além disso, valoriza os funcionários, que participam ativamente das melhorias, criando um ambiente de trabalho mais colaborativo e motivador.');
    
    // Diagrama das 7 Etapas do Kaizen (MANTIDO)
    const imageContainer = document.createElement('div');
    imageContainer.className = 'kaizen-main-image';
    imageContainer.style.maxWidth = '100%';
    imageContainer.innerHTML = `
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.2)"/>
                </filter>
            </defs>
            
            <!-- Lines connecting to center -->
            <g stroke="var(--primary-color)" stroke-width="2" opacity="0.5">
                <line x1="400" y1="250" x2="200" y2="100" /> <!-- 1 -->
                <line x1="400" y1="250" x2="400" y2="60" />  <!-- 2 -->
                <line x1="400" y1="250" x2="600" y2="100" /> <!-- 3 -->
                <line x1="400" y1="250" x2="700" y2="250" /> <!-- 4 -->
                <line x1="400" y1="250" x2="600" y2="400" /> <!-- 5 -->
                <line x1="400" y1="250" x2="400" y2="440" /> <!-- 6 -->
                <line x1="400" y1="250" x2="200" y2="400" /> <!-- 7 -->
            </g>

            <!-- Center Circle -->
            <circle cx="400" cy="250" r="100" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="5" filter="url(#shadow)"/>
            <text x="400" y="230" font-family="Poppins" font-size="20" font-weight="700" fill="var(--text-color)" text-anchor="middle">7 ETAPAS</text>
            <text x="400" y="255" font-family="Poppins" font-size="20" font-weight="700" fill="var(--text-color)" text-anchor="middle">DO KAIZEN</text>
            <text x="400" y="295" font-family="Poppins" font-size="32" font-weight="700" fill="var(--primary-color)" text-anchor="middle">改善</text>

            <!-- Node 1: Top Left -->
            <g transform="translate(110, 70)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Identificar</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">oportunidades</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">1</text>
            </g>

            <!-- Node 2: Top -->
            <g transform="translate(310, 30)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Mapear o</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">processo atual</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">2</text>
            </g>

            <!-- Node 3: Top Right -->
            <g transform="translate(510, 70)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Desenvolver</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">uma solução</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">3</text>
            </g>

            <!-- Node 4: Right -->
            <g transform="translate(600, 220)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="35" font-family="Poppins" font-size="13" font-weight="700" fill="#333" text-anchor="middle">Implementar</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">4</text>
            </g>

            <!-- Node 5: Bottom Right -->
            <g transform="translate(510, 370)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Analisar os</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">resultados</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">5</text>
            </g>

             <!-- Node 6: Bottom -->
            <g transform="translate(310, 410)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Criar um</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">padrão</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">6</text>
            </g>

            <!-- Node 7: Bottom Left -->
            <g transform="translate(110, 370)" filter="url(#shadow)">
                <rect x="0" y="0" width="180" height="60" rx="10" fill="var(--primary-color)" />
                <text x="90" y="25" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">Planejar os</text>
                <text x="90" y="45" font-family="Poppins" font-size="12" font-weight="700" fill="#333" text-anchor="middle">próximos passos</text>
                <circle cx="0" cy="30" r="22" fill="var(--card-bg)" stroke="var(--primary-color)" stroke-width="3"/>
                <text x="0" y="37" font-family="Poppins" font-size="18" font-weight="700" fill="var(--text-color)" text-anchor="middle">7</text>
            </g>
        </svg>
    `;

    // NOVA SEÇÃO: O Ciclo PDCA
    const pdcaSection = document.createElement('div');
    pdcaSection.style.width = '100%';
    pdcaSection.style.marginTop = '2rem';
    
    const pdcaTitle = document.createElement('h3');
    pdcaTitle.textContent = 'O Motor do Kaizen: Ciclo PDCA';
    applyStyles(pdcaTitle, { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '1rem', borderBottom: '2px solid var(--primary-color)' });
    
    const pdcaText = document.createElement('p');
    pdcaText.innerHTML = 'Para aplicar o Kaizen, utilizamos o Ciclo <strong>PDCA</strong>. É um método iterativo de gestão de quatro passos utilizado para o controle e melhoria contínua de processos e produtos.';
    
    const pdcaVisual = document.createElement('div');
    pdcaVisual.className = 'pdca-visual';
    pdcaVisual.innerHTML = `
        <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-color)" />
                </marker>
            </defs>
            
            <!-- PLAN -->
            <path d="M 300 150 L 300 30 A 120 120 0 0 1 420 150 Z" fill="#FFD700" stroke="var(--card-bg)" stroke-width="2" />
            <text x="360" y="100" font-family="Poppins" font-weight="700" font-size="18" fill="#333" text-anchor="middle">PLAN</text>
            <text x="360" y="120" font-family="Poppins" font-size="12" fill="#333" text-anchor="middle">(Planejar)</text>
            
            <!-- DO -->
            <path d="M 300 150 L 420 150 A 120 120 0 0 1 300 270 Z" fill="#FFA500" stroke="var(--card-bg)" stroke-width="2" />
            <text x="360" y="200" font-family="Poppins" font-weight="700" font-size="18" fill="#333" text-anchor="middle">DO</text>
            <text x="360" y="220" font-family="Poppins" font-size="12" fill="#333" text-anchor="middle">(Fazer)</text>

            <!-- CHECK -->
            <path d="M 300 150 L 300 270 A 120 120 0 0 1 180 150 Z" fill="#FF8C00" stroke="var(--card-bg)" stroke-width="2" />
            <text x="240" y="200" font-family="Poppins" font-weight="700" font-size="18" fill="#333" text-anchor="middle">CHECK</text>
            <text x="240" y="220" font-family="Poppins" font-size="12" fill="#333" text-anchor="middle">(Checar)</text>

            <!-- ACT -->
            <path d="M 300 150 L 180 150 A 120 120 0 0 1 300 30 Z" fill="#F4A460" stroke="var(--card-bg)" stroke-width="2" />
            <text x="240" y="100" font-family="Poppins" font-weight="700" font-size="18" fill="#333" text-anchor="middle">ACT</text>
            <text x="240" y="120" font-family="Poppins" font-size="12" fill="#333" text-anchor="middle">(Agir)</text>
            
            <!-- Descriptions -->
            <text x="440" y="80" font-family="Poppins" font-size="12" fill="var(--text-color)" width="150">
                <tspan x="440" dy="0">Identificar o problema</tspan>
                <tspan x="440" dy="15">e criar um plano de ação.</tspan>
            </text>
            <text x="440" y="220" font-family="Poppins" font-size="12" fill="var(--text-color)">
                <tspan x="440" dy="0">Executar o plano</tspan>
                <tspan x="440" dy="15">definido.</tspan>
            </text>
            <text x="20" y="220" font-family="Poppins" font-size="12" fill="var(--text-color)">
                <tspan x="20" dy="0">Verificar se o resultado</tspan>
                <tspan x="20" dy="15">foi alcançado.</tspan>
            </text>
            <text x="20" y="80" font-family="Poppins" font-size="12" fill="var(--text-color)">
                <tspan x="20" dy="0">Padronizar se funcionou</tspan>
                <tspan x="20" dy="15">ou corrigir se falhou.</tspan>
            </text>
        </svg>
    `;
    
    pdcaSection.append(pdcaTitle, pdcaText, pdcaVisual);

    // Cards de Benefícios (Mantido)
    const cardContainer = document.createElement('div');
    cardContainer.className = 'info-cards-container';
    
    const beneficiosCard = document.createElement('div');
    beneficiosCard.className = 'info-card';
    beneficiosCard.innerHTML = '<h3>Benefícios</h3>';
    beneficiosCard.appendChild(createTopicList([
        'Aumento da produtividade e qualidade;',
        'Redução de desperdícios e custos;',
        'Maior satisfação do cliente;',
        'Melhora do ambiente de trabalho e engajamento da equipe;',
        'Incentivo à inovação e criatividade;',
        'Processos mais eficientes e seguros.',
    ]));
    
    // NOVA SEÇÃO: Kaizen na Logística (Exemplos Reais)
    const logisticaExamplesSection = document.createElement('div');
    logisticaExamplesSection.style.width = '100%';
    logisticaExamplesSection.style.marginTop = '3rem';

    const logisticaTitle = document.createElement('h3');
    logisticaTitle.textContent = 'Kaizen na Logística: Exemplos Reais';
    applyStyles(logisticaTitle, { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '1.5rem', borderBottom: '2px solid var(--primary-color)' });

    const examplesGrid = document.createElement('div');
    applyStyles(examplesGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
    });

    const example1 = document.createElement('div');
    applyStyles(example1, {
        backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px var(--card-shadow)'
    });
    example1.innerHTML = `
        <h4 style="color:var(--primary-color); margin-top:0;">1. Picking (Separação de Pedidos)</h4>
        <p style="font-size:0.95rem;"><strong>Problema:</strong> Os separadores andavam muito tempo para pegar os itens mais vendidos, que ficavam no fundo do armazém.</p>
        <p style="font-size:0.95rem;"><strong>Ação Kaizen:</strong> Reorganizar o layout usando a Curva ABC. Colocar os produtos "A" (mais vendidos) perto da expedição.</p>
        <p style="font-size:0.95rem;"><strong>Resultado:</strong> Redução de 20% no tempo de caminhada e aumento na velocidade de separação.</p>
    `;

    const example2 = document.createElement('div');
    applyStyles(example2, {
        backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px var(--card-shadow)'
    });
    example2.innerHTML = `
        <h4 style="color:var(--primary-color); margin-top:0;">2. Carga e Descarga</h4>
        <p style="font-size:0.95rem;"><strong>Problema:</strong> Caminhões ficavam parados muito tempo esperando doca livre, gerando multas e atrasos.</p>
        <p style="font-size:0.95rem;"><strong>Ação Kaizen:</strong> Implementar agendamento de janelas de entrega e padronizar o processo de conferência.</p>
        <p style="font-size:0.95rem;"><strong>Resultado:</strong> Redução do tempo de espera em 40% e eliminação de multas por estadia (demurrage).</p>
    `;

    const example3 = document.createElement('div');
    applyStyles(example3, {
        backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px var(--card-shadow)'
    });
    example3.innerHTML = `
        <h4 style="color:var(--primary-color); margin-top:0;">3. Inventário Rotativo</h4>
        <p style="font-size:0.95rem;"><strong>Problema:</strong> A empresa parava 3 dias por ano para contar estoque, perdendo vendas.</p>
        <p style="font-size:0.95rem;"><strong>Ação Kaizen:</strong> Substituir o inventário anual pelo Inventário Cíclico (contar um pouco todo dia).</p>
        <p style="font-size:0.95rem;"><strong>Resultado:</strong> Acuracidade do estoque subiu para 99% e a operação nunca mais precisou parar.</p>
    `;

    examplesGrid.append(example1, example2, example3);
    logisticaExamplesSection.append(logisticaTitle, examplesGrid);

    cardContainer.append(beneficiosCard); // Mantendo apenas benefícios no grid antigo
    
    // Side Images (Mantido)
    const sideImagesContainer = document.createElement('div');
    sideImagesContainer.className = 'kaizen-side-images-container';
    sideImagesContainer.innerHTML = `
        <div class="kaizen-side-image">
            <svg viewBox="0 0 200 150">
                <rect x="10" y="10" width="180" height="130" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <circle cx="100" cy="70" r="40" fill="none" stroke="var(--primary-color)" stroke-width="2"/>
                <path d="M100 30 V 20 M100 110 V 120 M60 70 H 50 M140 70 H 150 M71.7 41.7 L 65 35 M128.3 98.3 L 135 105" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/>
                <circle cx="100" cy="70" r="30" fill="var(--primary-color)" fill-opacity="0.1"/>
                <text x="100" y="75" font-family="Poppins" font-size="14" font-weight="600" fill="var(--text-color)" text-anchor="middle">Inovação</text>
            </svg>
            <p>Kaizen vs. Inovação: O Kaizen foca em melhorias pequenas e contínuas, enquanto a inovação busca mudanças radicais e disruptivas. Ambos são importantes para o crescimento da empresa.</p>
        </div>
        <div class="kaizen-side-image">
            <svg viewBox="0 0 200 150">
                <rect x="10" y="10" width="180" height="130" rx="5" fill="var(--card-bg)" stroke="var(--card-border)" stroke-width="2"/>
                <path d="M40 110 L80 70 L110 90 L160 40" stroke="var(--primary-color)" stroke-width="3" fill="none"/>
                <circle cx="40" cy="110" r="4" fill="var(--primary-color)"/>
                <circle cx="80" cy="70" r="4" fill="var(--primary-color)"/>
                <circle cx="110" cy="90" r="4" fill="var(--primary-color)"/>
                <circle cx="160" cy="40" r="4" fill="var(--primary-color)"/>
                <path d="M30 120 H 170" stroke="var(--text-color-subtle)" stroke-width="1"/>
                <path d="M30 20 V 120" stroke="var(--text-color-subtle)" stroke-width="1"/>
            </svg>
            <p>Cultura Kaizen: É a criação de um ambiente de trabalho onde todos os funcionários estão engajados em melhorar continuamente, com autonomia para sugerir e implementar mudanças.</p>
        </div>
    `;

    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';

    const quizData = [
        { q: "Qual é a tradução literal da palavra japonesa 'Kaizen'?", a: 2, o: ["Trabalho em Equipe", "Qualidade Total", "Mudança para Melhor", "Produção Rápida"] },
        { q: "O Kaizen foca em que tipo de mudanças?", a: 0, o: ["Pequenas e contínuas", "Grandes e radicais", "Apenas tecnológicas", "Raras e impactantes"] },
        { q: "Onde a filosofia Kaizen surgiu e se popularizou?", a: 1, o: ["Nos Estados Unidos, na Ford", "No Japão, na Toyota", "Na Alemanha, na Volkswagen", "Na Coreia do Sul, na Samsung"] },
        { q: "Quem é responsável por aplicar o Kaizen em uma organização?", a: 3, o: ["Apenas os gerentes", "Apenas a equipe de qualidade", "Apenas os diretores", "Todos os funcionários"] },
        { q: "O Kaizen e a Inovação são a mesma coisa?", a: 1, o: ["Sim, ambos buscam mudanças radicais.", "Não, o Kaizen foca em melhorias contínuas e a inovação em mudanças radicais.", "Sim, ambos são focados em pequenas melhorias diárias.", "Não, o Kaizen é sobre tecnologia e a inovação sobre processos."] },
        { q: "Qual destes NÃO é um benefício direto do Kaizen?", a: 2, o: ["Redução de desperdícios", "Aumento da produtividade", "Aumento do estoque de segurança", "Melhora do ambiente de trabalho"] },
        { q: "O ciclo PDCA (Planejar, Fazer, Checar, Agir) é frequentemente associado ao Kaizen porque ele:", a: 0, o: ["Estrutura o processo de melhoria contínua.", "É usado apenas para grandes projetos de inovação.", "Substitui a necessidade de colaboração da equipe.", "Serve para documentar erros sem corrigi-los."] },
        { q: "O Kaizen pode ser aplicado na vida pessoal?", a: 0, o: ["Sim, para aprimorar hábitos e rotinas.", "Não, é uma filosofia estritamente empresarial.", "Apenas em atividades financeiras.", "Apenas para organização de tarefas domésticas."] },
        { q: "No exemplo de 'Picking' na logística, qual foi a ação Kaizen aplicada?", a: 2, o: ["Contratar mais funcionários.", "Aumentar o tamanho do armazém.", "Reorganizar o layout usando a Curva ABC.", "Comprar empilhadeiras novas."] },
        { q: "Qual é o significado do 'C' no ciclo PDCA?", a: 1, o: ["Create (Criar)", "Check (Checar/Verificar)", "Control (Controlar)", "Calculate (Calcular)"] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'kaizen-quiz';

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
        input.name = `kaizen-question-${index}`;
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

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Kaizen', submitButton, resetButton));

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
    
    const topicNav = createTopicNavigation(selectedTopic.id, transitionTo, setSelectedTopic);

    container.append(
        backButton, 
        title,
        intro,
        comoSurgiu,
        comoFunciona,
        importancia,
        imageContainer, // Diagrama 7 Etapas
        pdcaSection,    // NOVO: Ciclo PDCA
        cardContainer,  // Benefícios
        logisticaExamplesSection, // NOVO: Exemplos na Logística
        sideImagesContainer,
        quizSection,
        topicNav
    );
    return container;
}
