'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var classMetaToCSS = function (classMeta, plugins) {
    var desclarations = Object.entries(classMeta.classObject)
        .reduce(function (accum, _a) {
        var _b = __read(_a, 2), property = _b[0], value = _b[1];
        return accum.concat(property + ": " + value);
    }, [])
        .join(';');
    if (classMeta.selectorPlugin) {
        var selectorModifier = plugins
            .find(function (plugin) { return plugin.name === classMeta.selectorPlugin; })
            .modifiers.find(function (modifier) { return modifier.name === classMeta.selectorModifier; });
        classMeta.selector = selectorModifier.modifierFn(classMeta.selector, classMeta.explodedSource.prefix);
    }
    return "." + classMeta.selector + " { " + desclarations + " }";
};

var generateClassObject = function (propsArr, value) {
    return propsArr.reduce(function (accum, prop) {
        accum[prop] = value;
        return accum;
    }, {});
};

var isPropMatch = function (arr1, arr2) {
    return arr1.every(function (item) { return arr2.includes(item); });
};
var addClassObjectData = function (classMetaArr, config) {
    return classMetaArr.map(function (classMeta) {
        var propConfig = config.props.find(function (propConfig) {
            return isPropMatch(propConfig.cssProperty, classMeta.property);
        });
        var value = '';
        if (classMeta.keyword) {
            value =
                classMeta.explodedSource.valueIdentifier === ''
                    ? propConfig.values['__DEFAULT__']
                    : propConfig.values[classMeta.explodedSource.valueIdentifier];
            classMeta.classObject = generateClassObject(classMeta.property, value);
            return classMeta;
        }
        var plugin = config.plugins.find(function (pluginConfig) { return pluginConfig.name === classMeta.valuePlugin; });
        if (classMeta.valuePluginType === 'lookup') {
            value = plugin.values[classMeta.explodedSource.valueIdentifier];
        }
        if (classMeta.valuePluginType === 'pattern') {
            value = classMeta.explodedSource.valueIdentifier;
        }
        var modifierFn = function (x, y) { return "" + x + y; };
        if (classMeta.valueModifier) {
            modifierFn = plugin.modifiers.find(function (modifier) { return modifier.name === classMeta.valueModifier; }).modifierFn;
            value = modifierFn(value, classMeta.explodedSource.modifierIdentifier);
        }
        classMeta.classObject = generateClassObject(classMeta.property, value);
        return classMeta;
    });
};

var addKeywordData = function (classMetaArr, matchers) {
    return classMetaArr.map(function (classMeta) {
        if (!matchers.keyword) {
            classMeta.keyword = false;
        }
        else {
            classMeta.keyword = matchers.keyword.test(classMeta.source);
        }
        return classMeta;
    });
};

var addSourceData = function (classNameArr, matchers) {
    return classNameArr.map(function (className) {
        var matcher = Object.entries(matchers).find(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], regex = _b[1];
            return regex.test(className);
        });
        var classMeta = { source: className, selector: className };
        if (!matcher) {
            classMeta.invalid = true;
            return classMeta;
        }
        return classMeta;
    });
};

var baseToCapture = function (nonCapture) { return function (arr, optional) {
    if (optional === void 0) { optional = false; }
    if (arr.length < 1) {
        return '';
    }
    var optionalRegex = optional ? '|' : '';
    var nonCaptureRegex = nonCapture ? '?:' : '';
    var sortedJoined = arr.sort(function (a, b) { return b.length - a.length; }).join('|');
    return "(" + nonCaptureRegex + sortedJoined + optionalRegex + ")";
}; };
var toCapture = baseToCapture(false);
var toGroup = baseToCapture(true);

var generatePrefixSuffixdMatchers = function (plugins) {
    var baseObject = {
        prefixes: '^',
        suffixes: '$',
    };
    if (!plugins || plugins.length < 1) {
        return baseObject;
    }
    var prefixedPlugins = plugins.filter(function (plugin) { return plugin.affixType === 'prefix'; });
    var suffixedPlugins = plugins.filter(function (plugin) { return plugin.affixType === 'suffix'; });
    var prefixes;
    var suffixes;
    if (prefixedPlugins.length > 0) {
        prefixes = prefixedPlugins
            .map(function (plugin) {
            return plugin.modifiers.reduce(function (accum, modifier) {
                var identifier = modifier.identifier, _a = modifier.separator, separator = _a === void 0 ? '' : _a;
                return accum.concat("" + identifier + separator);
            }, []);
        })
            .reduce(function (xs, x) { return xs.concat(x); }, [])
            .concat('^')
            .join('|');
    }
    if (suffixedPlugins.length > 0) {
        suffixes = suffixedPlugins
            .map(function (plugin) {
            return plugin.modifiers.reduce(function (accum, modifier) {
                var identifier = modifier.identifier, _a = modifier.separator, separator = _a === void 0 ? '' : _a;
                return accum.concat("" + separator + identifier);
            }, []);
        })
            .reduce(function (xs, x) { return xs.concat(x); }, [])
            .concat('$')
            .join('|');
    }
    return {
        prefixes: prefixes ? prefixes : '^',
        suffixes: suffixes ? suffixes : '$',
    };
};

var generateKeywordMatcher = function (metaDataArr, plugins) {
    var _a = generatePrefixSuffixdMatchers(plugins), prefixes = _a.prefixes, suffixes = _a.suffixes;
    var sortedClassNames = toCapture(metaDataArr.map(function (metaData) { return "" + metaData.source; }));
    return {
        keyword: new RegExp("(" + prefixes + ")" + sortedClassNames + "(" + suffixes + ")"),
    };
};

var generateValueRegex = function (valueArr, plugin, captureSubGroups) {
    if (captureSubGroups === void 0) { captureSubGroups = false; }
    var captureOrGroup = captureSubGroups ? toCapture : toGroup;
    var modifierArr = [];
    if (plugin.modifiers) {
        modifierArr = !plugin.modifiers
            ? []
            : plugin.modifiers.map(function (modifier) {
                if (modifier.defaultModifier)
                    return '';
                var identifier = modifier.identifier, _a = modifier.separator, separator = _a === void 0 ? '' : _a;
                var processedIdentifier = typeof identifier === 'string' ? identifier : identifier.source;
                return "" + separator + processedIdentifier;
            });
    }
    return modifierArr.length > 0
        ? "(" + captureOrGroup(valueArr) + captureOrGroup(modifierArr, true) + ")"
        : toCapture(valueArr);
};
var generateValueMatcher = function (plugin, captureSubGroups) {
    if (captureSubGroups === void 0) { captureSubGroups = false; }
    switch (plugin.type) {
        case 'lookup':
            return generateValueRegex(Object.keys(plugin.values), plugin, captureSubGroups);
        case 'pattern':
            var identifier = typeof plugin.identifier === 'string'
                ? plugin.identifier
                : plugin.identifier.source;
            return generateValueRegex([identifier], plugin, captureSubGroups);
        default:
            console.log("The plugin \"" + plugin.name + "\" must have a type.");
    }
};
var generatePropMatcher = function (pluginPropConfigs) {
    var defaultProp = pluginPropConfigs.filter(function (c) { return c.pluginDefault; });
    var hasDefaultProp = defaultProp.length > 0;
    var classNamespaces = pluginPropConfigs
        .filter(function (c) { return !c.pluginDefault; })
        .map(function (propConfig) {
        var classNamespace = propConfig.classNamespace, _a = propConfig.pluginSeparator, pluginSeparator = _a === void 0 ? '' : _a;
        return "" + classNamespace + pluginSeparator;
    });
    return toCapture(classNamespaces, hasDefaultProp);
};
var generateValuePluginMatcher = function (plugins, propConfigs) {
    if (!plugins || plugins.length < 1) {
        return {};
    }
    var _a = generatePrefixSuffixdMatchers(plugins), prefixes = _a.prefixes, suffixes = _a.suffixes;
    var matchers = plugins.reduce(function (accum, plugin) {
        var pluginName = plugin.name;
        var pluginProps = propConfigs.filter(function (propConfig) { return propConfig.valuePlugin === pluginName; });
        if (pluginProps.length === 0) {
            return accum;
        }
        var propMatcher = generatePropMatcher(pluginProps);
        var valueMatcher = generateValueMatcher(plugin);
        var regex = new RegExp("(" + prefixes + ")" + propMatcher + valueMatcher + "(" + suffixes + ")");
        accum[pluginName] = regex;
        return accum;
    }, {});
    return matchers;
};

var generateMatchers = function (config, keywordClassMetaData) {
    var keywordMatcher = {};
    if (keywordClassMetaData && keywordClassMetaData.length > 0) {
        keywordMatcher = generateKeywordMatcher(keywordClassMetaData, config.plugins);
    }
    return __assign(__assign({}, keywordMatcher), generateValuePluginMatcher(config.plugins, config.props));
};

var keywordToMetaData = function (config) {
    var keywordProps = config.props.filter(function (prop) { return prop.values; });
    if (keywordProps.length === 0) {
        return [];
    }
    return keywordProps
        .map(function (propConfig) { return __spread(Object.entries(propConfig.values).reduce(function (accum, _a) {
        var _b = __read(_a, 2), valueIdentifier = _b[0], value = _b[1];
        var _c = propConfig.keywordSeparator, keywordSeparator = _c === void 0 ? '' : _c, _d = propConfig.classNamespace, classNamespace = _d === void 0 ? '' : _d, cssProperty = propConfig.cssProperty;
        var isDefaultValue = valueIdentifier === '__DEFAULT__';
        var sanitizedValueIdentifier = isDefaultValue
            ? ''
            : valueIdentifier;
        var processedSource = isDefaultValue
            ? "" + classNamespace + sanitizedValueIdentifier
            : "" + classNamespace + keywordSeparator + sanitizedValueIdentifier;
        var classMetaDataObj = {
            source: processedSource,
            keyword: true,
            property: cssProperty,
            explodedSource: {
                classNamespace: classNamespace,
                valueSeparator: keywordSeparator,
                valueIdentifier: sanitizedValueIdentifier,
            },
            classObject: generateClassObject(cssProperty, value),
        };
        return accum.concat(classMetaDataObj);
    }, [])); })
        .reduce(function (xs, x) { return xs.concat(x); });
};

var addPropertyData = function (classMetaArr, matchers, props, generatedKeywordMetaData) {
    return classMetaArr.map(function (classMeta) {
        var matcher = Object.entries(matchers).find(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], regex = _b[1];
            return regex.test(classMeta.source);
        });
        if (!matcher) {
            classMeta.invalid = true;
            return classMeta;
        }
        var _a = __read(matcher, 2), matcherName = _a[0], regex = _a[1];
        if (matcherName === 'keyword') {
            var property_1 = generatedKeywordMetaData.find(function (generated) {
                return new RegExp(generated.source).test(classMeta.source);
            }).property;
            classMeta.property = property_1;
            return classMeta;
        }
        var pluginSeparatorsRegex = new RegExp("[" + props.map(function (prop) { return prop.pluginSeparator; }).join('') + "]");
        var classNamespace = classMeta.source
            .match(regex)[2]
            .replace(pluginSeparatorsRegex, '');
        var property = props.find(function (prop) {
            if (classNamespace.length > 0 && prop.classNamespace) {
                var matched = prop.classNamespace.match(new RegExp(classNamespace));
                return (prop.valuePlugin === matcherName && matched && matched.length > 0);
            }
            else if (classNamespace.length === 0 && prop.pluginDefault) {
                return prop.valuePlugin === matcherName && prop.pluginDefault;
            }
            else {
                return false;
            }
        }).cssProperty;
        classMeta.property = property;
        return classMeta;
    });
};

var addValuePluginData = function (classMetaArr, valuePluginMatchers, plugins) {
    return classMetaArr.map(function (classMeta) {
        if (classMeta.keyword)
            return classMeta;
        var pluginName = Object.entries(valuePluginMatchers).find(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], regex = _b[1];
            return regex.test(classMeta.source);
        });
        var plugin = plugins.find(function (pluginConfig) { return pluginConfig.name === pluginName[0]; });
        classMeta.valuePlugin = plugin.name;
        if (plugin.type === 'lookup' || plugin.type === 'pattern') {
            classMeta.valuePluginType = plugin.type;
        }
        return classMeta;
    });
};

var generateModifierMatchers = function (plugin) {
    return plugin.modifiers.reduce(function (accum, modifier) {
        var name = modifier.name, _a = modifier.separator, separator = _a === void 0 ? '' : _a, identifier = modifier.identifier;
        if (modifier.defaultModifier) {
            accum[name] = new RegExp('__DEFAULT__');
            return accum;
        }
        else {
            var processedIdentifier = typeof identifier === 'string' ? identifier : identifier.source;
            accum[name] = new RegExp("" + separator + processedIdentifier);
            return accum;
        }
    }, {});
};

var getMatcherName = function (matchers, testStr) {
    return Object.entries(matchers).find(function (_a) {
        var _b = __read(_a, 2), _ = _b[0], regex = _b[1];
        return regex.test(testStr);
    });
};

var setPropIdentifier = function (explodedSource, propConfig) {
    var classNamespace = propConfig.classNamespace
        ? propConfig.classNamespace
        : '';
    return __assign(__assign({}, explodedSource), { classNamespace: classNamespace });
};
var setValueSeparator = function (explodedSource, propConfig, classMeta) {
    var _a = propConfig.keywordSeparator, keywordSeparator = _a === void 0 ? '' : _a, _b = propConfig.pluginSeparator, pluginSeparator = _b === void 0 ? '' : _b;
    var valueSeparator = classMeta.keyword ? keywordSeparator : pluginSeparator;
    return __assign(__assign({}, explodedSource), { valueSeparator: valueSeparator });
};
var setModifierData = function (explodedSource, classMeta, matchers, plugins) {
    var value = classMeta.source.match(matchers[classMeta.valuePlugin])[3];
    var plugin = plugins.find(function (pluginConfig) { return pluginConfig.name === classMeta.valuePlugin; });
    if (plugin.modifiers) {
        var valuePluginMatcher = generateValueMatcher(plugin, true);
        var matchedModifier = value.match(valuePluginMatcher)[3];
        var modifierName_1 = getMatcherName(generateModifierMatchers(plugin), classMeta.source);
        if (!modifierName_1) {
            return __assign({}, explodedSource);
        }
        var modifier = plugin.modifiers.find(function (m) { return m.name === modifierName_1[0]; });
        var _a = modifier.separator, modifierSeparator = _a === void 0 ? '' : _a;
        return __assign(__assign({}, explodedSource), { modifierSeparator: modifierSeparator, modifierIdentifier: typeof modifier.identifier === 'string'
                ? modifier.identifier
                : matchedModifier.replace(modifier.separator, '') });
    }
    else {
        return __assign({}, explodedSource);
    }
};
var determineKeywordValueIdentifier = function (explodedSource, classMeta, keywordMatcher) {
    var classNameBody = classMeta.source.match(keywordMatcher)[2];
    var classNamespace = explodedSource.classNamespace, valueSeparator = explodedSource.valueSeparator;
    var valueIdentifier = classNameBody
        .replace(classNamespace, '')
        .replace(valueSeparator, '');
    return valueIdentifier;
};
var determinePluginValueIdentifier = function (explodedSource, classMeta, matchers) {
    var value = classMeta.source.match(matchers[classMeta.valuePlugin])[3];
    var modifierIdentifier = explodedSource.modifierIdentifier, modifierSeparator = explodedSource.modifierSeparator;
    return value.replace(modifierIdentifier, '').replace(modifierSeparator, '');
};
var setValueIdentifier = function (explodedSource, classMeta, matchers) {
    var valueIdentifier = classMeta.keyword
        ? determineKeywordValueIdentifier(explodedSource, classMeta, matchers.keyword)
        : determinePluginValueIdentifier(explodedSource, classMeta, matchers);
    return __assign(__assign({}, explodedSource), { valueIdentifier: valueIdentifier });
};
var setClassModifierData = function (affixType, match, plugins) {
    var _a;
    var prefixModifiers = plugins
        .filter(function (plugin) { return plugin.affixType === affixType; })
        .map(function (plugin) { return plugin.modifiers; })
        .reduce(function (xs, x) { return xs.concat(x); });
    var _b = prefixModifiers.find(function (m) {
        return new RegExp(m.identifier).test(match);
    }).separator, separator = _b === void 0 ? '' : _b;
    var replacerRegex = affixType === 'prefix'
        ? new RegExp(separator + "$")
        : new RegExp("^" + separator);
    var affixIdentifier = match.replace(replacerRegex, '');
    var affixSeparator = separator;
    return _a = {},
        _a[affixType] = affixIdentifier ? affixIdentifier : '',
        _a[affixType + "Separator"] = affixSeparator ? affixSeparator : '',
        _a;
};
var setPrefixSuffixData = function (explodedSource, classMeta, matchers, plugins) {
    var matcherArr = Object.entries(matchers).find(function (_a) {
        var _b = __read(_a, 2), matcherName = _b[0], _ = _b[1];
        return (matcherName === classMeta.valuePlugin ||
            (classMeta.keyword && matcherName === 'keyword'));
    });
    if (!matcherArr) {
        return explodedSource;
    }
    var matcher = matcherArr[1];
    var matchedPrefix;
    var matchedSuffix;
    var prefixData;
    var suffixData;
    if (classMeta.keyword) {
        var groups = classMeta.source.match(matcher);
        matchedPrefix = groups[1];
        matchedSuffix = groups[3];
    }
    else {
        var groups = classMeta.source.match(matcher);
        matchedPrefix = groups[1];
        matchedSuffix = groups[4];
    }
    if (matchedPrefix) {
        prefixData = setClassModifierData('prefix', matchedPrefix, plugins);
    }
    if (matchedSuffix) {
        suffixData = setClassModifierData('suffix', matchedSuffix, plugins);
    }
    return __assign(__assign(__assign({}, explodedSource), prefixData), suffixData);
};
var addExplodedSourceData = function (classMetaArr, config, matchers, plugins) {
    var props = config.props;
    return classMetaArr.map(function (classMeta) {
        var explodedSource = {
            prefix: '',
            prefixSeparator: '',
            classNamespace: '',
            valueSeparator: '',
            valueIdentifier: '',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffixSeparator: '',
            suffix: '',
        };
        var propConfig = props.find(function (propConfig) { return propConfig.cssProperty === classMeta.property; });
        var withPropIdentifier = setPropIdentifier(explodedSource, propConfig);
        var withValueSeparator = setValueSeparator(withPropIdentifier, propConfig, classMeta);
        var withModifierData;
        if (classMeta.keyword) {
            withModifierData = withValueSeparator;
        }
        else {
            withModifierData = setModifierData(withValueSeparator, classMeta, matchers, plugins);
        }
        var withValueIdentifier = setValueIdentifier(withModifierData, classMeta, matchers);
        var withPrefixSuffixData = setPrefixSuffixData(withValueIdentifier, classMeta, matchers, plugins);
        classMeta.explodedSource = withPrefixSuffixData;
        return classMeta;
    });
};

var addModifierPluginData = function (classMetaArr, plugins) {
    return classMetaArr.map(function (classMeta) {
        if (!plugins || plugins.length < 1)
            return classMeta;
        var modifierIdentifier = classMeta.explodedSource.modifierIdentifier;
        var hasNonDefaultModifier = modifierIdentifier.length > 0;
        var plugin = plugins.find(function (plugin) {
            return plugin.name === classMeta.valuePlugin;
        });
        if (!plugin || !plugin.modifiers)
            return classMeta;
        var defaultModifier = plugin.modifiers.find(function (modifier) { return modifier.defaultModifier; });
        if (hasNonDefaultModifier) {
            var modifierName = getMatcherName(generateModifierMatchers(plugin), classMeta.source)[0];
            classMeta.valueModifier = modifierName;
        }
        else if (defaultModifier) {
            classMeta.valueModifier = defaultModifier.name;
        }
        return classMeta;
    });
};

var addAffixData = function (affixType, affix, plugins) {
    var affixPlugins = plugins.filter(function (plugin) { return plugin.affixType === affixType; });
    var matchedPlugin = affixPlugins.find(function (plugin) {
        return plugin.modifiers
            .map(function (modifier) { return modifier.identifier; })
            .includes(affix);
    });
    if (!matchedPlugin) {
        return {};
    }
    var matchedModifier = matchedPlugin.modifiers.find(function (modifier) { return modifier.identifier === affix; });
    var pluginName = matchedPlugin.name;
    var pluginType = matchedPlugin.type;
    var modifierName = matchedModifier.name;
    var affixData = {};
    if (pluginType === 'at-rule') {
        affixData.atrulePlugin = pluginName;
        affixData.atruleModifier = modifierName;
    }
    else if (pluginType === 'selector') {
        affixData.selectorPlugin = pluginName;
        affixData.selectorModifier = modifierName;
    }
    return affixData;
};
var addClassPluginData = function (classMetaArr, plugins) {
    if (plugins && plugins.filter(function (plugin) { return plugin.affixType; }).length < 1) {
        return classMetaArr;
    }
    return classMetaArr.map(function (classMeta) {
        var _a = classMeta.explodedSource, prefix = _a.prefix, suffix = _a.suffix;
        var prefixData = {};
        var suffixData = {};
        if (prefix) {
            prefixData = addAffixData('prefix', prefix, plugins);
        }
        if (suffix) {
            suffixData = addAffixData('suffix', suffix, plugins);
        }
        return __assign(__assign(__assign({}, classMeta), prefixData), suffixData);
    });
};

var getPlugins = function (pluginTypes, matchers, plugins) {
    if (!plugins)
        return {};
    return Object.entries(matchers)
        .filter(function (_a) {
        var _b = __read(_a, 1), matcherName = _b[0];
        var valuePlugins = plugins
            .filter(function (plugin) { return pluginTypes.includes(plugin.type); })
            .map(function (plugin) { return "" + plugin.name; });
        return valuePlugins.includes(matcherName);
    })
        .reduce(function (accum, _a) {
        var _b = __read(_a, 2), matcherName = _b[0], regex = _b[1];
        accum[matcherName] = regex;
        return accum;
    }, {});
};
var sortValidAndInvalid = function (classMeta) {
    return classMeta.reduce(function (accum, obj) {
        if (!accum['invalidClassMeta']) {
            accum['invalidClassMeta'] = [];
        }
        if (!accum['validClassMeta']) {
            accum['validClassMeta'] = [];
        }
        accum[obj.invalid ? 'invalidClassMeta' : 'validClassMeta'].push(obj);
        return accum;
    }, {});
};
var addMetaData = function (classNames, config) {
    var keywords = keywordToMetaData(config);
    var matchers = generateMatchers(config, keywords);
    var valuePluginMatchers = getPlugins(['pattern', 'lookup'], matchers, config.plugins);
    // Adds: source, invalid, selector
    var withSourceData = addSourceData(classNames, matchers);
    var validClassMeta = sortValidAndInvalid(withSourceData).validClassMeta;
    // Adds: keyword
    var withKeywordData = addKeywordData(validClassMeta, matchers);
    // Adds: valuePlugin, valuePluginType
    var withValuePluginData = addValuePluginData(withKeywordData, valuePluginMatchers, config.plugins);
    // Adds: property
    var withPropertyData = addPropertyData(withValuePluginData, matchers, config.props, keywords);
    // Adds: explodedSource
    var withExplodedSourceData = addExplodedSourceData(withPropertyData, config, matchers, config.plugins);
    // Adds: valueModifier
    var withModifierPlugin = addModifierPluginData(withExplodedSourceData, config.plugins);
    // Adds: selectorPlugin, atrulePlugin
    var withClassPluginData = addClassPluginData(withModifierPlugin, config.plugins);
    // Adds: classObject
    var withClassObject = addClassObjectData(withClassPluginData, config);
    return withClassObject;
};

var formatBorderProp = function (rootProp, subProp) {
    var _a = __read(rootProp.split('-'), 2), start = _a[0], end = _a[1];
    return start + "-" + subProp + "-" + end;
};
var subPropMapper = {
    all: [],
    top: ['top'],
    right: ['right'],
    bottom: ['bottom'],
    left: ['left'],
    horizontal: ['right', 'left'],
    vertical: ['top', 'bottom'],
};
var processedProp = function (propsArr, baseProp) {
    if (propsArr.length === 0) {
        return [baseProp];
    }
    return baseProp.match('border-')
        ? propsArr.map(function (subProp) { return formatBorderProp(baseProp, subProp); })
        : propsArr.map(function (subProp) { return baseProp + "-" + subProp; });
};
var convertSubProps = function (props) {
    var convertedPropConfigs = props
        .filter(function (propConfig) { return typeof propConfig.subProps === 'object'; })
        .map(function (propConfig) {
        var subPropsConfig = propConfig.subProps;
        var generatedConfigs = Object.entries(subPropsConfig).reduce(function (accum, _a) {
            var _b = __read(_a, 2), subPropGroup = _b[0], subPropIdentifier = _b[1];
            var classNamespace = propConfig.classNamespace, subProps = propConfig.subProps, _c = propConfig.subPropSeparator, subPropSeparator = _c === void 0 ? '' : _c, cssProperty = propConfig.cssProperty, rest = __rest(propConfig, ["classNamespace", "subProps", "subPropSeparator", "cssProperty"]);
            var newProp = processedProp(subPropMapper[subPropGroup], cssProperty[0]);
            var newPropIdentifier = "" + classNamespace + subPropSeparator + subPropIdentifier;
            var newPropConfig = __assign({ cssProperty: newProp, classNamespace: newPropIdentifier }, rest);
            return accum.concat(newPropConfig);
        }, []);
        return generatedConfigs;
    })
        .reduce(function (xs, x) { return xs.concat(x); }, []);
    var propsWithoutSubPropConfigs = props.filter(function (propConfig) { return typeof propConfig.subProps !== 'object'; });
    return __spread(propsWithoutSubPropConfigs, convertedPropConfigs);
};

function sortAlphaNum(a, b) {
    var alphaRegex = /[^a-zA-Z]/g;
    var numberRegex = /[^0-9]/g;
    var aAlpha = a.replace(alphaRegex, '');
    var bAlpha = b.replace(alphaRegex, '');
    if (aAlpha === bAlpha) {
        var aNumbers = parseInt(a.replace(numberRegex, ''), 10);
        var bNumber = parseInt(b.replace(numberRegex, ''), 10);
        return aNumbers === bNumber ? 0 : aNumbers > bNumber ? 1 : -1;
    }
    else {
        return aAlpha > bAlpha ? 1 : -1;
    }
}

var processAtRulePlugins = function (classMetaArr, plugins) {
    var atRuleProcessingOrder = plugins
        .filter(function (plugin) { return plugin.atrule; })
        .map(function (plugin) {
        var pluginModifiers = plugin.modifiers.map(function (modifier) { return modifier.name; });
        return [plugin.name, pluginModifiers];
    });
    return atRuleProcessingOrder.reduce(function (accum, _a) {
        var _b = __read(_a, 2), atRuleName = _b[0], modifierNames = _b[1];
        var atRuleClassMeta = classMetaArr.filter(function (classMeta) { return classMeta.atrulePlugin === atRuleName; });
        var atRuleCSSArr = modifierNames.reduce(function (cssArr, modifierName) {
            var modifierClassMeta = atRuleClassMeta.filter(function (cm) { return cm.atruleModifier === modifierName; });
            if (modifierClassMeta.length < 1) {
                return cssArr;
            }
            var modifierCSS = modifierClassMeta
                .map(function (classMeta) { return classMeta.css; })
                .join('');
            var plugin = plugins.find(function (plugin) { return plugin.name === atRuleName; });
            var modifier = plugin.modifiers.find(function (pluginModifier) { return pluginModifier.name === modifierName; });
            var atRuleCss = "\n          @" + plugin.atrule + " " + modifier.condition + " { " + modifierCSS + " }\n        ";
            return cssArr.concat(atRuleCss);
        }, []);
        return accum.concat(atRuleCSSArr);
    }, []);
};
var sortClassMetaByProperty = function (classMetaArr) {
    return __spread(classMetaArr).sort(function (a, b) { return sortAlphaNum(a.property[0], b.property[0]); });
};
var sortGroupedClassMetaBySource = function (classMetaArr) {
    return Object.values(classMetaArr.reduce(function (accum, classMeta) {
        accum[classMeta.property[0]]
            ? (accum[classMeta.property[0]] = accum[classMeta.property[0]].concat(classMeta))
            : (accum[classMeta.property[0]] = [classMeta]);
        return accum;
    }, {}))
        .map(function (propGroup) {
        return propGroup.sort(function (a, b) { return sortAlphaNum(a.source, b.source); });
    })
        .reduce(function (xs, x) { return xs.concat(x); });
};
var autoAndInheritToBottom = function (classMetaArr) {
    var hasOverrideValues = function (classMeta) {
        return Object.values(classMeta.classObject).every(function (value) {
            return ['auto', 'inherit'].includes(value);
        });
    };
    var withoutOverrideValues = classMetaArr.filter(function (classMeta) { return !hasOverrideValues(classMeta); });
    var overrideValues = __spread(classMetaArr).filter(hasOverrideValues);
    return withoutOverrideValues.concat(overrideValues);
};
var processRootCSS = function (rootClasses) {
    if (rootClasses.length < 1) {
        return [];
    }
    else {
        var groupedByProperty = sortClassMetaByProperty(rootClasses);
        var sortedBySource = sortGroupedClassMetaBySource(groupedByProperty);
        var withOverridesAtTheBottom = autoAndInheritToBottom(sortedBySource);
        return withOverridesAtTheBottom.map(function (c) { return c.css; });
    }
};
var generateCSS = function (classNames, config) {
    var processedConfig = __assign(__assign({}, config), { props: __spread(convertSubProps(config.props)) });
    var classMetaArr = addMetaData(classNames, processedConfig);
    var withCssData = classMetaArr.map(function (classMeta) {
        classMeta.css = classMetaToCSS(classMeta, processedConfig.plugins);
        return classMeta;
    });
    var atRuleClasses = withCssData.filter(function (c) { return !!c.atrulePlugin; });
    var rootClasses = withCssData.filter(function (x) { return !atRuleClasses.includes(x); });
    var rootCSS = processRootCSS(rootClasses);
    var atRuleCSS = [];
    if (atRuleClasses.length > 0) {
        atRuleCSS = processAtRulePlugins(atRuleClasses, processedConfig.plugins);
    }
    return __spread(rootCSS, atRuleCSS).join(' ');
};

module.exports = generateCSS;
