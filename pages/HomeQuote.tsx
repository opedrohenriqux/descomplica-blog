
import { styles, applyStyles } from '../utils.tsx';

export function renderHomeQuote() {
    const section = document.createElement('section');
    section.className = 'quote-section';
    applyStyles(section, { ...styles.section, backgroundColor: 'var(--footer-bg)' });

    const title = document.createElement('h2');
    applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '3rem', borderBottom: 'none' });
    title.innerHTML = `Importância <span style="color: ${styles.highlight.color};">Logística</span>`;
    
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-card';
    quoteContainer.innerHTML = `
        <span class="quote-mark">“</span>
        <blockquote cite="https://www.goodreads.com/quotes/26083-you-will-not-find-it-difficult-to-prove-that">
            Você não terá dificuldade para provar que batalhas, campanhas e até guerras foram ganhas ou perdidas principalmente devido à logística.
        </blockquote>
        <cite>General Dwight D. Eisenhower (1890-1969)</cite>
    `;
    
    section.append(title, quoteContainer);
    return section;
}
