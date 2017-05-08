import * as Random from './tools/random';

const maxGenerationTries = 100;

const initWord = (genData) => {
  const initialHead = Random.choice(['vovels', 'consonants']) === 'vovels' ?
    Random.choice(Object.keys(genData).filter(key => key !== '_')) : '_';
  const initialContent = Random.choice(genData[initialHead]);
  const initialNoDashHead = initialHead !== '_' ? initialHead : '';
  const [initialBody, initialTail] = [...initialContent];
  const initialWord = `${initialNoDashHead}${initialBody}${initialTail}`;
  return [initialWord, initialTail];
};

const buildWord = (genData, requiredLength, previousWord = '', previousWordTail = '') => {
  const [currentWord, currentWordTail] = previousWord.length ?
    [previousWord, previousWordTail] : initWord(genData);
  if (!genData[currentWordTail]) {
    return { isFailed: true, word: '' };
  }
  if (currentWord.length >= requiredLength) {
    const trimmedWord = currentWord.slice(0, requiredLength);
    return { isFailed: false, word: trimmedWord };
  }
  const nextContent = Random.choice(genData[currentWordTail]);
  const [nextBody, nextTail] = [...nextContent];
  const nextWord = `${currentWord}${nextBody}${nextTail}`;
  return buildWord(genData, requiredLength, nextWord, nextTail);
};

const generatePassword = (genData, requiredLength, triesLeft) => {
  if (!triesLeft) {
    throw new Error(`Generator Error: Unable to generate password in ${maxGenerationTries} tries.`);
  }
  const { isFailed, word } = buildWord(genData, requiredLength);
  if (isFailed) {
    const nextTriesLeft = triesLeft - 1;
    return generatePassword(genData, requiredLength, nextTriesLeft);
  }
  return word;
};

const generate = (genData, requiredLength) => {
  if (!genData || Object.keys(genData).length === 0) {
    throw new Error('Generator Error: Generation database not available or empty.');
  }
  return generatePassword(genData, requiredLength, maxGenerationTries);
};

export default generate;
