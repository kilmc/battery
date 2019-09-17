import { ValuePlugin } from 'types/plugin-config';
import { UserPropConfig } from 'types/prop-config';
import { Matcher, Matchers } from 'types/matchers';
import { toCapture } from 'utils/array';

const generatePropRegex = (pluginPropConfigs: UserPropConfig[]) => {
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

const generateValueRegex = (plugin: ValuePlugin) => {
  switch (plugin.type) {
    case 'lookup':
      return toCapture(Object.keys(plugin.values));
    case 'pattern':
      const identifier =
        typeof plugin.identifier === 'string'
          ? plugin.identifier
          : plugin.identifier.source;
      return toCapture([identifier]);
    default:
      console.log(`The plugin "${plugin.name}" must have a type.`);
  }
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

    const propRegex = generatePropRegex(pluginProps);
    const valueIdentifiers = generateValueRegex(plugin);

    const regex = new RegExp(`.*?(${propRegex}${valueIdentifiers}).*?`);

    accum[pluginName] = regex;
    return accum;
  }, {});
  return matchers;
};
