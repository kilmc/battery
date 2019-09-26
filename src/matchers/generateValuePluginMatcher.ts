import { ValuePlugin } from 'types/plugin-config';
import { UserPropConfig } from 'types/prop-config';
import { Matcher, Matchers } from 'types/matchers';
import { toCapture, toGroup } from 'utils/array';

const generateValueRegex = (
  valueArr: string[],
  plugin: ValuePlugin,
  captureSubGroups = false,
) => {
  const captureOrGroup = captureSubGroups ? toCapture : toGroup;
  let modifierArr: string[] = [];

  if (plugin.modifiers) {
    modifierArr = !plugin.modifiers
      ? []
      : plugin.modifiers.map(modifier => {
          if (modifier.defaultModifier) return '';

          const { identifier, separator = '' } = modifier;
          const processedIdentifier =
            typeof identifier === 'string' ? identifier : identifier.source;
          return `${separator}${processedIdentifier}`;
        });
  }

  return modifierArr.length > 0
    ? `(${captureOrGroup(valueArr)}${captureOrGroup(modifierArr, true)})`
    : toCapture(valueArr);
};

export const generateValueMatcher = (
  plugin: ValuePlugin,
  captureSubGroups = false,
) => {
  switch (plugin.type) {
    case 'lookup':
      return generateValueRegex(
        Object.keys(plugin.values),
        plugin,
        captureSubGroups,
      );
    case 'pattern':
      const identifier =
        typeof plugin.identifier === 'string'
          ? plugin.identifier
          : plugin.identifier.source;

      return generateValueRegex([identifier], plugin, captureSubGroups);
    default:
      console.log(`The plugin "${plugin.name}" must have a type.`);
  }
};

const generatePropMatcher = (pluginPropConfigs: UserPropConfig[]) => {
  const defaultProp = pluginPropConfigs.filter(c => c.pluginDefault);
  const hasDefaultProp = defaultProp.length > 0;

  const propIdentifiers = pluginPropConfigs
    .filter(c => !c.pluginDefault)
    .map(propConfig => {
      const { propIdentifier, pluginSeparator = '' } = propConfig;
      return `${propIdentifier}${pluginSeparator}`;
    });

  return toCapture(propIdentifiers, hasDefaultProp);
};

export const generateValuePluginMatcher = (
  valuePlugins: ValuePlugin[],
  propConfigs: UserPropConfig[],
): { [k: string]: Matcher } => {
  const matchers: Matchers = valuePlugins.reduce((accum: Matchers, plugin) => {
    const { name: pluginName } = plugin;
    const pluginProps = propConfigs.filter(
      propConfig => propConfig.plugin === pluginName,
    );

    if (pluginProps.length === 0) {
      return accum;
    }

    const propMatcher = generatePropMatcher(pluginProps);
    const valueMatcher = generateValueMatcher(plugin);

    const regex = new RegExp(`(^)${propMatcher}${valueMatcher}($)`);

    accum[pluginName] = regex;
    return accum;
  }, {});
  return matchers;
};
