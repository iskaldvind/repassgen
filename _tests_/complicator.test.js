import complexify from '../src/complicator';

expect.extend({
  toStrIntersect(received, argument) {
    const pass = (received.split('').filter(value => argument.split('').indexOf(value) !== -1).length > 0);
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

test('Complexify: if code is "a" should not transform "abcdefg"', () => {
  expect(complexify('a', 'abcdefg')).toEqual('abcdefg');
});

test('Complexify: if code is "A" should have some symbols from "ABCDEFG"', () => {
  expect(complexify('A', 'abcdefg')).toStrIntersect('ABCDEFG');
});

test('Complexify: if code is "n" should have some symbols from "2346789"', () => {
  expect(complexify('n', 'abcdefg')).toStrIntersect('2346789');
});

test('Complexify: if code is "N" should have some symbols from "ABCDEFG" and "2346789"', () => {
  expect(complexify('N', 'abcdefg')).toStrIntersect('ABCDEFG');
  expect(complexify('N', 'abcdefg')).toStrIntersect('2346789');
});

test('Complexify: if code is "s" should have some symbols from "!@#$%^&*-=?"', () => {
  expect(complexify('s', 'abcdefg')).toStrIntersect('!@#$%^&*-=?');
});

test('Complexify: if code is "S" should have some symbols from "ABCDEFG" and "!@#$%^&*-=?"', () => {
  expect(complexify('S', 'abcdefg')).toStrIntersect('ABCDEFG');
  expect(complexify('S', 'abcdefg')).toStrIntersect('!@#$%^&*-=?');
});

test('Complexify: if code is "f" should have some symbols from "2346789" and "!@#$%^&*-=?"', () => {
  expect(complexify('f', 'abcdefg')).toStrIntersect('2346789');
  expect(complexify('f', 'abcdefg')).toStrIntersect('!@#$%^&*-=?');
});

test('Complexify: if code is "f" should have some symbols from "2346789" and "!@#$%^&*-=?"', () => {
  expect(complexify('F', 'abcdefg')).toStrIntersect('ABCDEFG');
  expect(complexify('F', 'abcdefg')).toStrIntersect('2346789');
  expect(complexify('F', 'abcdefg')).toStrIntersect('!@#$%^&*-=?');
});

test('Complexify: must throw an Error if complexity code is invalid', () => {
  expect(() => complexify('o', 'abcdefg')).toThrowError();
});

test('Complexify: must throw an Error if no word provided', () => {
  expect(() => complexify('a')).toThrowError();
});

test('Complexify: must throw an Error if no arguments provided', () => {
  expect(() => complexify()).toThrowError();
});
