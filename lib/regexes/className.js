'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildClassNameRegex = undefined;

var _utils = require('../utils');

var _ = require('./');

var buildClassNameRegex = exports.buildClassNameRegex = function buildClassNameRegex(pluginsConfig) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixAndSuffixes = {};
  var hasPrefixesOrSuffixes = pluginsConfig.filter(function (x) {
    return x.prefixOrSuffix;
  }).length > 0;

  if (hasPrefixesOrSuffixes) prefixAndSuffixes = (0, _.buildPrefixAndSuffixRegex)(pluginsConfig);

  var start = prefixAndSuffixes['prefix'] ? prefixAndSuffixes['prefix'] : '(^)';

  var end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';

  return function (propNames) {
    return start + '(' + (0, _utils.sortAndJoin)(propNames) + ')' + body + end;
  };
};