import { toCapture, toGroup } from '../utils/array';
import { generatePrefixSuffixdMatchers } from './generatePrefixSuffixMatchers';
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
export var generateValueMatcher = function (plugin, captureSubGroups) {
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
export var generateValuePluginMatcher = function (plugins, propConfigs) {
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
