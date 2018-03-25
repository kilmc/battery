import { formatPrefixOrSuffix } from '../sequencers';
import { processClassNameTypes } from '../plugins/classNameType';
import { PLUGIN_TYPES } from '../plugins/index';

export const printClass = (className,declarations) => {
  const classBody = Object.keys(declarations)
    .map(prop => `${prop}: ${declarations[prop]};`)
    .join(' ');

  return `.${className} { ${classBody} }`;
};

export const atomsToCSS = (obj, indent = false) => Object.keys(obj)
  .map(cx => printClass(cx,obj[cx]))
  .join(indent ? '\n  ' : '\n');

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

export const generateAtRules = (library,plugins) => {
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

        const renderedClasses = atomsToCSS(atruleGroups[indicator],true);
        if (!renderedClasses) return atRuleCSS;
        const renderedAtrule = `\n@${atrule} ${condition} {\n  ${renderedClasses}\n}\n`;
        atRuleCSS += renderedAtrule;
      });
    });
  }
  return atRuleCSS;
};