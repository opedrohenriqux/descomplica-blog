
import { styles, applyStyles, CtaButton } from '../utils.tsx';

export function renderHomeHero(navigateTo) {
  const section = document.createElement('section');
  section.id = 'inicio';
  applyStyles(section, { ...styles.section, minHeight: 'calc(100vh - 80px)', padding: '8rem 2rem', position: 'relative', overflow: 'hidden' });

  const blob1 = document.createElement('div');
  blob1.className = 'background-blob';
  applyStyles(blob1, {
      top: '10%',
      left: '10%',
      width: '300px',
      height: '300px',
      backgroundColor: 'hsla(47, 100%, 50%, 0.15)',
  });

  const blob2 = document.createElement('div');
  blob2.className = 'background-blob';
  applyStyles(blob2, {
      bottom: '15%',
      right: '5%',
      width: '400px',
      height: '400px',
      backgroundColor: 'hsla(220, 50%, 80%, 0.1)',
  });

  const title = document.createElement('h1');
  applyStyles(title, { ...styles.mainTitle, fontSize: "clamp(3.5rem, 10vw, 6.5rem)" });
  // Destaque para "Descompli" como solicitado
  title.innerHTML = `<span style="color: ${styles.highlight.color};">Descompli</span><span>ca Logística</span>`;

  const slogan = document.createElement('h2');
  applyStyles(slogan, { ...styles.slogan, fontSize: "clamp(2rem, 6vw, 3.2rem)", padding: "1.5rem 3rem" });
  slogan.innerHTML = `
    <span class="slogan-text">Conectando rotas, descomplicando processos.</span>
    <div class="slogan-animation-bg">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    </div>
  `;

  const buttonContainer = document.createElement('div');
  buttonContainer.style.margin = '1rem 0 2rem 0';
  buttonContainer.append(
    CtaButton('Conteúdos', () => navigateTo('conteudos'), { fontSize: '1.2rem', padding: '1rem 2rem' }),
    CtaButton('Perguntas frequentes', () => navigateTo('quem-somos'), { fontSize: '1.2rem', padding: '1rem 2rem' })
  );

  const intro = document.createElement('p');
  applyStyles(intro, { ...styles.intro, fontSize: "1.4rem", maxWidth: "850px" });
  intro.textContent = 'O Descomplica Logística é uma plataforma educativa que ensina conceitos de logística de forma simples, didática e visual, utilizando textos, vídeos e imagens para tornar o aprendizado mais acessível.';

  section.append(blob1, blob2, title, slogan, buttonContainer, intro);
  return section;
}
