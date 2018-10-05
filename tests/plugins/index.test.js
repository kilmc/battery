/* eslint-env jest, node */

import { colorsPlugin, integersPlugin, pluginSet } from '../fixtures/plugins';

import { backgroundColor, order, zIndex } from '../fixtures/props';

import {
  createPluginsObject,
  getPluginPropConfigs,
  createPropNamesObject,
  getPluginType
} from '../../src/plugins/';

import { PLUGIN_TYPES } from '../../src/plugins/constants';

describe('getPluginType', () => {
  it('returns a patternType plugin object', () => {
    const patternType = getPluginType(PLUGIN_TYPES.PATTERN, pluginSet);
    const pluginName = Object.keys(patternType)[0];

    expect(patternType[pluginName].type).toEqual(PLUGIN_TYPES.PATTERN);
  });

  it('returns a lookupType plugin object', () => {
    const lookupType = getPluginType(PLUGIN_TYPES.LOOKUP, pluginSet);
    const pluginName = Object.keys(lookupType)[0];

    expect(lookupType[pluginName].type).toEqual(PLUGIN_TYPES.LOOKUP);
  });

  it('returns a classNameType plugin object', () => {
    const classNameType = getPluginType(PLUGIN_TYPES.CLASSNAME, pluginSet);
    const pluginName = Object.keys(classNameType)[0];

    expect(classNameType[pluginName].type).toEqual(PLUGIN_TYPES.CLASSNAME);
  });
});

describe('getPluginPropConfigs', () => {
  it('returns propConfig objects with the given plugin enabled', () => {
    const props = [backgroundColor, order, zIndex];
    const integerPropConfigs = getPluginPropConfigs('integers', props).map(
      x => x.prop
    );

    expect(integerPropConfigs).toEqual(['order', 'z-index']);
  });

  it('returns empty array if no propConfig enables the given plugin', () => {
    const props = [backgroundColor, order, zIndex];
    const noPropConfigs = getPluginPropConfigs('other', props).map(x => x.prop);

    expect(noPropConfigs).toEqual([]);
  });
});

describe('createPluginsObject', () => {
  it('format pluginConfigs into an object with pluginNames as keys', () => {
    const pluginConfigs = [colorsPlugin, integersPlugin];
    const pluginsObject = createPluginsObject(pluginConfigs);

    expect(Object.keys(pluginsObject)).toEqual(['colors', 'integers']);
  });
});

describe('createPropNamesObject', () => {
  it('gets all propNames (combined with their separators) for each plugin', () => {
    const propConfigs = [backgroundColor, order, zIndex];
    const pluginsObject = createPluginsObject([colorsPlugin, integersPlugin]);
    const pluginPropNames = createPropNamesObject(pluginsObject, propConfigs);

    expect(
      Object.keys(pluginPropNames).reduce(
        (accum, x) => accum.concat(pluginPropNames[x]),
        []
      )
    ).toEqual(['bg-', 'order', 'z']);
  });
});
