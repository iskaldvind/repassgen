import generate from '../src/generator';

const jsonData = require('../src/base.json');

const data = jsonData;

test('Generate: must return a string', () => {
  expect(typeof generate(data, 6) === 'string').toBeTruthy();
});

test('Generate: returned string length must be equal 6', () => {
  expect(generate(data, 6).length).toEqual(6);
});

test('Generate: returned string length must be equal 15', () => {
  expect(generate(data, 15).length).toEqual(15);
});

test('Generate: must throw an error if length < 6', () => {
  expect(() => generate(data, 5)).toThrowError();
});

test('Generate: must throw an error if length argument is not valid', () => {
  expect(() => generate(data, 'a')).toThrowError();
});

test('Generate: must throw an error if length argument is not passed', () => {
  expect(() => generate(data)).toThrowError();
});

test('Generate: must throw an error if data argument is not passed', () => {
  expect(() => generate()).toThrowError();
});