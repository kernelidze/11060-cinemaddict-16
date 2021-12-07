import {cards, cardsCount} from './main.js';

const mainNavigationItemsCount = () => {
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
  return {favoriteCardsCount, watchedCardsCount, inWatchlistCardsCount};
};

export {mainNavigationItemsCount};
