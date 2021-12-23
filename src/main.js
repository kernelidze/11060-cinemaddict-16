import {RenderPosition, render} from './render.js';
import ProfileView from './view/profile-view.js';
import SiteMenuView from './view/site-menu-view.js';
import FilmsListContainerView from './view/films-list-container-view.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import StatisticsView from './view/statistic-view.js';
import PopupView from './view/popup-film-details-view.js';
import CommentsView from './view/comment-view.js';
import GenreView from './view/popup-genres-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import {generateCard} from './mock/card.js';
import {getRandomInteger} from './utils.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const cardsCount = getRandomInteger(12, 20);
const CARDS_COUNT_TEMPLATES_PER_STEP = 5;

const cards = Array.from({length: cardsCount}, generateCard);

const ProfileViewClass = new ProfileView();
const SiteMenuViewClass = new SiteMenuView();
const FilmsListContainerViewClass = new FilmsListContainerView();
const ShowMoreButtonViewClass = new ShowMoreButtonView();
const StatisticsViewClass = new StatisticsView();
const FooterStatisticsViewClass = new FooterStatisticsView();

render(siteHeaderElement, ProfileViewClass.element, RenderPosition.BEFOREEND);
render(siteMainElement, SiteMenuViewClass.element, RenderPosition.AFTERBEGIN);
render(siteMainElement, FilmsListContainerViewClass.element, RenderPosition.BEFOREEND);

const siteFilmsListSection = siteMainElement.querySelector('.films-list');
const siteFilmsListSectionContainer = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < CARDS_COUNT_TEMPLATES_PER_STEP; i++) {
  const CardViewClass = new CardView(cards[i]);
  render(siteFilmsListSectionContainer, CardViewClass.element, RenderPosition.BEFOREEND);
}

let cardsPostersForClick = siteFilmsListSectionContainer.querySelectorAll('.film-card__poster');

const generateClickCards = (renderedCardsCount = 0) => {
  cardsPostersForClick.forEach((poster, index) => {
    const PopupViewClass = new PopupView(cards[index]);
    if (index > renderedCardsCount - 1) {
      poster.addEventListener('click', () => {
        const prevPopup = document.querySelector('.film-details');
        if (prevPopup) {
          siteMainElement.removeChild(prevPopup);
        }

        render(siteMainElement, PopupViewClass.element, RenderPosition.BEFOREEND);
        document.body.classList.add('hide-overflow');
        const popupFilmDetailTable = document.querySelector('.film-details__table');
        const popupFilmDetailGenre = popupFilmDetailTable.querySelector('tr:last-child >td:last-child');
        for (let i = 0; i < cards[index].genre.randomGenresArray.length; i++) {
          const GenreViewClass = new GenreView(cards[index].genre.randomGenresArray[i]);
          render(popupFilmDetailGenre, GenreViewClass.element, RenderPosition.BEFOREEND);
        }

        const commentaryListSection = document.querySelector('.film-details__comments-list');
        for (let i = 0; i < cards[index].comments.randomCommentaryCount; i++) {
          const CommentsViewClass = new CommentsView(cards[index]);
          render(commentaryListSection, CommentsViewClass.element, RenderPosition.AFTERBEGIN);
        }

        const popup = document.querySelector('.film-details');
        const close = document.querySelector('.film-details__close-btn');

        close.addEventListener('click', () => {
          siteMainElement.removeChild(popup);
          document.body.classList.remove('hide-overflow');
        });
      });
    }
  });
};

generateClickCards();

render(siteFilmsListSection, ShowMoreButtonViewClass.element, RenderPosition.BEFOREEND);

const showMoreButton = document.querySelector('.films-list__show-more');
if (cards.length > CARDS_COUNT_TEMPLATES_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_TEMPLATES_PER_STEP;
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_TEMPLATES_PER_STEP)
      .forEach((card) => render(siteFilmsListSectionContainer, new CardView(card).element, RenderPosition.BEFOREEND));

    cardsPostersForClick = siteFilmsListSectionContainer.querySelectorAll('.film-card__poster');
    generateClickCards();
    renderedCardsCount += CARDS_COUNT_TEMPLATES_PER_STEP;
    if (renderedCardsCount >= cards.length) {
      siteFilmsListSection.removeChild(showMoreButton);
    }
  });
}

render(siteMainElement, StatisticsViewClass.element, RenderPosition.BEFOREEND);
render(siteFooterElement, FooterStatisticsViewClass.element, RenderPosition.BEFOREEND);

export {cards, cardsCount};
