export const int = (startingInteger, endingInteger) =>
Math.floor(Math.random() * ((endingInteger - startingInteger) + 1)) + startingInteger;

export const choice = array => array[int(0, array.length - 1)];