import { styles, applyStyles } from '../utils.tsx';

export function renderQuemSomosPage() {
    const section = document.createElement('section');
    applyStyles(section, { ...styles.section, justifyContent: 'flex-start', paddingTop: '12rem' });
    const container = document.createElement('div');
    applyStyles(container, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: '900px',
      padding: '0 1rem'
    });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, marginBottom: '2rem' });
    title.textContent = 'Perguntas Frequentes';

    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';
    applyStyles(faqContainer, {
      width: '100%',
      textAlign: 'left'
    });

    const faqs = [
        { q: "O que é o Descomplica Logística?", a: "É uma plataforma educativa com o objetivo de ensinar conceitos de logística de forma simples, didática e visual. Usamos textos, vídeos e imagens para tornar o aprendizado mais acessível a todos." },
        { q: "Para quem é este site?", a: "Para estudantes, profissionais da área que buscam reciclar conhecimentos, e qualquer pessoa curiosa sobre como os produtos chegam até elas. Nossa abordagem é feita para ser compreendida por todos, desde o iniciante até o mais experiente." },
        { q: "O conteúdo é gratuito?", a: "Sim, todo o conteúdo educacional e os jogos disponíveis no Descomplica Logística são 100% gratuitos." },
        { q: "Como posso usar o assistente de IA?", a: "Clique no ícone de chat no canto inferior direito da tela. Você pode fazer perguntas sobre os temas de logística abordados no site, e nosso assistente usará o conteúdo da página para te dar uma resposta direta e precisa." },
        { q: "Com que frequência o conteúdo é atualizado?", a: "Estamos sempre trabalhando para adicionar novos tópicos, aprofundar os existentes e criar novas formas interativas de aprendizado. Siga-nos para ficar por dentro das novidades!" }
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        applyStyles(faqItem, {
            marginBottom: '1rem',
            border: `1px solid var(--card-border)`,
            borderRadius: '12px',
            overflow: 'hidden'
        });

        const question = document.createElement('div');
        question.className = 'faq-question';
        question.innerHTML = `<p>${faq.q}</p><span>+</span>`;
        applyStyles(question, {
            padding: '1.2rem 1.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)'
        });
        applyStyles(question.querySelector('p'), { margin: 0 });

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = `<p>${faq.a}</p>`;
        applyStyles(answer, {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
            backgroundColor: 'var(--timeline-bg)'
        });
        applyStyles(answer.querySelector('p'), { 
            margin: 0,
            padding: '1.2rem 1.5rem',
            lineHeight: '1.7'
        });
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            document.querySelectorAll('.faq-answer').forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.maxHeight = '0';
                    if (el.previousElementSibling && el.previousElementSibling.querySelector('span')) {
                      el.previousElementSibling.querySelector('span').textContent = '+';
                    }
                }
            });
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('span').textContent = '-';
            }
        });
        
        faqItem.append(question, answer);
        faqContainer.appendChild(faqItem);
    });

    container.append(title, faqContainer);
    section.appendChild(container);
    return section;
}