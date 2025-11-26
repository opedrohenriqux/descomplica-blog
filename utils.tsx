
import { GoogleGenAI } from "@google/genai";

// Styles
export const styles = {
  section: {
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: "5rem 2rem",
    textAlign: 'center',
    width: '100%',
  },
  mainTitle: {
    fontSize: "clamp(3rem, 8vw, 5rem)",
    fontWeight: "700",
    color: "var(--text-color)",
    margin: "0 0 1rem 0",
  },
  highlight: {
    color: "var(--primary-color)",
  },
  intro: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "700px",
    margin: "1.5rem 0",
    color: "var(--text-color-light)",
  },
  slogan: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    fontWeight: "700",
    color: "var(--text-color)",
    margin: "1.5rem 0 2rem 0",
    padding: "1rem 2rem",
    border: "2px solid hsla(47, 100%, 50%, 0.5)",
    borderRadius: "12px",
    backgroundColor: "var(--button-bg)",
    position: 'relative',
    boxShadow: '0 0 30px hsla(47, 100%, 50%, 0.2)',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "var(--text-color)",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "3px solid var(--primary-color)",
  },
};

// Data
export const conteudosList = [
    { id: 'logistica-integrada', title: 'Logística Integrada', intro: 'Logística integrada é a gestão unificada de todas as etapas da cadeia de suprimentos — desde a compra de insumos, transporte, armazenagem, produção até a entrega ao cliente final — visando otimizar processos, reduzir custos e aumentar a eficiência.', content: 'A Logística Integrada é a gestão unificada de todas as atividades logísticas de uma empresa, desde a aquisição de matéria-prima até a entrega do produto final ao cliente. O objetivo é otimizar processos, reduzir custos e aumentar a eficiência da cadeia de suprimentos.' },
    { id: 'just-in-time', title: 'Just in Time', intro: 'É uma filosofia e sistema de gestão de produção, criado pela Toyota, que visa eliminar desperdícios e aumentar a eficiência ao produzir e entregar produtos apenas quando são necessários e na quantidade exata.', content: 'O Just in Time (JIT) é um sistema de produção que busca produzir e entregar produtos na quantidade exata, no momento exato e no local exato. Ele visa eliminar desperdícios, reduzir estoques e melhorar a qualidade e a eficiência.' },
    { id: 'kanban', title: 'Kanban', intro: 'Kanban é um método de gestão visual para melhorar o fluxo de trabalho, usando um quadro e cartões (como post-its) para representar tarefas e seu status.', content: 'Kanban é um sistema visual de gestão de trabalho que utiliza cartões (ou sinais visuais) para controlar o fluxo de produção. Ele ajuda a visualizar o trabalho, limitar o trabalho em andamento (WIP) e maximizar a eficiência, promovendo a melhoria contínua.' },
    { id: 'kaizen', title: 'Kaizen', intro: 'Kaizen é um termo japonês para "mudança para melhor" e descreve a filosofia da melhoria contínua em todas as áreas de uma organização ou vida pessoal.', content: 'Kaizen é uma filosofia japonesa de melhoria contínua que envolve todos os funcionários de uma organização. O objetivo é fazer pequenas mudanças incrementais nos processos para melhorar a qualidade, a produtividade e a segurança.' },
    { id: '5s', title: '5S', intro: '5S é um programa de origem japonesa que foi criado a partir da aplicação de cinco conceitos: Seiri, Seiton, Seiso, Seiketsu e Shitsuke. Ele tem como foco organizar diferentes setores de uma empresa com base na organização, padronização e limpeza.', content: 'O 5S é uma metodologia de organização de locais de trabalho que utiliza cinco palavras japonesas: Seiri (Utilização), Seiton (Organização), Seiso (Limpeza), Seiketsu (Padronização) e Shitsuke (Disciplina). O objetivo é criar um ambiente de trabalho mais limpo, organizado e eficiente.' },
    { id: 'cadeia-de-suprimentos', title: 'Cadeia de Suprimentos', intro: 'A cadeia de suprimentos (ou supply chain) é a rede de processos, pessoas, tecnologias e atividades que ligam fornecedores, fabricantes, distribuidores e clientes para entregar um produto ou serviço.', content: 'A Cadeia de Suprimentos, ou Supply Chain, engloba todas as atividades, pessoas, organizações, informações e recursos envolvidos na movimentação de um produto ou serviço, desde o fornecedor até o cliente final. A gestão eficiente é crucial para a competitividade.' },
    { id: 'compras', title: 'Compras', intro: 'Compras é o processo de aquisição de bens e serviços necessários para o funcionamento de uma empresa, organização ou indivíduo. Esse processo envolve identificar a demanda, selecionar fornecedores, negociar preços e condições, e garantir a entrega dentro dos prazos estabelecidos.', content: 'A área de Compras é responsável por adquirir os materiais, bens e serviços necessários para as operações de uma empresa. Uma gestão de compras estratégica busca obter os melhores preços, qualidade e condições de entrega, estabelecendo parcerias sólidas com fornecedores.' },
    { id: 'recebimento-de-materiais', title: 'Recebimento de Materiais', intro: 'O processo de recebimento de mercadorias é um conjunto de atividades essenciais na logística, que visa receber os produtos adquiridos de fornecedores e é a fase que inicia o fluxo de materiais na empresa. Atingir a eficiência operacional é um grande objetivo desse processo.', content: 'O Recebimento de Materiais é a primeira etapa do processo de armazenagem e consiste na conferência (quantitativa e qualitativa) dos produtos entregues pelos fornecedores. Um recebimento eficiente garante a exatidão do estoque e a qualidade dos materiais.' },
    { id: 'estocagem', title: 'Estocagem', intro: 'A estocagem envolve o armazenamento seguro e organizado de mercadorias. Um bom sistema de endereçamento (Rua, Prédio, Nível, Apartamento) é vital para a agilidade e precisão na localização dos itens.', content: 'A estocagem é a guarda organizada dos materiais. Utiliza-se um sistema de endereçamento logístico similar ao de uma cidade (Rua, Prédio, Nível, Apartamento) para facilitar a localização e movimentação dos itens dentro do armazém.' },
];

// Icons
export const MoonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
export const SunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

// API Call
export async function getAiResponse(prompt, context = '') {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const fullPrompt = `
            Você é um assistente amigável e prestativo para o site "Descomplica Logística".
            Sua função é responder às perguntas dos usuários sobre logística.
            ${context ? `Responda a pergunta a seguir usando APENAS o seguinte contexto. Não adicione informações que não estejam no texto.
            Contexto:
            ---
            ${context}
            ---
            Pergunta do usuário: ${prompt}` : prompt}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt
        });
        
        return response.text;
    } catch (error) {
        console.error("Erro ao chamar a API do Gemini:", error);
        return "Desculpe, não consigo responder agora. Tente novamente mais tarde.";
    }
}

// DOM Helpers
export function applyStyles(element, styles) {
  for (const property in styles) {
    element.style[property] = styles[property];
  }
}

// Component-like functions
export function CtaButton(text, onClick, customStyle = {}) {
  const button = document.createElement('button');
  button.textContent = text;
  const baseStyle = {
    backgroundColor: 'var(--button-bg)',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    color: 'var(--text-color)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.8rem 1.5rem',
    margin: '0 0.75rem',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
    transform: 'translateY(0)',
    boxShadow: 'none',
    ...customStyle,
  };
  applyStyles(button, baseStyle);
  button.addEventListener('click', onClick);
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'var(--button-bg-hover)';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = `0 4px 12px ${getComputedStyle(button).getPropertyValue('--card-shadow-hover')}`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'var(--button-bg)';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
  });
  return button;
}

export function createTopicList(items) {
    const ul = document.createElement('ul');
    ul.className = 'topic-list';
    items.forEach(itemText => {
        const li = document.createElement('li');
        const separator = itemText.includes(':') ? ':' : '→';
        const parts = itemText.split(separator);
        if (parts.length > 1) {
            const strong = document.createElement('strong');
            strong.textContent = parts[0] + separator;
            li.appendChild(strong);
            li.append(` ${parts.slice(1).join(separator).trim()}`);
        } else {
            li.textContent = itemText;
        }
        ul.appendChild(li);
    });
    return ul;
}

export function createTopicNavigation(topicId, transitionTo, selectedTopicUpdater) {
    const navContainer = document.createElement('div');
    navContainer.className = 'topic-navigation';

    const currentIndex = conteudosList.findIndex(t => t.id === topicId);

    const prevTopic = currentIndex > 0 ? conteudosList[currentIndex - 1] : null;
    const nextTopic = currentIndex < conteudosList.length - 1 ? conteudosList[currentIndex + 1] : null;

    if (prevTopic) {
        const prevButton = CtaButton(`← Anterior`, () => {
            transitionTo(() => { selectedTopicUpdater(prevTopic); });
        }, { margin: '0' });
        navContainer.appendChild(prevButton);
    } else {
        navContainer.appendChild(document.createElement('div')); // Placeholder
    }

    if (nextTopic) {
        const nextButton = CtaButton(`Próximo →`, () => {
            transitionTo(() => { selectedTopicUpdater(nextTopic); });
        }, { margin: '0' });
        navContainer.appendChild(nextButton);
    }

    return navContainer;
}

// Media Helpers
export function createImage(src, alt, caption = '') {
    const container = document.createElement('div');
    container.className = 'media-container';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'media-content';
    img.loading = 'lazy'; // Performance

    container.appendChild(img);

    if (caption) {
        const cap = document.createElement('p');
        cap.className = 'media-caption';
        cap.textContent = caption;
        container.appendChild(cap);
    }

    return container;
}

export function createVideo(src, caption = '') {
    const container = document.createElement('div');
    container.className = 'media-container';

    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';

    // Regex robusto para YouTube (incluindo parâmetros como ?si=)
    // Captura o ID de 11 caracteres após embed/, v=, ou youtu.be/
    const ytRegExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const ytMatch = src.match(ytRegExp);

    // Regex para Google Drive
    // Captura o ID entre /d/ e /view ou /preview
    const driveRegExp = /\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = src.match(driveRegExp);
    
    let externalLink = src;
    let linkText = 'Assistir no site original';
    let isVideoDetected = false;

    if (ytMatch && ytMatch[1]) {
        isVideoDetected = true;
        const videoId = ytMatch[1];
        const iframe = document.createElement('iframe');
        // Usar youtube-nocookie para evitar alguns erros de privacidade/cookies de terceiros (Erro 153)
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
        iframe.title = caption || "YouTube video player";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin"; 
        wrapper.appendChild(iframe);
        
        externalLink = `https://www.youtube.com/watch?v=${videoId}`;
        linkText = 'Assistir no YouTube';
    } else if (driveMatch && driveMatch[1]) {
        isVideoDetected = true;
        const fileId = driveMatch[1];
        const iframe = document.createElement('iframe');
        // Forçar modo preview
        iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
        iframe.allow = "autoplay; fullscreen";
        iframe.title = caption || "Google Drive Video";
        wrapper.appendChild(iframe);

        externalLink = `https://drive.google.com/file/d/${fileId}/view`;
        linkText = 'Assistir no Google Drive';
    } else {
        // Fallback para arquivo direto
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        wrapper.appendChild(video);
        linkText = 'Baixar/Abrir Vídeo';
    }

    container.appendChild(wrapper);
    
    // Botão de Fallback/Externo SEMPRE presente
    // Isso garante que se o player falhar (erro 153, permissão negada, etc), o usuário tem saída.
    const fallbackLink = document.createElement('a');
    fallbackLink.href = externalLink;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    applyStyles(fallbackLink, {
        display: 'inline-block',
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#fff',
        backgroundColor: 'var(--primary-color)',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.1)'
    });
    
    // Ícone de link externo
    fallbackLink.innerHTML = `${linkText} <svg style="vertical-align: middle; margin-left: 4px;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
    
    // Adiciona hover effect simples via JS já que é inline style
    fallbackLink.addEventListener('mouseenter', () => {
        fallbackLink.style.transform = 'translateY(-2px)';
        fallbackLink.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    fallbackLink.addEventListener('mouseleave', () => {
        fallbackLink.style.transform = 'translateY(0)';
        fallbackLink.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });

    const linkContainer = document.createElement('div');
    linkContainer.style.marginTop = '0.5rem';
    linkContainer.appendChild(fallbackLink);
    
    // Se não for detectado vídeo (ex: arquivo local), não força o botão ser tão chamativo, ou usa lógica diferente
    // Mas para YouTube/Drive é essencial.
    container.appendChild(linkContainer);

    if (caption) {
        const cap = document.createElement('p');
        cap.className = 'media-caption';
        cap.textContent = caption;
        container.appendChild(cap);
    }

    return container;
}

// Quiz Logic
export async function handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, topicName, submitButton, resetButton) {
    e.preventDefault();
    let score = 0;
    const incorrectAnswers = [];

    quizData.forEach((item, index) => {
        const selected = quizForm.querySelector(`input[name*="question-${index}"]:checked`);
        const labels = quizForm.querySelectorAll(`input[name*="question-${index}"]`);
        
        labels.forEach(l => (l.parentElement.classList.remove('correct', 'incorrect', 'quiz-feedback')));

        if (selected) {
            const answerIndex = parseInt(selected.value);
            const correctLabel = labels[item.a].parentElement;
            correctLabel.classList.add('correct', 'quiz-feedback');
            
            if (answerIndex === item.a) {
                score++;
            } else {
                const selectedLabel = selected.parentElement;
                selectedLabel.classList.add('incorrect', 'quiz-feedback');
                incorrectAnswers.push(item.q);
            }
        } else {
            incorrectAnswers.push(item.q);
        }
    });

    resultsDiv.textContent = `Você acertou ${score} de ${quizData.length}!`;
    submitButton.style.display = 'none';
    resetButton.style.display = 'inline-block';

    aiTipDiv.innerHTML = '';
    if (incorrectAnswers.length > 0) {
        aiTipDiv.innerHTML = `<h4>Dica do Assistente</h4><p>Estou gerando uma dica de estudo para você...</p>`;
        const prompt = `O usuário errou questões sobre ${topicName}. As perguntas erradas foram: "${incorrectAnswers.join('", "')}". Com base nisso, dê uma dica de estudo amigável e curta, sugerindo que ele revise o conteúdo da página para entender melhor esses pontos.`;
        const tip = await getAiResponse(prompt);
        aiTipDiv.innerHTML = `<h4>💡 Dica do Assistente</h4><p>${tip}</p>`;
    }
}
