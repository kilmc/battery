'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPrefixAndSuffixRegex = undefined;

var _utils = require('../utils');

var getPrefixAndSuffixes = function getPrefixAndSuffixes(pluginsConfig) {
  return pluginsConfig.filter(function (x) {
    return x.prefixOrSuffix;
  }).reduce(function (xs, x) {
    var type = x.prefixOrSuffix,
        modifiers = x.modifiers;


    modifiers.forEach(function (modifier) {
      var indicator = modifier.indicator,
          _modifier$separator = modifier.separator,
          separator = _modifier$separator === undefined ? '' : _modifier$separator;

      var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, type);

      if (xs[type]) {
        xs[type] = xs[type].concat(item);
      } else {
        xs[type] = [item];
      }
    });

    return xs;
  }, {});
};

var buildPrefixAndSuffixRegex = exports.buildPrefixAndSuffixRegex = function buildPrefixAndSuffixRegex(pluginsConfig) {
  var prefixesAndSuffixes = getPrefixAndSuffixes(pluginsConfig);
  var prefixes = prefixesAndSuffixes['prefix'];
  var suffixes = prefixesAndSuffixes['suffix'];
  var prefixSuffixRegexes = {};

  if (prefixes) prefixSuffixRegexes['prefix'] = '(^|' + (0, _utils.sortAndJoin)(prefixes) + ')';
  if (suffixes) prefixSuffixRegexes['suffix'] = '(' + (0, _utils.sortAndJoin)(suffixes) + '|$)';
  return prefixSuffixRegexes;
};