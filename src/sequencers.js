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

export const buildClassNameRegex = (pluginConfig) => {
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

  return (propNames) =>
    `(.*?)(${propNames.join('|')})${values}${hasValueModifiers ? valueModifiers : '()?'}(.*)`;
};

export const generateValuePluginRegexSequencer = (plugins,propConfigs) => {
  const pluginsObject = createPluginsObject(plugins);
  const propNamesObject = createPropNamesObject(pluginsObject,propConfigs);

  return Object.keys(pluginsObject)
    .reduce((accum,pluginName) => {
      const props = propNamesObject[pluginName];
      const pluginType = pluginsObject[pluginName].type;
      const pluginRegexFn = buildClassNameRegex(pluginsObject[pluginName]);

      const hasDefaultPropName = getPluginPropConfigs(pluginName,propConfigs)
        .some(x => x.pluginDefault === true);

      if (!accum[pluginType]) {
        accum[pluginType] = generateRegexSequencer(pluginName,props,pluginRegexFn,hasDefaultPropName);
      } else {
        accum[pluginType] = deepmerge(
          accum[pluginType],
          generateRegexSequencer(pluginName,props,pluginRegexFn,hasDefaultPropName)
        );
      }

      return accum;
    },{});
};