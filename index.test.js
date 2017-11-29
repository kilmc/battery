import { generate } from './index';

test('generate', () => {
  expect(generate('mt basis')).toBe('{"mt":{"margin-top":""},"basis":{"flex-basis":""}}');
});

