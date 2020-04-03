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
export var addClassPluginData = function (classMetaArr, plugins) {
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
