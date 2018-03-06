/* eslint-env jest, node */

import {
  generateFeatureRegex,
  generateColorsRegex,
  generateManualClassNameRegex,
  generateRegexes,
  sortBreakpoints,
  sortClasses,
  generateRegexGroups
} from './sorters';

import config from './testConfig';

describe('generateFeatureRegex', () => {
  it('generates key value pair of the bucket name and regex string', () => {
    expect(generateFeatureRegex({
      name: 'integers',
      regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`,
      config: config.props
    })).toEqual({
      '1': {'integers': '((z)(\\d+|-\\d+))'},
      '4': {'integers': '((grow)(\\d+|-\\d+))'},
      '5': {'integers': '((order)(\\d+|-\\d+))'}
    });
  });
});

describe('generateColorsRegex', () => {
  it('generates a regex string of all color names', () => {
    expect(generateColorsRegex(config.colors))
      .toEqual({'9': {'colors': '(green-800|green-700|green-500)'}});
  });
});

describe('generateManualClassNameRegex', () => {
  it('', () => {
    expect(generateManualClassNameRegex(config.props))
      .toEqual({
        '10': {'manualClasses': '(bg-contain)'},
        '13': {'manualClasses': '(bg-full-width)'},
        '14': {'manualClasses': '(bg-full-height)'},
        '8': {'manualClasses': '(bg-cover)'}
      });
  });
});

describe('generateRegexes', () => {
  it('generates an object with regexes for each bucket', () => {
    expect(generateRegexes(config)).toEqual({
      '1': {
        'lengthUnits': '((m|w)(\\d+|-\\d+))',
        'integers': '((z)(\\d+|-\\d+))'
      },
      '10': {'manualClasses': '(bg-contain)'},
      '13': {'manualClasses': '(bg-full-width)'},
      '14': {'manualClasses': '(bg-full-height)'},
      '2': {'lengthUnits': '((bg|mt|mr|mb|ml|mx|my)(\\d+|-\\d+))'},
      '4': {'integers': '((grow)(\\d+|-\\d+))'},
      '5': {'integers': '((order)(\\d+|-\\d+))'},
      '8': {'manualClasses': '(bg-cover)'},
      '9': {'colors': '(green-800|green-700|green-500)'}});
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

describe('generateRegexGroups', () => {
  it('should create an object which sorts the array items by length', () => {
    expect(generateRegexGroups(
      'lengthUnits',
      ['border','min-h','mt','t'],
      (x) => `((${x.join('|')})(\\d+|-\\d+))`)
    ).toEqual({
      '1': {'lengthUnits': '((t)(\\d+|-\\d+))'},
      '2': {'lengthUnits': '((mt)(\\d+|-\\d+))'},
      '5': {'lengthUnits': '((min-h)(\\d+|-\\d+))'},
      '6': {'lengthUnits': '((border)(\\d+|-\\d+))'}
    });
  });
});
