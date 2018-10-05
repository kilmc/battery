import { sortAndJoin } from '../utils';
import { PLUGIN_TYPES } from '../plugins/constants';

export const buildValuePluginRegex = pluginConfig => {
  const hasValueModifiers = typeof pluginConfig.valueModifiers === 'object';
  let values;

  if (pluginConfig.type === PLUGIN_TYPES.LOOKUP) {
    values = `(${sortAndJoin(Object.keys(pluginConfig.values))})`;
  } else {
    values = `(${pluginConfig.valueRegexString})`;
  }

  let valueModifiers;
  let hasDefaultModifierIndicator;

  if (hasValueModifiers) {
    const modifiersConfigs = pluginConfig.valueModifiers;

    hasDefaultModifierIndicator = modifiersConfigs.some(
      x => x.default === true
    );

    const modifiers = modifiersConfigs.reduce((accum, config) => {
      const { separator = '', indicator } = config;
      return accum.concat(`${separator}${indicator}`);
    }, []);

    valueModifiers = `(${sortAndJoin(modifiers)})?`;

    // TODO: This line seems redundant
    if (hasDefaultModifierIndicator) valueModifiers = `${valueModifiers}`;
  }
  return `${values}${hasValueModifiers ? valueModifiers : '()?'}`;
};
