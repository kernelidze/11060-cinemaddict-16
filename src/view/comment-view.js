import {getRandomInteger} from '../utils.js';

export const createCommentaryTemplate = (card) => {
  const {comments} = card;

  return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments.emojis[getRandomInteger(comments.emojis.length - 1)]}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comments.commentaryText[getRandomInteger(comments.commentaryText.length - 1)]}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments.commentaryAuthor[getRandomInteger(comments.commentaryAuthor.length - 1)]}</span>
          <span class="film-details__comment-day">${comments.commentaryDate[getRandomInteger(comments.commentaryDate.length - 1)]}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};
