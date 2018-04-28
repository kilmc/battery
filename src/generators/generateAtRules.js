import { formatPrefixOrSuffix } from '../utils';
import { processClassNameTypes } from '../plugins/classNameType';
import { PLUGIN_TYPES } from '../plugins/constants';
import generateAtRuleCSS from './generateCSS/generateAtRuleCSS';

export const generateAtRule = (classes,pluginConfig) => {
  const { modifiers, prefixOrSuffix } = pluginConfig;

  return modifiers
    .reduce((groups,modifier) => {
      const { indicator, separator } = modifier;

      const item = formatPrefixOrSuffix(indicator,separator,prefixOrSuffix);
      const itemRegex = prefixOrSuffix === 'prefix' ? `^${item}` : `${item}$`;

      const matchedClasses = Object.keys(classes)
        .reduce((groupClasses,cx) => {
          if (new RegExp(itemRegex).test(cx)) {
            groupClasses[cx] = classes[cx];
            Reflect.deleteProperty(classes,cx);
            return groupClasses;
          } else {
            return groupClasses;
          }
        },{});

      groups[indicator] = {
        ...groups[indicator],
        ...matchedClasses
      };

      return groups;
    },{});
};

const generateAtRules = (library,plugins,renderAs) => {
  const atrulePlugins = plugins
    .filter(x => x.type === PLUGIN_TYPES.ATRULE);

  let atRuleCSS = '';
  if (atrulePlugins.length > 0) {
    atrulePlugins.forEach(pluginConfig => {
      const { atrule, modifiers } = pluginConfig;
      const atruleGroups = generateAtRule(library,pluginConfig);

      modifiers.forEach(x => {
        const { condition, indicator } = x;

        processClassNameTypes(atruleGroups[indicator],plugins);

        if (renderAs === 'css') {
          atRuleCSS = generateAtRuleCSS({
            atrule,
            condition,
            library: atruleGroups[indicator],
            output: atRuleCSS
          });
        }
      });
    });
  }
  return atRuleCSS;
};

export default generateAtRules;