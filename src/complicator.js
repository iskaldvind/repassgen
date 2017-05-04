import * as Random from './tools/random';
import {serial} from './tools/multifunctions';

const minComplexifyReplacementsPerType = 1;
const complexityRate = 0.1;

const caps = letter => letter.toUpperCase();
const nums = () => Random.choice(['2', '3', '4', '6', '7', '8', '9']);
const syms = () => Random.choice(['!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '?']);
const refineMatrix = { l: ['n', 'm'], S: ['H', 'F'], I: ['A', 'E', 'U'], O: ['A', 'E', 'U'] };

const refine = password => password.split('').map((symbol) => {
  if (refineMatrix[symbol]) {
    return Random.choice(refineMatrix[symbol]);
  }
  return symbol;
}).join('');

const numberOfSubstitutions = word =>
  Math.min(word.length * complexityRate, minComplexifyReplacementsPerType);

const inflateArray = (set, repeatEach, repeatCurrent, acc) => {
  if (set.length === 0) {
    return acc;
  }
  if (repeatCurrent === 0) {
    const nextSet = set.slice(1);
    return inflateArray(nextSet, repeatEach, repeatEach, acc);
  }
  return inflateArray(set, repeatEach, repeatCurrent - 1, [...acc, set[0]]);
};

const getFunctionsQueue = (options, numberOfEarch) => {
  const functionsSet = Object.keys(options).filter(key => !!options[key]);
  const newQueue = [];
  return inflateArray(functionsSet, numberOfEarch, numberOfEarch, newQueue);
};

const modify = (word, options) => {
  const functionsQueue = getFunctionsQueue(options, numberOfSubstitutions(word.length));
  const splittedWord = word.split('').reduce((acc, letter) => [...acc, [acc.length, 'um', letter]], []);
  const modifiedSplittedWord = functionsQueue.reduce((symbolData, appliedFunction) => {
    const unmodifiedLettersIndices = symbolData.reduce((acc, entry) => {
      if (entry[1] === 'um') {
        return [...acc, entry[0]];
      }
      return acc;
    }, []);
    const indexToModify = Random.choice(unmodifiedLettersIndices);
    const letterToModify = symbolData[indexToModify][2];
    const newSymbol = appliedFunction(letterToModify);
    return [...symbolData.slice(0, indexToModify), [indexToModify, 'mo', newSymbol], ...symbolData.slice(indexToModify + 1)];
  },
  splittedWord);
  return modifiedSplittedWord.map(record => record[2]).join('');
};

const complexify = (word, options = { caps: false, nums: false, syms: false }) => {
  if (!word || typeof word !== 'string') {
    throw new Error('Complicator Error: ', 'No valid string to complexify provided.');
  }
  return modify(word, options);
};

export default  complexify;