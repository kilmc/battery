'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildValuePluginRegex = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('../utils');

var _constants = require('../plugins/constants');

var buildValuePluginRegex = exports.buildValuePluginRegex = function buildValuePluginRegex(pluginConfig) {
  var hasValueModifiers = _typeof(pluginConfig.valueModifiers) === 'object';
  var values = void 0;

  if (pluginConfig.type === _constants.PLUGIN_TYPES.LOOKUP) {
    values = '(' + (0, _utils.sortAndJoin)(Object.keys(pluginConfig.values)) + ')';
  } else {
    values = '(' + pluginConfig.valueRegexString + ')';
  }

  var valueModifiers = void 0;
  var hasDefaultModifierIndicator = void 0;

  if (hasValueModifiers) {
    var modifiersConfigs = pluginConfig.valueModifiers;

    hasDefaultModifierIndicator = modifiersConfigs.some(function (x) {
      return x.default === true;
    });

    var modifiers = modifiersConfigs.reduce(function (accum, config) {
      var _config$separator = config.separator,
          separator = _config$separator === undefined ? '' : _config$separator,
          indicator = config.indicator;

      return accum.concat('' + separator + indicator);
    }, []);

    valueModifiers = '(' + (0, _utils.sortAndJoin)(modifiers) + ')?';

    // TODO: This line seems redundant
    if (hasDefaultModifierIndicator) valueModifiers = '' + valueModifiers;
  }
  return '' + values + (hasValueModifiers ? valueModifiers : '()?');
};