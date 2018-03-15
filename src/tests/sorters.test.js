/* eslint-env jest, node */

import { sortClassNamesByPlugin } from '../sorters';
import { generateValuePluginRegexSequencer } from '../sequencers';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin
} from '../fixtures/plugins';

import {
  integerClassNames,
  colorClassNames,
  lengthUnits
} from '../fixtures/classNames';

import { props } from '../fixtures/props';

const testPlugins = [integersPlugin, colorsPlugin, lengthUnitsPlugin];
const testClasses = integerClassNames.concat(colorClassNames,lengthUnits);

const pluginRegexes = generateValuePluginRegexSequencer(testPlugins,props);

describe('sortClassNamesByPlugin', () => {
  it('sort classnames into plugin groups', () => {
    expect(sortClassNamesByPlugin(testClasses,pluginRegexes)).toEqual({
      'colors': ['fill-pink','bg-black','bg-white','white','pink'],
      'integers': ['grow2', 'z100', 'z-1'],
      'lengthUnits': ['bg100p', 'm2']
    });
  });

  it('ignores className modifiers when sorting', () => {
    const mdIntegerClassNames = integerClassNames.map(x => `${x}-md`);
    const lgLengthUnits = lengthUnits.map(x => `${x}-lg`);
    const hoverColorClassNames = colorClassNames.map(x => `hover-${x}`);

    const testClassesWithModifiers = mdIntegerClassNames.concat(lgLengthUnits,hoverColorClassNames);

    expect(sortClassNamesByPlugin(testClassesWithModifiers,pluginRegexes)).toEqual({
      'colors': ['hover-fill-pink','hover-bg-black','hover-bg-white','hover-white','hover-pink'],
      'integers': ['grow2-md', 'z100-md', 'z-1-md'],
      'lengthUnits': ['bg100p-lg', 'm2-lg']
    });
  });
});
