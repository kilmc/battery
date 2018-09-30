import { PLUGIN_TYPES } from './constants';
import { formatPrefixOrSuffix } from '../utils';
import { PluginConfig } from '../types/';

const processClassNameType = (
  classes: { [key: string]: { [key: string]: string } },
  pluginConfig: PluginConfig
): void => {
  const { modifiers, prefixOrSuffix } = pluginConfig;

  modifiers.forEach(modifier => {
    const { indicator, separator, modifierFn } = modifier;

    const item = formatPrefixOrSuffix(indicator, separator, prefixOrSuffix);
    const itemRegex = prefixOrSuffix === 'prefix' ? `^${item}` : `${item}$`;

    Object.keys(classes).forEach(cx => {
      if (new RegExp(itemRegex).test(cx)) {
        classes[`${modifierFn(cx, indicator)}`] = classes[cx];
        Reflect.deleteProperty(classes, cx);
      }
    });
  });
};

export const processClassNameTypes = (
  library: { [key: string]: { [key: string]: string } },
  plugins: PluginConfig[]
): void => {
  const classNamePlugins = plugins.filter(
    x => x.type === PLUGIN_TYPES.CLASSNAME
  );

  if (classNamePlugins.length > 0) {
    classNamePlugins.forEach(pluginConfig => {
      processClassNameType(library, pluginConfig);
    });
  }
};
