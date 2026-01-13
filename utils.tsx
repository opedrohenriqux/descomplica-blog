
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
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "700",
    color: "var(--text-color)",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "4px solid var(--primary-color)",
  },
};

// Data
export const conteudosList = [
    { id: 'logistica-integrada', title: 'Logística Integrada', intro: 'Logística integrada é a gestão unificada de todas as etapas da cadeia de suprimentos — desde a compra de insumos, transporte, armazenagem, produção até a entrega ao cliente final — visando otimizar processos, reduzir custos e aumentar a eficiência.', content: 'A Logística Integrada é a gestão unificada de todas as atividades logísticas de uma empresa, desde a aquisição de matéria-prima até a entrega do produto final ao cliente. O objetivo é otimizar processos, reduzir custos e aumentar a eficiência da cadeia de suprimentos.' },
    { id: 'just-in-time', title: 'Just in Time', intro: 'É uma filosofia e sistema de gestão de produção, criado pela Toyota, que visa eliminar desperdícios e aumentar a eficiência al produzir e entregar produtos apenas quando são necessários e na quantidade exata.', content: 'O Just in Time (JIT) é um sistema de produção que busca produzir e entregar produtos na quantidade exata, no momento exato e no local exato. Ele visa eliminar desperdícios, reduzir estoques e melhorar a qualidade e a eficiência.' },
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
export const AccessibilityIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>`;

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
    maxWidth: '100%',
    whiteSpace: 'normal',
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
        const prevButton = CtaButton(`← Anterior: ${prevTopic.title}`, () => {
            transitionTo(() => { selectedTopicUpdater(prevTopic); });
        }, { margin: '0' });
        navContainer.appendChild(prevButton);
    } else {
        navContainer.appendChild(document.createElement('div')); // Placeholder
    }

    if (nextTopic) {
        const nextButton = CtaButton(`Próximo: ${nextTopic.title} →`, () => {
            transitionTo(() => { selectedTopicUpdater(nextTopic); });
        }, { margin: '0' });
        navContainer.appendChild(nextButton);
    }

    return navContainer;
}

// Comments Section Component
export function createCommentSection(topicId) {
    const container = document.createElement('div');
    container.className = 'comments-section';
    applyStyles(container, {
        width: '100%',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '2px solid var(--timeline-border)',
    });

    const title = document.createElement('h3');
    title.textContent = 'Comentários';
    applyStyles(title, {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text-color)',
        marginBottom: '1.5rem',
        borderBottom: '2px solid var(--primary-color)',
        paddingBottom: '0.5rem',
        display: 'inline-block'
    });

    // Input Area
    const formContainer = document.createElement('div');
    applyStyles(formContainer, {
        backgroundColor: 'var(--card-bg)',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px var(--card-shadow)',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    });

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Seu nome (Opcional)';
    applyStyles(nameInput, {
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--timeline-bg)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        width: '100%'
    });

    const commentInput = document.createElement('textarea');
    commentInput.placeholder = 'Deixe seu comentário, dúvida ou sugestão...';
    applyStyles(commentInput, {
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--timeline-bg)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        width: '100%',
        minHeight: '100px',
        resize: 'vertical',
        fontFamily: 'inherit'
    });

    const submitBtn = CtaButton('Enviar Comentário', () => handleSubmit(), { alignSelf: 'flex-end', margin: '0' });

    formContainer.append(nameInput, commentInput, submitBtn);

    // List Area
    const commentsList = document.createElement('div');
    applyStyles(commentsList, {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    });

    // Logic
    const storageKey = `comments_${topicId}`;
    
    const loadComments = () => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    };

    const saveComments = (comments) => {
        localStorage.setItem(storageKey, JSON.stringify(comments));
    };

    const renderComments = () => {
        commentsList.innerHTML = '';
        const comments = loadComments();

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="text-align: center; color: var(--text-color-light); font-style: italic;">Seja o primeiro a comentar!</p>';
            return;
        }

        comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        comments.forEach(comment => {
            const item = document.createElement('div');
            applyStyles(item, {
                backgroundColor: 'var(--card-bg)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                boxShadow: '0 2px 6px var(--card-shadow)',
                position: 'relative'
            });

            const header = document.createElement('div');
            applyStyles(header, {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
            });

            const author = document.createElement('strong');
            author.textContent = comment.author || 'Anônimo';
            author.style.color = 'var(--primary-color)';
            author.style.fontSize = '1.1rem';

            const date = document.createElement('span');
            date.textContent = new Date(comment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            date.style.fontSize = '0.85rem';
            date.style.color = 'var(--text-color-light)';

            header.append(author, date);

            const text = document.createElement('p');
            text.textContent = comment.text;
            text.style.margin = '0';
            text.style.lineHeight = '1.6';
            text.style.color = 'var(--text-color)';
            text.style.whiteSpace = 'pre-wrap';

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Excluir comentário';
            applyStyles(deleteBtn, {
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'var(--text-color-light)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                opacity: '0.5'
            });
            deleteBtn.addEventListener('mouseenter', () => deleteBtn.style.opacity = '1');
            deleteBtn.addEventListener('mouseleave', () => deleteBtn.style.opacity = '0.5');
            deleteBtn.addEventListener('click', () => {
                if(confirm('Deseja excluir este comentário?')) {
                    const newComments = comments.filter(c => c.id !== comment.id);
                    saveComments(newComments);
                    renderComments();
                }
            });

            item.append(deleteBtn, header, text);
            commentsList.appendChild(item);
        });
    };

    const handleSubmit = () => {
        const text = commentInput.value.trim();
        const author = nameInput.value.trim();

        if (!text) {
            alert('Por favor, escreva um comentário.');
            return;
        }

        const newComment = {
            id: Date.now(),
            text: text,
            author: author,
            date: new Date().toISOString()
        };

        const comments = loadComments();
        comments.push(newComment);
        saveComments(comments);

        commentInput.value = '';
        renderComments();
    };

    renderComments();
    container.append(title, formContainer, commentsList);
    return container;
}

// Media Helpers
export function createImage(src, alt, caption = '') {
    const container = document.createElement('div');
    container.className = 'media-container';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'media-content';
    img.loading = 'lazy';

    container.appendChild(img);

    if (caption) {
        const cap = document.createElement('p');
        cap.className = 'media-caption';
        cap.textContent = caption;
        container.appendChild(cap);
    }

    return container;
}

export function createVideo(src, caption = '', transcript = '') {
    const container = document.createElement('div');
    container.className = 'media-container';

    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';

    const ytRegExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const ytMatch = src.match(ytRegExp);
    const driveRegExp = /\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = src.match(driveRegExp);
    
    let externalLink = src;
    let linkText = 'Assistir no site original';

    if (ytMatch && ytMatch[1]) {
        const videoId = ytMatch[1];
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
        iframe.title = caption || "YouTube video player";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin"; 
        wrapper.appendChild(iframe);
        externalLink = `https://www.youtube.com/watch?v=${videoId}`;
        linkText = 'Assistir no YouTube';
    } else if (driveMatch && driveMatch[1]) {
        const fileId = driveMatch[1];
        const iframe = document.createElement('iframe');
        iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.title = caption || "Google Drive Video";
        wrapper.appendChild(iframe);
        externalLink = `https://drive.google.com/file/d/${fileId}/view`;
        linkText = 'Assistir no Google Drive';
    } else {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        wrapper.appendChild(video);
        linkText = 'Baixar/Abrir Vídeo';
    }

    container.appendChild(wrapper);

    const linkContainer = document.createElement('div');
    linkContainer.style.padding = '1rem';
    linkContainer.style.backgroundColor = 'var(--timeline-bg)';
    
    const fallbackLink = document.createElement('a');
    fallbackLink.href = externalLink;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    applyStyles(fallbackLink, {
        display: 'inline-block',
        fontSize: '0.9rem',
        color: '#333',
        backgroundColor: 'var(--primary-color)',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        cursor: 'pointer'
    });
    
    fallbackLink.innerHTML = `${linkText} <svg style="vertical-align: middle; margin-left: 4px;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
    
    linkContainer.appendChild(fallbackLink);
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
export function handleQuizSubmit(e, quizData, quizForm, resultsDiv, aiTipDiv, topicName, submitButton, resetButton) {
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
}
