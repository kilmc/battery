/* eslint-env jest, node */

import {
  addPseudoSelectors,
  colorsConverter,
  convertSubProps,
  generateManualAtoms,
  integersConverter,
  lengthUnitsConverter,
  manualClassNameConverter,
} from './converters';

import config from './testConfig';

const subPropsTestConfig = {
  props: {
    margin: {
      prop: 'margin',
      propName: 'm',
      subProps: {
        't': 'top',
        'x': 'left right',
      },
      enableLengthUnits: true
    }
  },
};

const borderTestConfig = {
  props: {
    borderWidth: {
      prop: 'border-width',
      propName: 'border',
      subPropSeparator: '-',
      subProps: {
        'top': 'top',
        'x': 'left right',
      },
      enableLengthUnits: true
    }
  },
};

describe('convertSubProps', () => {
  it('creates propsConfigs from subProps', () => {
    expect(convertSubProps(subPropsTestConfig)).toEqual({
      'props': {
        'margin': {
          'enableLengthUnits': true,
          'prop': 'margin',
          'propName': 'm',
          'subProps': {'t': 'top', 'x': 'left right' }
        },
        'marginLeftRight': {
          'enableLengthUnits': true,
          'prop': 'margin-left margin-right',
          'propName': 'mx'
        },
        'marginTop': {
          'enableLengthUnits': true,
          'prop': 'margin-top',
          'propName': 'mt'
        }
      }
    });
  });

  it('reorders the naming convention for border props', () => {
    expect(convertSubProps(borderTestConfig)).toEqual({
      'props': {
        'borderWidth': {
          'enableLengthUnits': true,
          'prop': 'border-width',
          'propName': 'border',
          'subPropSeparator': '-',
          'subProps': {
            'top': 'top',
            'x': 'left right'
          }
        },
        'borderWidthTop': {
          'enableLengthUnits': true,
          'prop': 'border-top-width',
          'propName': 'border-top'
        },
        'borderWidthLeftRight': {
          'enableLengthUnits': true,
          'prop': 'border-left-width border-right-width',
          'propName': 'border-x'
        }
      }
    });
  });
});


describe('colorsConverter', () => {
  it('converts class names to atomObjects', () => {
    expect(colorsConverter(['bg-green-500','fill-green-700','green-800'],config)).toEqual({
      'bg-green-500': { 'background-color': '#25CB68' }, 'fill-green-700': { 'fill': '#05AF3C' }, 'green-800': { color: '#098530' }
    });
  });
});

describe('lengthUnitsConverter', () => {
  it('converts class names to atomObjects', () => {
    expect(lengthUnitsConverter(['bg100p','mx10','w100vw'],config)).toEqual({
      'bg100p': { 'background-size': '100%' },
      'mx10': { 'margin-left': '6rem', 'margin-right': '6rem' },
      'w100vw': { 'width': '100vw' }
    });
  });
});

describe('integersConverter', () => {
  it('converts class names to atomObjects', () => {
    expect(integersConverter(['z100','grow1','order-1'],config)).toEqual({
      'grow1': { 'grow': '1' },
      'order-1': { 'order': '-1' },
      'z100': { 'z-index': '100' }
    });
  });
});

describe('generateManualAtoms', () => {
  it('generates all manually defined classes in the props config', () => {
    expect(generateManualAtoms(config.props)).toEqual({
      'bg-contain': {'background-size': 'contain'},
      'bg-cover': {'background-size': 'cover'},
      'bg-full-height': {'background-size': 'auto 100%'},
      'bg-full-width': {'background-size': '100% auto'}
    });
  });
});

describe('manualClassNameConverter', () => {
  it('generates all manually defined classes in the props config', () => {
    expect(manualClassNameConverter(['bg-contain','bg-cover'],config)).toEqual({
      'bg-contain': {'background-size': 'contain'},
      'bg-cover': {'background-size': 'cover'}
    });
  });
});

describe('addPseudoSelectors', () => {
  const pseudoInputClasses = {
    'hover-text-underline': { 'text-decoration': 'underline' },
    'focus-outline-green-500': { outline: '#25CB68' }
  };

  it('adds a pseudo selector to the end of the object keys', () => {
    expect(addPseudoSelectors(pseudoInputClasses,config.css.pseudoSelectors))
      .toEqual({
        'hover-text-underline:hover': { 'text-decoration': 'underline' },
        'focus-outline-green-500:focus': { outline: '#25CB68' }
      });
  });
});