import { PluginConfig } from '../types/plugin-config';
import { DeveloperPropertyConfig } from '../types/property-config';
import { Matcher, Matchers } from '../types/matchers';
import { toCapture, toGroup } from '../utils/array';
import { generatePrefixSuffixdMatchers } from './generatePrefixSuffixMatchers';

const generateValueRegex = (
  valueArr: string[],
  plugin: PluginConfig,
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
  plugin: PluginConfig,
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
      console.log(`The plugin must have a type.`);
  }
};

const generatePropMatcher = (pluginPropConfigs: DeveloperPropertyConfig[]) => {
  const defaultProp = pluginPropConfigs.filter(c => c.pluginDefault);
  const hasDefaultProp = defaultProp.length > 0;

  const classNamespaces = pluginPropConfigs
    .filter(c => !c.pluginDefault)
    .map(propConfig => {
      const { classNamespace, pluginSeparator = '' } = propConfig;
      return `${classNamespace}${pluginSeparator}`;
    });

  return toCapture(classNamespaces, hasDefaultProp);
};

export const generateValuePluginMatcher = (
  globalPlugins: PluginConfig[],
  propConfigs: DeveloperPropertyConfig[],
): { [k: string]: Matcher } => {
  const configsWithValuePlugins = propConfigs.filter(
    ({ valuePlugin }) => !!valuePlugin,
  );

  const valuePlugins = configsWithValuePlugins.map(
    ({ valuePlugin }) => valuePlugin,
  );

  if (
    (!valuePlugins || valuePlugins.length < 1) &&
    (!globalPlugins || globalPlugins.length < 1)
  ) {
    return {};
  }

  const { prefixes, suffixes } = generatePrefixSuffixdMatchers(globalPlugins);

  const matchers: Matchers = configsWithValuePlugins.reduce(
    (accum: Matchers, config) => {
      const propMatcher = generatePropMatcher([config]);
      const valueMatcher = generateValueMatcher(config.valuePlugin);

      const regex = new RegExp(
        `(${prefixes})${propMatcher}${valueMatcher}(${suffixes})`,
      );

      const cssPropertyKey = config.cssProperty.join('');

      accum[cssPropertyKey] = regex;

      return accum;
    },
    {},
  );

  return matchers;
};
