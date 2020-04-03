var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
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
};
import { generateValueMatcher } from '../matchers/generateValuePluginMatcher';
import { generateModifierMatchers } from '../matchers/generateModifierMatchers';
import { getMatcherName } from '../matchers/utils';
var setPropIdentifier = function (explodedSource, propConfig) {
    var classNamespace = propConfig.classNamespace
        ? propConfig.classNamespace
        : '';
    return __assign(__assign({}, explodedSource), { classNamespace: classNamespace });
};
var setValueSeparator = function (explodedSource, propConfig, classMeta) {
    var _a = propConfig.valueSeparator, valueSeparator = _a === void 0 ? '' : _a, _b = propConfig.pluginSeparator, pluginSeparator = _b === void 0 ? '' : _b;
    var valueOrPluginSeparator = classMeta.keyword
        ? valueSeparator
        : pluginSeparator;
    return __assign(__assign({}, explodedSource), { valueOrPluginSeparator: valueOrPluginSeparator });
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
    var classNamespace = explodedSource.classNamespace, valueOrPluginSeparator = explodedSource.valueOrPluginSeparator;
    var valueIdentifier = classNameBody
        .replace(classNamespace, '')
        .replace(valueOrPluginSeparator, '');
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
        var _b = __read(_a, 1), matcherName = _b[0];
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
export var addExplodedSourceData = function (classMetaArr, config, matchers, plugins) {
    var props = config.props;
    return classMetaArr.map(function (classMeta) {
        var explodedSource = {
            prefix: '',
            prefixSeparator: '',
            classNamespace: '',
            valueOrPluginSeparator: '',
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
