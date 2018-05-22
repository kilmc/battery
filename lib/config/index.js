'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processConfig = exports.convertSubProps = exports.formatBorderProp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var formatBorderProp = exports.formatBorderProp = function formatBorderProp(rootProp, subProp) {
  var _rootProp$split = rootProp.split('-'),
      _rootProp$split2 = _slicedToArray(_rootProp$split, 2),
      start = _rootProp$split2[0],
      end = _rootProp$split2[1];

  return start + '-' + subProp + '-' + end;
};

var convertSubProps = function convertSubProps(config) {
  var propConfigs = config.props;


  var subPropConfigs = propConfigs.filter(function (x) {
    return _typeof(x.subProps) === 'object';
  });

  var convertedPropConfigs = subPropConfigs.map(function (subPropConfig) {
    var prop = subPropConfig.prop,
        propName = subPropConfig.propName,
        subProps = subPropConfig.subProps,
        _subPropConfig$subPro = subPropConfig.subPropSeparator,
        subPropSeparator = _subPropConfig$subPro === undefined ? '' : _subPropConfig$subPro,
        rest = _objectWithoutProperties(subPropConfig, ['prop', 'propName', 'subProps', 'subPropSeparator']);

    return Object.keys(subProps).reduce(function (accumPropConfigs, x) {
      var subProp = subProps[x].split(' ');
      var processedSubProp = prop.match('border') ? subProp.map(function (y) {
        return formatBorderProp(prop, y);
      }).join(' ') : subProp.map(function (y) {
        return prop + '-' + y;
      }).join(' ');

      var newPropConfig = _extends({
        prop: processedSubProp,
        propName: '' + propName + subPropSeparator + x
      }, rest);

      return accumPropConfigs.concat(newPropConfig);
    }, []);
  }).reduce(function (accum, x) {
    return accum.concat(x);
  }, []);

  return _extends({}, config, {
    props: [].concat(_toConsumableArray(config.props), _toConsumableArray(convertedPropConfigs))
  });
};

exports.convertSubProps = convertSubProps;
var processPropConfigs = function processPropConfigs(config) {
  return convertSubProps(config);
};

var processConfig = exports.processConfig = function processConfig(config) {
  return processPropConfigs(config);
};