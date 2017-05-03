import * as Random from './tools/random';

const maxGenerationTries = 100;

function Gen

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

const generate = (requiredLength, genData) => {

};

export default generate;
