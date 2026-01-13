
import { renderHomeHero } from './HomeHero.tsx';
import { renderHomeFundamentals } from './HomeFundamentals.tsx';
import { renderHomeRights } from './HomeRights.tsx';
import { renderHomeQuote } from './HomeQuote.tsx';

export function renderInicioPage(navigateTo) {
  const pageContainer = document.createElement('div');

  // Adiciona as seções modulares
  pageContainer.appendChild(renderHomeHero(navigateTo));
  pageContainer.appendChild(renderHomeFundamentals());
  pageContainer.appendChild(renderHomeRights());
  pageContainer.appendChild(renderHomeQuote());

  return pageContainer;
}
