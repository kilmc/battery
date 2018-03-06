/* eslint-env jest, node */
import { createPlugin, sortClassNames } from './processors';

const integerPlugin = {
  name: 'integers',
  regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`,
};

const integerClassNames = ['z100','order2','order-1','grow3'];

describe('sortClassNames', () => {
  expect(sortClassNames(['z','order','grow'],integerPlugin.regexFn)).toBe('{}');
});

describe('createPlugin', () => {
  it('creates a plugin function for a given pluginConfig', () => {
    expect(createPlugin(integerPlugin)).toBeCalled();
  });
});



