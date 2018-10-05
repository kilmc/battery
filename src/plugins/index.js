// getPlugins
// ------------------------------------------------------------------
export const getPluginType = (pluginType, plugins) =>
  plugins.filter(x => x.type === pluginType).reduce((accum, plugin) => {
    accum[plugin.name] = plugin;
    return accum;
  }, {});

// getPluginConfigs
// ------------------------------------------------------------------
// Filters propConfigs by enabled[pluginName]

export const getPluginPropConfigs = (pluginName, propConfigs) => {
  return propConfigs.filter(prop => prop.enablePlugin === pluginName);
};

// createPluginsObject
// ------------------------------------------------------------------
export const createPluginsObject = plugins =>
  plugins.reduce((accum, plugin) => {
    accum[plugin.name] = plugin;
    return accum;
  }, {});

// getPluginPropNames
// ------------------------------------------------------------------
export const createPropNamesObject = (pluginsObject, propConfigs) => {
  return Object.keys(pluginsObject).reduce((accum, pluginName) => {
    const pluginPropConfigs = getPluginPropConfigs(pluginName, propConfigs);
    const pluginPropNames = pluginPropConfigs.map(x => x.propName);

    if (pluginPropNames.length !== 0) {
      accum[pluginName] = pluginPropConfigs.map(x => {
        const { propName, separator = '' } = x;
        return propName + separator;
      });
    }

    return accum;
  }, {});
};
