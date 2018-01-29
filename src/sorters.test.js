/* eslint-env jest, node */

import {
  generateFeatureRegex,
  generateColorsRegex,
  generateManualClassNameRegex,
  generateRegexes,
  sortBreakpoints,
  sortClasses,
  sortKeys
} from './sorters';

import config from './testConfig';

describe('generateFeatureRegex', () => {
  it('generates key value pair of the bucket name and regex string', () => {
    expect(generateFeatureRegex({
      name: 'integers',
      regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`,
      config: config.props
    })).toEqual({'integers': '((grow|order|z)(\\d+|-\\d+))'});
  });
});

describe('generateColorsRegex', () => {
  it('generates a regex string of all color names', () => {
    expect(generateColorsRegex(config.colors))
      .toEqual({'colors': '(green-800|green-700|green-500)'});
  });
});

describe('generateManualClassNameRegex', () => {
  it('', () => {
    expect(generateManualClassNameRegex(config.props))
      .toEqual({'manualClasses': '(bg-cover|bg-contain|bg-full-height|bg-full-width)'});
  });
});

describe('generateRegexes', () => {
  it('generates an object with regexes for each bucket', () => {
    expect(generateRegexes(config)).toEqual({
      'colors': '(green-800|green-700|green-500)',
      'integers': '((grow|order|z)(\\d+|-\\d+))',
      'lengthUnits': '((bg|m|w|mt|mr|mb|ml|mx|my)(\\d+|-\\d+))',
      'manualClasses': '(bg-cover|bg-contain|bg-full-height|bg-full-width)'
    });
  });
});

describe('sortClasses', () => {
  it('sorts classes into their correct buckets', () => {
    expect(sortClasses(
      ['bg100p','z100','hover-green-500','mx10-sm','bg-cover','js-toggle'],
      config))
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
    expect(sortBreakpoints(responsiveClasses,config.breakpoints))
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

describe('sortKeys', () => {
  it('should create an object which sorts the array items by length', () => {
    expect(sortKeys('lengthUnits',['border','min-h','mt','t'])).toEqual({
      6: { lengthUnits: ['border']},
      5: { lengthUnits: ['min-h']},
      2: { lengthUnits: ['mt']},
      1: { lengthUnits: ['t']}
    });
  });
});
