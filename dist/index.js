(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cssesc')) :
	typeof define === 'function' && define.amd ? define(['exports', 'cssesc'], factory) :
	(factory((global.battery = {}),global.cssesc));
}(this, (function (exports,cssesc) { 'use strict';

	cssesc = cssesc && cssesc.hasOwnProperty('default') ? cssesc['default'] : cssesc;

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
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
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

	// Strings

	// Arrays
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
	};

	// Formatters
	var formatPrefixOrSuffix = function formatPrefixOrSuffix(x, y, prefixOrSuffix) {
	  return prefixOrSuffix === 'prefix' ? '' + x + y : '' + y + x;
	};

	var sortAndJoin = function sortAndJoin(arr) {
	  return arr.sort(function (a, b) {
	    return b.length - a.length;
	  }).join('|');
	};

	var renameKeys = function renameKeys(obj, filterFn, modifierFn) {
	  Object.keys(obj).filter(filterFn).forEach(function (key) {
	    obj['' + modifierFn(key)] = obj[key];
	    Reflect.deleteProperty(obj, key);
	  });
	};

	// getPlugins

	// getPluginConfigs
	// ------------------------------------------------------------------
	// Filters propConfigs by enabled[pluginName]

	var getPluginPropConfigs = function getPluginPropConfigs(pluginName, propConfigs) {
	  return propConfigs.filter(function (prop) {
	    return prop.enablePlugin === pluginName;
	  });
	};

	// createPluginsObject
	// ------------------------------------------------------------------
	var createPluginsObject = function createPluginsObject(plugins) {
	  return plugins.reduce(function (accum, plugin) {
	    accum[plugin.name] = plugin;
	    return accum;
	  }, {});
	};

	// getPluginPropNames
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
	            separator = _x$separator === undefined ? '' : _x$separator;

	        return propName + separator;
	      });
	    }

	    return accum;
	  }, {});
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
	          separator = _modifier$separator === undefined ? '' : _modifier$separator;

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

	  if (prefixes) prefixSuffixRegexes['prefix'] = '(^|' + sortAndJoin(prefixes) + ')';
	  if (suffixes) prefixSuffixRegexes['suffix'] = '(' + sortAndJoin(suffixes) + '|$)';
	  return prefixSuffixRegexes;
	};

	var PLUGIN_TYPES = {
	  PATTERN: 'pattern',
	  LOOKUP: 'lookup',
	  CLASSNAME: 'classname',
	  KEYWORD: 'keyword',
	  ATRULE: 'atrule'
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var defineProperty = function (obj, key, value) {
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
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
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
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	var buildValuePluginRegex = function buildValuePluginRegex(pluginConfig) {
	  var hasValueModifiers = _typeof(pluginConfig.valueModifiers) === 'object';
	  var values = void 0;

	  if (pluginConfig.type === PLUGIN_TYPES.LOOKUP) {
	    values = '(' + sortAndJoin(Object.keys(pluginConfig.values)) + ')';
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

	    valueModifiers = '(' + sortAndJoin(modifiers) + ')?';

	    // TODO: This line seems redundant
	    if (hasDefaultModifierIndicator) valueModifiers = '' + valueModifiers;
	  }
	  return '' + values + (hasValueModifiers ? valueModifiers : '()?');
	};

	var buildClassNameRegexFn$$1 = function buildClassNameRegexFn$$1(pluginsConfig) {
	  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  var prefixAndSuffixes = {};
	  var hasPrefixesOrSuffixes = pluginsConfig.filter(function (x) {
	    return x.prefixOrSuffix;
	  }).length > 0;

	  if (hasPrefixesOrSuffixes) prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginsConfig);

	  var start = prefixAndSuffixes['prefix'] ? prefixAndSuffixes['prefix'] : '(^)';

	  var end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';

	  return function (propNames) {
	    return start + '(' + sortAndJoin(propNames) + ')' + body + end;
	  };
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
	    var pluginRegexFn = buildClassNameRegexFn$$1(plugins, buildValuePluginRegex(pluginsObject[pluginName]));

	    accum = deepmerge_1(accum, generateRegexObj(pluginName, props, pluginRegexFn));

	    return accum;
	  }, {});
	};

	var generateKeywordValueRegexObj = function generateKeywordValueRegexObj(precompiledClassObjects, pluginsConfig) {
	  var atomKeys = Object.keys(precompiledClassObjects);
	  var regexFn = buildClassNameRegexFn$$1(pluginsConfig);

	  return generateRegexObj(PLUGIN_TYPES.KEYWORD, atomKeys, regexFn);
	};

	var generateClassObject = function generateClassObject(_ref) {
	  var className = _ref.className,
	      cssProps = _ref.cssProps,
	      value = _ref.value;

	  var eachProp = cssProps.split(' ').reduce(function (props, prop) {
	    props[prop] = value;
	    return props;
	  }, {});
	  return defineProperty({}, className, eachProp);
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
	            separator = _x$separator === undefined ? '' : _x$separator;

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

	var getAllowedValues = getPropConfigValue('allowedValues');
	var getDisallowedValues = getPropConfigValue('disallowedValues');

	var isRestrictedValue = function isRestrictedValue(value, propName, propConfigs) {
	  var allowedValues = getAllowedValues(propName, propConfigs);
	  var disallowedValues = getDisallowedValues(propName, propConfigs);

	  if (allowedValues.length) return !allowedValues.includes(value);
	  if (disallowedValues.length) return disallowedValues.includes(value);
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

	    var value = classNameArr[3];
	    if (isRestrictedValue(value, propName, propConfigs)) return zs;
	    var valueModifier = classNameArr[4];

	    var convertedClassObj = generateClassObject({
	      className: className,
	      cssProps: getProps(propName, propConfigs).join(''),
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

	var convertClassNamestoClassObjs = function convertClassNamestoClassObjs(sortedClassNames, plugins, props) {
	  var pluginNames = Object.keys(sortedClassNames);
	  var pluginRegexes = generateValuePluginRegexObj(plugins, props);
	  var pluginsObject = createPluginsObject(plugins);

	  var convertedClassNames = pluginNames.reduce(function (xs, pluginName) {
	    var classNames = sortedClassNames[pluginName];

	    if (pluginName === 'keyword') {
	      var preCompiledKeywordObjs = generateKeywordValueObjs(props);
	      xs = _extends({}, xs, getKeywordClassObjs(classNames, preCompiledKeywordObjs));
	    } else {
	      var pluginConfig = pluginsObject[pluginName];
	      var name = pluginConfig.name,
	          values = pluginConfig.values;


	      var propConfigs = getPluginPropConfigs(name, props);

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
	        separator = _propConfig$keywordVa2 === undefined ? '' : _propConfig$keywordVa2,
	        values = _propConfig$keywordVa.values;


	    var classNames = Object.keys(values).reduce(function (classObjects, valueName) {
	      classObjects = _extends({}, classObjects, generateClassObject({
	        className: '' + propName + (valueName === 'default' ? '' : separator + valueName),
	        cssProps: prop,
	        value: values[valueName]
	      }));

	      return classObjects;
	    }, {});

	    accum = _extends({}, accum, classNames);
	    return accum;
	  }, {});
	};

	var getKeywordClassObjs = function getKeywordClassObjs(classNames, precompiledClassObjects) {
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

	  subtractArrays(classNames, matchedClassNames);
	  return returnedAtoms;
	};

	var formatBorderProp = function formatBorderProp(rootProp, subProp) {
	  var _rootProp$split = rootProp.split('-'),
	      _rootProp$split2 = slicedToArray(_rootProp$split, 2),
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
	        rest = objectWithoutProperties(subPropConfig, ['prop', 'propName', 'subProps', 'subPropSeparator']);


	    return Object.keys(subProps).reduce(function (accumPropConfigs, x) {
	      var subProp = subProps[x].split(' ');
	      var processedSubProp = prop.match('border-') ? subProp.map(function (y) {
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
	    props: [].concat(toConsumableArray(config.props), toConsumableArray(convertedPropConfigs))
	  });
	};
	var processPropConfigs = function processPropConfigs(config) {
	  return convertSubProps(config);
	};

	var processConfig = function processConfig(config) {
	  return processPropConfigs(config);
	};

	var hasMolecules = function hasMolecules(arr, config) {
	  return arr.filter(function (x) {
	    return config.molecules.expand[x];
	  }).length > 0 || arr.filter(function (x) {
	    return config.molecules.merge[x];
	  }).length > 0;
	};

	var unboundCleanMolecule = function unboundCleanMolecule(config) {
	  return function (cx) {
	    var _config$molecules = config.molecules,
	        expand = _config$molecules.expand,
	        merge = _config$molecules.merge;

	    var allMolecules = [].concat(toConsumableArray(Object.keys(expand)), toConsumableArray(Object.keys(merge)));
	    var regex = new RegExp(buildClassNameRegexFn$$1(config.plugins)(allMolecules));

	    return cx.replace(regex, '$2');
	  };
	};

	var getAtoms = function getAtoms(moleculesArr, config) {
	  var cleanMolecule = unboundCleanMolecule(config);
	  var _config$molecules2 = config.molecules,
	      expand = _config$molecules2.expand,
	      merge = _config$molecules2.merge;


	  return moleculesArr.reduce(function (xs, x) {
	    var cx = cleanMolecule(x);
	    var gathered = [];

	    if (expand[cx]) {
	      gathered = gathered.concat(expand[cx].split(' '));
	    } else if (merge[cx]) {
	      gathered = gathered.concat(merge[cx].split(' '));
	    } else {
	      gathered = gathered.concat(x);
	    }

	    return xs.concat(gathered);
	  }, []);
	};

	var expandMolecules = function expandMolecules(moleculesArr, config) {
	  var expandedAtoms = [];

	  if (expandedAtoms.length < 1) expandedAtoms = getAtoms(moleculesArr, config);
	  if (hasMolecules(expandedAtoms, config)) expandedAtoms = expandMolecules(expandedAtoms, config);

	  return [].concat(toConsumableArray(new Set(expandedAtoms)));
	};

	var mergeMolecules = function mergeMolecules(classNames, classObjs, config) {
	  var _config$molecules3 = config.molecules,
	      merge = _config$molecules3.merge,
	      expand = _config$molecules3.expand;

	  var cleanMolecule = unboundCleanMolecule(config);
	  return classNames.reduce(function (xs, x) {
	    var cx = cleanMolecule(x);
	    if (merge[cx]) {
	      xs[x] = Object.assign.apply(Object, [{}].concat(toConsumableArray(merge[cx].split(' ').map(function (x) {
	        return classObjs[x];
	      }))));
	    } else if (expand[cx]) {
	      xs = _extends({}, xs, mergeMolecules(expand[cx].split(' '), classObjs, config));
	    }

	    return xs;
	  }, {});
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
	        classNameGroups[pluginName] = [].concat(toConsumableArray(classNameGroups[pluginName]), toConsumableArray(matchedClassNames));
	      }
	    }
	    classNames = subtractArrays(classNames, matchedClassNames);

	    return classNameGroups;
	  }, {});
	};

	var generateLibrary = function generateLibrary(classNames, config) {
	  var _processConfig = processConfig(config),
	      props = _processConfig.props,
	      settings = _processConfig.settings,
	      plugins = _processConfig.plugins;

	  var expandedMoluecules = [];
	  var toProcessClasses = [].concat(toConsumableArray(classNames));

	  if (config.molecules) {
	    expandedMoluecules = expandMolecules(classNames, config);
	    toProcessClasses = toProcessClasses.concat(expandedMoluecules);
	  }

	  var classObjs = void 0;
	  var keywordValueRegexes = void 0;

	  // KeywordValues
	  if (settings.enableKeywordValues) {
	    var keywordValueObjs = generateKeywordValueObjs(props);
	    keywordValueRegexes = generateKeywordValueRegexObj(keywordValueObjs, plugins);
	  }

	  var valuePluginRegexes = generateValuePluginRegexObj(plugins, props);
	  var pluginRegexes = deepmerge_1(valuePluginRegexes, keywordValueRegexes);
	  // Sort classnames
	  var sortedClassNames = sortClassNames(toProcessClasses, pluginRegexes);

	  // Convert sorted classnames into classObjs
	  var convertedClassNames = convertClassNamestoClassObjs(sortedClassNames, plugins, props);

	  classObjs = _extends({}, convertedClassNames);

	  if (expandedMoluecules.length > 0) {
	    classObjs = _extends({}, classObjs, mergeMolecules(classNames, classObjs, config));

	    subtractArrays([].concat(toConsumableArray(expandedMoluecules)), [].concat(toConsumableArray(classNames))).forEach(function (cx) {
	      Reflect.deleteProperty(classObjs, cx);
	    });
	  }

	  return classObjs;
	};

	var processClassNameType = function processClassNameType(classes, pluginConfig) {
	  var modifiers = pluginConfig.modifiers,
	      prefixOrSuffix = pluginConfig.prefixOrSuffix;


	  modifiers.forEach(function (modifier) {
	    var indicator = modifier.indicator,
	        separator = modifier.separator,
	        modifierFn = modifier.modifierFn;


	    var item = formatPrefixOrSuffix(indicator, separator, prefixOrSuffix);
	    var itemRegex = prefixOrSuffix === 'prefix' ? '^' + item : item + '$';

	    Object.keys(classes).forEach(function (cx) {
	      if (new RegExp(itemRegex).test(cx)) {
	        classes['' + modifierFn(cx, indicator)] = classes[cx];
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

	var generateClass = function generateClass(className, declarations) {
	  var classBody = Object.keys(declarations).map(function (prop) {
	    return prop + ': ' + declarations[prop] + ';';
	  }).join(' ');

	  return '.' + className + ' { ' + classBody + ' }';
	};

	var generateClasses = function generateClasses(obj) {
	  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  return Object.keys(obj).map(function (cx) {
	    return generateClass(cx, obj[cx]);
	  }).join(indent ? '\n  ' : '\n');
	};

	var generateAtRuleCSS = function generateAtRuleCSS(_ref) {
	  var atrule = _ref.atrule,
	      output = _ref.output,
	      library = _ref.library,
	      condition = _ref.condition;

	  var renderedClasses = generateClasses(library, true);
	  if (!renderedClasses) return output;
	  var renderedAtrule = '\n@' + atrule + ' ' + condition + ' {\n  ' + renderedClasses + '\n}\n';
	  return output += renderedAtrule;
	};

	var generateAtRule = function generateAtRule(classes, pluginConfig) {
	  var modifiers = pluginConfig.modifiers,
	      prefixOrSuffix = pluginConfig.prefixOrSuffix;


	  return modifiers.reduce(function (groups, modifier) {
	    var indicator = modifier.indicator,
	        separator = modifier.separator;


	    var item = formatPrefixOrSuffix(indicator, separator, prefixOrSuffix);
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

	var processDisallowedCharacters = function processDisallowedCharacters(library) {
	  var escape = function escape(str) {
	    return cssesc(str, { isIdentifier: true });
	  };
	  var regex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
	  renameKeys(library, function (x) {
	    return !x.match(regex);
	  }, escape);
	};

	var generateCSS = function generateCSS(classNames, config) {
	  var library = generateLibrary(classNames, config);
	  processDisallowedCharacters(library);
	  var libraryCSS = '';

	  libraryCSS += generateAtRules(library, config.plugins, 'css');

	  processClassNameTypes(library, config.plugins);

	  libraryCSS = generateClasses(library) + '\n' + libraryCSS;

	  return libraryCSS;
	};

	exports.generateCSS = generateCSS;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
