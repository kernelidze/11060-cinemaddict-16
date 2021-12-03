import {getRandomInteger} from '../utils.js';

export const createGenreTemplate = (card) => {
  const {genre} = card;
  return `<span class="film-details__genre">${genre[getRandomInteger(genre.length - 1)]}</span>`;
};
