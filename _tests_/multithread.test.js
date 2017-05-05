import multithread from '../src/tools/multithread';

test('Test of test', () => {
  expect(multithread([1, 2, 3], x => x * x)).toEqual([1, 4, 9]);
});