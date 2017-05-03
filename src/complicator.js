import * as Random from './tools/random';

const minComplexifyReplacementsPerType = 1;
const complexityRate = 0.1;

const compCaps = letter => letter.toUpperCase();
const compNums = () => Random.choice(['2', '3', '4', '6', '7', '8', '9']);
const compSyms = () => Random.choice(['!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '?']);
const complexityMatrix = { ASNF: compCaps, nNfF: compNums, sSfF: compSyms };
const refineMatrix = { l: ['n', 'm'], S: ['H', 'F'], I: ['A', 'E', 'U'], O: ['A', 'E', 'U'] };

const refine = password => password.split('').map((symbol) => {
  if (refineMatrix[symbol]) {
    return Random.choice(refineMatrix[symbol]);
  }
  return symbol;
}).join('');

const multiplyArray = (array, times, timesLeft, acc) => {
  const currentTimesLeft = timesLeft || times;
  const currentAcc = acc || [];
  if (timesLeft === 0) {
    return acc;
  }
  return multiplyArray(array, times, currentTimesLeft - 1, [...currentAcc, ...array]);
};

const getFunctionsToAppply = (options, replacementsPerType) =>
  multiplyArray(Object.keys(complexityMatrix)
    .filter(key => key.indexOf(options.passComplexity) > -1)
    .map(key => complexityMatrix[key]), replacementsPerType);

const modify = (options, password) => {
  const replacementsPerType = Math.max(minComplexifyReplacementsPerType,
    Math.floor(password.length * complexityRate));
  const functionsToApplySequence = getFunctionsToAppply(options, replacementsPerType);
  if (functionsToApplySequence.length === 0) {
    return password;
  }
  const splittedPassword = password.split('').reduce((acc, letter) => [...acc, [acc.length, 'um', letter]], []);
  const modifiedPassword = functionsToApplySequence.reduce((symbolData, appliedFunction) => {
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
    splittedPassword);
  return modifiedPassword.map(symbolData => symbolData[2]).join('');
};
