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
import { addClassObjectData } from './addClassObjectData';
import { addKeywordData } from './addKeywordData';
import { addSourceData } from './addSourceData';
import { generateMatchers } from '../matchers/generateMatchers';
import { keywordToMetaData } from './keywordToMetaData';
import { addPropertyData } from './addPropertyData';
import { addValuePluginData } from './addValuePluginData';
import { addExplodedSourceData } from './addExplodedSourceData';
import { addModifierPluginData } from './addModifierPluginData';
import { addClassPluginData } from './addClassPluginData';
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
export var addMetaData = function (classNames, config) {
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
