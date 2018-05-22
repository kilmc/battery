'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAtRule = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils');

var _classNameType = require('../plugins/classNameType');

var _constants = require('../plugins/constants');

var _generateAtRuleCSS = require('./generateCSS/generateAtRuleCSS');

var _generateAtRuleCSS2 = _interopRequireDefault(_generateAtRuleCSS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateAtRule = exports.generateAtRule = function generateAtRule(classes, pluginConfig) {
  var modifiers = pluginConfig.modifiers,
      prefixOrSuffix = pluginConfig.prefixOrSuffix;


  return modifiers.reduce(function (groups, modifier) {
    var indicator = modifier.indicator,
        separator = modifier.separator;


    var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, prefixOrSuffix);
    var itemRegex = prefixOrSuffix === 'prefix' ? '^' + item : item + '$';

    var matchedClasses = Object.keys(classes).reduce(function (groupClasses, cx) {
      if (new RegExp(itemRegex).test(cx)) {
        groupClasses[cx] = classes[cx];
        Reflect.deleteProperty(classes, cx);
        return groupClasses;
      } else {
        return groupClasses;
      }
    }, {});

    groups[indicator] = _extends({}, groups[indicator], matchedClasses);

    return groups;
  }, {});
};

var generateAtRules = function generateAtRules(library, plugins, renderAs) {
  var atrulePlugins = plugins.filter(function (x) {
    return x.type === _constants.PLUGIN_TYPES.ATRULE;
  });

  var atRuleCSS = '';
  if (atrulePlugins.length > 0) {
    atrulePlugins.forEach(function (pluginConfig) {
      var atrule = pluginConfig.atrule,
          modifiers = pluginConfig.modifiers;

      var atruleGroups = generateAtRule(library, pluginConfig);

      modifiers.forEach(function (x) {
        var condition = x.condition,
            indicator = x.indicator;


        (0, _classNameType.processClassNameTypes)(atruleGroups[indicator], plugins);

        if (renderAs === 'css') {
          atRuleCSS = (0, _generateAtRuleCSS2.default)({
            atrule: atrule,
            condition: condition,
            library: atruleGroups[indicator],
            output: atRuleCSS
          });
        }
      });
    });
  }
  return atRuleCSS;
};

exports.default = generateAtRules;