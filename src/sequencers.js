import deepmerge from 'deepmerge';

import {
  getPluginPropConfigs,
  createPropNamesObject,
  createPluginsObject,
  PLUGIN_TYPES
} from './plugins/';

export const generateRegexSequencer = (groupName,arr,regexFn,hasDefaultPropName) => {
  const sorted = arr.reduce((xs,x) => {
    const charCount = x.length;

    if (!xs[charCount]) {
      xs[charCount] = { [groupName]: [x] };
    } else {
      xs[charCount][groupName].push(x);
    }
    return xs;
  },{});

  Object.keys(sorted).forEach(x => {
    sorted[x][groupName] = regexFn(sorted[x][groupName],hasDefaultPropName);
  });
  return sorted;
};

const formatPrefixOrSuffix = (x,y,prefixOrSuffix) => {
  return prefixOrSuffix === 'prefix' ? `${x}${y}` : `${y}${x}`;
};

export const getPrefixAndSuffixes = (pluginsConfig) => {
  return pluginsConfig
    .filter(x => x.prefixOrSuffix)
    .reduce((xs,x) => {
      const { prefixOrSuffix: type, modifiers } = x;
      modifiers.forEach(modifier => {
        const { indicator, separator = '' } = modifier;
        const item = formatPrefixOrSuffix(indicator,separator,type);
        if (xs[type]) {
          xs[type] = xs[type].concat(item);
        } else {
          xs[type] = [item];
        }
      });

      return xs;
    },{});
};

export const buildPrefixAndSuffixRegex = (pluginsConfig) => {
  const prefixesAndSuffixes = getPrefixAndSuffixes(pluginsConfig);
  let prefixes = prefixesAndSuffixes['prefix'];
  let suffixes = prefixesAndSuffixes['suffix'];
  let prefixSuffixRegexes = {};

  if (prefixes) prefixSuffixRegexes['prefix'] = `(^|${prefixes.join('|')})`;
  if (suffixes) prefixSuffixRegexes['suffix'] = `(${suffixes.join('|')}|$)`;
  return prefixSuffixRegexes;
};

export const buildValuePluginRegex = (pluginConfig) => {
  const hasValueModifiers = typeof pluginConfig.valueModifiers === 'object';

  let valueModifiers;
  let hasDefaultModifierIndicator;

  // Values
  let values;

  if (pluginConfig.type === PLUGIN_TYPES.LOOKUP) {
    values = `(${Object.keys(pluginConfig.values).join('|')})`;
  } else {
    values = `(${pluginConfig.valueRegexString})`;
  }

  // Value Modifiers
  if (hasValueModifiers) {
    const modifiersConfigs = pluginConfig.valueModifiers;

    hasDefaultModifierIndicator = modifiersConfigs.some(x => x.default === true);

    const modifiers = modifiersConfigs
      .reduce((accum,config) => {
        const { separator = '', indicator } = config;
        return accum.concat(`${separator}${indicator}`);
      },[]);

    valueModifiers = `(${modifiers.join('|')})?`;

    if (hasDefaultModifierIndicator) valueModifiers = `${valueModifiers}`;
  }
  return `${values}${hasValueModifiers ? valueModifiers : '()?'}`;
};

export const buildClassNameRegex = (pluginsConfig,body = '') => {
  let prefixAndSuffixes = {};
  const hasPrefixesOrSuffixes = pluginsConfig
    .filter(x => x.prefixOrSuffix).length > 0;

  if (hasPrefixesOrSuffixes) prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginsConfig);

  const start = prefixAndSuffixes['prefix']
    ? prefixAndSuffixes['prefix']
    : '(^)';

  const end = prefixAndSuffixes['suffix']
    ? prefixAndSuffixes['suffix']
    :'($)';

  return (propNames) =>
    `${start}(${propNames.join('|')})${body}${end}`;
};


export const generateValuePluginRegexSequencer = (plugins,propConfigs) => {
  const isValuePlugin = (x) => pluginsObject[x].type === PLUGIN_TYPES.PATTERN || pluginsObject[x].type === PLUGIN_TYPES.LOOKUP;
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

      const hasDefaultPropName = getPluginPropConfigs(pluginName,propConfigs)
        .some(x => x.pluginDefault === true);

      accum = deepmerge(
        accum,
        generateRegexSequencer(pluginName,props,pluginRegexFn,hasDefaultPropName)
      );

      return accum;
    },{});
};

export const generateKeywordValueRegexSequencer = (precompiledClassObjects,pluginsConfig) => {
  const atomKeys = Object.keys(precompiledClassObjects);
  const regexFn = buildClassNameRegex(pluginsConfig);
  return generateRegexSequencer(PLUGIN_TYPES.KEYWORD,atomKeys,regexFn);
};