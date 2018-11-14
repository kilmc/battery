'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE$1 = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE$1
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument)
	})
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument)
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument)
	} else {
		return mergeObject(target, source, optionsArgument)
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument)
	}, {})
};

var deepmerge_1 = deepmerge;

// getPlugins
// ------------------------------------------------------------------
// Filters propConfigs by enabled[pluginName]

var getPluginPropConfigs = function getPluginPropConfigs(pluginName, propConfigs) {
  return propConfigs.filter(function (prop) {
    return prop.enablePlugin === pluginName;
  });
}; // createPluginsObject
// ------------------------------------------------------------------

var createPluginsObject = function createPluginsObject(plugins) {
  return plugins.reduce(function (accum, plugin) {
    accum[plugin.name] = plugin;
    return accum;
  }, {});
}; // getPluginPropNames
// ------------------------------------------------------------------

var createPropNamesObject = function createPropNamesObject(pluginsObject, propConfigs) {
  return Object.keys(pluginsObject).reduce(function (accum, pluginName) {
    var pluginPropConfigs = getPluginPropConfigs(pluginName, propConfigs);
    var pluginPropNames = pluginPropConfigs.map(function (x) {
      return x.propName;
    });

    if (pluginPropNames.length !== 0) {
      accum[pluginName] = pluginPropConfigs.map(function (x) {
        var propName = x.propName,
            _x$separator = x.separator,
            separator = _x$separator === void 0 ? '' : _x$separator;
        return propName + separator;
      });
    }

    return accum;
  }, {});
};

// Strings
// ------------------------------------------------------------------

var subtractArrays = function subtractArrays(arr1, arr2) {
  var returnArr = arr1;
  arr2.map(function (remove) {
    var index = arr1.indexOf(remove);

    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
}; // Formatters

var formatPrefixOrSuffix = function formatPrefixOrSuffix(x, y, prefixOrSuffix) {
  return prefixOrSuffix === 'prefix' ? "".concat(x).concat(y) : "".concat(y).concat(x);
};
var sortAndJoin = function sortAndJoin(arr) {
  return arr.sort(function (a, b) {
    return b.length - a.length;
  }).join('|');
};
var escapeCharacters = function escapeCharacters(str) {
  // const escapeRegex = new RegExp(/([^a-zA-Z\d-_])/, 'g');
  // return str.replace(escapeRegex, '\\$1');
  // Temporarily removed because it escapes legitimate characters
  return str;
};

var getPrefixAndSuffixes = function getPrefixAndSuffixes(pluginsConfig) {
  return pluginsConfig.filter(function (x) {
    return x.prefixOrSuffix;
  }).reduce(function (xs, x) {
    var type = x.prefixOrSuffix,
        modifiers = x.modifiers;
    modifiers.forEach(function (modifier) {
      var indicator = modifier.indicator,
          _modifier$separator = modifier.separator,
          separator = _modifier$separator === void 0 ? '' : _modifier$separator;
      var item = formatPrefixOrSuffix(indicator, separator, type);

      if (xs[type]) {
        xs[type] = xs[type].concat(item);
      } else {
        xs[type] = [item];
      }
    });
    return xs;
  }, {});
};

var buildPrefixAndSuffixRegex = function buildPrefixAndSuffixRegex(pluginsConfig) {
  var prefixesAndSuffixes = getPrefixAndSuffixes(pluginsConfig);
  var prefixes = prefixesAndSuffixes['prefix'];
  var suffixes = prefixesAndSuffixes['suffix'];
  var prefixSuffixRegexes = {};
  if (prefixes) prefixSuffixRegexes['prefix'] = "(^|".concat(sortAndJoin(prefixes), ")");
  if (suffixes) prefixSuffixRegexes['suffix'] = "(".concat(sortAndJoin(suffixes), "|$)");
  return prefixSuffixRegexes;
};

var buildClassNameRegexFn = function buildClassNameRegexFn(pluginsConfig) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var prefixAndSuffixes = {};

  if (pluginsConfig) {
    var hasPrefixesOrSuffixes = pluginsConfig.filter(function (x) {
      return x.prefixOrSuffix;
    }).length > 0;
    if (hasPrefixesOrSuffixes) prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginsConfig);
  }

  var start = prefixAndSuffixes['prefix'] ? prefixAndSuffixes['prefix'] : '(^)';
  var end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';
  return function (propNames) {
    return "".concat(start, "(").concat(sortAndJoin(propNames), ")").concat(body).concat(end);
  };
};

var PLUGIN_TYPES = {
  PATTERN: 'pattern',
  LOOKUP: 'lookup',
  CLASSNAME: 'classname',
  KEYWORD: 'keyword',
  ATRULE: 'atrule'
};

var buildValuePluginRegex = function buildValuePluginRegex(pluginConfig) {
  var hasValueModifiers = _typeof(pluginConfig.valueModifiers) === 'object';
  var values;

  if (pluginConfig.type === PLUGIN_TYPES.LOOKUP) {
    values = "(".concat(sortAndJoin(Object.keys(pluginConfig.values)), ")");
  } else {
    values = "(".concat(pluginConfig.valueRegexString, ")");
  }

  var valueModifiers;
  var hasDefaultModifierIndicator;

  if (hasValueModifiers) {
    var modifiersConfigs = pluginConfig.valueModifiers;
    hasDefaultModifierIndicator = modifiersConfigs.some(function (x) {
      return x.default === true;
    });
    var modifiers = modifiersConfigs.reduce(function (accum, config) {
      var _config$separator = config.separator,
          separator = _config$separator === void 0 ? '' : _config$separator,
          indicator = config.indicator;
      return accum.concat("".concat(separator).concat(indicator));
    }, []);
    valueModifiers = "(".concat(sortAndJoin(modifiers), ")?"); // TODO: This line seems redundant

    if (hasDefaultModifierIndicator) valueModifiers = "".concat(valueModifiers);
  }

  return "".concat(values).concat(hasValueModifiers ? valueModifiers : '()?');
};

var generateRegexObj = function generateRegexObj(groupName, arr, regexFn) {
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
var generateValuePluginRegexObj = function generateValuePluginRegexObj(plugins, propConfigs) {
  var pluginsObject = createPluginsObject(plugins);

  var isValuePlugin = function isValuePlugin(x) {
    return pluginsObject[x].type === PLUGIN_TYPES.PATTERN || pluginsObject[x].type === PLUGIN_TYPES.LOOKUP;
  };

  var propNamesObject = createPropNamesObject(pluginsObject, propConfigs);
  return Object.keys(pluginsObject).filter(isValuePlugin).reduce(function (accum, pluginName) {
    var props = propNamesObject[pluginName];
    var pluginRegexFn = buildClassNameRegexFn(plugins, buildValuePluginRegex(pluginsObject[pluginName]));
    accum = deepmerge_1(accum, generateRegexObj(pluginName, props, pluginRegexFn));
    return accum;
  }, {});
};
var generateKeywordValueRegexObj = function generateKeywordValueRegexObj(precompiledClassObjects, pluginsConfig) {
  var atomKeys = Object.keys(precompiledClassObjects);
  var regexFn = buildClassNameRegexFn(pluginsConfig);
  return generateRegexObj(PLUGIN_TYPES.KEYWORD, atomKeys, regexFn);
};

var getKeywordClassObjs = function getKeywordClassObjs(classNames, precompiledClassObjects) {
  if (!precompiledClassObjects) return null;
  var atomKeys = Object.keys(precompiledClassObjects);
  var keywordRegex = new RegExp("(.*?)(".concat(atomKeys.sort(function (a, b) {
    return b.length - a.length;
  }).join('|'), ")(.*)"));
  var matchedClassNames = classNames.filter(function (x) {
    return x.match(keywordRegex);
  });
  var returnedAtoms = matchedClassNames.reduce(function (accum, cx) {
    var cleanClass = cx.replace(keywordRegex, '$2');
    accum[cx] = precompiledClassObjects[cleanClass];
    return accum;
  }, {});
  subtractArrays(classNames, matchedClassNames);
  return returnedAtoms;
};

var generateClassObject = function generateClassObject(_ref) {
  var className = _ref.className,
      cssProps = _ref.cssProps,
      value = _ref.value;
  var eachProp = cssProps.split(' ').reduce(function (props, prop) {
    props[prop] = value;
    return props;
  }, {});
  return _defineProperty({}, className, eachProp);
};
var generateKeywordValueObjs = function generateKeywordValueObjs(props) {
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
        separator = _propConfig$keywordVa2 === void 0 ? '' : _propConfig$keywordVa2,
        values = _propConfig$keywordVa.values;
    var classNames = Object.keys(values).reduce(function (classObjects, valueName) {
      classObjects = _objectSpread({}, classObjects, generateClassObject({
        className: "".concat(propName).concat(valueName === 'default' ? '' : separator + valueName),
        cssProps: prop,
        value: values[valueName]
      }));
      return classObjects;
    }, {});
    accum = _objectSpread({}, accum, classNames);
    return accum;
  }, {});
};

var getPropConfigValue = function getPropConfigValue(key) {
  return function (cxPropName, propConfigs) {
    if (cxPropName === '') {
      return propConfigs.filter(function (x) {
        return x.pluginDefault === true;
      }).map(function (x) {
        return x[key];
      }).reduce(function (xs, x) {
        return xs.concat(x);
      }, []).filter(function (x) {
        return x !== undefined;
      });
    } else {
      return propConfigs.filter(function (x) {
        var propName = x.propName,
            _x$separator = x.separator,
            separator = _x$separator === void 0 ? '' : _x$separator;
        return cxPropName === propName + separator;
      }).map(function (x) {
        return x[key];
      }).reduce(function (xs, x) {
        return xs.concat(x);
      }, []).filter(function (x) {
        return x !== undefined;
      });
    }
  };
};

var getProps = getPropConfigValue('prop');

var modifyValue = function modifyValue(value, modifier, pluginConfig) {
  var hasDefaultModifier = pluginConfig.valueModifiers.some(function (x) {
    return x.default === true;
  });
  var modifierValue;

  if (hasDefaultModifier && modifier === undefined) {
    modifier = '';
  }

  if (modifier !== undefined) {
    var valueModifier = pluginConfig.valueModifiers.sort(function (a, b) {
      return b.indicator.length - a.indicator.length;
    }).filter(function (x) {
      var _x$separator2 = x.separator,
          separator = _x$separator2 === void 0 ? '' : _x$separator2,
          indicator = x.indicator;
      var regex = new RegExp("".concat(separator + indicator));

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

var getValue = function getValue(value, modifier, pluginConfig, lookupValues, propConfig) {
  if (lookupValues) {
    value = lookupValues[value];
  }

  if (pluginConfig.valueModifiers) {
    value = modifyValue(value, modifier, pluginConfig);
  }

  if (propConfig && propConfig.cssFunction) {
    value = "".concat(propConfig.cssFunction, "(").concat(value, ")");
  }

  return value;
};

var getAllowedValues = getPropConfigValue('allowedValues');
var getDisallowedValues = getPropConfigValue('disallowedValues');

var isRestrictedValue = function isRestrictedValue(value, propName, propConfigs) {
  var allowedValues = getAllowedValues(propName, propConfigs);
  var disallowedValues = getDisallowedValues(propName, propConfigs);

  if (allowedValues.length) {
    return !allowedValues.includes(value);
  }

  if (disallowedValues.length) {
    return disallowedValues.includes(value);
  }

  return false;
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
    var propConfig = propConfigs.filter(function (propConfig) {
      return propConfig.propName === propName;
    })[0];
    var value = classNameArr[3];
    if (isRestrictedValue(value, propName, propConfigs)) return zs;
    var valueModifier = classNameArr[4];
    var convertedClassObj = generateClassObject({
      className: className,
      cssProps: getProps(propName, propConfigs).join(''),
      value: getValue(value, valueModifier, pluginConfig, lookupValues, propConfig)
    });
    zs = _objectSpread({}, zs, convertedClassObj);
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

var convertClassNamestoClassObjs = function convertClassNamestoClassObjs(sortedClassNames, plugins, props) {
  var pluginNames = Object.keys(sortedClassNames);
  var pluginRegexes = generateValuePluginRegexObj(plugins, props);
  var pluginsObject = createPluginsObject(plugins);
  var convertedClassNames = pluginNames.reduce(function (xs, pluginName) {
    var classNames = sortedClassNames[pluginName];

    if (pluginName === 'keyword') {
      var preCompiledKeywordObjs = generateKeywordValueObjs(props);
      xs = _objectSpread({}, xs, getKeywordClassObjs(classNames, preCompiledKeywordObjs));
    } else {
      var pluginConfig = pluginsObject[pluginName];
      var name = pluginConfig.name,
          values = pluginConfig.values;
      var propConfigs = getPluginPropConfigs(name, props);
      classNames.forEach(function (cx) {
        var convertedClassName;

        if (values) {
          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs, values);
        } else {
          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs);
        }

        xs = _objectSpread({}, xs, convertedClassName);
      });
    }

    return xs;
  }, {});
  return sortObjKeysAlphabetically(convertedClassNames);
};

var formatBorderProp = function formatBorderProp(rootProp, subProp) {
  var _rootProp$split = rootProp.split('-'),
      _rootProp$split2 = _slicedToArray(_rootProp$split, 2),
      start = _rootProp$split2[0],
      end = _rootProp$split2[1];

  return "".concat(start, "-").concat(subProp, "-").concat(end);
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
        subPropSeparator = _subPropConfig$subPro === void 0 ? '' : _subPropConfig$subPro,
        rest = _objectWithoutProperties(subPropConfig, ["prop", "propName", "subProps", "subPropSeparator"]);

    return Object.keys(subProps).reduce(function (accumPropConfigs, x) {
      var subProp = subProps[x].split(' ');
      var processedSubProp = prop.match('border-') ? subProp.map(function (y) {
        return formatBorderProp(prop, y);
      }).join(' ') : subProp.map(function (y) {
        return "".concat(prop, "-").concat(y);
      }).join(' ');

      var newPropConfig = _objectSpread({
        prop: processedSubProp,
        propName: "".concat(propName).concat(subPropSeparator).concat(x)
      }, rest);

      return accumPropConfigs.concat(newPropConfig);
    }, []);
  }).reduce(function (accum, x) {
    return accum.concat(x);
  }, []);
  return _objectSpread({}, config, {
    props: _toConsumableArray(config.props).concat(_toConsumableArray(convertedPropConfigs))
  });
};

var processPropConfigs = function processPropConfigs(config) {
  return convertSubProps(config);
};

var processConfig = function processConfig(config) {
  return processPropConfigs(config);
};

var sortClassNames = function sortClassNames(classNames, sequencedRegexes) {
  return Object.keys(sequencedRegexes).reduce(function (classNameGroups, pluginName) {
    var matchedClassNames = classNames.filter(function (cx) {
      return cx.match(sequencedRegexes[pluginName]);
    });

    if (matchedClassNames.length !== 0) {
      if (!classNameGroups[pluginName]) {
        classNameGroups[pluginName] = matchedClassNames;
      } else {
        classNameGroups[pluginName] = _toConsumableArray(classNameGroups[pluginName]).concat(_toConsumableArray(matchedClassNames));
      }
    }

    classNames = subtractArrays(classNames, matchedClassNames);
    return classNameGroups;
  }, {});
};

var classTypeToClassObj = function classTypeToClassObj(pluginName, classNames, config) {
  var plugin = config.plugins.filter(function (plugin) {
    return plugin.name === pluginName;
  })[0];
  var rootClassName = plugin.className[0];
  var rootClassNameStyles;

  if (plugin.className.length === 2) {
    rootClassNameStyles = plugin.className[1];
  }

  var modifierRegexes = [];

  if (plugin.modifiers) {
    modifierRegexes = plugin.modifiers.reduce(function (accum, modifier) {
      var regex = modifier.regex,
          _modifier$separator = modifier.separator,
          separator = _modifier$separator === void 0 ? '' : _modifier$separator,
          _modifier$regexSepara = modifier.regexSeparator,
          regexSeparator = _modifier$regexSepara === void 0 ? '' : _modifier$regexSepara,
          className = modifier.className;
      var suffix;

      if (regex && className) {
        suffix = "".concat(className[0]).concat(regexSeparator).concat(regex);
      } else if (regex) {
        suffix = regex;
      } else {
        suffix = className[0];
      }

      accum.push("".concat(separator).concat(suffix));

      if (rootClassNameStyles) {
        accum.push('$');
      }

      return accum;
    }, []);
  }

  var classTypeRegex = new RegExp("".concat(rootClassName, "(").concat(modifierRegexes.sort(function (a, b) {
    return b.length - a.length;
  }).join('|'), ")"));
  return classNames.reduce(function (accum, cx) {
    if (!cx.match(classTypeRegex)) return accum;
    var pluginModifier;

    if (plugin.modifiers) {
      pluginModifier = plugin.modifiers.filter(function (modifier) {
        var regex = modifier.regex,
            _modifier$separator2 = modifier.separator,
            separator = _modifier$separator2 === void 0 ? '' : _modifier$separator2,
            _modifier$regexSepara2 = modifier.regexSeparator,
            regexSeparator = _modifier$regexSepara2 === void 0 ? '' : _modifier$regexSepara2,
            className = modifier.className;
        var suffix;

        if (regex && className) {
          suffix = "".concat(className[0]).concat(regexSeparator).concat(regex);
        } else if (regex) {
          suffix = regex;
        } else {
          suffix = className[0];
        }

        return new RegExp("".concat(rootClassName).concat(separator).concat(suffix)).test(cx);
      })[0];
    }

    if (!pluginModifier) {
      accum[cx] = rootClassNameStyles;
      return accum;
    }

    var modifierClassNameStyles;

    if (!!pluginModifier.className && pluginModifier.className.length === 2) {
      modifierClassNameStyles = pluginModifier.className[1];
    }

    var modifierStyles = modifierClassNameStyles ? modifierClassNameStyles : pluginModifier.modifierFn(cx.match(new RegExp(pluginModifier.regex))[0]);
    accum[cx] = modifierStyles;
    return accum;
  }, {});
};
var generateClassTypeClassNames = function generateClassTypeClassNames(plugins) {
  return plugins.reduce(function (sorted, plugin) {
    sorted[plugin.name] = plugin.className[0];
    return sorted;
  }, {});
};
var processClassType = function processClassType(classNames, config) {
  var plugins = config.plugins;
  var classTypePlugins = plugins.filter(function (plugin) {
    return plugin.type === 'class';
  });
  if (classTypePlugins.length < 1) return {};
  var pluginClassNamesObj = generateClassTypeClassNames(classTypePlugins);
  var classTypeClassObjs = Object.keys(pluginClassNamesObj).reduce(function (accum, pluginName) {
    accum = _objectSpread({}, classTypeToClassObj(pluginName, classNames, config), accum);
    return accum;
  }, {});
  Object.entries(classTypeClassObjs).forEach(function (classObj) {
    var _classObj = _slicedToArray(classObj, 2),
        cx = _classObj[0],
        styles = _classObj[1];

    if (Array.isArray(styles)) {
      classTypeClassObjs[cx] = Object.values(generateLibrary(styles, config)).reduce(function (xs, x) {
        xs = _objectSpread({}, x, xs);
        return xs;
      }, {});
    }
  });
  return classTypeClassObjs;
};

var singleLineClass = function singleLineClass(className, classBody) {
  return ".".concat(className, " { ").concat(classBody, " }");
};

var multiLineClass = function multiLineClass(className, classBody, indent) {
  return ".".concat(className, " {\n  ").concat(classBody, "\n").concat(indent ? '  ' : '', "}");
};

var generateClass = function generateClass(className, declarations, multiple, indent) {
  var escapedClassName = escapeCharacters(className);
  var classBody = Object.keys(declarations).map(function (prop) {
    return "".concat(indent && multiple ? '  ' : '').concat(prop, ": ").concat(declarations[prop], ";");
  }).join(multiple ? '\n  ' : ' ');
  return multiple ? multiLineClass(escapedClassName, classBody, indent) : singleLineClass(escapedClassName, classBody);
};
var shorthandProps = ['border', 'border-top', 'border-bottom', 'border-left', 'border-right', 'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'];
var filterUtilityClasses = function filterUtilityClasses(obj, classPlugins) {
  var regex = classPlugins.reduce(function (pluginRegex, plugin) {
    var modifiers = plugin.modifiers;
    var root = plugin.className[0];
    var includeRoot = plugin.className[1] ? [plugin.className[0]] : [];
    var modifierStrings = [];

    if (modifiers) {
      modifierStrings = modifiers.reduce(function (accum, modifier) {
        var _modifier$regex = modifier.regex,
            regex = _modifier$regex === void 0 ? '' : _modifier$regex,
            _modifier$regexSepara = modifier.regexSeparator,
            regexSeparator = _modifier$regexSepara === void 0 ? '' : _modifier$regexSepara,
            _modifier$separator = modifier.separator,
            separator = _modifier$separator === void 0 ? '' : _modifier$separator,
            className = modifier.className;
        var modifierClassName = className && className[0] ? className[0] : '';
        var item = "".concat(root).concat(separator).concat(modifierClassName).concat(regexSeparator).concat(regex);
        return accum.concat(item);
      }, []);
    }

    var pluginRegexSet = includeRoot.concat(modifierStrings);
    return pluginRegex.concat(pluginRegexSet);
  }, []).join('|');
  var utilityClassNames = Object.keys(obj).filter(function (className) {
    return className.match(regex);
  });
  return utilityClassNames.reduce(function (accum, cx) {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

var orderShorthandProps = function orderShorthandProps(obj) {
  var shorthandClasses = Object.keys(obj).filter(function (className) {
    var props = Object.keys(obj[className]);
    return props.some(function (prop) {
      return shorthandProps.includes(prop);
    });
  }).sort();
  return shorthandClasses.reduce(function (accum, cx) {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

var orderClassesByProperty = function orderClassesByProperty(obj) {
  var orderedClassNames = Object.keys(obj).sort(function (a, b) {
    var propA = Object.keys(obj[a])[0];
    var propB = Object.keys(obj[b])[0];
    return propA.localeCompare(propB);
  });
  return orderedClassNames.reduce(function (accum, cx) {
    accum[cx] = obj[cx];
    Reflect.deleteProperty(obj, cx);
    return accum;
  }, {});
};

var orderClasses = function orderClasses(obj, config) {
  var utilityClasses = {};

  if (config.plugins) {
    var classTypePlugins = config.plugins.filter(function (plugin) {
      return plugin.type === 'class';
    });
    utilityClasses = filterUtilityClasses(obj, classTypePlugins);
  }

  var shorthandClasses = orderShorthandProps(obj);
  var remainingClasses = orderClassesByProperty(obj);
  return _objectSpread({}, utilityClasses, shorthandClasses, remainingClasses);
};

var generateClasses = function generateClasses(obj) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (Object.keys(obj).length < 1) return;
  return Object.keys(obj).map(function (cx) {
    var multiple = Object.keys(obj[cx]).length > 1;
    return generateClass(cx, obj[cx], multiple, indent);
  }).join(indent ? '\n  ' : '\n');
};

var generateLibrary = function generateLibrary(classNames, config) {
  var _processConfig = processConfig(config),
      props = _processConfig.props,
      _processConfig$plugin = _processConfig.plugins,
      plugins = _processConfig$plugin === void 0 ? [] : _processConfig$plugin;

  var toProcessClasses = _toConsumableArray(classNames);

  var classObjs;
  var keywordValueRegexes; // KeywordValues

  var keywordValueObjs = generateKeywordValueObjs(props);
  keywordValueRegexes = generateKeywordValueRegexObj(keywordValueObjs, plugins);
  var valuePluginRegexes = generateValuePluginRegexObj(plugins, props);
  var pluginRegexes = deepmerge_1(valuePluginRegexes, keywordValueRegexes); // Sort classnames

  var sortedClassNames = sortClassNames(toProcessClasses, pluginRegexes); // Convert sorted classnames into classObjs

  var convertedClassNames = convertClassNamestoClassObjs(sortedClassNames, plugins, props);

  if (plugins.length > 1) {
    classObjs = _objectSpread({}, processClassType(toProcessClasses, config));
  }

  classObjs = _objectSpread({}, classObjs, convertedClassNames);
  return orderClasses(classObjs, config);
};

var processClassNameType = function processClassNameType(classes, pluginConfig) {
  var modifiers = pluginConfig.modifiers,
      prefixOrSuffix = pluginConfig.prefixOrSuffix;
  modifiers.forEach(function (modifier) {
    var indicator = modifier.indicator,
        separator = modifier.separator,
        modifierFn = modifier.modifierFn;
    var item = formatPrefixOrSuffix(indicator, separator, prefixOrSuffix);
    var itemRegex = prefixOrSuffix === 'prefix' ? "^".concat(item) : "".concat(item, "$");
    Object.keys(classes).forEach(function (cx) {
      if (new RegExp(itemRegex).test(cx)) {
        classes["".concat(modifierFn(cx, indicator))] = classes[cx];
        Reflect.deleteProperty(classes, cx);
      }
    });
  });
};

var processClassNameTypes = function processClassNameTypes(library, plugins) {
  var classNamePlugins = plugins.filter(function (x) {
    return x.type === PLUGIN_TYPES.CLASSNAME;
  });

  if (classNamePlugins.length > 0) {
    classNamePlugins.forEach(function (pluginConfig) {
      processClassNameType(library, pluginConfig);
    });
  }
};

var generateAtRuleCSS = function generateAtRuleCSS(_ref) {
  var atrule = _ref.atrule,
      output = _ref.output,
      library = _ref.library,
      condition = _ref.condition;
  var renderedClasses = generateClasses(library, true);
  if (!renderedClasses) return output;
  var renderedAtrule = "@".concat(atrule, " ").concat(condition, " {\n  ").concat(renderedClasses, "\n}");
  return output += renderedAtrule;
};

var generateAtRule = function generateAtRule(classes, pluginConfig) {
  var modifiers = pluginConfig.modifiers,
      prefixOrSuffix = pluginConfig.prefixOrSuffix;
  return modifiers.reduce(function (groups, modifier) {
    var indicator = modifier.indicator,
        separator = modifier.separator;
    var item = formatPrefixOrSuffix(indicator, separator, prefixOrSuffix);
    var itemRegex = prefixOrSuffix === 'prefix' ? "^".concat(item) : "".concat(item, "$");
    var matchedClasses = Object.keys(classes).reduce(function (groupClasses, cx) {
      if (new RegExp(itemRegex).test(cx)) {
        groupClasses[cx] = classes[cx];
        Reflect.deleteProperty(classes, cx);
        return groupClasses;
      } else {
        return groupClasses;
      }
    }, {});
    groups[indicator] = _objectSpread({}, groups[indicator], matchedClasses);
    return groups;
  }, {});
};

var generateAtRules = function generateAtRules(library, plugins, renderAs) {
  var atrulePlugins = plugins.filter(function (x) {
    return x.type === PLUGIN_TYPES.ATRULE;
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
        processClassNameTypes(atruleGroups[indicator], plugins);

        if (renderAs === 'css') {
          atRuleCSS = generateAtRuleCSS({
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

var generateCSS = function generateCSS(classNames, config) {
  var library = generateLibrary(classNames, config);
  var libraryCSS = '';
  libraryCSS += generateAtRules(library, config.plugins, 'css');
  processClassNameTypes(library, config.plugins);
  libraryCSS = [generateClasses(library), libraryCSS].filter(function (x) {
    return x !== undefined;
  }).join('\n').toString();
  return libraryCSS;
};

exports.generateCSS = generateCSS;
