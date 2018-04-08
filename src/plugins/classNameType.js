import { PLUGIN_TYPES } from './index';
import { formatPrefixOrSuffix } from '../utils';

const processClassNameType = (classes,pluginConfig) => {
  const { modifiers, prefixOrSuffix } = pluginConfig;

  modifiers.forEach(modifier => {
    const { indicator, separator, modifierFn } = modifier;

    const item = formatPrefixOrSuffix(indicator,separator,prefixOrSuffix);
    const itemRegex = prefixOrSuffix === 'prefix' ? `^${item}` : `${item}$`;

    Object.keys(classes).forEach(cx => {
      if (new RegExp(itemRegex).test(cx)) {
        classes[`${modifierFn(cx,indicator)}`] = classes[cx];
        Reflect.deleteProperty(classes,cx);
      }
    });
  });
};

export const processClassNameTypes = (library,plugins) => {
  const classNamePlugins = plugins
    .filter(x => x.type === PLUGIN_TYPES.CLASSNAME);

  if (classNamePlugins.length > 0) {
    classNamePlugins.forEach(pluginConfig => {
      processClassNameType(library,pluginConfig);
    });
  }
};