import { capitalize } from '../utils';

// getPlugins
// ------------------------------------------------------------------
export const getPluginType = (pluginType,plugins) => plugins
  .filter(x => x.type === pluginType)
  .reduce((accum,plugin) => {
    accum[plugin.name] = plugin;
    return accum;
  },{});

// enablePluginKey
// ------------------------------------------------------------------
// Formats a plugin.name to match the key found propConfig objects
// used to enable that plugin for a given prop

export const enablePluginKey = (key) => `enable${capitalize(key)}`;

// getPluginConfigs
// ------------------------------------------------------------------
// Filters propConfigs by enabled[pluginName]

export const getPluginPropConfigs = (pluginName, propConfigs) => {
  return Object.keys(propConfigs)
    .map(x => propConfigs[x])
    .filter(prop => prop[enablePluginKey(pluginName)] === true);
};

// createPluginsObject
// ------------------------------------------------------------------
export const createPluginsObject = (plugins) =>
  plugins.reduce((accum,plugin) => {
    accum[plugin.name] = plugin;
    return accum;
  },{});

// getPluginPropNames
// ------------------------------------------------------------------
export const createPropNamesObject = (pluginsObject,propConfigs) => {
  return Object.keys(pluginsObject)
    .reduce((accum,pluginName) => {
      const pluginPropConfigs = getPluginPropConfigs(pluginName,propConfigs);
      const pluginPropNames = pluginPropConfigs.map(x => x.propName);

      if (pluginPropNames.length !== 0) {
        accum[pluginName] = pluginPropConfigs.map(x => {
          const { propName, separator = '' } = x;
          return propName + separator;
        });
      }

      return accum;
    },{});
};