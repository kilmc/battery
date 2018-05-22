'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// getPlugins
// ------------------------------------------------------------------
var getPluginType = exports.getPluginType = function getPluginType(pluginType, plugins) {
  return plugins.filter(function (x) {
    return x.type === pluginType;
  }).reduce(function (accum, plugin) {
    accum[plugin.name] = plugin;
    return accum;
  }, {});
};

// getPluginConfigs
// ------------------------------------------------------------------
// Filters propConfigs by enabled[pluginName]

var getPluginPropConfigs = exports.getPluginPropConfigs = function getPluginPropConfigs(pluginName, propConfigs) {
  return propConfigs.filter(function (prop) {
    return prop.enablePlugin === pluginName;
  });
};

// createPluginsObject
// ------------------------------------------------------------------
var createPluginsObject = exports.createPluginsObject = function createPluginsObject(plugins) {
  return plugins.reduce(function (accum, plugin) {
    accum[plugin.name] = plugin;
    return accum;
  }, {});
};

// getPluginPropNames
// ------------------------------------------------------------------
var createPropNamesObject = exports.createPropNamesObject = function createPropNamesObject(pluginsObject, propConfigs) {
  return Object.keys(pluginsObject).reduce(function (accum, pluginName) {
    var pluginPropConfigs = getPluginPropConfigs(pluginName, propConfigs);
    var pluginPropNames = pluginPropConfigs.map(function (x) {
      return x.propName;
    });

    if (pluginPropNames.length !== 0) {
      accum[pluginName] = pluginPropConfigs.map(function (x) {
        var propName = x.propName,
            _x$separator = x.separator,
            separator = _x$separator === undefined ? '' : _x$separator;

        return propName + separator;
      });
    }

    return accum;
  }, {});
};