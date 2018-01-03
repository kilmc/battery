/* eslint-env jest, node */

import {
  generate,
  generateColorsRegex,
  generateLengthUnitRegex,
  generateManualClassNameRegex,
  generateRegexes,
} from './index';

import config from './config';

const testConfig = {
  colors: {
    'green-800': '#098530',
    'green-700': '#05AF3C',
    'green-500': '#25CB68'
  },
  props: {
    backgroundSize: {
      prop: 'background-size',
      propName: 'bg',
      enableLengthUnits: true,
      manual: {
        separator: '-',
        values: {
          'cover': 'cover',
          'contain': 'contain',
          'full-height': 'auto 100%',
          'full-width': '100% auto'
        }
      }
    }
  }
};


const propsConfig = {
  'basis': 'flex-basis',
  'mt': 'margin-top'
};

describe('generate', () => {
  expect(generate('mt basis', propsConfig)).toBe('{"mt":{"margin-top":""},"basis":{"flex-basis":""}}');
});

test('generateManualClassNameRegex', () => {
  expect(generateManualClassNameRegex(testConfig.props)).toMatchSnapshot();
});

test('generateLengthUnitRegex', () => {
  expect(generateLengthUnitRegex(testConfig.props)).toMatchSnapshot();
});

test('generateColorsRegex', () => {
  expect(generateColorsRegex(testConfig.colors)).toMatchSnapshot();
});

test('generateRegexes', () => {
  expect(generateRegexes(testConfig)).toMatchSnapshot();
});
