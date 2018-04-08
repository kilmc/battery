import deepmerge from 'deepmerge';

import {
  buildClassNameRegex,
  buildValuePluginRegex
} from './regexes';

import {
  createPropNamesObject,
  createPluginsObject,
  PLUGIN_TYPES
} from './plugins/';

export const generateRegexSequencer = (groupName,arr,regexFn) => {
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

export const generateValuePluginRegexSequencer = (plugins,propConfigs) => {
  const isValuePlugin = (x) =>
    pluginsObject[x].type === PLUGIN_TYPES.PATTERN ||
    pluginsObject[x].type === PLUGIN_TYPES.LOOKUP;

  const pluginsObject = createPluginsObject(plugins);
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
        generateRegexSequencer(pluginName,props,pluginRegexFn)
      );

      return accum;
    },{});
};

export const generateKeywordValueRegexSequencer = (precompiledClassObjects,pluginsConfig) => {
  const atomKeys = Object.keys(precompiledClassObjects);
  const regexFn = buildClassNameRegex(pluginsConfig);

  return generateRegexSequencer(PLUGIN_TYPES.KEYWORD,atomKeys,regexFn);
};