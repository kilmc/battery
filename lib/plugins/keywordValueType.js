'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeywordClassObjs = exports.generateKeywordValueObjs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('../utils');

var _classObject = require('../classObject');

var generateKeywordValueObjs = exports.generateKeywordValueObjs = function generateKeywordValueObjs(props) {
  var propConfigsWithKeywordValues = Object.keys(props).map(function (prop) {
    return props[prop];
  }).filter(function (propConfig) {
    return _typeof(propConfig.keywordValues) === 'object';
  });

  return propConfigsWithKeywordValues.reduce(function (accum, propConfig) {
    var prop = propConfig.prop,
        propName = propConfig.propName,
        _propConfig$keywordVa = propConfig.keywordValues,
        _propConfig$keywordVa2 = _propConfig$keywordVa.separator,
        separator = _propConfig$keywordVa2 === undefined ? '' : _propConfig$keywordVa2,
        values = _propConfig$keywordVa.values;


    var classNames = Object.keys(values).reduce(function (classObjects, valueName) {
      classObjects = _extends({}, classObjects, (0, _classObject.generateClassObject)({
        className: '' + propName + separator + valueName,
        cssProps: prop,
        value: values[valueName]
      }));

      return classObjects;
    }, {});

    accum = _extends({}, accum, classNames);
    return accum;
  }, {});
};

var getKeywordClassObjs = exports.getKeywordClassObjs = function getKeywordClassObjs(classNames, precompiledClassObjects) {
  if (!precompiledClassObjects) return null;

  var atomKeys = Object.keys(precompiledClassObjects);
  var keywordRegex = new RegExp('(.*?)(' + atomKeys.sort(function (a, b) {
    return b.length - a.length;
  }).join('|') + ')(.*)');

  var matchedClassNames = classNames.filter(function (x) {
    return x.match(keywordRegex);
  });

  var returnedAtoms = matchedClassNames.reduce(function (accum, cx) {
    var cleanClass = cx.replace(keywordRegex, '$2');

    accum[cx] = precompiledClassObjects[cleanClass];
    return accum;
  }, {});

  (0, _utils.subtractArrays)(classNames, matchedClassNames);
  return returnedAtoms;
};