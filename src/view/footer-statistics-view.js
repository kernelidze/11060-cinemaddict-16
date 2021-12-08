import {cardsCount} from '../main.js';

export const createFooterStatisticsTemplate = () => (
  `<section class="footer__statistics">
    <p>${cardsCount} movies inside</p>
  </section>`
);
