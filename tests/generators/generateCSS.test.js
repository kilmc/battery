/* eslint-env jest, node */
import { generateLibrary } from '../../src/generators/';
import { generateAtRule } from '../../src/generators/generateAtRules';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

import { props } from '../fixtures/props';

const config = {
  props,
  settings: {
    enableKeywordValues: true,
  },
  plugins: [
    lengthUnitsPlugin,
    integersPlugin,
    colorsPlugin,
    pseudosPlugin,
    breakpointsPlugin
  ]
};

const lengthUnitClassnames = ['bg100p-md','w100vw-lg','m10-sm'];
const integerClassnames = ['z100-md','grow2-lg','order-1-sm','flex2-sm'];
const colorClassnames = ['bg-pink','black-md','fill-white-lg','bg-black_20-sm'];
const keywordClasses = ['hover-bg-cover-md','flex-lg','inline-block','block'];

const library = generateLibrary(
  [
    ...integerClassnames,
    ...colorClassnames,
    ...keywordClasses,
    ...lengthUnitClassnames
  ],
  config
);


describe('generateLibrary', () => {
  it('processes integer classes', () => {
    expect(generateAtRule(library,breakpointsPlugin)).toEqual({
      'lg': {
        'fill-white-lg': {'fill': '#FFFFFF'},
        'flex-lg': {'display': 'flex'},
        'grow2-lg': {'grow': '2'}
      },
      'md': {
        'bg100p-md': {'background-size': '100%'},
        'black-md': {'color': '#000000'},
        'hover-bg-cover-md': {'background-size': 'cover'},
        'z100-md': {'z-index': '100'}
      },
      'sm': {
        'bg-black_20-sm': {'background-color': 'rgba(0,0,0,0.2)'},
        'm10-sm': {'margin': '6rem'},
        'order-1-sm': {'order': '-1'}
      }
    });
  });
});