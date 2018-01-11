/* eslint-env jest, node */

import {
  addPseudoSelectors,
  colorsConverter,
  generateManualAtoms,
  integersConverter,
  lengthUnitsConverter,
  manualClassNameConverter,
} from './converters';

import config from './testConfig';

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