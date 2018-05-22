'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateKeywordValueRegexObj = exports.generateValuePluginRegexObj = exports.generateRegexObj = undefined;

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _regexes = require('./regexes');

var _plugins = require('./plugins/');

var _constants = require('./plugins/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateRegexObj = exports.generateRegexObj = function generateRegexObj(groupName, arr, regexFn) {
  var sorted = arr.sort(function (a, b) {
    return b.length - a.length;
  }).reduce(function (xs, x) {
    !xs[groupName] ? xs[groupName] = [x] : xs[groupName].push(x);

    return xs;
  }, {});

  Object.keys(sorted).forEach(function (x) {
    sorted[x] = regexFn(sorted[x]);
  });

  return sorted;
};

var generateValuePluginRegexObj = exports.generateValuePluginRegexObj = function generateValuePluginRegexObj(plugins, propConfigs) {
  // console.log(propConfigs)
  var pluginsObject = (0, _plugins.createPluginsObject)(plugins);

  var isValuePlugin = function isValuePlugin(x) {
    return pluginsObject[x].type === _constants.PLUGIN_TYPES.PATTERN || pluginsObject[x].type === _constants.PLUGIN_TYPES.LOOKUP;
  };

  var propNamesObject = (0, _plugins.createPropNamesObject)(pluginsObject, propConfigs);

  return Object.keys(pluginsObject).filter(isValuePlugin).reduce(function (accum, pluginName) {
    var props = propNamesObject[pluginName];
    var pluginRegexFn = (0, _regexes.buildClassNameRegex)(plugins, (0, _regexes.buildValuePluginRegex)(pluginsObject[pluginName]));

    accum = (0, _deepmerge2.default)(accum, generateRegexObj(pluginName, props, pluginRegexFn));

    return accum;
  }, {});
};

var generateKeywordValueRegexObj = exports.generateKeywordValueRegexObj = function generateKeywordValueRegexObj(precompiledClassObjects, pluginsConfig) {
  var atomKeys = Object.keys(precompiledClassObjects);
  var regexFn = (0, _regexes.buildClassNameRegex)(pluginsConfig);

  return generateRegexObj(_constants.PLUGIN_TYPES.KEYWORD, atomKeys, regexFn);
};