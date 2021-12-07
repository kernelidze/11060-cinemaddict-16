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

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const cardsCount = getRandomInteger(12, 20);
const CARDS_COUNT_TEMPLATES_PER_STEP = 5;

const cards = Array.from({length: cardsCount}, generateCard);

renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND);

const siteFilmsListSection = siteMainElement.querySelector('.films-list');
const siteFilmsListSectionContainer = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < CARDS_COUNT_TEMPLATES_PER_STEP; i++) {
  renderTemplate(siteFilmsListSectionContainer, createCardTemplate(cards[i]), RenderPosition.BEFOREEND);
}

let cardsPostersForClick = siteFilmsListSectionContainer.querySelectorAll('.film-card__poster');

renderTemplate(siteFilmsListSection, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
const showMoreButton = document.querySelector('.films-list__show-more');
if (cards.length > CARDS_COUNT_TEMPLATES_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_TEMPLATES_PER_STEP;
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_TEMPLATES_PER_STEP)
      .forEach((card) => renderTemplate(siteFilmsListSectionContainer, createCardTemplate(card), RenderPosition.BEFOREEND));

    cardsPostersForClick = siteFilmsListSectionContainer.querySelectorAll('.film-card__poster');
    renderedCardsCount += CARDS_COUNT_TEMPLATES_PER_STEP;
    if (renderedCardsCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteMainElement, createStatisticTemplate(), RenderPosition.BEFOREEND);

const generateClickCards = (renderedCardsCount = 0) => {
  cardsPostersForClick.forEach((poster, index) => {
    if (index > renderedCardsCount - 1) {
      poster.addEventListener('click', () => {
        const prevPopup = document.querySelector('.film-details');
        if (prevPopup) {
          prevPopup.remove();
        }

        renderTemplate(siteMainElement, createPopupTemplate(cards[index]), RenderPosition.BEFOREEND);
        const popupFilmDetailTable = document.querySelector('.film-details__table');
        const popupFilmDetailGenre = popupFilmDetailTable.querySelector('tr:last-child >td:last-child');
        for (let i = 0; i < cards[index].genre.randomGenresArray.length; i++) {
          renderTemplate(popupFilmDetailGenre, createGenreTemplate(cards[index].genre.randomGenresArray[i]), RenderPosition.BEFOREEND);
        }

        const commentaryListSection = document.querySelector('.film-details__comments-list');
        for (let i = 0; i < cards[index].comments.randomCommentaryCount; i++) {
          renderTemplate(commentaryListSection, createCommentaryTemplate(cards[index]), RenderPosition.AFTERBEGIN);
        }

        const popup = document.querySelector('.film-details');
        const close = document.querySelector('.film-details__close-btn');

        close.addEventListener('click', () => {
          popup.remove();
        });
      });
    }
  });
};

generateClickCards();

renderTemplate(siteFooterElement, createFooterStatisticsTemplate(), RenderPosition.BEFOREEND);

export {cards, cardsCount};
