import {createElement} from '../render.js';

const createGenreTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

export default class GenreView {
  #element = null;
  #genre = null;

  constructor(genre) {
    this.#genre = genre;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createGenreTemplate(this.#genre);
  }

  removeElement() {
    this.#element = null;
  }
}
