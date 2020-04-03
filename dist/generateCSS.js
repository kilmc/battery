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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { classMetaToCSS } from './css/classMetaToCSS';
import { addMetaData } from './classMetaData/addMetaData';
import { convertSubProps } from './config/processSubProps';
import { sortAlphaNum } from './utils/string';
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
var processConfig = function (config) {
    var withStringCSSProperties = __assign(__assign({}, config), { props: config.props.map(function (prop) {
            return __assign(__assign({}, prop), { cssProperty: [prop.cssProperty] });
        }) });
    var withSubProps = convertSubProps(withStringCSSProperties);
    return withSubProps;
};
export var generateCSS = function (classNames, config) {
    var processedConfig = processConfig(config);
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
