/* eslint-env jest, node */

import { sortClassNames } from '../sorters';
import { generateValuePluginRegexSequencer } from '../sequencers';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

import {
  integerClassNames,
  colorClassNames,
  lengthUnits
} from '../fixtures/classNames';

import { props } from '../fixtures/props';

const testPlugins = [
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
];

const testClasses = integerClassNames.concat(colorClassNames,lengthUnits);
const pluginRegexes = generateValuePluginRegexSequencer(testPlugins,props);

const checkObjectKey = (key,obj) => {
  return expect(Object.keys(obj)).toContain(key);
};

const checkArrayContents = (item,arr) => {
  expect(arr).toContain(item);
};

describe('sortClassNames', () => {
  it('sort classnames into plugin groups', () => {
    const sortedClassNames = sortClassNames(testClasses,pluginRegexes);

    ['colors','integers','lengthUnits'].forEach(pluginName => {
      checkObjectKey(pluginName,sortedClassNames);
    });

    ['bg-black','fill-pink','white','bg-white','pink'].forEach(className => {
      checkArrayContents(className,sortedClassNames['colors']);
    });

    ['z100','grow2','z-1'].forEach(className => {
      checkArrayContents(className,sortedClassNames['integers']);
    });

    ['bg100p','m2'].forEach(className => {
      checkArrayContents(className,sortedClassNames['lengthUnits']);
    });
  });

  it('ignores className modifiers when sorting', () => {
    const mdIntegerClassNames = integerClassNames.map(x => `${x}-md`);
    const lgLengthUnits = lengthUnits.map(x => `${x}-lg`);
    const hoverColorClassNames = colorClassNames.map(x => `hover-${x}`);
    const testClassesWithModifiers = mdIntegerClassNames.concat(lgLengthUnits,hoverColorClassNames);

    const sortedClassNames = sortClassNames(testClassesWithModifiers,pluginRegexes);

    ['colors','integers','lengthUnits'].forEach(pluginName => {
      checkObjectKey(pluginName,sortedClassNames);
    });

    ['hover-fill-pink','hover-bg-black','hover-bg-white','hover-white','hover-pink'].forEach(className => {
      checkArrayContents(className,sortedClassNames['colors']);
    });

    ['grow2-md', 'z100-md', 'z-1-md'].forEach(className => {
      checkArrayContents(className,sortedClassNames['integers']);
    });

    ['bg100p-lg', 'm2-lg'].forEach(className => {
      checkArrayContents(className,sortedClassNames['lengthUnits']);
    });
  });
});
