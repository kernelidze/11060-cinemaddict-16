import {getRandomInteger} from '../utils.js';

export const createCommentaryTemplate = (card) => {
  const {comments} = card;
  const {emojis, commentaryAuthor, commentaryDate, commentaryText} = comments;
  return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emojis[getRandomInteger(emojis.length - 1)]}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentaryText[getRandomInteger(commentaryText.length - 1)]}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentaryAuthor[getRandomInteger(commentaryAuthor.length - 1)]}</span>
          <span class="film-details__comment-day">${commentaryDate[getRandomInteger(commentaryDate.length - 1)]}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};
