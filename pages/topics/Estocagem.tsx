
import { styles, applyStyles, CtaButton, handleQuizSubmit, createTopicList, createTopicNavigation, createImage } from '../../utils.tsx';

export function renderEstocagemPage(transitionTo, selectedTopic, setSelectedTopic) {
    const container = document.createElement('div');
    container.className = 'estocagem-page';
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
    title.textContent = 'Estocagem';

    function createSection(titleText, content, isList = false) {
        const sectionEl = document.createElement('div');
        sectionEl.style.width = '100%';
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        applyStyles(h3, {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--primary-color)'
        });
        sectionEl.appendChild(h3);
        
        if (isList && Array.isArray(content)) {
             sectionEl.appendChild(createTopicList(content));
        } else {
            const p = document.createElement('p');
            p.innerHTML = content;
            p.style.fontSize = '1.1rem';
            p.style.lineHeight = '1.8';
            sectionEl.appendChild(p);
        }
        return sectionEl;
    }

    // 1. Introdução
    const introducao = createSection('Introdução', 'Fala, galera! A estocagem é uma das atividades mais críticas da logística. Basicamente, é o ato de guardar mercadorias de forma organizada, segura e planejada, para que elas estejam disponíveis quando necessárias. Não é só "jogar" o produto em um canto; envolve controle de quantidade, localização e preservação da qualidade dos itens.');

    // 2. O que é
    const oQueE = createSection('O que é estocagem?', 'Estocagem é a guarda segura e organizada de mercadorias, garantindo a integridade dos produtos, otimizando o espaço físico e facilitando a movimentação e controle de inventário dentro do armazém.');

    // Nova Imagem sobre Estoque (Foco no produto) - Padronizada 1000x600
    const imagemEstoque = createImage(
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80', 
        'Caixas de papelão organizadas em um depósito', 
        'O foco da estocagem é o produto em si e sua disponibilidade.'
    );

    // 3. Importância
    const importancia = createSection('Importância e benefícios da estocagem', 'A importância do estoque reside em garantir o fornecimento contínuo de produtos, seja para a produção ou venda, evitando a falta ou o excesso de mercadorias. Uma boa gestão de estoque ajuda a equilibrar custos, otimiza a saúde financeira da empresa e melhora a eficiência operacional, possibilitando uma tomada de decisão mais estratégica.');

    // 4. Benefícios List
    const beneficiosTitle = document.createElement('h3');
    beneficiosTitle.textContent = 'Benefícios da gestão de estoque';
    applyStyles(beneficiosTitle, { fontSize: '1.3rem', marginTop: '1.5rem', color: 'var(--primary-color)' });
    
    const beneficiosList = createTopicList([
        'Garante o suprimento: Garante o abastecimento de materiais para a produção e o atendimento das necessidades dos clientes, evitando falhas no fornecimento.',
        'Evita perdas: Impede prejuízos por excesso (produtos obsoletos) ou falta de produtos (perda de vendas e clientes insatisfeitos).',
        'Otimiza custos: Reduz despesas de manutenção e operação associadas à armazenagem inadequada e garante o uso eficiente do capital de giro.',
        'Melhora a eficiência: Um estoque organizado agiliza o atendimento ao cliente e a produção, proporcionando mais flexibilidade e rapidez no processo.',
        'Fundamenta decisões: Fornece informações cruciais sobre a demanda e o desempenho dos produtos, auxiliando na tomada de decisões estratégicas e na otimização de processos.'
    ]);

    // 5. Métodos de Gestão (FIFO, LIFO, FEFO)
    const metodosSection = document.createElement('div');
    const metodosTitle = document.createElement('h3');
    metodosTitle.textContent = 'Métodos de Gestão de Estoque';
    applyStyles(metodosTitle, {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary-color)'
    });
    
    const metodosGrid = document.createElement('div');
    applyStyles(metodosGrid, {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '1.5rem',
        width: '100%'
    });

    const metodosData = [
        { 
            acronym: 'FIFO / PEPS',
            name: 'First In, First Out (Primeiro a Entrar, Primeiro a Sair)',
            desc: 'Neste método, os produtos mais antigos do estoque são os primeiros a serem vendidos ou utilizados. Isso segue o fluxo natural das mercadorias e evita que itens fiquem velhos ou obsoletos nas prateleiras.',
            usage: 'Ideal para produtos perecíveis (alimentos) ou produtos que podem sair de moda (roupas, eletrônicos).',
            example: '<strong>Exemplo Prático:</strong> Imagine um supermercado repondo caixas de leite. O funcionário coloca as caixas novas no fundo da prateleira e puxa as antigas (que chegaram semana passada) para a frente. Assim, o cliente pega o leite mais antigo primeiro, evitando que ele vença na loja.' 
        },
        { 
            acronym: 'LIFO / UEPS',
            name: 'Last In, First Out (Último a Entrar, Primeiro a Sair)',
            desc: 'Aqui, o produto mais recente a entrar no estoque é o primeiro a sair. Embora seja menos comum para produtos perecíveis (pois os antigos estragariam), é muito usado para mercadorias a granel ou de difícil movimentação.',
            usage: 'Comum em estoques de materiais de construção, minérios ou itens não perecíveis empilhados.',
            example: '<strong>Exemplo Prático:</strong> Pense em uma pilha de areia ou tijolos em uma obra. O caminhão descarrega novos tijolos em cima da pilha antiga. O pedreiro vai pegar os tijolos do topo (os últimos que chegaram) porque é fisicamente impossível pegar os de baixo sem desmontar a pilha toda.' 
        },
        { 
            acronym: 'FEFO / PVPS',
            name: 'First Expired, First Out (Primeiro a Vencer, Primeiro a Sair)',
            desc: 'Este método foca exclusivamente na data de validade. O produto que estiver mais próximo de vencer deve sair primeiro, não importando se ele chegou ontem ou mês passado.',
            usage: 'Crítico e obrigatório para indústrias farmacêuticas, químicas e alimentícias.',
            example: '<strong>Exemplo Prático:</strong> Em uma farmácia, chegou um lote de remédios hoje com validade para 3 meses. Porém, já havia um lote no estoque que chegou mês passado, mas com validade para 1 ano. Pelo FEFO, a farmácia deve vender primeiro o lote que chegou HOJE, pois ele vence antes.' 
        }
    ];

    metodosData.forEach(m => {
        const card = document.createElement('div');
        applyStyles(card, {
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px var(--card-shadow)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        });

        card.innerHTML = `
            <div style="border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                <h4 style="margin: 0; font-size: 1.4rem; color: var(--primary-color);">${m.acronym}</h4>
                <span style="font-size: 0.9rem; color: var(--text-color-light); font-weight: 600;">${m.name}</span>
            </div>
            <p style="margin: 0; line-height: 1.6;">${m.desc}</p>
            <p style="margin: 0; line-height: 1.6; color: var(--text-color-light);"><em>${m.usage}</em></p>
            <div style="background-color: var(--timeline-bg); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                <p style="margin: 0; font-size: 0.95rem;">${m.example}</p>
            </div>
        `;
        metodosGrid.appendChild(card);
    });
    metodosSection.append(metodosTitle, metodosGrid);

    // 6. Armazenagem
    const armazenagemSection = createSection('O que é armazenagem', 'A armazenagem logística é o processo de gerenciar o fluxo de mercadorias dentro de um armazém, desde o recebimento até a expedição, com o objetivo de otimizar o espaço, minimizar custos e garantir a disponibilidade dos produtos. Ela envolve atividades como recepção, conferência, estocagem, movimentação, organização, separação (picking), embalagem e expedição, garantindo o controle e a integridade do estoque através de sistemas de gestão e inventário.');

    // Imagem do Armazém (Foco na estrutura) - Padronizada 1000x600
    const imagemArmazem = createImage(
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80', 
        'Corredor de um armazém logístico organizado', 
        'A armazenagem foca na estrutura física e na organização do espaço.'
    );

    const impArmazenagem = createSection('Importância da armazenagem', 'A armazenagem é crucial na logística por garantir o estoque equilibrado, otimizar a distribuição, reduzir custos e aumentar a satisfação do cliente. Uma boa gestão de armazém permite que os produtos estejam disponíveis no momento certo, na quantidade adequada, minimizando perdas e desperdícios e assegurando a qualidade das mercadorias.');

    // 7. Diferença (Comparison)
    const diferencaIntro = createSection('Diferença de armazenagem e estocagem', 'Estoque se refere aos produtos ou mercadorias acumulados, enquanto armazenagem é o conjunto de processos e infraestrutura física para guardar, organizar, movimentar e distribuir esses itens. A estocagem é a ação de manter o estoque, e a armazenagem é o processo logístico mais amplo que abrange a estrutura física, o planejamento e a operação do local onde o estoque é mantido.');
    
    const comparisonGrid = document.createElement('div');
    applyStyles(comparisonGrid, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
        width: '100%'
    });

    const estoqueCard = document.createElement('div');
    applyStyles(estoqueCard, {
        backgroundColor: 'var(--timeline-bg)',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '5px solid var(--primary-color)'
    });
    estoqueCard.innerHTML = `
        <h3 style="margin-top:0; color:var(--text-color);">Estoque (ou Estocagem)</h3>
        <ul style="padding-left:1.2rem; line-height:1.6;">
            <li><strong>Foco:</strong> Os produtos em si, como matérias-primas, produtos em processo ou produtos acabados.</li>
            <li><strong>Função:</strong> Manter e gerenciar a quantidade de itens armazenados para atender às demandas futuras, evitando faltas ou excessos.</li>
            <li><strong>Exemplo:</strong> Decidir a quantidade ideal de um produto a comprar para não ter falta no mercado, ou definir o nível de estoque mínimo e máximo.</li>
        </ul>
    `;

    const armazemCard = document.createElement('div');
    applyStyles(armazemCard, {
        backgroundColor: 'var(--timeline-bg)',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '5px solid #333' // Different color for contrast
    });
    armazemCard.innerHTML = `
        <h3 style="margin-top:0; color:var(--text-color);">Armazenagem</h3>
        <ul style="padding-left:1.2rem; line-height:1.6;">
            <li><strong>Foco:</strong> A estrutura física (galpões, prateleiras) e as operações necessárias para a movimentação dos itens.</li>
            <li><strong>Função:</strong> Abrange todos os processos logísticos, como recebimento, organização, conservação, movimentação e expedição dos produtos.</li>
            <li><strong>Exemplo:</strong> Organizar os produtos em paletes, controlar a temperatura e a umidade, ou utilizar empilhadeiras para mover a carga.</li>
        </ul>
    `;
    comparisonGrid.append(estoqueCard, armazemCard);

    // --- NOVA SEÇÃO: CURVA ABC ---
    const abcSection = document.createElement('div');
    abcSection.className = 'abc-curve-section';
    applyStyles(abcSection, { width: '100%', marginTop: '5rem' });

    const abcHeader = createSection('Curva ABC: Classificação e Importância', 'A Curva ABC é uma ferramenta gerencial baseada no Princípio de Pareto (regra do 80/20), que ajuda a classificar os itens do estoque de acordo com sua importância, valor ou rotatividade. Ela permite que a empresa direcione seus esforços e recursos para o que realmente gera mais impacto financeiro e operacional.');

    const abcImportance = createSection('Por que ela é importante?', 'Gerenciar todos os itens com o mesmo nível de rigor é caro e ineficiente. A Curva ABC permite um controle diferenciado: itens de classe A recebem atenção máxima, enquanto itens de classe C têm processos mais simplificados, otimizando o tempo da equipe e o capital investido.');

    const abcBenefitsTitle = document.createElement('h4');
    abcBenefitsTitle.textContent = 'Benefícios da Classificação ABC';
    applyStyles(abcBenefitsTitle, { color: 'var(--primary-color)', fontSize: '1.3rem', marginTop: '1.5rem' });

    const abcBenefitsList = createTopicList([
        'Otimização do investimento: Reduz o capital preso em itens de pouco giro.',
        'Melhoria do giro de estoque: Foca na reposição ágil dos produtos mais vendidos.',
        'Redução de desperdícios: Evita a obsolescência de itens valiosos.',
        'Planejamento de compras: Melhora a negociação com fornecedores de itens críticos.',
        'Layout estratégico: Itens "A" podem ser posicionados em locais de fácil acesso.'
    ]);

    // --- EXEMPLO ANIMADO CURVA ABC ---
    const animatedExampleTitle = document.createElement('h3');
    animatedExampleTitle.textContent = 'Exemplo Interativo: A Divisão 80/20';
    applyStyles(animatedExampleTitle, { textAlign: 'center', marginTop: '3rem', color: 'var(--text-color)' });

    const abcVisualContainer = document.createElement('div');
    applyStyles(abcVisualContainer, {
        width: '100%',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        padding: '3rem',
        marginTop: '1.5rem',
        boxShadow: '0 10px 30px var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
    });

    const chartWrapper = document.createElement('div');
    applyStyles(chartWrapper, {
        width: '100%',
        maxWidth: '700px',
        height: '300px',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '10px'
    });

    // Segmentos da Curva ABC
    const segments = [
        { label: 'Classe A', percentItems: '20%', percentValue: '80%', color: '#fec700', desc: 'Itens de alto valor e extrema importância. Exigem controle rigoroso e inventários frequentes.' },
        { label: 'Classe B', percentItems: '30%', percentValue: '15%', color: '#ffd54f', desc: 'Itens de importância média. Controle intermediário, com revisões periódicas.' },
        { label: 'Classe C', percentItems: '50%', percentValue: '5%', color: '#fff176', desc: 'Itens de baixo valor, mas em grande quantidade. Controle simplificado para reduzir custos administrativos.' }
    ];

    const infoBox = document.createElement('div');
    applyStyles(infoBox, {
        width: '100%',
        padding: '1.5rem',
        backgroundColor: 'var(--timeline-bg)',
        borderRadius: '12px',
        borderLeft: '5px solid var(--primary-color)',
        minHeight: '100px',
        transition: 'all 0.3s ease'
    });
    infoBox.innerHTML = '<p style="text-align:center; color:var(--text-color-light);">Passe o mouse ou clique nas barras para ver os detalhes de cada classe.</p>';

    segments.forEach((seg, i) => {
        const barGroup = document.createElement('div');
        applyStyles(barGroup, {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
        });

        const bar = document.createElement('div');
        const height = parseInt(seg.percentValue) * 2.5; // Escala visual baseada no valor
        applyStyles(bar, {
            width: '100%',
            height: '0px',
            backgroundColor: seg.color,
            borderRadius: '8px 8px 0 0',
            transition: 'height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            position: 'relative'
        });

        const label = document.createElement('span');
        label.textContent = seg.label;
        applyStyles(label, { fontWeight: '700', marginTop: '10px', color: 'var(--text-color)' });

        const valLabel = document.createElement('span');
        valLabel.textContent = `${seg.percentValue} do Valor`;
        applyStyles(valLabel, { fontSize: '0.75rem', color: 'var(--text-color-light)' });

        barGroup.append(bar, label, valLabel);
        chartWrapper.appendChild(barGroup);

        // Animação ao entrar em cena (Trigger simulado)
        setTimeout(() => { bar.style.height = `${height}px`; }, 100 + (i * 200));

        // Interatividade
        const showInfo = () => {
            barGroup.style.transform = 'translateY(-10px)';
            bar.style.filter = 'brightness(1.05)';
            infoBox.innerHTML = `
                <h4 style="margin:0; color:var(--primary-color);">${seg.label}</h4>
                <p style="margin:5px 0 0 0; font-size:0.95rem;"><strong>Qtd. de Itens:</strong> ${seg.percentItems} | <strong>Valor Acumulado:</strong> ${seg.percentValue}</p>
                <p style="margin:10px 0 0 0; font-size:0.9rem; line-height:1.5;">${seg.desc}</p>
            `;
            infoBox.style.borderColor = seg.color;
        };

        const resetInfo = () => {
            barGroup.style.transform = 'translateY(0)';
            bar.style.filter = 'none';
        };

        barGroup.addEventListener('mouseenter', showInfo);
        barGroup.addEventListener('mouseleave', resetInfo);
        barGroup.addEventListener('touchstart', (e) => { e.preventDefault(); showInfo(); });
    });

    abcVisualContainer.append(chartWrapper, infoBox);
    abcSection.append(abcHeader, abcImportance, abcBenefitsTitle, abcBenefitsList, animatedExampleTitle, abcVisualContainer);

    // 9. Quiz Section
    const quizSection = document.createElement('div');
    quizSection.className = 'quiz-section';

    const quizTitle = document.createElement('h2');
    applyStyles(quizTitle, styles.sectionTitle);
    quizTitle.textContent = 'Teste seu conhecimento!';
    quizTitle.style.textAlign = 'center';
    quizTitle.style.marginBottom = '2rem';
    
    const quizData = [
        { q: "Qual é a definição correta de Estocagem?", a: 0, o: ["É a guarda segura e organizada de mercadorias para garantir a integridade e disponibilidade.", "É apenas o processo de transportar produtos.", "É a negociação de preços com fornecedores.", "É o descarte de materiais vencidos."] },
        { q: "Qual o foco principal do 'Estoque' (ou Estocagem) em comparação à Armazenagem?", a: 1, o: ["A estrutura física do galpão.", "Os produtos em si (quantidade, matéria-prima, acabados).", "O transporte externo.", "A contratação de funcionários."] },
        { q: "Qual destes é um benefício de um estoque organizado?", a: 2, o: ["Aumento de custos operacionais.", "Maior dificuldade em encontrar produtos.", "Agiliza o atendimento ao cliente e a produção.", "Gera excesso de produtos obsoletos."] },
        { q: "O método FEFO (PVPS) é ideal para qual tipo de produto?", a: 0, o: ["Produtos com data de validade (perecíveis).", "Eletrônicos.", "Móveis de escritório.", "Ferramentas de aço."] },
        { q: "Qual é a função da Armazenagem?", a: 1, o: ["Apenas contar os produtos.", "Gerenciar todo o fluxo, infraestrutura e movimentação desde o recebimento até a expedição.", "Definir o preço de venda.", "Fazer o marketing do produto."] },
        { q: "Na Curva ABC, a Classe A representa geralmente:", a: 2, o: ["80% dos itens e 20% do valor.", "50% dos itens e 5% do valor.", "20% dos itens e 80% do valor.", "Itens sem nenhuma importância financeira."] },
        { q: "O método FIFO (PEPS) significa:", a: 0, o: ["Primeiro a Entrar, Primeiro a Sair.", "Primeiro a Vencer, Primeiro a Sair.", "Último a Entrar, Primeiro a Sair.", "Último a Vencer, Primeiro a Sair."] },
        { q: "Qual a importância da Curva ABC para a gestão de estoque?", a: 3, o: ["Comprar a mesma quantidade de todos os itens.", "Ignorar os itens de baixo valor.", "Aumentar o custo de todos os processos.", "Permitir um controle diferenciado focado nos itens de maior impacto."] },
        { q: "Como a gestão de estoque fundamenta decisões?", a: 1, o: ["Baseando-se em palpites.", "Fornecendo informações cruciais sobre demanda e desempenho dos produtos.", "Ignorando os dados de vendas.", "Decidindo apenas pelo produto mais barato."] },
        { q: "Qual exemplo melhor representa uma atividade de Armazenagem?", a: 0, o: ["Controlar a temperatura e umidade do galpão.", "Definir o nível mínimo de compra.", "Escolher a cor do produto.", "Pagar o boleto do fornecedor."] },
    ];

    const quizForm = document.createElement('form');
    quizForm.id = 'estocagem-quiz';

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
        input.name = `estocagem-question-${index}`;
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

    submitButton.addEventListener('click', (e) => handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, 'Estocagem', submitButton, resetButton));

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
        introducao,
        oQueE,
        imagemEstoque,
        importancia,
        beneficiosTitle,
        beneficiosList,
        metodosSection,
        armazenagemSection,
        imagemArmazem,
        impArmazenagem,
        diferencaIntro,
        comparisonGrid,
        abcSection, // NOVA SEÇÃO CURVA ABC
        quizSection,
        topicNav
    );
    return container;
}
