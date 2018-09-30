import {
  PluginConfig,
  PluginTypes,
  PropConfig,
  PluginsObject
} from '../types/';

// getPlugins
// ------------------------------------------------------------------
export const getPluginType = (
  pluginType: PluginTypes,
  plugins: PluginConfig[]
) =>
  plugins
    .filter(x => x.type === pluginType)
    .reduce((accum: { [key: string]: PluginConfig }, plugin) => {
      accum[plugin.name] = plugin;
      return accum;
    }, {});

// getPluginConfigs
// ------------------------------------------------------------------
// Filters propConfigs by enabled[pluginName]

export const getPluginPropConfigs = (
  pluginName: string,
  propConfigs: PropConfig[]
) => {
  return propConfigs.filter(prop => prop.enablePlugin === pluginName);
};

// createPluginsObject
// ------------------------------------------------------------------
export const createPluginsObject = (
  plugins: PluginConfig[]
): { [key: string]: PluginConfig } =>
  plugins.reduce((accum: PluginsObject, plugin) => {
    accum[plugin.name] = plugin;
    return accum;
  }, {});

// getPluginPropNames
// ------------------------------------------------------------------
export const createPropNamesObject = (
  pluginsObject: PluginsObject,
  propConfigs: PropConfig[]
): { [key: string]: string[] } => {
  return Object.keys(pluginsObject).reduce(
    (accum: { [key: string]: string[] }, pluginName) => {
      const pluginPropConfigs = getPluginPropConfigs(pluginName, propConfigs);
      const pluginPropNames = pluginPropConfigs.map(x => x.propName);

      if (pluginPropNames.length !== 0) {
        accum[pluginName] = pluginPropConfigs.map(x => {
          const { propName, separator = '' } = x;
          return propName + separator;
        });
      }

      return accum;
    },
    {}
  );
};
