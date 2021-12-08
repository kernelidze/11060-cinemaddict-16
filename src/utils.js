const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomNumber(min, max, numberOfSigns) {
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomNumber = Math.random() * (max - min) + min;
  const fixedNumber = Number(randomNumber.toFixed(numberOfSigns));
  return (fixedNumber);
}

function getRandomRangeFromArray(array) {
  const newArrayLength = getRandomInteger(1, array.length);
  const newShuffleArray = array.sort(() => Math.random() - 0.5);
  return newShuffleArray.slice(0, newArrayLength);
}

export {getRandomInteger, getRandomNumber, getRandomRangeFromArray};
