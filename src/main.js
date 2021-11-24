import {renderTemplate, RenderPosition} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createCardTemplate} from './view/card-view.js';
import {createShowMoreButtonTemplate} from './view/show-more-button-view.js';
import {createPopupTemplate} from './view/popup-film-details-view.js';

const CARDS_COUNT = 5;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsListContainer = document.createElement('div');
filmsListContainer.classList.add('films-list__container');
siteMainElement.appendChild(filmsListContainer);

renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);
for (let i = 0; i < CARDS_COUNT; i++) {
  renderTemplate(filmsListContainer, createCardTemplate(), RenderPosition.BEFOREEND);
}
renderTemplate(siteMainElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createPopupTemplate(), RenderPosition.BEFOREEND);

