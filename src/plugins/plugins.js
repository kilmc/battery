import { capitalize, filterObject } from './utils';

export const PLUGIN_TYPES = {
  PATTERN: 'pattern',
  LOOKUP: 'lookup',
  CLASSNAME: 'classname'
};

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

export const getPluginPropConfigs = (pluginName, propConfigs) => filterObject(
  prop => prop[enablePluginKey(pluginName)] === true,
  propConfigs
);

//
// ------------------------------------------------------------------

export const getPluginPropNames = (plugins,props) =>
  Object.keys(plugins)
    .reduce((accum,pluginName) => {
      const propConfigs = getPluginPropConfigs(pluginName, props);
      const pluginPropNames = propConfigs.map(x => x.propName);

      if (pluginPropNames.length !== 0) {
        accum[pluginName] = propConfigs.map(x => {
          const { propName, separator = '' } = x;
          return propName + separator;
        });
      }

      return accum;
    },{});