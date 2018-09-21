import deepmerge from 'deepmerge';
import { buildClassNameRegexFn, buildValuePluginRegex } from './regexes/index';
import { createPropNamesObject, createPluginsObject } from './plugins/index';
import { PLUGIN_TYPES } from './plugins/constants';
import { PropConfig, PluginConfig, PluginsObject } from './types/index';

export const generateRegexObj = (
  groupName: string,
  arr: string[],
  regexFn: (a: string[]) => string
): { [key: string]: string } => {
  const sorted: { [key: string]: string[] } = arr
    .sort((a, b) => b.length - a.length)
    .reduce((xs: { [key: string]: string[] }, x) => {
      !xs[groupName] ? (xs[groupName] = [x]) : xs[groupName].push(x);

      return xs;
    }, {});

  const newSorted: { [key: string]: string } = {};
  Object.keys(sorted).forEach((x: string) => {
    newSorted[x] = regexFn(sorted[x]);
  });

  return newSorted;
};

export const generateValuePluginRegexObj = (
  plugins: PluginConfig[],
  propConfigs: PropConfig[]
) => {
  const pluginsObject: PluginsObject = createPluginsObject(plugins);

  const isValuePlugin = (x: string) =>
    pluginsObject[x].type === PLUGIN_TYPES.PATTERN ||
    pluginsObject[x].type === PLUGIN_TYPES.LOOKUP;

  const propNamesObject = createPropNamesObject(pluginsObject, propConfigs);

  return Object.keys(pluginsObject)
    .filter(isValuePlugin)
    .reduce((accum, pluginName) => {
      const props = propNamesObject[pluginName];
      const pluginRegexFn = buildClassNameRegexFn(
        plugins,
        buildValuePluginRegex(pluginsObject[pluginName])
      );

      accum = deepmerge(
        accum,
        generateRegexObj(pluginName, props, pluginRegexFn)
      );

      return accum;
    }, {});
};

export const generateKeywordValueRegexObj = (
  precompiledClassObjects: { [key: string]: { [key: string]: string } },
  pluginConfigs: PluginConfig[]
) => {
  const atomKeys = Object.keys(precompiledClassObjects);
  const regexFn = buildClassNameRegexFn(pluginConfigs);

  return generateRegexObj(PLUGIN_TYPES.KEYWORD, atomKeys, regexFn);
};
