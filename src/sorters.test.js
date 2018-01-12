/* eslint-env jest, node */

import {
  generateBucketRegex,
  generateColorsRegex,
  generateManualClassNameRegex,
  generateRegexes,
  sortBreakpoints,
  sortClasses
} from './sorters';

import testConfig from './testConfig';

describe('generateBucketRegex', () => {
  it('generates key value pair of the bucket name and regex string', () => {
    expect(generateBucketRegex(
      'integers',
      '(propNames(\\d+|-\\d+))',
      testConfig.props
    )).toEqual({'integers': '((grow|order|z)(\\d+|-\\d+))'});
  });
});

describe('generateColorsRegex', () => {
  it('generates a regex string of all color names', () => {
    expect(generateColorsRegex(testConfig.colors))
      .toEqual({'colors': '(green-800|green-700|green-500)'});
  });
});

describe('generateManualClassNameRegex', () => {
  it('', () => {
    expect(generateManualClassNameRegex(testConfig.props))
      .toEqual({'manualClasses': '(bg-cover|bg-contain|bg-full-height|bg-full-width)'});
  });
});

describe('generateRegexes', () => {
  it('generates an object with regexes for each bucket', () => {
    expect(generateRegexes(testConfig)).toEqual({
      'colors': '(green-800|green-700|green-500)',
      'integers': '((grow|order|z)(\\d+|-\\d+))',
      'lengthUnits': '((bg|mx|w)(\\d+|-\\d+))',
      'manualClasses': '(bg-cover|bg-contain|bg-full-height|bg-full-width)'
    });
  });
});

describe('sortClasses', () => {
  it('sorts classes into their correct buckets', () => {
    expect(sortClasses(
      ['bg100p','z100','hover-green-500','mx10-sm','bg-cover','js-toggle'],
      testConfig))
      .toEqual({
        'colors': ['hover-green-500'],
        'integers': ['z100'],
        'leftovers': ['js-toggle'],
        'lengthUnits': ['bg100p', 'mx10-sm'],
        'manualClasses': ['bg-cover']
      });
  });
});

describe('sortBreakpoints', () => {
  const responsiveClasses = {
    left: { 'float': 'left' },
    'text-center-sm': { 'text-align': 'center' },
    'block-md': { display: 'block' },
    'my10-lg': { 'margin-top': '6rem', 'margin-bottom': '6rem' }
  };
  it('', () => {
    expect(sortBreakpoints(responsiveClasses,testConfig.breakpoints))
      .toEqual({
        'all': {
          'left': {'float': 'left'}
        },
        'lg': {
          'my10-lg': {'margin-bottom': '6rem', 'margin-top': '6rem'}
        },
        'md': {
          'block-md': {'display': 'block'}
        },
        'sm': {
          'text-center-sm': {'text-align': 'center'}
        }
      });
  });
});
