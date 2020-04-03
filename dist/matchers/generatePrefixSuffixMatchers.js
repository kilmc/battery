export var generatePrefixSuffixdMatchers = function (plugins) {
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
