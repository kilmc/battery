/* eslint-env jest, node */

import {
  colorsPlugin,
  integersPlugin,
  lengthUnitsPlugin,
} from './fixtures/plugins';

import {
  backgroundColor,
  backgroundSize,
  color,
  display,
  margin,
  fill,
  zIndex
} from './fixtures/props';

import { buildClassNameRegexFn } from '../src/regexes';

import {
  generateValuePluginRegexObj,
  generateRegexObj,
} from '../src/sequencers';

describe('buildClassNameRegexFn', () => {
  it('builds a regex with propName and value capture groups', () => {
    expect(buildClassNameRegexFn([integersPlugin])).toBeDefined();
  });
});

describe('generateRegexObj', () => {
  const lengthUnitPropNames = ['w','h','mt','px','min-h'];

  it('creates a regex for propNames grouped by length', () => {
    expect(generateRegexObj(
      'lengthUnits',
      lengthUnitPropNames,
      x => `(${x.join('|')})`
    )).toEqual({
      'lengthUnits': '(min-h|mt|px|w|h)'
    });
  });
});

describe('generatePluginRegexSequencer', () => {
  it('sorts propNames grouped by length by pluginName', () => {
    const plugins = [colorsPlugin,integersPlugin,lengthUnitsPlugin];
    const propConfigs = [
      backgroundColor, backgroundSize, color, display, margin, fill, zIndex
    ];

    expect(
      generateValuePluginRegexObj(plugins,propConfigs)
    ).toEqual( {
      'colors': '(^)(fill-|bg-|)(black|white|pink)(_\\d+)?($)',
      'integers': '(^)(z)(\\d+|-\\d+)()?($)',
      'lengthUnits': '(^)(bg|m)(-?[0-9]{1,4})(px|vh|vw|p|)?($)'
    });
  });
});