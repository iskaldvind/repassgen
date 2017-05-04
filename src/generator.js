import * as Random from './tools/random';

const maxGenerationTries = 100;

const initSequence = (genData) => {
  const initialHead = Random.choice(['vovels', 'consonants']) === 'vovels' ?
    Random.choice(Object.keys(genData).filter(key => key !== '_')) : '_';
  const initialContent = Random.choice(genData[initialHead]);
  const initialNoDashHead = initialHead !== '_' ? initialHead : '';
  const [initialBody, initialTail] = [...initialContent];
  const initialSequence = `${initialNoDashHead}${initialBody}${initialTail}`;
  return [initialSequence, initialTail];
};

const buildSequence = (genData, requiredLength, previousSequence = '', previousSequenceTail = '') => {
  const [currentSequence, currentSequenceTail] = previousSequence.length ?
    [previousSequence, previousSequenceTail] : initSequence(genData);
  if (!genData[currentSequenceTail]) {
    return { isFailed: true, sequence: '' };
  }
  if (currentSequence.length >= requiredLength) {
    const trimmedSequence = currentSequence.slice(0, requiredLength);
    return { isFailed: false, sequence: trimmedSequence };
  }
  const nextContent = Random.choice(genData[currentSequenceTail]);
  const [nextBody, nextTail] = [...nextContent];
  const nextSequence = `${currentSequence}${nextBody}${nextTail}`;
  return buildSequence(genData, requiredLength, nextSequence, nextTail);
};

const generatePassword = (genData, requiredLength, triesLeft) => {
  if (!triesLeft) {
    throw new Error('Generator Error: ', `Unable to generate password in ${maxGenerationTries} tries.`);
  }
  const { isFailed, sequence } = buildSequence(genData, requiredLength);
  if (isFailed) {
    const nextTriesLeft = triesLeft - 1;
    return generatePassword(genData, requiredLength, nextTriesLeft);
  }
  return sequence;
};

const generate = (genData, requiredLength) => {
  if (!genData || Object.keys(genData).length === 0) {
    throw new Error('Generator Error: ', 'Generation database not available or empty.');
  }
  return generatePassword(genData, requiredLength, maxGenerationTries);
};

export default generate;
