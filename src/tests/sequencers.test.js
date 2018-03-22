/* eslint-env jest, node */

import {
  colorsPlugin,
  integersPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

import {
  backgroundColor,
  backgroundSize,
  color,
  display,
  margin,
  fill,
  zIndex
} from '../fixtures/props';

import {
  buildClassNameRegex,
  generateValuePluginRegexSequencer,
  generateRegexSequencer,
  buildPrefixAndSuffixRegex
} from '../sequencers';

describe('buildPrefixAndSuffixRegex', () => {
  it('builds a regex from the prefix and suffix modifiers in className and atrule plugins', () => {
    expect(buildPrefixAndSuffixRegex([pseudosPlugin,breakpointsPlugin])).toEqual({
      'prefix': '(^|hover-|focus-)',
      'suffix': '(-sm|-md|-lg|$)'
    });
  });
});

describe('buildClassNameRegex', () => {
  it('builds a regex with propName and value capture groups', () => {
    expect(buildClassNameRegex([integersPlugin])).toBeDefined();
  });
});

describe('generateRegexSequencer', () => {
  const lengthUnitPropNames = ['w','h','mt','px','min-h'];

  it('creates a regex for propNames grouped by length', () => {
    expect(generateRegexSequencer(
      'lengthUnits',
      lengthUnitPropNames,
      x => `(${x.join('|')})`
    )).toEqual({
      '1': {'lengthUnits': '(w|h)'},
      '2': {'lengthUnits': '(mt|px)'},
      '5': {'lengthUnits': '(min-h)'}
    });
  });
});

describe('generatePluginRegexSequencer', () => {
  it('sorts propNames grouped by length by pluginName', () => {
    const plugins = [colorsPlugin,integersPlugin,lengthUnitsPlugin];
    const propConfigs = {
      backgroundColor, backgroundSize, color, display, margin, fill, zIndex
    };

    expect(
      generateValuePluginRegexSequencer(plugins,propConfigs)
    ).toEqual({
      '0': {'colors': '(^)()(black|white|pink)(_\\d+)?($)'},
      '2': {'lengthUnits': '(^)(bg)(\\d+|-\\d+)(|p|px|vh|vw)?($)'},
      '1': {
        'integers': '(^)(z)(\\d+|-\\d+)()?($)',
        'lengthUnits': '(^)(m)(\\d+|-\\d+)(|p|px|vh|vw)?($)'
      },
      '3': {'colors': '(^)(bg-)(black|white|pink)(_\\d+)?($)'},
      '5': {'colors': '(^)(fill-)(black|white|pink)(_\\d+)?($)'}
    });
  });
});