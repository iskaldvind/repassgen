import seedrandom from 'seedrandom';

const getRandom = () => seedrandom(Date.now());

export const int = (startingInteger, endingInteger) =>
Math.floor(getRandom() * ((endingInteger - startingInteger) + 1)) + startingInteger;

export const choice = array => array[int(0, array.length - 1)];
