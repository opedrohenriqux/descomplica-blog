
import { styles, applyStyles } from '../utils.tsx';

export function renderHomeRights() {
  const section = document.createElement('section');
  section.className = 'logistics-rights-section';

  const title = document.createElement('h2');
  applyStyles(title, { ...styles.sectionTitle, textAlign: 'center', marginBottom: '4rem', borderBottom: 'none' });
  title.innerHTML = `Os 5 <span style="color: ${styles.highlight.color};">Certos</span> da Logística`;

  const container = document.createElement('div');
  container.className = 'rights-container';

  const rights = [
    {
      title: 'Produto Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
    },
    {
      title: 'Quantidade Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`
    },
    {
      title: 'Condição Certa',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
    },
    {
      title: 'Lugar Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
    },
    {
      title: 'Tempo Certo',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    }
  ];

  rights.forEach(right => {
    const item = document.createElement('div');
    item.className = 'right-item';
    item.innerHTML = `
      <div class="right-item-icon">${right.icon}</div>
      <h3>${right.title}</h3>
    `;
    container.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(container);
  return section;
}
