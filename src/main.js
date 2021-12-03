import {renderTemplate, RenderPosition} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilmsListTemplate} from './view/films-list-container-view.js';
import {createCardTemplate} from './view/card-view.js';
import {createShowMoreButtonTemplate} from './view/show-more-button-view.js';
import {createStatisticTemplate} from './view/statistic-view.js';
import {createPopupTemplate} from './view/popup-film-details-view.js';
import {createCommentaryTemplate} from './view/comment-view.js';
import { createGenreTemplate } from './view/popup-genres-view.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics-view.js';
import {generateCard} from './mock/card.js';
import {getRandomInteger} from './utils.js';

const cardsCount = getRandomInteger(12, 20);
const CARDS_COUNT_TEMPLATES_PER_STEP = 5;
const randomCommentaryCount = getRandomInteger(1, 6);
const randomGenresCount = getRandomInteger(1, 4);

const cards = Array.from({length: cardsCount}, generateCard);

let favoriteCardsCount = 0;
let watchedCardsCount = 0;
let inWatchlistCardsCount = 0;

for (let i = 0; i < cardsCount; i++) {
  if (cards[i].isFavorite) {
    favoriteCardsCount++;
  }
  if (cards[i].isWatched) {
    watchedCardsCount++;
  }
  if (cards[i].isInWatchlist) {
    inWatchlistCardsCount++;
  }
}

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND);

const siteFilmsListSection = siteMainElement.querySelector('.films-list');
const siteFilmsListSectionContainer = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < CARDS_COUNT_TEMPLATES_PER_STEP; i++) {
  renderTemplate(siteFilmsListSectionContainer, createCardTemplate(cards[i]), RenderPosition.BEFOREEND);
}

const randomPopupIndex = getRandomInteger(0, cards.length - 1);
renderTemplate(siteMainElement, createStatisticTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createPopupTemplate(cards[randomPopupIndex]), RenderPosition.BEFOREEND);

const popupFilmDetailTable = document.querySelector('.film-details__table');
const popupFilmDetailGenre = popupFilmDetailTable.querySelector('tr:last-child >td:last-child');
for (let i = 0; i < randomGenresCount; i++) {
  renderTemplate(popupFilmDetailGenre, createGenreTemplate(cards[0]), RenderPosition.BEFOREEND);
}

const commentaryListSection = document.querySelector('.film-details__comments-list');
for (let i = 0; i < randomCommentaryCount; i++) {
  renderTemplate(commentaryListSection, createCommentaryTemplate(cards[0]), RenderPosition.AFTERBEGIN);
}

renderTemplate(siteFilmsListSection, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
const showMoreButton = document.querySelector('.films-list__show-more');
if (cards.length > CARDS_COUNT_TEMPLATES_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_TEMPLATES_PER_STEP;
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_TEMPLATES_PER_STEP)
      .forEach((card) => renderTemplate(siteFilmsListSectionContainer, createCardTemplate(card), RenderPosition.BEFOREEND));
    renderedCardsCount += CARDS_COUNT_TEMPLATES_PER_STEP;
    if (renderedCardsCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteFooterElement, createFooterStatisticsTemplate(), RenderPosition.BEFOREEND);

export {cardsCount, randomCommentaryCount, favoriteCardsCount, inWatchlistCardsCount, watchedCardsCount};
