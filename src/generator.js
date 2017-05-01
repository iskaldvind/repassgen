import * as Random from './tools/random';

const maxGenerationTries = 100;
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
    password.length * complexityRate);
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

const buildInitialSequence = (data) => {
  const head = Random.choice(['vovels', 'consonants']) === 'vovels' ?
    Random.choice(Object.keys(data).filter(key => key !== '_')) :
    '_';
  const content = Random.choice(data[head]);
  const goodHead = head === '_' ? '' : head;
  const body = content[0];
  const tail = content[1];
  return [`${goodHead}${body}${tail}`, tail];
};

const sequenceBuildIter = (options, data, triesLeft = maxGenerationTries, sequence, tail) => {
  if (triesLeft === 0) {
    return { err: `Unable to build password for ${maxGenerationTries} tries. Please report to the project page.`, password: '' };
  }
  const [currentSequence, currentTail] = sequence ?
    [sequence, tail] : buildInitialSequence(data);
  if (Object.keys(data).indexOf(currentTail) === -1) {
    return sequenceBuildIter(options, data, triesLeft - 1);
  }
  const nextContent = Random.choice(data[currentTail]);
  const nextBody = nextContent[0];
  const nextTail = nextContent[1];
  const nextSequence = `${currentSequence}${nextBody}${nextTail}`;
  if (nextSequence.length >= options.passLength) {
    return { err: '', password: nextSequence.slice(0, options.passLength) };
  }
  return sequenceBuildIter(options, data, triesLeft, nextSequence, nextTail);
};

const generateIter = (options, data, amountLeft, passwords = []) => {
  if (amountLeft === 0) {
    return { err: '', passwords };
  }
  const genResult = sequenceBuildIter(options, data);
  if (genResult.err) {
    return { err: genResult.err, passwords: [] };
  }
  const nextAmount = amountLeft ? amountLeft - 1 : options.passAmount - 1;
  const nextPasswords = [...passwords, genResult.password];
  return generateIter(options, data, nextAmount, nextPasswords);
};

const generator = (options, data) => {
  const passwordsGenerationResult = generateIter(options, data);
  if (passwordsGenerationResult.err) {
    return `Error: ${passwordsGenerationResult.err}`;
  }
  const complexifiedPasswords = passwordsGenerationResult.passwords
    .map(password => modify(options, password));
  const refinedPasswords = complexifiedPasswords.map(password => refine(password));
  return refinedPasswords.reduce((acc, password) => `${acc}${password}\n`, '');
};

const generate = (options, data) => {
  console.log(generator(options, data));
};

export default generate;
