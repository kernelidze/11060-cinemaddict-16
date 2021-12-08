import dayjs from 'dayjs';
import {getRandomInteger, getRandomNumber, getRandomRangeFromArray} from '../utils.js';

const generateCardTitle = () => {
  const titles = [
    'Gladiator',
    'South Park',
    'Simpsons',
    'Sweet November',
    'Fate Zero'
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};

const generateCardRating = () => {
  const MIN_RATING = 0;
  const MAX_RATING = 10;
  const DECIMAL_RATING = 1;
  const cardRating = getRandomNumber(MIN_RATING, MAX_RATING, DECIMAL_RATING);
  return cardRating;
};

const generateCardYear = () => {
  const MAX_YEAR_GAP = 70;
  const yearsGap = getRandomInteger(-MAX_YEAR_GAP, 0);
  return dayjs().add(yearsGap, 'year').toDate();
};

const generateCardDuration = () => {
  const MIN_HOURS_DURATION = 0;
  const MAX_HOURS_DURATION = 3;
  const MIN_MINUTES_DURATION = 0;
  const MAX_MINUTES_DURATION = 59;
  const cardDuration = `${getRandomInteger(MIN_HOURS_DURATION, MAX_HOURS_DURATION)  }h ${  getRandomInteger(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION)  }m`;
  return cardDuration;
};

const generateCardGenre = () => {
  const randomGenresCount = getRandomInteger(1, 4);
  const genres = [
    'Comedy',
    'Musical',
    'Cartoon',
    'Drama',
    'Action'
  ];
  const randomGenresArray = getRandomRangeFromArray(genres);
  return {randomGenresArray, randomGenresCount};
};

const generateCardPoster = () => {
  const posters = [
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-great-flamarion.jpg',
    'made-for-each-other.png',
    'the-man-with-the-golden-arm.jpg'
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

const generateCardDescription = () => {
  const MAX_FILM_SENTENCES = 5;
  const filmDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  let filmDescriptionArray = filmDescription.split('. ');
  filmDescriptionArray = getRandomRangeFromArray(filmDescriptionArray);
  const filmDescriptionShuffledText = filmDescriptionArray.slice(0, getRandomInteger(MAX_FILM_SENTENCES)).join('. ');
  return `${filmDescriptionShuffledText}.`;
};


const generateCardCommentary = () => {
  const randomCommentaryCount = getRandomInteger(1, 6);
  const MAX_HOUR_GAP = 100000;
  const commentaryDate = [];
  const maxCommentsDateCount = getRandomInteger(10, 50);

  for (let i = 0; i <= maxCommentsDateCount; i++) {
    const hourGap = getRandomInteger(-MAX_HOUR_GAP, 0);
    dayjs().add(hourGap, 'minute').toDate();
    const date = dayjs().add(hourGap, 'second').toDate();
    commentaryDate[i] = dayjs(date).format('YYYY/MM/DD HH:mm:ss');
    commentaryDate.push(commentaryDate[i]);
  }

  const emojis = [
    'angry.png',
    'puke.png',
    'smile.png',
    'sleeping.png',
  ];

  const commentaryText = [
    'Best!',
    'Terrible!',
    'Awesome!',
    'Ugly!'
  ];

  const commentaryAuthor = [
    'John',
    'Elly',
    'Mary',
    'Jane',
    'Keanu'
  ];

  return {emojis, commentaryText, commentaryAuthor, commentaryDate, randomCommentaryCount};
};

export const generateCard = () => ({
  title: generateCardTitle(),
  rating: generateCardRating(),
  year: generateCardYear(),
  filmDuration: generateCardDuration(),
  genre: generateCardGenre(),
  poster: generateCardPoster(),
  description: generateCardDescription(),
  comments: generateCardCommentary(),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  isInWatchlist: Boolean(getRandomInteger(0, 1))
});

