import dayjs from 'dayjs';
import {createElement} from '../render.js';

const createCardTemplate = (card) => {
  const {title, rating, year, filmDuration, genre, poster, description, comments, isWatched, isFavorite, isInWatchlist} = card;
  const date = dayjs(year).format('YYYY');

  const MAX_SYMBOLS = 140;

  let slicedDescription = description;

  if (description.length > MAX_SYMBOLS) {
    let slicedText = description.slice(0, MAX_SYMBOLS);
    slicedText = `${slicedText.substring(0, slicedText.length - 1)}...`;
    slicedDescription = slicedText;
  }

  const watchedClassName = isWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';

  const watchlistClassName = isInWatchlist
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre.randomGenresArray[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${slicedDescription}</p>
      <span class="film-card__comments">${comments.randomCommentaryCount} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class CardView {
  #element = null;
  #card = null;

  constructor(card) {
    this.#card = card;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCardTemplate(this.#card);
  }

  removeElement() {
    this.#element = null;
  }
}
