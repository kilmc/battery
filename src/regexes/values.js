import { sortAndJoin } from '../utils';
import { PLUGIN_TYPES } from '../plugins/';

export const buildValuePluginRegex = (pluginConfig) => {
  const hasValueModifiers = typeof pluginConfig.valueModifiers === 'object';

  let valueModifiers;
  let hasDefaultModifierIndicator;

  // Values
  let values;

  if (pluginConfig.type === PLUGIN_TYPES.LOOKUP) {
    values = `(${sortAndJoin(Object.keys(pluginConfig.values))})`;
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

    valueModifiers = `(${sortAndJoin(modifiers)})?`;

    if (hasDefaultModifierIndicator) valueModifiers = `${valueModifiers}`;
  }
  return `${values}${hasValueModifiers ? valueModifiers : '()?'}`;
};