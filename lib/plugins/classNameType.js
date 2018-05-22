'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processClassNameTypes = undefined;

var _constants = require('./constants');

var _utils = require('../utils');

var processClassNameType = function processClassNameType(classes, pluginConfig) {
  var modifiers = pluginConfig.modifiers,
      prefixOrSuffix = pluginConfig.prefixOrSuffix;


  modifiers.forEach(function (modifier) {
    var indicator = modifier.indicator,
        separator = modifier.separator,
        modifierFn = modifier.modifierFn;


    var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, prefixOrSuffix);
    var itemRegex = prefixOrSuffix === 'prefix' ? '^' + item : item + '$';

    Object.keys(classes).forEach(function (cx) {
      if (new RegExp(itemRegex).test(cx)) {
        classes['' + modifierFn(cx, indicator)] = classes[cx];
        Reflect.deleteProperty(classes, cx);
      }
    });
  });
};

var processClassNameTypes = exports.processClassNameTypes = function processClassNameTypes(library, plugins) {
  var classNamePlugins = plugins.filter(function (x) {
    return x.type === _constants.PLUGIN_TYPES.CLASSNAME;
  });

  if (classNamePlugins.length > 0) {
    classNamePlugins.forEach(function (pluginConfig) {
      processClassNameType(library, pluginConfig);
    });
  }
};