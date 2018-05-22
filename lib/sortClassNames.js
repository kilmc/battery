'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var sortClassNames = function sortClassNames(classNames, sequencedRegexes) {
  return Object.keys(sequencedRegexes).reduce(function (classNameGroups, pluginName) {
    var matchedClassNames = classNames.filter(function (cx) {
      return cx.match(sequencedRegexes[pluginName]);
    });

    if (matchedClassNames.length !== 0) {
      if (!classNameGroups[pluginName]) {
        classNameGroups[pluginName] = matchedClassNames;
      } else {
        classNameGroups[pluginName] = [].concat(_toConsumableArray(classNameGroups[pluginName]), _toConsumableArray(matchedClassNames));
      }
    }
    classNames = (0, _utils.subtractArrays)(classNames, matchedClassNames);

    return classNameGroups;
  }, {});
};

exports.default = sortClassNames;