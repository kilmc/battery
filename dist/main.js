/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cssesc/cssesc.js":
/*!***************************************!*\
  !*** ./node_modules/cssesc/cssesc.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*! https://mths.be/cssesc v1.0.1 by @mathias */\n\n\nvar object = {};\nvar hasOwnProperty = object.hasOwnProperty;\nvar merge = function merge(options, defaults) {\n\tif (!options) {\n\t\treturn defaults;\n\t}\n\tvar result = {};\n\tfor (var key in defaults) {\n\t\t// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since\n\t\t// only recognized option names are used.\n\t\tresult[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];\n\t}\n\treturn result;\n};\n\nvar regexAnySingleEscape = /[ -,\\.\\/;-@\\[-\\^`\\{-~]/;\nvar regexSingleEscape = /[ -,\\.\\/;-@\\[\\]\\^`\\{-~]/;\nvar regexAlwaysEscape = /['\"\\\\]/;\nvar regexExcessiveSpaces = /(^|\\\\+)?(\\\\[A-F0-9]{1,6})\\x20(?![a-fA-F0-9\\x20])/g;\n\n// https://mathiasbynens.be/notes/css-escapes#css\nvar cssesc = function cssesc(string, options) {\n\toptions = merge(options, cssesc.options);\n\tif (options.quotes != 'single' && options.quotes != 'double') {\n\t\toptions.quotes = 'single';\n\t}\n\tvar quote = options.quotes == 'double' ? '\"' : '\\'';\n\tvar isIdentifier = options.isIdentifier;\n\n\tvar firstChar = string.charAt(0);\n\tvar output = '';\n\tvar counter = 0;\n\tvar length = string.length;\n\twhile (counter < length) {\n\t\tvar character = string.charAt(counter++);\n\t\tvar codePoint = character.charCodeAt();\n\t\tvar value = void 0;\n\t\t// If it’s not a printable ASCII character…\n\t\tif (codePoint < 0x20 || codePoint > 0x7E) {\n\t\t\tif (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {\n\t\t\t\t// It’s a high surrogate, and there is a next character.\n\t\t\t\tvar extra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) {\n\t\t\t\t\t// next character is low surrogate\n\t\t\t\t\tcodePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;\n\t\t\t\t} else {\n\t\t\t\t\t// It’s an unmatched surrogate; only append this code unit, in case\n\t\t\t\t\t// the next code unit is the high surrogate of a surrogate pair.\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t}\n\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t} else {\n\t\t\tif (options.escapeEverything) {\n\t\t\t\tif (regexAnySingleEscape.test(character)) {\n\t\t\t\t\tvalue = '\\\\' + character;\n\t\t\t\t} else {\n\t\t\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t\t\t}\n\t\t\t\t// Note: `:` could be escaped as `\\:`, but that fails in IE < 8.\n\t\t\t} else if (/[\\t\\n\\f\\r\\x0B:]/.test(character)) {\n\t\t\t\tif (!isIdentifier && character == ':') {\n\t\t\t\t\tvalue = character;\n\t\t\t\t} else {\n\t\t\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t\t\t}\n\t\t\t} else if (character == '\\\\' || !isIdentifier && (character == '\"' && quote == character || character == '\\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {\n\t\t\t\tvalue = '\\\\' + character;\n\t\t\t} else {\n\t\t\t\tvalue = character;\n\t\t\t}\n\t\t}\n\t\toutput += value;\n\t}\n\n\tif (isIdentifier) {\n\t\tif (/^_/.test(output)) {\n\t\t\t// Prevent IE6 from ignoring the rule altogether (in case this is for an\n\t\t\t// identifier used as a selector)\n\t\t\toutput = '\\\\_' + output.slice(1);\n\t\t} else if (/^-[-\\d]/.test(output)) {\n\t\t\toutput = '\\\\-' + output.slice(1);\n\t\t} else if (/\\d/.test(firstChar)) {\n\t\t\toutput = '\\\\3' + firstChar + ' ' + output.slice(1);\n\t\t}\n\t}\n\n\t// Remove spaces after `\\HEX` escapes that are not followed by a hex digit,\n\t// since they’re redundant. Note that this is only possible if the escape\n\t// sequence isn’t preceded by an odd number of backslashes.\n\toutput = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {\n\t\tif ($1 && $1.length % 2) {\n\t\t\t// It’s not safe to remove the space, so don’t.\n\t\t\treturn $0;\n\t\t}\n\t\t// Strip the space.\n\t\treturn ($1 || '') + $2;\n\t});\n\n\tif (!isIdentifier && options.wrap) {\n\t\treturn quote + output + quote;\n\t}\n\treturn output;\n};\n\n// Expose default options (so they can be overridden globally).\ncssesc.options = {\n\t'escapeEverything': false,\n\t'isIdentifier': false,\n\t'quotes': 'single',\n\t'wrap': false\n};\n\ncssesc.version = '1.0.1';\n\nmodule.exports = cssesc;\n\n\n//# sourceURL=webpack:///./node_modules/cssesc/cssesc.js?");

/***/ }),

/***/ "./node_modules/deepmerge/dist/es.js":
/*!*******************************************!*\
  !*** ./node_modules/deepmerge/dist/es.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar isMergeableObject = function isMergeableObject(value) {\n\treturn isNonNullObject(value)\n\t\t&& !isSpecial(value)\n};\n\nfunction isNonNullObject(value) {\n\treturn !!value && typeof value === 'object'\n}\n\nfunction isSpecial(value) {\n\tvar stringValue = Object.prototype.toString.call(value);\n\n\treturn stringValue === '[object RegExp]'\n\t\t|| stringValue === '[object Date]'\n\t\t|| isReactElement(value)\n}\n\n// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25\nvar canUseSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;\n\nfunction isReactElement(value) {\n\treturn value.$$typeof === REACT_ELEMENT_TYPE\n}\n\nfunction emptyTarget(val) {\n\treturn Array.isArray(val) ? [] : {}\n}\n\nfunction cloneUnlessOtherwiseSpecified(value, optionsArgument) {\n\tvar clone = !optionsArgument || optionsArgument.clone !== false;\n\n\treturn (clone && isMergeableObject(value))\n\t\t? deepmerge(emptyTarget(value), value, optionsArgument)\n\t\t: value\n}\n\nfunction defaultArrayMerge(target, source, optionsArgument) {\n\treturn target.concat(source).map(function(element) {\n\t\treturn cloneUnlessOtherwiseSpecified(element, optionsArgument)\n\t})\n}\n\nfunction mergeObject(target, source, optionsArgument) {\n\tvar destination = {};\n\tif (isMergeableObject(target)) {\n\t\tObject.keys(target).forEach(function(key) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);\n\t\t});\n\t}\n\tObject.keys(source).forEach(function(key) {\n\t\tif (!isMergeableObject(source[key]) || !target[key]) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);\n\t\t} else {\n\t\t\tdestination[key] = deepmerge(target[key], source[key], optionsArgument);\n\t\t}\n\t});\n\treturn destination\n}\n\nfunction deepmerge(target, source, optionsArgument) {\n\tvar sourceIsArray = Array.isArray(source);\n\tvar targetIsArray = Array.isArray(target);\n\tvar options = optionsArgument || { arrayMerge: defaultArrayMerge };\n\tvar sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;\n\n\tif (!sourceAndTargetTypesMatch) {\n\t\treturn cloneUnlessOtherwiseSpecified(source, optionsArgument)\n\t} else if (sourceIsArray) {\n\t\tvar arrayMerge = options.arrayMerge || defaultArrayMerge;\n\t\treturn arrayMerge(target, source, optionsArgument)\n\t} else {\n\t\treturn mergeObject(target, source, optionsArgument)\n\t}\n}\n\ndeepmerge.all = function deepmergeAll(array, optionsArgument) {\n\tif (!Array.isArray(array)) {\n\t\tthrow new Error('first argument should be an array')\n\t}\n\n\treturn array.reduce(function(prev, next) {\n\t\treturn deepmerge(prev, next, optionsArgument)\n\t}, {})\n};\n\nvar deepmerge_1 = deepmerge;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (deepmerge_1);\n\n\n//# sourceURL=webpack:///./node_modules/deepmerge/dist/es.js?");

/***/ }),

/***/ "./src/classObject.js":
/*!****************************!*\
  !*** ./src/classObject.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.convertClassNamestoClassObjs = exports.generateClassObject = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _plugins = __webpack_require__(/*! ./plugins/ */ \"./src/plugins/index.js\");\n\nvar _sequencers = __webpack_require__(/*! ./sequencers */ \"./src/sequencers.js\");\n\nvar _keywordValueType = __webpack_require__(/*! ./plugins/keywordValueType */ \"./src/plugins/keywordValueType.js\");\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar generateClassObject = exports.generateClassObject = function generateClassObject(_ref) {\n  var className = _ref.className,\n      cssProps = _ref.cssProps,\n      value = _ref.value;\n\n  var eachProp = cssProps.split(' ').reduce(function (props, prop) {\n    props[prop] = value;\n    return props;\n  }, {});\n  return _defineProperty({}, className, eachProp);\n};\n\nvar getPropConfigValue = function getPropConfigValue(key) {\n  return function (cxPropName, propConfigs) {\n    if (cxPropName === '') {\n      return propConfigs.filter(function (x) {\n        return x.pluginDefault === true;\n      }).map(function (x) {\n        return x[key];\n      }).reduce(function (xs, x) {\n        return xs.concat(x);\n      }, []).filter(function (x) {\n        return x !== undefined;\n      });\n    } else {\n      return propConfigs.filter(function (x) {\n        var propName = x.propName,\n            _x$separator = x.separator,\n            separator = _x$separator === undefined ? '' : _x$separator;\n\n        return cxPropName === propName + separator;\n      }).map(function (x) {\n        return x[key];\n      }).reduce(function (xs, x) {\n        return xs.concat(x);\n      }, []).filter(function (x) {\n        return x !== undefined;\n      });\n    }\n  };\n};\n\nvar getProps = getPropConfigValue('prop');\n\nvar modifyValue = function modifyValue(value, modifier, pluginConfig) {\n  var hasDefaultModifier = pluginConfig.valueModifiers.some(function (x) {\n    return x.default === true;\n  });\n  var modifierValue = void 0;\n\n  if (hasDefaultModifier && modifier === undefined) {\n    modifier = '';\n  }\n\n  if (modifier !== undefined) {\n    var valueModifier = pluginConfig.valueModifiers.sort(function (a, b) {\n      return b.indicator.length - a.indicator.length;\n    }).filter(function (x) {\n      var _x$separator2 = x.separator,\n          separator = _x$separator2 === undefined ? '' : _x$separator2,\n          indicator = x.indicator;\n\n      var regex = new RegExp('' + (separator + indicator));\n\n      if (indicator === '' && modifier !== '') {\n        return false;\n      } else if (modifier === separator + indicator) {\n        return true;\n      } else if (regex.test(modifier)) {\n        modifierValue = modifier.replace(separator, '');\n        return true;\n      } else {\n        return false;\n      }\n    })[0];\n\n    return valueModifier.modifierFn(value, modifierValue);\n  } else {\n    return value;\n  }\n};\n\nvar getValue = function getValue(value, modifier, pluginConfig, lookupValues) {\n  if (lookupValues) {\n    value = lookupValues[value];\n  }\n  if (pluginConfig.valueModifiers) {\n    value = modifyValue(value, modifier, pluginConfig);\n  }\n\n  return value;\n};\n\nvar getAllowedValues = getPropConfigValue('allowedValues');\nvar getDisallowedValues = getPropConfigValue('disallowedValues');\n\nvar isRestrictedValue = function isRestrictedValue(value, propName, propConfigs) {\n  var allowedValues = getAllowedValues(propName, propConfigs);\n  var disallowedValues = getDisallowedValues(propName, propConfigs);\n\n  if (allowedValues.length) return !allowedValues.includes(value);\n  if (disallowedValues.length) return disallowedValues.includes(value);\n  return false;\n};\n\nvar convertClassNameToClassObj = function convertClassNameToClassObj(className, sequencedRegexes, pluginConfig, propConfigs, lookupValues) {\n  var previouslyMatched = 0;\n\n  return Object.keys(sequencedRegexes).reduce(function (zs, pluginName) {\n    if (previouslyMatched === 1) return zs;\n\n    var regexString = sequencedRegexes[pluginConfig.name];\n    if (regexString === undefined) return zs;\n\n    var classNameArr = className.match(regexString);\n    if (classNameArr === null) return zs;\n\n    previouslyMatched = 1;\n\n    var propName = classNameArr[2];\n\n    var value = classNameArr[3];\n    if (isRestrictedValue(value, propName, propConfigs)) return zs;\n    var valueModifier = classNameArr[4];\n\n    var convertedClassObj = generateClassObject({\n      className: className,\n      cssProps: getProps(propName, propConfigs).join(''),\n      value: getValue(value, valueModifier, pluginConfig, lookupValues)\n    });\n\n    zs = _extends({}, zs, convertedClassObj);\n    return zs;\n  }, {});\n};\n\nfunction sortObjKeysAlphabetically(obj) {\n  var ordered = {};\n  Object.keys(obj).sort().forEach(function (key) {\n    ordered[key] = obj[key];\n  });\n  return ordered;\n}\n\nvar convertClassNamestoClassObjs = exports.convertClassNamestoClassObjs = function convertClassNamestoClassObjs(sortedClassNames, plugins, props) {\n  var pluginNames = Object.keys(sortedClassNames);\n  var pluginRegexes = (0, _sequencers.generateValuePluginRegexObj)(plugins, props);\n  var pluginsObject = (0, _plugins.createPluginsObject)(plugins);\n\n  var convertedClassNames = pluginNames.reduce(function (xs, pluginName) {\n    var classNames = sortedClassNames[pluginName];\n\n    if (pluginName === 'keyword') {\n      var preCompiledKeywordObjs = (0, _keywordValueType.generateKeywordValueObjs)(props);\n      xs = _extends({}, xs, (0, _keywordValueType.getKeywordClassObjs)(classNames, preCompiledKeywordObjs));\n    } else {\n      var pluginConfig = pluginsObject[pluginName];\n      var name = pluginConfig.name,\n          values = pluginConfig.values;\n\n\n      var propConfigs = (0, _plugins.getPluginPropConfigs)(name, props);\n\n      classNames.forEach(function (cx) {\n        var convertedClassName = void 0;\n        if (values) {\n          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs, values);\n        } else {\n          convertedClassName = convertClassNameToClassObj(cx, pluginRegexes, pluginConfig, propConfigs);\n        }\n\n        xs = _extends({}, xs, convertedClassName);\n      });\n    }\n\n    return xs;\n  }, {});\n\n  return sortObjKeysAlphabetically(convertedClassNames);\n};\n\n//# sourceURL=webpack:///./src/classObject.js?");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.processConfig = exports.convertSubProps = exports.formatBorderProp = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar formatBorderProp = exports.formatBorderProp = function formatBorderProp(rootProp, subProp) {\n  var _rootProp$split = rootProp.split('-'),\n      _rootProp$split2 = _slicedToArray(_rootProp$split, 2),\n      start = _rootProp$split2[0],\n      end = _rootProp$split2[1];\n\n  return start + '-' + subProp + '-' + end;\n};\n\nvar convertSubProps = function convertSubProps(config) {\n  var propConfigs = config.props;\n\n\n  var subPropConfigs = propConfigs.filter(function (x) {\n    return _typeof(x.subProps) === 'object';\n  });\n\n  var convertedPropConfigs = subPropConfigs.map(function (subPropConfig) {\n    var prop = subPropConfig.prop,\n        propName = subPropConfig.propName,\n        subProps = subPropConfig.subProps,\n        _subPropConfig$subPro = subPropConfig.subPropSeparator,\n        subPropSeparator = _subPropConfig$subPro === undefined ? '' : _subPropConfig$subPro,\n        rest = _objectWithoutProperties(subPropConfig, ['prop', 'propName', 'subProps', 'subPropSeparator']);\n\n    return Object.keys(subProps).reduce(function (accumPropConfigs, x) {\n      var subProp = subProps[x].split(' ');\n      var processedSubProp = prop.match('border-') ? subProp.map(function (y) {\n        return formatBorderProp(prop, y);\n      }).join(' ') : subProp.map(function (y) {\n        return prop + '-' + y;\n      }).join(' ');\n\n      var newPropConfig = _extends({\n        prop: processedSubProp,\n        propName: '' + propName + subPropSeparator + x\n      }, rest);\n\n      return accumPropConfigs.concat(newPropConfig);\n    }, []);\n  }).reduce(function (accum, x) {\n    return accum.concat(x);\n  }, []);\n\n  return _extends({}, config, {\n    props: [].concat(_toConsumableArray(config.props), _toConsumableArray(convertedPropConfigs))\n  });\n};\n\nexports.convertSubProps = convertSubProps;\nvar processPropConfigs = function processPropConfigs(config) {\n  return convertSubProps(config);\n};\n\nvar processConfig = exports.processConfig = function processConfig(config) {\n  return processPropConfigs(config);\n};\n\n//# sourceURL=webpack:///./src/config/index.js?");

/***/ }),

/***/ "./src/generators/generateAtRules.js":
/*!*******************************************!*\
  !*** ./src/generators/generateAtRules.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.generateAtRule = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar _classNameType = __webpack_require__(/*! ../plugins/classNameType */ \"./src/plugins/classNameType.js\");\n\nvar _constants = __webpack_require__(/*! ../plugins/constants */ \"./src/plugins/constants.js\");\n\nvar _generateAtRuleCSS = __webpack_require__(/*! ./generateCSS/generateAtRuleCSS */ \"./src/generators/generateCSS/generateAtRuleCSS.js\");\n\nvar _generateAtRuleCSS2 = _interopRequireDefault(_generateAtRuleCSS);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar generateAtRule = exports.generateAtRule = function generateAtRule(classes, pluginConfig) {\n  var modifiers = pluginConfig.modifiers,\n      prefixOrSuffix = pluginConfig.prefixOrSuffix;\n\n\n  return modifiers.reduce(function (groups, modifier) {\n    var indicator = modifier.indicator,\n        separator = modifier.separator;\n\n\n    var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, prefixOrSuffix);\n    var itemRegex = prefixOrSuffix === 'prefix' ? '^' + item : item + '$';\n\n    var matchedClasses = Object.keys(classes).reduce(function (groupClasses, cx) {\n      if (new RegExp(itemRegex).test(cx)) {\n        groupClasses[cx] = classes[cx];\n        Reflect.deleteProperty(classes, cx);\n        return groupClasses;\n      } else {\n        return groupClasses;\n      }\n    }, {});\n\n    groups[indicator] = _extends({}, groups[indicator], matchedClasses);\n\n    return groups;\n  }, {});\n};\n\nvar generateAtRules = function generateAtRules(library, plugins, renderAs) {\n  var atrulePlugins = plugins.filter(function (x) {\n    return x.type === _constants.PLUGIN_TYPES.ATRULE;\n  });\n\n  var atRuleCSS = '';\n  if (atrulePlugins.length > 0) {\n    atrulePlugins.forEach(function (pluginConfig) {\n      var atrule = pluginConfig.atrule,\n          modifiers = pluginConfig.modifiers;\n\n      var atruleGroups = generateAtRule(library, pluginConfig);\n\n      modifiers.forEach(function (x) {\n        var condition = x.condition,\n            indicator = x.indicator;\n\n\n        (0, _classNameType.processClassNameTypes)(atruleGroups[indicator], plugins);\n\n        if (renderAs === 'css') {\n          atRuleCSS = (0, _generateAtRuleCSS2.default)({\n            atrule: atrule,\n            condition: condition,\n            library: atruleGroups[indicator],\n            output: atRuleCSS\n          });\n        }\n      });\n    });\n  }\n  return atRuleCSS;\n};\n\nexports.default = generateAtRules;\n\n//# sourceURL=webpack:///./src/generators/generateAtRules.js?");

/***/ }),

/***/ "./src/generators/generateCSS/generateAtRuleCSS.js":
/*!*********************************************************!*\
  !*** ./src/generators/generateCSS/generateAtRuleCSS.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _generateClasses = __webpack_require__(/*! ./generateClasses */ \"./src/generators/generateCSS/generateClasses.js\");\n\nvar _generateClasses2 = _interopRequireDefault(_generateClasses);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar generateAtRuleCSS = function generateAtRuleCSS(_ref) {\n  var atrule = _ref.atrule,\n      output = _ref.output,\n      library = _ref.library,\n      condition = _ref.condition;\n\n  var renderedClasses = (0, _generateClasses2.default)(library, true);\n  if (!renderedClasses) return output;\n  var renderedAtrule = '\\n@' + atrule + ' ' + condition + ' {\\n  ' + renderedClasses + '\\n}\\n';\n  return output += renderedAtrule;\n};\n\nexports.default = generateAtRuleCSS;\n\n//# sourceURL=webpack:///./src/generators/generateCSS/generateAtRuleCSS.js?");

/***/ }),

/***/ "./src/generators/generateCSS/generateClasses.js":
/*!*******************************************************!*\
  !*** ./src/generators/generateCSS/generateClasses.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar generateClass = exports.generateClass = function generateClass(className, declarations) {\n  var classBody = Object.keys(declarations).map(function (prop) {\n    return prop + ': ' + declarations[prop] + ';';\n  }).join(' ');\n\n  return '.' + className + ' { ' + classBody + ' }';\n};\n\nvar generateClasses = function generateClasses(obj) {\n  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return Object.keys(obj).map(function (cx) {\n    return generateClass(cx, obj[cx]);\n  }).join(indent ? '\\n  ' : '\\n');\n};\n\nexports.default = generateClasses;\n\n//# sourceURL=webpack:///./src/generators/generateCSS/generateClasses.js?");

/***/ }),

/***/ "./src/generators/generateCSS/index.js":
/*!*********************************************!*\
  !*** ./src/generators/generateCSS/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _cssesc = __webpack_require__(/*! cssesc */ \"./node_modules/cssesc/cssesc.js\");\n\nvar _cssesc2 = _interopRequireDefault(_cssesc);\n\nvar _utils = __webpack_require__(/*! ../../utils */ \"./src/utils.js\");\n\nvar _classNameType = __webpack_require__(/*! ../../plugins/classNameType */ \"./src/plugins/classNameType.js\");\n\nvar _generateLibrary = __webpack_require__(/*! ../generateLibrary */ \"./src/generators/generateLibrary.js\");\n\nvar _generateLibrary2 = _interopRequireDefault(_generateLibrary);\n\nvar _generateClasses = __webpack_require__(/*! ./generateClasses */ \"./src/generators/generateCSS/generateClasses.js\");\n\nvar _generateClasses2 = _interopRequireDefault(_generateClasses);\n\nvar _generateAtRules = __webpack_require__(/*! ../generateAtRules */ \"./src/generators/generateAtRules.js\");\n\nvar _generateAtRules2 = _interopRequireDefault(_generateAtRules);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar processDisallowedCharacters = function processDisallowedCharacters(library) {\n  var escape = function escape(str) {\n    return (0, _cssesc2.default)(str, { isIdentifier: true });\n  };\n  var regex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;\n  (0, _utils.renameKeys)(library, function (x) {\n    return !x.match(regex);\n  }, escape);\n};\n\nvar generateCSS = function generateCSS(classNames, config) {\n  var library = (0, _generateLibrary2.default)(classNames, config);\n  processDisallowedCharacters(library);\n  var libraryCSS = '';\n\n  libraryCSS += (0, _generateAtRules2.default)(library, config.plugins, 'css');\n\n  (0, _classNameType.processClassNameTypes)(library, config.plugins);\n\n  libraryCSS = (0, _generateClasses2.default)(library) + '\\n' + libraryCSS;\n\n  return libraryCSS;\n};\n\nexports.default = generateCSS;\n\n//# sourceURL=webpack:///./src/generators/generateCSS/index.js?");

/***/ }),

/***/ "./src/generators/generateLibrary.js":
/*!*******************************************!*\
  !*** ./src/generators/generateLibrary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _deepmerge = __webpack_require__(/*! deepmerge */ \"./node_modules/deepmerge/dist/es.js\");\n\nvar _deepmerge2 = _interopRequireDefault(_deepmerge);\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar _keywordValueType = __webpack_require__(/*! ../plugins/keywordValueType */ \"./src/plugins/keywordValueType.js\");\n\nvar _config = __webpack_require__(/*! ../config/ */ \"./src/config/index.js\");\n\nvar _molecules = __webpack_require__(/*! ../molecules/ */ \"./src/molecules/index.js\");\n\nvar _sequencers = __webpack_require__(/*! ../sequencers */ \"./src/sequencers.js\");\n\nvar _sortClassNames = __webpack_require__(/*! ../sortClassNames */ \"./src/sortClassNames.js\");\n\nvar _sortClassNames2 = _interopRequireDefault(_sortClassNames);\n\nvar _classObject = __webpack_require__(/*! ../classObject */ \"./src/classObject.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar generateLibrary = function generateLibrary(classNames, config) {\n  var _processConfig = (0, _config.processConfig)(config),\n      props = _processConfig.props,\n      settings = _processConfig.settings,\n      plugins = _processConfig.plugins;\n\n  var expandedMoluecules = [];\n  var toProcessClasses = [].concat(_toConsumableArray(classNames));\n\n  if (config.molecules) {\n    expandedMoluecules = (0, _molecules.expandMolecules)(classNames, config);\n    toProcessClasses = toProcessClasses.concat(expandedMoluecules);\n  }\n\n  var classObjs = void 0;\n  var keywordValueRegexes = void 0;\n\n  // KeywordValues\n  if (settings.enableKeywordValues) {\n    var keywordValueObjs = (0, _keywordValueType.generateKeywordValueObjs)(props);\n    keywordValueRegexes = (0, _sequencers.generateKeywordValueRegexObj)(keywordValueObjs, plugins);\n  }\n\n  var valuePluginRegexes = (0, _sequencers.generateValuePluginRegexObj)(plugins, props);\n  var pluginRegexes = (0, _deepmerge2.default)(valuePluginRegexes, keywordValueRegexes);\n  // Sort classnames\n  var sortedClassNames = (0, _sortClassNames2.default)(toProcessClasses, pluginRegexes);\n\n  // Convert sorted classnames into classObjs\n  var convertedClassNames = (0, _classObject.convertClassNamestoClassObjs)(sortedClassNames, plugins, props);\n\n  classObjs = _extends({}, convertedClassNames);\n\n  if (expandedMoluecules.length > 0) {\n    classObjs = _extends({}, classObjs, (0, _molecules.mergeMolecules)(classNames, classObjs, config));\n\n    (0, _utils.subtractArrays)([].concat(_toConsumableArray(expandedMoluecules)), [].concat(_toConsumableArray(classNames))).forEach(function (cx) {\n      Reflect.deleteProperty(classObjs, cx);\n    });\n  }\n\n  return classObjs;\n};\n\nexports.default = generateLibrary;\n\n//# sourceURL=webpack:///./src/generators/generateLibrary.js?");

/***/ }),

/***/ "./src/generators/index.js":
/*!*********************************!*\
  !*** ./src/generators/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.generateLibrary = exports.generateCSS = undefined;\n\nvar _generateLibrary = __webpack_require__(/*! ./generateLibrary */ \"./src/generators/generateLibrary.js\");\n\nvar _generateLibrary2 = _interopRequireDefault(_generateLibrary);\n\nvar _generateCSS = __webpack_require__(/*! ./generateCSS */ \"./src/generators/generateCSS/index.js\");\n\nvar _generateCSS2 = _interopRequireDefault(_generateCSS);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.generateCSS = _generateCSS2.default;\nexports.generateLibrary = _generateLibrary2.default;\n\n//# sourceURL=webpack:///./src/generators/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.generateCSS = undefined;\n\nvar _generators = __webpack_require__(/*! ./generators/ */ \"./src/generators/index.js\");\n\nexports.generateCSS = _generators.generateCSS;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/molecules/index.js":
/*!********************************!*\
  !*** ./src/molecules/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.mergeMolecules = exports.expandMolecules = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _regexes = __webpack_require__(/*! ../regexes/ */ \"./src/regexes/index.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar hasMolecules = function hasMolecules(arr, config) {\n  return arr.filter(function (x) {\n    return config.molecules.expand[x];\n  }).length > 0 || arr.filter(function (x) {\n    return config.molecules.merge[x];\n  }).length > 0;\n};\n\nvar unboundCleanMolecule = function unboundCleanMolecule(config) {\n  return function (cx) {\n    var _config$molecules = config.molecules,\n        expand = _config$molecules.expand,\n        merge = _config$molecules.merge;\n\n    var allMolecules = [].concat(_toConsumableArray(Object.keys(expand)), _toConsumableArray(Object.keys(merge)));\n    var regex = new RegExp((0, _regexes.buildClassNameRegexFn)(config.plugins)(allMolecules));\n\n    return cx.replace(regex, '$2');\n  };\n};\n\nvar getAtoms = function getAtoms(moleculesArr, config) {\n  var cleanMolecule = unboundCleanMolecule(config);\n  var _config$molecules2 = config.molecules,\n      expand = _config$molecules2.expand,\n      merge = _config$molecules2.merge;\n\n\n  return moleculesArr.reduce(function (xs, x) {\n    var cx = cleanMolecule(x);\n    var gathered = [];\n\n    if (expand[cx]) {\n      gathered = gathered.concat(expand[cx].split(' '));\n    } else if (merge[cx]) {\n      gathered = gathered.concat(merge[cx].split(' '));\n    } else {\n      gathered = gathered.concat(x);\n    }\n\n    return xs.concat(gathered);\n  }, []);\n};\n\nvar expandMolecules = exports.expandMolecules = function expandMolecules(moleculesArr, config) {\n  var expandedAtoms = [];\n\n  if (expandedAtoms.length < 1) expandedAtoms = getAtoms(moleculesArr, config);\n  if (hasMolecules(expandedAtoms, config)) expandedAtoms = expandMolecules(expandedAtoms, config);\n\n  return [].concat(_toConsumableArray(new Set(expandedAtoms)));\n};\n\nvar mergeMolecules = exports.mergeMolecules = function mergeMolecules(classNames, classObjs, config) {\n  var _config$molecules3 = config.molecules,\n      merge = _config$molecules3.merge,\n      expand = _config$molecules3.expand;\n\n  var cleanMolecule = unboundCleanMolecule(config);\n  return classNames.reduce(function (xs, x) {\n    var cx = cleanMolecule(x);\n    if (merge[cx]) {\n      xs[x] = Object.assign.apply(Object, [{}].concat(_toConsumableArray(merge[cx].split(' ').map(function (x) {\n        return classObjs[x];\n      }))));\n    } else if (expand[cx]) {\n      xs = _extends({}, xs, mergeMolecules(expand[cx].split(' '), classObjs, config));\n    }\n\n    return xs;\n  }, {});\n};\n\n//# sourceURL=webpack:///./src/molecules/index.js?");

/***/ }),

/***/ "./src/plugins/classNameType.js":
/*!**************************************!*\
  !*** ./src/plugins/classNameType.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.processClassNameTypes = undefined;\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/plugins/constants.js\");\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar processClassNameType = function processClassNameType(classes, pluginConfig) {\n  var modifiers = pluginConfig.modifiers,\n      prefixOrSuffix = pluginConfig.prefixOrSuffix;\n\n\n  modifiers.forEach(function (modifier) {\n    var indicator = modifier.indicator,\n        separator = modifier.separator,\n        modifierFn = modifier.modifierFn;\n\n\n    var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, prefixOrSuffix);\n    var itemRegex = prefixOrSuffix === 'prefix' ? '^' + item : item + '$';\n\n    Object.keys(classes).forEach(function (cx) {\n      if (new RegExp(itemRegex).test(cx)) {\n        classes['' + modifierFn(cx, indicator)] = classes[cx];\n        Reflect.deleteProperty(classes, cx);\n      }\n    });\n  });\n};\n\nvar processClassNameTypes = exports.processClassNameTypes = function processClassNameTypes(library, plugins) {\n  var classNamePlugins = plugins.filter(function (x) {\n    return x.type === _constants.PLUGIN_TYPES.CLASSNAME;\n  });\n\n  if (classNamePlugins.length > 0) {\n    classNamePlugins.forEach(function (pluginConfig) {\n      processClassNameType(library, pluginConfig);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/plugins/classNameType.js?");

/***/ }),

/***/ "./src/plugins/constants.js":
/*!**********************************!*\
  !*** ./src/plugins/constants.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar PLUGIN_TYPES = exports.PLUGIN_TYPES = {\n  PATTERN: 'pattern',\n  LOOKUP: 'lookup',\n  CLASSNAME: 'classname',\n  KEYWORD: 'keyword',\n  ATRULE: 'atrule'\n};\n\n//# sourceURL=webpack:///./src/plugins/constants.js?");

/***/ }),

/***/ "./src/plugins/index.js":
/*!******************************!*\
  !*** ./src/plugins/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// getPlugins\n// ------------------------------------------------------------------\nvar getPluginType = exports.getPluginType = function getPluginType(pluginType, plugins) {\n  return plugins.filter(function (x) {\n    return x.type === pluginType;\n  }).reduce(function (accum, plugin) {\n    accum[plugin.name] = plugin;\n    return accum;\n  }, {});\n};\n\n// getPluginConfigs\n// ------------------------------------------------------------------\n// Filters propConfigs by enabled[pluginName]\n\nvar getPluginPropConfigs = exports.getPluginPropConfigs = function getPluginPropConfigs(pluginName, propConfigs) {\n  return propConfigs.filter(function (prop) {\n    return prop.enablePlugin === pluginName;\n  });\n};\n\n// createPluginsObject\n// ------------------------------------------------------------------\nvar createPluginsObject = exports.createPluginsObject = function createPluginsObject(plugins) {\n  return plugins.reduce(function (accum, plugin) {\n    accum[plugin.name] = plugin;\n    return accum;\n  }, {});\n};\n\n// getPluginPropNames\n// ------------------------------------------------------------------\nvar createPropNamesObject = exports.createPropNamesObject = function createPropNamesObject(pluginsObject, propConfigs) {\n  return Object.keys(pluginsObject).reduce(function (accum, pluginName) {\n    var pluginPropConfigs = getPluginPropConfigs(pluginName, propConfigs);\n    var pluginPropNames = pluginPropConfigs.map(function (x) {\n      return x.propName;\n    });\n\n    if (pluginPropNames.length !== 0) {\n      accum[pluginName] = pluginPropConfigs.map(function (x) {\n        var propName = x.propName,\n            _x$separator = x.separator,\n            separator = _x$separator === undefined ? '' : _x$separator;\n\n        return propName + separator;\n      });\n    }\n\n    return accum;\n  }, {});\n};\n\n//# sourceURL=webpack:///./src/plugins/index.js?");

/***/ }),

/***/ "./src/plugins/keywordValueType.js":
/*!*****************************************!*\
  !*** ./src/plugins/keywordValueType.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getKeywordClassObjs = exports.generateKeywordValueObjs = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar _classObject = __webpack_require__(/*! ../classObject */ \"./src/classObject.js\");\n\nvar generateKeywordValueObjs = exports.generateKeywordValueObjs = function generateKeywordValueObjs(props) {\n  var propConfigsWithKeywordValues = Object.keys(props).map(function (prop) {\n    return props[prop];\n  }).filter(function (propConfig) {\n    return _typeof(propConfig.keywordValues) === 'object';\n  });\n\n  return propConfigsWithKeywordValues.reduce(function (accum, propConfig) {\n    var prop = propConfig.prop,\n        propName = propConfig.propName,\n        _propConfig$keywordVa = propConfig.keywordValues,\n        _propConfig$keywordVa2 = _propConfig$keywordVa.separator,\n        separator = _propConfig$keywordVa2 === undefined ? '' : _propConfig$keywordVa2,\n        values = _propConfig$keywordVa.values;\n\n\n    var classNames = Object.keys(values).reduce(function (classObjects, valueName) {\n      classObjects = _extends({}, classObjects, (0, _classObject.generateClassObject)({\n        className: '' + propName + (valueName === 'default' ? '' : separator + valueName),\n        cssProps: prop,\n        value: values[valueName]\n      }));\n\n      return classObjects;\n    }, {});\n\n    accum = _extends({}, accum, classNames);\n    return accum;\n  }, {});\n};\n\nvar getKeywordClassObjs = exports.getKeywordClassObjs = function getKeywordClassObjs(classNames, precompiledClassObjects) {\n  if (!precompiledClassObjects) return null;\n\n  var atomKeys = Object.keys(precompiledClassObjects);\n  var keywordRegex = new RegExp('(.*?)(' + atomKeys.sort(function (a, b) {\n    return b.length - a.length;\n  }).join('|') + ')(.*)');\n\n  var matchedClassNames = classNames.filter(function (x) {\n    return x.match(keywordRegex);\n  });\n\n  var returnedAtoms = matchedClassNames.reduce(function (accum, cx) {\n    var cleanClass = cx.replace(keywordRegex, '$2');\n\n    accum[cx] = precompiledClassObjects[cleanClass];\n    return accum;\n  }, {});\n\n  (0, _utils.subtractArrays)(classNames, matchedClassNames);\n  return returnedAtoms;\n};\n\n//# sourceURL=webpack:///./src/plugins/keywordValueType.js?");

/***/ }),

/***/ "./src/regexes/className.js":
/*!**********************************!*\
  !*** ./src/regexes/className.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildClassNameRegexFn = undefined;\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar _ = __webpack_require__(/*! ./ */ \"./src/regexes/index.js\");\n\nvar buildClassNameRegexFn = exports.buildClassNameRegexFn = function buildClassNameRegexFn(pluginsConfig) {\n  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n  var prefixAndSuffixes = {};\n  var hasPrefixesOrSuffixes = pluginsConfig.filter(function (x) {\n    return x.prefixOrSuffix;\n  }).length > 0;\n\n  if (hasPrefixesOrSuffixes) prefixAndSuffixes = (0, _.buildPrefixAndSuffixRegex)(pluginsConfig);\n\n  var start = prefixAndSuffixes['prefix'] ? prefixAndSuffixes['prefix'] : '(^)';\n\n  var end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';\n\n  return function (propNames) {\n    return start + '(' + (0, _utils.sortAndJoin)(propNames) + ')' + body + end;\n  };\n};\n\n//# sourceURL=webpack:///./src/regexes/className.js?");

/***/ }),

/***/ "./src/regexes/index.js":
/*!******************************!*\
  !*** ./src/regexes/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildClassNameRegexFn = exports.buildValuePluginRegex = exports.buildPrefixAndSuffixRegex = undefined;\n\nvar _prefixAndSuffixes = __webpack_require__(/*! ./prefixAndSuffixes */ \"./src/regexes/prefixAndSuffixes.js\");\n\nvar _values = __webpack_require__(/*! ./values */ \"./src/regexes/values.js\");\n\nvar _className = __webpack_require__(/*! ./className */ \"./src/regexes/className.js\");\n\nexports.buildPrefixAndSuffixRegex = _prefixAndSuffixes.buildPrefixAndSuffixRegex;\nexports.buildValuePluginRegex = _values.buildValuePluginRegex;\nexports.buildClassNameRegexFn = _className.buildClassNameRegexFn;\n\n//# sourceURL=webpack:///./src/regexes/index.js?");

/***/ }),

/***/ "./src/regexes/prefixAndSuffixes.js":
/*!******************************************!*\
  !*** ./src/regexes/prefixAndSuffixes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildPrefixAndSuffixRegex = undefined;\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar getPrefixAndSuffixes = function getPrefixAndSuffixes(pluginsConfig) {\n  return pluginsConfig.filter(function (x) {\n    return x.prefixOrSuffix;\n  }).reduce(function (xs, x) {\n    var type = x.prefixOrSuffix,\n        modifiers = x.modifiers;\n\n\n    modifiers.forEach(function (modifier) {\n      var indicator = modifier.indicator,\n          _modifier$separator = modifier.separator,\n          separator = _modifier$separator === undefined ? '' : _modifier$separator;\n\n      var item = (0, _utils.formatPrefixOrSuffix)(indicator, separator, type);\n\n      if (xs[type]) {\n        xs[type] = xs[type].concat(item);\n      } else {\n        xs[type] = [item];\n      }\n    });\n\n    return xs;\n  }, {});\n};\n\nvar buildPrefixAndSuffixRegex = exports.buildPrefixAndSuffixRegex = function buildPrefixAndSuffixRegex(pluginsConfig) {\n  var prefixesAndSuffixes = getPrefixAndSuffixes(pluginsConfig);\n  var prefixes = prefixesAndSuffixes['prefix'];\n  var suffixes = prefixesAndSuffixes['suffix'];\n  var prefixSuffixRegexes = {};\n\n  if (prefixes) prefixSuffixRegexes['prefix'] = '(^|' + (0, _utils.sortAndJoin)(prefixes) + ')';\n  if (suffixes) prefixSuffixRegexes['suffix'] = '(' + (0, _utils.sortAndJoin)(suffixes) + '|$)';\n  return prefixSuffixRegexes;\n};\n\n//# sourceURL=webpack:///./src/regexes/prefixAndSuffixes.js?");

/***/ }),

/***/ "./src/regexes/values.js":
/*!*******************************!*\
  !*** ./src/regexes/values.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildValuePluginRegex = undefined;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nvar _constants = __webpack_require__(/*! ../plugins/constants */ \"./src/plugins/constants.js\");\n\nvar buildValuePluginRegex = exports.buildValuePluginRegex = function buildValuePluginRegex(pluginConfig) {\n  var hasValueModifiers = _typeof(pluginConfig.valueModifiers) === 'object';\n  var values = void 0;\n\n  if (pluginConfig.type === _constants.PLUGIN_TYPES.LOOKUP) {\n    values = '(' + (0, _utils.sortAndJoin)(Object.keys(pluginConfig.values)) + ')';\n  } else {\n    values = '(' + pluginConfig.valueRegexString + ')';\n  }\n\n  var valueModifiers = void 0;\n  var hasDefaultModifierIndicator = void 0;\n\n  if (hasValueModifiers) {\n    var modifiersConfigs = pluginConfig.valueModifiers;\n\n    hasDefaultModifierIndicator = modifiersConfigs.some(function (x) {\n      return x.default === true;\n    });\n\n    var modifiers = modifiersConfigs.reduce(function (accum, config) {\n      var _config$separator = config.separator,\n          separator = _config$separator === undefined ? '' : _config$separator,\n          indicator = config.indicator;\n\n      return accum.concat('' + separator + indicator);\n    }, []);\n\n    valueModifiers = '(' + (0, _utils.sortAndJoin)(modifiers) + ')?';\n\n    // TODO: This line seems redundant\n    if (hasDefaultModifierIndicator) valueModifiers = '' + valueModifiers;\n  }\n  return '' + values + (hasValueModifiers ? valueModifiers : '()?');\n};\n\n//# sourceURL=webpack:///./src/regexes/values.js?");

/***/ }),

/***/ "./src/sequencers.js":
/*!***************************!*\
  !*** ./src/sequencers.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.generateKeywordValueRegexObj = exports.generateValuePluginRegexObj = exports.generateRegexObj = undefined;\n\nvar _deepmerge = __webpack_require__(/*! deepmerge */ \"./node_modules/deepmerge/dist/es.js\");\n\nvar _deepmerge2 = _interopRequireDefault(_deepmerge);\n\nvar _regexes = __webpack_require__(/*! ./regexes */ \"./src/regexes/index.js\");\n\nvar _plugins = __webpack_require__(/*! ./plugins/ */ \"./src/plugins/index.js\");\n\nvar _constants = __webpack_require__(/*! ./plugins/constants */ \"./src/plugins/constants.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar generateRegexObj = exports.generateRegexObj = function generateRegexObj(groupName, arr, regexFn) {\n  var sorted = arr.sort(function (a, b) {\n    return b.length - a.length;\n  }).reduce(function (xs, x) {\n    !xs[groupName] ? xs[groupName] = [x] : xs[groupName].push(x);\n\n    return xs;\n  }, {});\n\n  Object.keys(sorted).forEach(function (x) {\n    sorted[x] = regexFn(sorted[x]);\n  });\n\n  return sorted;\n};\n\nvar generateValuePluginRegexObj = exports.generateValuePluginRegexObj = function generateValuePluginRegexObj(plugins, propConfigs) {\n  var pluginsObject = (0, _plugins.createPluginsObject)(plugins);\n\n  var isValuePlugin = function isValuePlugin(x) {\n    return pluginsObject[x].type === _constants.PLUGIN_TYPES.PATTERN || pluginsObject[x].type === _constants.PLUGIN_TYPES.LOOKUP;\n  };\n\n  var propNamesObject = (0, _plugins.createPropNamesObject)(pluginsObject, propConfigs);\n\n  return Object.keys(pluginsObject).filter(isValuePlugin).reduce(function (accum, pluginName) {\n    var props = propNamesObject[pluginName];\n    var pluginRegexFn = (0, _regexes.buildClassNameRegexFn)(plugins, (0, _regexes.buildValuePluginRegex)(pluginsObject[pluginName]));\n\n    accum = (0, _deepmerge2.default)(accum, generateRegexObj(pluginName, props, pluginRegexFn));\n\n    return accum;\n  }, {});\n};\n\nvar generateKeywordValueRegexObj = exports.generateKeywordValueRegexObj = function generateKeywordValueRegexObj(precompiledClassObjects, pluginsConfig) {\n  var atomKeys = Object.keys(precompiledClassObjects);\n  var regexFn = (0, _regexes.buildClassNameRegexFn)(pluginsConfig);\n\n  return generateRegexObj(_constants.PLUGIN_TYPES.KEYWORD, atomKeys, regexFn);\n};\n\n//# sourceURL=webpack:///./src/sequencers.js?");

/***/ }),

/***/ "./src/sortClassNames.js":
/*!*******************************!*\
  !*** ./src/sortClassNames.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar sortClassNames = function sortClassNames(classNames, sequencedRegexes) {\n  return Object.keys(sequencedRegexes).reduce(function (classNameGroups, pluginName) {\n    var matchedClassNames = classNames.filter(function (cx) {\n      return cx.match(sequencedRegexes[pluginName]);\n    });\n\n    if (matchedClassNames.length !== 0) {\n      if (!classNameGroups[pluginName]) {\n        classNameGroups[pluginName] = matchedClassNames;\n      } else {\n        classNameGroups[pluginName] = [].concat(_toConsumableArray(classNameGroups[pluginName]), _toConsumableArray(matchedClassNames));\n      }\n    }\n    classNames = (0, _utils.subtractArrays)(classNames, matchedClassNames);\n\n    return classNameGroups;\n  }, {});\n};\n\nexports.default = sortClassNames;\n\n//# sourceURL=webpack:///./src/sortClassNames.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// Strings\n// ------------------------------------------------------------------\n\nvar camelize = exports.camelize = function camelize(str) {\n  return str.replace(/(?:^\\w|[A-Z]|\\b\\w|\\s+)/g, function (match, index) {\n    if (+match === 0) return ''; // or if (/\\s+/.test(match)) for white spaces\n    return index == 0 ? match.toLowerCase() : match.toUpperCase();\n  });\n};\n\n// Arrays\n// ------------------------------------------------------------------\nvar subtractArrays = exports.subtractArrays = function subtractArrays(arr1, arr2) {\n  var returnArr = arr1;\n\n  arr2.map(function (remove) {\n    var index = arr1.indexOf(remove);\n    if (index !== -1) {\n      returnArr.splice(index, 1);\n    }\n  });\n  return returnArr;\n};\n\n// Formatters\nvar formatPrefixOrSuffix = exports.formatPrefixOrSuffix = function formatPrefixOrSuffix(x, y, prefixOrSuffix) {\n  return prefixOrSuffix === 'prefix' ? '' + x + y : '' + y + x;\n};\n\nvar sortAndJoin = exports.sortAndJoin = function sortAndJoin(arr) {\n  return arr.sort(function (a, b) {\n    return b.length - a.length;\n  }).join('|');\n};\n\nvar renameKeys = exports.renameKeys = function renameKeys(obj, filterFn, modifierFn) {\n  Object.keys(obj).filter(filterFn).forEach(function (key) {\n    obj['' + modifierFn(key)] = obj[key];\n    Reflect.deleteProperty(obj, key);\n  });\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });