'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertClassNamestoClassObjs = exports.generateClassObject = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _plugins = require('./plugins/');

var _sequencers = require('./sequencers');

var _keywordValueType = require('./plugins/keywordValueType');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var generateClassObject = exports.generateClassObject = function generateClassObject(_ref) {
  var className = _ref.className,
      cssProps = _ref.cssProps,
      value = _ref.value;

  var eachProp = cssProps.split(' ').reduce(function (props, prop) {
    props[prop] = value;
    return props;
  }, {});
  return _defineProperty({}, className, eachProp);
};

var getProps = function getProps(cxPropName, propConfigs) {
  if (cxPropName === '') {
    return propConfigs.filter(function (x) {
      return x.pluginDefault === true;
    }).map(function (x) {
      return x.prop;
    }).join('');
  } else {
    return propConfigs.filter(function (x) {
      var propName = x.propName,
          _x$separator = x.separator,
          separator = _x$separator === undefined ? '' : _x$separator;

      return cxPropName === propName + separator;
    }).map(function (x) {
      return x.prop;
    }).join('');
  }
};

var modifyValue = function modifyValue(value, modifier, pluginConfig) {
  var hasDefaultModifier = pluginConfig.valueModifiers.some(function (x) {
    return x.default === true;
  });
  var modifierValue = void 0;

  if (hasDefaultModifier && modifier === undefined) {
    modifier = '';
  }

  if (modifier !== undefined) {
    var valueModifier = pluginConfig.valueModifiers.sort(function (a, b) {
      return b.indicator.length - a.indicator.length;
    }).filter(function (x) {
      var _x$separator2 = x.separator,
          separator = _x$separator2 === undefined ? '' : _x$separator2,
          indicator = x.indicator;

      var regex = new RegExp('' + (separator + indicator));

      if (indicator === '' && modifier !== '') {
        return false;
      } else if (modifier === separator + indicator) {
        return true;
      } else if (regex.test(modifier)) {
        modifierValue = modifier.replace(separator, '');
        return true;
      } else {
        return false;
      }
    })[0];
    return valueModifier.modifierFn(value, modifierValue);
  } else {
    return value;
  }
};

var getValue = function getValue(value, modifier, pluginConfig, lookupValues) {
  if (lookupValues) {
    value = lookupValues[value];
  }
  if (pluginConfig.valueModifiers) {
    value = modifyValue(value, modifier, pluginConfig);
  }

  return value;
};

var convertClassNameToClassObj = function convertClassNameToClassObj(className, sequencedRegexes, pluginConfig, propConfigs, lookupValues) {
  var previouslyMatched = 0;

  return Object.keys(sequencedRegexes).reduce(function (zs, pluginName) {
    if (previouslyMatched === 1) return zs;

    var regexString = sequencedRegexes[pluginConfig.name];
    if (regexString === undefined) return zs;

    var classNameArr = className.match(regexString);
    if (classNameArr === null) return zs;

    previouslyMatched = 1;

    var propName = classNameArr[2];

    var value = classNameArr[3];
    var valueModifier = classNameArr[4];

    var convertedClassObj = generateClassObject({
      className: className,
      cssProps: getProps(propName, propConfigs),
      value: getValue(value, valueModifier, pluginConfig, lookupValues)
    });

    zs = _extends({}, zs, convertedClassObj);
    return zs;
  }, {});
};

function sortObjKeysAlphabetically(obj) {
  var ordered = {};
  Object.keys(obj).sort().forEach(function (key) {
    ordered[key] = obj[key];
  });
  return ordered;
}

var convertClassNamestoClassObjs = exports.convertClassNamestoClassObjs = function convertClassNamestoClassObjs(sortedClassNames, plugins, props) {
  var pluginNames = Object.keys(sortedClassNames);
  var pluginRegexes = (0, _sequencers.generateValuePluginRegexObj)(plugins, props);
  var pluginsObject = (0, _plugins.createPluginsObject)(plugins);

  var convertedClassNames = pluginNames.reduce(function (xs, pluginName) {
    var classNames = sortedClassNames[pluginName];

    if (pluginName === 'keyword') {
      var preCompiledKeywordObjs = (0, _keywordValueType.generateKeywordValueObjs)(props);
      xs = _extends({}, xs, (0, _keywordValueType.getKeywordClassObjs)(classNames, preCompiledKeywordObjs));
    } else {
      var pluginConfig = pluginsObject[pluginName];
      var name = pluginConfig.name,
          values = pluginConfig.values;


      var propConfigs = (0, _plugins.getPluginPropConfigs)(name, props);

      classNames.forEach(function (cx) {
        var convertedClassName = void 0;
        if (values) {
          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs, values);
        } else {
          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs);
        }

        xs = _extends({}, xs, convertedClassName);
      });
    }

    return xs;
  }, {});

  return sortObjKeysAlphabetically(convertedClassNames);
};