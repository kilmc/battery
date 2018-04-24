import deepmerge from 'deepmerge';

import {
  buildClassNameRegex,
  buildValuePluginRegex
} from './regexes';

import {
  createPropNamesObject,
  createPluginsObject
} from './plugins/';

import { PLUGIN_TYPES } from './plugins/constants';

export const generateRegexObj = (groupName,arr,regexFn) => {
  const sorted = arr
    .sort((a,b) => b.length - a.length)
    .reduce((xs,x) => {
      !xs[groupName]
        ? xs[groupName] = [x]
        : xs[groupName].push(x);

      return xs;
    },{});

  Object.keys(sorted).forEach(x => {
    sorted[x] = regexFn(sorted[x]);
  });

  return sorted;
};

export const generateValuePluginRegexObj = (plugins,propConfigs) => {
  const pluginsObject = createPluginsObject(plugins);

  const isValuePlugin = (x) =>
    pluginsObject[x].type === PLUGIN_TYPES.PATTERN ||
    pluginsObject[x].type === PLUGIN_TYPES.LOOKUP;

  const propNamesObject = createPropNamesObject(pluginsObject,propConfigs);

  return Object.keys(pluginsObject)
    .filter(isValuePlugin)
    .reduce((accum,pluginName) => {
      const props = propNamesObject[pluginName];
      const pluginRegexFn = buildClassNameRegex(
        plugins,
        buildValuePluginRegex(pluginsObject[pluginName])
      );

      accum = deepmerge(
        accum,
        generateRegexObj(pluginName,props,pluginRegexFn)
      );

      return accum;
    },{});
};

export const generateKeywordValueRegexObj = (precompiledClassObjects,pluginsConfig) => {
  const atomKeys = Object.keys(precompiledClassObjects);
  const regexFn = buildClassNameRegex(pluginsConfig);

  return generateRegexObj(PLUGIN_TYPES.KEYWORD,atomKeys,regexFn);
};