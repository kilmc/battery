/* eslint-env jest, node */

import {
  colorsPlugin,
  integersPlugin,
  lengthUnitsPlugin
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
  generateRegexSequencer
} from '../sequencers';

describe('buildClassNameRegex', () => {
  it('builds a regex with propName and value capture groups', () => {
    expect(buildClassNameRegex(integersPlugin)).toBeDefined();
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
      'lookup': {
        '0': {'colors': '(.*?)()?(black|white|pink)(_\\d+)?(.*)'},
        '3': {'colors': '(.*?)(bg-)?(black|white|pink)(_\\d+)?(.*)'},
        '5': {'colors': '(.*?)(fill-)?(black|white|pink)(_\\d+)?(.*)'}
      },
      'pattern': {
        '1': {
          'integers': '(.*?)(z)((\\d+|-\\d+))()?(.*)',
          'lengthUnits': '(.*?)(m)((\\d+|-\\d+))()?(.*)'
        },
        '2': {'lengthUnits': '(.*?)(bg)((\\d+|-\\d+))()?(.*)'}
      }
    });
  });
});