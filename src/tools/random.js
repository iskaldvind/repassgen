import seedrandom from 'seedrandom';

const getRandom = seedrandom(`${Date.now()}`, { entropy: true });

export const int = (startingInteger, endingInteger) => {
  if (!(Number.isInteger(startingInteger)) || !(Number.isInteger(endingInteger)) ||
    endingInteger < startingInteger) {
    return null;
  }
  return Math.floor(getRandom() * ((endingInteger - startingInteger) + 1)) + startingInteger;
};

export const choice = (array) => {
  if (array === undefined || !(Array.isArray(array)) || array.length === 0) {
    return null;
  }
  return array[int(0, array.length - 1)];
};
