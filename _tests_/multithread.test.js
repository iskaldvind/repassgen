import multithread from '../src/tools/multithread';
import jest from 'jest';

test('Test of test', () => {
  expect(multithread([1, 2, 3], x => x*x, [])).toBe([1, 4, 9]);
});