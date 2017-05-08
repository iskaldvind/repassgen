import * as Random from '../src/tools/random';

expect.extend({
  toBeIn(received, argument) {
    const pass = (argument.indexOf(received) !== -1);
    if (pass) {
      return {
        message: () => (
          `expected ${received} to be in ${argument}`
        ),
        pass: true,
      };
    }
    return {
      message: () => (`expected ${received} to be in ${argument}`),
      pass: false,
    };
  },
});

test('Random int: Should return integer', () => {
  expect(Number.isInteger(Random.int(1, 4))).toBeTruthy();
});

test('Random int: Should return "null" if passed less than two arguments', () => {
  expect(Random.int(1)).toBeNull();
});

test('Random int: Should return "null" if second argument is less than first argument', () => {
  expect(Random.int(3, 2)).toBeNull();
});

test('Random choice: Should return item from array', () => {
  expect(Random.choice(['a', 'b'])).toBeIn(['a', 'b']);
});

test('Random choice: Should return sole item from array containing one element', () => {
  expect(Random.choice(['c'])).toEqual('c');
});

test('Random choice: Should return "null" if choices array is empty', () => {
  expect(Random.choice([])).toBeNull();
});

test('Random choice: Should return "null" if none argument is passed', () => {
  expect(Random.choice()).toBeNull();
});

test('Random choice: Should return "null" if passed argument is not an array', () => {
  expect(Random.choice('a')).toBeNull();
});