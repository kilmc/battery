/* eslint-env jest, node */
import {
  generateLibrary
} from '../../index';

import { generateAtRule } from '../generateCSS';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../../fixtures/plugins';

import { props } from '../../fixtures/props';

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

    });
  });
});