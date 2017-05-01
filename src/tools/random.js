import seedrandom from 'seedrandom';

const rng = seedrandom();

export const int = (startingInteger, endingInteger) =>
Math.floor(rng() * ((endingInteger - startingInteger) + 1)) + startingInteger;

export const choice = array => array[int(0, array.length - 1)];
